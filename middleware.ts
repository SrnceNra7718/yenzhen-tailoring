import { createServerClient } from './app/supabase/client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
  '/',
  '/catalog',
  '/catalog/*',
  '/gallery',
  '/templates',
  '/quote',
  '/sizing',
  '/contact',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
]

const adminRoutes = ['/admin', '/admin/*']

const isAdminRoute = (pathname: string) => {
  return adminRoutes.some((route) => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1))
    }
    return pathname === route
  })
}

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1))
    }
    return pathname === route
  })
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Admin routes require authentication
  if (isAdminRoute(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  // Ensure admin routes go to /admin/dashboard when logged in as admin
  if (pathname === '/admin' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}