import type { Casino } from "../../../../data/casinos"
import type { Author } from "../../../../types/types"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Star, Shield, Clock, Award } from "lucide-react"

interface ReviewHeroProps {
  casino: Casino
  author: Author
}

export default function ReviewHero({ casino, author }: ReviewHeroProps) {
  const currentYear = new Date().getFullYear()

  return (
    <header className="bg-card border border-border rounded-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            {casino.brand} Casino Review {currentYear}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(casino.review.overallRating / 2)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">{casino.review.overallRating}/10</span>
            </div>

            <div className="flex gap-2">
              {casino.licenses.map((license) => (
                <Badge
                  key={license.authority}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {license.authority}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6 text-pretty">{casino.review.summary}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="outline" className="bg-card text-foreground border-border">
              <Clock className="w-3 h-3 mr-1" />
              {casino.payments.payoutSpeedHours.min}-{casino.payments.payoutSpeedHours.max}h payouts
            </Badge>
            <Badge variant="outline" className="bg-card text-foreground border-border">
              <Award className="w-3 h-3 mr-1" />
              {casino.games.total}+ games
            </Badge>
            {casino.trust.audits.length > 0 && (
              <Badge variant="outline" className="bg-card text-foreground border-border">
                <Shield className="w-3 h-3 mr-1" />
                {casino.trust.audits[0].provider} audited
              </Badge>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Expert review by <span className="font-medium text-foreground">{author.name}</span> • Updated{" "}
            {new Date(casino.review.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="lg:w-80 bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{casino.review.overallRating}/10</div>
            <div className="text-sm text-muted-foreground mb-4">Expert Rating</div>

            {casino.bonuses.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-foreground mb-1">{casino.bonuses[0].title}</div>
                <div className="text-sm text-muted-foreground">
                  {casino.bonuses[0].wagering.x}x wagering • Min deposit {casino.bonuses[0].minDeposit}€
                </div>
              </div>
            )}

            <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
              <a href={casino.urls.signup} target="_blank" rel="noopener noreferrer">
                Play at {casino.brand}
              </a>
            </Button>

            <div className="text-xs text-muted-foreground mt-2">18+ • T&Cs apply • Play responsibly</div>
          </div>
        </div>
      </div>
    </header>
  )
}
