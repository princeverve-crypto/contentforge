'use client'

import { useState } from 'react'

export function ImageGenerator() {
  const [caption, setCaption] = useState('')
  const [format, setFormat] = useState('tiktok')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [autoPost, setAutoPost] = useState(false)

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
        body: JSON.stringify({
          caption,
          format,
          style: 'professional',
          autoPost
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate')
      }

      setImage(data.imageUrl)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err: any) {
      setError(err.message || 'Failed to generate image')
      setTimeout(() => setError(''), 4000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Description Input */}
      <div>
        <label className="block text-sm font-bold text-gray-200 mb-3">
          What do you want to create?
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: A motivational quote about success with a beautiful sunset and neon accents"
          className="w-full bg-slate-700/50 border-2 border-blue-500/30 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition min-h-28"
        />
        <p className="text-xs text-gray-400 mt-2">✨ Be specific for best results</p>
      </div>

      {/* Format Selection */}
      <div>
        <label className="block text-sm font-bold text-gray-200 mb-3">Format</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'tiktok', label: 'TikTok (9:16)' },
            { id: 'instagram', label: 'Instagram (9:16)' },
            { id: 'youtube', label: 'YouTube (16:9)' },
            { id: 'square', label: 'Square (1:1)' }
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setFormat(fmt.id)}
              className={`py-3 px-4 rounded-lg font-semibold transition transform hover:scale-105 ${
                format === fmt.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700/50 border-2 border-blue-500/20 text-gray-300 hover:border-blue-500/50'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Post Toggle */}
      <div className="flex items-center gap-3 p-4 bg-purple-500/10 border-2 border-purple-500/30 rounded-lg">
        <input
          type="checkbox"
          id="autopost"
          checked={autoPost}
          onChange={(e) => setAutoPost(e.target.checked)}
          className="w-4 h-4 accent-blue-500 cursor-pointer"
        />
        <label htmlFor="autopost" className="text-sm font-semibold text-gray-200 cursor-pointer">
          📤 Auto-post to TikTok, Instagram & YouTube via Postiz
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateImage}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-blue-500/30"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚙️</span> Generating... (10-20 seconds)
          </span>
        ) : (
          '✨ Generate Image'
        )}
      </button>

      {/* Messages */}
      {success && (
        <div className="p-4 bg-green-500/20 border-2 border-green-500/50 rounded-lg text-green-300 text-sm font-semibold animate-fade-in">
          ✅ Image created successfully! {autoPost && '📤 Posting to social media...'}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/20 border-2 border-red-500/50 rounded-lg text-red-300 text-sm font-semibold animate-fade-in">
          ❌ {error}
        </div>
      )}

      {/* Image Display */}
      {image && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-lg overflow-hidden border-2 border-blue-500/50 shadow-xl shadow-blue-500/20">
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
              className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-center transition transform hover:scale-105 shadow-lg"
            >
              ⬇️ Download
            </a>
            <a
              href={`https://app.postiz.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-center transition transform hover:scale-105 shadow-lg"
            >
              📤 Post to Postiz
            </a>
          </div>

          <button
            onClick={() => {
              setCaption('')
              setImage('')
            }}
            className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition"
          >
            ➕ Create New Image
          </button>
        </div>
      )}

      {/* Empty State */}
      {!image && !loading && (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">🎨</p>
          <p className="text-xl text-gray-300 font-semibold">Your beautiful image will appear here</p>
          <p className="text-gray-400 mt-2">Describe what you want, and AI will create it in seconds</p>
        </div>
      )}
    </div>
  )
}
