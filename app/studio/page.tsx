'use client'

import { QuickDashboard } from '@/app/components/QuickDashboard'

export default function StudioPage() {
  return (
    <main style={{ background: '#0a0e27', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', position: 'relative' }}>
      {/* Grid Background */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', opacity: '0.05', zIndex: -1, backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }}></div>

      {/* Animated Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(181, 55, 242, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite 1s' }}></div>
      </div>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(26, 40, 80, 0.4)', backdropFilter: 'blur(10px)', background: 'rgba(10, 14, 39, 0.6)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '28px', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px', cursor: 'pointer' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #00d4ff, #b537f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </a>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/analytics" style={{ color: '#94a3b8', padding: '10px 16px', textDecoration: 'none', fontSize: '13px', transition: 'color 0.3s' }}>📊 Analytics</a>
            <a href="/" style={{ color: '#94a3b8', padding: '10px 16px', textDecoration: 'none', fontSize: '13px', transition: 'color 0.3s' }}>← Home</a>
          </div>
        </div>
      </header>

      {/* Content */}
      <QuickDashboard />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </main>
  )
}
