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
    <main style={{ background: '#0a0e27', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', position: 'relative' }}>
      {/* Grid Background */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', opacity: '0.05', zIndex: -1, backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }}></div>

      {/* Animated Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
      </div>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(26, 40, 80, 0.4)', backdropFilter: 'blur(10px)', background: 'rgba(10, 14, 39, 0.6)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '28px', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #00d4ff, #b537f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </a>
          <a href="/" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>
            ← Home
          </a>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '8px' }}>Settings</h1>
        <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '40px' }}>Configure your automation platform</p>

        <div style={{ padding: '40px', background: 'rgba(15, 24, 64, 0.4)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          {/* Postiz API Key */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
              Postiz API Key (Required for auto-posting)
            </label>
            <input
              type="password"
              value={postizKey}
              onChange={(e) => setPostizKey(e.target.value)}
              placeholder="Paste your API key here"
              style={{ width: '100%', padding: '12px', background: 'rgba(10, 14, 39, 0.6)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '8px', color: 'white', fontSize: '14px', marginBottom: '8px', fontFamily: 'monospace' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              Get from <a href="https://platform.postiz.com/settings" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff', textDecoration: 'underline' }}>platform.postiz.com/settings</a>
            </p>
          </div>

          <div style={{ height: '1px', background: 'rgba(26, 40, 80, 0.3)', marginBottom: '32px' }}></div>

          {/* Platform Accounts */}
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Connected Accounts</h2>

          {/* TikTok */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
              🎬 TikTok Handle
            </label>
            <input
              type="text"
              value={tiktokHandle}
              onChange={(e) => setTiktokHandle(e.target.value)}
              placeholder="@yourhandle"
              style={{ width: '100%', padding: '12px', background: 'rgba(10, 14, 39, 0.6)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Leave empty to disable</p>
          </div>

          {/* Instagram */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
              📷 Instagram Handle
            </label>
            <input
              type="text"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              placeholder="@yourhandle"
              style={{ width: '100%', padding: '12px', background: 'rgba(10, 14, 39, 0.6)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Leave empty to disable</p>
          </div>

          {/* YouTube */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
              ▶️ YouTube Channel URL
            </label>
            <input
              type="text"
              value={youtubeChannel}
              onChange={(e) => setYoutubeChannel(e.target.value)}
              placeholder="https://youtube.com/@yourchannel"
              style={{ width: '100%', padding: '12px', background: 'rgba(10, 14, 39, 0.6)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Leave empty to disable</p>
          </div>

          <div style={{ height: '1px', background: 'rgba(26, 40, 80, 0.3)', marginBottom: '32px' }}></div>

          {/* Schedule */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px' }}>
              ⏰ Daily Auto-Post Time
            </label>
            <input
              type="time"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              style={{ padding: '12px', background: 'rgba(10, 14, 39, 0.6)', border: '1px solid rgba(26, 40, 80, 0.4)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Content will auto-post daily at this time (GMT+1)</p>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(120deg, #00d4ff, #b537f2)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)'; }}
          >
            {saved ? '✅ Settings Saved!' : '💾 Save Settings'}
          </button>

          {/* Info Box */}
          <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>
              <strong>📌 How it works:</strong>
              <br />1. Add your Postiz API key above
              <br />2. Enter your social media handles
              <br />3. Go to /studio and generate content
              <br />4. Schedule posts for optimal times
              <br />5. Check your social media accounts!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
