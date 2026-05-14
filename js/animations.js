// Intersection Observer — reveal au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

// Attendre le premier paint pour que les éléments visibles soient déjà rendus
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  });
});

// Compteur animé
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1200;
  const steps = 40;
  const increment = target / steps;
  let current = 0;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    current = Math.round(increment * step);
    if (step >= steps || current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + current + suffix;
  }, duration / steps);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// Ré-observer les éléments .reveal ajoutés dynamiquement (appel depuis data.js)
window.initReveal = function () {
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  });
};
