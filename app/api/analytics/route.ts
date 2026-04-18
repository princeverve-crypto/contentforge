import { NextRequest, NextResponse } from 'next/server'

// In-memory analytics store
const analytics: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const { action, postId, userId, impression, event } = await request.json()

    if (action === 'track') {
      if (!analytics[postId]) {
        analytics[postId] = {
          postId,
          userId,
          impressions: 0,
          clicks: 0,
          saves: 0,
          shares: 0,
          lastUpdated: new Date().toISOString()
        }
      }

      const post = analytics[postId]
      if (event === 'impression') post.impressions++
      if (event === 'click') post.clicks++
      if (event === 'save') post.saves++
      if (event === 'share') post.shares++
      post.lastUpdated = new Date().toISOString()

      return NextResponse.json({
        success: true,
        event: event,
        postId: postId
      })
    }

    if (action === 'get') {
      const post = analytics[postId]
      return NextResponse.json({
        postId,
        ...post,
        engagement_rate: post
          ? ((post.clicks + post.saves + post.shares) / Math.max(post.impressions, 1) * 100).toFixed(2) + '%'
          : '0%'
      })
    }

    if (action === 'get_all') {
      if (!userId) {
        return NextResponse.json(
          { error: 'userId required' },
          { status: 400 }
        )
      }

      // Get all posts by user
      const userPosts = Object.values(analytics)
        .filter((p: any) => p.userId === userId)
        .sort((a: any, b: any) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())

      const totalImpressions = userPosts.reduce((sum: number, p: any) => sum + p.impressions, 0)
      const avgEngagement = userPosts.length > 0
        ? (userPosts.reduce((sum: number, p: any) => sum + ((p.clicks + p.saves + p.shares) / Math.max(p.impressions, 1)), 0) / userPosts.length * 100).toFixed(2)
        : '0'

      return NextResponse.json({
        posts: userPosts,
        summary: {
          totalPosts: userPosts.length,
          totalImpressions,
          avgEngagement: avgEngagement + '%'
        }
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const userId = searchParams.get('userId')

    if (postId) {
      const post = analytics[postId]
      return NextResponse.json({
        postId,
        ...post,
        engagement_rate: post
          ? ((post.clicks + post.saves + post.shares) / Math.max(post.impressions, 1) * 100).toFixed(2) + '%'
          : '0%'
      })
    }

    if (userId) {
      const userPosts = Object.values(analytics)
        .filter((p: any) => p.userId === userId)
        .sort((a: any, b: any) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())

      const totalImpressions = userPosts.reduce((sum: number, p: any) => sum + p.impressions, 0)
      const avgEngagement = userPosts.length > 0
        ? (userPosts.reduce((sum: number, p: any) => sum + ((p.clicks + p.saves + p.shares) / Math.max(p.impressions, 1)), 0) / userPosts.length * 100).toFixed(2)
        : '0'

      return NextResponse.json({
        posts: userPosts,
        summary: {
          totalPosts: userPosts.length,
          totalImpressions,
          avgEngagement: avgEngagement + '%'
        }
      })
    }

    return NextResponse.json(
      { error: 'postId or userId required' },
      { status: 400 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
