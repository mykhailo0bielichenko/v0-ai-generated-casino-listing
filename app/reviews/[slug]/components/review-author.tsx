import { User, Calendar, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Author } from "../../../../data/authors"

interface ReviewAuthorProps {
  author: Author
  publishedDate: Date
}

export default function ReviewAuthor({ author, publishedDate }: ReviewAuthorProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <User className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">About the Author</h2>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-card-foreground">{author.name}</CardTitle>
              <p className="text-foreground/70 mt-1">{author.title}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {author.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="outline"
                    className="bg-background text-foreground border-border text-xs"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/80 leading-relaxed">{author.bio}</p>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground/70">{author.experience} years of experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground/70">Updated {publishedDate.toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
