import { GoogleGenAI } from '@google/genai';

let genAI: GoogleGenAI | null = null;

function getGenAI() {
  if (genAI) return genAI;
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (process.env.GEMINI_API_KEY as string);
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.');
  }

  genAI = new GoogleGenAI({ apiKey });
  return genAI;
}

export async function callGemini(
  messages: { role: string; content: string }[],
  systemPrompt: string = "You are a helpful engineering assistant."
): Promise<string> {
  try {
    const ai = getGenAI();
    
    // Convert messages to Gemini format
    const contents = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    if (!response.text) {
      throw new Error('No response text received from Gemini.');
    }

    return response.text;
  } catch (error: unknown) {
    console.error('Gemini API error:', error);
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid Gemini API key. Please check your configuration.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred during the Gemini API call.');
  }
}
