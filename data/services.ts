export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'custom-design',
    title: 'Custom Design',
    description: 'Full-service design team that brings your vision to life. From concept to final artwork, we handle every detail.',
    icon: 'palette',
  },
  {
    id: 'sublimation',
    title: 'Sublimation Printing',
    description: 'Vibrant, durable all-over prints that won\'t crack, fade, or peel. Perfect for complex designs and team uniforms.',
    icon: 'printer',
  },
  {
    id: 'screen-print',
    title: 'Screen Printing',
    description: 'Classic screen printing for bold, long-lasting graphics. Cost-effective for larger team orders.',
    icon: 'layers',
  },
  {
    id: 'embroidery',
    title: 'Embroidery',
    description: 'Premium stitched logos and text. Adds a professional, textured finish to jerseys, hoodies, and bags.',
    icon: 'scissors',
  },
  {
    id: 'team-orders',
    title: 'Team Orders',
    description: 'Bulk order management with dedicated support. We handle sizing, quantities, and deadlines for your whole squad.',
    icon: 'users',
  },
  {
    id: 'consultation',
    title: 'Design Consultation',
    description: 'Free consultation to discuss your project. We help with layouts, colors, and materials to ensure the perfect result.',
    icon: 'message-circle',
  },
]
