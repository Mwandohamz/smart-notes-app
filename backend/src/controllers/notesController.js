const { generateSummary, answerQuestion } = require('../services/openaiService');

async function handleSummarize(req, res) {
  try {
    const { text } = req.body || {};
    if (typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Missing required "text" in request body' });
    }

    const result = await generateSummary(text);
    return res.status(200).json({ summary: result });
  } catch (err) {
    const message = err && err.message ? err.message : 'Failed to generate summary';
    return res.status(500).json({ error: message });
  }
}

module.exports = { handleSummarize };
async function handleQuestion(req, res) {
  try {
    const { text, question } = req.body || {};
    if (typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Missing required "text" in request body' });
    }
    if (typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Missing required "question" in request body' });
    }

    const answer = await answerQuestion(text, question);
    return res.status(200).json({ answer });
  } catch (err) {
    const message = err && err.message ? err.message : 'Failed to answer question';
    return res.status(500).json({ error: message });
  }
}

module.exports = { handleSummarize, handleQuestion };

