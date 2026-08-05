'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  Plus,
  Search,
  Trash2,
  Edit3,
  Save,
  X,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Template {
  id: string
  name: string
  thumbnail_url: string | null
  image_url: string | null
  product_category_id: string | null
  category_name?: string
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function AdminTemplatesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [templates, setTemplates] = useState<Template[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  // Form state
  const [name, setName] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  useEffect(() => {
    fetchTemplates()
    fetchCategories()
  }, [])

  async function fetchTemplates() {
    try {
      const { data: tData, error: tError } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })
      if (tError) throw tError

      // Get category names
      const catIds = [...new Set((tData || []).filter((t: Template) => t.product_category_id).map((t: Template) => t.product_category_id).filter((id): id is string => id !== null))]
      let catMap: Record<string, string> = {}
      if (catIds.length > 0) {
        const { data: cData } = await supabase
          .from('product_categories')
          .select('id, name')
          .in('id', catIds)
        if (cData) {
          catMap = Object.fromEntries(cData.map((c: any) => [c.id, c.name]))
        }
      }

      setTemplates(
        (tData || []).map((t: any) => ({
          ...t,
          category_name: t.product_category_id ? catMap[t.product_category_id] : undefined,
        }))
      )
      setTotalCount(tData?.length || 0)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('id, name, slug')
        .order('name', { ascending: true })
      if (error) throw error
      setCategories(data || [])
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  function openAddModal() {
    setEditingTemplate(null)
    setName('')
    setThumbnailUrl('')
    setImageUrl('')
    setSelectedCategoryId('')
    setIsModalOpen(true)
  }

  function openEditModal(template: Template) {
    setEditingTemplate(template)
    setName(template.name)
    setThumbnailUrl(template.thumbnail_url || '')
    setImageUrl(template.image_url || '')
    setSelectedCategoryId(template.product_category_id || '')
    setIsModalOpen(true)
  }

  async function handleSave() {
    if (!name.trim()) {
      alert('Please provide a template name')
      return
    }

    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from('templates')
          .update({
            name,
            thumbnail_url: thumbnailUrl || null,
            image_url: imageUrl || null,
            product_category_id: selectedCategoryId || null,
          })
          .eq('id', editingTemplate.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('templates')
          .insert({
            name,
            thumbnail_url: thumbnailUrl || null,
            image_url: imageUrl || null,
            product_category_id: selectedCategoryId || null,
          })
        if (error) throw error
      }

      setIsModalOpen(false)
      fetchTemplates()
    } catch (err: any) {
      console.error('Error saving template:', err)
      alert('Failed to save template: ' + err.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id)
      if (error) throw error
      fetchTemplates()
    } catch (err: any) {
      console.error('Error deleting template:', err)
      alert('Failed to delete template: ' + err.message)
    }
  }

  const filteredTemplates = templates.filter(
    (t) =>
      !searchTerm ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.category_name &&
        t.category_name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold gradient-text">
            Templates Manager
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage design templates. Total: {totalCount}
          </p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={fetchTemplates}>
          <ChevronDown className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-white/5 overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  {template.thumbnail_url ? (
                    <img
                      src={template.thumbnail_url}
                      alt={template.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder-image.jpg'
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-900/20 to-dark-800">
                      <ImageIcon className="h-12 w-12 text-brand-400/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-black/50 text-white hover:bg-black/70"
                        onClick={() => openEditModal(template)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-black/50 text-white hover:bg-red-500/70"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-medium text-white truncate">
                        {template.name}
                      </p>
                      {template.category_name && (
                        <p className="text-xs text-muted-foreground">
                          {template.category_name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="glass-card border-white/5">
          <CardContent className="p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-medium text-muted-foreground">
              {searchTerm ? 'No templates match your search' : 'No templates yet'}
            </h3>
            <p className="text-sm text-muted-foreground/70">
              Click &ldquo;Add Template&rdquo; to create a new template.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display gradient-text">
              {editingTemplate ? 'Edit Template' : 'Add Template'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Template Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Enter template name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={selectedCategoryId}
                onValueChange={setSelectedCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Thumbnail URL</label>
              <Input
                placeholder="Paste OneDrive direct image link"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Full Image URL</label>
              <Input
                placeholder="Paste OneDrive direct image link"
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
              {editingTemplate ? 'Save Changes' : 'Add Template'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}