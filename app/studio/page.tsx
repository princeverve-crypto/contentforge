import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition">
            ContentForge
          </a>
          <a
            href="/"
            className="px-6 py-2 text-gray-300 hover:text-blue-400 transition font-semibold"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative min-h-[calc(100vh-80px)] py-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title Section */}
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Create Beautiful Content
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Write what you want. AI creates it instantly. Download, share, or auto-post to TikTok, Instagram, and YouTube.
            </p>
          </div>

          {/* Generator Card */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition">
            <ImageGenerator />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Generate images in 10-20 seconds' },
              { icon: '🎨', title: 'Multiple Formats', desc: 'TikTok, Instagram, YouTube, Square' },
              { icon: '📤', title: 'Auto-Post', desc: 'Instantly share to all platforms' }
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-4 bg-slate-800/30 border-2 border-blue-500/20 rounded-lg hover:border-blue-500/50 hover:bg-slate-800/50 transition"
              >
                <p className="text-3xl mb-2">{feature.icon}</p>
                <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
