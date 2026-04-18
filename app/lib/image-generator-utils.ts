/**
 * Utility functions for generating SVG images with pseudo-AI variations
 * Creates unique visual outputs based on caption + style
 */

export function generateSVGImage(caption: string, format: string, style: string): string {
  const sizes: Record<string, { width: number; height: number }> = {
    tiktok: { width: 1080, height: 1920 },
    instagram: { width: 1080, height: 1920 },
    youtube: { width: 1920, height: 1080 },
    square: { width: 1080, height: 1080 }
  }

  const size = sizes[format] || sizes.tiktok
  const hash = hashCaption(caption)
  const colors = generateColorPalette(hash, style)

  // Create dynamic SVG with pseudo-unique elements based on caption
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}">
      <defs>
        <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${colors[1]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors[2]};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${size.width}" height="${size.height}" fill="url(#mainGrad)"/>

      <!-- Animated shapes based on caption hash -->
      ${generateShapes(hash, size.width, size.height)}

      <!-- Grid overlay -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${size.width}" height="${size.height}" fill="url(#grid)" />

      <!-- Text -->
      <text x="${size.width / 2}" y="${size.height * 0.35}" text-anchor="middle" font-size="56" font-weight="bold" fill="white" font-family="Arial, sans-serif" filter="url(#glow)">
        ${escapeXml(caption.substring(0, 40))}
      </text>

      <text x="${size.width / 2}" y="${size.height * 0.65}" text-anchor="middle" font-size="32" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">
        ContentForge
      </text>

      <!-- Neon border -->
      <rect x="0" y="0" width="${size.width}" height="${size.height}" fill="none" stroke="${colors[0]}" stroke-width="3" opacity="0.3" />
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

function hashCaption(caption: string): number {
  let hash = 0
  for (let i = 0; i < caption.length; i++) {
    const char = caption.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

function generateColorPalette(hash: number, style: string): string[] {
  const palettes: Record<string, string[][]> = {
    professional: [
      ['#00d4ff', '#b537f2', '#ff006e'],
      ['#3b82f6', '#8b5cf6', '#ec4899'],
      ['#06b6d4', '#8b5cf6', '#fb7185'],
      ['#0ea5e9', '#a855f7', '#f43f5e'],
    ],
    vibrant: [
      ['#ff006e', '#ffbe0b', '#00d4ff'],
      ['#ff4757', '#ffa502', '#00d4ff'],
      ['#ee5a6f', '#f9ca24', '#6c5ce7'],
      ['#ff7675', '#fdcb6e', '#74b9ff'],
    ],
    minimalist: [
      ['#e2e8f0', '#94a3b8', '#475569'],
      ['#f1f5f9', '#cbd5e1', '#64748b'],
      ['#f8fafc', '#d1d5db', '#6b7280'],
    ],
    dark: [
      ['#00d4ff', '#0a0e27', '#b537f2'],
      ['#3b82f6', '#1e293b', '#8b5cf6'],
      ['#06b6d4', '#0f172a', '#a855f7'],
    ]
  }

  const styleKey = (palettes[style] ? style : 'professional')
  const paletteArray = palettes[styleKey]
  const selected = paletteArray[hash % paletteArray.length]

  return selected
}

function generateShapes(hash: number, width: number, height: number): string {
  const shapeCount = 3 + (hash % 5)
  let shapes = ''

  for (let i = 0; i < shapeCount; i++) {
    const seed = hash + i * 1234
    const x = (seed % width)
    const y = ((seed * 7) % height)
    const size = 100 + ((seed * 13) % 300)
    const opacity = 0.05 + ((seed % 10) / 100)
    const shapeType = seed % 3

    if (shapeType === 0) {
      // Circle
      shapes += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="rgba(255,255,255,${opacity})" />`
    } else if (shapeType === 1) {
      // Rectangle
      shapes += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="rgba(255,255,255,${opacity})" />`
    } else {
      // Polygon
      const points = `${x},${y} ${x + size},${y} ${x + size / 2},${y + size}`
      shapes += `<polygon points="${points}" fill="rgba(255,255,255,${opacity})" />`
    }
  }

  return shapes
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
