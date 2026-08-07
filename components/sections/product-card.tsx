'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  onViewDetails: () => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border/50 bg-card group hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-display text-base font-semibold mt-1 mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
        <button
          onClick={onViewDetails}
          className="inline-flex items-center text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          View Details
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
