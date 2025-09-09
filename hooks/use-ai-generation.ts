"use client"

import { useState, useCallback } from "react"
import type { Casino } from "../data/casinos"
import type { PageContent } from "../types/types"
import type { CriteriaSnapshot } from "../types/criteria-content-schemas-full"

export interface AIGenerationState {
  status: "idle" | "generating" | "completed" | "error"
  progress: number
  message: string
  result?: CriteriaSnapshot
  error?: string
  duration?: number
}

export interface AIGenerationRequest {
  pageContent: PageContent
  casinos: Casino[]
  criteria: string
}

export function useAIGeneration() {
  const [state, setState] = useState<AIGenerationState>({
    status: "idle",
    progress: 0,
    message: "Ready to generate",
  })

  const generateContent = useCallback(async (request: AIGenerationRequest) => {
    setState({
      status: "generating",
      progress: 10,
      message: "Preparing AI generation...",
    })

    try {
      console.log("[v0] Starting AI generation request")

      // Simulate progress updates
      setState((prev) => ({
        ...prev,
        progress: 25,
        message: "Analyzing casino data...",
      }))

      const response = await fetch("/api/ai-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      setState((prev) => ({
        ...prev,
        progress: 75,
        message: "Processing AI response...",
      }))

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "AI generation failed")
      }

      setState({
        status: "completed",
        progress: 100,
        message: "AI generation completed successfully",
        result: result.data,
        duration: result.duration,
      })

      console.log("[v0] AI generation completed successfully")
      return result.data
    } catch (error) {
      console.error("[v0] AI generation failed:", error)

      setState({
        status: "error",
        progress: 0,
        message: "AI generation failed",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })

      throw error
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      status: "idle",
      progress: 0,
      message: "Ready to generate",
    })
  }, [])

  return {
    state,
    generateContent,
    reset,
    isGenerating: state.status === "generating",
    isCompleted: state.status === "completed",
    hasError: state.status === "error",
  }
}
