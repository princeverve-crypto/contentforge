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
      {/* Input */}
      <div>
        <label className="block text-sm font-bold text-gray-300 mb-3">
          What do you want to create?
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: A motivational quote about success with a beautiful gradient background"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition backdrop-blur min-h-28"
        />
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-bold text-gray-300 mb-3">Format</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'tiktok', label: 'TikTok' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'youtube', label: 'YouTube' },
            { id: 'square', label: 'Square' }
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setFormat(fmt.id)}
              className={`py-3 px-4 rounded-lg font-semibold transition ${
                format === fmt.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Post */}
      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
        <input
          type="checkbox"
          id="autopost"
          checked={autoPost}
          onChange={(e) => setAutoPost(e.target.checked)}
          className="w-4 h-4 accent-cyan-500 cursor-pointer"
        />
        <label htmlFor="autopost" className="text-sm font-semibold text-gray-300 cursor-pointer">
          📤 Auto-post to TikTok, Instagram & YouTube
        </label>
      </div>

      {/* Generate */}
      <button
        onClick={generateImage}
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-blue-500/30"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚙️</span> Generating...
          </span>
        ) : (
          '✨ Generate Image'
        )}
      </button>

      {/* Success */}
      {success && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm font-semibold animate-fade-in">
          ✅ Image created successfully!
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm font-semibold animate-fade-in">
          ❌ {error}
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
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
              className="py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-bold text-center transition"
            >
              ⬇️ Download
            </a>
            <a
              href="https://app.postiz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-bold text-center transition"
            >
              📤 Post
            </a>
          </div>

          <button
            onClick={() => {
              setCaption('')
              setImage('')
            }}
            className="w-full py-3 px-4 bg-white/5 border border-white/10 hover:bg-white/8 text-white rounded-lg font-bold transition"
          >
            ➕ New Image
          </button>
        </div>
      )}

      {/* Empty */}
      {!image && !loading && (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🎨</p>
          <p className="text-xl font-semibold text-gray-300">Your image will appear here</p>
          <p className="text-gray-500 mt-2">Describe what you want, and AI will create it</p>
        </div>
      )}
    </div>
  )
}
