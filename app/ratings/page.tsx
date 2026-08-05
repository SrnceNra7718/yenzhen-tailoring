'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import { StarIcon } from '@/components/ui/star-icon'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export default function RatingsPage() {
  const [ratings, setRatings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchRatings() {
      try {
        const { data, error } = await supabase
          .from('ratings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) throw error
        setRatings(data || [])
      } catch (err) {
        console.error('Error fetching ratings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRatings()
  }, [])

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
      : '0.0'

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold gradient-text tracking-tight mb-4">
            Customer Ratings
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers are saying about our custom sportswear.
          </p>
        </div>
      </section>

      {/* Overall Rating */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 bg-dark-800 rounded-2xl px-8 py-6 border border-border/50">
              <span className="font-display text-6xl font-extrabold gradient-text">
                {averageRating}
              </span>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => {
                    const filled = i < Math.round(parseFloat(averageRating))
                    return (
                      <StarIcon
                        key={i}
                        className={`h-6 w-6 ${filled ? 'text-brand-400 fill-brand-400' : 'text-muted-foreground/30'}`}
                      />
                    )
                  })}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {ratings.length} review{ratings.length !== 1 && 's'}
                </p>
              </div>
            </div>
          </div>

          {/* Rating breakdown */}
          <div className="max-w-md mx-auto mb-16">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratings.filter((r) => r.stars === stars).length
              const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0
              return (
                <div key={stars} className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-muted-foreground w-12">
                    {stars} stars
                  </span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: stars * 0.1 }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Individual reviews */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : ratings.length === 0 ? (
            <div className="text-center py-20">
              <StarIcon className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground">
                No ratings yet
              </h3>
              <p className="text-muted-foreground/70 mt-2">
                Check back soon for customer reviews.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ratings.map((rating, index) => (
                <motion.div
                  key={rating.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="glass-card border-white/5 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${i < rating.stars ? 'text-brand-400 fill-brand-400' : 'text-muted-foreground/30'}`}
                          />
                        ))}
                      </div>
                      {rating.review_text && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                          &ldquo;{rating.review_text}&rdquo;
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {rating.customer_name || 'Anonymous'}
                        </span>
                        {rating.product_id && (
                          <Badge variant="outline" className="text-xs">
                            Product Review
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {rating.created_at
                          ? new Date(rating.created_at).toLocaleDateString()
                          : 'Date unknown'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}