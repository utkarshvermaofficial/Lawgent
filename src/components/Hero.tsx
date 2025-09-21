import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Lawgent</span>
            <span className="block text-3xl sm:text-4xl text-gray-700 mt-2">
              Your Legal AI Assistant
            </span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Upload legal documents and get instant answers, professional summaries, and accurate translations powered by advanced AI technology. 
          <span className="block mt-2 text-lg text-gray-500">
            Making legal document analysis accessible and efficient.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/upload"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🚀 Get Started
          </Link>
          <Link 
            href="/qa"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
          >
            💬 Try Q&A Demo
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900">Secure</h3>
            <p className="text-sm text-gray-600">Enterprise-grade encryption</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Fast</h3>
            <p className="text-sm text-gray-600">Instant AI-powered analysis</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Accurate</h3>
            <p className="text-sm text-gray-600">Legal-focused AI responses</p>
          </div>
        </div>
      </div>
    </section>
  )
}