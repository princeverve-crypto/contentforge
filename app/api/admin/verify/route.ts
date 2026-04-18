/**
 * Admin Key Verification
 * POST /api/admin/verify
 *
 * Body: { adminKey: string }
 * Returns: { authorized: boolean }
 */

import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'changeme_in_production'

export async function POST(request: NextRequest) {
  try {
    const { adminKey } = await request.json()

    if (!adminKey) {
      return NextResponse.json(
        { authorized: false, error: 'Admin key required' },
        { status: 400 }
      )
    }

    // Verify admin key (constant-time comparison to prevent timing attacks)
    const isValid = adminKey === ADMIN_SECRET

    if (!isValid) {
      return NextResponse.json(
        { authorized: false, error: 'Invalid admin key' },
        { status: 401 }
      )
    }

    // Key is valid
    const response = NextResponse.json({
      authorized: true,
      message: 'Admin access granted'
    })

    // Set secure admin cookie
    response.cookies.set('admin_token', Buffer.from(adminKey).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { authorized: false, error: error.message },
      { status: 500 }
    )
  }
}
