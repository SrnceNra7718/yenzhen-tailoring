'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-400 ring-1 ring-brand-500/20">
                <Sparkles className="mr-1.5 h-4 w-4" />
                Premium Custom Sportswear
              </span>
            </motion.div>

            <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block gradient-text">Your Vision,</span>
              <span className="block text-white">Our Craft.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed sm:text-xl">
              Professional custom sublimation sportswear designed for teams and
              athletes. From basketball jerseys to team uniforms — we deliver
              quality you can feel and style you can see.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="group" variant="gradient">
                <Link href="/quote">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/gallery">View Our Work</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              {[
                { icon: CheckCircle2, text: 'Premium Quality' },
                { icon: CheckCircle2, text: 'Fast Delivery' },
                { icon: CheckCircle2, text: '100+ Teams Served' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-brand-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-brand-900/50 to-dark-800 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 shadow-2xl">
                    <Sparkles className="h-14 w-14 text-white" />
                  </div>
                  <p className="font-display text-2xl font-bold text-white">
                    YENZHEN
                  </p>
                  <p className="text-sm text-muted-foreground">
                    TAILORED TO PERFECTION
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}