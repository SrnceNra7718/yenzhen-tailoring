'use server'

import { createServerClient } from '@/app/supabase/client'

export async function getCategories() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data
}

export async function getGalleryImages(limit?: number) {
  const supabase = createServerClient()
  let query = supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: true })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getTemplates() {
  const supabase = createServerClient()
  const { data: templates, error: templatesError } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })

  if (templatesError) throw templatesError

  const categoryIds = [
    ...new Set(
      (templates || [])
        .filter((t: any) => t.product_category_id)
        .map((t: any) => t.product_category_id)
    ),
  ]

  let categoryMap: Record<string, string> = {}
  if (categoryIds.length > 0) {
    const { data: catsData } = await supabase
      .from('product_categories')
      .select('id, name')
      .in('id', categoryIds)

    if (catsData) {
      categoryMap = Object.fromEntries(
        catsData.map((c: any) => [c.id, c.name])
      )
    }
  }

  return (templates || []).map((t: any) => ({
    ...t,
    category_name: t.product_category_id
      ? categoryMap[t.product_category_id]
      : undefined,
  }))
}

export async function getRatings() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error
  return data
}