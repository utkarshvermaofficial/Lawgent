import { NextRequest, NextResponse } from 'next/server'
import { robustGenerate } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { question, documentContent, documentFileName } = await request.json()

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    // Create a legal-focused prompt with document context
    let prompt = `You are Lawgent, a professional Legal AI Assistant. You provide accurate, helpful legal information while being clear that you don't provide legal advice.`

    if (documentContent && documentFileName) {
      prompt += `

Document Context:
You have access to a legal document titled "${documentFileName}". Here is the content of the document:

---
${documentContent.substring(0, 8000)} ${documentContent.length > 8000 ? '...(truncated)' : ''}
---

Please answer the following question based on the content of this document. If the question cannot be answered from the document content, please state that clearly and provide general legal information instead.`
    }

    prompt += `

Question: ${question}

Please provide a comprehensive answer that:
1. ${documentContent ? 'References specific content from the document when relevant' : 'Addresses the legal question directly'}
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