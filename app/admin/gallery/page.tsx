'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Image,
  Plus,
  Search,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronsUpDown,
  Upload,
  Link as LinkIcon,
  RefreshCw,
  Sparkles,
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

interface GalleryImage {
  id: string
  title: string | null
  image_url: string
  uploaded_at: string
  display_order: number | null
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function AdminGalleryPage() {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  // Form state
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [displayOrder, setDisplayOrder] = useState<number | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  useEffect(() => {
    fetchImages()
    fetchCategories()
  }, [])

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: true })

      if (error) throw error
      setImages(data || [])
      setTotalCount(data?.length || 0)
    } catch (err) {
      console.error('Error fetching images:', err)
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
    setEditingImage(null)
    setTitle('')
    setImageUrl('')
    setDisplayOrder(null)
    setSelectedCategoryId('')
    setIsModalOpen(true)
  }

  function openEditModal(image: GalleryImage) {
    setEditingImage(image)
    setTitle(image.title || '')
    setImageUrl(image.image_url)
    setDisplayOrder(image.display_order)
    setIsModalOpen(true)
  }

  async function handleSave() {
    if (!imageUrl.trim()) {
      alert('Please provide an image URL')
      return
    }

    try {
      if (editingImage) {
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title: title || null,
            image_url: imageUrl,
            display_order: displayOrder,
          })
          .eq('id', editingImage.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert({
            title: title || null,
            image_url: imageUrl,
            display_order: displayOrder,
          })

        if (error) throw error
      }

      setIsModalOpen(false)
      fetchImages()
    } catch (err: any) {
      console.error('Error saving image:', err)
      alert('Failed to save image: ' + err.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchImages()
    } catch (err: any) {
      console.error('Error deleting image:', err)
      alert('Failed to delete image: ' + err.message)
    }
  }

  const filteredImages = images.filter(
    (img) =>
      !searchTerm ||
      (img.title &&
        img.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
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
            Gallery Manager
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage finished work gallery images. Add, edit, or remove photos.
            Total: {totalCount}
          </p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      {/* OneDrive helper */}
      <Card className="glass-card border-border/30 bg-brand-500/5">
        <CardContent className="p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Getting Direct Image Links from OneDrive
            </p>
            <ol className="mt-2 text-sm text-muted-foreground list-decimal list-inside space-y-1">
              <li>Open the image in OneDrive</li>
              <li>Click <strong>Share</strong> → <strong>Embed</strong></li>
              <li>Copy the <code className="text-xs bg-muted px-1 rounded">src</code> URL from the generated <code className="text-xs bg-muted px-1 rounded">&lt;iframe&gt;</code></li>
              <li>Paste it here — it will be a direct image URL ending with <code className="text-xs bg-muted px-1 rounded">.jpg</code> or similar</li>
            </ol>
            <p className="mt-2 text-xs text-muted-foreground/70">
              <strong>Tip:</strong> The URL should contain <code className="text-xs bg-muted px-1 rounded">thumbnail</code> or end with an image extension. If it does not, the image may not display correctly on the public site.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={fetchImages}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-white/5 overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title || 'Gallery image'}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-image.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-black/50 text-white hover:bg-black/70"
                        onClick={() => openEditModal(image)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-black/50 text-white hover:bg-red-500/70"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-sm font-medium text-white truncate">
                          {image.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredImages.length === 0 && (
        <Card className="glass-card border-white/5">
          <CardContent className="p-12 text-center">
            <Image className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-medium text-muted-foreground">
              {searchTerm ? 'No images match your search' : 'No images yet'}
            </h3>
            <p className="text-sm text-muted-foreground/70">
              Click &ldquo;Add Image&rdquo; to upload by pasting a OneDrive link.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display gradient-text">
              {editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Enter a title for this image"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Image URL (OneDrive Direct Link) <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste the direct image URL from OneDrive"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Use Share → Embed in OneDrive to get a direct link. The URL
                should end with .jpg, .png, .gif, or .webp
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                placeholder="Lower numbers appear first (e.g., 0)"
                value={displayOrder ?? ''}
                onChange={(e) =>
                  setDisplayOrder(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              {editingImage ? 'Save Changes' : 'Add Image'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}