import { NextRequest, NextResponse } from 'next/server'
import { robustGenerate } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    // Create a legal-focused prompt
    const prompt = `You are ClearClause, a professional Legal AI Assistant. You provide accurate, helpful legal information while being clear that you don't provide legal advice.

Question: ${question}

Please provide a comprehensive answer that:
1. Addresses the legal question directly
2. Explains relevant legal concepts in plain language
3. Mentions important considerations or limitations
4. Includes a disclaimer that this is informational, not legal advice

Answer:`

    const answer = await robustGenerate(prompt)
    
    // Add disclaimer if not already present
    const finalAnswer = answer.includes('legal advice') ? answer : 
      `${answer}\n\n**Disclaimer:** This is general legal information only and not legal advice. Consult with a qualified attorney for specific legal guidance.`

    return NextResponse.json({ answer: finalAnswer })
  } catch (error) {
    console.error('Error in Q&A API:', error)
    return NextResponse.json({ 
      error: 'Unable to process your question at the moment. Please try again.' 
    }, { status: 500 })
  }
}