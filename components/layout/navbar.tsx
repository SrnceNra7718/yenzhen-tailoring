'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/data/navigation'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [pathname])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-gold-500 shadow-lg shadow-brand-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold gradient-text">
            YENZHEN
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'nav-link',
                  isActive && 'nav-link-active'
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:block">
          <Link
            href="/#contact"
            className="btn-primary text-sm py-2 px-5 inline-flex items-center"
          >
            Get a Quote
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block w-full text-left rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="btn-primary w-full mt-4 text-sm py-2.5 inline-flex items-center justify-center"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}