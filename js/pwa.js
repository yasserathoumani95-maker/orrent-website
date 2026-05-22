// ── Service Worker ──────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
}

// ── Splash screen (uniquement en mode app installée) ────────────────────────
(function () {
  var isApp = window.navigator.standalone === true ||
              window.matchMedia('(display-mode: standalone)').matches;
  if (!isApp) return;

  var s = document.createElement('style');
  s.textContent =
    '#or-splash{position:fixed;inset:0;z-index:99999;background:#0A1628;' +
    'display:flex;flex-direction:column;align-items:center;justify-content:center;' +
    'gap:0;padding:0 24px;transition:opacity .45s ease,visibility .45s ease;}' +
    '#or-splash.out{opacity:0;visibility:hidden;}' +
    '#or-splash img{width:80px;height:80px;border-radius:20px;margin-bottom:20px;' +
    'box-shadow:0 8px 32px rgba(22,199,132,.25);}' +
    '#or-splash .sp-title{font-family:"Montserrat",sans-serif;font-size:30px;' +
    'font-weight:900;color:#fff;letter-spacing:-0.5px;margin-bottom:6px;text-align:center;}' +
    '#or-splash .sp-tag{font-size:14px;color:rgba(255,255,255,.5);text-align:center;' +
    'margin-bottom:36px;font-style:italic;}' +
    '#or-splash .sp-bar-track{width:56px;height:3px;background:rgba(255,255,255,.1);' +
    'border-radius:2px;overflow:hidden;}' +
    '#or-splash .sp-bar{height:100%;background:#16C784;border-radius:2px;width:0;' +
    'animation:spBarAnim 1.6s cubic-bezier(.4,0,.2,1) forwards;}' +
    '@keyframes spBarAnim{0%{width:0}100%{width:100%}}';
  document.head.appendChild(s);

  var el = document.createElement('div');
  el.id = 'or-splash';
  el.innerHTML =
    '<img src="logo.png" alt="ORRENT">' +
    '<div class="sp-title">Bienvenue chez ORRENT</div>' +
    '<div class="sp-tag">Propulsez votre business</div>' +
    '<div class="sp-bar-track"><div class="sp-bar"></div></div>';
  document.body.appendChild(el);

  setTimeout(function () {
    el.classList.add('out');
    setTimeout(function () { el.remove(); }, 460);
  }, 1900);
}());
