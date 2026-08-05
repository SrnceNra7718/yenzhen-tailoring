'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

// Type imports

type Step = 'category' | 'quantity' | 'fabric' | 'printing' | 'summary'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  base_price: number
  material_options: string[] | null
  image_url: string | null
  created_at: string
}

export default function QuotePage() {
  const router = useRouter()
  const supabase = createClient()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState<Step>('category')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('')
  const [printingType, setPrintingType] = useState<string>('Sublimation')
  const [estimatedPrice, setEstimatedPrice] = useState<string>('')

  // Form fields
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [quoteId, setQuoteId] = useState('')

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error
        setCategories(data || [])

        if (data && data.length > 0) {
          setSelectedCategory(data[0])
          setSelectedMaterial(data[0].material_options?.[0] || '')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      calculatePrice()
    }
  }, [selectedCategory, quantity, selectedMaterial, printingType])

  function calculatePrice() {
    if (!selectedCategory) return
    let price = selectedCategory.base_price * quantity
    if (selectedMaterial === 'Spandex') price *= 1.2
    if (printingType === 'Embroidery') price += 5 * quantity
    setEstimatedPrice(price.toFixed(2))
  }

  const steps: Step[] = ['category', 'quantity', 'fabric', 'printing', 'summary']

  const progress = ((steps.indexOf(currentStep) + 1) / steps.length) * 100

  function nextStep() {
    const idx = steps.indexOf(currentStep)
    if (idx < steps.length - 1) setCurrentStep(steps[idx + 1])
  }

  function prevStep() {
    const idx = steps.indexOf(currentStep)
    if (idx > 0) setCurrentStep(steps[idx - 1])
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const { data: quoteData, error } = await supabase
        .from('quote_requests')
        .insert({
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          product_type: selectedCategory?.name,
          quantity,
          fabric_options: selectedMaterial,
          printing_type: printingType,
          estimated_price: `$${estimatedPrice}`,
          message,
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error
      setQuoteId(quoteData.id)

      // Send email notification via API route
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId: quoteData.id,
          customerName,
          customerEmail,
          customerPhone,
          productType: selectedCategory?.name,
          quantity,
          fabricOptions: selectedMaterial,
          printingType: printingType,
          estimatedPrice: `$${estimatedPrice}`,
          message,
        }),
      }).catch(() => {
        // Email sending is best-effort
        console.warn('Email notification failed')
      })

      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting quote:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="pt-16">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full mb-6 rounded-xl" />
          ))}
        </div>
      </main>
    )
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
            Quote Submitted!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Your quote request <span className="font-mono text-brand-400">{quoteId}</span> has
            been received.
          </p>
          <p className="text-muted-foreground mb-8">
            Our team will review your request and get back to you within 24 hours
            with a detailed quotation.
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
            Get a Quote
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us what you need and we will calculate an estimate for you.
            It only takes a minute!
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <section className="sticky top-[64px] z-40 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step)}
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300',
                    steps.indexOf(currentStep) >= i
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {i + 1}
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 w-8 transition-colors duration-300',
                      steps.indexOf(currentStep) > i
                        ? 'bg-brand-500'
                        : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-brand-500 rounded-full"
              initial={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="glass-card border-white/5">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Category */}
                {currentStep === 'category' && (
                  <motion.div
                    key="category"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">
                        Choose a Product
                      </h2>
                      <p className="text-muted-foreground">
                        Select the type of product you need.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {categories.map((cat, index) => (
                        <motion.div
                          key={cat.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => {
                              setSelectedCategory(cat)
                              setSelectedMaterial(cat.material_options?.[0] || '')
                              nextStep()
                            }}
                            className={cn(
                              'w-full rounded-xl border p-5 text-left transition-all duration-200',
                              selectedCategory?.id === cat.id
                                ? 'border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/5 ring-1 ring-brand-500/20'
                                : 'border-border/50 bg-card hover:border-brand-500/50 hover:bg-accent/30'
                            )}
                          >
                            <h3 className="font-semibold text-foreground">
                              {cat.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              From ${cat.base_price.toFixed(2)} / unit
                            </p>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Quantity */}
                {currentStep === 'quantity' && (
                  <motion.div
                    key="quantity"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">
                        How Many?
                      </h2>
                      <p className="text-muted-foreground">
                        Quantity for <strong>{selectedCategory?.name}</strong>
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <input
                          type="range"
                          min="1"
                          max="500"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value))
                          }
                          className="flex-1 h-2 appearance-none rounded-full bg-muted accent-brand-500 cursor-pointer"
                        />
                        <div className="w-24 text-center">
                          <span className="font-display text-4xl font-extrabold text-brand-400">
                            {quantity}
                          </span>
                          <span className="block text-sm text-muted-foreground">
                            pieces
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-1">
                        {[10, 50, 100, 500].map((q) => (
                          <button
                            key={q}
                            onClick={() => setQuantity(q)}
                            className={cn(
                              'py-2 rounded-lg text-sm font-medium transition-all duration-200',
                              quantity === q
                                ? 'bg-brand-500 text-white shadow-md'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            )}
                          >
                            {q} piece{q > 1 ? 's' : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Fabric */}
                {currentStep === 'fabric' && (
                  <motion.div
                    key="fabric"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">
                        Choose Fabric
                      </h2>
                      <p className="text-muted-foreground">
                        Pick the material that suits your needs.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(selectedCategory?.material_options || []).map((mat, index) => (
                        <motion.button
                          key={mat}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedMaterial(mat)}
                          className={cn(
                            'py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-200',
                            selectedMaterial === mat
                              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20 border-brand-500'
                              : 'bg-muted text-muted-foreground border-border hover:border-brand-500/50 hover:bg-accent/30 hover:text-foreground'
                          )}
                        >
                          {mat}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Printing */}
                {currentStep === 'printing' && (
                  <motion.div
                    key="printing"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">
                        Printing Method
                      </h2>
                      <p className="text-muted-foreground">
                        Select your preferred printing technique.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {['Sublimation', 'Screen Print', 'Embroidery'].map(
                        (method, index) => (
                          <motion.button
                            key={method}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setPrintingType(method)}
                            className={cn(
                              'py-4 px-6 rounded-xl text-sm font-semibold text-left transition-all duration-200 flex items-center justify-between',
                              printingType === method
                                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20 border-brand-500'
                                : 'bg-muted text-muted-foreground border-border hover:border-brand-500/50 hover:bg-accent/30 hover:text-foreground'
                            )}
                          >
                            <span>{method}</span>
                            {method === 'Embroidery' && (
                              <Badge variant="outline" className="ml-2">
                                +$5/unit
                              </Badge>
                            )}
                            {printingType === method && (
                              <CheckCircle2 className="h-5 w-5 ml-2" />
                            )}
                          </motion.button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Summary & Submit */}
                {currentStep === 'summary' && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">
                        Review & Submit
                      </h2>
                      <p className="text-muted-foreground">
                        Confirm your details below, then submit.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-muted rounded-xl p-4">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            Product
                          </span>
                          <p className="font-medium mt-1">
                            {selectedCategory?.name}
                          </p>
                        </div>
                        <div className="bg-muted rounded-xl p-4">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            Quantity
                          </span>
                          <p className="font-medium mt-1">{quantity} units</p>
                        </div>
                        <div className="bg-muted rounded-xl p-4 col-span-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            Material
                          </span>
                          <p className="font-medium mt-1">{selectedMaterial}</p>
                        </div>
                        <div className="bg-muted rounded-xl p-4 col-span-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            Printing Method
                          </span>
                          <p className="font-medium mt-1">
                            {printingType}
                          </p>
                        </div>
                      </div>

                      <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          Estimated Total
                        </p>
                        <p className="font-display text-4xl font-extrabold gradient-text">
                          ${estimatedPrice}
                        </p>
                        {selectedMaterial === 'Spandex' && (
                          <Badge variant="outline" className="mt-2">
                            Includes +20% Spandex surcharge
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4 mt-8">
                      <h3 className="font-semibold text-lg">
                        Your Contact Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-sm font-medium">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-medium">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="space-y-1 flex-1">
                          <label className="text-sm font-medium">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Message (Optional)
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          placeholder="Special requirements, design notes, etc."
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        ← Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={submitting || !customerName || !customerEmail}
                        size="lg"
                        variant="gradient"
                        className="flex-1"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Submit Quote Request
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}