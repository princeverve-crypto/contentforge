import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ContentForge - Create AI Images in Seconds',
  description: 'Beautiful AI-generated images for creators. Simple. Fast. Powerful.'
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-cyan-500/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ContentForge
          </div>
          <div className="flex gap-4">
            <a
              href="#features"
              className="text-gray-300 hover:text-cyan-400 transition text-sm"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-cyan-400 transition text-sm"
            >
              Pricing
            </a>
            <a
              href="/studio"
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg text-sm font-semibold transition"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
              ✨ AI-Powered Creation
            </span>
          </div>

          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Create Beautiful Images in Seconds
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Write what you want. AI creates it. Download. Share. That's it. No design skills needed.
            Professional quality. Every time.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <a
              href="/studio"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-lg font-bold transition transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Get Started Free →
            </a>
            <button className="px-8 py-4 border border-cyan-500/30 hover:border-cyan-400 rounded-lg font-bold transition">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { value: '10K+', label: 'Images Created' },
              { value: '100ms', label: 'Generation Speed' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-slate-800/30 border border-cyan-500/10 rounded-lg hover:border-cyan-500/30 transition">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Write',
                desc: 'Describe what you want to create in plain language',
                icon: '✏️'
              },
              {
                step: '2',
                title: 'Choose Format',
                desc: 'Select TikTok, Instagram, YouTube, or Square',
                icon: '🎬'
              },
              {
                step: '3',
                title: 'Generate',
                desc: 'AI creates your beautiful image in 10 seconds',
                icon: '⚡'
              },
              {
                step: '4',
                title: 'Download',
                desc: 'Save and share anywhere instantly',
                icon: '📥'
              }
            ].map((item) => (
              <div
                key={item.step}
                className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/10 rounded-lg hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Simple Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                images: '5 images',
                features: ['Basic generation', 'Try it out', 'Community support']
              },
              {
                name: 'Creator',
                price: '$29',
                period: '/month',
                images: '100 images',
                features: [
                  'All features',
                  'Priority generation',
                  'Email support',
                  'Analytics'
                ],
                highlight: true
              },
              {
                name: 'Pro',
                price: '$99',
                period: '/month',
                images: 'Unlimited',
                features: ['Everything', 'Team access', 'Priority support', 'API access']
              }
            ].map((plan) => (
              <div
                key={plan.name}
                className={`group p-8 rounded-lg border transition transform hover:scale-105 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/30 border-cyan-500/10 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-cyan-400' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold mb-1">
                  {plan.price}
                  {plan.period && <span className="text-lg text-gray-400">{plan.period}</span>}
                </div>
                <p className="text-cyan-400 font-semibold mb-6">{plan.images}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-cyan-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to create?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join creators, entrepreneurs, and brands building their content empire.
          </p>
          <a
            href="/studio"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-lg font-bold transition transform hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            Launch Studio Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 py-12 px-6 text-center text-gray-400 text-sm">
        <p>&copy; 2026 ContentForge. Built for creators. Powered by AI.</p>
      </footer>
    </main>
  )
}
