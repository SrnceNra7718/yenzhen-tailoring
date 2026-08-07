export interface FAQ {
  id: string
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: 'faq-001',
    question: 'What is sublimation printing?',
    answer: 'Sublimation printing uses heat to transfer dye directly into fabric fibers. The result is a vibrant, permanent design that will not crack, fade, or peel — even after repeated washes.',
  },
  {
    id: 'faq-002',
    question: 'How long does a custom order take?',
    answer: 'Production time varies by order size and complexity. Standard orders typically take 2–3 weeks. Rush orders may be available — contact us for details.',
  },
  {
    id: 'faq-003',
    question: 'Do you offer design assistance?',
    answer: 'Yes. Our design team can help you create or refine your artwork at no additional cost. Share your ideas and we will bring them to life.',
  },
  {
    id: 'faq-004',
    question: 'What is the minimum order quantity?',
    answer: 'We accommodate orders of all sizes. Whether you need a single custom piece or a full team uniform set, we are ready to help.',
  },
  {
    id: 'faq-005',
    question: 'Can I reorder the same design later?',
    answer: 'Absolutely. We keep your design files on file for easy reorders. Simply reach out and we can reproduce the same look quickly.',
  },
  {
    id: 'faq-006',
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, GCash, and cash payments. Payment terms are discussed during the quoting process.',
  },
]
