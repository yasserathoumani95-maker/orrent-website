const { GoogleGenerativeAI } = require('@google/generative-ai');
const { SYSTEM_PROMPT } = require('./knowledge');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction: SYSTEM_PROMPT,
});

// Historique de conversation par contact (en mémoire)
// Format Gemini : { role: 'user' | 'model', parts: [{ text }] }
const histories = new Map();
const MAX_TURNS = 8;

async function getAIResponse(contactId, userMessage) {
  if (!histories.has(contactId)) {
    histories.set(contactId, []);
  }

  const history = histories.get(contactId);

  // Crée une session de chat avec l'historique existant
  const chat = model.startChat({ history });

  // Envoie le message et récupère la réponse
  const result = await chat.sendMessage(userMessage);
  const reply = result.response.text();

  // Met à jour l'historique
  history.push({ role: 'user',  parts: [{ text: userMessage }] });
  history.push({ role: 'model', parts: [{ text: reply }] });

  // Limite la taille de l'historique
  while (history.length > MAX_TURNS * 2) {
    history.splice(0, 2);
  }

  return reply;
}

function resetConversation(contactId) {
  histories.delete(contactId);
}

module.exports = { getAIResponse, resetConversation };
