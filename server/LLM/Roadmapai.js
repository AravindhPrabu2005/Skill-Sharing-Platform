const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: "for th given technology , give step by step roadmap each an one or two word, no numbers in begining , format arr of stringd",
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
        blocks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              Steps: {
                type: "string"
              }
            }
          }
        }
      }
    },
  };
  
  async function runRoadmap(technology) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Reactjs"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "{\n  \"blocks\": [\n    {\n      \"Steps\": \"Setup\"\n    },\n    {\n      \"Steps\": \"Basics\"\n    },\n    {\n      \"Steps\": \"Components\"\n    },\n    {\n      \"Steps\": \"JSX\"\n    },\n    {\n      \"Steps\": \"Props\"\n    },\n    {\n      \"Steps\": \"State\"\n    },\n    {\n      \"Steps\": \"Events\"\n    },\n    {\n      \"Steps\": \"Lifecycle\"\n    },\n    {\n      \"Steps\": \"Hooks\"\n    },\n    {\n      \"Steps\": \"Routing\"\n    },\n    {\n      \"Steps\": \"Forms\"\n    },\n    {\n      \"Steps\": \"Styling\"\n    },\n    {\n      \"Steps\": \"Optimization\"\n    },\n    {\n      \"Steps\": \"Testing\"\n    },\n    {\n      \"Steps\": \"Deployment\"\n    }\n  ]\n}"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "sql"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "{\n  \"blocks\": [\n    {\n      \"Steps\": \"Introduction\"\n    },\n    {\n      \"Steps\": \"Installation\"\n    },\n    {\n      \"Steps\": \"Databases\"\n    },\n    {\n      \"Steps\": \"Tables\"\n    },\n    {\n      \"Steps\": \"CRUD\"\n    },\n    {\n      \"Steps\": \"Queries\"\n    },\n    {\n      \"Steps\": \"Joins\"\n    },\n    {\n      \"Steps\": \"Functions\"\n    },\n    {\n      \"Steps\": \"Transactions\"\n    },\n    {\n      \"Steps\": \"Indexes\"\n    },\n    {\n      \"Steps\": \"Optimization\"\n    },\n    {\n      \"Steps\": \"Security\"\n    },\n    {\n      \"Steps\": \"Advanced\"\n    },\n    {\n      \"Steps\": \"Normalization\"\n    },\n    {\n      \"Steps\": \"Practice\"\n    }\n  ]\n}"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(technology);
    // TODO: Following code needs to be updated for client-side apps.

    console.log(result.response.text());
    return result.response.text();
  }
  

    module.exports = runRoadmap;