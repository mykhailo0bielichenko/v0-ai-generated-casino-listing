import type { Casino } from "../../../../data/casinos"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Progress } from "../../../../components/ui/progress"
import { Shield, Zap, Gift, Gamepad2, TrendingUp } from "lucide-react"

interface ReviewOverviewProps {
  casino: Casino
}

export default function ReviewOverview({ casino }: ReviewOverviewProps) {
  const metrics = [
    { label: "Trust Score", value: casino.metrics.trustScore, icon: Shield, color: "text-green-600" },
    { label: "Payout Speed", value: casino.metrics.payoutSpeedScore, icon: Zap, color: "text-blue-600" },
    { label: "Bonus Value", value: casino.metrics.bonusScore, icon: Gift, color: "text-purple-600" },
    { label: "Game Selection", value: casino.metrics.gameSelectionScore, icon: Gamepad2, color: "text-orange-600" },
    { label: "Rising Star", value: casino.metrics.risingStarScore, icon: TrendingUp, color: "text-pink-600" },
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">Quick Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Key Facts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Established</span>
              <span className="font-medium text-foreground">{new Date(casino.trust.established).getFullYear()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">License</span>
              <div className="flex gap-1">
                {casino.licenses.slice(0, 2).map((license) => (
                  <Badge key={license.authority} variant="secondary" className="text-xs bg-primary/10 text-primary">
                    {license.authority}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Games</span>
              <span className="font-medium text-foreground">{casino.games.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Min Deposit</span>
              <span className="font-medium text-foreground">€{casino.payments.minDeposit}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${metric.color}`} />
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                      </div>
                      <span className="font-medium text-foreground">{metric.value}/100</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {casino.facts.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Verified Facts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {casino.facts.slice(0, 6).map((fact) => (
                <div key={fact.key} className="space-y-1">
                  <div className="font-medium text-foreground">
                    {fact.value} {fact.unit}
                  </div>
                  <div className="text-sm text-muted-foreground">{fact.key.replace(/_/g, " ")}</div>
                  {fact.period && <div className="text-xs text-muted-foreground">{fact.period}</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
