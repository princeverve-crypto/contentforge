export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              ContentForge
            </span>
          </div>
          <a 
            href="/studio" 
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full font-semibold text-sm transition transform hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 mb-16">
            <div>
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold mb-6 backdrop-blur">
                ✨ AI-Powered Creation
              </span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Create
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beautiful
              </span>
              <br />
              <span className="text-white">Content</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Write what you want. AI creates it instantly. Download, share, or auto-post to all platforms.
            </p>

            <div className="flex gap-4 pt-4">
              <a
                href="/studio"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full font-bold transition transform hover:scale-105 shadow-xl shadow-blue-500/40"
              >
                Launch Studio →
              </a>
              <button className="px-8 py-4 border border-white/20 hover:border-white/40 rounded-full font-bold transition backdrop-blur">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              { number: '10K+', text: 'Images Created' },
              { number: '10s', text: 'Generation Speed' },
              { number: '99%', text: 'User Satisfaction' }
            ].map((stat) => (
              <div key={stat.text} className="group">
                <div className="relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur hover:border-white/20 hover:bg-white/8 transition">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="relative">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 font-medium">{stat.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Write', desc: 'Describe your vision', icon: '✏️' },
              { num: '02', title: 'Select Format', desc: 'Choose platform size', icon: '🎬' },
              { num: '03', title: 'Generate', desc: 'AI creates instantly', icon: '⚡' },
              { num: '04', title: 'Share', desc: 'Post everywhere', icon: '📤' }
            ].map((step) => (
              <div key={step.num} className="group">
                <div className="relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur hover:border-white/20 hover:bg-white/8 transition">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-sm font-bold text-cyan-400 mb-2">{step.num}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Free', price: '$0', desc: '5 images/month', features: ['Basic gen', 'Community'] },
              { name: 'Creator', price: '$29', desc: '100 images/month', features: ['Priority support', 'Auto-post', 'Analytics'], highlight: true },
              { name: 'Pro', price: '$99', desc: 'Unlimited', features: ['Team access', '24/7 support', 'API'] }
            ].map((plan) => (
              <div key={plan.name} className="group">
                <div className={`relative p-8 rounded-2xl backdrop-blur border transition ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/50 shadow-xl shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
                }`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-1">{plan.price}</div>
                  <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm flex items-center gap-2 text-gray-300">
                        <span className="text-cyan-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-full font-bold transition ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">Ready to create?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join creators building their content empire with AI.
          </p>
          <a
            href="/studio"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full font-bold transition transform hover:scale-105 shadow-xl shadow-blue-500/40"
          >
            Start Creating Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 text-center text-gray-500 text-sm">
        <p>&copy; 2026 ContentForge. Built for creators.</p>
      </footer>
    </main>
  )
}
