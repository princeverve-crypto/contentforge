import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { caption, style = 'professional', format = 'tiktok', autoPost = false } = await request.json()

    if (!caption || caption.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe what you want to create' },
        { status: 400 }
      )
    }

    const replicateToken = process.env.REPLICATE_API_TOKEN
    if (!replicateToken) {
      console.error('REPLICATE_API_TOKEN not configured')
      return NextResponse.json(
        { error: 'Image generation service not configured. Please add REPLICATE_API_TOKEN to environment variables.' },
        { status: 500 }
      )
    }

    // Enhance prompt
    const prompt = `Create a ${style} professional design for social media. Text: "${caption}". High quality, vibrant, eye-catching, modern, engaging. Perfect for TikTok, Instagram, YouTube.`

    const sizes: Record<string, string> = {
      tiktok: '1080x1920',
      instagram: '1080x1920',
      youtube: '1920x1080',
      square: '1080x1080'
    }

    // Call Replicate FLUX model
    const generateRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${replicateToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'black-forest-labs/flux-pro',
        input: {
          prompt: prompt,
          image_size: sizes[format] || '1080x1920',
          num_inference_steps: 28,
          guidance_scale: 7.5
        }
      })
    })

    if (!generateRes.ok) {
      const error = await generateRes.text()
      console.error('Replicate API error:', error)
      return NextResponse.json(
        { error: 'Failed to start image generation. Check API token.' },
        { status: 500 }
      )
    }

    const prediction = await generateRes.json()

    if (!prediction.id) {
      console.error('No prediction ID returned')
      return NextResponse.json(
        { error: 'Image generation service error' },
        { status: 500 }
      )
    }

    // Poll for completion (max 120 seconds)
    let result = prediction
    let attempts = 0
    const maxAttempts = 120

    while (result.status === 'processing' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const checkRes = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: { 'Authorization': `Bearer ${replicateToken}` }
        }
      )

      if (!checkRes.ok) {
        console.error('Error checking prediction status')
        return NextResponse.json(
          { error: 'Error generating image' },
          { status: 500 }
        )
      }

      result = await checkRes.json()
      attempts++
    }

    if (result.status !== 'succeeded') {
      console.error('Generation failed:', result.error)
      return NextResponse.json(
        { error: `Image generation ${result.status}` },
        { status: 500 }
      )
    }

    const imageUrl = result.output?.[0] || result.output

    if (!imageUrl) {
      console.error('No image URL in response')
      return NextResponse.json(
        { error: 'Image generation succeeded but no URL returned' },
        { status: 500 }
      )
    }

    // Auto-post to Postiz if enabled
    if (autoPost) {
      try {
        const postizRes = await fetch('https://app.postiz.com/api/integrations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.POSTIZ_API_KEY || ''}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            caption: caption,
            image_url: imageUrl,
            platforms: ['tiktok', 'instagram', 'youtube']
          })
        })

        if (postizRes.ok) {
          console.log('Posted to Postiz successfully')
        }
      } catch (postError) {
        console.log('Postiz auto-post attempted (error acceptable)')
      }
    }

    return NextResponse.json({
      imageUrl,
      success: true,
      message: 'Image created successfully'
    })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
