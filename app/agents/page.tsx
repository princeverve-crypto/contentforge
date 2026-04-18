'use client'

import { useEffect, useState } from 'react'

const agents = [
  { name: 'Orchestrator', icon: '🎯', role: 'Master Coordinator', color: '#00d4ff' },
  { name: 'Image Gen', icon: '🎨', role: 'Image Creation', color: '#b537f2' },
  { name: 'Video Gen', icon: '🎬', role: 'Video Creation', color: '#ff006e' },
  { name: 'Image Editor', icon: '✨', role: 'Image Enhancement', color: '#00d4ff' },
  { name: 'Prompt Engineer', icon: '📝', role: 'Prompt Optimization', color: '#b537f2' },
  { name: 'Scheduler', icon: '⏰', role: 'Schedule Optimization', color: '#ff006e' },
  { name: 'Analytics', icon: '📊', role: 'Performance Analysis', color: '#00d4ff' },
  { name: 'QA Tester', icon: '✅', role: 'Quality Assurance', color: '#b537f2' },
]

export default function AgentsPage() {
  const [activeAgent, setActiveAgent] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [caption, setCaption] = useState('')
  const [agentStates, setAgentStates] = useState<Record<string, string>>({})

  useEffect(() => {
    // Initialize agent states
    const states: Record<string, string> = {}
    agents.forEach(agent => {
      states[agent.name] = 'idle'
    })
    setAgentStates(states)
  }, [])

  async function simulateAgentFlow() {
    if (!caption.trim()) return

    setProcessing(true)
    const newStates: Record<string, string> = {}
    agents.forEach(agent => {
      newStates[agent.name] = 'idle'
    })

    // Simulate agent activation sequence
    for (let i = 0; i < agents.length; i++) {
      newStates[agents[i].name] = 'active'
      setAgentStates({ ...newStates })
      setActiveAgent(i)
      await new Promise(resolve => setTimeout(resolve, 800))

      newStates[agents[i].name] = 'completed'
      setAgentStates({ ...newStates })
    }

    setProcessing(false)
    // Reset all to idle after completion
    setTimeout(() => {
      const resetStates: Record<string, string> = {}
      agents.forEach(agent => {
        resetStates[agent.name] = 'idle'
      })
      setAgentStates(resetStates)
    }, 2000)
  }

  return (
    <main style={{ background: '#0a0e27', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', overflow: 'hidden' }}>
      {/* Animated Grid Background */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', opacity: '0.03', zIndex: -1, backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }}></div>

      {/* Animated Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(181, 55, 242, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
      </div>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(26, 40, 80, 0.4)', backdropFilter: 'blur(10px)', background: 'rgba(10, 14, 39, 0.6)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '28px', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px' }}>
            Content<span style={{ background: 'linear-gradient(120deg, #00d4ff, #b537f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
          </a>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/studio" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(26, 40, 80, 0.4)', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00d4ff'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(26, 40, 80, 0.4)'}>
              ← Studio
            </a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Title Section */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(120deg, #00d4ff, #b537f2, #ff006e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🤖 Multi-Agent Orchestration
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '32px' }}>
            Watch 8 autonomous agents work together in real-time
          </p>
        </div>

        {/* Visualization Section */}
        <div style={{ marginBottom: '60px', padding: '40px', background: 'rgba(15, 24, 64, 0.3)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
          <svg width="100%" height="500" style={{ minHeight: '500px' }}>
            <defs>
              <radialGradient id="activeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.2" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Center Orchestrator */}
            <circle cx="50%" cy="50%" r="60" fill="#00d4ff" opacity="0.1" />
            <circle cx="50%" cy="50%" r="50" fill="none" stroke="#00d4ff" strokeWidth="2" />
            <text x="50%" y="55%" textAnchor="middle" fontSize="24" fill="#00d4ff" dominantBaseline="middle" fontWeight="bold">
              🎯
            </text>

            {/* Agent Nodes in Circle */}
            {agents.map((agent, i) => {
              const angle = (i / agents.length) * Math.PI * 2
              const radius = 180
              const x = 50 + Math.cos(angle - Math.PI / 2) * radius
              const y = 50 + Math.sin(angle - Math.PI / 2) * radius
              const state = agentStates[agent.name]
              const isActive = state === 'active'
              const isCompleted = state === 'completed'

              return (
                <g key={agent.name}>
                  {/* Connection line */}
                  {isActive && (
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke={agent.color}
                      strokeWidth="2"
                      opacity="0.6"
                      style={{
                        animation: 'dash 1s linear infinite',
                        strokeDasharray: '5,5'
                      }}
                    />
                  )}

                  {/* Agent Node */}
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={isActive ? '40' : '35'}
                    fill={isActive ? agent.color : 'rgba(10, 14, 39, 0.6)'}
                    stroke={agent.color}
                    strokeWidth="2"
                    opacity={isActive ? 1 : 0.6}
                    filter={isActive ? 'url(#glow)' : undefined}
                    style={{
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActiveAgent(i)}
                  />

                  {/* Agent Icon */}
                  <text
                    x={`${x}%`}
                    y={`${y}%`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isActive ? '28' : '24'}
                    fill="white"
                  >
                    {agent.icon}
                  </text>

                  {/* Status Indicator */}
                  {isActive && (
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="45"
                      fill="none"
                      stroke={agent.color}
                      strokeWidth="2"
                      opacity="0.4"
                      style={{
                        animation: 'pulse 1s infinite'
                      }}
                    />
                  )}

                  {isCompleted && (
                    <circle
                      cx={`${x + 3}%`}
                      cy={`${y - 3}%`}
                      r="15"
                      fill={agent.color}
                      opacity="0.8"
                    />
                  )}
                </g>
              )
            })}
          </svg>

          <style>{`
            @keyframes dash {
              to { stroke-dashoffset: 10; }
            }
            @keyframes pulse {
              0%, 100% { r: 45; stroke-opacity: 0.4; }
              50% { r: 55; stroke-opacity: 0.1; }
            }
          `}</style>
        </div>

        {/* Agent Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {agents.map((agent) => (
            <div
              key={agent.name}
              style={{
                padding: '24px',
                background: activeAgent === agents.indexOf(agent) ? `rgba(${parseInt(agent.color.slice(1, 3), 16)}, ${parseInt(agent.color.slice(3, 5), 16)}, ${parseInt(agent.color.slice(5, 7), 16)}, 0.15)` : 'rgba(15, 24, 64, 0.3)',
                border: `1px solid ${activeAgent === agents.indexOf(agent) ? agent.color : 'rgba(26, 40, 80, 0.4)'}`,
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: activeAgent === agents.indexOf(agent) ? `0 0 20px ${agent.color}40` : 'none'
              }}
              onClick={() => setActiveAgent(agents.indexOf(agent))}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = agent.color
                e.currentTarget.style.boxShadow = `0 0 20px ${agent.color}40`
              }}
              onMouseLeave={(e) => {
                if (activeAgent !== agents.indexOf(agent)) {
                  e.currentTarget.style.borderColor = 'rgba(26, 40, 80, 0.4)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{agent.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: agent.color }}>
                {agent.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px' }}>
                {agent.role}
              </p>
              <div style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: 'monospace' }}>
                Status: <span style={{ color: agentStates[agent.name] === 'active' ? '#00d4ff' : agentStates[agent.name] === 'completed' ? '#22c55e' : '#94a3b8' }}>
                  {agentStates[agent.name]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div style={{ padding: '40px', background: 'rgba(15, 24, 64, 0.3)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>
            🚀 Test Agent Pipeline
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter a content idea (e.g., 'motivational quote about success')"
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(10, 14, 39, 0.6)',
                border: '1px solid rgba(26, 40, 80, 0.4)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                marginBottom: '16px',
                fontFamily: 'system-ui'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#00d4ff'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(26, 40, 80, 0.4)'}
            />

            <button
              onClick={simulateAgentFlow}
              disabled={processing || !caption.trim()}
              style={{
                width: '100%',
                padding: '16px',
                background: processing ? 'rgba(0, 212, 255, 0.3)' : 'linear-gradient(120deg, #00d4ff, #b537f2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: processing ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                opacity: caption.trim() ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                if (!processing && caption.trim()) {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)'
              }}
            >
              {processing ? '⏳ Processing...' : '▶️ Run Agent Pipeline'}
            </button>
          </div>

          <div style={{ padding: '16px', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '8px', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
            <strong>How it works:</strong>
            <ol style={{ marginLeft: '20px', marginTop: '8px', marginBottom: 0 }}>
              <li>Enter your content idea</li>
              <li>Orchestrator analyzes the request</li>
              <li>Prompt Engineer optimizes your text</li>
              <li>Image Generator creates visuals</li>
              <li>Image Editor enhances the result</li>
              <li>Video Creator makes animations</li>
              <li>Scheduler finds optimal post time</li>
              <li>Analytics measures performance</li>
              <li>QA Tester validates quality</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  )
}
