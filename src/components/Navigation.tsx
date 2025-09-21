'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 backdrop-blur-lg border-b border-slate-600/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300 border border-gray-200">
                <Image 
                  src="/logo.png" 
                  alt="Lawgent Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent font-display">
                  Lawgent
                </span>
                <div className="text-xs text-slate-300 -mt-1 font-body">Legal AI Assistant</div>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/upload" className="text-slate-200 hover:text-white hover:bg-slate-600/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Upload
            </Link>
            <Link href="/qa" className="text-slate-200 hover:text-white hover:bg-slate-600/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Q&A
            </Link>
            <Link href="/summarize" className="text-slate-200 hover:text-white hover:bg-slate-600/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Summarize
            </Link>
            <Link href="/translate" className="text-slate-200 hover:text-white hover:bg-slate-600/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Translate
            </Link>
            <Link href="/about" className="text-slate-200 hover:text-white hover:bg-slate-600/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              About
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-lg p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-600/50 bg-slate-800/95 backdrop-blur-lg">
            <div className="px-2 pt-4 pb-6 space-y-1">
              <Link href="/upload" className="block text-slate-200 hover:text-white hover:bg-slate-600/50 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200">
                Upload Document
              </Link>
              <Link href="/qa" className="block text-slate-200 hover:text-white hover:bg-slate-600/50 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200">
                Q&A Assistant
              </Link>
              <Link href="/summarize" className="block text-slate-200 hover:text-white hover:bg-slate-600/50 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200">
                Summarize
              </Link>
              <Link href="/translate" className="block text-slate-200 hover:text-white hover:bg-slate-600/50 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200">
                Translate
              </Link>
              <Link href="/about" className="block text-slate-200 hover:text-white hover:bg-slate-600/50 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}