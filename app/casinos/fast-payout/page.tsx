import { Navigation } from "../../../components/navigation"
import { Footer } from "../../../components/footer"
import { CasinoList } from "./components/casino-list"
import { AIGenerationSection } from "./components/ai-generation-section"
import { PageHero } from "./components/page-hero"
import { DebugPanel } from "./components/debug-panel"
import { SEOContentSection } from "./components/seo-content-section"
import { TOP6_CASINOS_MOCK } from "../../../data/casinos"
import { fastPayoutPageData } from "./fast-payout.data"

export default function FastPayoutPage() {
  // Server component - fetch data and pass to client components
  const pageData = fastPayoutPageData
  const casinos = TOP6_CASINOS_MOCK

  const isDebugMode = process.env.NODE_ENV === "development"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Hero Section */}
        <PageHero pageData={pageData} />

        {/* Casino Listing Section */}
        <section className="mb-12">
          <CasinoList casinos={casinos} />
        </section>

        {/* AI Generated Section */}
        <section className="mb-12">
          <AIGenerationSection pageData={pageData} casinos={casinos} />
        </section>

        {/* SEO Content Section */}
        {pageData.seoContent && <SEOContentSection content={pageData.seoContent} />}
      </main>

      <Footer />

      {/* Debug Panel for Development */}
      {isDebugMode && <DebugPanel pageData={pageData} casinos={casinos} />}
    </div>
  )
}
