// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Menu hamburger
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

hamburger.setAttribute('aria-expanded', 'false');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  mobileNav.removeAttribute('aria-hidden');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});
mobileOverlay.addEventListener('click', closeMenu);

// Close menu on nav link click
document.querySelectorAll('.mobile-nav .mobile-link').forEach(link => {
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

// Table des matières auto-générée sur les pages articles
(function () {
  var prose = document.querySelector('.prose');
  if (!prose) return;
  var headings = Array.from(prose.querySelectorAll('h2'));
  if (headings.length < 3) return;

  headings.forEach(function (h, i) {
    if (!h.id) h.id = 'section-' + (i + 1);
  });

  var toc = document.createElement('div');
  toc.className = 'prose-toc';
  toc.innerHTML = '<div class="prose-toc-label">Dans cet article</div><ol>' +
    headings.map(function (h, i) {
      var num = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);
      return '<li><a href="#' + h.id + '"><span class="prose-toc-num">' + num + '</span>' + h.textContent + '</a></li>';
    }).join('') +
    '</ol>';

  var firstChild = prose.firstElementChild;
  if (firstChild && firstChild.style && firstChild.style.background) {
    firstChild.after(toc);
  } else {
    prose.insertBefore(toc, prose.firstChild);
  }
}());

// Barre de progression de lecture (active uniquement sur les pages articles)
(function () {
  var bar = document.getElementById('readingProgress');
  if (!bar) return;
  var prose = document.querySelector('.article-prose') || document.querySelector('article') || document.querySelector('main');
  if (!prose) return;
  window.addEventListener('scroll', function () {
    var rect = prose.getBoundingClientRect();
    var total = prose.offsetHeight - window.innerHeight;
    var scrolled = -rect.top;
    var pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', Math.round(pct));
  }, { passive: true });
}());
