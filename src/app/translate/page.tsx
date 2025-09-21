'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

export default function TranslatePage() {
  const [textToTranslate, setTextToTranslate] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('Hindi')
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(false)

  const languages = [
    'Hindi',
    'Marathi',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean'
  ]

  const handleTranslate = async () => {
    if (!textToTranslate.trim()) return

    setLoading(true)
    setTranslatedText('')

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: textToTranslate,
          targetLanguage 
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTranslatedText(data.translatedText)
      } else {
        setTranslatedText('Sorry, I could not translate the text. Please try again.')
      }
    } catch {
      setTranslatedText('Sorry, I could not translate the text. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClearAll = () => {
    setTextToTranslate('')
    setTranslatedText('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Legal Document Translation
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Original Text (English)</h2>
              <textarea
                value={textToTranslate}
                onChange={(e) => setTextToTranslate(e.target.value)}
                placeholder="Enter the legal text you want to translate..."
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              
              <div className="mt-4">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Language:
                </label>
                <select
                  id="language"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleTranslate}
                  disabled={loading || !textToTranslate.trim()}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Translating...' : 'Translate'}
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Translation ({targetLanguage})
              </h2>
              <div className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
                {translatedText ? (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {translatedText}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">
                    Translation will appear here...
                  </p>
                )}
              </div>

              {translatedText && (
                <button
                  onClick={() => navigator.clipboard.writeText(translatedText)}
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium"
                >
                  📋 Copy Translation
                </button>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">🌐 Translation Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">⚖️</div>
                <h4 className="font-medium text-gray-900">Legal Accuracy</h4>
                <p className="text-sm text-gray-600">Specialized for legal terminology</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">🌍</div>
                <h4 className="font-medium text-gray-900">Multi-Language</h4>
                <p className="text-sm text-gray-600">Support for 10+ languages</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-medium text-gray-900">Secure</h4>
                <p className="text-sm text-gray-600">Confidential document handling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}