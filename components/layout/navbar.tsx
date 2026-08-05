'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Catalog', href: '/catalog' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Templates', href: '/templates' },
  { name: 'Quote', href: '/quote' },
  { name: 'Sizing Guide', href: '/sizing' },
  { name: 'Contact', href: '/contact' },
  { name: 'Ratings', href: '/ratings' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl border-border/50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">
            YENZHEN
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50 rounded-md px-3 py-2 duration-200',
                  isActive &&
                    'text-foreground bg-accent/50'
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:block">
          <Link href="/quote">
            <button className="inline-flex items-center justify-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 hover:shadow-xl">
              Get a Quote
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}