import { z } from 'zod';

// Criterion enum for discriminated union
export const CriterionEnum = z.enum([
    'most_trusted',
    'best_bonus',
    'best_payout',
    'rising_star',
    'best_games',
    'fast_payout',
]);

// Link schema for external references
export const LinkSchema = z.object({
    url: z
        .string()
        .url()
        .describe(
            "Absolute URL to external resource. Must be HTTPS URL. Examples: 'https://example.com/methodology', 'https://example.com/casino-review'. Use placeholder URLs with appropriate paths."
        ),
    label: z
        .string()
        .min(2)
        .max(60)
        .describe(
            "Link text/label (2-60 chars). Examples: 'Trust Methodology', 'Full Casino Review', 'See Bonus Criteria'. Should be descriptive and actionable."
        ),
    openInNewTab: z
        .boolean()
        .default(true)
        .describe(
            'Whether to open link in new tab (default: true). Always set to true for external links to maintain user experience.'
        ),
});

// Statistical data pairs
export const StatPairSchema = z.object({
    label: z
        .string()
        .min(2)
        .max(40)
        .describe(
            "CRITICAL: Stat label (2-40 chars). Examples: 'Trust Score', 'Payout Speed', 'License Authority', 'Bonus Value'. Must be clear and specific. REQUIRED: Arrays need minimum 2 elements."
        ),
    value: z
        .string()
        .min(1)
        .max(20)
        .describe(
            "Stat value (1-20 chars). Examples: '96', '2-6', 'MGA', 'High'. Should be concise data point or measurement."
        ),
    unit: z
        .string()
        .max(10)
        .optional()
        .describe(
            "Optional unit (max 10 chars). Examples: '/100', 'hours', '%', 'days'. Add when value needs unit for clarity."
        ),
});

// Most Trusted Content Schema
export const MostTrustedContentSchema = z.object({
    criterion: z.literal('most_trusted'),
    winnerCasinoId: z
        .string()
        .describe(
            "ID of the winning casino. Must match one of the provided casino IDs from the input data. Example: 'vikingfortune', 'neonace'."
        ),
    title: z
        .string()
        .min(8)
        .max(60)
        .describe(
            "Card title (8-60 chars). Examples: 'Most Trusted Casino', 'Highest Trust Rating', 'Top Security & Compliance'. Should be engaging and descriptive."
        ),
    subtitle: z
        .string()
        .min(8)
        .max(80)
        .optional()
        .describe(
            "Optional subtitle (8-80 chars). Examples: 'Highest trust scores and licensing', 'MGA licensed with 96/100 trust score'. Provides additional context."
        ),
    proofText: z
        .string()
        .min(40)
        .max(200)
        .describe(
            "Evidence-based explanation (40-200 chars) of why this casino won. Must reference specific data points like trust scores, licenses, audit results. Example: 'VikingFortune leads with a trust score of 96/100, backed by MGA licensing and regular eCOGRA audits.'"
        ),
    keyStats: z
        .array(StatPairSchema)
        .min(2)
        .max(4)
        .describe(
            "CRITICAL: Key trust metrics (2-4 items required). Examples: [{'label': 'Trust Score', 'value': '96', 'unit': '/100'}, {'label': 'License', 'value': 'MGA'}]. Must include relevant trust metrics."
        ),
    trustFactors: z
        .array(z.string().min(5).max(80))
        .min(2)
        .max(5)
        .describe(
            "Trust indicators (2-5 items, each 5-80 chars). Examples: ['MGA License', 'Regular eCOGRA audits', 'Low complaint rates', 'Transparent terms']. List specific trust signals."
        ),
    licensing: z
        .object({
            primaryLicense: z
                .string()
                .describe(
                    'Primary licensing authority from casino.licenses[0].authority. Extract from the first license in the licenses array. Example: "MGA", "UKGC", "Curacao"'
                ),
            licenseId: z
                .string()
                .describe(
                    'License ID from casino.licenses[0].licenseId. Extract the license identifier string. If not available, use "N/A" or generate a placeholder like "LIC-2024-001"'
                ),
            issuedDate: z
                .string()
                .describe(
                    'License issued date from casino.licenses[0].validFrom. Extract the ISO date string. If not available, use casino.trust.established or generate "2020-01-01"'
                ),
            additionalLicenses: z
                .array(z.string())
                .max(3)
                .describe(
                    'Additional licensing authorities from casino.licenses[1], casino.licenses[2], etc. If casino only has one license, use empty array []'
                ),
        })
        .describe('Licensing information extracted from casino.licenses array'),
    trustMetrics: z
        .object({
            trustScore: z
                .number()
                .min(0)
                .max(100)
                .describe(
                    'Overall trust score from casino.metrics.trustScore. Extract the numeric trust score value (0-100)'
                ),
            trustRating: z
                .number()
                .min(0)
                .max(5)
                .describe(
                    'Star rating from casino.trust.rating. Extract the decimal rating value (0-5). If not available, calculate from trustScore: Math.round(trustScore/20)'
                ),
            complaintRate: z
                .number()
                .min(0)
                .max(100)
                .describe(
                    '90-day complaint rate from casino.trust.complaintRate90d. Extract the percentage value. If not available, use 0 for highly trusted casinos'
                ),
            established: z
                .string()
                .describe(
                    'Establishment date from casino.trust.established. Extract the ISO date string. Must be provided - use "2020-01-01" if not available'
                ),
        })
        .describe(
            'Trust metrics extracted from casino.trust and casino.metrics objects'
        ),
    securityFeatures: z
        .object({
            audits: z
                .array(z.string())
                .min(1)
                .max(5)
                .describe(
                    'Security audit providers from casino.trust.audits array. Extract provider names like ["eCOGRA", "iTech Labs"]. If empty, use ["Independent Auditor"]'
                ),
            rtpTransparency: z
                .enum(['FULL', 'PARTIAL', 'NONE'])
                .describe(
                    'RTP transparency level from casino.trust.rtpTransparency. Extract exact enum value. If not available, use "PARTIAL" as default'
                ),
            ownership: z
                .string()
                .describe(
                    'Casino ownership information from casino.trust.ownership. Extract the ownership company name. If not available, use "Licensed Gaming Company"'
                ),
            rgTools: z
                .array(z.string())
                .max(8)
                .describe(
                    'Responsible gambling tools from casino.trust.rgTools array. Extract tool names like ["Self-exclusion", "Deposit limits"]. If empty, use ["Self-exclusion", "Deposit limits"]'
                ),
        })
        .describe(
            'Security and transparency features extracted from casino.trust object'
        ),
    methodologyLink: LinkSchema.describe(
        'Link to trust methodology page explaining how trust scores are calculated.'
    ),
    reviewLink: LinkSchema.describe(
        'Link to full casino review with detailed analysis.'
    ),
});

// Best Bonus Content Schema
export const BestBonusContentSchema = z.object({
    criterion: z.literal('best_bonus'),
    winnerCasinoId: z.string().describe('ID of the winning casino'),
    title: z
        .string()
        .min(8)
        .max(60)
        .describe("Card title, e.g., 'Best Welcome Bonus'"),
    subtitle: z
        .string()
        .min(8)
        .max(80)
        .optional()
        .describe('Optional subtitle'),
    proofText: z
        .string()
        .min(40)
        .max(200)
        .describe('Evidence-based explanation of why this bonus won'),
    bonusHighlights: z
        .array(z.string().min(5).max(80))
        .min(2)
        .max(4)
        .describe(
            'Key bonus features from casino data: match percentage, max amount, wagering requirements'
        ),
    bonusValue: z
        .object({
            matchPercent: z
                .number()
                .min(0)
                .max(500)
                .describe(
                    'Match percentage from casino.bonuses[0].value.matchPercent. Extract the percentage number (e.g., 100 for 100% match). If not available, use 100'
                ),
            maxAmount: z
                .number()
                .min(0)
                .describe(
                    'Maximum bonus amount from casino.bonuses[0].value.maxAmount. Extract the numeric amount. If not available, use 500'
                ),
            currency: z
                .string()
                .min(3)
                .max(3)
                .describe(
                    'Currency code from casino.bonuses[0].value.currency or casino.payments.currencies[0]. Extract 3-letter code like "EUR", "USD". Default to "EUR"'
                ),
            spins: z
                .number()
                .min(0)
                .optional()
                .describe(
                    'Number of free spins from casino.bonuses[0].value.spins. Extract if available, otherwise omit this field'
                ),
        })
        .describe(
            'Specific bonus value details extracted from casino.bonuses[0].value object'
        ),
    wageringTerms: z
        .object({
            requirement: z
                .number()
                .min(1)
                .max(100)
                .describe(
                    'Wagering requirement from casino.bonuses[0].wagering.x. Extract the multiplier number (e.g., 35 for 35x). If not available, use 35'
                ),
            appliesTo: z
                .enum(['bonus', 'deposit+bonus'])
                .describe(
                    'What wagering applies to from casino.bonuses[0].wagering.appliesTo. Extract exact enum value. Default to "bonus"'
                ),
            maxBet: z
                .number()
                .min(0)
                .describe(
                    'Maximum bet from casino.bonuses[0].wagering.maxBet. Extract the numeric limit. If not available, use 5'
                ),
            expiryDays: z
                .number()
                .min(1)
                .max(365)
                .describe(
                    'Expiry days from casino.bonuses[0].wagering.expiryDays. Extract the number of days. If not available, use 30'
                ),
        })
        .describe(
            'Wagering terms extracted from casino.bonuses[0].wagering object'
        ),
    bonusCode: z.string().max(20).optional().describe('Bonus code if required'),
    keyStats: z.array(StatPairSchema).min(2).max(4).describe('Bonus metrics'),
    methodologyLink: LinkSchema.describe('Link to bonus methodology page'),
    reviewLink: LinkSchema.describe('Link to full casino review'),
});

// Best Payout Content Schema
export const BestPayoutContentSchema = z.object({
    criterion: z.literal('best_payout'),
    winnerCasinoId: z.string().describe('ID of the winning casino'),
    title: z
        .string()
        .min(8)
        .max(60)
        .describe("Card title, e.g., 'Best Overall Payout'"),
    subtitle: z
        .string()
        .min(8)
        .max(80)
        .optional()
        .describe('Optional subtitle'),
    proofText: z
        .string()
        .min(40)
        .max(200)
        .describe('Evidence-based explanation of payout superiority'),
    payoutHighlights: z
        .array(z.string().min(5).max(80))
        .min(2)
        .max(4)
        .describe('Payout advantages from casino data: speed, methods, limits'),
    payoutSpeed: z
        .object({
            minHours: z
                .number()
                .min(0)
                .max(168)
                .describe('Minimum payout time in hours'),
            maxHours: z
                .number()
                .min(0)
                .max(168)
                .describe('Maximum payout time in hours'),
            supportsInstant: z
                .boolean()
                .describe('Whether instant payouts are supported'),
        })
        .describe('Payout speed data from casino.payments.payoutSpeedHours'),
    paymentMethods: z
        .object({
            withdrawalMethods: z
                .array(z.string())
                .min(1)
                .max(15)
                .describe(
                    'Available withdrawal methods from casino.payments.withdrawalMethods array. Extract method names like ["Visa", "Skrill", "Bitcoin"]. If empty, use ["Bank Transfer", "E-wallet"]'
                ),
            currencies: z
                .array(z.string())
                .min(1)
                .max(10)
                .describe(
                    'Supported currencies from casino.payments.currencies array. Extract currency codes like ["EUR", "USD", "BTC"]. If empty, use ["EUR"]'
                ),
            minWithdrawal: z
                .number()
                .min(0)
                .describe(
                    'Minimum withdrawal from casino.payments.minWithdrawal. Extract the numeric amount. If not available, use 20'
                ),
            maxWithdrawalPerDay: z
                .number()
                .min(0)
                .describe(
                    'Maximum daily withdrawal from casino.payments.maxWithdrawalPerDay. Extract the numeric limit. If not available, use 5000'
                ),
        })
        .describe(
            'Payment method details extracted from casino.payments object'
        ),
    fees: z
        .object({
            deposits: z
                .enum(['none', 'varies', 'fixed'])
                .describe(
                    'Deposit fee structure from casino.payments.fees.deposits. Extract exact enum value. If not available, use "none"'
                ),
            withdrawals: z
                .enum(['none', 'varies', 'fixed'])
                .describe(
                    'Withdrawal fee structure from casino.payments.fees.withdrawals. Extract exact enum value. If not available, use "none"'
                ),
        })
        .describe('Fee structure extracted from casino.payments.fees object'),
    keyStats: z.array(StatPairSchema).min(2).max(4).describe('Payout metrics'),
    methodologyLink: LinkSchema.describe('Link to payout methodology page'),
    reviewLink: LinkSchema.describe('Link to full casino review'),
});

// Rising Star Content Schema
export const RisingStarContentSchema = z.object({
    criterion: z.literal('rising_star'),
    winnerCasinoId: z.string().describe('ID of the winning casino'),
    title: z
        .string()
        .min(8)
        .max(60)
        .describe("Card title, e.g., 'Rising Star Casino'"),
    subtitle: z
        .string()
        .min(8)
        .max(80)
        .optional()
        .describe('Optional subtitle'),
    proofText: z
        .string()
        .min(40)
        .max(200)
        .describe('Evidence-based explanation of rapid growth/improvement'),
    growthFactors: z
        .array(z.string().min(5).max(80))
        .min(2)
        .max(4)
        .describe(
            'Growth indicators from casino data: new features, improved ratings, expanded game library'
        ),
    establishmentData: z
        .object({
            established: z
                .string()
                .describe(
                    'When casino was established from casino.trust.established. Extract the ISO date string. Must be provided - use "2020-01-01" if not available'
                ),
            monthsActive: z
                .number()
                .min(1)
                .max(360)
                .describe(
                    'Months since establishment. Calculate from current date minus casino.trust.established. If not calculable, use 24 months'
                ),
            isNewCasino: z
                .boolean()
                .describe(
                    'Whether casino is new (less than 2 years). Calculate: monthsActive < 24. If monthsActive not available, use false'
                ),
        })
        .describe(
            'Casino age and establishment data calculated from casino.trust.established'
        ),
    improvementMetrics: z
        .object({
            risingStarScore: z
                .number()
                .min(0)
                .max(100)
                .describe(
                    'Rising star score from casino.metrics.risingStarScore. Extract the numeric score (0-100)'
                ),
            trustRating: z
                .number()
                .min(0)
                .max(5)
                .describe(
                    'Current trust rating from casino.trust.rating. Extract the decimal rating (0-5). If not available, use 4.0'
                ),
            gameGrowth: z
                .number()
                .min(0)
                .describe(
                    'Number of games added recently. If not directly available, use casino.games.total or estimate based on casino size (e.g., 50 for new casinos)'
                ),
            newFeatures: z
                .array(z.string())
                .max(5)
                .describe(
                    'Recently added features. Extract from casino.features or create relevant list like ["Mobile App", "Live Chat", "Crypto Support"]. Must provide array, even if empty []'
                ),
        })
        .describe(
            'Improvement metrics extracted from casino.metrics and casino.features'
        ),
    momentum: z
        .object({
            recentUpdates: z
                .array(z.string().min(10).max(100))
                .min(1)
                .max(3)
                .describe(
                    'Recent positive changes or updates. Create relevant updates like ["Added 100+ new games", "Improved mobile interface", "Enhanced security measures"]. Must provide at least 1 update'
                ),
            quarterlyGrowth: z
                .string()
                .max(50)
                .optional()
                .describe(
                    'Quarterly growth indicator if available. Can be descriptive like "15% game library expansion" or omit if not applicable'
                ),
        })
        .describe(
            'Recent momentum and growth indicators - generate realistic updates based on casino type'
        ),
    keyStats: z.array(StatPairSchema).min(2).max(4).describe('Growth metrics'),
    methodologyLink: LinkSchema.describe(
        'Link to rising star methodology page'
    ),
    reviewLink: LinkSchema.describe('Link to full casino review'),
});

// Best Games Content Schema
export const BestGamesContentSchema = z.object({
    criterion: z.literal('best_games'),
    winnerCasinoId: z.string().describe('ID of the winning casino'),
    title: z
        .string()
        .min(8)
        .max(60)
        .describe("Card title, e.g., 'Best Game Selection'"),
    subtitle: z
        .string()
        .min(8)
        .max(80)
        .optional()
        .describe('Optional subtitle'),
    proofText: z
        .string()
        .min(40)
        .max(200)
        .describe('Evidence-based explanation of game superiority'),
    gameHighlights: z
        .array(z.string().min(5).max(80))
        .min(2)
        .max(4)
        .describe(
            'Game selection advantages from casino data: variety, providers, live dealer options'
        ),
    gameLibrary: z
        .object({
            totalGames: z
                .number()
                .min(0)
                .describe(
                    'Total number of games from casino.games.total. Extract the numeric count'
                ),
            liveDealerGames: z
                .number()
                .min(0)
                .describe(
                    'Number of live dealer games from casino.games.liveDealer. Extract the count. If not available, estimate as totalGames * 0.1'
                ),
            gameCategories: z
                .array(z.string())
                .min(1)
                .max(10)
                .describe(
                    'Available game categories. Create realistic categories like ["Slots", "Table Games", "Live Casino", "Jackpots"]. Must provide at least 1 category'
                ),
        })
        .describe('Game library size and variety extracted from casino.games'),
    providers: z
        .object({
            totalProviders: z
                .number()
                .min(1)
                .max(100)
                .describe(
                    'Number of game providers from casino.games.providers.length. Count the providers array. If not available, use 15'
                ),
            topProviders: z
                .array(z.string())
                .min(3)
                .max(8)
                .describe(
                    'Notable game providers from casino.games.providers array. Extract provider names like ["NetEnt", "Microgaming", "Play\'n GO"]. Must provide at least 3'
                ),
            exclusiveContent: z
                .boolean()
                .describe(
                    'Whether casino has exclusive games. Check if casino.features indicates exclusives or default to false'
                ),
        })
        .describe(
            'Game provider information extracted from casino.games.providers'
        ),
    gameQuality: z
        .object({
            topTitles: z
                .array(z.string())
                .min(3)
                .max(10)
                .describe(
                    'Popular/featured game titles from casino.games.topTitles array. Extract game names like ["Starburst", "Gonzo\'s Quest", "Book of Dead"]. Must provide at least 3'
                ),
            hasJackpots: z
                .boolean()
                .describe(
                    'Whether progressive jackpots are available. Check if any games or features mention jackpots, or default to true for most casinos'
                ),
            hasTournaments: z
                .boolean()
                .describe(
                    'Whether game tournaments are offered. Check casino.features or default to false if not mentioned'
                ),
        })
        .describe(
            'Game quality indicators extracted from casino.games.topTitles and features'
        ),
    keyStats: z.array(StatPairSchema).min(2).max(4).describe('Game metrics'),
    methodologyLink: LinkSchema.describe('Link to games methodology page'),
    reviewLink: LinkSchema.describe('Link to full casino review'),
});

// Fast Payout Content Schema
export const FastPayoutContentSchema = z.object({
    criterion: z.literal('fast_payout'),
    winnerCasinoId: z.string().describe('ID of the winning casino'),
    title: z
        .string()
        .min(8)
        .max(60)
        .describe("Card title, e.g., 'Fastest Payout Casino'"),
    subtitle: z
        .string()
        .min(8)
        .max(80)
        .optional()
        .describe('Optional subtitle'),
    proofText: z
        .string()
        .min(40)
        .max(200)
        .describe('Evidence-based explanation of payout speed superiority'),
    speedHighlights: z
        .array(z.string().min(5).max(80))
        .min(2)
        .max(4)
        .describe(
            'Speed advantages from casino data: processing times, instant methods, verification speed'
        ),
    withdrawalSpeed: z
        .object({
            minHours: z
                .number()
                .min(0)
                .max(168)
                .describe(
                    'Minimum withdrawal time from casino.payments.payoutSpeedHours.min. Extract the minimum hours'
                ),
            maxHours: z
                .number()
                .min(0)
                .max(168)
                .describe(
                    'Maximum withdrawal time from casino.payments.payoutSpeedHours.max. Extract the maximum hours'
                ),
            averageHours: z
                .number()
                .min(0)
                .max(168)
                .describe(
                    'Average withdrawal time. Calculate as (minHours + maxHours) / 2'
                ),
            instantMethods: z
                .array(z.string())
                .max(10)
                .describe(
                    'Payment methods supporting instant withdrawals. Extract from casino.payments.withdrawalMethods or create relevant list like ["Skrill", "Neteller"]. Provide empty array [] if none'
                ),
        })
        .describe(
            'Detailed withdrawal speed data extracted from casino.payments.payoutSpeedHours'
        ),
    verificationProcess: z
        .object({
            kycRequired: z
                .boolean()
                .describe(
                    'Whether KYC verification is required. For licensed casinos, typically true. Default to true'
                ),
            verificationTimeHours: z
                .number()
                .min(0)
                .max(72)
                .describe(
                    'Typical verification time in hours. If not specified, use 24 for standard process'
                ),
            documentsRequired: z
                .array(z.string())
                .max(5)
                .describe(
                    'Required verification documents. Standard list: ["ID", "Proof of address", "Payment method"]. Provide realistic document list'
                ),
        })
        .describe(
            'Verification process affecting payout speed - generate standard KYC requirements'
        ),
    fastMethods: z
        .object({
            eWallets: z
                .array(z.string())
                .max(10)
                .describe(
                    'Available e-wallet withdrawal methods from casino.payments.withdrawalMethods. Filter for e-wallets like ["Skrill", "Neteller", "PayPal"]. Provide empty array [] if none'
                ),
            cryptoOptions: z
                .array(z.string())
                .max(5)
                .describe(
                    'Cryptocurrency withdrawal options. Check casino.payments.currencies for crypto or casino.features.cryptoAccepted. Use ["Bitcoin", "Ethereum"] if crypto supported, or empty array []'
                ),
            bankTransferSpeed: z
                .string()
                .max(50)
                .describe(
                    'Bank transfer processing description. Create realistic description like "1-3 business days" or "Same day processing"'
                ),
        })
        .describe(
            'Fast withdrawal method details extracted from casino.payments.withdrawalMethods'
        ),
    limits: z
        .object({
            minWithdrawal: z
                .number()
                .min(0)
                .describe(
                    'Minimum withdrawal amount from casino.payments.minWithdrawal. Extract the numeric value'
                ),
            maxDailyWithdrawal: z
                .number()
                .min(0)
                .describe(
                    'Maximum daily withdrawal limit from casino.payments.maxWithdrawalPerDay. Extract the numeric limit'
                ),
            monthlyLimit: z
                .number()
                .min(0)
                .optional()
                .describe(
                    'Monthly withdrawal limit if applicable. Calculate as maxDailyWithdrawal * 30 or omit if not relevant'
                ),
        })
        .describe('Withdrawal limits extracted from casino.payments'),
    keyStats: z.array(StatPairSchema).min(2).max(4).describe('Speed metrics'),
    methodologyLink: LinkSchema.describe(
        'Link to fast payout methodology page'
    ),
    reviewLink: LinkSchema.describe('Link to full casino review'),
});

export type CriterionType = z.infer<typeof CriterionEnum>;
export type Link = z.infer<typeof LinkSchema>;
export type StatPair = z.infer<typeof StatPairSchema>;
export type MostTrustedContent = z.infer<typeof MostTrustedContentSchema>;
export type BestBonusContent = z.infer<typeof BestBonusContentSchema>;
export type BestPayoutContent = z.infer<typeof BestPayoutContentSchema>;
export type RisingStarContent = z.infer<typeof RisingStarContentSchema>;
export type BestGamesContent = z.infer<typeof BestGamesContentSchema>;
export type FastPayoutContent = z.infer<typeof FastPayoutContentSchema>;
