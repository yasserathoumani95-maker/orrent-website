require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getAIResponse, resetConversation } = require('./ai');
const { YASSER_WA } = require('./knowledge');

// ── Rate limiting ─────────────────────────────────────────────────────────────
const rateLimits = new Map();
const MAX_MSG_PER_HOUR = 15;

function isRateLimited(contactId) {
  const now = Date.now();
  const HOUR = 60 * 60 * 1000;
  if (!rateLimits.has(contactId)) rateLimits.set(contactId, []);
  const timestamps = rateLimits.get(contactId).filter(t => now - t < HOUR);
  rateLimits.set(contactId, timestamps);
  if (timestamps.length >= MAX_MSG_PER_HOUR) return true;
  timestamps.push(now);
  return false;
}

// ── Client WhatsApp ───────────────────────────────────────────────────────────
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: './.wwebjs_auth' }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
    ],
  },
});

client.on('qr', qr => {
  console.log('\n📱 Scanne ce QR code dans WhatsApp > Appareils liés :\n');
  qrcode.generate(qr, { small: true });
  console.log('\n⏳ En attente du scan...\n');
});

client.on('loading_screen', (percent, message) => {
  process.stdout.write(`\r⏳ Chargement : ${percent}% — ${message}  `);
});

client.on('authenticated', () => {
  console.log('\n🔐 Authentifié avec succès !');
});

client.on('auth_failure', msg => {
  console.error('❌ Échec d\'authentification :', msg);
});

client.on('ready', () => {
  console.log('✅ Bot ORRENT prêt — en attente de messages 24h/24\n');
});

client.on('disconnected', reason => {
  console.warn('⚠️  Déconnecté :', reason, '— Reconnexion dans 10s...');
  setTimeout(() => client.initialize(), 10000);
});

// ── Gestion des messages entrants ────────────────────────────────────────────
client.on('message', async msg => {
  // Ignorer : groupes, statuts, messages de soi-même
  if (msg.isGroupMsg || msg.from.includes('@g.us')) return;
  if (msg.from === 'status@broadcast') return;
  if (msg.fromMe) return;

  const contactId = msg.from;
  const text = (msg.body || '').trim();

  // Commande de reset de conversation
  if (text.toLowerCase() === '!reset' || text.toLowerCase() === 'reset') {
    resetConversation(contactId);
    await msg.reply('Conversation réinitialisée. Bonjour ! Je suis Orri, l\'assistant ORRENT. Comment puis-je t\'aider ? 😊');
    return;
  }

  // Messages non-texte (images, audio, vidéo...)
  if (msg.type !== 'chat') {
    await msg.reply('Je peux uniquement traiter les messages texte pour l\'instant. Écris-moi ta question et je te réponds ! 😊');
    return;
  }

  // Ignorer les messages vides
  if (!text) return;

  // Rate limiting
  if (isRateLimited(contactId)) {
    await msg.reply('Tu envoies beaucoup de messages ! Patiente quelques minutes et réessaie. 🙏');
    return;
  }

  try {
    // Indicateur "en train d'écrire..."
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    // Délai naturel (1.5 à 3 secondes) pour ne pas paraître robotique
    const delay = 1500 + Math.random() * 1500;
    await new Promise(resolve => setTimeout(resolve, delay));

    const reply = await getAIResponse(contactId, text);

    await chat.clearState();
    await msg.reply(reply);

    const contact = await msg.getContact();
    const name = contact.pushname || contactId;
    console.log(`[${new Date().toLocaleTimeString()}] ✉️  ${name} → répondu`);

  } catch (err) {
    console.error('Erreur réponse :', err.message);
    await msg.reply(`Désolé, je rencontre un problème technique. Contacte Yasser directement : ${YASSER_WA} 🙏`);
  }
});

// ── Arrêt propre ─────────────────────────────────────────────────────────────
process.on('SIGINT', async () => {
  console.log('\n🛑 Arrêt du bot...');
  await client.destroy();
  process.exit(0);
});

console.log('🚀 Démarrage du bot ORRENT WhatsApp...');
client.initialize();
