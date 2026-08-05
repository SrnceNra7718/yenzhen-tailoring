'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { CategoryCard } from '@/components/sections/category-card'
import { HeroSection } from '@/components/sections/hero-section'
import { LatestGallery } from '@/components/sections/latest-gallery'

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
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
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <main>
      <HeroSection />

      {/* Featured Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Collections</h2>
            <p className="section-subheading">
              Explore our range of premium custom sportswear, designed for
              performance and style.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-72 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Latest Gallery */}
      <LatestGallery />
    </main>
  )
}