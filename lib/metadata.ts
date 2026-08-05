'use server'

import type { Metadata } from 'next'

export function constructMetadata({
  title = 'YENZHEN TAILORING',
  description = 'Premium custom sublimation sportswear by YenZhen Tailoring.',
  image = '/og-image.png',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: title === 'YENZHEN TAILORING' ? '%s | YENZHEN TAILORING' : `${title} | YENZHEN TAILORING`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
  }
}