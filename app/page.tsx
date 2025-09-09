import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "../components/navigation"
import { Footer } from "../components/footer"
import { Sparkles, Clock, Shield, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            AI-Powered Casino Analysis
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            Experience the future of iGaming affiliate content with our AI-powered casino ranking system. See how
            artificial intelligence can generate expert-level analysis and recommendations.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/casinos/fast-payout">
              <Sparkles className="h-5 w-5 mr-2" />
              View AI Demo
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-card border-border text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg text-card-foreground">AI Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced AI analyzes casino data to generate expert-level content and rankings
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg text-card-foreground">Real-time Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Content automatically updates when casino rankings change, ensuring accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg text-card-foreground">Expert Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All AI-generated content follows expert methodologies and industry standards
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg text-card-foreground">Data-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Decisions based on comprehensive data analysis, not subjective opinions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">See AI in Action</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visit our Fast Payout Casinos page to see how AI can analyze casino data, generate expert content, and
            create dynamic rankings that update in real-time.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/casinos/fast-payout">Try the Demo</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
