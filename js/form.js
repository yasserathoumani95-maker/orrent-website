(function () {
  var form    = document.getElementById('contactForm');
  var btn     = document.getElementById('contactSubmit');
  var btnIcon = document.getElementById('contactBtnIcon');
  var feedback = document.getElementById('formFeedback');

  if (!form) return;

  var FORMSPREE_ID = 'mkoyylzw';

  var spinnerSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="animation:spin .7s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>';
  var arrowSVG   = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13L13 3M13 3H7M13 3v6"/></svg>';

  // Inject spinner keyframes once
  if (!document.getElementById('formSpinStyle')) {
    var style = document.createElement('style');
    style.id  = 'formSpinStyle';
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  function setLoading(on) {
    btn.disabled = on;
    btn.style.opacity = on ? '0.75' : '1';
    btnIcon.innerHTML = on ? spinnerSVG : arrowSVG;
    if (on) {
      btn.childNodes[0].nodeValue = 'Envoi en cours… ';
    } else {
      btn.childNodes[0].nodeValue = 'Envoyer ma demande ';
    }
  }

  function showFeedback(ok, msg) {
    feedback.style.display = 'block';
    feedback.style.background = ok ? 'rgba(22,199,132,0.12)' : 'rgba(255,80,80,0.10)';
    feedback.style.color       = ok ? 'var(--green)' : '#e05252';
    feedback.style.border      = ok ? '1px solid rgba(22,199,132,0.25)' : '1px solid rgba(255,80,80,0.2)';
    feedback.textContent       = msg;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^[\+\d\s\-]{7,20}$/;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot — rejet silencieux si rempli par un bot
    var gotcha = document.getElementById('_gotcha');
    if (gotcha && gotcha.value) { return; }

    // Anti-spam temporel (60s entre 2 envois)
    var lastSubmit = sessionStorage.getItem('orrent_last_submit');
    if (lastSubmit && (Date.now() - parseInt(lastSubmit, 10)) < 60000) {
      showFeedback(false, 'Vous avez déjà envoyé un message. Attendez un moment avant d\'en envoyer un autre.');
      return;
    }

    var nom      = document.getElementById('nom').value.trim();
    var contact  = document.getElementById('contactField').value.trim();
    var activite = document.getElementById('activite').value.trim();
    var message  = document.getElementById('message').value.trim();

    if (!nom || !contact || !message) {
      showFeedback(false, 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (nom.length < 2) {
      showFeedback(false, 'Votre nom doit comporter au moins 2 caractères.');
      return;
    }
    if (nom.length > 100) {
      showFeedback(false, 'Votre nom est trop long (100 caractères max).');
      return;
    }
    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      showFeedback(false, 'Veuillez entrer une adresse email ou un numéro de téléphone valide.');
      return;
    }
    if (message.length < 10) {
      showFeedback(false, 'Votre message doit comporter au moins 10 caractères.');
      return;
    }
    if (message.length > 2000) {
      showFeedback(false, 'Votre message est trop long (2000 caractères max).');
      return;
    }

    setLoading(true);
    feedback.style.display = 'none';

    var data = new FormData();
    data.append('nom',      nom);
    data.append('contact',  contact);
    data.append('activite', activite || 'Non précisé');
    data.append('message',  message);

    fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method:  'POST',
      body:    data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      setLoading(false);
      if (res.ok) {
        showFeedback(true, '✅ Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
        sessionStorage.setItem('orrent_last_submit', Date.now());
        form.reset();
      } else {
        return res.json().then(function (body) {
          throw new Error(body.error || 'Erreur lors de l\'envoi.');
        });
      }
    })
    .catch(function (err) {
      setLoading(false);
      showFeedback(false, '❌ ' + (err.message || 'Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.'));
    });
  });
}());
