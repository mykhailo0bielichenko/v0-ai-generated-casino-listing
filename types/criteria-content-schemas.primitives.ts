import { z } from "zod"

// Criterion enum for discriminated union
export const CriterionEnum = z.enum([
  "most_trusted",
  "best_bonus",
  "best_payout",
  "rising_star",
  "best_games",
  "fast_payout",
])

// Link schema for external references
export const LinkSchema = z.object({
  url: z.string().url().describe("Absolute URL to external resource"),
  label: z.string().min(2).max(60).describe("Link text/label"),
  openInNewTab: z.boolean().default(true).describe("Whether to open in new tab"),
})

// Statistical data pairs
export const StatPairSchema = z.object({
  label: z.string().min(2).max(40).describe("Stat label, e.g., 'Avg Payout Time'"),
  value: z.string().min(1).max(20).describe("Stat value, e.g., '2.1 hours'"),
  unit: z.string().max(10).optional().describe("Optional unit, e.g., 'hours', '%'"),
})

// Most Trusted Content Schema
export const MostTrustedContentSchema = z.object({
  criterion: z.literal("most_trusted"),
  winnerCasinoId: z.string().describe("ID of the winning casino"),
  title: z.string().min(8).max(60).describe("Card title, e.g., 'Most Trusted Casino'"),
  subtitle: z.string().min(8).max(80).optional().describe("Optional subtitle"),
  proofText: z.string().min(40).max(200).describe("Evidence-based explanation of why this casino won"),
  keyStats: z.array(StatPairSchema).min(2).max(4).describe("Key trust metrics"),
  trustFactors: z.array(z.string().min(5).max(80)).min(2).max(5).describe("Trust indicators"),
  methodologyLink: LinkSchema.describe("Link to trust methodology page"),
  reviewLink: LinkSchema.describe("Link to full casino review"),
})

// Best Bonus Content Schema
export const BestBonusContentSchema = z.object({
  criterion: z.literal("best_bonus"),
  winnerCasinoId: z.string().describe("ID of the winning casino"),
  title: z.string().min(8).max(60).describe("Card title, e.g., 'Best Welcome Bonus'"),
  subtitle: z.string().min(8).max(80).optional().describe("Optional subtitle"),
  proofText: z.string().min(40).max(200).describe("Evidence-based explanation of why this bonus won"),
  bonusHighlights: z.array(z.string().min(5).max(80)).min(2).max(4).describe("Key bonus features"),
  keyStats: z.array(StatPairSchema).min(2).max(4).describe("Bonus metrics"),
  methodologyLink: LinkSchema.describe("Link to bonus methodology page"),
  reviewLink: LinkSchema.describe("Link to full casino review"),
})

// Best Payout Content Schema
export const BestPayoutContentSchema = z.object({
  criterion: z.literal("best_payout"),
  winnerCasinoId: z.string().describe("ID of the winning casino"),
  title: z.string().min(8).max(60).describe("Card title, e.g., 'Best Overall Payout'"),
  subtitle: z.string().min(8).max(80).optional().describe("Optional subtitle"),
  proofText: z.string().min(40).max(200).describe("Evidence-based explanation of payout superiority"),
  payoutHighlights: z.array(z.string().min(5).max(80)).min(2).max(4).describe("Payout advantages"),
  keyStats: z.array(StatPairSchema).min(2).max(4).describe("Payout metrics"),
  methodologyLink: LinkSchema.describe("Link to payout methodology page"),
  reviewLink: LinkSchema.describe("Link to full casino review"),
})

// Rising Star Content Schema
export const RisingStarContentSchema = z.object({
  criterion: z.literal("rising_star"),
  winnerCasinoId: z.string().describe("ID of the winning casino"),
  title: z.string().min(8).max(60).describe("Card title, e.g., 'Rising Star Casino'"),
  subtitle: z.string().min(8).max(80).optional().describe("Optional subtitle"),
  proofText: z.string().min(40).max(200).describe("Evidence-based explanation of rapid growth/improvement"),
  growthFactors: z.array(z.string().min(5).max(80)).min(2).max(4).describe("Growth indicators"),
  keyStats: z.array(StatPairSchema).min(2).max(4).describe("Growth metrics"),
  methodologyLink: LinkSchema.describe("Link to rising star methodology page"),
  reviewLink: LinkSchema.describe("Link to full casino review"),
})

// Best Games Content Schema
export const BestGamesContentSchema = z.object({
  criterion: z.literal("best_games"),
  winnerCasinoId: z.string().describe("ID of the winning casino"),
  title: z.string().min(8).max(60).describe("Card title, e.g., 'Best Game Selection'"),
  subtitle: z.string().min(8).max(80).optional().describe("Optional subtitle"),
  proofText: z.string().min(40).max(200).describe("Evidence-based explanation of game superiority"),
  gameHighlights: z.array(z.string().min(5).max(80)).min(2).max(4).describe("Game selection advantages"),
  keyStats: z.array(StatPairSchema).min(2).max(4).describe("Game metrics"),
  methodologyLink: LinkSchema.describe("Link to games methodology page"),
  reviewLink: LinkSchema.describe("Link to full casino review"),
})

// Fast Payout Content Schema
export const FastPayoutContentSchema = z.object({
  criterion: z.literal("fast_payout"),
  winnerCasinoId: z.string().describe("ID of the winning casino"),
  title: z.string().min(8).max(60).describe("Card title, e.g., 'Fastest Payout Casino'"),
  subtitle: z.string().min(8).max(80).optional().describe("Optional subtitle"),
  proofText: z.string().min(40).max(200).describe("Evidence-based explanation of payout speed superiority"),
  speedHighlights: z.array(z.string().min(5).max(80)).min(2).max(4).describe("Speed advantages"),
  keyStats: z.array(StatPairSchema).min(2).max(4).describe("Speed metrics"),
  methodologyLink: LinkSchema.describe("Link to fast payout methodology page"),
  reviewLink: LinkSchema.describe("Link to full casino review"),
})

export type CriterionType = z.infer<typeof CriterionEnum>
export type Link = z.infer<typeof LinkSchema>
export type StatPair = z.infer<typeof StatPairSchema>
export type MostTrustedContent = z.infer<typeof MostTrustedContentSchema>
export type BestBonusContent = z.infer<typeof BestBonusContentSchema>
export type BestPayoutContent = z.infer<typeof BestPayoutContentSchema>
export type RisingStarContent = z.infer<typeof RisingStarContentSchema>
export type BestGamesContent = z.infer<typeof BestGamesContentSchema>
export type FastPayoutContent = z.infer<typeof FastPayoutContentSchema>
