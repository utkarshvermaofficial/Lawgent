import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <Hero />
      <Features />
    </main>
  )
}
