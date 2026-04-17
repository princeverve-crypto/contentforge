import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition">
              ContentForge
            </span>
          </a>
          <a
            href="/"
            className="text-gray-400 hover:text-gray-200 transition text-sm font-semibold"
          >
            ← Back
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative min-h-[calc(100vh-80px)] py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Create Content
              </span>
            </h1>
            <p className="text-lg text-gray-400">
              Describe. Generate. Share instantly.
            </p>
          </div>

          {/* Generator Card */}
          <div className="relative p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur hover:border-white/20 hover:bg-white/8 transition shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-3xl opacity-0 hover:opacity-100 transition"></div>
            <div className="relative">
              <ImageGenerator />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
