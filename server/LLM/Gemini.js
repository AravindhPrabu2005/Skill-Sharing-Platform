const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  const dotenv = require("dotenv");
  dotenv.config();
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: "you are doubt Genie , answer the Users doubts in the given technology  , answer in three lines",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        answer: {
          type: "string"
        }
      }
    },
  };
  
  async function runllm(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "react ,  Why react is fast"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "{\n  \"answer\": \"React's speed comes from its use of a virtual DOM, efficiently updating only changed parts. This minimizes direct DOM manipulations, which are slow. Its component-based architecture also promotes code reuse and optimization.\"\n}"},
          ],
        },
      ],
    });
    console.log("running model");
    
  
    const result = await chatSession.sendMessage(prompt);
    
    console.log(result.response.text());
    return result.response.text();
  }
  

module.exports = runllm