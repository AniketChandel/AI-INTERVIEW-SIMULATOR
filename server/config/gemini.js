const { GoogleGenAI } = require("@google/genai");

const api = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

module.exports = api;