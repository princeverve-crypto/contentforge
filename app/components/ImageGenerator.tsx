'use client'

import { useState } from 'react'

export function ImageGenerator() {
  const [caption, setCaption] = useState('')
  const [format, setFormat] = useState('tiktok')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [autoPost, setAutoPost] = useState(false)
  const [credits, setCredits] = useState(0)
  const [userId] = useState('user_' + Date.now())

  async function getCredits() {
    const res = await fetch('/api/purchase-credits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get', userId })
    })
    const data = await res.json()
    setCredits(data.credits)
  }

  async function generateImage() {
    if (!caption.trim()) {
      setError('Please describe what you want')
      setTimeout(() => setError(''), 3000)
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Use 1 credit
      const creditRes = await fetch('/api/purchase-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'use', userId, amount: 1 })
      })

      if (!creditRes.ok) {
        const data = await creditRes.json()
        throw new Error(data.error)
      }

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
      if (!res.ok) throw new Error(data.error)

      setImage(data.imageUrl)
      setSuccess('✅ Image created! Generate video or post to socials.')
      getCredits()

      // Auto-generate video
      if (data.imageUrl) {
        setTimeout(() => generateVideo(data.imageUrl), 1000)
      }
    } catch (err: any) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  async function generateVideo(imgUrl: string) {
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: imgUrl,
          caption,
          format,
          musicStyle: 'upbeat'
        })
      })

      const data = await res.json()
      if (res.ok) {
        setVideo(data.videoUrl)
        setSuccess('✅ Video generated! Ready to post.')
      }
    } catch (err) {
      console.log('Video generation skipped')
    }
  }

  async function postToSocial() {
    if (!image) return

    try {
      const res = await fetch('/api/post-to-social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: image,
          caption,
          platforms: ['tiktok', 'instagram', 'youtube'],
          schedule: false
        })
      })

      const data = await res.json()
      if (res.ok) {
        setSuccess('✅ Posted to TikTok, Instagram, YouTube!')
      } else {
        setError(data.error)
      }
    } catch (err: any) {
      setError('Failed to post')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Credits */}
      <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: '600' }}>
          💳 Credits: <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{credits}</span> remaining
        </div>
        <button
          onClick={getCredits}
          style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#3b82f6', transition: 'all 0.3s' }}
          className="hover:bg-blue-500/30"
        >
          Refresh
        </button>
      </div>

      {/* Input */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#d1d5db', marginBottom: '8px' }}>
          Describe what you want to create
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: Motivational quote about success"
          style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '12px', color: 'white', minHeight: '100px', fontFamily: 'inherit', resize: 'none', width: '100%', transition: 'all 0.3s' }}
          className="focus:outline-none focus:border-blue-500 focus:bg-white/10"
        />
      </div>

      {/* Format */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#d1d5db', marginBottom: '8px' }}>Format</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {['tiktok', 'instagram', 'youtube', 'square'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              style={format === fmt ? { background: 'linear-gradient(to right, #0ea5e9, #3b82f6)', color: 'white' } : { background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#d1d5db' }}
              className="py-2 px-3 rounded text-sm font-semibold transition"
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={autoPost}
            onChange={(e) => setAutoPost(e.target.checked)}
            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
          />
          📤 Auto-post after generation
        </label>
      </div>

      {/* Generate */}
      <button
        onClick={generateImage}
        disabled={loading || credits < 1}
        style={{ background: loading || credits < 1 ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(to right, #0ea5e9, #3b82f6)', color: 'white', borderRadius: '8px', padding: '12px', fontWeight: 'bold', fontSize: '16px', transition: 'all 0.3s', cursor: loading || credits < 1 ? 'not-allowed' : 'pointer', opacity: loading || credits < 1 ? 0.5 : 1 }}
      >
        {loading ? '⚙️ Generating...' : `✨ Generate Image (1 credit)`}
      </button>

      {/* Messages */}
      {success && (
        <div style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)', borderRadius: '8px', padding: '12px', color: '#86efac', fontSize: '14px', fontWeight: '600' }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '8px', padding: '12px', color: '#fca5a5', fontSize: '14px', fontWeight: '600' }}>
          ❌ {error}
        </div>
      )}

      {/* Results */}
      {(image || video) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {image && (
            <div>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Generated Image:</p>
              <img src={image} alt="Generated" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {image && (
              <>
                <a
                  href={image}
                  download
                  style={{ background: 'linear-gradient(to right, #22c55e, #10b981)', color: 'white', borderRadius: '8px', padding: '10px', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', transition: 'opacity 0.3s', cursor: 'pointer' }}
                  className="hover:opacity-90"
                >
                  ⬇️ Download Image
                </a>
                <button
                  onClick={postToSocial}
                  style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)', color: 'white', borderRadius: '8px', padding: '10px', fontWeight: 'bold', transition: 'opacity 0.3s', cursor: 'pointer' }}
                  className="hover:opacity-90"
                >
                  📤 Post to Socials Now
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => {
              setCaption('')
              setImage('')
              setVideo('')
            }}
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '8px', padding: '10px', fontWeight: 'bold', transition: 'all 0.3s', width: '100%', cursor: 'pointer' }}
            className="hover:bg-white/10"
          >
            ➕ Create New
          </button>
        </div>
      )}

      {!image && (
        <div style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '40px', color: '#6b7280' }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎨</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#d1d5db' }}>Your image will appear here</p>
          <p style={{ marginTop: '8px', fontSize: '13px' }}>Describe + Generate + Post in minutes</p>
        </div>
      )}
    </div>
  )
}
