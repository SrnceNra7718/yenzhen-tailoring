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
    name: 'Team Coach Rivera',
    role: 'Basketball Team',
    text: 'The quality of the jerseys exceeded our expectations. The sublimation print is vibrant and held up perfectly through an entire season.',
    rating: 5,
  },
  {
    id: 'test-002',
    name: 'Dance Studio Owner',
    role: 'Muse Uniforms',
    text: 'Our performers love the custom designs. The uniforms are comfortable, durable, and always get compliments.',
    rating: 5,
  },
  {
    id: 'test-003',
    name: 'Volleyball Captain',
    role: 'Volleyball Team',
    text: 'Fast turnaround and great communication. The jerseys fit perfectly and the design looked exactly like our mockup.',
    rating: 4,
  },
]
