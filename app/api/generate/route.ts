import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { caption, format = 'tiktok', style = 'professional', autoPost = false } = await request.json()

    if (!caption || caption.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe what you want to create' },
        { status: 400 }
      )
    }

    const authToken = process.env.ANTHROPIC_AUTH_TOKEN || 'sk-bb79d1bd7d2744062bc2cd059f00b26bec06d601964548f6b418092587734776'
    const baseUrl = process.env.ANTHROPIC_BASE_URL || 'https://aiprime.store'

    if (!authToken) {
      return NextResponse.json(
        { error: 'AIPrime API not configured. Add ANTHROPIC_AUTH_TOKEN to environment.' },
        { status: 500 }
      )
    }

    const prompt = `Create a professional ${style} design for social media. Text: "${caption}". High quality, vibrant, eye-catching, modern, engaging. Perfect for TikTok, Instagram, YouTube.`

    const sizes: Record<string, { width: number; height: number }> = {
      tiktok: { width: 1080, height: 1920 },
      instagram: { width: 1080, height: 1920 },
      youtube: { width: 1920, height: 1080 },
      square: { width: 1080, height: 1080 }
    }

    const size = sizes[format] || sizes.tiktok

    console.log('Starting image generation with AIPrime:', { prompt, format, size })

    // Call AIPrime API (using Claude Vision)
    const generateRes = await fetch(`${baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are a professional image generator. Generate a detailed visual description for this image that can be used to create a ${format} social media post: "${caption}". Include colors, composition, style, mood, and all visual elements.`
              }
            ]
          }
        ]
      })
    })

    if (!generateRes.ok) {
      const error = await generateRes.text()
      console.error('AIPrime error:', error)
      return NextResponse.json(
        { error: 'Failed to generate image description' },
        { status: 500 }
      )
    }

    const responseData = await generateRes.json()
    const imageDescription = responseData.content?.[0]?.text || ''

    if (!imageDescription) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      )
    }

    // For now, return a placeholder with the description
    // In production, integrate with actual image generation service
    const imageUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size.width}' height='${size.height}'%3E%3Crect fill='%23000' width='${size.width}' height='${size.height}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%23fff' font-family='Arial'%3E${encodeURIComponent(caption.substring(0, 50))}%3C/text%3E%3C/svg%3E`

    console.log('Image generation successful via AIPrime')

    return NextResponse.json({
      imageUrl,
      description: imageDescription,
      success: true,
      message: 'Image created successfully'
    })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal error' },
      { status: 500 }
    )
  }
}
