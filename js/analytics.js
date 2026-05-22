(function () {
  document.addEventListener('click', function (e) {
    if (typeof gtag !== 'function') return;
    var el = e.target.closest('a, button');
    if (!el) return;

    var href = el.getAttribute('href') || '';
    var text = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').substring(0, 60);

    if (el.classList.contains('wa-float')) {
      gtag('event', 'whatsapp_float_click', { event_category: 'engagement' });
    } else if (el.classList.contains('wa-popup-btn')) {
      gtag('event', 'whatsapp_popup_click', { event_category: 'engagement' });
    } else if (href.indexOf('wa.me') !== -1) {
      gtag('event', 'whatsapp_direct_click', { event_category: 'engagement', event_label: text });
    } else if (href.indexOf('chat.whatsapp.com') !== -1) {
      gtag('event', 'whatsapp_group_click', { event_category: 'engagement', event_label: text });
    } else if (text.toLowerCase().indexOf('acheter') !== -1 || text.toLowerCase().indexOf('commander') !== -1) {
      gtag('event', 'ebook_buy_click', { event_category: 'ecommerce', event_label: text });
    } else if (href.indexOf('#contact') !== -1 || text.toLowerCase().indexOf('nous contacter') !== -1) {
      gtag('event', 'contact_cta_click', { event_category: 'engagement', event_label: text });
    } else if (text.toLowerCase().indexOf("s'inscrire") !== -1 || text.toLowerCase().indexOf('inscrire') !== -1 || text.toLowerCase().indexOf('rejoindre') !== -1) {
      gtag('event', 'inscription_click', { event_category: 'engagement', event_label: text });
    } else if (text.toLowerCase().indexOf('diagnostic') !== -1) {
      gtag('event', 'diagnostic_click', { event_category: 'engagement', event_label: text });
    }
  });
}());
