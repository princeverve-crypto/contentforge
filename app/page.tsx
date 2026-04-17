export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 sticky top-0 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ContentForge</h1>
          <a href="/studio" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Create
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">Create Beautiful Images in Seconds</h2>
          <p className="text-xl text-gray-300 mb-8">
            Write what you want. AI creates it. Download. Share. Done.
          </p>
          <a href="/studio" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded font-bold">
            Get Started Free
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Write', desc: 'Describe what you want' },
              { num: '2', title: 'Choose Format', desc: 'Pick TikTok, Instagram, YouTube, or Square' },
              { num: '3', title: 'Generate', desc: 'AI creates your image (10 sec)' },
              { num: '4', title: 'Download', desc: 'Save and share' }
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{step.num}</div>
                <h4 className="font-bold mb-2">{step.title}</h4>
                <p className="text-gray-300 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Pricing</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Free', price: '$0', images: '5 images/month' },
              { name: 'Creator', price: '$29', images: '100 images/month', highlight: true },
              { name: 'Pro', price: '$99', images: 'Unlimited' }
            ].map((plan) => (
              <div key={plan.name} className={`p-8 rounded-lg border-2 ${plan.highlight ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700'}`}>
                <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <p className="text-gray-300 mb-6">{plan.images}</p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-6 text-center text-gray-400">
        <p>&copy; 2026 ContentForge. Built for creators.</p>
      </footer>
    </main>
  )
}
