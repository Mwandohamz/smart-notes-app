const { generateSummary } = require('../services/openaiService');

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

