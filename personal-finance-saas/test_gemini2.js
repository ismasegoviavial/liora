const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("invalid-key-here");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
model.generateContent("Hola").then(res => console.log(res.response.text())).catch(err => console.error(err.message));
