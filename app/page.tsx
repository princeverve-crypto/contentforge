'use client'

export default function Home() {
  return (
    <main style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Background gradient blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
      </div>

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)', backdropFilter: 'blur(10px)', background: 'rgba(15, 23, 42, 0.4)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </div>
          <a href="/studio" style={{ background: 'linear-gradient(120deg, #3b82f6, #1e40af)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '15px', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)', cursor: 'pointer', display: 'inline-block' }}>
            Start Creating →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#60a5fa', letterSpacing: '0.5px' }}>
            ✨ AI-POWERED AUTOMATION
          </span>
        </div>

        <h1 style={{ fontSize: '56px', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '24px', maxWidth: '800px', margin: '0 auto 24px' }}>
          Create Content.
          <br />
          <span style={{ background: 'linear-gradient(120deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Post Everywhere.
          </span>
          <br />
          Make Money.
        </h1>

        <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 48px', lineHeight: '1.6' }}>
          Generate stunning images in seconds. Automatically post to TikTok, Instagram, and YouTube. Scale your content empire with AI.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}>
          <a href="/studio" style={{ background: 'linear-gradient(120deg, #3b82f6, #1e40af)', color: 'white', padding: '16px 32px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '16px', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)', cursor: 'pointer', display: 'inline-block' }}>
            Launch Studio
          </a>
          <button style={{ background: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1', padding: '16px 32px', borderRadius: '8px', fontWeight: '600', border: '1px solid rgba(148, 163, 184, 0.2)', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s' }}>
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '64px', paddingTop: '64px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
          {[{ value: '10K+', label: 'Images Created' }, { value: '1000+', label: 'Active Users' }, { value: '500K+', label: 'Posts Generated' }].map((stat, i) => (
            <div key={i} style={{ padding: '24px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', transition: 'all 0.3s', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px', background: 'rgba(30, 41, 59, 0.3)', borderTop: '1px solid rgba(148, 163, 184, 0.1)', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginBottom: '64px' }}>
            How It Works
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {[
              { num: '01', title: 'Describe', desc: 'Write what you want to create in plain language', icon: '✏️' },
              { num: '02', title: 'Generate', desc: 'AI creates stunning images in 10-20 seconds', icon: '⚡' },
              { num: '03', title: 'Post', desc: 'Auto-post to TikTok, Instagram, YouTube', icon: '📤' },
              { num: '04', title: 'Earn', desc: 'Monetize your content with our credit system', icon: '💰' }
            ].map((step, i) => (
              <div key={i} style={{ padding: '32px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', transition: 'all 0.3s', cursor: 'pointer' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{step.icon}</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px', letterSpacing: '1px' }}>{step.num}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginBottom: '64px' }}>
            Simple Pricing
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { name: 'Free', price: '$0', desc: 'Get started', credits: '5/month', features: ['Basic generation', 'Community support'], highlight: false },
              { name: 'Creator', price: '$29', desc: 'Most popular', credits: '100/month', features: ['All features', 'Priority support', 'Auto-post', 'Analytics'], highlight: true },
              { name: 'Pro', price: '$99', desc: 'For teams', credits: 'Unlimited', features: ['Everything', 'Team access', '24/7 support', 'API access'], highlight: false }
            ].map((plan, i) => (
              <div key={i} style={{ padding: '40px', background: plan.highlight ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))' : 'rgba(30, 41, 59, 0.3)', border: plan.highlight ? '2px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', transition: 'all 0.3s', position: 'relative', cursor: 'pointer' }}>
                {plan.highlight && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>POPULAR</div>}
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{plan.name}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>{plan.desc}</p>
                <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '8px' }}>{plan.price}</div>
                <p style={{ fontSize: '14px', color: '#60a5fa', fontWeight: '600', marginBottom: '32px' }}>{plan.credits} images</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#60a5fa' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '14px', background: plan.highlight ? 'linear-gradient(120deg, #3b82f6, #8b5cf6)' : 'rgba(148, 163, 184, 0.1)', color: plan.highlight ? 'white' : '#cbd5e1', border: plan.highlight ? 'none' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'rgba(30, 41, 59, 0.3)', borderTop: '1px solid rgba(148, 163, 184, 0.1)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '24px' }}>
            Ready to create?
          </h2>
          <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '40px', lineHeight: '1.6' }}>
            Join creators scaling their content empire with AI automation.
          </p>
          <a href="/studio" style={{ display: 'inline-block', background: 'linear-gradient(120deg, #3b82f6, #1e40af)', color: 'white', padding: '16px 40px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '16px', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}>
            Launch Studio Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <p>&copy; 2026 ContentForge. Create smarter. Post faster. Earn more.</p>
      </footer>
    </main>
  )
}
