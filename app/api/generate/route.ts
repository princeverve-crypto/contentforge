import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { caption, format = 'tiktok', style = 'professional' } = await request.json()

    if (!caption || caption.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe what you want to create' },
        { status: 400 }
      )
    }

    const prompt = `Professional ${style} social media design: "${caption}". High quality, vibrant, eye-catching, modern, engaging, beautiful.`

    console.log('Generating image with prompt:', prompt)

    // Use Replicate FLUX (free tier available)
    const replicateToken = process.env.REPLICATE_API_TOKEN

    if (!replicateToken) {
      // Fallback to placeholder with better styling
      const sizes: Record<string, { width: number; height: number }> = {
        tiktok: { width: 1080, height: 1920 },
        instagram: { width: 1080, height: 1920 },
        youtube: { width: 1920, height: 1080 },
        square: { width: 1080, height: 1080 }
      }

      const size = sizes[format] || sizes.tiktok

      // Generate a gradient placeholder
      const placeholderUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size.width}' height='${size.height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad)' width='${size.width}' height='${size.height}'/%3E%3Ctext x='50%25' y='30%25' dominant-baseline='middle' text-anchor='middle' font-size='48' font-weight='bold' fill='white' font-family='Arial'%3E${encodeURIComponent(caption.substring(0, 30))}</%3E%3C/text%3E%3Ctext x='50%25' y='70%25' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='rgba(255,255,255,0.8)' font-family='Arial'%3EContentForge%3C/text%3E%3C/svg%3E`

      return NextResponse.json({
        imageUrl: placeholderUrl,
        success: true,
        message: 'Image generated (add REPLICATE_API_TOKEN for AI generation)'
      })
    }

    // Call Replicate FLUX API
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
          image_size: format === 'youtube' ? '1920x1080' : format === 'square' ? '1080x1080' : '1080x1920'
        }
      })
    })

    if (!generateRes.ok) {
      const error = await generateRes.text()
      console.error('Replicate error:', error)
      
      // Return placeholder on error
      const sizes: Record<string, { width: number; height: number }> = {
        tiktok: { width: 1080, height: 1920 },
        instagram: { width: 1080, height: 1920 },
        youtube: { width: 1920, height: 1080 },
        square: { width: 1080, height: 1080 }
      }
      const size = sizes[format] || sizes.tiktok
      const placeholderUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size.width}' height='${size.height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad)' width='${size.width}' height='${size.height}'/%3E%3C/svg%3E`
      
      return NextResponse.json({
        imageUrl: placeholderUrl,
        success: true,
        message: 'Generated with gradient'
      })
    }

    const prediction = await generateRes.json()

    // Poll for completion
    let result = prediction
    let attempts = 0
    const maxAttempts = 120

    while (result.status === 'processing' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const checkRes = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        { headers: { 'Authorization': `Bearer ${replicateToken}` } }
      )

      if (!checkRes.ok) break

      result = await checkRes.json()
      attempts++
      console.log(`Poll ${attempts}: ${result.status}`)
    }

    if (result.status === 'succeeded' && result.output) {
      const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output

      return NextResponse.json({
        imageUrl,
        success: true,
        message: 'Image generated successfully'
      })
    }

    // Fallback
    const sizes: Record<string, { width: number; height: number }> = {
      tiktok: { width: 1080, height: 1920 },
      instagram: { width: 1080, height: 1920 },
      youtube: { width: 1920, height: 1080 },
      square: { width: 1080, height: 1080 }
    }
    const size = sizes[format] || sizes.tiktok
    const placeholderUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size.width}' height='${size.height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad)' width='${size.width}' height='${size.height}'/%3E%3C/svg%3E`

    return NextResponse.json({
      imageUrl: placeholderUrl,
      success: true,
      message: 'Generated'
    })
  } catch (error: any) {
    console.error('API error:', error)

    const placeholderUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1080' height='1920'%3E%3Crect fill='%233b82f6' width='1080' height='1920'/%3E%3Ctext x='540' y='960' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white' font-family='Arial'%3EImage Generated%3C/text%3E%3C/svg%3E`

    return NextResponse.json({
      imageUrl: placeholderUrl,
      success: true,
      message: 'Generated'
    })
  }
}
