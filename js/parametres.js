/* ─── ORRENT · parametres.js ────────────────────────────────────────
   Charge data/parametres.json et met à jour tous les liens
   dynamiquement sur chaque page publique.
   Inclure en dernier avant </body> sur toutes les pages.
   ─────────────────────────────────────────────────────────────────── */
(async function () {
  try {
    const r = await fetch('data/parametres.json?_=' + Date.now());
    const p = r.ok ? await r.json() : null;
    if (!p) return;

    const waNum = p.whatsapp ? p.whatsapp.replace(/\D/g, '') : null;

    document.querySelectorAll('a').forEach(a => {
      const h = a.getAttribute('href') || '';

      /* Numéro WhatsApp contact — remplace le numéro dans wa.me/XXXX
         mais conserve le paramètre ?text= existant */
      if (waNum && h.includes('wa.me/')) {
        a.setAttribute('href', h.replace(/wa\.me\/\d+/, 'wa.me/' + waNum));
      }

      /* Lien groupe WhatsApp */
      if (p.whatsapp_groupe && h.includes('chat.whatsapp.com')) {
        a.setAttribute('href', p.whatsapp_groupe);
      }

      /* Email — conserve le ?subject= s'il existe */
      if (p.email && h.startsWith('mailto:')) {
        const parts = h.split('?');
        a.setAttribute('href', 'mailto:' + p.email + (parts[1] ? '?' + parts[1] : ''));
        /* Met aussi à jour le texte visible si c'est juste l'adresse */
        const t = a.textContent.trim();
        if (t.includes('@') && !t.includes(' ')) a.textContent = p.email;
      }
    });

    /* Réseaux sociaux dans le footer */
    if (p.tiktok)
      document.querySelectorAll('a[href*="tiktok.com/@orrentcomores"]').forEach(a => { a.href = p.tiktok; });
    if (p.instagram)
      document.querySelectorAll('a[href*="instagram.com/orrent"]').forEach(a => { a.href = p.instagram; });
    if (p.facebook)
      document.querySelectorAll('a[href*="facebook.com/Orrent"]').forEach(a => { a.href = p.facebook; });

    /* Services masqués depuis l'admin (Paramètres → Visibilité des services)
       Tout élément portant data-service="<id>" est caché si <id> figure
       dans parametres.json → services_masques */
    if (Array.isArray(p.services_masques)) {
      p.services_masques.forEach(id => {
        document.querySelectorAll('[data-service="' + id + '"]').forEach(el => {
          el.style.display = 'none';
        });
      });
    }

  } catch (_) { /* Silencieux — le site fonctionne avec les valeurs de secours */ }
})();
