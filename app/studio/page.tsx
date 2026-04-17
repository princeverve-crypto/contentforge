import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 mb-8">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <a href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </a>
          <h1 className="text-3xl font-bold">ContentForge Studio</h1>
          <p className="text-gray-400 text-sm mt-1">Create beautiful images with AI</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 pb-12">
        <ImageGenerator />
      </div>

      {/* Footer Tips */}
      <footer className="max-w-4xl mx-auto px-8 py-8 text-xs text-gray-500 border-t border-slate-700">
        <p>💡 Tip: Be specific in your description for better results. Example: "A motivational quote about success with neon lights in the background"</p>
      </footer>
    </main>
  )
}
