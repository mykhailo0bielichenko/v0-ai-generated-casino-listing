import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Casino } from "../../../../data/casinos"

interface ReviewProsAndConsProps {
  casino: Casino
}

export default function ReviewProsAndCons({ casino }: ReviewProsAndConsProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Pros & Cons</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              Pros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {casino.review.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-card-foreground">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <ThumbsDown className="h-5 w-5 text-red-500" />
              Cons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {casino.review.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-card-foreground">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
