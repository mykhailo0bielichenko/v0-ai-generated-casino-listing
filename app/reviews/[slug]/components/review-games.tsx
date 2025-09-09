import { Gamepad2, Users, Trophy, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Casino } from "../../../../data/casinos"

interface ReviewGamesProps {
  casino: Casino
}

export default function ReviewGames({ casino }: ReviewGamesProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Gamepad2 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Games & Software</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{casino.games.total.toLocaleString()}</div>
              <div className="text-sm text-foreground/70">Total Games</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{casino.games.liveDealer}</div>
              <div className="text-sm text-foreground/70">Live Dealer Games</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{casino.games.providers.length}</div>
              <div className="text-sm text-foreground/70">Game Providers</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Game Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {casino.games.providers.map((provider) => (
              <Badge key={provider} variant="outline" className="bg-background text-foreground border-border">
                {provider}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Popular Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {casino.games.topTitles.map((game) => (
              <div key={game} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-card-foreground">{game}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {casino.features.hasCasino && (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Casino Games</h4>
                  <p className="text-sm text-foreground/70">Slots, table games, and more</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {casino.features.hasLiveCasino && (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Live Casino</h4>
                  <p className="text-sm text-foreground/70">{casino.games.liveDealer} live dealer games</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
