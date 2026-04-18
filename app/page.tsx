'use client'

export default function Home() {
  return (
    <main style={{ background: '#0a0e27', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', overflow: 'hidden', position: 'relative' }}>
      {/* Grid Background */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', opacity: '0.05', zIndex: -1, backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }}></div>

      {/* Animated Neon Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '5%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(181, 55, 242, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', animation: 'float 10s ease-in-out infinite 1s' }}></div>
        <div style={{ position: 'absolute', top: '50%', right: '25%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255, 0, 110, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', animation: 'float 12s ease-in-out infinite 2s' }}></div>
      </div>

      {/* Navigation */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(26, 40, 80, 0.4)', backdropFilter: 'blur(10px)', background: 'rgba(10, 14, 39, 0.6)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #00d4ff, #b537f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href="/agents" style={{ color: '#94a3b8', padding: '10px 16px', textDecoration: 'none', fontSize: '13px', transition: 'color 0.3s' }}>🤖 Agents</a>
            <a href="/analytics" style={{ color: '#94a3b8', padding: '10px 16px', textDecoration: 'none', fontSize: '13px', transition: 'color 0.3s' }}>📊 Analytics</a>
            <a href="/settings" style={{ color: '#94a3b8', padding: '10px 16px', textDecoration: 'none', fontSize: '13px', transition: 'color 0.3s' }}>⚙️ Settings</a>
            <a href="/studio" style={{ background: 'linear-gradient(120deg, #00d4ff, #b537f2)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '13px', boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)', border: 'none' }}>Start Creating →</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Badge */}
        <div style={{ marginBottom: '24px', animation: 'fadeIn 0.8s ease-out 0.2s both' }}>
          <span style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: '#00d4ff', letterSpacing: '0.5px' }}>✨ NEXT-GEN AUTOMATION</span>
        </div>

        {/* Hero Title */}
        <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px', animation: 'fadeIn 0.8s ease-out 0.4s both' }}>
          Create.
          <br />
          <span style={{ background: 'linear-gradient(120deg, #00d4ff 0%, #b537f2 50%, #ff006e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Post Everywhere.</span>
          <br />
          Earn Instantly.
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 48px', lineHeight: '1.6', animation: 'fadeIn 0.8s ease-out 0.6s both' }}>
          Generate stunning AI content in seconds. Schedule posts across TikTok, Instagram, YouTube. Track performance. Scale your empire.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px', animation: 'fadeIn 0.8s ease-out 0.8s both', flexWrap: 'wrap' }}>
          <a href="/studio" style={{ background: 'linear-gradient(120deg, #00d4ff, #b537f2)', color: 'white', padding: '16px 40px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '16px', boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)', border: 'none', cursor: 'pointer', display: 'inline-block' }}>
            Launch Studio
          </a>
          <button style={{ background: 'rgba(0, 212, 255, 0.1)', border: '2px solid #00d4ff', color: '#00d4ff', padding: '14px 40px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
            View Demo
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', paddingTop: '80px', borderTop: '1px solid rgba(26, 40, 80, 0.3)' }}>
          {[
            { value: '50K+', label: 'Posts Created' },
            { value: '5M+', label: 'Total Impressions' },
            { value: '2K+', label: 'Active Creators' }
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '24px',
                background: 'rgba(15, 24, 64, 0.4)',
                border: '1px solid rgba(26, 40, 80, 0.4)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                animation: `fadeIn 0.8s ease-out ${1 + i * 0.2}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00d4ff';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26, 40, 80, 0.4)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#00d4ff', marginBottom: '8px', textShadow: '0 0 10px #00d4ff' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', background: 'rgba(15, 24, 64, 0.3)', borderTop: '1px solid rgba(26, 40, 80, 0.3)', borderBottom: '1px solid rgba(26, 40, 80, 0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '700', textAlign: 'center', marginBottom: '64px' }}>
            Superpowers
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              { icon: '⚡', title: 'AI Image Gen', desc: 'High-quality images in seconds' },
              { icon: '📅', title: 'Smart Schedule', desc: 'Post at peak engagement times' },
              { icon: '📊', title: 'Real Analytics', desc: 'Track impressions & engagement' },
              { icon: '📱', title: 'Multi-Platform', desc: 'TikTok, Instagram, YouTube' }
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: '32px',
                  background: 'rgba(15, 24, 64, 0.5)',
                  border: '1px solid rgba(26, 40, 80, 0.4)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  animation: `fadeIn 0.8s ease-out ${0.4 + i * 0.15}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#b537f2';
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(181, 55, 242, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(26, 40, 80, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '700', textAlign: 'center', marginBottom: '64px' }}>Simple Pricing</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {[
            { name: 'Creator', price: '$29', features: ['100 credits/mo', 'Schedule posts', 'Basic analytics'] },
            { name: 'Pro', price: '$99', features: ['Unlimited credits', 'Priority support', 'Advanced analytics', 'Team collaboration'], highlight: true },
            { name: 'Enterprise', price: 'Custom', features: ['White-label', 'API access', 'Dedicated support'] }
          ].map((plan, i) => (
            <div
              key={i}
              style={{
                padding: '32px',
                background: plan.highlight ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(181, 55, 242, 0.1))' : 'rgba(15, 24, 64, 0.4)',
                border: plan.highlight ? '1px solid rgba(0, 212, 255, 0.3)' : '1px solid rgba(26, 40, 80, 0.4)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                transform: plan.highlight ? 'scale(1.05)' : 'scale(1)',
                boxShadow: plan.highlight ? '0 0 40px rgba(0, 212, 255, 0.2)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {plan.highlight && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(120deg, #00d4ff, #b537f2)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', color: 'white' }}>⭐ POPULAR</div>}
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>{plan.name}</h3>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#00d4ff', marginBottom: '24px' }}>{plan.price}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                {plan.features.map((feature, j) => (
                  <li key={j} style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: '12px', background: plan.highlight ? 'linear-gradient(120deg, #00d4ff, #b537f2)' : 'rgba(0, 212, 255, 0.1)', color: plan.highlight ? 'white' : '#00d4ff', border: plan.highlight ? 'none' : '1px solid #00d4ff', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(26, 40, 80, 0.3)', padding: '40px 24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <p>&copy; 2026 ContentForge. Create smarter. Post faster. Earn more.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </main>
  )
}
