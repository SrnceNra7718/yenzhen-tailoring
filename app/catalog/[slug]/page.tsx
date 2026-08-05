'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { notFound, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingCart, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function CategoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [category, setCategory] = useState<any>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error || !data) {
          notFound()
          return
        }
        setCategory(data)
        if (data.material_options?.[0]) {
          setSelectedMaterial(data.material_options[0])
        }
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [slug])

  if (loading) {
    return (
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <Skeleton className="aspect-square w-96 rounded-xl" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-11 w-48" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!category) return null

  const materials = category.material_options || []
  const estimatedPrice = selectedMaterial === 'Spandex'
    ? (category.base_price * 1.2 * quantity).toFixed(2)
    : (category.base_price * quantity).toFixed(2)

  return (
    <main className="pt-16">
      {/* Breadcrumb */}
      <nav className="bg-muted/30 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              onClick={() => router.back()}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span>/</span>
            <span className="text-foreground">Catalog</span>
            <span>/</span>
            <span className="text-foreground font-medium">{category.name}</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden glass-card border-white/5">
                <div className="aspect-square relative overflow-hidden">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-900/20 to-dark-800">
                      <span className="font-display text-6xl font-bold text-brand-400">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div>
                  <Badge variant="brand" className="mb-3">
                    Product Category
                  </Badge>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight gradient-text">
                    {category.name}
                  </h1>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {category.description ||
                    'Premium quality custom sportswear designed for performance and comfort.'}
                </p>

                {/* Base Price */}
                <div className="bg-dark-800 rounded-xl p-4 border border-border/50">
                  <span className="text-sm text-muted-foreground">
                    Base Price:
                  </span>
                  <span className="ml-2 font-display text-2xl font-bold text-brand-400">
                    ${category.base_price.toFixed(2)}
                  </span>
                </div>

                {/* Material Selection */}
                {materials.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Select Material
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {materials.map((mat: string) => (
                        <button
                          key={mat}
                          onClick={() => setSelectedMaterial(mat)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                            selectedMaterial === mat
                              ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20'
                              : 'bg-card text-muted-foreground border-border hover:border-brand-500/50 hover:text-foreground'
                          )}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="500"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value))
                      }
                      className="flex-1 h-2 appearance-none rounded-full bg-muted accent-brand-500 cursor-pointer"
                    />
                    <span className="w-20 text-center font-display font-bold text-lg text-brand-400">
                      {quantity}
                    </span>
                  </div>
                </div>

                {/* Estimated Price */}
                <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Estimated Total
                      </span>
                      <p className="font-display text-2xl font-extrabold gradient-text">
                        ${estimatedPrice}
                      </p>
                    </div>
                    {selectedMaterial === 'Spandex' && (
                      <Badge variant="outline" className="text-xs">
                        +20% Spandex
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  variant="gradient"
                  onClick={() => router.push('/quote')}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Request a Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}