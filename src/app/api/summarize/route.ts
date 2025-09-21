import { NextRequest, NextResponse } from 'next/server'
import { robustGenerate } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { instruction } = await request.json()

    if (!instruction || typeof instruction !== 'string' || instruction.trim().length === 0) {
      return NextResponse.json({ error: 'Summary instruction is required' }, { status: 400 })
    }

    // For now, we'll create a sample document summary since document upload isn't implemented yet
    const samplePrompt = `You are Lawgent, a professional Legal AI Assistant specializing in document analysis.

Create a comprehensive legal document summary following this instruction: "${instruction}"

Since no specific document is provided, create an example summary that demonstrates how you would analyze a typical legal document (such as a contract, agreement, or legal brief) according to the given instruction.

Include:
1. Key legal points and terms
2. Important dates and deadlines
3. Parties involved
4. Financial obligations or considerations
5. Legal implications and risks
6. Recommendations or action items

Format the summary professionally and make it clear this is an example of how document summarization would work once document upload is implemented.

Summary:`

    const summary = await robustGenerate(samplePrompt)
    
    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Error in summarization API:', error)
    return NextResponse.json({ 
      error: 'Unable to generate summary at the moment. Please try again.' 
    }, { status: 500 })
  }
}