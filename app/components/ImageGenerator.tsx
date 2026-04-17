'use client'

import { useState } from 'react'

export function ImageGenerator() {
  const [caption, setCaption] = useState('')
  const [style, setStyle] = useState('neon')
  const [format, setFormat] = useState('tiktok')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  async function generateImage() {
    if (!caption.trim()) {
      setError('Caption is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, style, format })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Generation failed')

      setImage(data.imageUrl)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
      {/* Input Panel */}
      <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Generate Image</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Your caption or prompt here..."
              className="w-full h-32 bg-slate-800/50 border border-purple-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="neon">🔮 Neon</option>
                <option value="modern">🎨 Modern</option>
                <option value="artistic">🖼️ Artistic</option>
                <option value="professional">💼 Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="tiktok">TikTok (9:16)</option>
                <option value="instagram">Instagram (9:16)</option>
                <option value="youtube">YouTube (16:9)</option>
                <option value="square">Square (1:1)</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={generateImage}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Generating...
              </span>
            ) : (
              '✨ Generate Image'
            )}
          </button>
        </div>
      </div>

      {/* Output Panel */}
      <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-8 shadow-xl flex flex-col">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Preview</h2>

        {image ? (
          <div className="flex-1 flex flex-col gap-4">
            <img
              src={image}
              alt="Generated"
              className="w-full h-auto rounded-lg border-2 border-cyan-500/50 object-cover"
            />
            <a
              href={image}
              download
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-center transition"
            >
              ⬇️ Download
            </a>
          </div>
        ) : (
          <div className="flex-1 bg-slate-800/30 border-2 border-dashed border-purple-500/30 rounded-lg flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-4xl mb-2">🎨</p>
              <p>Your image will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
