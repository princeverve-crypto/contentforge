import { NextRequest, NextResponse } from 'next/server'

// In-memory scheduled posts (upgrade to Supabase later)
const scheduledPosts: Record<string, any[]> = {}

export async function POST(request: NextRequest) {
  try {
    const { userId, imageUrl, caption, platforms, scheduledAt, format = 'tiktok' } = await request.json()

    if (!userId || !imageUrl || !caption || !platforms || !scheduledAt) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, imageUrl, caption, platforms, scheduledAt' },
        { status: 400 }
      )
    }

    // Validate scheduled time is in future
    const scheduledTime = new Date(scheduledAt)
    if (scheduledTime <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      )
    }

    // Initialize user's scheduled posts array if needed
    if (!scheduledPosts[userId]) {
      scheduledPosts[userId] = []
    }

    // Create scheduled post object
    const post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      imageUrl,
      caption,
      platforms,
      format,
      scheduledAt,
      status: 'scheduled', // scheduled, posted, failed
      createdAt: new Date().toISOString(),
      postedAt: null,
      error: null
    }

    scheduledPosts[userId].push(post)

    return NextResponse.json({
      success: true,
      message: 'Post scheduled successfully',
      post,
      scheduledFor: new Date(scheduledAt).toLocaleString()
    })
  } catch (error: any) {
    console.error('Schedule error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to schedule post' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId required' },
        { status: 400 }
      )
    }

    const userPosts = scheduledPosts[userId] || []
    const pending = userPosts.filter(p => p.status === 'scheduled')
    const posted = userPosts.filter(p => p.status === 'posted')

    return NextResponse.json({
      pending,
      posted,
      total: userPosts.length
    })
  } catch (error: any) {
    console.error('Get scheduled error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { postId, userId } = await request.json()

    if (!userId || !postId) {
      return NextResponse.json(
        { error: 'userId and postId required' },
        { status: 400 }
      )
    }

    if (scheduledPosts[userId]) {
      scheduledPosts[userId] = scheduledPosts[userId].filter(p => p.id !== postId)
    }

    return NextResponse.json({
      success: true,
      message: 'Scheduled post deleted'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// Export for cron access
export function getScheduledPosts() {
  return scheduledPosts
}
