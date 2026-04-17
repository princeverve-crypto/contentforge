import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-cyan-500/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition">
            ContentForge
          </a>
          <a
            href="/"
            className="text-gray-300 hover:text-cyan-400 transition text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Create Content
            </h1>
            <p className="text-lg text-gray-300">
              Describe what you want. AI creates it. Download and share instantly.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-lg p-8 shadow-xl shadow-cyan-500/5">
            <ImageGenerator />
          </div>

          {/* Tips */}
          <div className="mt-12 p-6 bg-slate-800/30 border border-purple-500/20 rounded-lg">
            <p className="text-gray-300 text-sm">
              <span className="text-purple-400 font-semibold">💡 Pro tip:</span> Be specific in your description for best results.
              Example: "A motivational quote about success with a beautiful sunset background and neon lights"
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
