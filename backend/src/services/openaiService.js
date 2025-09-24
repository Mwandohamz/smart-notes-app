const OpenAI = require('openai');

// Configure the OpenAI client using the API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate a concise, well-structured summary of the provided text.
 * @param {string} text - The input text to summarize.
 * @returns {Promise<string>} - The model's summary content.
 */
async function generateSummary(text) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('generateSummary: "text" must be a non-empty string');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  const messages = [
    {
      role: 'system',
      content:
        'You are a helpful assistant that writes concise, accurate, and well-structured summaries.',
    },
    {
      role: 'user',
      content:
        'Summarize the following text concisely. Ensure it is clear, well-structured, and makes sense.\n\n' +
        text,
    },
  ];

  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.3,
  });

  const content = response?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error('OpenAI response did not contain any content');
  }
  return content;
}

module.exports = { generateSummary };

