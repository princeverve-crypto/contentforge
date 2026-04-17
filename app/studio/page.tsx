import { ImageGenerator } from '@/app/components/ImageGenerator'

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold hover:text-gray-700">
            ContentForge
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-900">
            ← Back
          </a>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">Create content</h1>
          <p className="text-gray-600 mb-8">
            Write what you want. AI creates it. Simple as that.
          </p>
          <ImageGenerator />
        </div>
      </div>
    </main>
  )
}
