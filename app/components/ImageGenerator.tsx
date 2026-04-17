'use client'

import { useState } from 'react'

export function ImageGenerator() {
  const [caption, setCaption] = useState('')
  const [format, setFormat] = useState('tiktok')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function generateImage() {
    if (!caption.trim()) {
      setError('Please describe what you want to create')
      setTimeout(() => setError(''), 3000)
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, format, style: 'professional' })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setImage(data.imageUrl)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to generate image. Please try again.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const formatInfo = {
    tiktok: 'TikTok (9:16)',
    instagram: 'Instagram (9:16)',
    youtube: 'YouTube (16:9)',
    square: 'Square (1:1)'
  }

  return (
    <div>
      {/* Input Section */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-200 mb-3">
          What do you want to create?
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: A motivational quote about dreams with a beautiful starry night sky and neon accents"
          className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:shadow-lg focus:shadow-cyan-500/20 transition resize-none min-h-28"
        />
        <p className="text-xs text-gray-400 mt-2">Be specific for better results</p>
      </div>

      {/* Format Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-200 mb-3">
          Format
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['tiktok', 'instagram', 'youtube', 'square'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`py-3 px-4 rounded-lg font-semibold transition transform hover:scale-105 ${
                format === fmt
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800/50 border border-cyan-500/30 text-gray-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10'
              }`}
            >
              {formatInfo[fmt as keyof typeof formatInfo]}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateImage}
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-bold transition transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-cyan-500/30 mb-8"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚙️</span> Generating... (10 seconds)
          </span>
        ) : (
          '✨ Generate Image'
        )}
      </button>

      {/* Success Message */}
      {success && (
        <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm animate-fade-in">
          ✓ Image created successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm animate-fade-in">
          ✗ {error}
        </div>
      )}

      {/* Image Display */}
      {image && (
        <div className="mb-8 animate-fade-in">
          <div className="mb-4 rounded-lg overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition">
            <img
              src={image}
              alt="Generated"
              className="w-full h-auto hover:scale-105 transition duration-300"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={image}
              download
              className="py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-semibold text-center transition transform hover:scale-105 shadow-lg shadow-green-500/20"
            >
              ⬇️ Download
            </a>
            <button
              onClick={() => {
                setCaption('')
                setImage('')
              }}
              className="py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              ➕ New Image
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!image && !loading && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-5xl mb-4">🎨</p>
          <p className="text-lg">Your image will appear here</p>
          <p className="text-sm text-gray-600 mt-2">Get ready for something beautiful</p>
        </div>
      )}
    </div>
  )
}
