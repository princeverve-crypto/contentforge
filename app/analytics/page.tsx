'use client'

import { AnalyticsDashboard } from '@/app/components/AnalyticsDashboard'

export default function AnalyticsPage() {
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
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/studio" style={{ color: '#94a3b8', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', transition: 'all 0.3s' }}>🎬 Studio</a>
            <a href="/settings" style={{ color: '#94a3b8', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', transition: 'all 0.3s' }}>⚙️ Settings</a>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Title */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
            Performance
            <br />
            <span style={{ background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Analytics
            </span>
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.6' }}>
            Track your content performance across all platforms. Monitor impressions, engagement, and ROI.
          </p>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </div>
    </main>
  )
}
