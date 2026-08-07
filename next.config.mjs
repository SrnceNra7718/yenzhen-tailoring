/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  redirects: async () => {
    return [
      { source: '/catalog', destination: '/products', permanent: true },
      { source: '/catalog/:slug', destination: '/products', permanent: true },
      { source: '/quote', destination: '/#contact', permanent: true },
      { source: '/templates', destination: '/products', permanent: true },
      { source: '/sizing', destination: '/about', permanent: true },
      { source: '/ratings', destination: '/about', permanent: true },
      { source: '/admin', destination: '/', permanent: false },
      { source: '/admin/:path*', destination: '/', permanent: false },
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig
