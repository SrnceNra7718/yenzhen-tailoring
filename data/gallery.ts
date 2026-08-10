export interface GalleryItem {
  id: string
  src: string
  title: string
  category: string
  alt: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'muse-1',
    src: '/images/gallery/muse.jpg',
    title: 'Muse Performance Uniform',
    category: 'Cheer/Dance',
    alt: 'Custom cheer and dance performance uniform',
  },
  {
    id: 'muse-2',
    src: '/images/gallery/muse (2).jpg',
    title: 'Muse Uniform Design',
    category: 'Cheer/Dance',
    alt: 'Alternative view of custom muse performance uniform',
  },
]
