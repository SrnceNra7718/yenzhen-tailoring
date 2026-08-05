'use client'

import { createClient } from '@/app/supabase/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CategoryCardProps {
  category: {
    id: string
    name: string
    slug: string
    description: string | null
    base_price: number
    material_options: string[] | null
    image_url: string | null
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/catalog/${category.slug}`}>
      <Card
        className={cn(
          'group overflow-hidden glass-card-hover border-white/5',
          'hover:scale-[1.02] transition-all duration-300'
        )}
      >
        <div className="relative aspect-square overflow-hidden">
          {category.image_url ? (
            <img
              src={category.image_url}
              alt={category.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-900/20 to-dark-800">
              <span className="font-display text-3xl font-bold text-brand-400">
                {category.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-4">
            <Badge variant="brand" className="mb-2">
              From ${category.base_price.toFixed(2)}
            </Badge>
            <h3 className="font-display text-lg font-bold text-white">
              {category.name}
            </h3>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description || 'Premium custom sportswear'}
          </p>
          {category.material_options && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {category.material_options.map((mat) => (
                <Badge key={mat} variant="outline" className="text-xs">
                  {mat}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}