'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface Template {
  id: string
  name: string
  thumbnail_url: string | null
  image_url: string | null
  product_category_id: string | null
  category_name?: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const { data: templatesData, error: templatesError } = await supabase
          .from('templates')
          .select('*')
          .order('created_at', { ascending: false })

        if (templatesError) throw templatesError

// Fetch category names for each template
        const categories = templatesData
           ?.filter((t: Template) => t.product_category_id)
           .map((t: Template) => t.product_category_id)
           .filter((id): id is string => id !== null)

        let categoryMap: Record<string, string> = {}
        if (categories?.length) {
          const { data: catsData } = await supabase
            .from('product_categories')
            .select('id, name')
            .in('id', [...new Set(categories)])

          if (catsData) {
            categoryMap = Object.fromEntries(
              catsData.map((c: any) => [c.id, c.name])
            )
          }
        }

        const templatesWithCategories = (templatesData || []).map((t: any) => ({
          ...t,
          category_name: t.product_category_id
            ? categoryMap[t.product_category_id]
            : undefined,
        }))

        setTemplates(templatesWithCategories)
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-4">
            Pre-Made Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of ready-to-use design templates. Pick your
            favorite and we will bring it to life on your custom sportswear.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-72 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden glass-card group border-white/5 hover:shadow-2xl transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      {template.thumbnail_url ? (
                        <img
                          src={template.thumbnail_url}
                          alt={template.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-900/20 to-dark-800">
                          <ExternalLink className="h-12 w-12 text-brand-400/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                        <div className="w-full flex items-end justify-between">
                          <div>
                            <h3 className="font-display text-lg font-bold text-white">
                              {template.name}
                            </h3>
                            {template.category_name && (
                              <Badge variant="outline" className="mt-1">
                                {template.category_name}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {templates.length === 0 && !loading && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-muted-foreground">
                No templates available yet
              </h3>
              <p className="text-muted-foreground/70 mt-2">
                Check back soon for new designs!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}