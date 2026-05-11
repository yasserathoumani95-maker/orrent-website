// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Menu hamburger
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});
mobileOverlay.addEventListener('click', closeMenu);

// Close menu on nav link click
document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ── Scroll nav buttons (haut + bas) ─────────────
(function () {
  var wrap = document.createElement('div');
  wrap.className = 'scroll-nav-wrap';

  var btnUp = document.createElement('button');
  btnUp.className = 'scroll-nav-btn';
  btnUp.setAttribute('aria-label', 'Remonter en haut');
  btnUp.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';

  var btnDown = document.createElement('button');
  btnDown.className = 'scroll-nav-btn';
  btnDown.setAttribute('aria-label', 'Aller en bas');
  btnDown.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  wrap.appendChild(btnUp);
  wrap.appendChild(btnDown);
  document.body.appendChild(wrap);

  var hideTimer = null;

  function show() {
    wrap.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      wrap.classList.remove('visible');
    }, 3000);
  }

  btnUp.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnDown.addEventListener('click', function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  window.addEventListener('scroll', show, { passive: true });
}());

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
