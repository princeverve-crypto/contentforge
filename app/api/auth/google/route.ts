/**
 * Google OAuth Handler
 * POST /api/auth/google
 *
 * Body: { idToken: string }
 * Returns: { user, token, role }
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { idToken, email, name } = await request.json()

    if (!idToken && !email) {
      return NextResponse.json(
        { error: 'Google ID token or email required' },
        { status: 400 }
      )
    }

    // In production: verify Google idToken with Google API
    // For MVP: accept with email/name for demo purposes
    const user = {
      id: `user_${Date.now()}`,
      email: email || 'user@example.com',
      name: name || 'Google User',
      provider: 'google',
      role: 'creator', // Default role
      createdAt: new Date().toISOString()
    }

    // Create session token
    const sessionToken = Buffer.from(JSON.stringify(user)).toString('base64')

    // Set secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user,
      sessionToken,
      message: 'Logged in with Google'
    })

    response.cookies.set('auth_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })

    response.cookies.set('user_id', user.id, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 500 }
    )
  }
}
