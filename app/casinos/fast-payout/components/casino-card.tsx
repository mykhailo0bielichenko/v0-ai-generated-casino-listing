import { Star, Clock, CreditCard, Shield, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Casino } from "../../../../data/casinos"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CasinoCardProps {
  casino: Casino
  variant?: "default" | "language"
  language?: string
}

export function CasinoCard({ casino, variant = "default", language = "en" }: CasinoCardProps) {
  const formatPayoutTime = (hours: { min: number; max: number }) => {
    if (hours.max <= 24) {
      return `${hours.min}-${hours.max}h`
    }
    return `${Math.floor(hours.min / 24)}-${Math.floor(hours.max / 24)} days`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn("h-4 w-4", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
      />
    ))
  }

  const primaryBonus = casino.bonuses[0]

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">{casino.brand.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {casino.brand}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(casino.trust.rating)}
                <span className="text-sm text-foreground ml-1">{casino.trust.rating}/5</span>
              </div>
            </div>
          </div>
          <Badge variant="default" className="bg-accent text-white border-transparent">
            #{casino.rank}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bonus Information */}
        {primaryBonus && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs bg-primary text-white border-primary">
                {primaryBonus.type}
              </Badge>
            </div>
            <p className="text-sm font-medium text-card-foreground">{primaryBonus.title}</p>
            <p className="text-xs text-foreground/70 mt-1">
              {primaryBonus.wagering.x}x wagering • Min deposit: €{primaryBonus.minDeposit}
            </p>
          </div>
        )}

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-foreground/70">Payout Time</p>
              <p className="text-sm font-medium text-card-foreground">
                {formatPayoutTime(casino.payments.payoutSpeedHours)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-foreground/70">Methods</p>
              <p className="text-sm font-medium text-card-foreground">
                {casino.payments.withdrawalMethods.length}+ options
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs text-foreground/70">{casino.licenses[0]?.authority}</span>
          </div>
          {casino.trust.audits.length > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs text-foreground/70">{casino.trust.audits[0].provider} Audited</span>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap gap-1">
          {casino.payments.withdrawalMethods.slice(0, 4).map((method) => (
            <Badge key={method} variant="outline" className="text-xs bg-background text-foreground border-border">
              {method}
            </Badge>
          ))}
          {casino.payments.withdrawalMethods.length > 4 && (
            <Badge variant="outline" className="text-xs bg-background text-foreground border-border">
              +{casino.payments.withdrawalMethods.length - 4} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={casino.urls.signup} target="_blank" rel="noopener noreferrer">
              Visit Casino
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border text-card-foreground hover:bg-muted bg-transparent"
          >
            <Link href={`/reviews/${casino.slug}`}>Read Review</Link>
          </Button>
        </div>

        {/* Review Summary */}
        <div className="text-xs text-foreground/70 bg-muted/30 rounded p-2">
          <p className="line-clamp-2">{casino.review.summary}</p>
        </div>
      </CardContent>
    </Card>
  )
}
