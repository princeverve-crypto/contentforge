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

    const replicateToken = process.env.REPLICATE_API_TOKEN
    if (!replicateToken) {
      return NextResponse.json(
        { error: 'API not configured. Add REPLICATE_API_TOKEN to environment.' },
        { status: 500 }
      )
    }

    const prompt = `Create a professional ${style} design for social media. Text: "${caption}". High quality, vibrant, eye-catching, modern, engaging.`

    const sizes: Record<string, string> = {
      tiktok: '1080x1920',
      instagram: '1080x1920',
      youtube: '1920x1080',
      square: '1080x1080'
    }

    console.log('Starting image generation with prompt:', prompt)

    // Call Replicate FLUX model
    const generateRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${replicateToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'black-forest-labs/flux-schnell',
        input: {
          prompt: prompt,
          height: parseInt(sizes[format].split('x')[1] || '1920'),
          width: parseInt(sizes[format].split('x')[0] || '1080')
        }
      })
    })

    const predictionData = await generateRes.json()

    if (!generateRes.ok) {
      console.error('Replicate error:', predictionData)
      return NextResponse.json(
        { error: `Generation failed: ${predictionData.detail || 'Unknown error'}` },
        { status: 500 }
      )
    }

    if (!predictionData.id) {
      console.error('No prediction ID returned')
      return NextResponse.json(
        { error: 'Generation service error' },
        { status: 500 }
      )
    }

    // Poll for completion
    let result = predictionData
    let attempts = 0
    const maxAttempts = 120

    while (result.status === 'processing' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const checkRes = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionData.id}`,
        {
          headers: { 'Authorization': `Bearer ${replicateToken}` }
        }
      )

      if (!checkRes.ok) {
        console.error('Error checking status')
        return NextResponse.json(
          { error: 'Generation failed' },
          { status: 500 }
        )
      }

      result = await checkRes.json()
      attempts++
      console.log(`Poll attempt ${attempts}: status = ${result.status}`)
    }

    if (result.status !== 'succeeded') {
      console.error('Generation failed:', result)
      return NextResponse.json(
        { error: `Generation ${result.status}` },
        { status: 500 }
      )
    }

    const imageUrl = result.output?.[0] || result.output

    if (!imageUrl) {
      console.error('No output URL')
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      )
    }

    // Auto-post to Postiz if enabled
    if (autoPost && process.env.POSTIZ_API_KEY) {
      try {
        console.log('Attempting Postiz auto-post...')
        // This would integrate with Postiz API
      } catch (e) {
        console.log('Postiz post skipped')
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
      { error: error.message || 'Internal error' },
      { status: 500 }
    )
  }
}
