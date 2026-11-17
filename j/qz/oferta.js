/* PenalFlux · oferta usada no fim dos quizzes (/j/quiz/ e /j/desafio/)
   Planos, código de afiliado, UTMs, InitiateCheckout no Pixel e o pop-up do Completo por R$ 18,90. */
(function () {
  'use strict';
  var CK = { basico: 'DF3BEC2E', completo: '423A541B', desc: '602A3D09' };
  var AFF = { afi: '021BD794', afib: 'C01B86B5' }; // links /j/ são do afiliado
  var OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

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
  var px = function (name, data) { try { if (window.fbq) window.fbq('track', name, data || {}); } catch (e) {} };
  var pxc = function (name, data) { try { if (window.fbq) window.fbq('trackCustom', name, data || {}); } catch (e) {} };

  var ITENS = ['Os 361 artigos explicados, com o verbo-chave de cada crime', 'Os 25 artigos mais cobrados', 'Simulados comentados de Penal (60) e da Constituição (40)',
    'Tabela de penas, mapa mental e comparador de crimes', 'As 40 pegadinhas das principais bancas', 'App no celular, atualizado com as leis de 2026'];

  function render(el, opt) {
    opt = opt || {};
    el.innerHTML =
      '<div class="offer">' +
      '<div class="plan"><span class="badge">' + esc(opt.badge || 'Recomendado para você') + '</span>' +
      '<img src="/j/qz/dh-completo.webp" alt="Tudo o que vem no PenalFlux Completo" width="480" height="480" style="width:100%;max-width:340px;margin:8px auto 0;border-radius:14px">' +
      '<h3>PenalFlux Completo</h3><p class="muted" style="font-size:15px;color:var(--ink2)">Tudo para entender e acertar Penal na prova.</p>' +
      '<ul>' + ITENS.map(function (t) { return '<li>' + OK + '<span>' + t + '</span></li>'; }).join('') + '</ul>' +
      '<div class="price"><s>De R$ 147</s><b>R$ 29,90</b><small>pagamento único · acesso vitalício</small></div>' +
      '<a class="btn go block" data-ck="completo" href="' + link(CK.completo, s.afi) + '">' + esc(opt.cta || 'Quero o PenalFlux Completo') + '</a>' +
      '<div class="pay"><span>Pix</span><span>Cartão</span><span>Boleto</span></div></div>' +
      '<div class="alt"><div><b>Só os artigos explicados</b><span>Plano Básico, sem simulados nem extras</span></div><a class="btn ghost" data-ck="basico" href="' + link(CK.basico, s.afib) + '">R$ 10,90</a></div>' +
      '<div class="guar"><div class="seal"><div><b>7</b><span>DIAS DE<br>GARANTIA</span></div></div><p><b style="color:var(--ink)">Garantia incondicional de 7 dias.</b> Entre, estude e faça os simulados. Se não for para você, devolvemos 100% do valor, sem perguntas.</p></div>' +
      '<div class="faq" style="margin-top:18px">' +
      '<details><summary>Como recebo o acesso?</summary><p>Logo depois do pagamento você recebe o link por e-mail. No Pix e no cartão, é na hora. Para entrar, use seu nome e o e-mail da compra.</p></details>' +
      '<details><summary>Funciona no celular?</summary><p>Sim. Funciona no navegador do celular e do computador, e você pode colocar na tela inicial como um aplicativo.</p></details>' +
      '<details><summary>Está atualizado?</summary><p>Sim. O texto da lei é o oficial em vigor, conferido com o Planalto até setembro de 2026. Quando a lei muda, o app é atualizado sem custo.</p></details>' +
      '<details><summary>Garante aprovação?</summary><p>Não. O PenalFlux é material de estudo: promete que você vai entender a lei e reconhecer os crimes pelo verbo, não aprovação.</p></details>' +
      '</div></div>';

    el.querySelectorAll('a[data-ck]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (a.dataset.ck === 'completo') px('InitiateCheckout', { currency: 'BRL', value: 29.9, content_name: 'PenalFlux Completo' });
      });
    });
    // pop-up: quem escolhe o Básico recebe o Completo por R$ 18,90 (uma vez por visita)
    var bas = el.querySelector('a[data-ck="basico"]');
    bas.addEventListener('click', function (e) {
      if (sessionStorage.getItem('pf_up_seen')) { px('InitiateCheckout', { currency: 'BRL', value: 10.9, content_name: 'PenalFlux Básico' }); return; }
      e.preventDefault();
      try { sessionStorage.setItem('pf_up_seen', '1'); } catch (_) {}
      var m = document.getElementById('modal');
      m.innerHTML = '<div class="up"><span class="tag">Oferta só agora</span><h3>Espera! Leve o Completo por quase o preço do Básico</h3><p>Por só R$ 8 a mais você leva os simulados, os 25 mais cobrados e tudo que faz acertar na prova.</p>' +
        '<ul>' + ['Tudo do plano Básico', 'Os 25 artigos mais cobrados', 'Simulados de Penal e da Constituição', 'Tabela de penas, mapa mental e as 40 pegadinhas'].map(function (t) { return '<li>' + OK + '<span>' + t + '</span></li>'; }).join('') + '</ul>' +
        '<div class="px"><s>De R$ 29,90</s><b>R$ 18,90</b><small>pagamento único</small></div>' +
        '<a class="btn go block" id="upyes" href="' + link(CK.desc, s.afi) + '">Quero o Completo por R$ 18,90</a><button class="no" id="upno">Não, quero só o Básico por R$ 10,90</button></div>';
      document.getElementById('scrim').classList.add('show');
      document.getElementById('upyes').onclick = function () { px('InitiateCheckout', { currency: 'BRL', value: 18.9, content_name: 'PenalFlux Completo (desconto)' }); };
      document.getElementById('upno').onclick = function () {
        px('InitiateCheckout', { currency: 'BRL', value: 10.9, content_name: 'PenalFlux Básico' });
        location.href = (window.Rastreio && window.Rastreio.decorate) ? window.Rastreio.decorate(bas.href) : bas.href;
      };
    }, true);
    var sc = document.getElementById('scrim');
    sc.onclick = function (e) { if (e.target === sc) sc.classList.remove('show'); };
  }

  window.PFOffer = { render: render, track: px, trackCustom: pxc };
})();
