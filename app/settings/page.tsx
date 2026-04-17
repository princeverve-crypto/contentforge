'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [postizKey, setPostizKey] = useState('')
  const [tiktokHandle, setTiktokHandle] = useState('')
  const [instagramHandle, setInstagramHandle] = useState('')
  const [youtubeChannel, setYoutubeChannel] = useState('')
  const [schedule, setSchedule] = useState('09:00')
  const [saved, setSaved] = useState(false)

  function saveSettings() {
    const settings = {
      postizKey,
      platforms: {
        tiktok: { enabled: !!tiktokHandle, handle: tiktokHandle },
        instagram: { enabled: !!instagramHandle, handle: instagramHandle },
        youtube: { enabled: !!youtubeChannel, channel: youtubeChannel }
      },
      schedule
    }
    localStorage.setItem('contentforge-settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
      </div>

      <header style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)', backdropFilter: 'blur(10px)', background: 'rgba(15, 23, 42, 0.4)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '28px', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </a>
          <a href="/" style={{ fontSize: '15px', color: '#94a3b8', textDecoration: 'none' }}>
            ← Back to Home
          </a>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '8px' }}>Settings</h1>
        <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '40px' }}>Configure your automation platform</p>

        <div style={{ padding: '40px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '16px' }}>
          {/* Postiz API Key */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px' }}>
              Postiz API Key (Required for auto-posting)
            </label>
            <input
              type="password"
              value={postizKey}
              onChange={(e) => setPostizKey(e.target.value)}
              placeholder="c2fee90d4c77c82978620c7e6e7cf610ba3ed7c40bc46a3380a8eb36a99d75dc"
              style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', color: 'white', fontSize: '14px', fontFamily: 'monospace', marginBottom: '8px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              Get from <a href="https://platform.postiz.com/settings" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>platform.postiz.com/settings</a>
            </p>
          </div>

          <div style={{ height: '1px', background: 'rgba(148, 163, 184, 0.1)', marginBottom: '32px' }}></div>

          {/* Platform Accounts */}
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Connected Accounts</h2>

          {/* TikTok */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px' }}>
              🎬 TikTok Handle
            </label>
            <input
              type="text"
              value={tiktokHandle}
              onChange={(e) => setTiktokHandle(e.target.value)}
              placeholder="@yourhandle"
              style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Leave empty to disable</p>
          </div>

          {/* Instagram */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px' }}>
              📷 Instagram Handle
            </label>
            <input
              type="text"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              placeholder="@yourhandle"
              style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Leave empty to disable</p>
          </div>

          {/* YouTube */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px' }}>
              ▶️ YouTube Channel URL
            </label>
            <input
              type="text"
              value={youtubeChannel}
              onChange={(e) => setYoutubeChannel(e.target.value)}
              placeholder="https://youtube.com/@yourchannel"
              style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Leave empty to disable</p>
          </div>

          <div style={{ height: '1px', background: 'rgba(148, 163, 184, 0.1)', marginBottom: '32px' }}></div>

          {/* Schedule */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px' }}>
              ⏰ Daily Auto-Post Time
            </label>
            <input
              type="time"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Content will auto-post daily at this time (GMT+1)</p>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            {saved ? '✅ Settings Saved!' : '💾 Save Settings'}
          </button>

          {/* Info Box */}
          <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>
              <strong>📌 How it works:</strong>
              <br />1. Add your Postiz API key above
              <br />2. Enter your social media handles
              <br />3. Go to /studio and generate content
              <br />4. Images auto-post to your accounts
              <br />5. Check your social media accounts!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
