'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [adminKey, setAdminKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Verify admin key
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminKey })
      })

      if (response.ok) {
        // Set admin session cookie
        document.cookie = `admin_key=${adminKey}; path=/; secure; samesite=lax; max-age=${30 * 24 * 60 * 60}`
        router.push('/admin/dashboard')
      } else {
        setError('Invalid admin key')
      }
    } catch (err: any) {
      setError('Authentication failed')
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
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50%', left: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(181, 55, 242, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
      </div>

      <div style={{ padding: '24px', maxWidth: '420px', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>
            🔐
          </h1>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
            Admin Access
          </h2>
          <p style={{ fontSize: '16px', color: '#cbd5e1' }}>
            System monitoring & control
          </p>
        </div>

        {/* Login Card */}
        <div style={{ padding: '40px', background: 'rgba(15, 24, 64, 0.4)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          {error && (
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '8px', color: '#fca5a5', fontSize: '14px', marginBottom: '24px' }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
              Admin Secret Key
            </label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin secret key"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(10, 14, 39, 0.6)',
                border: '1px solid rgba(26, 40, 80, 0.4)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'monospace'
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
              {loading ? '⏳ Verifying...' : '✓ Access Dashboard'}
            </button>
          </form>

          {/* Info Box */}
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '8px', fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6' }}>
            <strong>📌 Admin Key:</strong> Check your <code style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 4px', borderRadius: '3px' }}>ADMIN_SECRET_KEY</code> in Vercel environment variables
          </div>
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
