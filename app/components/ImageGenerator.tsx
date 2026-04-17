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
      setError('Please describe what you want')
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
      setError(err.message || 'Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Caption Input */}
      <div className="mb-8">
        <label className="block font-semibold mb-2">What do you want to create?</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: A motivational quote about success"
          className="w-full bg-slate-700 border border-slate-600 rounded p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 min-h-24"
        />
      </div>

      {/* Format */}
      <div className="mb-8">
        <label className="block font-semibold mb-3">Format</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['tiktok', 'instagram', 'youtube', 'square'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`py-2 px-3 rounded font-semibold transition ${
                format === fmt
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {fmt === 'tiktok' ? 'TikTok' : fmt === 'instagram' ? 'Instagram' : fmt === 'youtube' ? 'YouTube' : 'Square'}
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      <button
        onClick={generateImage}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded font-bold mb-8"
      >
        {loading ? 'Generating... (10 seconds)' : 'Generate Image'}
      </button>

      {/* Error */}
      {error && <div className="mb-8 p-3 bg-red-500/20 border border-red-500 rounded text-red-300">{error}</div>}

      {/* Image */}
      {image && (
        <div className="mb-8">
          <img src={image} alt="Generated" className="w-full rounded mb-4 bg-slate-700" />
          <div className="grid grid-cols-2 gap-3">
            <a href={image} download className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded font-bold text-center">
              Download
            </a>
            <button onClick={() => { setCaption(''); setImage(''); }} className="py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded font-bold">
              New Image
            </button>
          </div>
        </div>
      )}

      {/* Empty */}
      {!image && !loading && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-2">🎨</p>
          <p>Your image will appear here</p>
        </div>
      )}
    </div>
  )
}
