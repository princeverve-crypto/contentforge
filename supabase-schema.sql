-- ContentForge Database Schema
-- Supabase PostgreSQL

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'creator', -- creator, pro, enterprise
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  caption TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  format TEXT DEFAULT 'tiktok', -- tiktok, instagram, youtube, twitter, linkedin
  status TEXT DEFAULT 'draft', -- draft, scheduled, published, failed
  scheduled_for TIMESTAMP,
  published_at TIMESTAMP,
  platforms TEXT[] DEFAULT ARRAY[]::TEXT[], -- platforms to post to
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id),
  platform TEXT,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  clicks INT DEFAULT 0,
  revenue DECIMAL DEFAULT 0,
  tracked_at TIMESTAMP DEFAULT now()
);

-- Generated content cache
CREATE TABLE generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  prompt TEXT,
  image_url TEXT,
  video_url TEXT,
  caption TEXT,
  format TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Scheduled posts queue
CREATE TABLE scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  post_id UUID REFERENCES posts(id),
  scheduled_for TIMESTAMP NOT NULL,
  platforms TEXT[] NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, published, failed
  error_message TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- API usage tracking
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  endpoint TEXT,
  model TEXT,
  tokens_used INT,
  cost DECIMAL,
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_for ON posts(scheduled_for);
CREATE INDEX idx_analytics_post_id ON analytics(post_id);
CREATE INDEX idx_scheduled_posts_user_id ON scheduled_posts(user_id);
CREATE INDEX idx_scheduled_posts_scheduled_for ON scheduled_posts(scheduled_for);
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only see their own data)
CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);
