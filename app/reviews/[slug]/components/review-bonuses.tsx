import { Gift, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Casino } from "../../../../data/casinos"

interface ReviewBonusesProps {
  casino: Casino
}

export default function ReviewBonuses({ casino }: ReviewBonusesProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Gift className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Bonuses & Promotions</h2>
      </div>

      <div className="grid gap-4">
        {casino.bonuses.map((bonus) => (
          <Card key={bonus.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-card-foreground">{bonus.title}</CardTitle>
                  <Badge variant="outline" className="mt-2 bg-primary text-white border-primary">
                    {bonus.type}
                  </Badge>
                </div>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={casino.urls.signup} target="_blank" rel="noopener noreferrer">
                    Claim Bonus
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-card-foreground">Bonus Details</h4>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    {bonus.value.matchPercent && <li>• {bonus.value.matchPercent}% match bonus</li>}
                    {bonus.value.maxAmount && (
                      <li>
                        • Up to {bonus.value.currency}
                        {bonus.value.maxAmount}
                      </li>
                    )}
                    {bonus.value.spins && <li>• {bonus.value.spins} free spins</li>}
                    {bonus.value.cashbackPercent && <li>• {bonus.value.cashbackPercent}% cashback</li>}
                    <li>
                      • Minimum deposit: {bonus.value.currency}
                      {bonus.minDeposit}
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-card-foreground">Terms & Conditions</h4>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• {bonus.wagering.x}x wagering requirement</li>
                    <li>
                      • Max bet: {bonus.value.currency}
                      {bonus.wagering.maxBet}
                    </li>
                    <li>• Valid for {bonus.wagering.expiryDays} days</li>
                    <li>• Applies to: {bonus.wagering.appliesTo}</li>
                  </ul>
                </div>
              </div>

              {bonus.wagering.excludedGames.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-card-foreground">Excluded Games:</p>
                    <p className="text-foreground/70">{bonus.wagering.excludedGames.join(", ")}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <Clock className="h-3 w-3" />
                <span>Verified on {new Date(bonus.verifiedOn).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
