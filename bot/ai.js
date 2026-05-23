const Anthropic = require('@anthropic-ai/sdk');
const { SYSTEM_PROMPT } = require('./knowledge');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Historique de conversation par contact (en mémoire — se réinitialise au redémarrage)
const histories = new Map();
const MAX_TURNS = 8; // 8 échanges = 16 messages conservés

async function getAIResponse(contactId, userMessage) {
  if (!histories.has(contactId)) {
    histories.set(contactId, []);
  }

  const history = histories.get(contactId);
  history.push({ role: 'user', content: userMessage });

  // Taille maximale de l'historique
  while (history.length > MAX_TURNS * 2) {
    history.splice(0, 2);
  }

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: history,
  });

  const reply = response.content[0].text;
  history.push({ role: 'assistant', content: reply });

  return reply;
}

function resetConversation(contactId) {
  histories.delete(contactId);
}

module.exports = { getAIResponse, resetConversation };
