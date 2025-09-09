import { MessageCircle, Mail, Phone, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Casino } from "../../../../data/casinos"

interface ReviewSupportProps {
  casino: Casino
}

export default function ReviewSupport({ casino }: ReviewSupportProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Customer Support</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-card-foreground">{casino.support.liveChat}</span>
              </div>
              <p className="text-sm text-foreground/70">Instant support through live chat widget</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium text-card-foreground">{casino.support.email}</p>
              <p className="text-sm text-foreground/70">Detailed support via email</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {casino.support.phone && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium text-card-foreground">{casino.support.phone}</p>
              <p className="text-sm text-foreground/70">Direct phone line for urgent matters</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Supported Languages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {casino.support.languages.map((language) => (
              <Badge key={language} variant="outline" className="bg-background text-foreground border-border">
                {language}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-foreground/70 mt-3">
            Customer support is available in multiple languages to assist international players.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
