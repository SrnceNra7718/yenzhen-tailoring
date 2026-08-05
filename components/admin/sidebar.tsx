'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/app/supabase/client'
import {
  Home,
  Package,
  ShoppingBag,
  Image,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  FileText,
  Send,
  CheckCircle2,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: any
  count?: number
}

interface SidebarProps {
  user: any
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Quote Requests', href: '/admin/quotes', icon: FileText },
  { name: 'Messages', href: '/admin/messages', icon: Send },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
  { name: 'Templates', href: '/admin/templates', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: ShoppingBag },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function Sidebar({ user }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin')
  }

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close mobile sidebar on click outside
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-card/80 backdrop-blur-md border border-border/50"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 border-r border-border/50 bg-card/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg gradient-text">
                YENZHEN
              </span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Admin info */}
          <div className="px-4 py-4 border-b border-border/50">
            <p className="text-xs text-muted-foreground">Logged in as</p>
            <p className="text-sm font-medium truncate">{user.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/10'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-border/50 p-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Log Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}