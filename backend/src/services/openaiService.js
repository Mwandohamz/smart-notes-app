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
        'You are a helpful assistant that writes concise, accurate, and well-structured summaries. and adds a fun fact at the end of every summary.',
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

/**
 * Answer a question using ONLY the provided source text.
 * The model must not hallucinate or use outside knowledge.
 * @param {string} text - The reference text to base the answer on.
 * @param {string} question - The user's question about the text.
 * @returns {Promise<string>} - The model's answer.
 */
async function answerQuestion(text, question) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('answerQuestion: "text" must be a non-empty string');
  }
  if (typeof question !== 'string' || question.trim().length === 0) {
    throw new Error('answerQuestion: "question" must be a non-empty string');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  const messages = [
    {
      role: 'system',
      content:
        'You are a precise assistant. Answer the question strictly and only using the provided source text. If the answer is not in the text, reply with "Not found in the provided text."',
    },
    {
      role: 'user',
      content:
        `Source text:\n\n${text}\n\nQuestion: ${question}\n\nAnswer using only the source text:`,
    },
  ];

  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.2,
  });

  const content = response?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error('OpenAI response did not contain any content');
  }
  return content;
}

module.exports = { generateSummary, answerQuestion };

