import { Clock, Shield, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { PageContent } from "../../../../types/types"

interface PageHeroProps {
  pageData: PageContent
  variant?: "default" | "language"
  language?: string
}

export function PageHero({ pageData, variant = "default", language = "en" }: PageHeroProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="mb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-primary transition-colors">
          Home
        </a>
        <span>/</span>
        <a href="/casinos" className="hover:text-primary transition-colors">
          Casinos
        </a>
        <span>/</span>
        <span className="text-foreground">Fast Payout</span>
      </nav>

      {/* Hero Content */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-xl p-8 md:p-12">
        <div className="max-w-4xl">
          {/* Title and Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="default" className="bg-primary text-primary-foreground border-transparent">
              <Clock className="h-3 w-3 mr-1" />
              Fast Payout
            </Badge>
            <Badge variant="outline" className="bg-background text-foreground border-border">
              <Shield className="h-3 w-3 mr-1" />
              Expert Verified
            </Badge>
            <Badge variant="outline" className="bg-background text-foreground border-border">
              <TrendingUp className="h-3 w-3 mr-1" />
              Updated {formatDate(pageData.updatedAt)}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {pageData.content.hero.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-6 text-pretty leading-relaxed">
            {pageData.content.hero.description}
          </p>

          {/* Author Attribution */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">
                {pageData.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="font-medium text-card-foreground">{pageData.author.name}</p>
              <p className="text-sm text-muted-foreground">{pageData.author.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-2">6</div>
          <div className="text-sm text-muted-foreground">Top Casinos Analyzed</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-accent mb-2">&lt;24h</div>
          <div className="text-sm text-muted-foreground">Average Payout Time</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-2">100%</div>
          <div className="text-sm text-muted-foreground">Expert Verified</div>
        </div>
      </div>
    </div>
  )
}
