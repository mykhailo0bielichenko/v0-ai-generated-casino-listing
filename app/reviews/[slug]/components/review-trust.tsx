import { Shield, Award, FileCheck, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Casino } from "../../../../data/casinos"

interface ReviewTrustProps {
  casino: Casino
}

export default function ReviewTrust({ casino }: ReviewTrustProps) {
  const trustPercentage = (casino.trust.rating / 5) * 100

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Trust & Security</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Trust Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{casino.trust.rating}/5</div>
              <Progress value={trustPercentage} className="mt-2" />
            </div>
            <div className="text-sm text-foreground/70 space-y-1">
              <p>• Established: {new Date(casino.trust.established).getFullYear()}</p>
              <p>• Complaint rate: {casino.trust.complaintRate90d}%</p>
              <p>• RTP transparency: {casino.trust.rtpTransparency}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              Licenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {casino.licenses.map((license) => (
                <div key={license.licenseId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <Badge variant="outline" className="bg-primary text-white border-primary mb-1">
                      {license.authority}
                    </Badge>
                    <p className="text-xs text-foreground/70">License: {license.licenseId}</p>
                  </div>
                  <div className="text-xs text-foreground/70">Since {new Date(license.validFrom).getFullYear()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Audits & Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {casino.trust.audits.map((audit) => (
              <div key={audit.provider} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-card-foreground">{audit.provider}</p>
                    <p className="text-xs text-foreground/70">Independent testing lab</p>
                  </div>
                </div>
                <div className="text-xs text-foreground/70">
                  Last audit: {new Date(audit.lastAudit).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Responsible Gambling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {casino.trust.rgTools.map((tool) => (
              <Badge key={tool} variant="outline" className="bg-background text-foreground border-border">
                {tool.replace("-", " ")}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-foreground/70 mt-3">
            {casino.brand} provides comprehensive responsible gambling tools to help players maintain control over their
            gaming experience.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
