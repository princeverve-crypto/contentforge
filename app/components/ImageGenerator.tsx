'use client'

import { useState } from 'react'

export function ImageGenerator() {
  const [caption, setCaption] = useState('')
  const [format, setFormat] = useState('tiktok')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [autoPost, setAutoPost] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const [scheduledTime, setScheduledTime] = useState('')
  const [scheduling, setScheduling] = useState(false)

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
      setSuccess('✅ Image created! Ready to download or post.')
    } catch (err: any) {
      setError(err.message || 'Failed to generate image')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
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
        setError(data.error || 'Failed to post')
      }
    } catch (err: any) {
      setError('Failed to post to social media')
    }
  }

  async function schedulePost() {
    if (!image || !scheduledTime) {
      setError('Please select a date and time')
      return
    }

    setScheduling(true)
    setError('')

    try {
      const res = await fetch('/api/schedule-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user_demo',
          imageUrl: image,
          caption,
          platforms: ['tiktok', 'instagram', 'youtube'],
          format,
          scheduledAt: scheduledTime
        })
      })

      const data = await res.json()
      if (res.ok) {
        setSuccess(`✅ Post scheduled for ${new Date(scheduledTime).toLocaleString()}`)
        setShowScheduler(false)
        setScheduledTime('')
      } else {
        setError(data.error || 'Failed to schedule')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to schedule post')
    } finally {
      setScheduling(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Input */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px' }}>
          What do you want to create?
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Example: Motivational quote about achieving your dreams"
          style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', color: 'white', minHeight: '100px', fontFamily: 'inherit', resize: 'none' }}
        />
      </div>

      {/* Format */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px' }}>Format</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {['tiktok', 'instagram', 'youtube', 'square'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              style={format === fmt ? { background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' } : { background: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1', padding: '10px', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.2)', fontWeight: '600', cursor: 'pointer' }}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Post */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          id="autopost"
          checked={autoPost}
          onChange={(e) => setAutoPost(e.target.checked)}
          style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }}
        />
        <label htmlFor="autopost" style={{ fontSize: '14px', color: '#cbd5e1', cursor: 'pointer', fontWeight: '500' }}>
          📤 Auto-post after generating
        </label>
      </div>

      {/* Generate */}
      <button
        onClick={generateImage}
        disabled={loading}
        style={{ background: loading ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(120deg, #3b82f6, #8b5cf6)', color: 'white', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', opacity: loading ? 0.5 : 1 }}
      >
        {loading ? '⚙️ Generating... (10-20 seconds)' : '✨ Generate Image'}
      </button>

      {/* Messages */}
      {success && (
        <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)', borderRadius: '8px', color: '#86efac', fontSize: '14px', fontWeight: '600' }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '8px', color: '#fca5a5', fontSize: '14px', fontWeight: '600' }}>
          ❌ {error}
        </div>
      )}

      {/* Results */}
      {image && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
            <img src={image} alt="Generated" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <a
              href={image}
              download="content.png"
              style={{ background: 'linear-gradient(120deg, #22c55e, #10b981)', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}
            >
              ⬇️ Download
            </a>
            <button
              onClick={postToSocial}
              style={{ background: 'linear-gradient(120deg, #a855f7, #ec4899)', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              📤 Post Now
            </button>
            <button
              onClick={() => setShowScheduler(!showScheduler)}
              style={{ background: 'linear-gradient(120deg, #f59e0b, #d97706)', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              🕐 Schedule
            </button>
          </div>

          {showScheduler && (
            <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1' }}>
                Schedule for:
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                style={{ padding: '10px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: 'white', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={schedulePost}
                  disabled={scheduling}
                  style={{ background: scheduling ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(120deg, #3b82f6, #8b5cf6)', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: scheduling ? 'not-allowed' : 'pointer', fontSize: '14px', opacity: scheduling ? 0.5 : 1 }}
                >
                  {scheduling ? '⏳ Scheduling...' : '✓ Confirm'}
                </button>
                <button
                  onClick={() => { setShowScheduler(false); setScheduledTime('') }}
                  style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#cbd5e1', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => { setCaption(''); setImage(''); }}
            style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.2)', color: '#cbd5e1', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ➕ Create New
          </button>
        </div>
      )}

      {!image && (
        <div style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '40px', color: '#6b7280' }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎨</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#d1d5db' }}>Your image will appear here</p>
        </div>
      )}
    </div>
  )
}
