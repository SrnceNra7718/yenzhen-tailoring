'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import { ImageIcon, ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const supabase = createClient()

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: true })

        if (error) throw error
        setImages(data || [])
      } catch (err) {
        console.error('Error fetching gallery:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  const openLightbox = (image: any, index: number) => {
    setSelected(image)
    setCurrentIndex(index)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
      setSelected(images[newIndex])
    } else {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
      setSelected(images[newIndex])
    }
  }

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-4">
            Finished Works Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of completed custom sportswear projects.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 w-full rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className="relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg cursor-pointer group"
                    onClick={() => openLightbox(image, index)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.image_url}
                        alt={image.title || 'Gallery image'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect fill="%231a1a1a" width="400" height="400"/><text fill="%23666" font-size="24" x="50%" y="50%" text-anchor="middle" dy=".3em">Image Not Found</text></svg>'
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                      {image.title && (
                        <span className="text-sm font-medium text-white">
                          {image.title}
                        </span>
                      )}
                      <Badge className="ml-auto" variant="outline">
                        <ZoomIn className="h-3 w-3 mr-1" />
                        View
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {images.length === 0 && !loading && (
            <div className="text-center py-20">
              <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground/40" />
              <h3 className="mt-4 text-xl font-semibold text-muted-foreground">
                No images yet
              </h3>
              <p className="text-muted-foreground/70 mt-2">
                Check back soon for our latest finished works.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selected.image_url}
                alt={selected.title || 'Enlarged view'}
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full p-2"
                aria-label="Close lightbox"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full p-2"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full p-2"
                aria-label="Next image"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
            {selected.title && (
              <p className="mt-4 text-center text-white font-medium text-lg">
                {selected.title}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </main>
  )
}