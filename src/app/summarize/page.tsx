'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

export default function SummarizePage() {
  const [customInstruction, setCustomInstruction] = useState('Provide a comprehensive summary highlighting key legal points and terms.')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerateSummary = async () => {
    setLoading(true)
    setSummary('')

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instruction: customInstruction }),
      })

      if (response.ok) {
        const data = await response.json()
        setSummary(data.summary)
      } else {
        setSummary('Sorry, I could not generate a summary. Please upload a document first and try again.')
      }
    } catch {
      setSummary('Sorry, I could not generate a summary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Document Summarization
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="instruction" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Summary Instruction:
                </label>
                <textarea
                  id="instruction"
                  value={customInstruction}
                  onChange={(e) => setCustomInstruction(e.target.value)}
                  placeholder="e.g., Focus on financial obligations and deadlines..."
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={handleGenerateSummary}
                disabled={loading || !customInstruction.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Generating Summary...' : 'Generate Summary'}
              </button>

              <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-md">
                <p className="font-medium mb-2">📋 How it works:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Upload a document using the Upload page</li>
                  <li>Customize your summary instruction above</li>
                  <li>Click &quot;Generate Summary&quot; to get an AI-powered analysis</li>
                </ol>
              </div>
            </div>

            {summary && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Document Summary:</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}