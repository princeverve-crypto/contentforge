'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [agentStatus, setAgentStatus] = useState<any>({})
  const [messages, setMessages] = useState<any[]>([])
  const [systemHealth, setSystemHealth] = useState(0)
  const [activeAgents, setActiveAgents] = useState(0)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Check if user has admin token
    const adminToken = document.cookie.split('; ').find(row => row.startsWith('admin_token='))
    if (!adminToken) {
      router.push('/admin/login')
      return
    }
    setAuthorized(true)
  }, [router])

  useEffect(() => {
    if (!authorized) return

    // Simulated real-time agent status polling
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/admin/system-status')
        const data = await res.json()
        setAgentStatus(data.agents || {})
        setMessages(data.messages || [])
        setActiveAgents(data.activeAgents || 0)
        setSystemHealth(data.health || 0)
      } catch (err) {
        console.error('Failed to fetch system status:', err)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [authorized])

  if (!authorized) {
    return (
      <main style={{ background: '#0a0e27', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
          <p>Redirecting to login...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#0a0e27', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Grid Background */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', opacity: '0.03', zIndex: -1, backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }}></div>

      {/* DNA Helix Background Animation */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.05 }}>
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#b537f2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff006e" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 50,0 Q 100,25 50,50 T 50,100"
            stroke="url(#dnaGradient)"
            strokeWidth="2"
            fill="none"
            style={{ animation: 'dnaFloat 6s ease-in-out infinite' }}
          />
          <path
            d="M 50,0 Q 0,25 50,50 T 50,100"
            stroke="url(#dnaGradient)"
            strokeWidth="2"
            fill="none"
            style={{ animation: 'dnaFloat 6s ease-in-out infinite 0.3s' }}
          />
        </svg>
      </div>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.2)', backdropFilter: 'blur(10px)', background: 'rgba(10, 14, 39, 0.7)', padding: '20px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, background: 'linear-gradient(120deg, #00d4ff, #b537f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🧬 AGENT CONTROL CENTER
          </h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button
              onClick={() => {
                document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                router.push('/admin/login')
              }}
              style={{ padding: '10px 16px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '6px', color: '#fca5a5', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
            >
              🔓 Logout
            </button>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>SYSTEM HEALTH</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: systemHealth > 80 ? '#39ff14' : systemHealth > 50 ? '#ffaa00' : '#ff006e' }}>
                {systemHealth}%
              </div>
            </div>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(0, 212, 255, 0.1)', border: '2px solid #00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'heartbeat 1.5s ease-in-out infinite', position: 'relative' }}>
              <div style={{ fontSize: '40px', animation: 'heartbeat 1.5s ease-in-out infinite' }}>❤️</div>
              <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #00d4ff', animation: 'pulse 1.5s ease-out infinite', opacity: 0 }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {[
            { label: 'ACTIVE AGENTS', value: activeAgents, icon: '🤖', color: '#00d4ff' },
            { label: 'MESSAGES/MIN', value: messages.length, icon: '📨', color: '#b537f2' },
            { label: 'SUCCESS RATE', value: '94%', icon: '✅', color: '#39ff14' },
            { label: 'AVG LATENCY', value: '245ms', icon: '⚡', color: '#ffaa00' },
          ].map((kpi, i) => (
            <div
              key={i}
              style={{
                padding: '20px',
                background: 'rgba(15, 24, 64, 0.5)',
                border: `2px solid ${kpi.color}`,
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 20px ${kpi.color}33`,
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{kpi.icon}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>{kpi.label}</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: kpi.color }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Agent Status Grid */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#e2e8f0' }}>8 SPECIALIZED AGENTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Image Generator', status: 'running', tasks: 12, color: '#00d4ff' },
              { name: 'Video Creator', status: 'running', tasks: 8, color: '#b537f2' },
              { name: 'Image Editor', status: 'idle', tasks: 0, color: '#ff006e' },
              { name: 'Prompt Optimizer', status: 'running', tasks: 15, color: '#00f5ff' },
              { name: 'Scheduler', status: 'running', tasks: 24, color: '#39ff14' },
              { name: 'Analytics Engine', status: 'running', tasks: 32, color: '#ffaa00' },
              { name: 'QA Tester', status: 'idle', tasks: 0, color: '#ff6b9d' },
              { name: 'Orchestrator', status: 'running', tasks: 56, color: '#00d4ff' },
            ].map((agent, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  background: 'rgba(15, 24, 64, 0.6)',
                  border: `1px solid ${agent.color}40`,
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = agent.color;
                  e.currentTarget.style.boxShadow = `0 0 30px ${agent.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${agent.color}40`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>{agent.name}</div>
                    <div style={{ fontSize: '12px', color: agent.status === 'running' ? '#39ff14' : '#94a3b8', marginTop: '4px' }}>
                      ● {agent.status.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', color: agent.color }}>🔄</div>
                </div>

                {/* Task Progress Bar */}
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${agent.color}, ${agent.color}80)`,
                      width: `${(agent.tasks / 60) * 100}%`,
                      transition: 'width 0.3s',
                      boxShadow: `0 0 10px ${agent.color}`,
                    }}
                  ></div>
                </div>

                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{agent.tasks} TASKS</div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Message Stream */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#e2e8f0' }}>REAL-TIME MESSAGE STREAM</h2>
          <div style={{ background: 'rgba(15, 24, 64, 0.6)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '12px', backdropFilter: 'blur(10px)', maxHeight: '400px', overflow: 'auto' }}>
            {messages.slice(-20).reverse().map((msg, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
                  fontSize: '12px',
                  color: '#cbd5e1',
                  fontFamily: 'monospace',
                  display: 'grid',
                  gridTemplateColumns: 'auto auto 1fr auto',
                  gap: '12px',
                }}
              >
                <span style={{ color: '#00d4ff' }}>{msg.agentName}</span>
                <span style={{ color: '#b537f2' }}>[{msg.action}]</span>
                <span style={{ color: '#94a3b8' }}>{msg.message}</span>
                <span style={{ color: msg.status === 'complete' ? '#39ff14' : '#ffaa00' }}>{msg.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes dnaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </main>
  )
}
