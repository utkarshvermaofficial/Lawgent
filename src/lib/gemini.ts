// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not configured');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Primary model for general use
export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 8192,
  }
});

// Model optimized for precise tasks like translation
export const geminiPreciseModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.3,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 8192,
  }
});

// Utility function for safe text extraction
export function safeExtractText(response: unknown): string {
  try {
    if (response && typeof response === 'object') {
      const resp = response as Record<string, unknown>;
      if (resp?.response && typeof resp.response === 'object') {
        const responseObj = resp.response as Record<string, unknown>;
        if (typeof responseObj.text === 'function') {
          return responseObj.text();
        }
      }
      if (typeof resp?.text === 'function') {
        return resp.text();
      }
      if (resp?.candidates && Array.isArray(resp.candidates)) {
        const candidate = resp.candidates[0] as Record<string, unknown>;
        const content = candidate?.content as Record<string, unknown>;
        const parts = content?.parts as Array<Record<string, unknown>>;
        if (parts?.[0]?.text) {
          return String(parts[0].text);
        }
      }
    }
    return 'No content returned from AI model';
  } catch (error) {
    console.error('Error extracting text from AI response:', error);
    return 'Error processing AI response';
  }
}

// Robust generation with retry logic
export async function robustGenerate(prompt: string, retries: number = 2): Promise<string> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await geminiModel.generateContent(prompt);
      const text = safeExtractText(result);
      
      if (text && text.trim() && !text.includes('No content returned')) {
        return text;
      }
    } catch (error: unknown) {
      console.error(`Generation attempt ${attempt + 1} failed:`, error);
      
      if (error && typeof error === 'object') {
        const errorObj = error as Record<string, unknown>;
        const message = String(errorObj.message || '');
        
        if (message.includes('429') || message.includes('quota')) {
          // Rate limit or quota exceeded
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            continue;
          }
        }
      }
      
      if (attempt === retries) {
        return `Error: Unable to generate response after ${retries + 1} attempts`;
      }
    }
  }
  
  return 'Error: Failed to generate response';
}