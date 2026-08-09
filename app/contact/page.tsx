'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { contactInfo } from '@/data/navigation'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-4">
            Contact Us
          </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need a custom quote for sublimation basketball jerseys or a full team package? We would love to help.
            </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-card rounded-xl p-6 border-white/5">
                <h2 className="font-display text-xl font-bold mb-6 gradient-text">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Email</h3>
                      <a href={`mailto:${contactInfo.email}`} className="text-sm text-muted-foreground hover:text-brand-400 transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Phone</h3>
                      <a href={`tel:${contactInfo.phone}`} className="text-sm text-muted-foreground hover:text-brand-400 transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Location</h3>
                      <p className="text-sm text-muted-foreground">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 border-white/5">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-400" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card rounded-xl p-6 sm:p-8 border-white/5">
                <h2 className="font-display text-xl font-bold mb-6 gradient-text">Send Us a Message</h2>
                <form
                  action={`mailto:${contactInfo.email}?subject=Custom Sportswear Inquiry`}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="+63 912 345 6789"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                       placeholder="Tell us about your basketball team or sublimation project..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    This will open your default email client to send the message.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
