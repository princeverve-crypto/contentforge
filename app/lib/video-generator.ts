/**
 * Video Generation Integration
 * Uses Open-Sora (9k+ stars) as primary for text-to-video
 * Falls back to AnimateDiff for image-to-video
 */

export async function generateVideoWithOpenSora(
  caption: string,
  duration: number = 4
): Promise<string | null> {
  try {
    // Open-Sora via Hugging Face Spaces
    // https://github.com/PKU-YuanGroup/Open-Sora

    const response = await fetch(
      'https://huggingface.co/spaces/zzh0122/open-sora/api/predict',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: caption,
          num_frames: Math.min(48, duration * 12), // ~4 fps
          height: 576,
          width: 1024,
          seed: Math.floor(Math.random() * 1000000),
        }),
      }
    )

    if (!response.ok) throw new Error('Open-Sora API failed')

    const result = await response.json()
    if (result.data && result.data[0]) {
      return result.data[0] // Video URL
    }
    throw new Error('No video in response')
  } catch (error) {
    console.error('Open-Sora error:', error)
    return null
  }
}

export async function generateVideoWithAnimateDiff(
  imageUrl: string,
  caption: string,
  duration: number = 4
): Promise<string | null> {
  try {
    // AnimateDiff via Replicate
    // https://github.com/guoyww/AnimateDiff

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'guoyww/animatediff:...',
        input: {
          image: imageUrl,
          prompt: caption,
          num_frames: Math.min(16, duration * 4),
          guidance_scale: 7.5,
        },
      }),
    })

    if (!response.ok) throw new Error('AnimateDiff API failed')

    const result = await response.json()
    if (result.output) {
      return result.output[0] // Video URL
    }
    throw new Error('No video in response')
  } catch (error) {
    console.error('AnimateDiff error:', error)
    return null
  }
}

export function generateVideoFallback(caption: string): string {
  // MP4 placeholder video (base64 minimal video)
  // Returns a short animated gradient video as SVG

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="576" viewBox="0 0 1024 576">
      <defs>
        <linearGradient id="vidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1">
            <animate attributeName="stop-color" values="#00d4ff;#b537f2;#ff006e;#00d4ff" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style="stop-color:#b537f2;stop-opacity:1">
            <animate attributeName="stop-color" values="#b537f2;#ff006e;#00d4ff;#b537f2" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <rect width="1024" height="576" fill="url(#vidGrad)"/>
      <circle cx="512" cy="288" r="80" fill="white" opacity="0.1">
        <animate attributeName="r" values="80;120;80" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="512" y="250" textAnchor="middle" fontSize="32" fill="white" fontWeight="bold">
        🎬 Video Generation
      </text>
      <text x="512" y="300" textAnchor="middle" fontSize="20" fill="rgba(255,255,255,0.8)">
        ${caption.substring(0, 40)}
      </text>
      <text x="512" y="350" textAnchor="middle" fontSize="16" fill="rgba(255,255,255,0.6)">
        Duration: 4 seconds
      </text>
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

export async function generateVideo(
  caption: string,
  imageUrl?: string,
  duration: number = 4
): Promise<{ videoUrl: string; method: string; message: string }> {
  // Try Open-Sora first (text-to-video)
  console.log('Attempting Open-Sora video generation...')
  const sora = await generateVideoWithOpenSora(caption, duration)
  if (sora) {
    return { videoUrl: sora, method: 'Open-Sora', message: 'Video generated with Open-Sora' }
  }

  // Fall back to AnimateDiff (image-to-video)
  if (imageUrl) {
    console.log('Attempting AnimateDiff video generation...')
    const animatediff = await generateVideoWithAnimateDiff(imageUrl, caption, duration)
    if (animatediff) {
      return { videoUrl: animatediff, method: 'AnimateDiff', message: 'Video generated with AnimateDiff' }
    }
  }

  // Final fallback to SVG animation
  console.log('Using fallback SVG video placeholder...')
  const fallbackUrl = generateVideoFallback(caption)
  return { videoUrl: fallbackUrl, method: 'Fallback', message: 'Generated with SVG animation (add API keys for AI generation)' }
}
