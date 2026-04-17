export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ContentForge
          </h1>
          <a href="/studio" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-bold transition transform hover:scale-105">
            Create Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-32 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold">
              ✨ AI-Powered Content Creation
            </span>
          </div>

          <h2 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Create Beautiful Images in Seconds
          </h2>

          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Write what you want. AI creates it. Download, share, or auto-post to TikTok, Instagram, and YouTube instantly.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <a
              href="/studio"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-bold transition transform hover:scale-105 shadow-lg shadow-blue-500/30 text-lg"
            >
              Get Started Free →
            </a>
            <button className="px-8 py-4 border-2 border-blue-500/50 hover:border-blue-400 rounded-lg font-bold transition">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { value: '10K+', label: 'Images Created' },
              { value: '10s', label: 'Generation Speed' },
              { value: '99%', label: 'User Happy' }
            ].map((stat) => (
              <div key={stat.label} className="p-6 bg-slate-800/30 border-2 border-blue-500/20 rounded-lg hover:border-blue-500/50 hover:bg-slate-800/50 transition">
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                num: '1',
                title: 'Write',
                desc: 'Describe what you want to create',
                icon: '✏️'
              },
              {
                num: '2',
                title: 'Choose Format',
                desc: 'Select TikTok, Instagram, YouTube, or Square',
                icon: '🎬'
              },
              {
                num: '3',
                title: 'Generate',
                desc: 'AI creates your beautiful image in 10-20 seconds',
                icon: '⚡'
              },
              {
                num: '4',
                title: 'Auto-Post or Download',
                desc: 'Share instantly to all platforms',
                icon: '📤'
              }
            ].map((item) => (
              <div
                key={item.num}
                className="group p-6 bg-slate-800/30 border-2 border-blue-500/20 rounded-lg hover:border-blue-500/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-blue-500/20 transition transform hover:scale-105"
              >
                <p className="text-4xl mb-3">{item.icon}</p>
                <div className="text-3xl font-bold text-blue-400 mb-2">{item.num}</div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Simple Pricing
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                images: '5 images/month',
                features: ['Basic generation', 'Try it out', 'Community']
              },
              {
                name: 'Creator',
                price: '$29',
                period: '/month',
                images: '100 images/month',
                features: ['All features', 'Priority support', 'Analytics', 'Auto-post'],
                highlight: true
              },
              {
                name: 'Pro',
                price: '$99',
                period: '/month',
                images: 'Unlimited',
                features: ['Everything', 'Team access', '24/7 support', 'API access']
              }
            ].map((plan) => (
              <div
                key={plan.name}
                className={`group p-8 rounded-lg border-2 transition transform hover:scale-105 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-400 shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800/30 border-blue-500/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                <h4 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-blue-400' : 'text-white'}`}>
                  {plan.name}
                </h4>
                <div className="text-4xl font-bold mb-1">
                  {plan.price}
                  {plan.period && <span className="text-lg text-gray-400">{plan.period}</span>}
                </div>
                <p className="text-blue-400 font-bold mb-6">{plan.images}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-blue-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-blue-500/20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to create?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join creators and entrepreneurs building their content empire.
          </p>
          <a
            href="/studio"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-bold transition transform hover:scale-105 shadow-lg shadow-blue-500/30 text-lg"
          >
            Launch Studio Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-12 px-6 text-center text-gray-500 text-sm">
        <p>&copy; 2026 ContentForge. Built for creators. Powered by AI.</p>
      </footer>
    </main>
  )
}
