(function () {
  var WA    = 'https://wa.me/21654200528';
  var WA_GR = 'https://chat.whatsapp.com/FhNm9t68yUzE7WHAMKfsgk';

  var FLOWS = {
    start: {
      msg: 'Bonjour 👋 Je suis l’assistant ORRENT.\nComment puis-je vous aider ?',
      choices: [
        { label: 'Nos services',       next: 'services'   },
        { label: 'Formations',         next: 'formations' },
        { label: 'eBooks',             next: 'ebooks'     },
        { label: 'Tarifs & devis',     next: 'tarifs'     },
        { label: 'Diagnostic gratuit', next: 'diagnostic' }
      ]
    },
    services: {
      msg: 'ORRENT propose 4 services :\n\n• Stratégie de contenu & Inbound Marketing\n• Gestion réseaux sociaux (TikTok, Instagram, Facebook)\n• Création de tunnels de vente\n• Diagnostic marketing gratuit',
      choices: [
        { label: 'Voir les services',    link: 'services.html' },
        { label: 'Parler à l’équipe', wa: true },
        { label: '← Retour',        next: 'start'         }
      ]
    },
    formations: {
      msg: 'Le Samedi Digital est une formation 100 % gratuite !\n\nChaque samedi • 10h–11h30 • WhatsApp & Zoom\n17 sessions : TikTok, copywriting, psychologie client, tunnel de vente et plus.',
      choices: [
        { label: 'S’inscrire gratuitement', wa_group: true           },
        { label: 'Voir le programme',            link: 'formations.html' },
        { label: '← Retour',                next: 'start'           }
      ]
    },
    ebooks: {
      msg: '6 guides pratiques pour le marché comorien :\n\n📘 TikTok pour entrepreneurs\n📗 Psychologie du client\n📙 Tunnel de vente en 7 jours\n📕 Inbound Marketing\n\nDe 2 500 à 5 000 KMF — livré par email.',
      choices: [
        { label: 'Voir les eBooks',      link: 'ebooks.html' },
        { label: 'Acheter via WhatsApp', wa: true            },
        { label: '← Retour',        next: 'start'       }
      ]
    },
    tarifs: {
      msg: 'Le diagnostic est 100 % gratuit et sans engagement.\n\nLes services d’accompagnement sont sur devis selon votre projet. Contactez-nous pour une proposition personnalisée.',
      choices: [
        { label: 'Demander un devis',  wa: true                       },
        { label: 'Envoyer un email',   email: 'orrentcomores@gmail.com' },
        { label: '← Retour',      next: 'start'                  }
      ]
    },
    diagnostic: {
      msg: 'Le diagnostic marketing ORRENT est 100 % gratuit ✔️\n\nEn 30 minutes, on identifie vos points forts, vos blocages et les axes prioritaires pour développer votre business en ligne.',
      choices: [
        { label: 'Prendre rendez-vous', wa: true    },
        { label: '← Retour',       next: 'start' }
      ]
    }
  };

  /* ── Styles ──────────────────────────────────────────────────────────── */
  var css = [
    '#or-ct{position:fixed;bottom:24px;left:24px;width:56px;height:56px;border-radius:50%;',
    'background:var(--dark-2,#0A1628);border:2px solid var(--green,#16C784);',
    'display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:1000;',
    'box-shadow:0 4px 20px rgba(22,199,132,.28);transition:transform .2s,box-shadow .2s;}',
    '#or-ct:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(22,199,132,.4);}',
    '#or-ct svg{width:24px;height:24px;}',
    '#or-cb{position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;',
    'background:var(--green,#16C784);border:2.5px solid #fff;',
    'animation:cbPulse 2s ease-in-out infinite;}',
    '@keyframes cbPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}',

    '#or-cw{position:fixed;bottom:92px;left:24px;width:320px;max-height:480px;',
    'background:var(--white,#fff);border-radius:16px;',
    'box-shadow:0 16px 48px rgba(0,0,0,.18);border:1px solid var(--border,#E2E8F0);',
    'display:flex;flex-direction:column;z-index:1001;overflow:hidden;',
    'transform-origin:bottom left;',
    'transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .2s ease;}',
    '#or-cw.or-closed{transform:scale(0.82) translateY(16px);opacity:0;pointer-events:none;}',

    '#or-ch{background:var(--dark-2,#0A1628);padding:14px 16px;',
    'display:flex;align-items:center;gap:10px;}',
    '.or-av{width:36px;height:36px;border-radius:50%;',
    'background:rgba(22,199,132,.15);border:2px solid var(--green,#16C784);',
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.or-av img{width:22px;height:22px;border-radius:50%;object-fit:cover;}',
    '.or-hn{font-size:14px;font-weight:700;color:#fff;}',
    '.or-hs{font-size:11px;color:var(--green,#16C784);display:flex;align-items:center;gap:4px;}',
    '.or-hd{width:6px;height:6px;border-radius:50%;background:var(--green,#16C784);animation:cbPulse 2s infinite;}',
    '#or-hx{margin-left:auto;background:none;border:none;cursor:pointer;',
    'color:rgba(255,255,255,.6);padding:4px;border-radius:6px;display:flex;}',
    '#or-hx:hover{color:#fff;background:rgba(255,255,255,.1);}',

    '#or-cm{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;',
    'gap:8px;background:var(--surface,#F8FAFC);}',
    '.or-mb{background:var(--white,#fff);border:1px solid var(--border,#E2E8F0);',
    'border-radius:12px 12px 12px 2px;padding:10px 12px;font-size:13px;',
    'color:var(--body,#1E293B);line-height:1.65;max-width:86%;animation:orMsgIn .22s ease;}',
    '.or-mu{background:var(--dark-2,#0A1628);color:#fff;',
    'border-radius:12px 12px 2px 12px;padding:8px 12px;font-size:13px;',
    'align-self:flex-end;max-width:86%;animation:orMsgIn .22s ease;}',
    '@keyframes orMsgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
    '.or-ty{display:flex;gap:4px;align-items:center;padding:10px 14px;',
    'background:var(--white,#fff);border:1px solid var(--border,#E2E8F0);',
    'border-radius:12px 12px 12px 2px;width:fit-content;}',
    '.or-ty span{width:6px;height:6px;border-radius:50%;background:var(--muted,#94A3B8);',
    'animation:orTy 1s ease-in-out infinite;}',
    '.or-ty span:nth-child(2){animation-delay:.15s}',
    '.or-ty span:nth-child(3){animation-delay:.3s}',
    '@keyframes orTy{0%,60%,100%{opacity:.3;transform:none}30%{opacity:1;transform:translateY(-3px)}}',

    '#or-cc{padding:10px 12px 14px;display:flex;flex-wrap:wrap;gap:7px;',
    'border-top:1px solid var(--border,#E2E8F0);background:var(--white,#fff);}',
    '.or-c{font-size:12px;font-weight:600;padding:7px 12px;border-radius:100px;',
    'border:1.5px solid var(--green,#16C784);color:var(--green-dark,#0EA05E);',
    'background:transparent;cursor:pointer;transition:background .15s,color .15s;font-family:inherit;}',
    '.or-c:hover,.or-c:active{background:var(--green,#16C784);color:#fff;}',
    '.or-back{border-color:var(--border,#E2E8F0);color:var(--muted,#94A3B8);}',
    '.or-back:hover,.or-back:active{background:var(--border,#E2E8F0)!important;color:var(--body,#1E293B)!important;}',

    '@media(max-width:400px){',
    '#or-cw{width:calc(100vw - 32px);left:16px;}',
    '#or-ct{left:16px;}}'
  ].join('');

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ── DOM ─────────────────────────────────────────────────────────────── */
  var trigger = document.createElement('div');
  trigger.id = 'or-ct';
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', 'Ouvrir le chat ORRENT');
  trigger.innerHTML =
    '<div id="or-cb"></div>' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="#16C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';

  var win = document.createElement('div');
  win.id = 'or-cw';
  win.classList.add('or-closed');
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'Chat ORRENT');
  win.innerHTML =
    '<div id="or-ch">' +
      '<div class="or-av"><img src="logo.png" alt="ORRENT" onerror="this.style.display=\'none\'"></div>' +
      '<div><div class="or-hn">Assistant ORRENT</div>' +
      '<div class="or-hs"><span class="or-hd"></span>En ligne</div></div>' +
      '<button id="or-hx" aria-label="Fermer">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
        '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
    '</div>' +
    '<div id="or-cm"></div>' +
    '<div id="or-cc"></div>';

  document.body.appendChild(trigger);
  document.body.appendChild(win);

  /* ── Logic ───────────────────────────────────────────────────────────── */
  var msgs    = document.getElementById('or-cm');
  var choices = document.getElementById('or-cc');
  var isOpen  = false;

  function open() {
    isOpen = true;
    win.classList.remove('or-closed');
    var badge = document.getElementById('or-cb');
    if (badge) badge.style.display = 'none';
    if (!msgs.children.length) {
      setTimeout(function () { showTyping(function () { showFlow('start'); }); }, 350);
    }
  }

  function close() {
    isOpen = false;
    win.classList.add('or-closed');
  }

  function addMsg(text, bot) {
    var el = document.createElement('div');
    el.className = bot ? 'or-mb' : 'or-mu';
    el.innerHTML = text.replace(/\n/g, '<br>');
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping(cb) {
    var t = document.createElement('div');
    t.className = 'or-ty';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); cb(); }, 650);
  }

  function showFlow(key) {
    var flow = FLOWS[key];
    if (!flow) return;
    addMsg(flow.msg, true);
    choices.innerHTML = '';
    flow.choices.forEach(function (c) {
      var btn = document.createElement('button');
      btn.className = 'or-c' + (c.label.indexOf('←') !== -1 ? ' or-back' : '');
      btn.textContent = c.label;
      btn.addEventListener('click', function () {
        addMsg(c.label, false);
        choices.innerHTML = '';
        if (c.next) {
          setTimeout(function () { showTyping(function () { showFlow(c.next); }); }, 200);
        } else if (c.link) {
          window.location.href = c.link;
        } else if (c.wa) {
          window.open(WA + '?text=' + encodeURIComponent('Bonjour ORRENT, je voudrais en savoir plus.'), '_blank', 'noopener');
        } else if (c.wa_group) {
          window.open(WA_GR, '_blank', 'noopener');
        } else if (c.email) {
          window.location.href = 'mailto:' + c.email;
        }
      });
      choices.appendChild(btn);
    });
    msgs.scrollTop = msgs.scrollHeight;
  }

  trigger.addEventListener('click', function () { isOpen ? close() : open(); });
  document.getElementById('or-hx').addEventListener('click', close);
}());
