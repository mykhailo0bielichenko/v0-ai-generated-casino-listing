/**
 * File: criteriaContentSchemas.ts (expanded snapshot)
 * Summary: Extends `CriteriaSnapshotSchema` to include section header/description,
 * author attribution, and E-E-A-T metadata for transparency and trust.
 * Purpose:
 *  - Provide richer, validated content for the “Top by Criteria” section.
 *  - Capture attribution, methodology, data provenance, and review workflow.
 * Notes:
 *  - Keep strings concise; set sensible min/max to guide authoring.
 *  - URLs must be absolute. Dates are ISO 8601.
 */

import { z } from "zod"
import {
  MostTrustedContentSchema,
  BestBonusContentSchema,
  BestPayoutContentSchema,
  RisingStarContentSchema,
  BestGamesContentSchema,
  FastPayoutContentSchema,
} from "./criteria-content-schemas.primitives"

/** -------------------------
 * Shared primitives (local)
 * ------------------------- */

export const ImageSchema = z.object({
  url: z.string().url().describe("Absolute URL to an image (e.g., avatar, org logo)."),
  alt: z.string().min(4).max(120).describe("Accessible alt text; describe content, not appearance."),
})

/** Section header & description shown above the grid */
export const SectionHeaderSchema = z.object({
  title: z.string().min(8).max(60).describe("H1-style title for the section, e.g., 'Top Casinos by Ranking Criteria'."),
  subtitle: z.string().min(8).max(80).optional().describe("Optional concise H2 line to frame the section."),
  description: z
    .string()
    .min(40)
    .max(240)
    .describe("1–3 short sentences explaining how winners are chosen and that the section auto-updates."),
  showUpdatedOn: z
    .boolean()
    .default(true)
    .describe("If true, surface the snapshot's updatedAt as 'Updated on {date}'."),
})

/** Author / reviewer attribution */
export const PersonAttributionSchema = z.object({
  name: z.string().min(2).max(60).describe("Full name as displayed on site."),
  role: z.string().min(2).max(60).describe("Job title/role, e.g., 'SEO & iGaming Analyst'."),
  credentials: z
    .array(z.string().min(2).max(80))
    .min(1)
    .max(5)
    .describe("Short credential items, e.g., 'CAMS-certified', '5+ yrs industry'."),
  bioLine: z.string().min(16).max(160).describe("One-line bio emphasizing experience & domain knowledge."),
  profileUrl: z.string().url().describe("Public author bio/profile URL."),
  image: ImageSchema.optional(),
})

export const OrganizationSchema = z.object({
  name: z.string().min(2).max(80).describe("Publisher/brand name."),
  url: z.string().url().describe("Organization website URL."),
  logo: ImageSchema.optional(),
})

/** E-E-A-T & provenance metadata (section-level) */
export const EEATMetaSchema = z.object({
  organization: OrganizationSchema.describe("Publishing entity information."),
  author: PersonAttributionSchema.describe("Primary author responsible for the ranking text."),
  reviewedBy: PersonAttributionSchema.optional().describe("Independent fact-check or QA reviewer."),
  reviewProcess: z
    .object({
      reviewedAt: z.string().datetime().optional().describe("ISO timestamp of most recent editorial review."),
      processSummary: z
        .string()
        .min(24)
        .max(240)
        .describe("How content is reviewed (e.g., dual control, data validations)."),
    })
    .describe("Editorial review and QA workflow."),
  methodology: z.object({
    methodologyHubUrl: z.string().url().describe("Landing URL that explains all criteria and scoring."),
    methodologyVersion: z.string().min(1).max(20).describe("Semantic version of methodology, e.g., '1.3.0'."),
    methodologyUpdatedAt: z.string().datetime().describe("When the methodology last changed."),
    editorialPolicyUrl: z.string().url().describe("Public editorial policy / corrections policy page."),
    conflictOfInterest: z
      .string()
      .min(12)
      .max(240)
      .describe("Disclosure of affiliate relationships and mitigation steps."),
  }),
  dataProvenance: z.object({
    dataCutoffDate: z.string().date().describe("Latest date for data included in this computation (YYYY-MM-DD)."),
    coveragePeriod: z.string().min(4).max(40).describe("Human-readable period, e.g., 'Jun–Aug 2025'."),
    sampleSize: z.number().int().positive().describe("Total observations powering payouts/complaints/etc."),
    sourceTypes: z
      .array(z.enum(["first_party_logs", "manual_verification", "public_licensing", "auditor_reports"]))
      .min(1)
      .max(4)
      .describe("What kinds of sources were used."),
    sources: z
      .array(
        z.object({
          label: z.string().min(3).max(80).describe("Short source label, e.g., 'eCOGRA audit (May 2025)'."),
          url: z.string().url().describe("Public URL when available; omit internal-only links."),
        }),
      )
      .min(0)
      .max(12)
      .describe("Citable public sources backing the claims."),
  }),
  trustSignals: z.object({
    auditBadges: z
      .array(z.string().min(2).max(20))
      .min(0)
      .max(5)
      .describe("Short badges like 'eCOGRA', 'GLI', 'iTech Labs'."),
    adrProvider: z.string().min(2).max(40).optional().describe("Alternative Dispute Resolution provider, if any."),
    complaintsWindowDays: z.number().int().positive().optional().describe("Days covered by the complaints metric."),
  }),
  locale: z.string().min(2).max(10).default("en").describe("BCP-47 locale used for labels/formatting."),
  jurisdictionFocus: z
    .array(z.string().length(2))
    .min(0)
    .max(12)
    .describe("ISO-3166-1 alpha-2 country codes relevant to this snapshot."),
})

/** Optional change log to surface transparency on recomputes */
export const ChangeLogSchema = z.object({
  at: z.string().datetime().describe("ISO timestamp of the change."),
  reason: z.string().min(8).max(160).describe("Human-readable reason, e.g., 'Top list reordered by Sales'."),
  diffSummary: z.string().min(8).max(240).describe("Brief summary of what changed (winners, tie-breakers, scores)."),
})

/** Discriminated union for a single card (re-export for convenience) */
export const CriteriaCardSchema = z
  .discriminatedUnion("criterion", [
    MostTrustedContentSchema,
    BestBonusContentSchema,
    BestPayoutContentSchema,
    RisingStarContentSchema,
    BestGamesContentSchema,
    FastPayoutContentSchema,
  ])
  .describe(
    "Validated content payload for a single 'Top by Criteria' card. Use the matching schema for the selected winner.",
  )

/** -------------------------------------------
 * Expanded Snapshot returned to the template
 * ------------------------------------------*/
export const CriteriaSnapshotSchema = z.object({
  /** Existing */
  updatedAt: z.string().datetime().describe("ISO timestamp when the winners and content were last recomputed."),
  items: z.array(CriteriaCardSchema).length(6).describe("Exactly six cards—one for each criterion."),

  /** New: section header/description appearing above the grid */
  header: SectionHeaderSchema.describe("UI header block for the section."),

  /** New: top-level author of the ranking package (cards may still include links) */
  authoring: z
    .object({
      author: PersonAttributionSchema.describe("Primary author."),
      organization: OrganizationSchema.describe("Publishing organization shown in byline."),
      coAuthors: z.array(PersonAttributionSchema).max(4).optional().describe("Optional co-authors."),
    })
    .describe("Attribution for the section."),

  /** New: E-E-A-T metadata (methodology, provenance, review workflow, disclosures) */
  eeat: EEATMetaSchema.describe("Trust & transparency metadata for the section."),

  /** New: optional public change log to surface recomputation context */
  changeLog: z.array(ChangeLogSchema).max(20).optional().describe("Chronological list of recent changes."),
})

/** -----------------
 * Exported Types
 * -----------------*/
export type Image = z.infer<typeof ImageSchema>
export type SectionHeader = z.infer<typeof SectionHeaderSchema>
export type PersonAttribution = z.infer<typeof PersonAttributionSchema>
export type Organization = z.infer<typeof OrganizationSchema>
export type EEATMeta = z.infer<typeof EEATMetaSchema>
export type ChangeLog = z.infer<typeof ChangeLogSchema>
export type CriteriaCard = z.infer<typeof CriteriaCardSchema>
export type CriteriaSnapshot = z.infer<typeof CriteriaSnapshotSchema>
