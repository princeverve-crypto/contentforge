import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('auth_token')?.value

  // Protected routes
  if (pathname.startsWith('/studio') || pathname.startsWith('/analytics') || pathname.startsWith('/settings')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*', '/analytics/:path*', '/settings/:path*']
}
