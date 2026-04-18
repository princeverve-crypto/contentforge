'use client'

import { useEffect, useState } from 'react'

export function ScheduledPostsList() {
  const [pending, setPending] = useState<any[]>([])
  const [posted, setPosted] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'posted'>('pending')

  useEffect(() => {
    loadScheduledPosts()
  }, [])

  async function loadScheduledPosts() {
    try {
      const res = await fetch('/api/schedule-post?userId=user_demo')
      const data = await res.json()
      if (res.ok) {
        setPending(data.pending || [])
        setPosted(data.posted || [])
      }
    } catch (err) {
      console.error('Failed to load scheduled posts:', err)
    } finally {
      setLoading(false)
    }
  }

  async function deletePost(postId: string) {
    try {
      const res = await fetch('/api/schedule-post', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_demo', postId })
      })
      if (res.ok) {
        setPending(pending.filter(p => p.id !== postId))
      }
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }

  const posts = activeTab === 'pending' ? pending : posted

  return (
    <div style={{ marginTop: '48px', padding: '32px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>
        📅 Your Schedule
      </h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('pending')}
          style={{
            padding: '8px 16px',
            background: activeTab === 'pending' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'pending' ? '2px solid #3b82f6' : 'transparent',
            color: activeTab === 'pending' ? '#3b82f6' : '#94a3b8',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ⏳ Pending ({pending.length})
        </button>
        <button
          onClick={() => setActiveTab('posted')}
          style={{
            padding: '8px 16px',
            background: activeTab === 'posted' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'posted' ? '2px solid #3b82f6' : 'transparent',
            color: activeTab === 'posted' ? '#3b82f6' : '#94a3b8',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ✅ Posted ({posted.length})
        </button>
      </div>

      {/* Posts List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <p>Loading...</p>
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <p style={{ fontSize: '16px' }}>
            {activeTab === 'pending' ? 'No pending posts. Schedule your first one!' : 'No posted content yet.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: '16px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '12px',
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '16px',
                alignItems: 'start'
              }}
            >
              {/* Thumbnail */}
              <img
                src={post.imageUrl}
                alt="Post"
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.4' }}>
                  {post.caption.substring(0, 80)}
                  {post.caption.length > 80 ? '...' : ''}
                </p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#94a3b8' }}>
                  <span>📱 {post.platforms?.join(', ') || 'Unknown'}</span>
                  <span>
                    {activeTab === 'pending'
                      ? `⏰ ${new Date(post.scheduledAt).toLocaleString()}`
                      : `✓ Posted ${new Date(post.postedAt).toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {activeTab === 'pending' && (
                <button
                  onClick={() => deletePost(post.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#fca5a5',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
