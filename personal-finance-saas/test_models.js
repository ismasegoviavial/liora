const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AQ.Ab8RN6LwHpXyXcX7TsGrj4BQTyTZkSsVMM0BmK893Z6-U3Bf2w");

async function run() {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AQ.Ab8RN6LwHpXyXcX7TsGrj4BQTyTZkSsVMM0BmK893Z6-U3Bf2w");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
run();
