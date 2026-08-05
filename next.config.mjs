/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**/*.live.com',
      },
      {
        protocol: 'https',
        hostname: '**/*.sharepoint.com',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig