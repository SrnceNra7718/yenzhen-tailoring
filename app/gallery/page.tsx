'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { galleryItems } from '@/data/gallery'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'

export default function GalleryPage() {
  const [selected, setSelected] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (item: (typeof galleryItems)[0], index: number) => {
    setSelected(item)
    setCurrentIndex(index)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (galleryItems.length <= 1) return
    const current = galleryItems.findIndex((i) => i.id === selected?.id)
    let newIndex = current
    if (direction === 'prev') {
      newIndex = current === 0 ? galleryItems.length - 1 : current - 1
    } else {
      newIndex = current === galleryItems.length - 1 ? 0 : current + 1
    }
    setSelected(galleryItems[newIndex])
    setCurrentIndex(newIndex)
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
            Explore our portfolio of completed custom sportswear projects — each piece crafted with precision and passion.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openLightbox(item, index)}
                className="relative aspect-square overflow-hidden rounded-xl border border-border/50 bg-card group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <span className="text-xs text-white/70">{item.category}</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/40 rounded-full p-2">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {galleryItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No gallery items yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selected.src}
                alt={selected.alt}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
                aria-label="Close lightbox"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
              {galleryItems.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
                    aria-label="Previous"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
                    aria-label="Next"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <p className="mt-4 text-center text-white font-medium">{selected.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
