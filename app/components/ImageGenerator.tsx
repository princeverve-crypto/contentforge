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
      setError('Please describe what you want')
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
        body: JSON.stringify({ caption, format, style: 'professional', autoPost })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setImage(data.imageUrl)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err: any) {
      setError(err.message)
      setTimeout(() => setError(''), 4000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Input */}
      <div>
        <label className="block text-sm font-bold text-gray-300 mb-3">
          What do you want to create?
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: Motivational quote about success with gradient background"
          style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px', color: 'white', minHeight: '112px', fontFamily: 'inherit', resize: 'none', transition: 'all 0.3s ease' }}
          className="w-full placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10"
        />
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-bold text-gray-300 mb-3">Format</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
          {[
            { id: 'tiktok', label: 'TikTok' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'youtube', label: 'YouTube' },
            { id: 'square', label: 'Square' }
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setFormat(fmt.id)}
              style={format === fmt.id ? { background: 'linear-gradient(to right, #0ea5e9, #3b82f6)' } : { background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              className="py-3 px-4 rounded-lg font-semibold transition"
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Post */}
      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          type="checkbox"
          id="autopost"
          checked={autoPost}
          onChange={(e) => setAutoPost(e.target.checked)}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor="autopost" className="text-sm font-semibold text-gray-300 cursor-pointer">
          📤 Auto-post to TikTok, Instagram & YouTube
        </label>
      </div>

      {/* Generate */}
      <button
        onClick={generateImage}
        disabled={loading}
        style={{ background: loading || !caption.trim() ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(to right, #0ea5e9, #3b82f6)', borderRadius: '12px', padding: '16px', fontWeight: 'bold', fontSize: '18px', transition: 'all 0.3s ease' }}
        className="w-full text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? '⚙️ Generating...' : '✨ Generate Image'}
      </button>

      {/* Success */}
      {success && (
        <div style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)', borderRadius: '8px', padding: '16px', color: '#86efac', fontSize: '14px', fontWeight: '600' }}>
          ✅ Image created successfully!
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '8px', padding: '16px', color: '#fca5a5', fontSize: '14px', fontWeight: '600' }}>
          ❌ {error}
        </div>
      )}

      {/* Image */}
      {image && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <img src={image} alt="Generated" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <a
              href={image}
              download
              style={{ background: 'linear-gradient(to right, #22c55e, #10b981)', borderRadius: '8px', padding: '12px', fontWeight: 'bold', textAlign: 'center', transition: 'opacity 0.3s' }}
              className="hover:opacity-90"
            >
              ⬇️ Download
            </a>
            <a
              href="https://app.postiz.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)', borderRadius: '8px', padding: '12px', fontWeight: 'bold', textAlign: 'center', transition: 'opacity 0.3s' }}
              className="hover:opacity-90"
            >
              📤 Post
            </a>
          </div>

          <button
            onClick={() => { setCaption(''); setImage(''); }}
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '12px', fontWeight: 'bold', transition: 'all 0.3s' }}
            className="w-full text-white hover:bg-white/10"
          >
            ➕ New Image
          </button>
        </div>
      )}

      {/* Empty */}
      {!image && !loading && (
        <div style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '80px', color: '#6b7280' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</p>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#d1d5db' }}>Your image will appear here</p>
          <p style={{ marginTop: '8px', fontSize: '14px' }}>Describe what you want, and AI will create it</p>
        </div>
      )}
    </div>
  )
}
