import { NextResponse } from 'next/server'

export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://yenzhen-tailoring.vercel.app/sitemap.xml

User-agent: *
Disallow: /admin/
Disallow: /api/
`
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=86400',
    },
  })
}
