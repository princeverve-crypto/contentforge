'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleDemoLogin() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email || 'demo@contentforge.app',
          name: 'Demo User',
          provider: 'email'
        })
      })

      if (response.ok) {
        router.push('/studio')
      } else {
        setError('Login failed')
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        router.push('/studio')
      } else {
        setError('Invalid credentials')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ background: '#0a0e27', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Grid Background */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', opacity: '0.05', zIndex: -1, backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }}></div>

      {/* Animated Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50%', left: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(181, 55, 242, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
      </div>

      <div style={{ padding: '24px', maxWidth: '420px', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #00d4ff, #b537f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#cbd5e1' }}>
            AI-powered content creation for social media
          </p>
        </div>

        {/* Login Card */}
        <div style={{ padding: '40px', background: 'rgba(15, 24, 64, 0.4)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '32px', textAlign: 'center' }}>
            Sign In
          </h2>

          {error && (
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '8px', color: '#fca5a5', fontSize: '14px', marginBottom: '24px' }}>
              ❌ {error}
            </div>
          )}

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(120deg, #9333ea, #ec4899)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: loading ? 0.5 : 1
            }}
          >
            ⚡ {loading ? 'Signing in...' : 'Start with Demo Access'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0', opacity: 0.5 }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(148, 163, 184, 0.2)' }}></div>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(148, 163, 184, 0.2)' }}></div>
          </div>

          {/* Email Login */}
          <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(10, 14, 39, 0.6)',
                border: '1px solid rgba(26, 40, 80, 0.4)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'system-ui'
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(10, 14, 39, 0.6)',
                border: '1px solid rgba(26, 40, 80, 0.4)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'system-ui'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(120deg, #00d4ff, #b537f2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? '⏳ Signing in...' : '✓ Sign In'}
            </button>
          </form>

          {/* Demo Note */}
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '24px', textAlign: 'center' }}>
            ✓ Instant access: No credit card needed. Click "Start with Demo Access" or enter your email above.
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
          <a href="/" style={{ color: '#00d4ff', textDecoration: 'none' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}
