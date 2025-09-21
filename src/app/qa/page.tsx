'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function QAPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentQuestion.trim() || loading) return

    const question = currentQuestion.trim()
    setCurrentQuestion('')
    addMessage('user', question)
    setLoading(true)

    try {
      const response = await fetch('/api/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (response.ok) {
        const data = await response.json()
        addMessage('assistant', data.answer)
      } else {
        addMessage('assistant', 'Sorry, I could not process your question. Please try again.')
      }
    } catch {
      addMessage('assistant', 'Sorry, I could not process your question. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Legal AI Assistant
            </h1>
            <p className="text-gray-600">
              Ask questions about legal topics and get expert guidance
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chat with Lawgent</h2>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="text-blue-100 hover:text-white text-sm underline"
                >
                  Clear Chat
                </button>
              )}
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-16">
                  <div className="text-4xl mb-4">⚖️</div>
                  <p>Start a conversation by asking a legal question!</p>
                  <p className="text-sm mt-2">Examples: &quot;What is a contract?&quot; or &quot;Explain intellectual property law&quot;</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3xl p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="text-lg">
                          {message.role === 'user' ? '👤' : '🤖'}
                        </div>
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-2 opacity-70`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl p-4 rounded-lg bg-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="text-lg">🤖</div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Ask a legal question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !currentQuestion.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">💡 How to get the best answers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">✅ Good Questions:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• &quot;What is the difference between a contract and an agreement?&quot;</li>
                  <li>• &quot;Explain copyright law basics&quot;</li>
                  <li>• &quot;What are the elements of a valid contract?&quot;</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">❌ Avoid:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Requests for specific legal advice</li>
                  <li>• Questions about ongoing legal cases</li>
                  <li>• Requests to review specific documents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}