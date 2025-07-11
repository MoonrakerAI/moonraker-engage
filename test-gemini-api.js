const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testGemini() {
  console.log("🔑 API Key exists:", !!process.env.GEMINI_API_KEY);
  console.log("🔑 API Key length:", process.env.GEMINI_API_KEY?.length || 0);
  
  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ No GEMINI_API_KEY found in .env file");
    return;
  }
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Test with known working model first
  try {
    console.log("🧪 Testing with gemini-1.5-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("✅ Success:", response.text());
  } catch (error) {
    console.log("❌ Error with 1.5-flash:", error.message);
  }

  // Test with 2.5 models
  const modelsToTest = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro-002", 
    "gemini-1.5-flash-002"
  ];
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`🧪 Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello");
      const response = await result.response;
      console.log(`✅ ${modelName} works:`, response.text().substring(0, 50));
    } catch (error) {
      console.log(`❌ ${modelName} failed:`, error.message);
    }
  }
}

testGemini().catch(console.error);
