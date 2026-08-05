'use server'

import { createServerClient } from '@/app/supabase/client'
import type { Database } from '@/types/database'

export async function submitQuote(data: {
  customer_name: string
  customer_email: string
  customer_phone?: string
  product_type?: string
  quantity?: number
  fabric_options?: string
  printing_type?: string
  estimated_price?: string
  message?: string
}) {
  const supabase = createServerClient()

  const { data: quote, error } = await supabase
    .from('quote_requests')
    .insert({
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone || null,
      product_type: data.product_type || null,
      quantity: data.quantity || null,
      fabric_options: data.fabric_options || null,
      printing_type: data.printing_type || null,
      estimated_price: data.estimated_price || null,
      message: data.message || null,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error
  return quote
}

export async function submitContact(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const supabase = createServerClient()

  const { error } = await supabase.from('contact_messages').insert({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    message: data.message,
  })

  if (error) throw error
}