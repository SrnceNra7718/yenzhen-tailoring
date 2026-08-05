'use client'

import { createClient } from '@/app/supabase/client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function LatestGallery() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('display_order', { ascending: true })
          .limit(6)

        if (error) throw error
        setImages(data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center">Finished Works Gallery</h2>
        <p className="section-subheading">
          A glimpse into our recent projects and craftsmanship.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="section-heading text-center">Finished Works Gallery</h2>
      <p className="section-subheading">
        A glimpse into our recent projects and craftsmanship.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden glass-card group border-white/5">
              <a
                href={image.image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video overflow-hidden"
              >
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery image'}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                  {image.title && (
                    <span className="text-sm font-medium text-white">
                      {image.title}
                    </span>
                  )}
                </div>
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}