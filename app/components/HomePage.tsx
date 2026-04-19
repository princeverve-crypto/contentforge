'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [theme, setTheme] = useState('dark')

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark'
        ? 'linear-gradient(135deg, #0f172a 0%, #2d1b4e 50%, #0f172a 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0e6ff 50%, #ffffff 100%)',
      color: theme === 'dark' ? 'white' : '#1f2937',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: theme === 'dark'
          ? 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),\n               radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}`,
        backdropFilter: 'blur(12px)',
        background: theme === 'dark'
          ? 'rgba(15, 23, 42, 0.4)'
          : 'rgba(255, 255, 255, 0.6)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Content<span style={{
              background: 'linear-gradient(90deg, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Forge</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => handleNavigate('/login')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: `1px solid rgba(168, 85, 247, 0.5)`,
                background: 'transparent',
                color: theme === 'dark' ? '#d8b4fe' : '#9333ea',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate('/login')}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 24px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '900',
            marginBottom: '24px',
            lineHeight: '1.2',
            background: 'linear-gradient(90deg, #c084fc, #f472b6, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            AI Content Creation That Actually Feels Real
          </h1>
          <p style={{
            fontSize: '18px',
            color: theme === 'dark' ? '#cbd5e1' : '#6b7280',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            Create posts, videos & images in seconds. Schedule across all platforms. Track what works. Scale with confidence.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleNavigate('/login')}
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)'
              }}
            >
              Start Free (No CC)
            </button>
            <button
              onClick={() => handleNavigate('/studio')}
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                border: `1px solid rgba(168, 85, 247, 0.5)`,
                background: 'transparent',
                color: theme === 'dark' ? '#d8b4fe' : '#9333ea',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              See Demo →
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section style={{
          maxWidth: '1200px',
          margin: '80px auto 0',
          padding: '80px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {[
            { icon: '⚡', title: 'AI Generation', desc: 'Custom captions, images & videos tuned to your brand voice' },
            { icon: '📅', title: 'Smart Scheduling', desc: 'Post at optimal times across TikTok, Instagram, YouTube & more' },
            { icon: '📊', title: 'Real Analytics', desc: 'Track engagement, clicks & revenue from each post' },
            { icon: '👥', title: 'Team Collab', desc: 'Approve, edit & publish together in real-time' },
            { icon: '💰', title: 'Revenue Share', desc: 'Earn commissions from affiliate & sponsorship links' },
            { icon: '🔧', title: 'API Access', desc: 'Build custom workflows. Scale without limits.' }
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                padding: '32px',
                borderRadius: '12px',
                background: theme === 'dark'
                  ? 'rgba(168, 85, 247, 0.05)'
                  : 'rgba(168, 85, 247, 0.1)',
                border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = '#a855f7'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{feature.title}</h3>
              <p style={{ fontSize: '14px', color: theme === 'dark' ? '#a0aec0' : '#6b7280', margin: 0 }}>{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Pricing */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 24px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '60px' }}>Simple Pricing</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {[
              { tier: 'Creator', price: 7, features: ['500 posts/mo', 'Basic AI', '3 social accounts', 'Community support'] },
              { tier: 'Pro', price: 29, popular: true, features: ['2K posts/mo', 'Advanced AI', 'Unlimited accounts', 'Team collab', 'Priority support', 'Revenue sharing'] },
              { tier: 'Enterprise', price: 299, features: ['Unlimited posts', 'Custom AI training', 'Dedicated manager', '24/7 support', 'API access', 'White-label'] }
            ].map((tier, i) => (
              <div
                key={i}
                style={{
                  padding: '40px',
                  borderRadius: '12px',
                  background: tier.popular
                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.15))'
                    : theme === 'dark'
                    ? 'rgba(168, 85, 247, 0.05)'
                    : 'rgba(168, 85, 247, 0.1)',
                  border: `2px solid ${tier.popular ? '#a855f7' : theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`,
                  position: 'relative'
                }}
              >
                {tier.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>{tier.tier}</h3>
                <div style={{ marginBottom: '32px' }}>
                  <span style={{ fontSize: '40px', fontWeight: '900' }}>${tier.price}</span>
                  <span style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280', marginLeft: '8px' }}>/month</span>
                </div>
                <button
                  onClick={() => handleNavigate('/login')}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: tier.popular
                      ? 'linear-gradient(90deg, #9333ea, #ec4899)'
                      : 'transparent',
                    color: tier.popular ? 'white' : theme === 'dark' ? '#d8b4fe' : '#9333ea',
                    border: `1px solid ${tier.popular ? '#a855f7' : theme === 'dark' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.6)'}`,
                    cursor: 'pointer',
                    fontWeight: '600',
                    marginBottom: '24px'
                  }}
                >
                  Get Started
                </button>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
                  {tier.features.map((f, j) => (
                    <li key={j} style={{ padding: '8px 0', fontSize: '14px', borderBottom: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}` }}>
                      ✓ {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}`,
          padding: '60px 24px 40px',
          textAlign: 'center'
        }}>
          <p style={{ color: theme === 'dark' ? '#a0aec0' : '#6b7280', marginBottom: '16px' }}>
            © 2025 ContentForge. Build once, scale forever.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {['Twitter', 'LinkedIn', 'Discord'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  )
}
