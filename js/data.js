/* ─── ORRENT · data.js ─────────────────────────────────────────
   Chargement dynamique JSON pour les pages publiques
   Toutes les fonctions sont globales (pas de module)
   ─────────────────────────────────────────────────────────────── */

/* Dégradés rotatifs pour les couvertures eBook sans image */
const OR_EBOOK_GRAD = [
  'linear-gradient(135deg,#0A1628 0%,#16C784 100%)',
  'linear-gradient(135deg,#0EA05E 0%,#0A1628 100%)',
  'linear-gradient(135deg,#1e2d47 0%,#16C784 100%)',
  'linear-gradient(135deg,#0f172a 0%,#F59E0B 100%)',
  'linear-gradient(135deg,#16C784 0%,#0A1628 100%)',
  'linear-gradient(135deg,#0EA05E 0%,#1e2d47 100%)',
];

/* Icônes SVG rotatifs pour les couvertures eBook */
const OR_EBOOK_ICON = [
  `<svg viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round"><rect x="10" y="6" width="44" height="52" rx="4"/><path d="M20 20h24M20 28h24M20 36h16"/></svg>`,
  `<svg viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round"><circle cx="32" cy="26" r="12"/><path d="M12 56c0-11 9-20 20-20s20 9 20 20"/></svg>`,
  `<svg viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round"><path d="M8 52V20l24-12 24 12v32"/><path d="M24 52V36h16v16"/></svg>`,
  `<svg viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round"><path d="M32 8v48M8 32h48M18 18l28 28M46 18L18 46"/></svg>`,
  `<svg viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round"><path d="M10 32h44M10 20h44M10 44h28"/></svg>`,
  `<svg viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round"><path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24"/><path d="M40 8l16 8-8 16"/></svg>`,
];

/* Métadonnées visuelles par catégorie article */
const OR_ART_META = {
  marketing:   {
    grad: 'linear-gradient(135deg,#0A1628 0%,#16C784 100%)',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40L18 22l8 8 8-16 6 12"/></svg>`
  },
  psychologie: {
    grad: 'linear-gradient(135deg,#1e2d47 0%,#0EA05E 100%)',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"><circle cx="24" cy="20" r="10"/><path d="M24 30v4M14 44c0-5.5 4.5-10 10-10s10 4.5 10 10"/></svg>`
  },
  tunnel: {
    grad: 'linear-gradient(135deg,#0f172a 0%,#16C784 100%)',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"><path d="M6 10h36M10 20h28M14 30h20M18 40h12"/></svg>`
  },
  _default: {
    grad: 'linear-gradient(135deg,#0A1628 0%,#16C784 100%)',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"><rect x="8" y="4" width="32" height="40" rx="3"/><path d="M16 16h16M16 24h16M16 32h10"/></svg>`
  }
};

/* ── Utilitaires ───────────────────────────────────────────────── */

/** Fetch un fichier JSON avec cache-bust */
async function orLoad(path) {
  try {
    const r = await fetch(path + '?_=' + Date.now());
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  } catch (e) {
    console.warn('[ORRENT data]', path, e);
    return null;
  }
}

/** Classes de délai reveal selon position dans la grille */
function orDelay(idx) {
  return idx % 3 === 1 ? ' reveal-delay-1' : idx % 3 === 2 ? ' reveal-delay-2' : '';
}

/** Badge HTML pour un eBook */
function orEbookBadge(badge) {
  if (!badge) return '';
  const b = badge.toLowerCase();
  if (b.includes('avanc'))  return `<span class="badge badge-amber" style="align-self:flex-start">${badge}</span>`;
  if (b.includes('interm')) return `<span class="badge" style="align-self:flex-start;background:var(--dark-2);color:white">${badge}</span>`;
  return `<span class="badge badge-green" style="align-self:flex-start">${badge}</span>`;
}

/** Badge HTML pour un article */
function orArtBadge(badge, badge_color) {
  if (!badge) return '';
  if (badge_color === 'outline') return `<span class="badge badge-outline">${badge}</span>`;
  if (badge_color === 'dark')    return `<span class="badge badge-green" style="background:var(--dark-2);color:white">${badge}</span>`;
  return `<span class="badge badge-green">${badge}</span>`;
}

/** Catégorie data-filter pour le filtre du blog */
function orArtCat(badge) {
  if (!badge) return 'all';
  const b = badge.toLowerCase();
  if (b.includes('marketing'))   return 'marketing';
  if (b.includes('psycho'))      return 'psychologie';
  if (b.includes('tunnel'))      return 'tunnel';
  return 'all';
}

/* ── Templates HTML ─────────────────────────────────────────────── */

/** Carte eBook complète (ebooks.html) */
function orEbookCard(eb, idx) {
  const i = idx % OR_EBOOK_GRAD.length;
  const cover = eb.couverture
    ? `<div class="ebook-cover"><img src="${eb.couverture}" alt="${eb.titre}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r-lg) var(--r-lg) 0 0"></div>`
    : `<div class="ebook-cover" style="background:${OR_EBOOK_GRAD[i]}">${OR_EBOOK_ICON[i]}</div>`;
  return `<div class="ebook-card card-hover reveal${orDelay(idx)}" id="ebook-${eb.id}">
    ${cover}
    <div class="ebook-body">
      ${orEbookBadge(eb.badge)}
      <h3>${eb.titre}</h3>
      <p>${eb.description}</p>
      <div style="border-top:1px solid var(--border);margin-top:8px;padding-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div class="ebook-price">${eb.prix || ''}</div>
        <a href="${eb.lien_achat || '#'}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Acheter<span class="btn-icon"><svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13L13 3M13 3H7M13 3v6"/></svg></span></a>
      </div>
    </div>
  </div>`;
}

/** Carte eBook simplifiée (index.html — aperçu) */
function orEbookPreview(eb, idx) {
  const i = idx % OR_EBOOK_GRAD.length;
  const cover = eb.couverture
    ? `<div class="ebook-cover"><img src="${eb.couverture}" alt="${eb.titre}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r-lg) var(--r-lg) 0 0"></div>`
    : `<div class="ebook-cover" style="background:${OR_EBOOK_GRAD[i]}">${OR_EBOOK_ICON[i]}</div>`;
  return `<a href="ebooks.html#ebook-${eb.id}" class="ebook-card card-hover reveal${orDelay(idx)}">
    ${cover}
    <div class="ebook-body">
      <h3>${eb.titre}</h3>
      <p>${eb.description}</p>
      <div class="ebook-price">${eb.prix || ''}</div>
      <span class="btn btn-primary btn-sm" style="margin-top:8px">Acheter<span class="btn-icon"><svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13L13 3M13 3H7M13 3v6"/></svg></span></span>
    </div>
  </a>`;
}

/** Carte article */
function orArticleCard(art, idx) {
  const cat  = orArtCat(art.badge);
  const meta = OR_ART_META[cat] || OR_ART_META._default;
  return `<a href="${art.fichier || '#'}" class="article-card card-hover reveal${orDelay(idx)}" data-category="${cat}">
    <div class="article-thumb">
      <div class="article-thumb-bg" style="background:${meta.grad};height:100%;display:flex;align-items:center;justify-content:center;">
        ${meta.icon}
      </div>
    </div>
    <div class="article-body">
      ${orArtBadge(art.badge, art.badge_color)}
      <h3>${art.titre}</h3>
      <p>${art.description}</p>
      <div class="article-footer">
        <span>${art.date || ''} · ${art.lecture || ''}</span>
        <span class="article-read">Lire <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg></span>
      </div>
    </div>
  </a>`;
}

/** Carte témoignage */
function orTemoCard(t, idx) {
  const stars  = '★'.repeat(Math.min(t.note || 5, 5));
  const avatar = t.photo
    ? `<img src="${t.photo}" alt="${t.nom}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0">`
    : `<div class="testimonial-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="var(--green-dark)" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>`;
  return `<div class="testimonial-card reveal${orDelay(idx)}">
    <div class="testimonial-stars">${stars}</div>
    <p class="testimonial-text">"${t.temoignage}"</p>
    <div class="testimonial-author">
      ${avatar}
      <div>
        <div class="testimonial-name">${t.nom}</div>
        <div class="testimonial-role">${t.role || ''}</div>
      </div>
    </div>
  </div>`;
}

/** Élément événement (index.html) */
function orEventItem(ev, idx) {
  const d   = (ev.date || '').toLowerCase();
  const day = d.includes('samedi') ? 'SAM' : d.includes('dimanche') ? 'DIM' : d.slice(0, 3).toUpperCase();
  const mon = (ev.badge || 'Hebdo').slice(0, 5).toUpperCase();
  const isWA = (ev.plateforme || '').toLowerCase().includes('whatsapp');
  const platIcon = isWA
    ? `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`
    : `<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`;
  const typeLabel = idx === 0 ? 'Formation' : 'Live';
  const btnCls  = idx === 0 ? 'btn btn-primary btn-sm' : 'btn btn-outline-white btn-sm';
  const btnText = idx === 0 ? 'Rejoindre' : 'Me rappeler';
  const delay   = idx > 0 ? ` reveal-delay-${Math.min(idx, 2)}` : '';
  return `<div class="event-item reveal${delay}">
    <div class="event-date-badge">
      <span class="day">${day}</span>
      <span class="month">${mon}</span>
    </div>
    <div class="event-info">
      <div class="event-type">${typeLabel}</div>
      <h3>${ev.titre}</h3>
      <p>${ev.description}</p>
      <span class="event-platform">
        ${platIcon}
        ${ev.plateforme || ''} · ${ev.date || ''}
      </span>
    </div>
    <a href="${ev.lien || '#'}" target="_blank" rel="noopener" class="${btnCls}">${btnText}</a>
  </div>`;
}

/** Carte formation (index.html) */
function orFormationCard(f) {
  return `<div class="formation-card card-hover reveal">
    <div class="formation-icon">
      <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
    </div>
    <div class="formation-body">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <h3>${f.titre}</h3>
        <span class="badge badge-green">${f.badge || f.prix || ''}</span>
      </div>
      <p>${f.description}</p>
      <div class="formation-meta">
        <span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${f.frequence || ''}</span>
        <span><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>${f.sessions || ''}</span>
        <span>${f.prix || ''}</span>
      </div>
      <a href="${f.lien_inscription || '#'}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">S'inscrire</a>
    </div>
  </div>`;
}
