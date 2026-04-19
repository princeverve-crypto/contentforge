'use client'

import { useEffect, useRef, useState } from 'react'

export default function WorldClassHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [theme, setTheme] = useState('dark')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Digital Marketer', text: 'ContentForge cut our content creation time by 75%. Game changer.', avatar: '👩‍💼' },
    { name: 'Michael Chen', role: 'Agency Owner', text: 'Best investment we made. Clients love the quality. Scaling is effortless.', avatar: '👨‍💼' },
    { name: 'Emily Rodriguez', role: 'Content Creator', text: 'AI suggestions are insanely good. Saves hours every week.', avatar: '👩‍🦱' },
    { name: 'David Kim', role: 'Social Manager', text: 'Analytics dashboard is unreal. Finally understand what works.', avatar: '👨‍🦱' },
    { name: 'Lisa Thompson', role: 'Brand Manager', text: 'Consistency across platforms never been easier. Highly recommend.', avatar: '👩‍🔬' },
    { name: 'James Wilson', role: 'Startup CEO', text: 'Handles everything we need. Support team is fantastic.', avatar: '👨‍💻' },
  ]

  const faqs = [
    { q: 'How does AI content generation work?', a: 'Our AI analyzes your brand voice, target audience, and content type. Generates multiple variations in seconds. You edit, approve, schedule.' },
    { q: 'Can I schedule posts in advance?', a: 'Yes. Plan weeks ahead across all platforms. Smart scheduling optimizes timing by platform and audience timezone.' },
    { q: 'What platforms do you support?', a: 'Twitter/X, LinkedIn, Instagram, TikTok, Facebook, Pinterest. Full integration. Direct posting.' },
    { q: 'How accurate is performance analytics?', a: 'Real-time sync with platform APIs. Track views, engagements, clicks, conversions. Compare content performance.' },
    { q: 'Can I collaborate with team members?', a: 'Full team workspace. Assign roles, permissions. Approval workflows. Activity logs.' },
    { q: 'Is my data secure?', a: 'Enterprise-grade encryption. SSO support. Compliance: SOC 2, GDPR, CCPA. Regular security audits.' },
    { q: 'What if I need API access?', a: 'Full REST API. Webhooks. CLI tool. Integrate with your stack.' },
    { q: 'How much do you cost?', a: 'Starter $9/mo. Pro $29/mo. Enterprise custom. No hidden fees. Cancel anytime.' },
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      price: 9,
      desc: 'Perfect for solopreneurs',
      features: ['50 posts/month', 'Basic AI generation', '2 social accounts', 'Community support'],
      cta: 'Start Free',
    },
    {
      name: 'Pro',
      price: 29,
      desc: 'Most popular for agencies',
      features: ['500 posts/month', 'Advanced AI', 'Unlimited accounts', 'Priority support', 'Team collaboration', 'Advanced analytics'],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 99,
      desc: 'Custom for large teams',
      features: ['Unlimited posts', 'Custom AI models', 'Dedicated manager', '24/7 support', 'SLA guarantee', 'Custom integrations'],
      cta: 'Contact Sales',
    },
  ]

  return (
    <div style={{ background: theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #2d1b4e, #0f172a)' : 'linear-gradient(to bottom right, #f8f9fa, #f0e6ff, #f8f9fa)', minHeight: '100vh', color: theme === 'dark' ? 'white' : '#1f2937', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}>
      {/* Canvas Background */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4, mixBlendMode: 'screen' }} />

      {/* Grid Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: theme === 'dark' ? 'linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px)' : 'linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}`,
          backdropFilter: 'blur(12px)',
          background: theme === 'dark' ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.7)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(to bottom right, #a855f7, #ec4899)' }} />
              <span style={{ fontSize: '20px', fontWeight: 'bold', background: theme === 'dark' ? 'linear-gradient(to right, #c084fc, #f472b6)' : 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ContentForge</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <a href="#features" style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#4b5563', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? 'white' : '#1f2937'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#4b5563'}>Features</a>
                <a href="#pricing" style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#4b5563', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? 'white' : '#1f2937'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#4b5563'}>Pricing</a>
                <a href="#testimonials" style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#4b5563', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? 'white' : '#1f2937'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#4b5563'}>Testimonials</a>
                <a href="#faq" style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#4b5563', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? 'white' : '#1f2937'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#4b5563'}>FAQ</a>
              </div>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>{theme === 'dark' ? '☀️' : '🌙'}</button>
              <button style={{ fontSize: '14px', padding: '8px 16px', borderRadius: '8px', border: `1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`, color: theme === 'dark' ? '#d1d5db' : '#374151', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.color = theme === 'dark' ? '#d8b4fe' : '#7c3aed'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme === 'dark' ? '#4b5563' : '#d1d5db'; e.currentTarget.style.color = theme === 'dark' ? '#d1d5db' : '#374151'; }}>Login</button>
              <button style={{ fontSize: '14px', padding: '8px 24px', borderRadius: '8px', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontWeight: '600', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)'; }}>Sign Up</button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '9999px', background: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.4)'}`, width: 'fit-content' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c084fc', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#d8b4fe' }}>AI-Powered Content Creation</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: '900', lineHeight: 1.2, margin: 0 }}>
              <div style={{ marginBottom: '16px' }}>Transform Your</div>
              <div style={{ background: 'linear-gradient(to right, #c084fc, #f472b6, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '16px' }}>Ideas Into Engaging</div>
              <div>Content</div>
            </h1>

            <p style={{ fontSize: '18px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', lineHeight: 1.6, maxWidth: '448px', margin: 0 }}>
              Create high-quality, SEO-optimized content in seconds. Unlock your content potential with AI that understands your brand.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <button style={{ padding: '12px 32px', borderRadius: '8px', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontWeight: '600', fontSize: '16px', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 60px rgba(168, 85, 247, 0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}>Get Started Free <span>→</span></button>
              <button style={{ padding: '12px 32px', borderRadius: '8px', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.6)'}`, color: theme === 'dark' ? '#d8b4fe' : '#9333ea', fontWeight: '600', fontSize: '16px', background: theme === 'dark' ? 'transparent' : 'rgba(168, 85, 247, 0.05)', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.1)'; e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.8)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = theme === 'dark' ? 'transparent' : 'rgba(168, 85, 247, 0.05)'; e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.6)'; }}>See It In Action</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '-8px' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(to bottom right, #9333ea, #ec4899)', border: `2px solid ${theme === 'dark' ? '#0f172a' : '#f8f9fa'}`, marginLeft: i > 0 ? '-8px' : 0 }} />
                ))}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>1,000+ creators trust us</p>
                <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', margin: 0 }}>⭐⭐⭐⭐⭐ 4.9/5</p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div style={{ position: 'relative', height: '400px' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '16px', background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))', padding: '2px', opacity: 0.4, filter: 'blur(24px)' }} />
            <div style={{ position: 'relative', height: '100%', borderRadius: '16px', background: theme === 'dark' ? 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(15, 23, 42, 0.3))' : 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.05), rgba(255, 255, 255, 0.5))', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`, backdropFilter: 'blur(12px)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '160px', height: '160px', background: '#9333ea', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '160px', height: '160px', background: '#ec4899', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                <h3 style={{ fontWeight: '700', color: '#d8b4fe', fontSize: '16px', margin: 0 }}>Dashboard</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.5)' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.5)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', margin: '0 0 4px 0' }}>Posts</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#d8b4fe', margin: 0 }}>1,247</p>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                  <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', margin: '0 0 4px 0' }}>Engagement</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#f472b6', margin: 0 }}>+142%</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '16px', gap: '4px', borderRadius: '8px', background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))', border: '1px solid rgba(168, 85, 247, 0.1)', position: 'relative', zIndex: 10, minHeight: '100px', flex: 1 }}>
                {[40, 60, 45, 75, 55, 80, 70].map((height, i) => (
                  <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, #9333ea, #ec4899)', borderRadius: '4px 4px 0 0', height: `${height}%`, opacity: 0.6, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Supercharge Your Content - Detailed Features */}
        <section id="features" style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}` }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '24px', background: 'linear-gradient(to right, #c084fc, #f472b6, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Supercharge Your Content</h2>
            <p style={{ fontSize: '18px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', maxWidth: '600px', margin: '0 auto' }}>Everything you need to create, schedule, and analyze content at scale</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '120px' }}>
            <div>
              <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>AI-Powered Content Generation</h3>
              <p style={{ fontSize: '16px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}>Generate unique, on-brand content in seconds. Our AI learns your voice and creates variations that convert.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Multiple variations per prompt', 'Brand voice customization', 'Tone & style controls', 'Hashtag optimization'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontSize: '14px', fontWeight: '700' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'relative', height: '400px', background: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)', borderRadius: '16px', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '80px', opacity: 0.3 }}>⚡</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '400px', background: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)', borderRadius: '16px', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '80px', opacity: 0.3 }}>📊</div>
            </div>
            <div>
              <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>SEO Optimization Built-In</h3>
              <p style={{ fontSize: '16px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}>Every piece of content is optimized for search. Get keyword suggestions, readability scores, and meta recommendations.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Keyword research integration', 'Readability analysis', 'Meta optimization', 'Schema markup support'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontSize: '14px', fontWeight: '700' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6 Feature Cards */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}` }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '64px' }}>Features That Scale With You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { icon: '🎯', title: 'Audience Targeting', desc: 'Reach the right people with demographic & interest targeting' },
              { icon: '💡', title: 'Idea Generation', desc: 'Never run out of content ideas with AI suggestions' },
              { icon: '📈', title: 'Performance Analytics', desc: 'Real-time metrics across all platforms' },
              { icon: '🔄', title: 'Unlimited Revisions', desc: 'Iterate until perfect, no limits' },
              { icon: '⏱️', title: 'Time-Saving Automation', desc: 'Batch create & schedule weeks in advance' },
              { icon: '✨', title: 'Plagiarism-Free Guarantee', desc: 'Original content every single time' },
            ].map((feature, i) => (
              <div key={i} style={{ padding: '32px', borderRadius: '12px', background: theme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.1)', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`, transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.background = theme === 'dark' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'; e.currentTarget.style.background = theme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <p style={{ fontSize: '48px', marginBottom: '16px', transition: 'transform 0.3s' }}>{feature.icon}</p>
                <h3 style={{ fontWeight: '700', marginBottom: '8px', fontSize: '18px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}` }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '24px' }}>Simple, Transparent Pricing</h2>
            <p style={{ fontSize: '18px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', maxWidth: '600px', margin: '0 auto' }}>Choose the plan that fits your needs. Always flexible.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {pricingTiers.map((tier, i) => (
              <div key={i} style={{ position: 'relative', padding: '48px 32px', borderRadius: '16px', background: tier.popular ? 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1))' : theme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.1)', border: `2px solid ${tier.popular ? '#a855f7' : theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`, transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                {tier.popular && <div style={{ position: 'absolute', top: '-16px', right: '32px', padding: '4px 12px', borderRadius: '9999px', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontSize: '12px', fontWeight: '700', color: 'white' }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>{tier.name}</h3>
                <p style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', marginBottom: '32px' }}>{tier.desc}</p>
                <div style={{ marginBottom: '32px' }}>
                  <span style={{ fontSize: '48px', fontWeight: '900' }}>${tier.price}</span>
                  <span style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>/month</span>
                </div>
                <button style={{ width: '100%', padding: '12px 24px', borderRadius: '8px', background: tier.popular ? 'linear-gradient(to right, #9333ea, #ec4899)' : 'transparent', border: `1px solid ${tier.popular ? '#a855f7' : theme === 'dark' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.6)'}`, color: tier.popular ? 'white' : theme === 'dark' ? '#d8b4fe' : '#9333ea', fontWeight: '600', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s', marginBottom: '32px', boxShadow: tier.popular ? '0 0 20px rgba(168, 85, 247, 0.3)' : 'none' }} onMouseEnter={(e) => { if (!tier.popular) { e.currentTarget.style.background = theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.1)'; } }} onMouseLeave={(e) => { if (!tier.popular) { e.currentTarget.style.background = 'transparent'; } }}>{tier.cta}</button>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {tier.features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                      <span style={{ color: '#a855f7', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Company Logos */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', textAlign: 'center', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}` }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: theme === 'dark' ? '#9ca3af' : '#6b7280', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '1px' }}>Trusted by leading companies</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '32px', alignItems: 'center' }}>
            {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
              <div key={letter} style={{ padding: '24px', borderRadius: '8px', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}`, background: theme === 'dark' ? 'rgba(168, 85, 247, 0.02)' : 'rgba(168, 85, 247, 0.05)', fontSize: '24px', fontWeight: '700', color: theme === 'dark' ? '#9ca3af' : '#9ca3af', opacity: 0.5 }}>Company {letter}</div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}` }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', textAlign: 'center', marginBottom: '80px', background: 'linear-gradient(to right, #c084fc, #f472b6, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>What Customers Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '32px', borderRadius: '12px', background: theme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.1)', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`, transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#a855f7'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'; }}>
                <p style={{ fontSize: '16px', color: theme === 'dark' ? '#e5e7eb' : '#1f2937', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '32px' }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}` }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', textAlign: 'center', marginBottom: '80px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderRadius: '8px', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.3)'}`, background: expandedFaq === i ? (theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)') : theme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.08)', transition: 'all 0.3s', overflow: 'hidden' }}>
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{ width: '100%', padding: '24px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: '600', color: 'inherit', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#a855f7'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'inherit'; }}>
                  {faq.q}
                  <span style={{ fontSize: '20px', transition: 'transform 0.3s', transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                </button>
                {expandedFaq === i && (
                  <div style={{ padding: '0 24px 24px 24px', color: theme === 'dark' ? '#d1d5db' : '#4b5563', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter & CTA */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 24px', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}`, textAlign: 'center' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '24px' }}>Ready to Transform Your Content?</h2>
          <p style={{ fontSize: '18px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>Join thousands of creators, marketers, and agencies already using ContentForge.</p>
          <div style={{ display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto 48px' }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.4)'}`, background: theme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.1)', color: 'inherit', fontSize: '16px', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.4)'; e.currentTarget.style.boxShadow = 'none'; }} />
            <button style={{ padding: '12px 32px', borderRadius: '8px', background: 'linear-gradient(to right, #9333ea, #ec4899)', border: 'none', fontWeight: '600', fontSize: '16px', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)'; }}>Subscribe</button>
          </div>
          <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', marginBottom: '48px' }}>No spam. Unsubscribe anytime.</p>
          <button style={{ padding: '14px 48px', borderRadius: '8px', background: 'linear-gradient(to right, #9333ea, #ec4899)', fontWeight: '700', fontSize: '18px', border: 'none', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)', display: 'inline-block' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 60px rgba(168, 85, 247, 0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}>Start Creating Today</button>
        </section>

        {/* Footer */}
        <footer style={{ background: theme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.3)', borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}`, padding: '80px 24px 40px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '48px', marginBottom: '64px' }}>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Product</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Features', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                    <li key={item}><a href="#" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', textDecoration: 'none', transition: 'color 0.3s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? '#d8b4fe' : '#9333ea'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#6b7280'}>{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Company</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                    <li key={item}><a href="#" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', textDecoration: 'none', transition: 'color 0.3s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? '#d8b4fe' : '#9333ea'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#6b7280'}>{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Resources</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Docs', 'API Ref', 'Community', 'Help'].map((item) => (
                    <li key={item}><a href="#" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', textDecoration: 'none', transition: 'color 0.3s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? '#d8b4fe' : '#9333ea'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#6b7280'}>{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Legal</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Privacy', 'Terms', 'Cookies', 'Contact'].map((item) => (
                    <li key={item}><a href="#" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', textDecoration: 'none', transition: 'color 0.3s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? '#d8b4fe' : '#9333ea'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#6b7280'}>{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Follow</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((item) => (
                    <li key={item}><a href="#" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', textDecoration: 'none', transition: 'color 0.3s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = theme === 'dark' ? '#d8b4fe' : '#9333ea'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#6b7280'}>{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'}`, paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', color: theme === 'dark' ? '#9ca3af' : '#6b7280', margin: 0 }}>© 2024 ContentForge. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '24px' }}>
                {['🐦', '💼', '🐙', '💬'].map((emoji, i) => (
                  <a key={i} href="#" style={{ fontSize: '20px', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>{emoji}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
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
