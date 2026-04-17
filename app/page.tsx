'use client'

export default function Home() {
  return (
    <main style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      {/* Animated background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animation: 'float 10s ease-in-out infinite 1s' }}></div>
      </div>

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)', backdropFilter: 'blur(10px)', background: 'rgba(15, 23, 42, 0.4)', animation: 'slideInLeft 0.8s ease-out' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/settings" style={{ color: '#94a3b8', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', transition: 'all 0.3s' }}>⚙️ Settings</a>
            <a href="/studio" style={{ background: 'linear-gradient(120deg, #3b82f6, #1e40af)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '15px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)', display: 'inline-block', transition: 'all 0.3s' }}>Start Creating →</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '24px', animation: 'fadeIn 0.8s ease-out 0.2s both' }}>
          <span style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#60a5fa', letterSpacing: '0.5px' }}>✨ AI-POWERED AUTOMATION</span>
        </div>

        <h1 style={{ fontSize: '56px', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '24px', maxWidth: '800px', margin: '0 auto 24px', animation: 'fadeIn 0.8s ease-out 0.4s both' }}>
          Create Content.
          <br />
          <span style={{ background: 'linear-gradient(120deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Post Everywhere.
          </span>
          <br />
          Make Money.
        </h1>

        <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 48px', lineHeight: '1.6', animation: 'fadeIn 0.8s ease-out 0.6s both' }}>
          Generate stunning images in seconds. Automatically post to TikTok, Instagram, and YouTube. Scale your content empire with AI.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px', animation: 'fadeIn 0.8s ease-out 0.8s both' }}>
          <a href="/studio" style={{ background: 'linear-gradient(120deg, #3b82f6, #1e40af)', color: 'white', padding: '16px 32px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '16px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)', display: 'inline-block', transition: 'all 0.3s' }}>Launch Studio</a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '64px', paddingTop: '64px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
          {[{ value: '10K+', label: 'Images Created' }, { value: '1000+', label: 'Active Users' }, { value: '500K+', label: 'Posts Generated' }].map((stat, i) => (
            <div key={i} style={{ padding: '24px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', animation: `fadeIn 0.8s ease-out ${1 + i * 0.2}s both`, transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'; e.currentTarget.style.transform = 'translateY(-8px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)'; e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px', background: 'rgba(30, 41, 59, 0.3)', borderTop: '1px solid rgba(148, 163, 184, 0.1)', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginBottom: '64px', animation: 'fadeIn 0.8s ease-out 0.2s both' }}>How It Works</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {[
              { num: '01', title: 'Describe', desc: 'Write what you want to create', icon: '✏️' },
              { num: '02', title: 'Generate', desc: 'AI creates stunning images in seconds', icon: '⚡' },
              { num: '03', title: 'Post', desc: 'Auto-post to TikTok, Instagram, YouTube', icon: '📤' },
              { num: '04', title: 'Earn', desc: 'Monetize your content', icon: '💰' }
            ].map((step, i) => (
              <div key={i} style={{ padding: '32px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', animation: `fadeIn 0.8s ease-out ${0.4 + i * 0.15}s both`, transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'; e.currentTarget.style.transform = 'translateY(-8px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)'; e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{step.icon}</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px', letterSpacing: '1px' }}>{step.num}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'rgba(30, 41, 59, 0.3)', borderTop: '1px solid rgba(148, 163, 184, 0.1)', textAlign: 'center', animation: 'fadeIn 0.8s ease-out 0.2s both' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '24px' }}>Ready to create?</h2>
          <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '40px', lineHeight: '1.6' }}>
            Join creators scaling their content empire with AI automation.
          </p>
          <a href="/studio" style={{ display: 'inline-block', background: 'linear-gradient(120deg, #3b82f6, #1e40af)', color: 'white', padding: '16px 40px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '16px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)', transition: 'all 0.3s' }}>Launch Studio Now →</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <p>&copy; 2026 ContentForge. Create smarter. Post faster. Earn more.</p>
      </footer>
    </main>
  )
}
