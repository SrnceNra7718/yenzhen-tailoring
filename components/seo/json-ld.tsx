'use server'

export function JsonLdSchema({
  type,
  data,
}: {
  type: 'Product' | 'LocalBusiness' | 'Review' | 'AggregateRating' | 'Organization'
  data: Record<string, any>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}