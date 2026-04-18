import { NextRequest, NextResponse } from 'next/server'

// In-memory store (same as schedule-post)
const scheduledPosts: Record<string, any[]> = {}

export const maxDuration = 60 // Max 60 seconds for cron job

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (Vercel automatically sets CRON_SECRET)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const now = new Date()
    let processedCount = 0
    let failedCount = 0

    // Iterate through all users' scheduled posts
    for (const userId in scheduledPosts) {
      const userPosts = scheduledPosts[userId]

      for (let i = 0; i < userPosts.length; i++) {
        const post = userPosts[i]

        // Check if post is ready to be posted
        if (post.status === 'scheduled' && new Date(post.scheduledAt) <= now) {
          try {
            // Call the post-to-social API
            const postRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/post-to-social`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                imageUrl: post.imageUrl,
                caption: post.caption,
                platforms: post.platforms,
                schedule: false // Already scheduled, execute immediately
              })
            })

            if (postRes.ok) {
              post.status = 'posted'
              post.postedAt = new Date().toISOString()
              processedCount++
              console.log(`✅ Posted: ${post.id}`)
            } else {
              const error = await postRes.text()
              post.status = 'failed'
              post.error = error
              failedCount++
              console.error(`❌ Failed: ${post.id}`, error)
            }
          } catch (error: any) {
            post.status = 'failed'
            post.error = error.message
            failedCount++
            console.error(`❌ Error posting ${post.id}:`, error)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cron job executed',
      processed: processedCount,
      failed: failedCount,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Cron error:', error)
    return NextResponse.json(
      { error: error.message || 'Cron job failed' },
      { status: 500 }
    )
  }
}
