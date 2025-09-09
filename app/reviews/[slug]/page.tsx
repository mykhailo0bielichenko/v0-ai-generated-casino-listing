import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TOP6_CASINOS_MOCK } from "../../../data/casinos"
import { authors } from "../../../data/authors"
import { Navigation } from "../../../components/navigation"
import { Footer } from "../../../components/footer"
import ReviewHero from "./components/review-hero"
import ReviewOverview from "./components/review-overview"
import ReviewBonuses from "./components/review-bonuses"
import ReviewPayments from "./components/review-payments"
import ReviewGames from "./components/review-games"
import ReviewTrust from "./components/review-trust"
import ReviewSupport from "./components/review-support"
import ReviewProsAndCons from "./components/review-pros-and-cons"
import ReviewVerdict from "./components/review-verdict"
import ReviewFAQ from "./components/review-faq"
import ReviewAuthor from "./components/review-author"
import ReviewStructuredData from "./components/review-structured-data"

interface ReviewPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const casino = TOP6_CASINOS_MOCK.find((c) => c.slug === params.slug)

  if (!casino) {
    return {
      title: "Casino Review Not Found",
      description: "The requested casino review could not be found.",
    }
  }

  const author = authors.find((a) => a.name === casino.review.author.name) || authors[0]

  return {
    title: `${casino.brand} Review ${new Date().getFullYear()} - Expert Analysis & Rating`,
    description: `Comprehensive ${casino.brand} casino review by ${author.name}. ${casino.review.summary} Rating: ${casino.review.overallRating}/10. Updated ${new Date(casino.review.lastUpdated).toLocaleDateString()}.`,
    keywords: [
      `${casino.brand} review`,
      `${casino.brand} casino`,
      "online casino review",
      "casino rating",
      "casino bonuses",
      "fast payout casino",
      "trusted casino",
      ...casino.licenses.map((l) => `${l.authority} licensed casino`),
    ],
    authors: [{ name: author.name }],
    openGraph: {
      title: `${casino.brand} Casino Review ${new Date().getFullYear()} - ${casino.review.overallRating}/10 Rating`,
      description: casino.review.summary,
      type: "article",
      publishedTime: casino.review.lastUpdated,
      authors: [author.name],
      tags: [`${casino.brand}`, "casino review", "online gambling"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${casino.brand} Review - ${casino.review.overallRating}/10`,
      description: casino.review.summary,
    },
    alternates: {
      canonical: `/reviews/${casino.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return TOP6_CASINOS_MOCK.map((casino) => ({
    slug: casino.slug,
  }))
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const casino = TOP6_CASINOS_MOCK.find((c) => c.slug === params.slug)

  if (!casino) {
    notFound()
  }

  const author = authors.find((a) => a.name === casino.review.author.name) || authors[0]
  const publishedDate = new Date(casino.review.lastUpdated)
  const currentYear = new Date().getFullYear()

  return (
    <>
      <ReviewStructuredData casino={casino} author={author} />

      <div className="min-h-screen bg-background">
        <Navigation variant="default" language="en" />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <ReviewHero casino={casino} author={author} />

          <ReviewOverview casino={casino} />

          <div className="space-y-12">
            <ReviewBonuses casino={casino} />
            <ReviewPayments casino={casino} />
            <ReviewGames casino={casino} />
            <ReviewTrust casino={casino} />
            <ReviewSupport casino={casino} />
            <ReviewProsAndCons casino={casino} />
            <ReviewVerdict casino={casino} />
            <ReviewFAQ casino={casino} />
            <ReviewAuthor author={author} publishedDate={publishedDate} />
          </div>
        </main>

        <Footer variant="default" language="en" />
      </div>
    </>
  )
}
