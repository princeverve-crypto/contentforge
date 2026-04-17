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
      setError('Please enter a description')
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
      setError(err.message || 'Failed to generate image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Input */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          What do you want to create?
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: A motivational quote about success with a beautiful background"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Format */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Format
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'tiktok', label: 'TikTok' },
            { value: 'instagram', label: 'Instagram' },
            { value: 'youtube', label: 'YouTube' },
            { value: 'square', label: 'Square' }
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFormat(opt.value)}
              className={`py-2 px-3 rounded border font-medium transition ${
                format === opt.value
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      <button
        onClick={generateImage}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 disabled:bg-gray-400 transition mb-8"
      >
        {loading ? 'Generating... (10 seconds)' : 'Generate image'}
      </button>

      {/* Error */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Image Result */}
      {image && (
        <div className="mb-8">
          <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <img src={image} alt="Generated" className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={image}
              download
              className="py-3 px-4 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition text-center"
            >
              Download
            </a>
            <button
              onClick={() => {
                setCaption('')
                setImage('')
              }}
              className="py-3 px-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Create new
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!image && !loading && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-2">✨</p>
          <p>Your image will appear here</p>
        </div>
      )}
    </div>
  )
}
