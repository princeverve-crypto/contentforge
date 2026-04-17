import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main style={{ background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #000000)' }} className="min-h-screen text-white">
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '0%', left: '25%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: '400px', height: '400px', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
      </div>

      {/* Nav */}
      <nav style={{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold tracking-tight">
            <span style={{ backgroundImage: 'linear-gradient(to right, #06b6d4, #3b82f6, #a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              ContentForge
            </span>
          </a>
          <a href="/" className="text-gray-400 hover:text-gray-200 transition text-sm font-semibold">
            ← Back
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative min-h-[calc(100vh-80px)] py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-7xl font-bold mb-6 tracking-tight">
              <span style={{ backgroundImage: 'linear-gradient(to right, #06b6d4, #3b82f6)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Create
              </span>
            </h1>
            <p className="text-lg text-gray-400">
              Describe. Generate. Share instantly.
            </p>
          </div>

          {/* Card */}
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }} className="hover:bg-white/8 hover:border-white/20">
            <ImageGenerator />
          </div>
        </div>
      </div>
    </main>
  )
}
