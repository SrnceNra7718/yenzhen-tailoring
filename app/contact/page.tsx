'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export default function ContactPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send message')
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting contact:', error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="pt-16">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <CheckCircle2 className="mx-auto h-20 w-20 text-green-500 mb-6" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Message Sent!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Thank you for reaching out, {formData.name}.
          </p>
          <p className="text-muted-foreground mb-8">
            We have received your message and will get back to you as soon as
            possible, usually within 24 hours.
          </p>
          <Button asChild variant="gradient" size="lg">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold gradient-text tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or need a custom quote? We would love to hear from
            you. Send us a message and we will respond promptly.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="font-display text-2xl gradient-text">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Tell us about your project, ask a question, or request a quote..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      variant="gradient"
                      className="w-full"
                    >
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="font-display text-2xl gradient-text">
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground text-sm">
                        hello@yenzhen.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground text-sm">
                        +86 123 4567 8900
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <p className="text-muted-foreground text-sm">
                        123 Tailoring Street, Yiwu, Zhejiang, China
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="font-display text-lg gradient-text">
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between py-2 border-b border-border/50"
                      >
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="font-display text-lg gradient-text">
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {['Facebook', 'Instagram', 'Twitter', 'WhatsApp'].map(
                      (platform) => (
                        <a
                          key={platform}
                          href="#"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:bg-brand-500/10 hover:text-brand-400 hover:border-brand-500/50"
                          aria-label={platform}
                        >
                          {platform.charAt(0)}
                        </a>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Ratings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="section-heading text-center">
              What Our Customers Say
            </h2>
            <p className="section-subheading">
              Rated by our valued customers across different products.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
              {[
                {
                  name: 'Michael T.',
                  rating: 5,
                  review:
                    'Amazing quality! The sublimation on the basketball jerseys is vibrant and durable. Will definitely order again.',
                  product: 'Basketball Jersey',
                },
                {
                  name: 'Sarah L.',
                  rating: 5,
                  review:
                    'Perfect fit and excellent craftsmanship. The custom hoodie looks professional.',
                  product: 'Hoodie',
                },
                {
                  name: 'David K.',
                  rating: 4,
                  review:
                    'Great communication and fast turnaround. The shorts quality exceeded our expectations.',
                  product: 'Shorts',
                },
              ].map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card border-white/5 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="h-5 w-5 text-brand-400 fill-brand-400" />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <StarIcon key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/30" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                        &ldquo;{review.review}&rdquo;
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">
                          {review.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {review.product}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}