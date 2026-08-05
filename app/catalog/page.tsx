'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CategoryCard } from '@/components/sections/category-card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

function CatalogContent() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error
        setCategories(data || [])

        const filter = searchParams.get('filter')
        if (filter) setActiveFilter(filter)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [searchParams])

  const filteredCategories = activeFilter
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(activeFilter.toLowerCase())
      )
    : categories

  return (
    <main className="pt-16">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our full range of premium custom sportswear products.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[64px] z-40 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              Filter:
            </span>
            <button
              onClick={() => setActiveFilter(null)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                !activeFilter
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setActiveFilter(
                    activeFilter === cat.slug ? null : cat.slug
                  )
                }
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  activeFilter === cat.slug
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/50 overflow-hidden"
                >
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredCategories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/catalog/${category.slug}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CategoryCard category={category} />
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}

          {filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-muted-foreground">
                No categories found
              </h3>
              <p className="mt-2 text-muted-foreground/70">
                Try selecting a different filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogContent />
    </Suspense>
  )
}