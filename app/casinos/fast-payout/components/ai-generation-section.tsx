"use client"

import { useState } from "react"
import { Sparkles, RefreshCw, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAIGeneration } from "../../../../hooks/use-ai-generation"
import { AIGeneratedContent } from "./ai-generated-content"
import type { Casino } from "../../../../data/casinos"
import type { PageContent } from "../../../../types/types"

interface AIGenerationSectionProps {
  pageData: PageContent
  casinos: Casino[]
  variant?: "default" | "language"
  language?: string
}

export function AIGenerationSection({
  pageData,
  casinos,
  variant = "default",
  language = "en",
}: AIGenerationSectionProps) {
  const { state, generateContent, reset, isGenerating, isCompleted, hasError } = useAIGeneration()
  const [currentCasinos, setCurrentCasinos] = useState(casinos)

  const handleGenerateAI = async () => {
    try {
      await generateContent({
        pageContent: pageData,
        casinos: currentCasinos,
        criteria: "fast payout analysis",
      })
    } catch (error) {
      console.error("AI generation failed:", error)
    }
  }

  const handleReorderAndGenerate = () => {
    // Shuffle casinos to simulate reordering
    const shuffled = [...currentCasinos].sort(() => Math.random() - 0.5)
    const reordered = shuffled.map((casino, index) => ({
      ...casino,
      rank: index + 1,
    }))

    setCurrentCasinos(reordered)

    // Auto-trigger AI generation after reordering
    setTimeout(() => {
      generateContent({
        pageContent: pageData,
        casinos: reordered,
        criteria: "fast payout analysis",
      })
    }, 500)
  }

  const getStatusIcon = () => {
    if (isGenerating) return <RefreshCw className="h-4 w-4 animate-spin" />
    if (isCompleted) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (hasError) return <AlertCircle className="h-4 w-4 text-red-600" />
    return <Sparkles className="h-4 w-4" />
  }

  const getStatusColor = () => {
    if (isGenerating) return "bg-blue-500"
    if (isCompleted) return "bg-green-500"
    if (hasError) return "bg-red-500"
    return "bg-primary"
  }

  return (
    <div className="space-y-8">
      {/* AI Generation Control Panel */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor()}/10`}>
                <div className={`${getStatusColor().replace("bg-", "text-")}`}>{getStatusIcon()}</div>
              </div>
              <div>
                <CardTitle className="text-card-foreground">AI-Generated Casino Analysis</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Demonstrate AI-powered content generation for casino rankings
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-background text-muted-foreground border-border">
              Prototype Demo
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status and Progress */}
          {(isGenerating || isCompleted || hasError) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">{state.message}</span>
                {state.duration && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {(state.duration / 1000).toFixed(1)}s
                  </span>
                )}
              </div>
              <Progress value={state.progress} className="h-2" />
            </div>
          )}

          {/* Error Display */}
          {hasError && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Generation Failed</span>
              </div>
              <p className="text-sm text-destructive/80">{state.error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate AI Analysis"}
            </Button>

            <Button
              onClick={handleReorderAndGenerate}
              disabled={isGenerating}
              variant="outline"
              className="border-border text-card-foreground hover:bg-muted bg-transparent"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reorder Casinos & Generate
            </Button>

            {(isCompleted || hasError) && (
              <Button onClick={reset} variant="ghost" className="text-muted-foreground hover:text-card-foreground">
                Reset
              </Button>
            )}
          </div>

          {/* Context Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-card-foreground mb-2">Generation Context</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Page:</span>
                <div className="font-medium text-card-foreground">{pageData.slug}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Author:</span>
                <div className="font-medium text-card-foreground">{pageData.author.name}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Geo:</span>
                <div className="font-medium text-card-foreground">{pageData.geo.country}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Casinos:</span>
                <div className="font-medium text-card-foreground">{currentCasinos.length}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Generated Content Display */}
      {isCompleted && state.result && (
        <AIGeneratedContent data={state.result} casinos={currentCasinos} variant={variant} language={language} />
      )}
    </div>
  )
}
