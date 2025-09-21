'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

interface UploadResult {
  fileName: string
  size: number
  type: string
  wordCount: number
  charCount: number
  textPreview: string
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setUploadStatus('')
      setUploadResult(null)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setUploadStatus('')
      setUploadResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus('Processing document...')
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setUploadStatus('Document processed successfully!')
        setUploadResult(data)
      } else {
        setUploadStatus(data.error || 'Upload failed. Please try again.')
      }
    } catch {
      setUploadStatus('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Upload Legal Document
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="text-4xl mb-4">
                  {dragActive ? '⬇️' : '📁'}
                </div>
                <p className="text-gray-600 mb-2 font-medium">
                  {dragActive 
                    ? 'Drop your document here' 
                    : 'Click to select or drag and drop your document'
                  }
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, DOC, DOCX, TXT (Max: 10MB)
                </p>
              </label>
            </div>

            {file && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Selected File:</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700 font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null)
                      setUploadStatus('')
                      setUploadResult(null)
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {uploading ? 'Processing...' : 'Upload & Process Document'}
                </button>
              </div>
            )}

            {uploadStatus && (
              <div className={`mt-4 p-4 rounded-md ${
                uploadStatus.includes('successfully') 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                <p>{uploadStatus}</p>
              </div>
            )}

            {uploadResult && (
              <div className="mt-6 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">📊 Document Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Word Count</p>
                    <p className="text-lg font-semibold text-blue-600">{uploadResult.wordCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Character Count</p>
                    <p className="text-lg font-semibold text-blue-600">{uploadResult.charCount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Text Preview:</p>
                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    {uploadResult.textPreview}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-sm font-medium text-gray-900 mb-2">✅ What&apos;s Next?</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Go to <a href="/qa" className="text-blue-600 hover:underline">Q&A</a> to ask questions about this document</li>
                    <li>• Use <a href="/summarize" className="text-blue-600 hover:underline">Summarize</a> to get key insights</li>
                    <li>• Try <a href="/translate" className="text-blue-600 hover:underline">Translate</a> for multi-language support</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}