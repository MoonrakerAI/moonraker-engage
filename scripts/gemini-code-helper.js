#!/usr/bin/env node
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeCode(filePath, question) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return;
    }

    const code = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    const prompt = `
You are a senior developer expert in NestJS, HIPAA compliance, and healthcare applications.

Analyze this ${fileName} file from a HIPAA-compliant healthcare chatbot:

\`\`\`typescript
${code}
\`\`\`

Question: ${question}

Focus on:
- HIPAA compliance and security best practices
- NestJS patterns and performance
- Error handling and logging
- Scalability considerations
- Code quality improvements

Provide specific, actionable recommendations with code examples where helpful.
    `;

    // Updated model name
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    console.log(`\n🔍 Code Analysis for ${fileName}:\n`);
    console.log(response.text());
    console.log('\n---\n');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Usage parsing
const [,, filePath, ...questionParts] = process.argv;
const question = questionParts.join(' ');

if (filePath && question) {
  analyzeCode(filePath, question);
} else {
  console.log('Usage: node scripts/gemini-code-helper.js <file-path> <question>');
  console.log('\nExamples:');
  console.log('node scripts/gemini-code-helper.js src/chat/chat.service.ts "How can I improve error handling?"');
  console.log('node scripts/gemini-code-helper.js src/chat/vertex-ai.service.ts "Are there any security vulnerabilities?"');
  console.log('node scripts/gemini-code-helper.js src/prisma/prisma.service.ts "How can I optimize database connections?"');
}
