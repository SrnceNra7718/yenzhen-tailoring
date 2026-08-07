'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { products, categories } from '@/data/products'
import { galleryItems } from '@/data/gallery'
import { testimonials } from '@/data/testimonials'
import { faqs } from '@/data/faqs'
import { services } from '@/data/services'
import { ProductCard } from '@/components/sections/product-card'
import { GalleryGrid } from '@/components/sections/gallery-grid'
import { ProductModal } from '@/components/sections/product-modal'
import { FAQAccordion } from '@/components/sections/faq-accordion'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

function RevealSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [lightboxImage, setLightboxImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  const openLightbox = (item: (typeof galleryItems)[0], index: number) => {
    setLightboxImage(item)
    setLightboxIndex(index)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImage) return
    const filtered = galleryItems
    const current = filtered.findIndex((i) => i.id === lightboxImage.id)
    let newIndex = current
    if (direction === 'prev') {
      newIndex = current === 0 ? filtered.length - 1 : current - 1
    } else {
      newIndex = current === filtered.length - 1 ? 0 : current + 1
    }
    setLightboxImage(filtered[newIndex])
    setLightboxIndex(newIndex)
  }

  return (
    <main>
      {/* Hero */}
      <RevealSection className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-400 ring-1 ring-brand-500/20 mb-6">
                <CheckCircle2 className="h-4 w-4" />
                Trusted by teams nationwide
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
                Custom Sportswear,{' '}
                <span className="gradient-text">Crafted for Performance</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Premium sublimation jerseys, hoodies, and team uniforms. 
                Professional quality, fast turnaround, and designs that stand out on and off the court.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#products" className="btn-primary group">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 inline" />
                </a>
                <a href="#gallery" className="btn-secondary">
                  View Gallery
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-2xl border border-border/50 bg-gradient-to-br from-brand-900/30 to-dark-800 shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 shadow-2xl">
                    <Sparkles className="h-14 w-14 text-white" />
                  </div>
                  <p className="font-display text-2xl font-bold text-white">YENZHEN</p>
                  <p className="text-sm text-muted-foreground">TAILORED TO PERFECTION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Products */}
      <RevealSection id="products" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Products"
            subtitle="Browse our range of premium custom sportswear, designed for performance and style."
          />

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Product categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Gallery */}
      <RevealSection id="gallery" className="py-20 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Finished Works"
            subtitle="A glimpse into our recent projects and craftsmanship."
          />
          <GalleryGrid items={galleryItems} onImageClick={openLightbox} />
        </div>
      </RevealSection>

      {/* Services */}
      <RevealSection id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="From design to delivery, we handle every step of the custom sportswear process."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl p-6 border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">
                    {service.icon === 'palette' && '🎨'}
                    {service.icon === 'printer' && '🖨️'}
                    {service.icon === 'layers' && '📐'}
                    {service.icon === 'scissors' && '✂️'}
                    {service.icon === 'users' && '👥'}
                    {service.icon === 'message-circle' && '💬'}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Process */}
      <RevealSection id="process" className="py-20 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Four simple steps to your custom sportswear."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Your Design', desc: 'Browse our catalog or share your own design ideas.' },
              { step: '02', title: 'Send Requirements', desc: 'Tell us your sizes, quantities, and preferred materials.' },
              { step: '03', title: 'Confirm Order', desc: 'Review the proof, approve, and we begin production.' },
              { step: '04', title: 'Receive Your Gear', desc: 'Quality-checked custom apparel delivered to your door.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-display font-extrabold text-brand-500/20 mb-3">{item.step}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-6 -right-4 text-brand-500/30">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Testimonials */}
      <RevealSection className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Real feedback from teams and organizations we have had the pleasure to work with."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 border-white/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={cn('text-lg', i < testimonial.rating ? 'text-brand-400' : 'text-muted-foreground/30')}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection id="faq" className="py-20 bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about our custom sportswear services."
          />
          <FAQAccordion items={faqs} />
        </div>
      </RevealSection>

      {/* Contact CTA */}
      <RevealSection id="contact" className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Ready to Create Your Custom Gear?"
            subtitle="Get in touch with us today. We will discuss your project and provide a quote."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a href="mailto:hello@yenzhen.com?subject=Custom Sportswear Inquiry" className="btn-primary">
              Send us an Email
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </a>
            <a href="https://m.me/yenzhentailoring" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Message on Messenger
            </a>
          </div>
        </div>
      </RevealSection>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto rounded-xl"
            />
            <button
              onClick={() => setLightboxImage(null)}
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
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
                  aria-label="Next"
                >
                  →
                </button>
              </>
            )}
            <p className="mt-4 text-center text-white font-medium">{lightboxImage.title}</p>
          </div>
        </div>
      )}
    </main>
  )
}
