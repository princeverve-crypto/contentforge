'use client'

import { useEffect, useRef, useState } from 'react'

export default function WorldClassHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = []

    const createParticles = () => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.005

        if (p.life <= 0) {
          particles.splice(i, 1)
          return
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 60)
        gradient.addColorStop(0, `rgba(181, 55, 242, ${p.life * 0.4})`)
        gradient.addColorStop(0.5, `rgba(0, 212, 255, ${p.life * 0.2})`)
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(p.x - 60, p.y - 60, 120, 120)
      })

      if (particles.length < 50) createParticles()
      requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ background: 'linear-gradient(to bottom right, #0f172a, #2d1b4e, #0f172a)', minHeight: '100vh', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Canvas Background Animation */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4, mixBlendMode: 'screen' }}
      />

      {/* Grid Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
          backdropFilter: 'blur(12px)',
          background: 'rgba(15, 23, 42, 0.3)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(to bottom right, #a855f7, #ec4899)' }} />
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>ContentForge</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="#" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>Features</a>
              <a href="#" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>Pricing</a>
              <a href="#" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>Testimonials</a>
              <button style={{ fontSize: '14px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #4b5563', color: '#d1d5db', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.color = '#d8b4fe'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#4b5563'; e.currentTarget.style.color = '#d1d5db'; }}>Login</button>
              <button style={{ fontSize: '14px', padding: '8px 24px', borderRadius: '8px', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontWeight: '600', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)'; }}>Sign Up</button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '9999px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', width: 'fit-content' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c084fc', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#d8b4fe' }}>AI-Powered Content Creation</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: '900', lineHeight: 1.2, margin: 0 }}>
              <div style={{ marginBottom: '16px' }}>Transform Your</div>
              <div style={{ background: 'linear-gradient(to right, #c084fc, #f472b6, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '16px' }}>Ideas Into Engaging</div>
              <div>Content</div>
            </h1>

            {/* Subheading */}
            <p style={{ fontSize: '18px', color: '#9ca3af', lineHeight: 1.6, maxWidth: '448px', margin: 0 }}>
              Create high-quality, SEO-optimized content in seconds, not hours. Unlock your content potential today.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <button style={{ padding: '12px 32px', borderRadius: '8px', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontWeight: '600', fontSize: '16px', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 60px rgba(168, 85, 247, 0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}>Get Started Free <span>→</span></button>
              <button style={{ padding: '12px 32px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.5)', color: '#d8b4fe', fontWeight: '600', fontSize: '16px', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'; e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.8)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'; }}>See It In Action</button>
            </div>

            {/* Social Proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '-8px' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(to bottom right, #9333ea, #ec4899)', border: '2px solid #0f172a', marginLeft: i > 0 ? '-8px' : 0 }} />
                ))}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>1,000+ content creators trust us</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>⭐⭐⭐⭐⭐ 4.9/5 rating</p>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div style={{ position: 'relative', height: '400px' }}>
            {/* Glow Background */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '16px', background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))', padding: '2px', opacity: 0.4, filter: 'blur(24px)' }} />

            {/* Dashboard Card */}
            <div style={{ position: 'relative', height: '100%', borderRadius: '16px', background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(15, 23, 42, 0.3))', border: '1px solid rgba(168, 85, 247, 0.2)', backdropFilter: 'blur(12px)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
              {/* Glows */}
              <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '160px', height: '160px', background: '#9333ea', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '160px', height: '160px', background: '#ec4899', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, pointerEvents: 'none' }} />

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                <h3 style={{ fontWeight: '700', color: '#d8b4fe', fontSize: '16px', margin: 0 }}>Dashboard</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.5)' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.5)' }} />
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Posts Created</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#d8b4fe', margin: 0 }}>1,247</p>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Engagement</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#f472b6', margin: 0 }}>+142%</p>
                </div>
              </div>

              {/* Chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '16px', gap: '4px', borderRadius: '8px', background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))', border: '1px solid rgba(168, 85, 247, 0.1)', position: 'relative', zIndex: 10, minHeight: '100px', flex: 1 }}>
                {[40, 60, 45, 75, 55, 80, 70].map((height, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(to top, #9333ea, #ec4899)',
                      borderRadius: '4px 4px 0 0',
                      height: `${height}%`,
                      opacity: 0.6,
                      transition: 'opacity 0.3s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', borderTop: '1px solid rgba(168, 85, 247, 0.1)' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '64px' }}>Powerful Features</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { icon: '⚡', title: 'AI Image Gen', desc: 'Generate stunning visuals instantly' },
              { icon: '📅', title: 'Smart Schedule', desc: 'Post at peak engagement times' },
              { icon: '📊', title: 'Real Analytics', desc: 'Track impressions & engagement' },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'rgba(168, 85, 247, 0.05)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.8)';
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <p style={{ fontSize: '36px', marginBottom: '16px', transition: 'transform 0.3s' }}>{feature.icon}</p>
                <h3 style={{ fontWeight: '700', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', textAlign: 'center', borderTop: '1px solid rgba(168, 85, 247, 0.1)' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Ready to create amazing content?</h2>
          <button style={{ padding: '12px 32px', borderRadius: '8px', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontWeight: '600', fontSize: '16px', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 60px rgba(168, 85, 247, 0.6)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.4)'; }}>Start Creating Today</button>
        </section>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
