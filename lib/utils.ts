import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function generateQuoteId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6)
  return `Q-${timestamp}-${random}`
}

export function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function getDirectImageUrl(oneDriveUrl: string): string {
  if (isValidHttpUrl(oneDriveUrl)) {
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.bmp',
      '.tiff',
    ]
    const lowercaseUrl = oneDriveUrl.toLowerCase()
    if (imageExtensions.some((ext) => lowercaseUrl.includes(ext))) {
      return oneDriveUrl
    }
  }
  return oneDriveUrl
}