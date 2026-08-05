'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import {
  DollarSign,
  FileText,
  ShoppingBag,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Send,
  Package,
  Image,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

export default function AdminDashboardPage() {
  const supabase = createClient()

  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalGallery: 0,
    totalTemplates: 0,
    totalCategories: 0,
  })
  const [recentQuotes, setRecentQuotes] = useState<any[]>([])
  const [recentMessages, setRecentMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Quote stats
        const { data: quotesData, error: quotesError } = await supabase
          .from('quote_requests')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

if (!quotesError && quotesData) {
           setRecentQuotes(quotesData)
           setStats((prev) => ({
             ...prev,
             totalQuotes: quotesData.length,
             pendingQuotes: quotesData.filter((q: any) => q.status === 'pending').length,
           }))
        }

        // Count all quotes
        const { count: totalQuoteCount } = await supabase
          .from('quote_requests')
          .select('*', { count: 'exact', head: true })

        if (totalQuoteCount !== null) {
          setStats((prev) => ({ ...prev, totalQuotes: totalQuoteCount }))
        }

        // Pending count
        const { count: pendingCount } = await supabase
          .from('quote_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')

        if (pendingCount !== null) {
          setStats((prev) => ({ ...prev, pendingQuotes: pendingCount }))
        }

        // Messages
        const { data: msgsData } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        if (msgsData) {
          setRecentMessages(msgsData)
        }

        const { count: totalMsgCount } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })

        const { count: unreadCount } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('is_read', false)

        setStats((prev) => ({
          ...prev,
          totalMessages: totalMsgCount || 0,
          unreadMessages: unreadCount || 0,
        }))

        // Gallery count
        const { count: galleryCount } = await supabase
          .from('gallery_images')
          .select('*', { count: 'exact', head: true })

        // Templates count
        const { count: templateCount } = await supabase
          .from('templates')
          .select('*', { count: 'exact', head: true })

        // Categories count
        const { count: catCount } = await supabase
          .from('product_categories')
          .select('*', { count: 'exact', head: true })

        setStats((prev) => ({
          ...prev,
          totalGallery: galleryCount || 0,
          totalTemplates: templateCount || 0,
          totalCategories: catCount || 0,
        }))
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statusConfig: Record<
    string,
    { color: string; icon: any; label: string }
  > = {
    pending: {
      color: 'text-yellow-500',
      icon: Clock,
      label: 'Pending',
    },
    contacted: {
      color: 'text-blue-500',
      icon: AlertCircle,
      label: 'Contacted',
    },
    converted: {
      color: 'text-green-500',
      icon: CheckCircle2,
      label: 'Converted',
    },
    rejected: {
      color: 'text-red-500',
      icon: XCircle,
      label: 'Rejected',
    },
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-3xl font-bold gradient-text">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of your YenZhen Tailoring management panel.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? [...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))
          : [
              {
                title: 'Total Quotes',
                value: stats.totalQuotes,
                icon: FileText,
                gradient: 'from-brand-400 to-brand-600',
              },
              {
                title: 'Pending Quotes',
                value: stats.pendingQuotes,
                icon: Clock,
                gradient: 'from-yellow-400 to-yellow-600',
              },
              {
                title: 'Total Messages',
                value: stats.totalMessages,
                icon: Users,
                gradient: 'from-blue-400 to-blue-600',
              },
              {
                title: 'Unread Messages',
                value: stats.unreadMessages,
                icon: AlertCircle,
                gradient: 'from-red-400 to-red-600',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card border-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-15`}>
                        <stat.icon className={`h-6 w-6 ${stat.gradient.replace('from-', 'text-').replace(' to-brand-600', '')}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {stat.title}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-3xl font-extrabold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Quotes */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-lg gradient-text">
              Recent Quote Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : recentQuotes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No quote requests yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentQuotes.slice(0, 5).map((quote) => {
                  const statusInfo =
                    statusConfig[quote.status] || statusConfig.pending
                  const StatusIcon = statusInfo.icon
                  return (
                    <div
                      key={quote.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-dark-800 border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br from-brand-900/50 to-dark-800`}
                        >
                          <FileText className="h-4 w-4 text-brand-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {quote.customer_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {quote.product_type} • {quote.quantity} pcs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            quote.status === 'pending'
                              ? 'secondary'
                              : quote.status === 'converted'
                              ? 'brand'
                              : 'outline'
                          }
                          className="text-xs"
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-lg gradient-text">
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : recentMessages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No messages yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentMessages.slice(0, 5).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-colors duration-200 ${
                      msg.is_read
                        ? 'bg-dark-800 border-border/50'
                        : 'bg-brand-500/5 border-brand-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          msg.is_read
                            ? 'bg-gradient-to-br from-brand-900/50 to-dark-800'
                            : 'bg-brand-500/10'
                        }`}
                      >
                        <Send className="h-4 w-4 text-brand-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {msg.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                    {!msg.is_read && (
                      <Badge variant="brand" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gallery & Template summary */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            label: 'Gallery Images',
            value: stats.totalGallery,
            icon: Image,
          },
          {
            label: 'Templates',
            value: stats.totalTemplates,
            icon: Package,
          },
          {
            label: 'Categories',
            value: stats.totalCategories,
            icon: ShoppingBag,
          },
        ].map((item) => (
          <Card key={item.label} className="glass-card border-white/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-brand-900/50 to-dark-800">
                <item.icon className="h-6 w-6 text-brand-400" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground">
                  {item.value}
                </p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}