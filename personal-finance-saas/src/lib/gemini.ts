import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key")

export const aiModel = genAI.getGenerativeModel({ model: "gemini-3.6-flash" })

export default genAI
