import { NextRequest, NextResponse } from 'next/server'
import { robustGenerate } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json()

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Text and target language are required' }, { status: 400 })
    }

    if (typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text must be a non-empty string' }, { status: 400 })
    }

    // Create a specialized legal translation prompt
    const prompt = `You are a professional legal translator specializing in accurate legal document translation. 

Translate the following English text to ${targetLanguage}, maintaining:
1. Legal terminology accuracy
2. Original meaning and context
3. Professional tone
4. Document structure and formatting

Original text:
"${text}"

Provide only the translation in ${targetLanguage}, without any explanations or additional text:`

    const translatedText = await robustGenerate(prompt)
    
    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error('Error in translation API:', error)
    return NextResponse.json({ 
      error: 'Unable to translate the text at the moment. Please try again.' 
    }, { status: 500 })
  }
}