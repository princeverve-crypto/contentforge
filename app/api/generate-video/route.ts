/**
 * Video Generation Endpoint
 * Uses Open-Sora (text→video, 9k+ stars) or AnimateDiff (image→video, 5.5k stars)
 *
 * POST /api/generate-video
 * Body: {
 *   caption: string,
 *   imageUrl?: string,
 *   duration?: number (1-8 seconds)
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateVideo } from '@/app/lib/video-generator'

export async function POST(request: NextRequest) {
  try {
    const { caption, imageUrl, duration = 4 } = await request.json()

    if (!caption || caption.trim().length === 0) {
      return NextResponse.json(
        { error: 'Caption is required for video generation' },
        { status: 400 }
      )
    }

    if (duration < 1 || duration > 8) {
      return NextResponse.json(
        { error: 'Duration must be between 1 and 8 seconds' },
        { status: 400 }
      )
    }

    console.log(`Generating video: "${caption}" (${duration}s)`)

    // Generate video
    const result = await generateVideo(caption, imageUrl, duration)

    return NextResponse.json({
      success: true,
      ...result,
      metadata: {
        caption: caption.substring(0, 100),
        duration,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('Video generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate video' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ready',
    videoGenerationEngines: ['Open-Sora (9k stars)', 'AnimateDiff (5.5k stars)', 'Fallback-SVG'],
    supportedDurations: '1-8 seconds',
    primary: 'Open-Sora for text-to-video',
    fallback: 'AnimateDiff for image-to-video'
  })
}
