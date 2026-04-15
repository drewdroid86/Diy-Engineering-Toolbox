import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callGemini } from './gemini';
import { GoogleGenerativeAI } from "@google/genai";

vi.mock("@google/genai", () => {
  const generateContent = vi.fn();
  const getGenerativeModel = vi.fn(() => ({
    generateContent
  }));
  return {
    GoogleGenerativeAI: vi.fn(() => ({
      getGenerativeModel
    }))
  };
});

describe('callGemini', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (process.env as any).GEMINI_API_KEY = 'fake_key';
  });

  it('throws error if API key is missing', async () => {
    (process.env as any).GEMINI_API_KEY = '';
    await expect(callGemini([{ role: 'user', content: 'hello' }]))
      .rejects.toThrow('GEMINI_API_KEY not set');
  });

  it('calls gemini API correctly and returns text', async () => {
    const mockResponse = {
      response: {
        text: () => 'Hello from Gemini'
      }
    };
    
    const { GoogleGenerativeAI: MockGAI } = await import("@google/genai");
    const mockModel = (MockGAI as any)().getGenerativeModel();
    (mockModel.generateContent as any).mockResolvedValue(mockResponse);

    const messages = [{ role: 'user', content: 'hello' }];
    const result = await callGemini(messages);

    expect(result).toBe('Hello from Gemini');
    expect(mockModel.generateContent).toHaveBeenCalledWith({
      contents: [{ role: 'user', parts: [{ text: 'hello' }] }],
      generationConfig: { maxOutputTokens: 512 }
    });
  });

  it('respects custom maxTokens', async () => {
    const mockResponse = {
      response: {
        text: () => 'Short reply'
      }
    };
    const { GoogleGenerativeAI: MockGAI } = await import("@google/genai");
    const mockModel = (MockGAI as any)().getGenerativeModel();
    (mockModel.generateContent as any).mockResolvedValue(mockResponse);

    await callGemini([{ role: 'user', content: 'hello' }], 100);

    expect(mockModel.generateContent).toHaveBeenCalledWith(expect.objectContaining({
      generationConfig: { maxOutputTokens: 100 }
    }));
  });
});
