/* ── DARK MODE ───────────────────────────── */
(function () {
  const html  = document.documentElement;
  const KEY   = 'orrent_theme';

  // Apply saved theme before paint to prevent flash
  const saved = localStorage.getItem(KEY) || 'light';
  html.setAttribute('data-theme', saved);

  function setIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre');
  }

  document.addEventListener('DOMContentLoaded', function () {
    setIcon(html.getAttribute('data-theme'));

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem(KEY, next);
        setIcon(next);
      });
    }
  });
})();

/* ── WHATSAPP POPUP ──────────────────────── */
(function () {
  const WA_KEY = 'orrent_wa_shown';

  document.addEventListener('DOMContentLoaded', function () {
    const popup    = document.getElementById('waPopup');
    const closeBtn = document.getElementById('waPopupClose');
    if (!popup) return;
    if (sessionStorage.getItem(WA_KEY)) return;

    setTimeout(function () {
      popup.classList.add('active');
      sessionStorage.setItem(WA_KEY, '1');
    }, 10000);

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        popup.classList.remove('active');
      });
    }

    // Close on backdrop click
    popup.addEventListener('click', function (e) {
      if (e.target === popup) popup.classList.remove('active');
    });
  });
})();
