'use client'

import { useState } from 'react'

export function ImageGenerator() {
  const [caption, setCaption] = useState('')
  const [format, setFormat] = useState('tiktok')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  async function generateImage() {
    if (!caption.trim()) {
      setError('Please enter a caption')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, format, style: 'professional' })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setImage(data.imageUrl)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Input Section */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2">What do you want to create?</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: A motivational quote about mindset with neon aesthetic"
          className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 min-h-24"
        />
        <p className="text-xs text-gray-400 mt-1">Be specific for better results</p>
      </div>

      {/* Format Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2">Format</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { value: 'tiktok', label: 'TikTok (9:16)' },
            { value: 'instagram', label: 'Instagram (9:16)' },
            { value: 'youtube', label: 'YouTube (16:9)' },
            { value: 'square', label: 'Square (1:1)' }
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFormat(opt.value)}
              className={`p-3 rounded border text-sm font-medium transition ${
                format === opt.value
                  ? 'bg-cyan-600 border-cyan-600 text-white'
                  : 'bg-slate-900 border-slate-700 text-gray-400 hover:border-cyan-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="mb-8">
        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 text-white px-6 py-4 rounded font-semibold transition"
        >
          {loading ? '⏳ Generating... (10 seconds)' : '✨ Generate Image'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 bg-red-900/20 border border-red-700 rounded p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Image Display */}
      {image && (
        <div className="mb-8">
          <div className="mb-4 bg-slate-900 rounded overflow-hidden">
            <img src={image} alt="Generated" className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={image}
              download
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded font-semibold text-center transition"
            >
              ⬇️ Download
            </a>
            <button
              onClick={() => {
                setCaption('')
                setImage('')
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded font-semibold transition"
            >
              ➕ New Image
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!image && !loading && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-2xl mb-2">🎨</p>
          <p>Your image will appear here</p>
        </div>
      )}
    </div>
  )
}
