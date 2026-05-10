const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nom     = document.getElementById('nom').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const activite = document.getElementById('activite').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!nom || !contact || !message) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const text = `Bonjour ORRENT 👋\n\nNom: ${nom}\nContact: ${contact}\nActivité: ${activite}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/21654200528?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  });
}
