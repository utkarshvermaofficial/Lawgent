import { NextRequest, NextResponse } from 'next/server'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  
  try {
    switch (file.type) {
      case 'application/pdf':
        // Dynamic import to avoid build issues
        const pdfParse = (await import('pdf-parse')).default
        const pdfData = await pdfParse(buffer)
        return pdfData.text
        
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const mammoth = await import('mammoth')
        const docxResult = await mammoth.extractRawText({ buffer })
        return docxResult.value
        
      case 'text/plain':
        return buffer.toString('utf-8')
        
      default:
        throw new Error(`Unsupported file type: ${file.type}`)
    }
  } catch (error) {
    console.error('Error extracting text from file:', error)
    throw new Error('Failed to extract text from the document')
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File size exceeds limit. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Unsupported file type. Please upload PDF, DOCX, DOC, or TXT files.' 
      }, { status: 400 })
    }

    // Extract text from the document
    const extractedText = await extractTextFromFile(file)
    
    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json({ 
        error: 'No text content found in the document' 
      }, { status: 400 })
    }

    // TODO: Store the extracted text in a database or session
    // For now, we'll just return success with metadata
    
    const wordCount = extractedText.split(/\s+/).filter(word => word.length > 0).length
    const charCount = extractedText.length

    return NextResponse.json({ 
      message: 'Document uploaded and processed successfully',
      fileName: file.name,
      size: file.size,
      type: file.type,
      wordCount,
      charCount,
      textPreview: extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : '')
    })
  } catch (error) {
    console.error('Error in upload API:', error)
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to process the uploaded document' 
    }, { status: 500 })
  }
}