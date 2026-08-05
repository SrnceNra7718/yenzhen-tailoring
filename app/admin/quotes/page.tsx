'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Mail,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface QuoteRequest {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  product_type: string | null
  quantity: number | null
  fabric_options: string | null
  printing_type: string | null
  estimated_price: string | null
  message: string | null
  status: string
  created_at: string
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'converted', label: 'Converted' },
  { value: 'rejected', label: 'Rejected' },
]

const statusConfig: Record<
  string,
  { color: string; bg: string; icon: any; label: string }
> = {
  pending: {
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    icon: Clock,
    label: 'Pending',
  },
  contacted: {
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    icon: AlertCircle,
    label: 'Contacted',
  },
  converted: {
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    icon: CheckCircle2,
    label: 'Converted',
  },
  rejected: {
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    icon: XCircle,
    label: 'Rejected',
  },
}

const ITEMS_PER_PAGE = 10

export default function AdminQuotesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchQuotes()
  }, [])

  useEffect(() => {
    filterQuotes()
  }, [quotes, searchTerm, statusFilter, sortOrder])

  async function fetchQuotes() {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuotes(data || [])
      setTotalCount(data?.length || 0)
    } catch (err) {
      console.error('Error fetching quotes:', err)
    } finally {
      setLoading(false)
    }
  }

  function filterQuotes() {
    let result = [...quotes]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (q) =>
          q.customer_name.toLowerCase().includes(term) ||
          q.customer_email.toLowerCase().includes(term) ||
          (q.product_type && q.product_type.toLowerCase().includes(term))
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter((q) => q.status === statusFilter)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

    setFilteredQuotes(result)
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status } : q))
      )
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const totalPages = Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE)
  const paginatedQuotes = filteredQuotes.slice(
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
            Quote Requests
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and track quote requests from customers. Total: {totalCount}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchQuotes}>
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
                  placeholder="Search by name, email, or product..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v)
                  setPage(1)
                }}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
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

      {/* Quotes table */}
      <div className="space-y-4">
        {paginatedQuotes.length === 0 ? (
          <Card className="glass-card border-white/5">
            <CardContent className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-medium text-muted-foreground">
                No quote requests found
              </h3>
              <p className="text-sm text-muted-foreground/70">
                Try adjusting your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          paginatedQuotes.map((quote) => {
            const statusInfo = statusConfig[quote.status] || statusConfig.pending
            const StatusIcon = statusInfo.icon
            return (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card border-white/5 hover:border-border/80 transition-all duration-200">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {quote.customer_name}
                          </h3>
                          <Badge
                            variant={
                              quote.status === 'pending'
                                ? 'secondary'
                                : quote.status === 'converted'
                                ? 'brand'
                                : 'outline'
                            }
                            className="text-xs whitespace-nowrap"
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {quote.customer_email}
                          </span>
                          {quote.customer_phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {quote.customer_phone}
                            </span>
                          )}
                          {quote.product_type && (
                            <span>• {quote.product_type}</span>
                          )}
                          {quote.quantity && (
                            <span>• Qty: {quote.quantity}</span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-medium">
                          {quote.estimated_price}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedQuote(quote)
                            setIsDetailOpen(true)
                          }}
                        >
                          View Details
                        </Button>

                        {quote.status === 'pending' && (
                          <Select
                            value="pending"
                            onValueChange={(val) =>
                              updateStatus(quote.id, val)
                            }
                            className="w-32"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="rejected">Rejected</option>
                          </Select>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
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
              Quote Request Details
            </DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name</span>
                  <p className="font-medium">{selectedQuote.customer_name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email</span>
                  <p className="font-medium">{selectedQuote.customer_email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone</span>
                  <p className="font-medium">
                    {selectedQuote.customer_phone || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <p className="font-medium capitalize">
                    {selectedQuote.status}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Product</span>
                  <p className="font-medium">
                    {selectedQuote.product_type || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity</span>
                  <p className="font-medium">
                    {selectedQuote.quantity || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fabric</span>
                  <p className="font-medium">
                    {selectedQuote.fabric_options || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Printing</span>
                  <p className="font-medium">
                    {selectedQuote.printing_type || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Estimate</span>
                  <p className="font-medium">
                    {selectedQuote.estimated_price || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date</span>
                  <p className="font-medium">
                    {new Date(
                      selectedQuote.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {selectedQuote.message && (
                <div className="bg-muted rounded-xl p-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Message
                  </span>
                  <p className="mt-1 text-sm">{selectedQuote.message}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}