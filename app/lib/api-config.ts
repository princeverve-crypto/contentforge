/**
 * Multi-API Integration Configuration
 * Supports: OpenRouter, Groq, Mistral, Claude (Anthropic), Supabase
 */

export const apiConfig = {
  // OpenRouter - Access to 100+ models
  openrouter: {
    apiKey: process.env.OPENROUTER_KEY || '',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: {
      image: 'openrouter/auto', // Auto-routes to best image model
      text: 'openrouter/auto', // Auto-routes to best text model
      video: 'openrouter/auto',
    },
  },

  // Groq - Ultra-fast inference
  groq: {
    apiKey: process.env.GROQ_KEY || '',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: {
      fast: 'mixtral-8x7b-32768', // 32K context, very fast
      balanced: 'llama-3-70b-8192',
    },
  },

  // Claude (Anthropic) - Best for complex reasoning
  claude: {
    apiKey: process.env.CLAUDE_KEY || '',
    baseUrl: 'https://api.anthropic.com',
    models: {
      opus: 'claude-opus-4-1', // Best reasoning
      sonnet: 'claude-sonnet-4', // Balanced
      haiku: 'claude-haiku-3', // Fast
    },
  },

  // Mistral - European LLM
  mistral: {
    apiKey: process.env.MISTRAL_KEY || '',
    baseUrl: 'https://api.mistral.ai/v1',
    models: {
      large: 'mistral-large-latest',
      medium: 'mistral-medium-latest',
      small: 'mistral-small-latest',
    },
  },

  // Supabase - Database + Storage
  supabase: {
    apiKey: process.env.SUPADATA_KEY || '',
    projectUrl: process.env.SUPABASE_URL || '',
    tables: {
      agents: 'agents',
      messages: 'agent_messages',
      workflows: 'workflows',
      analytics: 'post_analytics',
    },
  },

  // Image Generation Models
  imageGen: {
    primary: 'openrouter', // OpenRouter (100+ models, no credit issues)
    fallback1: 'stability', // Stability AI
    fallback2: 'huggingface', // HF Diffusers
  },

  // Video Generation Models
  videoGen: {
    primary: 'haiper', // Haiper AI
    fallback1: 'animatediff', // Open source
    fallback2: 'openrouter', // OpenRouter
  },
}

// Agent-specific API routing
export const agentApiConfig = {
  image_gen: {
    primary: 'openrouter',
    fallbacks: ['stability', 'huggingface'],
    timeout: 60000,
  },

  video_gen: {
    primary: 'haiper',
    fallbacks: ['animatediff', 'openrouter'],
    timeout: 120000,
  },

  prompt_engineer: {
    primary: 'claude',
    fallbacks: ['openrouter', 'groq'],
    timeout: 10000,
  },

  orchestrator: {
    primary: 'claude', // Use Opus for complex reasoning
    fallbacks: ['openrouter'],
    timeout: 30000,
  },

  scheduler: {
    primary: 'groq', // Fast for scheduling decisions
    fallbacks: ['claude'],
    timeout: 5000,
  },

  analytics: {
    primary: 'claude', // Good for analysis
    fallbacks: ['openrouter'],
    timeout: 15000,
  },

  qa_agent: {
    primary: 'groq',
    fallbacks: ['claude'],
    timeout: 10000,
  },

  image_edit: {
    primary: 'openrouter',
    fallbacks: ['stability'],
    timeout: 45000,
  },
}

// Fallback routing strategy
export const fallbackStrategy = {
  maxRetries: 3,
  backoffMs: [1000, 2000, 5000], // Exponential backoff
  circuitBreaker: {
    failureThreshold: 5,
    resetTimeoutMs: 60000,
  },
}

export default apiConfig
