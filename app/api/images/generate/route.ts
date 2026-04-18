/**
 * Image Generation Endpoint - Returns proper SVG response
 * GET /api/images/generate?caption=...&format=...&style=...
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateSVGImage } from '@/app/lib/image-generator-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const caption = searchParams.get('caption') || 'ContentForge'
    const format = searchParams.get('format') || 'tiktok'
    const style = searchParams.get('style') || 'professional'

    // Generate SVG
    const svgUrl = generateSVGImage(caption, format, style)

    // Extract base64 from data URL
    const base64Data = svgUrl.split(',')[1]
    const svgBuffer = Buffer.from(base64Data, 'base64')

    // Return as proper SVG
    return new NextResponse(svgBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'Content-Length': svgBuffer.length.toString()
      }
    })
  } catch (error: any) {
    console.error('Image generation error:', error)
    return new NextResponse(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">
        <rect width="1080" height="1920" fill="#0a0e27"/>
        <text x="540" y="960" text-anchor="middle" font-size="48" fill="white" font-family="Arial">
          Image Generation Failed
        </text>
      </svg>`,
      {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    )
  }
}
