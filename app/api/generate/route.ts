import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { caption, style, format } = await request.json()

    if (!caption) {
      return NextResponse.json(
        { error: 'Caption is required' },
        { status: 400 }
      )
    }

    const prompt = `${style} style professional design: "${caption}". High quality, vibrant, eye-catching, perfect for social media.`

    const sizes: Record<string, string> = {
      tiktok: '1080x1920',
      instagram: '1080x1920',
      youtube: '1920x1080',
      square: '1080x1080'
    }

    const apiToken = process.env.REPLICATE_API_TOKEN

    if (!apiToken) {
      return NextResponse.json(
        { error: 'API token not configured' },
        { status: 500 }
      )
    }

    // Call Replicate API for FLUX
    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'black-forest-labs/flux-pro',
        input: {
          prompt,
          image_size: sizes[format] || '1080x1920',
          num_inference_steps: 28,
          guidance_scale: 7.5
        }
      })
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || 'API error' },
        { status: 500 }
      )
    }

    // Poll for completion
    let prediction = data
    let attempts = 0
    const maxAttempts = 60

    while (
      prediction.status === 'processing' &&
      attempts < maxAttempts
    ) {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const checkRes = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: { Authorization: `Bearer ${apiToken}` }
        }
      )

      prediction = await checkRes.json()
      attempts++
    }

    if (prediction.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Image generation failed' },
        { status: 500 }
      )
    }

    const imageUrl = prediction.output?.[0] || prediction.output

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({ imageUrl })
  } catch (error: any) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal error' },
      { status: 500 }
    )
  }
}
