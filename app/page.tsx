import Link from 'next/link'

export default function Home() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      images: '5/month',
      features: ['Basic styles', 'Community access']
    },
    {
      name: 'Creator',
      price: '$29',
      images: '100/month',
      features: ['All styles', 'Schedule posts', 'Basic analytics']
    },
    {
      name: 'Pro',
      price: '$99',
      images: 'Unlimited',
      features: ['Team access', 'Advanced analytics', 'Priority support']
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              ContentForge
            </h1>
            <p className="text-gray-400 text-sm">Your Mindset Made Visual</p>
          </div>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-cyan-400 transition">
              Sign In
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            Create Beautiful AI Images in Seconds
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            No designers needed. No monthly fees. Just you, your ideas, and powerful AI.
            Generate stunning content that converts.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition shadow-lg">
              Get Started Free
            </button>
            <button className="border-2 border-cyan-400 text-cyan-400 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Generate beautiful images in 10 seconds' },
            { icon: '🎨', title: 'Neon Design', desc: 'Beautiful, eye-catching aesthetics' },
            { icon: '💰', title: 'Affordable', desc: '$29/month vs competitors at $200+' }
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition"
            >
              <p className="text-4xl mb-4">{feature.icon}</p>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-cyan-400 text-center mb-12">
            Simple, Transparent Pricing
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition"
              >
                <h4 className="text-2xl font-bold text-cyan-400 mb-2">{tier.name}</h4>
                <p className="text-4xl font-bold text-white mb-2">{tier.price}</p>
                <p className="text-gray-400 mb-6">{tier.images} images</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="text-gray-300 flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition">
                  {tier.price === '$0' ? 'Get Started' : 'Subscribe'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Create?
          </h3>
          <p className="text-gray-300 mb-8">
            Join creators, entrepreneurs, and brands building their empire with ContentForge.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition shadow-lg">
            Launch Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-slate-900/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2026 ContentForge. Built by creators, for creators.</p>
        </div>
      </footer>
    </main>
  )
}
