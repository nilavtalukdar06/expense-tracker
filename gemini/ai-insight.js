import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function insight(amount, category) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Given the amount (${amount}) and the category (${category}), generate a realistic, concise, and contextually appropriate expense description that explains what the expense was for.`,
    config: {
      systemInstruction:
        "You are a professional financial advisor. The user will provide an amount and an expense category. Based on this input, generate a concise and informative 20-25 word description summarizing the nature of the expense, its potential impact on personal finances, and whether it appears essential, discretionary, or avoidable. Remember all transactions are in Indian Rupees (INR)",
    },
  });
  return response.text;
}

export default insight;
