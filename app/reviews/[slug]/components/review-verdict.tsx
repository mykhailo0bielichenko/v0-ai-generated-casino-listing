import { Gavel, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Casino } from "../../../../data/casinos"

interface ReviewVerdictProps {
  casino: Casino
}

export default function ReviewVerdict({ casino }: ReviewVerdictProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Gavel className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Final Verdict</h2>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground flex items-center justify-between">
            <span>{casino.brand} Review Summary</span>
            <div className="text-2xl font-bold text-primary">{casino.review.overallRating}/10</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-card-foreground leading-relaxed">{casino.review.verdict}</p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={casino.urls.signup} target="_blank" rel="noopener noreferrer">
                Visit {casino.brand}
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-border text-card-foreground hover:bg-muted bg-transparent"
            >
              <a href={casino.urls.homepage} target="_blank" rel="noopener noreferrer">
                Learn More
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
