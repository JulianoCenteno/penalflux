/* PenalFlux · efeitos dos quizzes: sons (Web Audio, sem arquivos), vibração e carteira de bônus.
   O bônus total é sempre R$ 11,00: é a diferença entre o Completo (R$ 29,90) e a oferta com bônus (R$ 18,90). */
(function () {
  'use strict';
  var GOAL = 11;
  var ctx = null, muted = false;
  try { muted = localStorage.getItem('pf_mute') === '1'; } catch (e) {}

  function ac() {
    if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  // um tom com envelope curto
  function tone(f, t0, dur, type, vol, f2) {
    var c = ac(); if (!c || muted) return;
    var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  var S = {
    tap: function () { tone(520, 0, 0.06, 'sine', 0.12); },
    select: function () { tone(660, 0, 0.07, 'triangle', 0.14); tone(880, 0.05, 0.08, 'triangle', 0.1); },
    right: function () { tone(784, 0, 0.12, 'triangle', 0.2); tone(1047, 0.09, 0.16, 'triangle', 0.2); tone(1319, 0.18, 0.22, 'triangle', 0.16); },
    wrong: function () { tone(220, 0, 0.18, 'sawtooth', 0.08, 150); tone(160, 0.14, 0.24, 'sawtooth', 0.07, 110); },
    coin: function () { tone(988, 0, 0.07, 'square', 0.07); tone(1319, 0.06, 0.22, 'square', 0.07); },
    tick: function () { tone(1200, 0, 0.03, 'square', 0.04); },
    level: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.09, 0.18, 'triangle', 0.17); }); },
    whoosh: function () { tone(300, 0, 0.25, 'sine', 0.06, 900); },
    fanfare: function () { [523, 659, 784, 1047, 784, 1047, 1319].forEach(function (f, i) { tone(f, i * 0.1, i === 6 ? 0.6 : 0.16, 'triangle', 0.18); }); tone(262, 0, 0.9, 'sine', 0.08); },
    roll: function (n) { for (var i = 0; i < n; i++) tone(988 + i * 30, i * 0.07, 0.06, 'square', 0.05); }
  };
  function play(name, arg) { try { S[name] && S[name](arg); } catch (e) {} }
  function buzz(p) { try { if (!muted && navigator.vibrate) navigator.vibrate(p); } catch (e) {} }

  // botão de som no topo
  function muteButton(host) {
    var b = document.createElement('button');
    b.className = 'mute'; b.type = 'button';
    var draw = function () { b.textContent = muted ? '🔇' : '🔊'; b.setAttribute('aria-label', muted ? 'Ligar o som' : 'Desligar o som'); };
    draw();
    b.onclick = function () { muted = !muted; try { localStorage.setItem('pf_mute', muted ? '1' : '0'); } catch (e) {} draw(); if (!muted) play('tap'); };
    host.appendChild(b);
  }

  // carteira de bônus
  var brl = function (v) { return 'R$ ' + v.toFixed(2).replace('.', ','); };
  var W = { total: 0, el: null };
  function wallet(host) {
    var w = document.createElement('div');
    w.className = 'wallet'; w.innerHTML = '<span class="wi">💰</span><b id="wv">' + brl(0) + '</b>';
    w.title = 'Seu bônus';
    host.appendChild(w); W.el = w;
  }
  function floatAt(x, y, txt) {
    var f = document.createElement('div'); f.className = 'earn'; f.textContent = txt;
    f.style.left = x + 'px'; f.style.top = y + 'px';
    document.body.appendChild(f); setTimeout(function () { f.remove(); }, 1300);
  }
  // soma no saldo (com teto, para o bônus de conclusão completar o total)
  function earn(v, label, from) {
    v = Math.max(0, Math.min(v, GOAL - W.total));
    if (v <= 0) return 0;
    W.total = Math.round((W.total + v) * 100) / 100;
    var r = from && from.getBoundingClientRect ? from.getBoundingClientRect() : { left: innerWidth / 2 - 40, top: innerHeight / 2, width: 80 };
    floatAt(r.left + r.width / 2, r.top + window.scrollY, '+' + brl(v) + (label ? ' · ' + label : ''));
    setTimeout(function () {
      play('coin');
      if (W.el) {
        W.el.querySelector('#wv').textContent = brl(W.total);
        W.el.classList.remove('pop'); void W.el.offsetWidth; W.el.classList.add('pop');
      }
    }, 380);
    return v;
  }
  function rest() { return Math.round((GOAL - W.total) * 100) / 100; }
  function fill(label, from) { return earn(rest(), label, from); }

  // funil do quiz: cada etapa vai para /api/qe (painel do admin). Uma visita = um sid.
  var Q = { quiz: '', sid: '', utm: {} };
  (function () {
    var a = new Uint8Array(10); (window.crypto || window.msCrypto).getRandomValues(a);
    Q.sid = Array.prototype.map.call(a, function (x) { return ('0' + x.toString(36)).slice(-2); }).join('').replace(/[^a-z0-9]/g, '').slice(0, 20) || String(Date.now());
    var p = new URLSearchParams(location.search), keep = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { if (p.get(k)) keep[k] = p.get(k); });
    try { if (Object.keys(keep).length) sessionStorage.setItem('pf_utm', JSON.stringify(keep)); Q.utm = JSON.parse(sessionStorage.getItem('pf_utm') || '{}'); } catch (e) { Q.utm = keep; }
  })();
  var sent = {};
  function ev(step, data, once) {
    if (!Q.quiz) return;
    if (once !== false && sent[step]) return; sent[step] = 1;
    var body = JSON.stringify({ sid: Q.sid, quiz: Q.quiz, step: step, data: data || null, path: location.pathname, utm: Q.utm });
    try { if (navigator.sendBeacon && navigator.sendBeacon('/api/qe', new Blob([body], { type: 'text/plain' }))) return; } catch (e) {}
    try { fetch('/api/qe', { method: 'POST', body: body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }); } catch (e) {}
  }
  function init(quiz) { Q.quiz = quiz; ev('view'); }

  window.PFQ = { init: init, ev: ev };

  window.PFX = { play: play, buzz: buzz, muteButton: muteButton, wallet: wallet, earn: earn, fill: fill, rest: rest, brl: brl, GOAL: GOAL, get total() { return W.total; } };
})();
