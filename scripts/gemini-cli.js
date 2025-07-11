#!/usr/bin/env node
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chat(prompt) {
  try {
    // Updated model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const enhancedPrompt = `
You are an expert in NestJS, HIPAA compliance, TypeScript, and Vertex AI.
I'm working on a HIPAA-compliant healthcare chatbot built with:
- NestJS backend
- Vertex AI (Gemini Pro) for AI responses
- PostgreSQL database with Prisma
- Google Cloud Run deployment
- HIPAA compliance requirements

Question: ${prompt}

Please provide specific, actionable advice for this tech stack.
    `;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    console.log('\n🤖 Gemini Response:\n');
    console.log(response.text());
    console.log('\n---\n');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const prompt = process.argv.slice(2).join(' ');
if (prompt) {
  chat(prompt);
} else {
  console.log('Usage: node scripts/gemini-cli.js "your question"');
  console.log('Example: node scripts/gemini-cli.js "How can I improve error handling in my chat service?"');
}
