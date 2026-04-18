'use client'

import { useState } from 'react'

export function VideoGenerator() {
  const [caption, setCaption] = useState('')
  const [duration, setDuration] = useState(4)
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('')

  async function generateVideo() {
    if (!caption.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, duration })
      })

      const data = await response.json()
      if (data.success) {
        setVideoUrl(data.videoUrl)
        setMethod(data.method)
      }
    } catch (error) {
      console.error('Video generation failed:', error)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>
        🎬 Video Generator
      </h2>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
          Video Description
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="e.g., Motivational workout clip with epic music"
          style={{
            width: '100%',
            height: '100px',
            padding: '12px',
            background: 'rgba(10, 14, 39, 0.6)',
            border: '1px solid rgba(26, 40, 80, 0.4)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'system-ui',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
          Duration: {duration} seconds
        </label>
        <input
          type="range"
          min="1"
          max="8"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
          1-8 seconds (optimal for social media)
        </p>
      </div>

      <button
        onClick={generateVideo}
        disabled={loading || !caption.trim()}
        style={{
          width: '100%',
          padding: '12px',
          background: loading ? 'rgba(255, 0, 110, 0.3)' : 'linear-gradient(120deg, #ff006e, #b537f2)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)',
          opacity: caption.trim() ? 1 : 0.5
        }}
      >
        {loading ? '⏳ Generating Video...' : '🎬 Generate Video'}
      </button>

      {method && (
        <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '12px', textAlign: 'center' }}>
          Generated with <strong>{method}</strong>
        </p>
      )}

      {videoUrl && (
        <div style={{ marginTop: '24px' }}>
          <video
            src={videoUrl.startsWith('data:') ? videoUrl : videoUrl}
            controls
            style={{
              width: '100%',
              borderRadius: '8px',
              border: '1px solid rgba(255, 0, 110, 0.3)',
              background: '#0a0e27'
            }}
          />
        </div>
      )}
    </div>
  )
}
