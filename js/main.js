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

// ── Scroll nav button (haut / bas) ──────────────
(function () {
  var btn = document.createElement('button');
  btn.className = 'scroll-nav-btn going-down';
  btn.setAttribute('aria-label', 'Aller en bas');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);

  var hideTimer = null;

  function show() {
    btn.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      btn.classList.remove('visible');
    }, 3000);
  }

  function updateDirection() {
    if (window.scrollY < 200) {
      btn.classList.add('going-down');
      btn.classList.remove('going-up');
      btn.setAttribute('aria-label', 'Aller en bas');
    } else {
      btn.classList.add('going-up');
      btn.classList.remove('going-down');
      btn.setAttribute('aria-label', 'Remonter en haut');
    }
  }

  btn.addEventListener('click', function () {
    clearTimeout(hideTimer);
    if (btn.classList.contains('going-down')) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', function () {
    updateDirection();
    show();
  }, { passive: true });

  updateDirection();
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
