export default function Home() {
  return (
    <main style={{ background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #000000)' }} className="min-h-screen text-white">
      {/* Navigation */}
      <nav style={{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-tight">
            <span style={{ backgroundImage: 'linear-gradient(to right, #06b6d4, #3b82f6, #a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              ContentForge
            </span>
          </div>
          <a 
            href="/studio" 
            style={{ background: 'linear-gradient(to right, #0ea5e9, #3b82f6)' }}
            className="px-6 py-2.5 rounded-full font-semibold text-sm transition hover:opacity-90 shadow-lg"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Background Effects */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '0%', left: '25%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: '400px', height: '400px', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
      </div>

      {/* Hero */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div style={{ marginBottom: '32px' }}>
            <span style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '9999px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', backdropFilter: 'blur(4px)' }}>
              ✨ AI-Powered Creation
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-tight mb-8">
            <div style={{ backgroundImage: 'linear-gradient(to right, #ffffff, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Create
            </div>
            <div style={{ backgroundImage: 'linear-gradient(to right, #0ea5e9, #a855f7, #ec4899)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', marginTop: '8px' }}>
              Beautiful
            </div>
            <div style={{ color: '#ffffff', marginTop: '8px' }}>Content</div>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
            Write what you want. AI creates it instantly. Download, share, or auto-post to all platforms.
          </p>

          <div className="flex gap-4 mb-20">
            <a
              href="/studio"
              style={{ background: 'linear-gradient(to right, #0ea5e9, #3b82f6)' }}
              className="px-8 py-4 rounded-full font-bold transition hover:opacity-90 shadow-xl"
            >
              Launch Studio →
            </a>
            <button style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }} className="px-8 py-4 rounded-full font-bold transition hover:bg-white/10 backdrop-blur">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { number: '10K+', text: 'Images Created' },
              { number: '10s', text: 'Generation' },
              { number: '99%', text: 'Happy Users' }
            ].map((stat) => (
              <div key={stat.text} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' } as any} className="hover:bg-white/10 hover:border-white/20">
                <div style={{ backgroundImage: 'linear-gradient(to right, #06b6d4, #3b82f6)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center" style={{ backgroundImage: 'linear-gradient(to right, #06b6d4, #3b82f6)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Write', desc: 'Describe your vision', icon: '✏️' },
              { num: '02', title: 'Select Format', desc: 'Choose platform', icon: '🎬' },
              { num: '03', title: 'Generate', desc: 'AI creates instantly', icon: '⚡' },
              { num: '04', title: 'Share', desc: 'Post everywhere', icon: '📤' }
            ].map((step) => (
              <div key={step.num} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '32px', transition: 'all 0.3s ease' }} className="hover:bg-white/10 hover:border-white/20">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div style={{ color: '#06b6d4', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{step.num}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center" style={{ backgroundImage: 'linear-gradient(to right, #06b6d4, #3b82f6)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Simple Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Free', price: '$0', desc: '5/month', features: ['Basic', 'Community'] },
              { name: 'Creator', price: '$29', desc: '100/month', features: ['Priority', 'Auto-post'], highlight: true },
              { name: 'Pro', price: '$99', desc: 'Unlimited', features: ['Team', 'Support'] }
            ].map((plan) => (
              <div key={plan.name} style={plan.highlight ? { background: 'linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(6, 182, 212, 0.5)', boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1)' } : { background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }} className="relative p-8 rounded-2xl backdrop-blur transition hover:border-white/20 hover:bg-white/8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-1">{plan.price}</div>
                <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm flex items-center gap-2 text-gray-300">
                      <span style={{ color: '#06b6d4' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button style={plan.highlight ? { background: 'linear-gradient(to right, #0ea5e9, #3b82f6)' } : { background: 'rgba(255, 255, 255, 0.1)' }} className="w-full py-3 rounded-full font-bold transition hover:opacity-90">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }} className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">Ready to create?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join creators building their content empire with AI.
          </p>
          <a
            href="/studio"
            style={{ background: 'linear-gradient(to right, #0ea5e9, #3b82f6)' }}
            className="inline-block px-8 py-4 rounded-full font-bold transition hover:opacity-90 shadow-xl"
          >
            Start Creating Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }} className="py-12 px-6 text-center text-gray-500 text-sm">
        <p>&copy; 2026 ContentForge. Built for creators.</p>
      </footer>
    </main>
  )
}
