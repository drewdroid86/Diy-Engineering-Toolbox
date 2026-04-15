import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI((process.env as any).GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const callGemini = async (messages: { role: string; content: string }[], maxTokens: number = 512) => {
  if (!(process.env as any).GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not set");
  }
  
  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));
  
  const result = await model.generateContent({
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens
    }
  });
  
  return result.response.text();
};
