'use client'

import { useEffect, useState } from 'react'

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
    const interval = setInterval(loadAnalytics, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  async function loadAnalytics() {
    try {
      const res = await fetch('/api/analytics?userId=user_demo')
      const data = await res.json()
      if (res.ok) {
        setAnalytics(data)
      }
    } catch (err) {
      console.error('Failed to load analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
        <p>Loading analytics...</p>
      </div>
    )
  }

  if (!analytics || !analytics.posts || analytics.posts.length === 0) {
    return (
      <div style={{ padding: '32px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '16px', textAlign: 'center', color: '#6b7280' }}>
        <p>No analytics data yet. Create and schedule posts to see performance metrics.</p>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '48px', padding: '32px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>
        📊 Performance Analytics
      </h2>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
            {analytics.summary.totalPosts}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total Posts</div>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
            {analytics.summary.totalImpressions.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total Impressions</div>
        </div>

        <div style={{ padding: '16px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a855f7', marginBottom: '4px' }}>
            {analytics.summary.avgEngagement}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Avg Engagement</div>
        </div>
      </div>

      {/* Top Posts */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#e2e8f0' }}>
          Top Performing Posts
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {analytics.posts.slice(0, 5).map((post: any) => (
            <div
              key={post.postId}
              style={{
                padding: '16px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '12px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                  <span>👁️ {post.impressions.toLocaleString()} views</span>
                  <span>💬 {post.clicks} clicks</span>
                  <span>💾 {post.saves} saves</span>
                  <span>🔄 {post.shares} shares</span>
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                  Engagement: {((post.clicks + post.saves + post.shares) / Math.max(post.impressions, 1) * 100).toFixed(2)}%
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b' }}>
                {new Date(post.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
