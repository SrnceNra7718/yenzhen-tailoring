'use client'

import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import { motion } from 'framer-motion'
import type { GalleryItem } from '@/data/gallery'

interface GalleryGridProps {
  items: GalleryItem[]
  onImageClick: (item: GalleryItem, index: number) => void
}

export function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onImageClick(item, index)}
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
  )
}
