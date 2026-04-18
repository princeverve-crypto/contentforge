/**
 * Authentication Configuration
 * Supports Google OAuth + Email/Password with Supabase
 */

export const authConfig = {
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
  },
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/google/callback`
  },
  providers: ['google', 'email']
}

// User roles for admin access
export const UserRoles = {
  ADMIN: 'admin',
  PRO: 'pro',
  CREATOR: 'creator',
  FREE: 'free'
}

// Admin access secret
export const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'changeme_in_production'
