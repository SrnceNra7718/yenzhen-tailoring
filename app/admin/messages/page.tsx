'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import {
  Send,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Eye,
  MessageCircle,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}

const ITEMS_PER_PAGE = 10

export default function AdminMessagesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    filterMessages()
  }, [messages, searchTerm, sortOrder])

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
      setTotalCount(data?.length || 0)

      const unread = data?.filter((m) => !m.is_read).length || 0
      setUnreadCount(unread)
    } catch (err) {
      console.error('Error fetching messages:', err)
    } finally {
      setLoading(false)
    }
  }

  function filterMessages() {
    let result = [...messages]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.email.toLowerCase().includes(term) ||
          m.message.toLowerCase().includes(term)
      )
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

    setFilteredMessages(result)
  }

  async function markAsRead(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !currentStatus } : m))
      )
      setUnreadCount((prev) => (currentStatus ? prev - 1 : prev + 1))
    } catch (err) {
      console.error('Error updating message:', err)
    }
  }

  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE)
  const paginatedMessages = filteredMessages.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold gradient-text">
            Contact Messages
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage messages from customers. {unreadCount} unread.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchMessages}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="glass-card border-white/5">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or message..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
              }
            >
              {sortOrder === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
              <span className="ml-2">Newest</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages table */}
      <div className="space-y-4">
        {paginatedMessages.length === 0 ? (
          <Card className="glass-card border-white/5">
            <CardContent className="p-12 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-medium text-muted-foreground">
                No messages found
              </h3>
              <p className="text-sm text-muted-foreground/70">
                Try adjusting your search.
              </p>
            </CardContent>
          </Card>
        ) : (
          paginatedMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={cn(
                  'glass-card border-white/5 hover:border-border/80 transition-all duration-200 cursor-pointer',
                  !msg.is_read && 'border-brand-500/20 bg-brand-500/5'
                )}
                onClick={() => {
                  setSelectedMessage(msg)
                  setIsDetailOpen(true)
                  if (!msg.is_read) {
                    markAsRead(msg.id, msg.is_read)
                  }
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {msg.name}
                        </h3>
                        {!msg.is_read && (
                          <Badge variant="brand" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {msg.email}
                        </span>
                        {msg.phone && (
                          <span className="flex items-center gap-1">
                            <Send className="h-3 w-3" />
                            {msg.phone}
                          </span>
                        )}
                        <span className="text-xs">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!msg.is_read && (
                        <Eye className="h-4 w-4 text-brand-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display gradient-text">
              Message from {selectedMessage?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name</span>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email</span>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone</span>
                  <p className="font-medium">
                    {selectedMessage.phone || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date</span>
                  <p className="font-medium">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="bg-muted rounded-xl p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Message
                </span>
                <p className="mt-2 text-sm whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `mailto:${selectedMessage.email}`)
                  }
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}