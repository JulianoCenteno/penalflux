/* PenalFlux · final dos quizzes (/j/quiz/ e /j/desafio/)
   Revela o bônus juntado no quiz (sempre R$ 11,00), aplica no Completo (R$ 29,90 → R$ 18,90, oferta 602A3D09),
   cuida do código de afiliado, UTMs, InitiateCheckout e da confirmação de quem prefere o Básico. */
(function () {
  'use strict';
  var CK = { basico: 'DF3BEC2E', bonus: '602A3D09' };
  var AFF = { afi: '021BD794', afib: 'C01B86B5' }; // links /j/ são do afiliado
  var OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var brl = function (v) { return 'R$ ' + v.toFixed(2).replace('.', ','); };

  // afiliado e UTMs: guarda o que veio na URL e repassa para o checkout
  var K = 'pf_aff', P = new URLSearchParams(location.search), s = {};
  try { s = JSON.parse(localStorage.getItem(K) || '{}'); } catch (e) {}
  if (!P.get('afi')) { P.set('afi', AFF.afi); P.set('afib', AFF.afib); }
  s = { afi: P.get('afi') || s.afi || '', afib: P.get('afib') || s.afib || '', t: Date.now() };
  try { localStorage.setItem(K, JSON.stringify(s)); } catch (e) {}
  P.delete('afi'); P.delete('afib');
  var rest = P.toString();
  var link = function (code, afi) {
    var u = new URL('https://appdigitalhub.com.br/c/' + code);
    if (afi) u.searchParams.set('afi', afi);
    if (rest) new URLSearchParams(rest).forEach(function (v, k) { u.searchParams.set(k, v); });
    return u.toString();
  };
  var dec = function (h) { return (window.Rastreio && window.Rastreio.decorate) ? window.Rastreio.decorate(h) : h; };
  var px = function (name, data) { try { if (window.fbq) window.fbq('track', name, data || {}); } catch (e) {} };
  var pxc = function (name, data) { try { if (window.fbq) window.fbq('trackCustom', name, data || {}); } catch (e) {} };
  var fx = function (n, a) { if (window.PFX) window.PFX.play(n, a); };

  var IMG = '/j/qz/app/';
  // bônus que vêm no Completo (telas reais do app)
  var BONUS = [['mais-cobrados', 'Os 25 artigos mais cobrados'], ['simulado-penal', 'Simulado comentado de Penal · 60 questões'], ['simulado-cf', 'Simulado comentado da Constituição · 40 questões'],
    ['tabela-penas', 'Tabela completa de penas · 241 crimes'], ['mapa-mental', 'Mapa mental do Código Penal'], ['pegadinhas', '40 pegadinhas das principais bancas']];
  // telas do app por dentro
  var TELAS = [['inicio', 'Tela inicial', 'O verbo do dia, sua meta e a sequência de estudo.'], ['mais-cobrados', 'Os 25 mais cobrados', 'Comece pelo que mais cai em prova.'],
    ['comparador', 'Comparador de crimes', 'Furto ou roubo? Exigiu ou pediu? Lado a lado, com a regra de uma frase.'], ['flashcards', 'Flashcards', 'Veja o verbo e lembre o crime e a pena. O que você erra volta mais.'],
    ['simulado-penal', 'Simulado de Penal', '60 questões no estilo das bancas, com comentário em cada uma.'], ['tabela-penas', 'Tabela de penas', 'As penas de 241 crimes, com busca e filtro.'],
    ['mapa-mental', 'Mapa mental', 'O Código inteiro em Parte, Título e Capítulo.'], ['pegadinhas', '40 pegadinhas', 'Afirmações que parecem certas e derrubam candidatos.'], ['meta-diaria', 'Meta diária e lembrete', 'Escolha quantos artigos por dia e o horário do aviso.']];

  // depoimentos (lista em /j/qz/depoimentos.js); sem depoimentos a seção não aparece, a não ser com ?ver=depoimentos
  var PREVIEW = /[?&]ver=depoimentos/.test(location.search);
  function depoCards(mini) {
    var L = (window.PF_DEPOIMENTOS || []).filter(function (d) { return d && (d.print || d.texto); });
    if (!L.length && PREVIEW) L = [1, 2, 3, 4].map(function (n) { return { ph: n }; });
    if (!L.length) return '';
    return L.map(function (d) {
      if (d.ph) return '<div class="dcard ph"><b>Depoimento ' + d.ph + '</b><p style="color:#8E6C24">Espaço para o print ou o texto de um aluno.</p></div>';
      if (d.print) return '<div class="dcard print"><img src="' + esc(d.print) + '" alt="Depoimento de aluno do PenalFlux" loading="lazy" data-zoom></div>';
      var ini = String(d.nome || '?').trim().charAt(0).toUpperCase();
      return '<div class="dcard"><div class="st">★★★★★</div><p>“' + esc(d.texto) + '”</p><div class="who">' + (d.foto ? '<img src="' + esc(d.foto) + '" alt="">' : '<i>' + esc(ini) + '</i>') + '<div><b>' + esc(d.nome || '') + '</b><span>' + esc(d.info || '') + '</span></div></div></div>';
    }).join('');
  }
  function depoSection() {
    var c = depoCards(false); if (!c) return '';
    return '<div class="depos"><h3>Quem já estuda pelo verbo</h3><p>Arraste para o lado</p><div class="dtrack" data-dt>' + c + '</div><div class="dnav"><button type="button" data-dn="-1" aria-label="Anterior">‹</button><button type="button" data-dn="1" aria-label="Próximo">›</button></div></div>';
  }
  function depoMini() {
    var c = depoCards(true); if (!c) return '';
    return '<div class="dmini"><b style="font-size:14.5px">O que dizem os alunos</b><div class="dtrack" data-dt>' + c + '</div></div>';
  }
  function demoHTML() {
    var v = window.PF_VIDEO_APP;
    return '<div class="demo"><span class="kicker">Por dentro do app</span><h3>Veja o PenalFlux funcionando</h3><p>Telas reais do app no celular</p>' +
      '<div class="phone"><span class="notch"></span><div class="scr">' + (v ? '<video src="' + esc(v) + '" autoplay muted loop playsinline></video>' : TELAS.map(function (t, k) { return '<img src="' + IMG + t[0] + '.webp" alt="' + esc(t[1]) + '" ' + (k ? 'loading="lazy"' : 'class="on"') + '>'; }).join('')) + '</div>' +
      (v ? '' : '<button class="play" type="button" data-pp aria-label="Pausar">❚❚</button>') + '</div>' +
      (v ? '' : '<div class="cap" data-cap><b>' + TELAS[0][1] + '</b><span>' + TELAS[0][2] + '</span></div><div class="dts">' + TELAS.map(function (t, k) { return '<button type="button" data-go="' + k + '" class="' + (k ? '' : 'on') + '" aria-label="' + esc(t[1]) + '"></button>'; }).join('') + '</div>') + '</div>';
  }

  // opt: { lines: [[rótulo, valor]], title, cta }
  function render(el, opt) {
    opt = opt || {};
    var B = window.PFX ? window.PFX.GOAL : 11;
    var lines = (opt.lines || []).filter(function (l) { return l[1] > 0; });
    el.innerHTML =
      '<div class="vault"><span class="kicker">Seu bônus juntado</span><div class="big" id="vb">R$ 0,00</div>' +
      '<p>' + esc(opt.title || 'Você ganhou esse valor respondendo. Ele já está aplicado no seu acesso abaixo.') + '</p>' +
      (lines.length ? '<div class="lines">' + lines.map(function (l) { return '<div><span>' + esc(l[0]) + '</span><b>+ ' + brl(l[1]) + '</b></div>'; }).join('') + '</div>' : '') + '</div>' +
      demoHTML() + depoSection() +

      '<div class="deal" id="deal"><img src="/j/qz/dh-completo.webp" alt="Tudo o que vem no PenalFlux Completo" width="480" height="480" style="width:100%;max-width:320px;margin:0 auto;border-radius:14px">' +
      '<h3 class="serif" style="font-size:28px;margin-top:8px">PenalFlux Completo</h3><p class="muted" style="font-size:15px;color:var(--ink2)">Tudo para entender e acertar Penal na prova.</p>' +
      '<div class="base"><span style="font-size:22px">📱</span><span><b>Base:</b> os 361 artigos explicados no app, com o verbo-chave, comparador de crimes, flashcards e meta diária, atualizado com as leis de 2026.</span></div>' +
      '<div class="bns"><div class="hd"><b>🎁 Bônus que vêm junto</b><span>6 bônus inclusos</span></div><div class="bgrid">' +
      BONUS.map(function (b, k) { return '<div class="bcard"><span class="inc">Incluso</span><img src="' + IMG + b[0] + '.webp" alt="" loading="lazy" width="390" height="300"><div><small>Bônus ' + (k + 1) + '</small><b>' + esc(b[1]) + '</b></div></div>'; }).join('') + '</div></div>' +
      '<div class="row"><span>Preço do Completo</span><span>R$ 29,90</span></div>' +
      '<div class="row b"><span>💰 Seu bônus do quiz</span><span>− ' + brl(B) + '</span></div>' +
      '<div class="tot"><span style="font-weight:800">Você paga</span><b>' + brl(29.9 - B) + '</b></div>' +
      '<p class="muted" style="text-align:right;margin-top:4px">pagamento único · acesso vitalício</p>' +
      '<a class="btn go block" data-ck="bonus" href="' + link(CK.bonus, s.afi) + '" style="margin-top:14px">' + esc(opt.cta || 'Usar meu bônus e liberar o acesso') + '</a>' +
      '<div class="pay"><span>Pix</span><span>Cartão</span><span>Boleto</span></div>' + depoMini() + '</div>' +

      '<div class="how"><div><i>1</i><span>Você paga no Pix ou no cartão, em ambiente seguro.</span></div><div><i>2</i><span>O link do app chega na hora no seu e-mail.</span></div><div><i>3</i><span>Entra com seu nome e e-mail e começa pelo verbo-chave.</span></div></div>' +

      '<div class="guar"><div class="seal"><div><b>7</b><span>DIAS DE<br>GARANTIA</span></div></div><p><b style="color:var(--ink)">Garantia incondicional de 7 dias.</b> Entre, estude e faça os simulados. Se não for para você, devolvemos 100% do valor, sem perguntas.</p></div>' +
      '<div class="faq" style="margin-top:18px">' +
      '<details><summary>O bônus é de verdade?</summary><p>Sim. O valor que você juntou no quiz já vem descontado no checkout: o Completo sai por ' + brl(29.9 - B) + ' em vez de R$ 29,90.</p></details>' +
      '<details><summary>Como recebo o acesso?</summary><p>Logo depois do pagamento você recebe o link por e-mail. No Pix e no cartão, é na hora. Para entrar, use seu nome e o e-mail da compra.</p></details>' +
      '<details><summary>Funciona no celular?</summary><p>Sim. Funciona no navegador do celular e do computador, e você pode colocar na tela inicial como um aplicativo.</p></details>' +
      '<details><summary>Está atualizado?</summary><p>Sim. O texto da lei é o oficial em vigor, conferido com o Planalto até setembro de 2026. Quando a lei muda, o app é atualizado sem custo.</p></details>' +
      '<details><summary>Garante aprovação?</summary><p>Não. O PenalFlux é material de estudo: promete que você vai entender a lei e reconhecer os crimes pelo verbo, não aprovação.</p></details>' +
      '</div>' +
      '<p class="center" style="margin-top:20px"><a href="' + link(CK.basico, s.afib) + '" data-ck="basico" style="color:var(--ink3);font-size:14px">Prefiro só os artigos explicados (Básico, R$ 10,90, sem o bônus)</a></p>';

    // barra fixa no celular
    var bar = document.createElement('div');
    bar.className = 'stick'; bar.innerHTML = '<div><b>Completo com seu bônus: ' + brl(29.9 - B) + '</b><span>💰 ' + brl(B) + ' já aplicados</span></div><a class="btn gold" href="#deal">Liberar</a>';
    document.body.appendChild(bar);
    var deal = el.querySelector('#deal');
    var onScroll = function () { var r = deal.getBoundingClientRect(); bar.classList.toggle('show', innerWidth < 760 && !(r.bottom > 0 && r.top < innerHeight)); };
    addEventListener('scroll', onScroll, { passive: true });
    bar.querySelector('a').onclick = function (e) { e.preventDefault(); fx('tap'); deal.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

    el.querySelector('a[data-ck="bonus"]').addEventListener('click', function () { fx('select'); px('InitiateCheckout', { currency: 'BRL', value: 29.9 - B, content_name: 'PenalFlux Completo (bônus do quiz)' }); });

    // Básico: lembra que o bônus só vale no Completo
    var bas = el.querySelector('a[data-ck="basico"]');
    bas.addEventListener('click', function (e) {
      e.preventDefault(); fx('tap');
      var m = document.getElementById('modal');
      m.innerHTML = '<div class="up"><span class="tag">💰 ' + brl(B) + ' de bônus</span><h3>Seu bônus fica no Completo</h3>' +
        '<p>O valor que você juntou no quiz só pode ser usado no Completo. No Básico você paga R$ 10,90 e não leva os simulados, os 25 mais cobrados nem as pegadinhas.</p>' +
        '<div class="px"><s>R$ 29,90</s><b>' + brl(29.9 - B) + '</b><small>Completo com o seu bônus</small></div>' +
        '<a class="btn go block" id="upyes" href="' + link(CK.bonus, s.afi) + '">Usar meu bônus no Completo</a><button class="no" id="upno">Continuar com o Básico, sem o bônus</button></div>';
      document.getElementById('scrim').classList.add('show');
      document.getElementById('upyes').onclick = function () { px('InitiateCheckout', { currency: 'BRL', value: 29.9 - B, content_name: 'PenalFlux Completo (bônus do quiz)' }); };
      document.getElementById('upno').onclick = function () { px('InitiateCheckout', { currency: 'BRL', value: 10.9, content_name: 'PenalFlux Básico' }); location.href = dec(bas.href); };
    }, true);
    // celular animado
    var imgs = el.querySelectorAll('.phone .scr img');
    if (imgs.length) {
      var cur = 0, paused = false, cap = el.querySelector('[data-cap]'), dts = el.querySelectorAll('[data-go]'), pp = el.querySelector('[data-pp]');
      var show = function (n) {
        imgs[cur].classList.remove('on'); dts[cur].classList.remove('on');
        cur = (n + imgs.length) % imgs.length;
        imgs[cur].classList.add('on'); dts[cur].classList.add('on');
        cap.innerHTML = '<b>' + TELAS[cur][1] + '</b><span>' + TELAS[cur][2] + '</span>';
      };
      setInterval(function () { if (!paused && !document.hidden) show(cur + 1); }, 3000);
      dts.forEach(function (d) { d.onclick = function () { fx('tap'); show(+d.dataset.go); }; });
      pp.onclick = function () { paused = !paused; pp.textContent = paused ? '▶' : '❚❚'; pp.setAttribute('aria-label', paused ? 'Continuar' : 'Pausar'); fx('tap'); };
      el.querySelector('.phone .scr').onclick = function () { fx('tap'); show(cur + 1); };
    }
    // depoimentos: setas e ampliar print
    el.querySelectorAll('[data-dn]').forEach(function (b) { b.onclick = function () { var t = b.closest('.depos').querySelector('[data-dt]'); t.scrollBy({ left: +b.dataset.dn * t.clientWidth * 0.8, behavior: 'smooth' }); fx('tap'); }; });
    el.querySelectorAll('[data-zoom]').forEach(function (im) { im.onclick = function () { var z = document.createElement('div'); z.className = 'zoom'; z.innerHTML = '<img src="' + im.src + '" alt="Depoimento ampliado">'; z.onclick = function () { z.remove(); }; document.body.appendChild(z); }; });

    var sc = document.getElementById('scrim');
    sc.onclick = function (e) { if (e.target === sc) sc.classList.remove('show'); };

    // contagem do bônus
    var vb = el.querySelector('#vb'), started = false;
    var count = function () {
      if (started) return; started = true;
      var t0 = null, D = 1600;
      fx('roll', 14);
      requestAnimationFrame(function step(ts) {
        if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / D), v = B * (1 - Math.pow(1 - p, 3));
        vb.textContent = brl(v);
        if (p < 1) requestAnimationFrame(step); else { fx('fanfare'); if (window.PFX) window.PFX.buzz([30, 40, 60]); }
      });
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); count(); } }, { threshold: 0.6 });
      io.observe(vb);
    } else count();
  }

  window.PFOffer = { render: render, track: px, trackCustom: pxc };
})();
