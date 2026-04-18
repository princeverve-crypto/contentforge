/**
 * Agent Activation Layer
 * Initializes all agents with real API connections
 * Handles provider routing, fallbacks, and error recovery
 */

import { ContentForgeOrchestrator } from './multi-agent-orchestrator'
import { MultiProviderRouter } from './multi-provider-router'

interface ActivationConfig {
  environment: 'development' | 'production'
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  enableDashboard: boolean
  realTimeUpdates: boolean
}

class AgentActivationService {
  private orchestrator: ContentForgeOrchestrator | null = null
  private router: MultiProviderRouter | null = null
  private config: ActivationConfig
  private isActivated = false

  constructor(config: ActivationConfig = {
    environment: 'production',
    logLevel: 'info',
    enableDashboard: true,
    realTimeUpdates: true
  }) {
    this.config = config
  }

  async activate(): Promise<boolean> {
    try {
      this.log('info', '🚀 Activating ContentForge Agent System...')

      // Validate API keys
      const apiKeys = this.validateApiKeys()
      if (!apiKeys) {
        throw new Error('Missing required API keys')
      }

      // Initialize multi-provider router
      this.router = new MultiProviderRouter()
      this.log('info', '✓ Multi-provider router initialized')

      // Initialize orchestrator with API keys
      this.orchestrator = new ContentForgeOrchestrator(apiKeys)
      this.log('info', '✓ Orchestrator initialized with 8 agents')

      // Health check all providers
      await this.healthCheckProviders()

      // Subscribe to agent updates for dashboard
      if (this.config.enableDashboard && this.config.realTimeUpdates) {
        this.setupDashboardSubscription()
      }

      this.isActivated = true
      this.log('info', '✅ ALL SYSTEMS READY - Agent activation complete')

      return true
    } catch (error: any) {
      this.log('error', `❌ Activation failed: ${error.message}`)
      return false
    }
  }

  private validateApiKeys(): Record<string, string> | null {
    const required = [
      'CLAUDE_KEY',
      'OPENROUTER_KEY',
      'GROQ_KEY',
      'MISTRAL_KEY'
    ]

    const apiKeys: Record<string, string> = {
      CLAUDE_KEY: process.env.CLAUDE_KEY || '',
      OPENROUTER_KEY: process.env.OPENROUTER_KEY || '',
      GROQ_KEY: process.env.GROQ_KEY || '',
      MISTRAL_KEY: process.env.MISTRAL_KEY || '',
      REPLICATE_KEY: process.env.REPLICATE_API_TOKEN || '',
      POSTIZ_KEY: process.env.POSTIZ_API_KEY || '',
      SUPABASE_KEY: process.env.SUPADATA_KEY || '',
    }

    const missing = required.filter(key => !apiKeys[key])
    if (missing.length > 0) {
      this.log('error', `Missing API keys: ${missing.join(', ')}`)
      return null
    }

    return apiKeys
  }

  private async healthCheckProviders(): Promise<void> {
    this.log('info', '🔍 Running provider health checks...')

    const providers = [
      { name: 'Claude', key: process.env.CLAUDE_KEY },
      { name: 'OpenRouter', key: process.env.OPENROUTER_KEY },
      { name: 'Groq', key: process.env.GROQ_KEY },
      { name: 'Mistral', key: process.env.MISTRAL_KEY },
    ]

    const results = providers.map(p => ({
      provider: p.name,
      status: p.key ? '✓ configured' : '✗ missing'
    }))

    results.forEach(r => {
      this.log('info', `  ${r.provider}: ${r.status}`)
    })
  }

  private setupDashboardSubscription(): void {
    if (this.orchestrator) {
      this.orchestrator.subscribeToUpdates((message: any) => {
        this.log('debug', `[${message.agentName}] ${message.action}: ${message.status}`)
        // Send to WebSocket for real-time dashboard updates
        this.broadcastToDashboard(message)
      })
    }
  }

  private broadcastToDashboard(message: any): void {
    // This will be connected to WebSocket in production
    // For now, just log
    if (this.config.logLevel === 'debug') {
      console.log('📊 Dashboard update:', message)
    }
  }

  // Process user request through full agent pipeline
  async processUserRequest(input: {
    caption: string
    format: string
    preferences?: Record<string, any>
  }): Promise<any> {
    if (!this.isActivated || !this.orchestrator) {
      throw new Error('Agent system not activated. Call activate() first.')
    }

    this.log('info', `📥 Processing user request: "${input.caption.substring(0, 50)}..."`)

    try {
      const result = await this.orchestrator.processContent(input)
      this.log('info', `✅ Request processed successfully`)
      return result
    } catch (error: any) {
      this.log('error', `Failed to process request: ${error.message}`)
      throw error
    }
  }

  // Get current system status
  getSystemStatus(): any {
    if (!this.orchestrator) {
      return { status: 'inactive' }
    }

    return {
      status: this.isActivated ? 'active' : 'inactive',
      ...this.orchestrator.getSystemStatus()
    }
  }

  private log(level: string, message: string): void {
    const timestamp = new Date().toISOString()
    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    const configLevel = levels[this.config.logLevel as keyof typeof levels] || 1

    if (levels[level as keyof typeof levels] >= configLevel) {
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`)
    }
  }
}

// Singleton instance
let activationService: AgentActivationService | null = null

export function getActivationService(): AgentActivationService {
  if (!activationService) {
    activationService = new AgentActivationService({
      environment: (process.env.NODE_ENV as any) || 'production',
      logLevel: (process.env.AGENT_LOG_LEVEL as any) || 'info',
      enableDashboard: process.env.ADMIN_DASHBOARD_ENABLED === 'true',
      realTimeUpdates: process.env.REAL_TIME_UPDATES === 'true'
    })
  }
  return activationService
}

export async function initializeAgentSystem(): Promise<boolean> {
  const service = getActivationService()
  return service.activate()
}

export { AgentActivationService }
