'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-4">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting premium custom sportswear with passion and precision since
            2018.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-brand-900/20 to-dark-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="mx-auto h-16 w-16 text-brand-400/30" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      YENZHEN Team
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="brand">Our Story</Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Passion for Sportswear Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At YenZhen Tailoring, we specialize in premium custom
                  sublimation sportswear designed for teams, athletes, and
                  organizations who demand the best. With years of experience
                  in the industry, we have perfected the art of combining
                  cutting-edge printing technology with high-quality materials.
                </p>
                <p>
                  From basketball jerseys and matching shorts to hoodies, tank
                  tops, and full muse uniforms — every piece we create is a
                  testament to our commitment to quality, durability, and
                  style.
                </p>
                <p>
                  We work closely with our clients to bring their vision to
                  life, offering personalized design consultation and
                  meticulous attention to detail at every step of the process.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">
              Why Choose Us
            </Badge>
            <h2 className="font-display text-3xl font-bold gradient-text tracking-tight">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: '🎨',
                title: 'Custom Designs',
                desc: 'Fully personalized designs tailored to your team identity.',
              },
              {
                icon: '✨',
                title: 'Premium Quality',
                desc: 'Top-grade materials and printing for lasting durability.',
              },
              {
                icon: '⚡',
                title: 'Fast Turnaround',
                desc: 'Quick production and delivery without compromising quality.',
              },
              {
                icon: '💰',
                title: 'Competitive Pricing',
                desc: 'Affordable bulk pricing for teams of all sizes.',
              },
              {
                icon: '🤝',
                title: 'Expert Support',
                desc: 'Dedicated support from design to delivery.',
              },
              {
                icon: '🔄',
                title: 'Easy Reorders',
                desc: 'Simple reordering process for returning customers.',
              },
              {
                icon: '🌍',
                title: 'Worldwide Shipping',
                desc: 'We ship custom sportswear globally.',
              },
              {
                icon: '🛡️',
                title: 'Satisfaction Guarantee',
                desc: 'We stand behind every product we create.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-center p-6 rounded-xl bg-card border border-border/50 hover:border-brand-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold gradient-text tracking-tight mb-4">
            Ready to Create Your Custom Gear?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with a free quote today. Our team is here to help you
            every step of the way.
          </p>
          <a href="/quote">
            <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-400 to-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/20 hover:from-brand-500 hover:to-brand-700 transition-all duration-300">
              Request Your Free Quote →
            </button>
          </a>
        </div>
      </section>
    </main>
  )
}