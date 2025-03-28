const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: "You are given With a A discription if A online webinar , for that create 5 quizes based on discription , each with four options and correct option of it ",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  
  async function GenerateQuiz(discription) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "The IoT for Beginners course is designed to introduce you to the Internet of Things (IoT)—a technology that connects physical devices to the internet for smart automation and real-time data exchange. This beginner-friendly course covers the fundamentals of IoT, essential hardware components, communication protocols, and how to build your first IoT project."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "[\n  {\n    \"question\": \"What does IoT stand for?\",\n    \"options\": [\n      \"Internet of Technology\",\n      \"Internet of Things\",\n      \"Intelligent Operating Technology\",\n      \"Integrated Online Tools\"\n    ],\n    \"correct_option\": \"Internet of Things\"\n  },\n  {\n    \"question\": \"What is the primary function of IoT?\",\n    \"options\": [\n      \"Connecting physical devices to the internet\",\n      \"Creating complex software applications\",\n      \"Designing websites\",\n      \"Managing social media\"\n    ],\n    \"correct_option\": \"Connecting physical devices to the internet\"\n  },\n  {\n    \"question\": \"What does IoT enable through real-time data exchange?\",\n    \"options\": [\n      \"Smart automation\",\n      \"Manual operations\",\n      \"Offline data storage\",\n      \"Complex coding\"\n    ],\n    \"correct_option\": \"Smart automation\"\n  },\n  {\n    \"question\": \"What is a key focus of the 'IoT for Beginners' course?\",\n    \"options\": [\n      \"Advanced coding techniques\",\n      \"Fundamentals of IoT\",\n      \"Financial modeling\",\n      \"Marketing strategies\"\n    ],\n    \"correct_option\": \"Fundamentals of IoT\"\n  },\n  {\n    \"question\": \"What topics are covered in the course?\",\n    \"options\": [\n      \"IoT fundamentals, hardware, communication protocols, and project building\",\n      \"Advanced cybersecurity measures\",\n      \"Cloud computing architecture\",\n      \"Data science and analytics\"\n    ],\n    \"correct_option\": \"IoT fundamentals, hardware, communication protocols, and project building\"\n  }\n]"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(discription);

    //console.log(result.response.text());
    return result.response.text();
  }
  
 module.exports = GenerateQuiz;