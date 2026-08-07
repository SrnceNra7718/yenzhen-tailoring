export interface Product {
  id: string
  name: string
  category: string
  description: string
  image: string
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 'basketball-jersey',
    name: 'Custom Basketball Jersey',
    category: 'Basketball',
    description: 'Premium sublimation basketball jersey. Full custom design with team name, numbers, and logos. Built for performance and style on the court.',
    image: 'https://images.unsplash.com/photo-1519861531473-9200263931cc?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 'basketball-shorts',
    name: 'Matching Basketball Shorts',
    category: 'Basketball',
    description: 'Breathable athletic shorts designed to match your custom jersey. Durable construction for intense gameplay.',
    image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 'hoodie',
    name: 'Custom Hoodie',
    category: 'Casual',
    description: 'Premium fleece hoodie with full sublimation print. Perfect for team warm-ups or casual wear.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 'sando',
    name: 'Performance Sando',
    category: 'Athletic',
    description: 'Lightweight tank top ideal for training and competition. Moisture-wicking fabric keeps you cool.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop',
    featured: false,
  },
  {
    id: 'muse-uniform',
    name: 'Muse Uniform',
    category: 'Cheer/Dance',
    description: 'Elegant cheer and dance uniform with custom designs. Sparkle-ready for performances and competitions.',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 'volleyball-jersey',
    name: 'Volleyball Jersey',
    category: 'Volleyball',
    description: 'Lightweight, breathable volleyball jersey with custom team branding. Designed for maximum mobility.',
    image: 'https://images.unsplash.com/photo-1592656094267-764e2f86f3c0?w=600&h=600&fit=crop',
    featured: false,
  },
  {
    id: 'team-uniform',
    name: 'Full Team Uniform',
    category: 'Team',
    description: 'Complete team uniform package — jerseys, shorts, and warm-ups. Unified look for your entire squad.',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 'jacket',
    name: 'Custom Track Jacket',
    category: 'Casual',
    description: 'Sleek track jacket with custom sublimation. Lightweight, stylish, and perfect for team events.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
    featured: false,
  },
]

export const categories = [
  'All',
  'Basketball',
  'Volleyball',
  'Athletic',
  'Casual',
  'Cheer/Dance',
  'Team',
]
