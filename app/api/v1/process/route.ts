/**
 * Main API Endpoint - Full Agent Pipeline
 * Routes user requests through multi-agent orchestration system
 *
 * POST /api/v1/process
 * Body: { caption: string, format: string, preferences?: object }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getActivationService } from '@/app/lib/agent-activation'

export async function POST(request: NextRequest) {
  try {
    const { caption, format = 'tiktok', preferences } = await request.json()

    // Validate input
    if (!caption || caption.trim().length === 0) {
      return NextResponse.json(
        { error: 'Caption is required' },
        { status: 400 }
      )
    }

    // Get agent service
    const agentService = getActivationService()

    // Check if activated
    const status = agentService.getSystemStatus()
    if (status.status !== 'active') {
      return NextResponse.json(
        { error: 'Agent system not initialized. Please try again.' },
        { status: 503 }
      )
    }

    // Process through agent pipeline
    const result = await agentService.processUserRequest({
      caption,
      format,
      preferences
    })

    return NextResponse.json({
      success: true,
      message: 'Content processed through multi-agent system',
      data: result,
      pipeline: {
        orchestrator: 'ready',
        agents: 8,
        providers: 'multi-provider routing active'
      }
    })

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET(request: NextRequest) {
  try {
    const agentService = getActivationService()
    const status = agentService.getSystemStatus()

    return NextResponse.json({
      status: status.status,
      agents: status.agents,
      systemHealth: status.health || 0,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    )
  }
}
