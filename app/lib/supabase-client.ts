import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Save generated post
export async function savePost({
  userId,
  caption,
  imageUrl,
  videoUrl,
  format = 'tiktok',
  platforms = ['tiktok', 'instagram']
}: {
  userId: string
  caption: string
  imageUrl?: string
  videoUrl?: string
  format?: string
  platforms?: string[]
}) {
  const { data, error } = await supabase.from('posts').insert([
    {
      user_id: userId,
      caption,
      image_url: imageUrl,
      video_url: videoUrl,
      format,
      platforms,
      status: 'draft'
    }
  ]).select()

  if (error) throw error
  return data?.[0]
}

// Get user's posts
export async function getUserPosts(userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Update post status
export async function updatePostStatus(postId: string, status: string) {
  const { data, error } = await supabase
    .from('posts')
    .update({ status, updated_at: new Date() })
    .eq('id', postId)
    .select()

  if (error) throw error
  return data?.[0]
}

// Schedule post
export async function schedulePost(
  postId: string,
  scheduledFor: string,
  platforms: string[]
) {
  const { data, error } = await supabase
    .from('posts')
    .update({
      scheduled_for: scheduledFor,
      platforms,
      status: 'scheduled',
      updated_at: new Date()
    })
    .eq('id', postId)
    .select()

  if (error) throw error
  return data?.[0]
}

// Track analytics
export async function trackAnalytics(postId: string, platform: string, metrics: any) {
  const { data, error } = await supabase
    .from('analytics')
    .insert([
      {
        post_id: postId,
        platform,
        ...metrics
      }
    ])
    .select()

  if (error) throw error
  return data?.[0]
}
