'use client'

import { useEffect, useRef } from 'react'

export default function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const rotateX = ((y - rect.height / 2) / rect.height) * 10
      const rotateY = ((x - rect.width / 2) / rect.width) * 10

      containerRef.current.style.setProperty('--rotateX', `${rotateX}deg`)
      containerRef.current.style.setProperty('--rotateY', `${rotateY}deg`)
    }

    containerRef.current?.addEventListener('mousemove', handleMouseMove)
    return () => containerRef.current?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="perspective-3d relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Animated Background Orbs - 3D Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float-3d 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(181, 55, 242, 0.6) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'float-3d 25s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.5) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'float-3d 30s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Hero Content - 3D Transforming Container */}
      <div
        ref={containerRef}
        className="transform-3d relative z-10 text-center max-w-5xl mx-auto px-6 py-20"
      >
        {/* Badge */}
        <div
          className="inline-block glass mb-8 px-6 py-3 rounded-full border border-cyan-500/30"
          style={{
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        >
          <span className="text-cyan-400 text-sm font-semibold">✨ NEXT-GEN AI CONTENT SUITE</span>
        </div>

        {/* Main Headline */}
        <h1
          className="text-6xl font-black mb-6 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #b537f2, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))',
          }}
        >
          Create. Post. Dominate.
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Generate stunning social media content in seconds. Schedule posts. Track performance. Scale your presence across all platforms.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-20">
          <button
            className="btn-primary group relative"
            style={{
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.4)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch Studio
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
          <button
            className="glass px-8 py-3 rounded-lg border border-purple-500/50 text-purple-300 font-semibold hover:border-purple-400 transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(181, 55, 242, 0.2)',
            }}
          >
            Watch Demo
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { stat: '50K+', label: 'Posts Created' },
            { stat: '5M+', label: 'Total Impressions' },
            { stat: '2K+', label: 'Active Creators' },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-deep glass p-6 rounded-xl group hover:scale-105 transition-transform duration-300"
              style={{
                borderColor: `rgba(${i === 0 ? '0,212,255' : i === 1 ? '181,55,242' : '255,0,110'}, 0.3)`,
              }}
            >
              <div className="text-3xl font-black text-cyan-400 mb-2 group-hover:neon-glow transition-all">
                {item.stat}
              </div>
              <div className="text-xs text-gray-400 font-semibold uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
