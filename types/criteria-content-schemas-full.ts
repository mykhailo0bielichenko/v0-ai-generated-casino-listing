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

import { z } from 'zod';
import {
    MostTrustedContentSchema,
    BestBonusContentSchema,
    BestPayoutContentSchema,
    RisingStarContentSchema,
    BestGamesContentSchema,
    FastPayoutContentSchema,
} from './criteria-content-schemas.primitives';

/** -------------------------
 * Shared primitives (local)
 * ------------------------- */

export const ImageSchema = z.object({
    url: z
        .string()
        .url()
        .describe(
            "Absolute URL to an image (e.g., avatar, org logo). Must be a valid HTTPS URL like 'https://example.com/image.jpg'. Use placeholder URLs if actual images are not available."
        ),
    alt: z
        .string()
        .min(4)
        .max(120)
        .describe(
            "Accessible alt text describing the image content, not appearance. Example: 'Portrait of Sarah Mitchell' or 'Company logo for iGaming Insights'. Must be 4-120 characters."
        ),
});

/** Section header & description shown above the grid */
export const SectionHeaderSchema = z.object({
    title: z
        .string()
        .min(8)
        .max(60)
        .describe(
            "H1-style title for the section. Must be 8-60 characters. Examples: 'Top Casinos by Ranking Criteria', 'Best Online Casinos by Category'. Should be descriptive and SEO-friendly."
        ),
    subtitle: z
        .string()
        .min(8)
        .max(80)
        .optional()
        .describe(
            "Optional concise H2 subtitle that frames the section. Must be 8-80 characters if provided. Examples: 'Expert-verified rankings for Norwegian players', 'Discover the best in each category'. Should complement the main title."
        ),
    description: z
        .string()
        .min(40)
        .max(240)
        .describe(
            "1–3 short sentences (40-240 chars) explaining how winners are chosen and that the section auto-updates. Example: 'Our expert team analyzes casinos based on trust, bonuses, payouts, and more. This section auto-updates with the latest data to ensure you get the best insights.' Must mention methodology and auto-updating nature."
        ),
    showUpdatedOn: z
        .boolean()
        .default(true)
        .describe(
            "Boolean flag (default: true). If true, the UI will surface the snapshot's updatedAt timestamp as 'Updated on {date}'. Always set to true unless specifically requested otherwise."
        ),
});

/** Author / reviewer attribution */
export const PersonAttributionSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(60)
        .describe(
            "Full name as displayed on site. Must be 2-60 characters. Examples: 'Sarah Mitchell', 'John Smith', 'Dr. Emily Johnson'. Use realistic, professional names."
        ),
    role: z
        .string()
        .min(2)
        .max(60)
        .describe(
            "Job title/role within the organization. Must be 2-60 characters. Examples: 'Senior iGaming Analyst', 'Editorial Director', 'Compliance Officer', 'Payment Processing Expert'. Should reflect expertise in gambling/finance."
        ),
    credentials: z
        .array(z.string().min(2).max(80))
        .min(1)
        .max(5)
        .describe(
            "Array of 1-5 short credential items, each 2-80 characters. Examples: ['CAMS-certified', '8+ yrs industry', 'Fast payout expert', 'MGA compliance specialist']. Focus on relevant industry experience, certifications, and specialties."
        ),
    bioLine: z
        .string()
        .min(16)
        .max(160)
        .describe(
            "One-line bio (16-160 chars) emphasizing experience & domain knowledge. Example: 'Sarah has been analyzing online casinos for over 8 years, specializing in fast payout verification and player protection.' Must highlight relevant expertise."
        ),
    profileUrl: z
        .string()
        .url()
        .describe(
            "Public author bio/profile URL. Must be absolute HTTPS URL. Example: 'https://example.com/authors/sarah-mitchell' or 'https://example.com/sarah-mitchell'. Use placeholder URLs with proper structure."
        ),
    image: ImageSchema.optional(),
});

export const OrganizationSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(80)
        .describe(
            "Publisher/brand name. Must be 2-80 characters. Examples: 'iGaming Insights', 'Casino Review Pro', 'Gambling Guide'. Should sound professional and trustworthy."
        ),
    url: z
        .string()
        .url()
        .describe(
            "Organization website URL. Must be absolute HTTPS URL. Example: 'https://example.com' or 'https://igaming-insights.com'. Use placeholder domain if actual URL not available."
        ),
    logo: ImageSchema.optional(),
});

/** E-E-A-T & provenance metadata (section-level) */
export const EEATMetaSchema = z.object({
    organization: OrganizationSchema.describe('Publishing entity information.'),
    author: PersonAttributionSchema.describe(
        'Primary author responsible for the ranking text.'
    ),
    reviewedBy: PersonAttributionSchema.optional().describe(
        'Independent fact-check or QA reviewer.'
    ),
    reviewProcess: z
        .object({
            reviewedAt: z
                .string()
                .datetime()
                .optional()
                .describe(
                    "ISO timestamp of most recent editorial review. Format: YYYY-MM-DDTHH:mm:ssZ. Example: '2023-10-02T15:00:00Z'. Use recent dates within the last 30 days."
                ),
            processSummary: z
                .string()
                .min(24)
                .max(240)
                .describe(
                    "How content is reviewed (24-240 chars). Examples: 'Content undergoes dual control review with data validation to ensure accuracy and compliance.', 'Editorial team reviews all rankings quarterly using standardized criteria.' Must explain the review process clearly."
                ),
        })
        .describe('Editorial review and QA workflow details.'),
    methodology: z.object({
        methodologyHubUrl: z
            .string()
            .url()
            .describe(
                "Landing URL that explains all criteria and scoring methodology. Must be absolute HTTPS URL. Example: 'https://example.com/methodology' or 'https://example.com/how-we-rank-casinos'. Use placeholder URL with descriptive path."
            ),
        methodologyVersion: z
            .string()
            .min(1)
            .max(20)
            .describe(
                "Semantic version of methodology (1-20 chars). Format: 'MAJOR.MINOR.PATCH'. Examples: '1.3.0', '2.1.5', '1.0.0'. Use realistic version numbers."
            ),
        methodologyUpdatedAt: z
            .string()
            .datetime()
            .describe(
                "CRITICAL: When the methodology last changed. MUST be full ISO datetime format: YYYY-MM-DDTHH:mm:ssZ. Example: '2023-09-15T10:00:00Z'. This field is required and causes validation errors if format is wrong."
            ),
        editorialPolicyUrl: z
            .string()
            .url()
            .describe(
                "Public editorial policy/corrections policy page URL. Must be absolute HTTPS URL. Example: 'https://example.com/editorial-policy' or 'https://example.com/corrections-policy'. Use placeholder URL."
            ),
        conflictOfInterest: z
            .string()
            .min(12)
            .max(240)
            .describe(
                "Disclosure of affiliate relationships and mitigation steps (12-240 chars). Example: 'Our reviews are independent. Affiliate commissions do not affect the evaluations.' or 'We maintain editorial independence despite affiliate partnerships.' Must address potential conflicts."
            ),
    }),
    dataProvenance: z.object({
        dataCutoffDate: z
            .string()
            .date()
            .describe(
                "Latest date for data included in this computation. Format: YYYY-MM-DD. Example: '2023-09-30'. Use recent date within last 60 days."
            ),
        coveragePeriod: z
            .string()
            .min(4)
            .max(40)
            .describe(
                "Human-readable period (4-40 chars). Examples: 'Jul–Sep 2023', 'Q3 2023', 'June-August 2023', 'Last 90 days'. Should indicate the data collection timeframe."
            ),
        sampleSize: z
            .number()
            .int()
            .positive()
            .describe(
                'Total observations powering payouts/complaints/etc. Must be positive integer. Examples: 1000, 5000, 10000. Use realistic numbers based on casino count and analysis scope.'
            ),
        sourceTypes: z
            .array(
                z.enum([
                    'first_party_logs',
                    'manual_verification',
                    'public_licensing',
                    'auditor_reports',
                ])
            )
            .min(1)
            .max(4)
            .describe(
                "What kinds of sources were used (1-4 types). Available options: 'first_party_logs', 'manual_verification', 'public_licensing', 'auditor_reports'. Choose appropriate combination based on analysis type."
            ),
        sources: z
            .array(
                z.object({
                    label: z
                        .string()
                        .min(3)
                        .max(80)
                        .describe(
                            "Short source label (3-80 chars). Examples: 'eCOGRA audit (Sep 2023)', 'Norwegian Gaming Authority Reports', 'MGA license verification'. Must be specific and credible."
                        ),
                    url: z
                        .string()
                        .url()
                        .describe(
                            "Public URL when available; omit internal-only links. Must be absolute HTTPS URL. Examples: 'https://www.ecogra.org', 'https://www.gamingauthority.no'. Use real or realistic placeholder URLs."
                        ),
                })
            )
            .min(0)
            .max(12)
            .describe(
                'Citable public sources backing the claims (0-12 sources). Each source should be credible and relevant to casino analysis.'
            ),
    }),
    trustSignals: z.object({
        auditBadges: z
            .array(z.string().min(2).max(20))
            .min(0)
            .max(5)
            .describe(
                "CRITICAL REQUIRED FIELD: Array of short audit badges (0-5 items, each 2-20 chars). Common examples: ['eCOGRA', 'GLI', 'iTech Labs', 'TST', 'BMM']. Use realistic gambling industry audit organizations. Can be empty array [] but field is required."
            ),
        adrProvider: z
            .string()
            .min(2)
            .max(40)
            .optional()
            .describe(
                "Alternative Dispute Resolution provider (optional, 2-40 chars). Examples: 'eCOGRA', 'IBAS', 'Player Protection Bureau'. Use if casino has formal dispute resolution process."
            ),
        complaintsWindowDays: z
            .number()
            .int()
            .positive()
            .optional()
            .describe(
                'Days covered by the complaints metric (optional positive integer). Examples: 30, 90, 180, 365. Indicates the timeframe for complaint data analysis.'
            ),
    }),
    locale: z
        .string()
        .min(2)
        .max(10)
        .default('en')
        .describe(
            "BCP-47 locale used for labels/formatting (2-10 chars, default: 'en'). Examples: 'en', 'en-US', 'no', 'sv-SE', 'de-DE'. Use appropriate locale for target audience."
        ),
    jurisdictionFocus: z
        .array(z.string().length(2))
        .min(0)
        .max(12)
        .describe(
            "CRITICAL REQUIRED FIELD: ISO-3166-1 alpha-2 country codes (0-12 codes, each exactly 2 chars). Examples: ['NO'] for Norway, ['US'] for USA, ['DE', 'AT'] for Germany and Austria. MUST be uppercase 2-letter codes. Required field that causes validation errors if missing."
        ),
});

/** Optional change log to surface transparency on recomputes */
export const ChangeLogSchema = z.object({
    at: z
        .string()
        .datetime()
        .describe(
            "ISO timestamp of the change. Format: YYYY-MM-DDTHH:mm:ssZ. Example: '2023-10-03T12:00:00Z'. Use recent timestamp when content was generated or updated."
        ),
    reason: z
        .string()
        .min(8)
        .max(160)
        .describe(
            "Human-readable reason for the change (8-160 chars). Examples: 'Initial analysis based on latest data', 'Quarterly methodology update', 'New casino added to ranking', 'Updated payout speed data'. Explain why the change occurred."
        ),
    diffSummary: z
        .string()
        .min(8)
        .max(540)
        .describe(
            "Brief summary of what changed (8-240 chars). Examples: 'Selected winners for six criteria based on current data analysis', 'Updated trust scores based on recent audits', 'Reordered rankings due to new complaint data'. Describe the actual changes made."
        ),
});

/** Discriminated union for a single card (re-export for convenience) */
export const CriteriaCardSchema = z
    .discriminatedUnion('criterion', [
        MostTrustedContentSchema,
        BestBonusContentSchema,
        BestPayoutContentSchema,
        RisingStarContentSchema,
        BestGamesContentSchema,
        FastPayoutContentSchema,
    ])
    .describe(
        "Validated content payload for a single 'Top by Criteria' card. Use the matching schema for the selected winner. IMPORTANT: Each winnerCasinoId must be unique - no casino can win multiple criteria in the same generation."
    );

/** -------------------------------------------
 * Expanded Snapshot returned to the template
 * ------------------------------------------*/
export const CriteriaSnapshotSchema = z.object({
    /** Existing */
    updatedAt: z
        .string()
        .datetime()
        .describe(
            "ISO timestamp when the winners and content were last recomputed. Format: YYYY-MM-DDTHH:mm:ssZ. Example: '2023-10-03T12:00:00Z'. Use current or recent timestamp."
        ),
    items: z
        .array(CriteriaCardSchema)
        .length(6)
        .describe(
            'Exactly six cards—one for each criterion. Array must contain exactly 6 items representing: most_trusted, best_bonus, best_payout, rising_star, best_games, fast_payout. CRITICAL: Each casino can only win ONE criterion - all winnerCasinoId values must be unique across the 6 cards to ensure maximum diversity of recommendations.'
        ),

    /** New: section header/description appearing above the grid */
    header: SectionHeaderSchema.describe(
        'UI header block for the section containing title, subtitle, description, and showUpdatedOn flag.'
    ),

    /** New: top-level author of the ranking package (cards may still include links) */
    authoring: z
        .object({
            author: PersonAttributionSchema.describe(
                'Primary author responsible for the content and analysis.'
            ),
            organization: OrganizationSchema.describe(
                'Publishing organization shown in byline and about section.'
            ),
            coAuthors: z
                .array(PersonAttributionSchema)
                .max(4)
                .optional()
                .describe(
                    'Optional co-authors (max 4). Usually empty array [] or omitted unless multiple authors contributed.'
                ),
        })
        .describe(
            'Attribution for the section including primary author and organization.'
        ),

    /** New: E-E-A-T metadata (methodology, provenance, review workflow, disclosures) */
    eeat: EEATMetaSchema.describe(
        'CRITICAL: Trust & transparency metadata including methodology, data provenance, review process, and required trustSignals and jurisdictionFocus fields.'
    ),

    /** New: optional public change log to surface recomputation context */
    changeLog: z
        .array(ChangeLogSchema)
        .max(20)
        .optional()
        .describe(
            'Chronological list of recent changes (max 20). Can be single entry for initial creation or multiple entries for updates. Usually contains 1-3 entries.'
        ),
});

/** -----------------
 * Exported Types
 * -----------------*/
export type Image = z.infer<typeof ImageSchema>;
export type SectionHeader = z.infer<typeof SectionHeaderSchema>;
export type PersonAttribution = z.infer<typeof PersonAttributionSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type EEATMeta = z.infer<typeof EEATMetaSchema>;
export type ChangeLog = z.infer<typeof ChangeLogSchema>;
export type CriteriaCard = z.infer<typeof CriteriaCardSchema>;
export type CriteriaSnapshot = z.infer<typeof CriteriaSnapshotSchema>;
