'use client'

import { useEffect, useRef, useState } from 'react'

export default function PremiumHomepage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
    <>
      {/* Canvas Background Animation */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <main className="relative z-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 min-h-screen text-white overflow-hidden">
        {/* Navigation */}
        <nav className="relative z-50 sticky top-0 border-b border-purple-500/10 backdrop-blur-md bg-slate-950/30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
              <span className="text-xl font-bold">ContentForge</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Features</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Pricing</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Testimonials</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">FAQ</a>
              <button className="text-sm px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-300 transition">Login</button>
              <button className="text-sm px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">Sign Up</button>
            </div>
          </div>
        </nav>

        {/* Hero Section - Two Column */}
        <section className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-semibold text-purple-300">AI-Powered Content Creation</span>
            </div>

            {/* Headline - Premium Gradient */}
            <h1 className="text-6xl font-black leading-tight">
              <span className="block">Transform Your</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Ideas Into Engaging</span>
              <span className="block">Content</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
              Create high-quality, SEO-optimized content in seconds, not hours. Unlock your content potential today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:-translate-y-0.5 flex items-center gap-2">
                Get Started Free
                <span>→</span>
              </button>
              <button className="px-8 py-3 rounded-lg border border-purple-500/50 text-purple-300 font-semibold hover:bg-purple-500/10 transition">
                See It In Action
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-slate-950" />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold">1,000+ content creators trust us</p>
                <p className="text-xs text-gray-400">⭐⭐⭐⭐⭐ 4.9/5 rating</p>
              </div>
            </div>
          </div>

          {/* Right - Premium Dashboard Preview */}
          <div className="relative h-96 lg:h-full min-h-96">
            {/* Glowing Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-0.5 opacity-40 blur-xl" />

            {/* Dashboard Card */}
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-purple-900/30 to-slate-900/30 border border-purple-500/20 backdrop-blur-xl p-6 overflow-hidden">
              {/* Neon Corner Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500 rounded-full blur-3xl opacity-20" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-purple-200">Dashboard</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500/50" />
                    <div className="w-3 h-3 rounded-full bg-pink-500/50" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <p className="text-xs text-gray-400 mb-1">Posts Created</p>
                    <p className="text-2xl font-bold text-purple-300">1,247</p>
                  </div>
                  <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                    <p className="text-xs text-gray-400 mb-1">Engagement</p>
                    <p className="text-2xl font-bold text-pink-300">+142%</p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="flex-1 rounded-lg bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10 flex items-end justify-around px-4 py-4 gap-1">
                  {[40, 60, 45, 75, 55, 80, 70].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t opacity-60 hover:opacity-100 transition"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative max-w-7xl mx-auto px-6 py-20 border-t border-purple-500/10">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'AI Image Gen', desc: 'Generate stunning visuals instantly' },
              { icon: '📅', title: 'Smart Schedule', desc: 'Post at peak engagement times' },
              { icon: '📊', title: 'Real Analytics', desc: 'Track impressions & engagement' },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/50 transition group cursor-pointer"
              >
                <p className="text-4xl mb-4 group-hover:scale-110 transition">{feature.icon}</p>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative max-w-7xl mx-auto px-6 py-20 text-center border-t border-purple-500/10">
          <h2 className="text-3xl font-bold mb-6">Ready to create amazing content?</h2>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition">
            Start Creating Today
          </button>
        </section>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
