import { GoogleGenerativeAI } from "@google/genai";

const getApiKey = () => {
  return (process.env as any).GEMINI_API_KEY || "";
};

export const callGemini = async (messages: { role: string; content: string }[], maxTokens: number = 512) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not set");
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
