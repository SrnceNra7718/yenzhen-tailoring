import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'YENZHEN TAILORING | Premium Custom Sportswear',
    template: '%s | YENZHEN TAILORING',
  },
  description:
    'YenZhen Tailoring – Premium custom sublimation sportswear. Basketball jerseys, shorts, hoodies, tank tops, and muse uniforms. Request your free quote today!',
  keywords: [
    'custom basketball jerseys',
    'sublimation sportswear',
    'custom athletic wear',
    'basketball uniforms',
    'sportswear manufacturer',
    'custom hoodie printing',
  ],
  authors: [{ name: 'YenZhen Tailoring' }],
  creator: 'YenZhen Tailoring',
  publisher: 'YenZhen Tailoring',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yenzhen-tailoring.vercel.app',
    title: 'YENZHEN TAILORING | Premium Custom Sportswear',
    description:
      'Premium custom sublimation sportswear – basketball jerseys, shorts, hoodies, and more. Quality you can feel, style you can see.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YenZhen Tailoring - Premium Custom Sportswear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YENZHEN TAILORING | Premium Custom Sportswear',
    description:
      'Premium custom sublimation sportswear – basketball jerseys, shorts, hoodies, and more.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://yenzhen-tailoring.vercel.app',
  },
}

export const viewport: Viewport = {
  themeColor: '#e4a31c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={cn(
          inter.variable,
          displayFont.variable,
          'font-sans antialiased bg-background'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="yenzhen-theme"
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

function Toaster() {
  return null
}