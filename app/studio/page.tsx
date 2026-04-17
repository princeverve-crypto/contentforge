'use client'

import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
      </div>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)', backdropFilter: 'blur(10px)', background: 'rgba(15, 23, 42, 0.4)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '28px', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px', cursor: 'pointer' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </a>
          <a href="/" style={{ fontSize: '15px', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }}>
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Title */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
            Create Your
            <br />
            <span style={{ background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Next Viral Post
            </span>
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.6' }}>
            Describe what you want. AI creates it. Post instantly to all platforms.
          </p>
        </div>

        {/* Generator Card */}
        <div style={{ padding: '40px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <ImageGenerator />
        </div>
      </div>
    </main>
  )
}
