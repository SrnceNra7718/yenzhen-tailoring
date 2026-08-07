'use client'

import Image from 'next/image'
import { X, Mail, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '@/data/products'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-card rounded-2xl border border-border/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-video w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        <div className="p-6 sm:p-8">
          <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">
            {product.category}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-3">
            {product.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`mailto:hello@yenzhen.com?subject=Inquiry about ${encodeURIComponent(product.name)}`} className="btn-primary flex-1">
              <Mail className="mr-2 h-4 w-4 inline" />
              Email Us
            </a>
            <a href="https://m.me/yenzhentailoring" target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1">
              <MessageCircle className="mr-2 h-4 w-4 inline" />
              Messenger
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
