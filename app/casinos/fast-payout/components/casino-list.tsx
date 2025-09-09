"use client"

import { useState } from "react"
import { Shuffle, Filter, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CasinoCard } from "./casino-card"
import type { Casino } from "../../../../data/casinos"

interface CasinoListProps {
  casinos: Casino[]
  onReorder?: (casinos: Casino[]) => void
  variant?: "default" | "language"
  language?: string
}

export function CasinoList({ casinos, onReorder, variant = "default", language = "en" }: CasinoListProps) {
  const [currentCasinos, setCurrentCasinos] = useState(casinos)
  const [isReordering, setIsReordering] = useState(false)

  const handleReorder = () => {
    setIsReordering(true)

    // Simulate reordering with a slight delay
    setTimeout(() => {
      const shuffled = [...currentCasinos].sort(() => Math.random() - 0.5)
      // Update ranks to match new order
      const reorderedCasinos = shuffled.map((casino, index) => ({
        ...casino,
        rank: index + 1,
      }))

      setCurrentCasinos(reorderedCasinos)
      onReorder?.(reorderedCasinos)
      setIsReordering(false)
    }, 1000)
  }

  if (!casinos || casinos.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <h2 className="text-lg font-semibold text-card-foreground mb-2">No Casinos Found</h2>
        <p className="text-muted-foreground">Unable to load casino data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card border border-border rounded-lg p-4">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Top {currentCasinos.length} Fast Payout Casinos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Ranked by withdrawal speed and reliability</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border text-card-foreground hover:bg-muted bg-transparent"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-border text-card-foreground hover:bg-muted bg-transparent"
          >
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>

          <Button
            onClick={handleReorder}
            disabled={isReordering}
            variant="default"
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            {isReordering ? "Reordering..." : "Reorder & Generate AI"}
          </Button>
        </div>
      </div>

      {/* Casino Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCasinos.map((casino) => (
          <CasinoCard key={casino.id} casino={casino} variant={variant} language={language} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button
          variant="outline"
          size="lg"
          className="border-border text-card-foreground hover:bg-muted bg-transparent"
        >
          Load More Casinos
        </Button>
      </div>
    </div>
  )
}
