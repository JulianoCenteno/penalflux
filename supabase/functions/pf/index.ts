// PenalFlux: login do comprador (nome + e-mail), liberação por webhook do Digital Hub
// e entrega do conteúdo só para quem está logado.
// Rotas (atrás de penalflux.com.br/api/... pela Vercel):
//   POST /webhook?key=...   eventos de venda do Digital Hub
//   POST /login             { name, email } -> { token }
//   GET  /me                conteúdo liberado para a sessão (header x-pf-token)
//   GET  /pdf?f=especiais   link temporário do PDF
//   POST /logout
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});
const BUCKET = "penalflux";
const MAX_DEVICES = 2;
const SESSION_DAYS = 180;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-pf-token",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

const norm = (s: unknown) =>
  String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9@._+-]+/g, " ").trim();
const normEmail = (s: unknown) => String(s ?? "").trim().toLowerCase();
const firstName = (s: unknown) => norm(s).replace(/[^a-z ]/g, " ").trim().split(/\s+/)[0] || "";

async function sha256(s: string) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function setting(k: string) {
  const { data } = await db.from("pf_settings").select("v").eq("k", k).maybeSingle();
  return data?.v as string | undefined;
}
async function hit(key: string, max: number, minutes: number) {
  const { data, error } = await db.rpc("pf_hit", { p_key: key, p_max: max, p_minutes: minutes });
  return error ? true : Boolean(data);
}

// ---------- Produtos ----------
// O que cada compra libera (nome do produto no Digital Hub -> chave no app)
function productsFromTitle(t: string): string[] {
  const s = norm(t);
  if (!/penalflux/.test(s)) return [];
  if (/leve todos|todos os materiais/.test(s)) return ["todos", "especiais", "verbos", "cpp"];
  if (/mapa dos verbos/.test(s)) return ["verbos"];
  if (/processo penal/.test(s)) return ["cpp"];
  if (/leis penais especiais|leis especiais/.test(s)) return ["especiais"];
  if (/banco de questoes/.test(s)) return ["banco"];
  if (/simulado diario/.test(s)) return ["mini"];
  if (/resumos em audio|audio/.test(s)) return ["audio"];
  if (/completo/.test(s)) return ["completo", "basico"];
  if (/basico/.test(s)) return ["basico"];
  // Produto principal do Completo: "PenalFlux — Código Penal pelo Método do Verbo-Chave"
  if (/codigo penal pelo metodo/.test(s)) return ["completo", "basico"];
  return [];
}
function expand(list: string[]) {
  const o = new Set(list);
  if (o.has("completo")) o.add("basico");
  if (o.has("todos")) ["especiais", "verbos", "cpp"].forEach((k) => o.add(k));
  if (o.has("banco")) o.add("mini");
  return [...o];
}

// ---------- Leitura do webhook (mesmos caminhos usados no app Rota Paraguai) ----------
const getPath = (o: unknown, p: string) =>
  p.split(".").reduce<unknown>((a, k) => (a == null ? undefined : (a as Record<string, unknown>)[k]), o);
function pick(o: unknown, paths: string[]) {
  for (const p of paths) {
    const v = getPath(o, p);
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}
const PATHS = {
  orderId: ["payment.id", "data.id", "data.order_id", "data.transaction_id", "order.id", "order_id", "transaction_id", "transaction.id", "sale.id", "id", "code", "data.code"],
  status: ["data.status", "order.status", "transaction.status", "sale.status", "payment.status", "status"],
  event: ["event", "type", "event_type", "data.event"],
  email: ["data.customer.email", "customer.email", "order.customer.email", "buyer.email", "client.email", "data.buyer.email", "customer_email", "email"],
  name: ["data.customer.name", "customer.name", "order.customer.name", "buyer.name", "client.name", "data.buyer.name", "customer_name", "name"],
  amount: ["data.amount", "data.total", "order.amount", "order.total", "transaction.amount", "payment.amount", "amount", "total", "value"],
};
function mapStatus(raw: unknown) {
  const s = String(raw || "").toLowerCase();
  if (/(refund|reembols|estorn)/.test(s)) return "refunded";
  if (/(charge.?d?.?back|contest|disput)/.test(s)) return "chargeback";
  if (/(cancel|expired|expirad)/.test(s)) return "canceled";
  if (/(refus|recus|denied|fail|negad)/.test(s)) return "refused";
  if (/(unpaid|pending|pendent|waiting|aguard|generated|gerad|created|criad|processing|open|abandon)/.test(s)) return "pending";
  if (/(paid|approv|aprov|complet|confirm|pago|success|succeeded|authorized)/.test(s)) return "paid";
  return "unknown";
}
function titles(payload: unknown) {
  const out = new Set<string>();
  for (const l of ["order.bumps", "order.products", "order.items", "products", "items", "data.products", "data.items", "bumps", "order_bumps", "data.order_bumps"]) {
    const arr = getPath(payload, l);
    if (Array.isArray(arr)) for (const it of arr) {
      const t = pick(it, ["title", "name", "product.title", "product.name", "product_name", "offer.name"]);
      if (t) out.add(String(t));
    }
  }
  for (const p of ["product.title", "product.name", "data.product.name", "data.product.title", "order.product.name", "product_name", "offer.name"]) {
    const t = getPath(payload, p);
    if (t) out.add(String(t));
  }
  return [...out];
}
function parse(payload: unknown) {
  const event = pick(payload, PATHS.event);
  let status = /^(pix|card|boleto|billet)\./i.test(String(event || "")) ? mapStatus(event) : "unknown";
  if (status === "unknown") status = mapStatus(pick(payload, PATHS.status));
  if (status === "unknown" && event) status = mapStatus(event);
  const t = titles(payload);
  const products = [...new Set(t.flatMap(productsFromTitle))];
  const amount = Number(String(pick(payload, PATHS.amount) ?? "").replace(",", "."));
  const id = pick(payload, PATHS.orderId);
  return {
    orderId: id != null ? String(id) : null,
    status,
    email: normEmail(pick(payload, PATHS.email)),
    name: pick(payload, PATHS.name) ? String(pick(payload, PATHS.name)) : null,
    titles: t,
    products,
    amount: Number.isFinite(amount) ? amount : null,
  };
}

async function webhook(req: Request, url: URL) {
  const real = await setting("webhook_key");
  const given = url.searchParams.get("key") || "";
  if (!real || !safeEqual(await sha256(given), await sha256(real))) return json({ ok: false, error: "chave inválida" }, 401);
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "JSON inválido" }, 400);
  }
  const o = parse(payload);
  let result = "";
  try {
    if ((payload as { test?: boolean })?.test === true) result = "teste recebido (não libera acesso)";
    else if (!o.email) result = "sem e-mail no webhook";
    else if (!o.orderId) result = "sem ID do pedido";
    else if (!o.products.length) result = "produto não é do PenalFlux: " + o.titles.join(", ");
    else if (o.status === "unknown") result = "status desconhecido";
    else {
      const id = "dh:" + o.orderId;
      const { data: prev } = await db.from("pf_orders").select("status, products").eq("id", id).maybeSingle();
      // Um "pendente" atrasado não desfaz um "pago"; reembolso e chargeback sempre valem.
      const status = prev?.status === "paid" && ["pending", "unknown"].includes(o.status) ? "paid" : o.status;
      const products = [...new Set([...(prev?.products || []), ...o.products])].sort();
      const { error } = await db.from("pf_orders").upsert({
        id, email: o.email, name: o.name, status, products, amount: o.amount, updated_at: new Date().toISOString(),
      });
      if (error) throw new Error(error.message);
      const acc = await access(o.email);
      result = `${status} → acesso: ${acc.owned.join(", ") || "nenhum"}`;
      if (!acc.owned.length) await db.from("pf_sessions").delete().eq("email", o.email);
    }
  } catch (e) {
    result = "erro: " + (e as Error).message;
  }
  await db.from("pf_events").insert({ email: o.email || null, status: o.status, result, payload });
  const bad = result.startsWith("erro");
  return json({ ok: !bad, result }, bad ? 500 : 200);
}

// ---------- Acesso ----------
async function access(email: string) {
  const { data } = await db.from("pf_orders").select("products, name, status").eq("email", email);
  const paid = (data || []).filter((r) => r.status === "paid");
  return { owned: expand(paid.flatMap((r) => r.products as string[])), names: paid.map((r) => r.name).filter(Boolean) as string[] };
}

async function login(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = normEmail(body.email);
  const name = String(body.name || "").trim();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "?";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Digite o e-mail usado na compra." }, 400);
  if (firstName(name).length < 2) return json({ error: "Digite seu nome como está na compra." }, 400);
  if (!(await hit("login-ip:" + ip, 20, 15)) || !(await hit("login:" + email, 8, 15)))
    return json({ error: "Muitas tentativas. Espere 15 minutos e tente de novo." }, 429);

  const acc = await access(email);
  if (!acc.owned.length)
    return json({ error: "Não encontramos uma compra aprovada com esse e-mail. Use o mesmo e-mail da compra. No Pix, a liberação leva até alguns minutos." }, 404);
  const fn = firstName(name);
  if (acc.names.length && !acc.names.some((n) => firstName(n) === fn))
    return json({ error: "O nome não confere com o da compra. Digite o primeiro nome como você colocou no pedido." }, 403);

  const raw = crypto.getRandomValues(new Uint8Array(32));
  const token = [...raw].map((x) => x.toString(16).padStart(2, "0")).join("");
  await db.from("pf_sessions").insert({ token_hash: await sha256(token), email, ua: (req.headers.get("user-agent") || "").slice(0, 200) });
  // Limite de aparelhos: mantém só as sessões mais novas
  const { data: ss } = await db.from("pf_sessions").select("token_hash").eq("email", email).order("created_at", { ascending: false });
  const old = (ss || []).slice(MAX_DEVICES).map((s) => s.token_hash);
  if (old.length) await db.from("pf_sessions").delete().in("token_hash", old);
  return json({ token });
}

async function session(req: Request) {
  const t = req.headers.get("x-pf-token") || "";
  if (!/^[0-9a-f]{64}$/.test(t)) return null;
  const h = await sha256(t);
  const { data } = await db.from("pf_sessions").select("email, created_at, last_seen").eq("token_hash", h).maybeSingle();
  if (!data) return null;
  if (Date.now() - new Date(data.created_at).getTime() > SESSION_DAYS * 864e5) {
    await db.from("pf_sessions").delete().eq("token_hash", h);
    return null;
  }
  if (Date.now() - new Date(data.last_seen).getTime() > 36e5)
    await db.from("pf_sessions").update({ last_seen: new Date().toISOString() }).eq("token_hash", h);
  return { email: data.email as string, hash: h };
}

const cache = new Map<string, unknown>();
async function part(name: string) {
  if (cache.has(name)) return cache.get(name);
  const { data, error } = await db.storage.from(BUCKET).download(`data/${name}.json`);
  if (error || !data) throw new Error("conteúdo indisponível: " + name);
  const v = JSON.parse(await data.text());
  cache.set(name, v);
  return v;
}

async function me(req: Request) {
  const s = await session(req);
  if (!s) return json({ error: "Faça login para continuar." }, 401);
  const acc = await access(s.email);
  if (!acc.owned.length) return json({ error: "Seu acesso foi encerrado. Fale com o suporte se for um engano." }, 401);
  const parts = ["base"];
  if (acc.owned.includes("completo")) parts.push("completo");
  if (acc.owned.includes("especiais")) parts.push("especiais");
  if (acc.owned.includes("cpp")) parts.push("cpp");
  const data: Record<string, unknown> = {};
  for (const p of parts) Object.assign(data, await part(p));
  const { data: o } = await db.from("pf_orders").select("name").eq("email", s.email).not("name", "is", null).limit(1);
  return json({ user: { email: s.email, name: o?.[0]?.name || "", owned: acc.owned }, data });
}

const PDFS: Record<string, [string, string, string]> = {
  especiais: ["pdf/leis.pdf", "especiais", "PenalFlux-Leis-Penais-Especiais.pdf"],
  verbos: ["pdf/mapa.pdf", "verbos", "PenalFlux-Mapa-dos-Verbos-Chave.pdf"],
  cpp: ["pdf/cpp.pdf", "cpp", "PenalFlux-Processo-Penal-Essencial.pdf"],
};
async function pdf(req: Request, url: URL) {
  const s = await session(req);
  if (!s) return json({ error: "Faça login para baixar." }, 401);
  const f = PDFS[url.searchParams.get("f") || ""];
  if (!f) return json({ error: "Arquivo não encontrado." }, 404);
  const acc = await access(s.email);
  if (!acc.owned.includes(f[1])) return json({ error: "Este material não está no seu plano." }, 403);
  const { data, error } = await db.storage.from(BUCKET).createSignedUrl(f[0], 120, { download: f[2] });
  if (error || !data) return json({ error: "Não foi possível gerar o link agora." }, 500);
  return json({ url: data.signedUrl });
}

async function logout(req: Request) {
  const s = await session(req);
  if (s) await db.from("pf_sessions").delete().eq("token_hash", s.hash);
  return json({ ok: true });
}



Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  const url = new URL(req.url);
  const route = url.pathname.replace(/^.*\/pf/, "").replace(/\/+$/, "") || "/";
  try {
    if (route === "/webhook" && req.method === "POST") return await webhook(req, url);
    if (route === "/login" && req.method === "POST") return await login(req);
    if (route === "/me") return await me(req);
    if (route === "/pdf") return await pdf(req, url);
    if (route === "/logout" && req.method === "POST") return await logout(req);
    return json({ error: "rota não encontrada" }, 404);
  } catch (e) {
    console.error(e);
    return json({ error: "Erro no servidor. Tente de novo em instantes." }, 500);
  }
});
