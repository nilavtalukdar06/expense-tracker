import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function insight(amount, category) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Analyze the categorized spending data where the total amount is ${amount}, distributed across the following categories: ${[
      ...category,
    ]}. Generate concise and actionable financial insights in 50-60 words. Identify the top spending categories, detect any unusually high or low expenditures, suggest optimization opportunities, and summarize the user's overall financial behavior.`,
  });
  return response.text;
}

export default insight;
