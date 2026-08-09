export interface Testimonial {
  id: string
  name: string
  role?: string
  text: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Coach Miguel Santos',
    role: 'Basketball Team Captain',
    text: 'The sublimation jerseys arrived and our team looked incredible. Colors stayed vibrant all season, even after weekly washes. Best uniform investment we have made.',
    rating: 5,
  },
  {
    id: 'test-002',
    name: 'Sarah Chen',
    role: 'League Organizer',
    text: 'We ordered full team packages for 12 teams. The quality was consistent across every jersey and the turnaround was faster than promised. Highly recommended.',
    rating: 5,
  },
  {
    id: 'test-003',
    name: 'Coach Rivera',
    role: 'Youth Basketball Program',
    text: 'From warmers to full jerseys, everything matched perfectly. The kids felt like professionals. The design team captured our team spirit exactly.',
    rating: 5,
  },
  {
    id: 'test-004',
    name: 'Dance Studio Owner',
    role: 'Muse Uniforms',
    text: 'Our performers love the custom designs. The uniforms are comfortable, durable, and always get compliments.',
    rating: 5,
  },
]
