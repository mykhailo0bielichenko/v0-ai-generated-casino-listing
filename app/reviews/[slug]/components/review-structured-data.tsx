import type { Casino } from "../../../../data/casinos"
import type { Author } from "../../../../types/types"

interface ReviewStructuredDataProps {
  casino: Casino
  author: Author
}

export default function ReviewStructuredData({ casino, author }: ReviewStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: casino.brand,
      url: casino.urls.homepage,
      sameAs: [casino.urls.homepage],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: casino.review.overallRating,
        bestRating: 10,
        worstRating: 0,
        ratingCount: 1,
      },
    },
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      knowsAbout: author.specialties,
      hasCredential: author.credentials,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: casino.review.overallRating,
      bestRating: 10,
      worstRating: 0,
    },
    reviewBody: casino.review.summary,
    datePublished: casino.review.lastUpdated,
    dateModified: casino.review.lastUpdated,
    publisher: {
      "@type": "Organization",
      name: "Casino Expert Reviews",
    },
    positiveNotes: casino.review.pros,
    negativeNotes: casino.review.cons,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
