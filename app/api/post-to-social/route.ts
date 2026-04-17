import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, caption, platforms = ['tiktok', 'instagram', 'youtube'], schedule = false } = await request.json()

    if (!imageUrl || !caption) {
      return NextResponse.json(
        { error: 'Image URL and caption required' },
        { status: 400 }
      )
    }

    const postizToken = process.env.POSTIZ_API_KEY
    if (!postizToken) {
      return NextResponse.json(
        { error: 'Postiz not configured' },
        { status: 500 }
      )
    }

    try {
      // Post to Postiz API
      const postizRes = await fetch('https://app.postiz.com/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${postizToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          caption: caption,
          media: [{ url: imageUrl, type: 'image' }],
          platforms: platforms,
          scheduleFor: schedule ? new Date(Date.now() + 3600000).toISOString() : null,
          publishNow: !schedule
        })
      })

      if (!postizRes.ok) {
        const error = await postizRes.json()
        console.error('Postiz error:', error)
        return NextResponse.json(
          { error: 'Failed to post to social media' },
          { status: 500 }
        )
      }

      const result = await postizRes.json()

      return NextResponse.json({
        success: true,
        message: `Posted to ${platforms.join(', ')}`,
        result
      })
    } catch (postError: any) {
      console.error('Postiz integration error:', postError)
      return NextResponse.json(
        { error: 'Failed to connect to Postiz' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Post to social error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to post' },
      { status: 500 }
    )
  }
}
