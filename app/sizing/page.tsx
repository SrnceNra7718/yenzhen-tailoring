'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

export default function SizingPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('*')
          .order('created_at', { ascending: true })
        if (error) throw error
        setCategories(data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-dark-800 to-brand-900 py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold gradient-text tracking-tight mb-4">
            Sizing Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect fit. Use the charts below to get accurate
            measurements for each product type.
          </p>
        </div>
      </section>

      {/* General sizing tips */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 border-white/5 mb-12"
          >
            <h2 className="font-display text-xl font-bold mb-4">
              How to Measure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Chest',
                  desc: 'Measure around the fullest part of your chest, keeping the tape measure level under the arms.',
                },
                {
                  title: 'Waist',
                  desc: 'Measure around the natural waistline, keeping the tape comfortably loose.',
                },
                {
                  title: 'Hips',
                  desc: 'Measure around the fullest part of your hips, standing with feet together.',
                },
                {
                  title: 'Length',
                  desc: 'For jerseys, measure from the highest shoulder point down to the desired hem length.',
                },
                {
                  title: 'Arm Length',
                  desc: 'Measure from the shoulder tip down to the wrist bone with arm slightly bent.',
                },
                {
                  title: 'Inseam',
                  desc: 'For shorts, measure from the crotch seam to the desired hem length.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800 rounded-xl p-4 border border-border/50"
                >
                  <h3 className="font-semibold text-brand-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-16">
            {loading
              ? [...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-96 w-full rounded-xl" />
                ))
              : categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl border-white/5 overflow-hidden"
                  >
                    {category.image_url && (
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Badge variant="brand" className="text-base px-3 py-1">
                          {category.name}
                        </Badge>
                        {category.material_options && (
                          <div className="flex gap-1.5">
                            {category.material_options.map((mat: string) => (
                              <Badge key={mat} variant="outline" className="text-xs">
                                {mat}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                Size
                              </th>
                              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                                XS
                              </th>
                              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                                S
                              </th>
                              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                                M
                              </th>
                              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                                L
                              </th>
                              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                                XL
                              </th>
                              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                                XXL
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                label: 'Chest (cm)',
                                values: ['84', '88', '96', '104', '112', '124'],
                              },
                              {
                                label: 'Waist (cm)',
                                values: ['64', '68', '74', '82', '90', '100'],
                              },
                              {
                                label: 'Hips (cm)',
                                values: ['88', '92', '100', '108', '116', '128'],
                              },
                              {
                                label: 'Length (cm)',
                                values: [
                                  '60',
                                  '62',
                                  '65',
                                  '68',
                                  '71',
                                  '74',
                                ],
                              },
                              {
                                label: 'Sleeve (cm)',
                                values: [
                                  '50',
                                  '52',
                                  '55',
                                  '58',
                                  '61',
                                  '64',
                                ],
                              },
                            ].map((row) => (
                              <tr
                                key={row.label}
                                className="border-b border-border/50"
                              >
                                <td className="py-3 px-4 font-medium">
                                  {row.label}
                                </td>
                                {row.values.map((v) => (
                                  <td
                                    key={v}
                                    className="py-3 px-4 text-center text-muted-foreground"
                                  >
                                    {v}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <p className="mt-4 text-xs text-muted-foreground">
                        * Measurements are approximate and may vary by ±2cm. 
                        Contact us for a personalized fitting recommendation.
                      </p>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </main>
  )
}