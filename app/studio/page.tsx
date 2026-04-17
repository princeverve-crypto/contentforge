import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            ContentForge Studio
          </h1>
          <p className="text-gray-400">Create beautiful AI images in seconds</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8">
        <ImageGenerator />
      </div>
    </main>
  )
}
