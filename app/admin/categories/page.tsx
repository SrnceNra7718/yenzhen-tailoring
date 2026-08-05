'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Plus,
  Search,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronDown,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  base_price: number
  material_options: string[] | null
  image_url: string | null
}

export default function AdminCategoriesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  // Form state
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState<number>(0)
  const [materialOptions, setMaterialOptions] = useState<string>('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      setCategories(data || [])
      setTotalCount(data?.length || 0)
    } catch (err) {
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleNameChange(value: string) {
    setName(value)
    if (!editingCategory) {
      setSlug(generateSlug(value))
    }
  }

  function openAddModal() {
    setEditingCategory(null)
    setName('')
    setSlug('')
    setDescription('')
    setBasePrice(0)
    setMaterialOptions('')
    setImageUrl('')
    setIsModalOpen(true)
  }

  function openEditModal(category: Category) {
    setEditingCategory(category)
    setName(category.name)
    setSlug(category.slug)
    setDescription(category.description || '')
    setBasePrice(category.base_price)
    setMaterialOptions(category.material_options?.join(', ') || '')
    setImageUrl(category.image_url || '')
    setIsModalOpen(true)
  }

  async function handleSave() {
    if (!name.trim() || !slug.trim()) {
      alert('Please provide a name and slug')
      return
    }

    const materials = materialOptions
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean)

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('product_categories')
          .update({
            name,
            slug,
            description: description || null,
            base_price: basePrice,
            material_options: materials.length > 0 ? materials : null,
            image_url: imageUrl || null,
          })
          .eq('id', editingCategory.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('product_categories')
          .insert({
            name,
            slug,
            description: description || null,
            base_price: basePrice,
            material_options: materials.length > 0 ? materials : null,
            image_url: imageUrl || null,
          })

        if (error) throw error
      }

      setIsModalOpen(false)
      fetchCategories()
    } catch (err: any) {
      console.error('Error saving category:', err)
      let errorMsg = 'Failed to save category.'
      if (err.message?.includes('duplicate')) {
        errorMsg = 'A category with this slug already exists.'
      }
      alert(errorMsg + ' ' + err.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const { error } = await supabase
        .from('product_categories')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchCategories()
    } catch (err: any) {
      console.error('Error deleting category:', err)
      alert('Failed to delete category: ' + err.message)
    }
  }

  const filteredCategories = categories.filter(
    (c) =>
      !searchTerm ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold gradient-text">
            Product Categories
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage product categories. Total: {totalCount}
          </p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={fetchCategories}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Categories table — desktop */}
      <Card className="glass-card border-white/5 hidden md:block">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Slug
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Base Price
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                  Materials
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/40" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {searchTerm
                        ? 'No categories match your search'
                        : 'No categories yet'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <motion.tr
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">{category.name}</div>
                      {category.description && (
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {category.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${category.base_price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <div className="flex flex-wrap gap-1">
                          {(category.material_options || []).map((mat) => (
                            <Badge key={mat} variant="outline" className="text-xs">
                              {mat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(category)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/80"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Categories — mobile cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="glass-card border-white/5">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{category.name}</h3>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded mt-1 block">
                    {category.slug}
                  </code>
                  <p className="text-sm text-muted-foreground mt-1">
                    ${category.base_price.toFixed(2)}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(category.material_options || []).map((mat) => (
                      <Badge key={mat} variant="outline" className="text-xs">
                        {mat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(category)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display gradient-text">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Category Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g., Basketball Jersey"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Slug <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g., basketball-jersey"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Brief description of this category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Base Price (USD) <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="25.00"
                value={basePrice}
                onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Material Options</label>
              <Input
                placeholder="Comma-separated, e.g., Polyester, Spandex, Cotton"
                value={materialOptions}
                onChange={(e) => setMaterialOptions(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                placeholder="OneDrive direct image link (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              {editingCategory ? 'Save Changes' : 'Add Category'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}