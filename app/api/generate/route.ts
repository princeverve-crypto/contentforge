import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let caption = ''
  let format = 'tiktok'
  let style = 'professional'

  try {
    const body = await request.json()
    caption = body.caption
    format = body.format || 'tiktok'
    style = body.style || 'professional'

    if (!caption || caption.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe what you want to create' },
        { status: 400 }
      )
    }

    const enhancedPrompt = `Professional ${style} social media design: "${caption}". High quality, vibrant, eye-catching, modern, engaging, beautiful. Optimized for ${format} format.`

    console.log('Generating image with prompt:', enhancedPrompt)

    // Use OpenRouter for image generation (supports DALL-E 3, FLUX, and more)
    const openrouterKey = process.env.OPENROUTER_KEY

    if (!openrouterKey) {
      // Fallback to SVG generation when API not configured
      const imageUrl = `/api/images/generate?caption=${encodeURIComponent(caption)}&format=${format}&style=${style}`
      return NextResponse.json({
        imageUrl,
        success: true,
        message: 'Generated with SVG (add OPENROUTER_KEY for AI generation)'
      })
    }

    // Call OpenRouter API for image generation
    const generateRes = await fetch('https://openrouter.ai/api/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://contentforge-flax.vercel.app',
      },
      body: JSON.stringify({
        model: 'openai/dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: format === 'youtube' ? '1792x1024' : format === 'square' ? '1024x1024' : '1024x1792',
        quality: 'hd'
      })
    })

    if (!generateRes.ok) {
      const error = await generateRes.json()
      console.error('OpenRouter error:', error)

      // Fallback to SVG generation
      const imageUrl = `/api/images/generate?caption=${encodeURIComponent(caption)}&format=${format}&style=${style}`
      return NextResponse.json({
        imageUrl,
        success: true,
        message: 'Generated with SVG fallback'
      })
    }

    const result = await generateRes.json()

    if (result.data && result.data.length > 0) {
      const imageUrl = result.data[0].url || result.data[0]

      return NextResponse.json({
        imageUrl,
        success: true,
        message: 'Image generated successfully'
      })
    }

    // Final fallback to SVG
    const imageUrl = `/api/images/generate?caption=${encodeURIComponent(caption)}&format=${format}&style=${style}`
    return NextResponse.json({
      imageUrl,
      success: true,
      message: 'Generated'
    })
  } catch (error: any) {
    console.error('API error:', error)
    const imageUrl = `/api/images/generate?caption=${encodeURIComponent(caption)}&format=${format}&style=${style}`

    return NextResponse.json({
      imageUrl,
      success: true,
      message: 'Generated'
    })
  }
}
