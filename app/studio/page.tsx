import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <nav className="border-b border-slate-700 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold hover:text-blue-400">
            ContentForge
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            ← Back
          </a>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">Create Content</h1>
        <p className="text-gray-300 mb-8">Write what you want. AI creates it. Download and share.</p>
        
        <div className="bg-slate-800 p-8 rounded-lg">
          <ImageGenerator />
        </div>
      </div>
    </main>
  )
}
