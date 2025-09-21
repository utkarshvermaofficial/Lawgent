export default function Features() {
  const features = [
    {
      title: "Document Q&A",
      description: "Ask questions about your legal documents and get instant, accurate answers.",
      icon: "❓",
      href: "/qa"
    },
    {
      title: "Smart Summarization",
      description: "Generate concise summaries of complex legal documents in seconds.",
      icon: "📄",
      href: "/summarize"
    },
    {
      title: "Multi-Language Translation",
      description: "Translate legal documents to and from multiple languages with legal accuracy.",
      icon: "🌐",
      href: "/translate"
    },
    {
      title: "Secure Upload",
      description: "Upload your documents securely with enterprise-grade encryption.",
      icon: "🔒",
      href: "/upload"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Powerful Legal AI Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <a 
                href={feature.href}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}