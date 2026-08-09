export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features?: string[]
}

export const services: Service[] = [
  {
    id: 'sublimation',
    title: 'Sublimation Printing',
    description: 'Vibrant, durable all-over prints that won\'t crack, fade, or peel. Perfect for complex designs and team uniforms. Unlimited colors, no minimums.',
    icon: 'printer',
    features: ['Unlimited colors', 'All-over print', 'Eco-friendly inks'],
  },
  {
    id: 'basketball-packages',
    title: 'Basketball Team Packages',
    description: 'Complete uniform packages for basketball teams — jerseys, shorts, warmers, and warm-up jackets. Coordinated designs that build team identity.',
    icon: 'users',
    features: ['Full coordination', 'Bulk pricing', 'Size management'],
  },
  {
    id: 'custom-design',
    title: 'Custom Design',
    description: 'Full-service design team that brings your vision to life. From concept to final artwork, we handle every detail with precision.',
    icon: 'palette',
    features: ['Free mockups', 'Pantone matching', 'Unlimited revisions'],
  },
  {
    id: 'team-orders',
    title: 'Team Order Management',
    description: 'Bulk order management with dedicated support. We handle sizing, quantities, and deadlines for your whole squad.',
    icon: 'layers',
    features: ['Bulk discounts', 'Sizing charts', 'Deadline priority'],
  },
  {
    id: 'embroidery',
    title: 'Embroidery',
    description: 'Premium stitched logos and text. Adds a professional, textured finish to jerseys, hoodies, and warmers.',
    icon: 'scissors',
    features: ['3D puff options', 'Thread matching', 'Durable stitch'],
  },
  {
    id: 'consultation',
    title: 'Design Consultation',
    description: 'Free consultation to discuss your project. We help with layouts, colors, and materials to ensure the perfect result.',
    icon: 'message-circle',
    features: ['Free advice', 'Material guidance', 'Budget planning'],
  },
]
