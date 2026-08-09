'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Shield, Palette, Zap, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-24">
        <div className="absolute inset-0 bg-hero-glow opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-4">
            About Yenzhen Tailoring
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium sublimation sportswear specialists — basketball jerseys, team packages, and custom uniforms built for performance.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-brand-900/20 to-dark-800"
            >
              <div className="absolute inset-0 bg-card-shine" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-gold-500 shadow-lg">
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
                Passion for <span className="gradient-text-gold">Sublimation Excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  YenZhen Tailoring is a specialist sublimation sportswear manufacturer focused on 
                  basketball teams and athletic organizations. We combine advanced printing technology 
                  with premium fabrics to create jerseys, warmers, and full team packages that look 
                  professional and perform on the court.
                </p>
                <p>
                  Every sublimation print is Pantone-matched to your team colors, ensuring perfect 
                  greens, golds, and custom shades every time. Our designs won&rsquo;t crack, fade, 
                  or peel — built to last through every game and wash.
                </p>
                <p>
                  From individual players to full league orders, we handle design, production, and 
                  delivery with the same level of care. Your team&rsquo;s identity deserves to be 
                  seen — let us bring it to life.
                </p>
              </div>
              <Link href="/#contact" className="btn-primary">Start Your Project</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            title="Why Choose Us"
            subtitle="What sets YenZhen Tailoring apart for basketball teams and organizations."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="h-6 w-6" />, title: 'Sublimation Quality', desc: 'Vibrant all-over prints that won\'t crack, fade, or peel. Unlimited colors per design.' },
              { icon: <Palette className="h-6 w-6" />, title: 'Custom Design', desc: 'Free design consultation with Pantone-matched colors and unlimited revisions.' },
              { icon: <Zap className="h-6 w-6" />, title: 'Fast Turnaround', desc: 'Standard team orders in 2–3 weeks. Rush options available for game-day deadlines.' },
              { icon: <Users className="h-6 w-6" />, title: 'Team Focused', desc: 'From 1 to 100+ players. Full package management with dedicated support.' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card rounded-xl text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-500/10 flex items-center justify-center mb-5 text-brand-400 mx-auto">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-2xl p-12 border-white/5">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-4">
              Ready to Elevate Your Team?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Let us create custom sublimation uniforms that make your team look and feel like champions.
            </p>
            <Link href="/#contact" className="btn-primary">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}