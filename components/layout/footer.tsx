'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const footerLinks = {
  shop: [
    { name: 'Basketball Jerseys', href: '/catalog/basketball-jersey' },
    { name: 'Shorts', href: '/catalog/shorts' },
    { name: 'Hoodies', href: '/catalog/hoodie' },
    { name: 'Sando', href: '/catalog/sando' },
    { name: 'Muse Uniform', href: '/catalog/muse-uniform' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Sizing Guide', href: '/sizing' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Templates', href: '/templates' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Mail, href: 'mailto:hello@yenzhen.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="mb-12 rounded-2xl border border-border/50 bg-gradient-to-br from-brand-500/10 to-accent/10 p-8 text-center">
          <h3 className="mb-2 font-display text-2xl font-bold gradient-text">
            Stay in the Loop
          </h3>
          <p className="mb-4 text-muted-foreground">
            Get exclusive deals, new product drops, and design tips.
          </p>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              placeholder="your@email.com"
              className="flex h-11 w-full rounded-full border border-input bg-background px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <button className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                {key}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} YenZhen Tailoring. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-muted-foreground transition-colors hover:text-brand-400"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}