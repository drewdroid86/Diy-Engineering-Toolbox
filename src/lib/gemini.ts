import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY || "" });

export const callGemini = async (messages: { role: string; content: string }[], maxTokens: number = 512) => {
  if (!(process.env as any).GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not set");
  }
  
  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));
  
  const result = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents,
    config: {
      maxOutputTokens: maxTokens
    }
  });
  
  return result.text;
};
