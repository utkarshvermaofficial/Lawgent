import { NextRequest, NextResponse } from 'next/server'

// Force this API route to use Node.js runtime (not Edge)
export const runtime = 'nodejs'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  
  try {
    console.log(`Attempting to extract text from file: ${file.name}, type: ${file.type}, size: ${file.size}`)
    
    switch (file.type) {
      case 'application/pdf':
        try {
          // Dynamic import to avoid build issues
          console.log('Importing pdf-parse...')
          const pdfParse = (await import('pdf-parse')).default
          console.log('pdf-parse imported successfully, parsing PDF...')
          
          const pdfData = await pdfParse(buffer)
          console.log(`PDF parsed successfully, extracted ${pdfData.text.length} characters`)
          
          if (!pdfData.text || pdfData.text.trim().length === 0) {
            throw new Error('PDF appears to be empty or contains only images/scanned content')
          }
          
          return pdfData.text
        } catch (pdfError) {
          console.error('PDF-specific error:', pdfError)
          throw new Error(`PDF processing failed: ${pdfError instanceof Error ? pdfError.message : 'Unknown PDF error'}`)
        }
        
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        try {
          console.log('Importing mammoth for DOCX...')
          const mammoth = await import('mammoth')
          const docxResult = await mammoth.extractRawText({ buffer })
          console.log(`DOCX parsed successfully, extracted ${docxResult.value.length} characters`)
          return docxResult.value
        } catch (docxError) {
          console.error('DOCX-specific error:', docxError)
          throw new Error(`DOCX processing failed: ${docxError instanceof Error ? docxError.message : 'Unknown DOCX error'}`)
        }
        
      case 'text/plain':
        const textContent = buffer.toString('utf-8')
        console.log(`Plain text file processed, ${textContent.length} characters`)
        return textContent
        
      default:
        throw new Error(`Unsupported file type: ${file.type}`)
    }
  } catch (error) {
    console.error('Detailed error extracting text from file:', error)
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown')
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    // Re-throw the error with more context
    if (error instanceof Error && error.message.includes('PDF processing failed')) {
      throw error // Already has good context
    } else if (error instanceof Error && error.message.includes('DOCX processing failed')) {
      throw error // Already has good context
    } else {
      throw new Error(`Failed to extract text from the document: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
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