export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'custom-jersey',
    title: 'Custom Jersey Printing',
    description: 'Full sublimation jerseys for basketball, volleyball, and other sports. Vibrant, durable designs that won\'t fade.',
    icon: 'palette',
  },
  {
    id: 'team-package',
    title: 'Team Uniform Packages',
    description: 'Complete uniform packages including jerseys, shorts, and warm-ups. Unified look for your entire squad.',
    icon: 'users',
  },
  {
    id: 'sublimation',
    title: 'Sublimation Printing',
    description: 'Vibrant, durable all-over prints that won\'t crack, fade, or peel. Perfect for complex designs and team uniforms.',
    icon: 'printer',
  },
  {
    id: 'riding-sleeve',
    title: 'Riding Sleeves',
    description: 'Custom compression sleeves for cycling and racing. Breathable fabric with your team branding.',
    icon: 'activity',
  },
  {
    id: 'casual-wear',
    title: 'Custom Casual Wear',
    description: 'T-shirts, hoodies, and warmers with custom sublimation. Great for team events and merchandise.',
    icon: 'shirt',
  },
  {
    id: 'cheer-dance',
    title: 'Cheer & Dance Uniforms',
    description: 'Custom muse uniforms for cheer and dance teams. Sparkle-ready designs for performances and competitions.',
    icon: 'star',
  },
]
