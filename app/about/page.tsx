'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-4">
            About Yenzhen Tailoring
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium custom sublimation sportswear designed for teams, athletes, and organizations who demand the best.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-brand-900/20 to-dark-800"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg">
                    <span className="text-3xl">👕</span>
                  </div>
                  <p className="font-display text-xl font-bold text-white">YENZHEN</p>
                  <p className="text-sm text-muted-foreground">Crafting Since Day One</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Passion for <span className="gradient-text">Sportswear Excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At YenZhen Tailoring, we specialize in premium custom sublimation sportswear 
                  designed for teams, athletes, and organizations who demand the best. With years 
                  of experience in the industry, we have perfected the art of combining 
                  cutting-edge printing technology with high-quality materials.
                </p>
                <p>
                  From basketball jerseys and matching shorts to hoodies, tank tops, and full 
                  muse uniforms — every piece we create is a testament to our commitment to 
                  quality, durability, and style.
                </p>
                <p>
                  We work closely with our clients to bring their vision to life, offering 
                  personalized design consultation and meticulous attention to detail at every 
                  step of the process.
                </p>
              </div>
              <a href="/#contact" className="btn-primary">Start Your Project</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Us"
            subtitle="What sets YenZhen Tailoring apart from the rest."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎨', title: 'Custom Designs', desc: 'Fully personalized designs tailored to your team identity.' },
              { icon: '✨', title: 'Premium Quality', desc: 'Top-grade materials and printing for lasting durability.' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Quick production and delivery without compromising quality.' },
              { icon: '💬', title: 'Expert Support', desc: 'Dedicated support from design to delivery.' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card border border-border/50 hover:border-brand-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
