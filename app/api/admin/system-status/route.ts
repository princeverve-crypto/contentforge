import { NextRequest, NextResponse } from 'next/server'

// In-memory system state
const systemState = {
  startedAt: Date.now(),
  agents: {
    image_gen: { status: 'running', tasks: 12, cpu: 45, memory: 620 },
    video_gen: { status: 'running', tasks: 8, cpu: 72, memory: 1240 },
    image_edit: { status: 'idle', tasks: 0, cpu: 5, memory: 128 },
    prompt_engineer: { status: 'running', tasks: 15, cpu: 32, memory: 256 },
    scheduler: { status: 'running', tasks: 24, cpu: 18, memory: 92 },
    analytics: { status: 'running', tasks: 32, cpu: 52, memory: 512 },
    qa_agent: { status: 'idle', tasks: 0, cpu: 8, memory: 64 },
    orchestrator: { status: 'running', tasks: 56, cpu: 88, memory: 1024 },
  },
  messages: [
    {
      agentName: 'Orchestrator',
      action: 'dispatch',
      message: 'Routed user input to Image Generator',
      timestamp: new Date().toISOString(),
      status: 'complete',
    },
    {
      agentName: 'Image Generator',
      action: 'process',
      message: 'Generating image with FLUX Pro model',
      timestamp: new Date().toISOString(),
      status: 'processing',
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    // Calculate system health (0-100)
    const avgCpu =
      Object.values(systemState.agents).reduce((sum: number, a: any) => sum + a.cpu, 0) / 8
    const avgMemory =
      Object.values(systemState.agents).reduce((sum: number, a: any) => sum + a.memory, 0) / 8

    const health = Math.max(0, 100 - (avgCpu * 0.3 + (avgMemory / 1024) * 0.2))

    // Count active agents
    const activeAgents = Object.values(systemState.agents).filter(
      (a: any) => a.status === 'running'
    ).length

    // Total tasks
    const totalTasks = Object.values(systemState.agents).reduce(
      (sum: number, a: any) => sum + a.tasks,
      0
    )

    return NextResponse.json({
      health: Math.round(health),
      activeAgents,
      totalTasks,
      agents: systemState.agents,
      messages: systemState.messages,
      uptime: Date.now() - systemState.startedAt,
      cpuUsage: Math.round(avgCpu),
      memoryUsage: Math.round(avgMemory),
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// Endpoint to log agent messages
export async function POST(request: NextRequest) {
  try {
    const { agentName, action, message } = await request.json()

    systemState.messages.push({
      agentName,
      action,
      message,
      timestamp: new Date().toISOString(),
      status: 'complete',
    })

    // Keep only last 100 messages
    if (systemState.messages.length > 100) {
      systemState.messages.shift()
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
