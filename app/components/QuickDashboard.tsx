'use client'

import { useState } from 'react'

export function QuickDashboard() {
  const [caption, setCaption] = useState('')
  const [format, setFormat] = useState('tiktok')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [generatedImage, setGeneratedImage] = useState('')

  async function generateContent() {
    if (!caption.trim()) {
      setError('Enter a caption')
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

      // Add post to list
      const newPost = {
        id: Date.now(),
        caption,
        format,
        imageUrl: data.imageUrl,
        createdAt: new Date().toLocaleString()
      }
      setPosts([newPost, ...posts])
      setGeneratedImage(data.imageUrl)
      setCaption('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px'
    }}>
      {/* Generator */}
      <div style={{
        background: 'rgba(168, 85, 247, 0.05)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
          Create Content
        </h2>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
              Caption or Description
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g., A sunset over the ocean with surfboards"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                background: 'rgba(168, 85, 247, 0.02)',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'system-ui',
                minHeight: '100px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
              Platform
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                background: 'rgba(168, 85, 247, 0.02)',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'system-ui'
              }}
            >
              <option value="tiktok">TikTok (9:16)</option>
              <option value="instagram">Instagram (1:1)</option>
              <option value="youtube">YouTube (16:9)</option>
              <option value="twitter">Twitter (4:3)</option>
            </select>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '8px',
            color: '#fca5a5',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        <button
          onClick={generateContent}
          disabled={loading || !caption.trim()}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            background: loading ? 'rgba(100, 100, 100, 0.3)' : 'linear-gradient(90deg, #9333ea, #ec4899)',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? '⏳ Generating...' : '✨ Generate Content'}
        </button>
      </div>

      {/* Generated Image Preview */}
      {generatedImage && (
        <div style={{
          background: 'rgba(168, 85, 247, 0.05)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Latest Generated Image</h3>
          <img
            src={generatedImage}
            alt="Generated content"
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '8px',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}
          />
        </div>
      )}

      {/* Posts Grid */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
          Created Posts ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            border: '2px dashed rgba(168, 85, 247, 0.2)'
          }}>
            <p style={{ fontSize: '16px' }}>No posts yet. Generate your first content above! →</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#a855f7'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '14px', margin: '0 0 8px 0', color: 'white' }}>
                    {post.caption.substring(0, 60)}...
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <span>📱 {post.format}</span>
                    <span>{post.createdAt}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '12px'
                  }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                        color: 'white',
                        border: 'none',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Schedule
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        background: 'transparent',
                        color: '#d8b4fe',
                        border: '1px solid rgba(168, 85, 247, 0.5)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
