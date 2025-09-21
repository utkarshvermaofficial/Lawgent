# Lawgent

A modern Next.js web application that provides AI-powered legal document analysis, including Q&A, summarization, and translation features.

## Features

- **Document Upload**: Secure upload of legal documents (PDF, DOC, DOCX, TXT)
- **Q&A Assistant**: Ask questions about your legal documents and get AI-powered answers
- **Document Summarization**: Generate concise summaries of complex legal documents
- **Multi-Language Translation**: Translate legal documents with legal accuracy
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI Integration**: Google Gemini API
- **UI Components**: Custom React components with modern design patterns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Add your Google Gemini API key to `.env.local`:
```
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

4. Install additional packages for full functionality:
```bash
npm install @google/generative-ai
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   │   ├── qa/         # Q&A functionality
│   │   ├── upload/     # Document upload handling
│   │   ├── summarize/  # Document summarization
│   │   └── translate/  # Translation services
│   ├── upload/         # Document upload page
│   ├── qa/             # Q&A interface page
│   ├── summarize/      # Document summarization page
│   ├── translate/      # Translation interface page
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Navigation.tsx  # Navigation bar
│   ├── Hero.tsx        # Hero section
│   └── Features.tsx    # Features showcase
```

## Quick Start

1. **Clone and Install**:
```bash
git clone <your-repo>
cd lawgent
npm install
```

2. **Configure Environment**:
```bash
cp .env.example .env.local
# Add your Google Gemini API key to .env.local
```

3. **Run Development**:
```bash
npm run dev
```

4. **Build for Production**:
```bash
npm run build
npm start
```

## Deployment Options

- **Vercel**: `vercel --prod` (Recommended for Next.js)
- **Netlify**: Connect your GitHub repository
- **Docker**: Build container and deploy to any cloud provider
- **Static Export**: `npm run build` for static hosting

## Optional Enhancements

While the app is fully functional, you could add:
- User authentication (NextAuth.js)
- Document persistence (Database integration)
- Advanced vector search (Pinecone, Weaviate)
- File storage (AWS S3, Google Cloud Storage)
- Analytics and monitoring

## Current Features

✅ **Complete UI/UX**: All pages and components implemented  
✅ **Google Gemini Integration**: Full AI functionality with Q&A, summarization, and translation  
✅ **Document Processing**: PDF, DOCX, and TXT file upload and text extraction  
✅ **Interactive Chat**: Real-time Q&A interface with message history  
✅ **Professional Interface**: Responsive design with loading states and animations  
✅ **File Upload**: Drag-and-drop with validation and progress feedback  
✅ **Error Handling**: Comprehensive error management and user feedback  
✅ **TypeScript**: Fully typed implementation for reliability  

## Ready for Production

The application is **fully functional** and ready for deployment! All major features are implemented:

- **📤 Document Upload**: Upload and process legal documents
- **💬 Q&A Interface**: Ask questions and get AI-powered legal guidance  
- **📄 Summarization**: Generate custom document summaries
- **🌐 Translation**: Multi-language translation with legal accuracy
- **🎨 Professional UI**: Modern, responsive design with excellent UX

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
