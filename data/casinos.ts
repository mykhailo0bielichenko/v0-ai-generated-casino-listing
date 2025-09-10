/**
 * Auto-Updating “Top 6 Casinos by Ranking Criteria” – mock payload
 *
 * What this file is about:
 * Example TypeScript data model + sample array of 6 casino objects for an iGaming affiliate landing page.
 * Designed to support a winner-recommender that picks “Most Trusted”, “Best Bonuses”, “Fast Payout”, etc.
 * Includes fields commonly used on affiliate sites (licensing, bonuses, payments, games, support)
 * and a concise `review` block per casino. All values are MOCK/DEMO ONLY.
 */

// ===== Types =====

export type LicensingAuthority =
    | 'MGA'
    | 'UKGC'
    | 'Gibraltar'
    | 'Curacao'
    | 'IsleOfMan'
    | 'Kahnawake';

export interface License {
    authority: LicensingAuthority;
    licenseId: string;
    validFrom: string; // ISO date
    validTo?: string; // ISO date
}

export type BonusType = 'WELCOME' | 'NO_DEPOSIT' | 'FREE_SPINS' | 'CASHBACK';

export interface Bonus {
    id: string;
    type: BonusType;
    title: string;
    value: {
        matchPercent?: number; // e.g., 100 for 100% match
        maxAmount?: number; // numeric amount in bonus currency
        currency?: 'EUR' | 'USD' | 'CAD' | 'NZD' | 'NOK';
        spins?: number;
        cashbackPercent?: number;
    };
    wagering: {
        x: number; // e.g., 35 means 35x
        appliesTo: 'bonus' | 'deposit+bonus';
        maxBet: number; // in bonus currency
        excludedGames: string[];
        expiryDays: number;
    };
    minDeposit: number;
    bonusCode?: string;
    verifiedOn: string; // ISO date
}

export interface Payments {
    depositMethods: string[];
    withdrawalMethods: string[];
    minDeposit: number;
    minWithdrawal: number;
    maxWithdrawalPerDay: number;
    payoutSpeedHours: { min: number; max: number }; // observed typical range
    supportsInstant: boolean;
    fees: {
        deposits: 'none' | 'varies' | 'fixed';
        withdrawals: 'none' | 'varies' | 'fixed';
    };
    currencies: Array<
        'EUR' | 'USD' | 'CAD' | 'NZD' | 'NOK' | 'BTC' | 'ETH' | 'LTC' | 'SEK'
    >;
}

export interface Trust {
    rating: number; // 0–5 star-style float (e.g., 4.7)
    audits: { provider: string; lastAudit: string }[];
    ownership: string;
    established: string; // ISO date
    complaintRate90d: number; // % of tracked interactions resulting in complaint
    rtpTransparency: 'FULL' | 'PARTIAL' | 'NONE';
    rgTools: string[]; // responsible gambling tools
}

export interface Games {
    total: number;
    liveDealer: number;
    providers: string[];
    topTitles: string[];
}

export interface Support {
    liveChat: string; // e.g., "24/7" or hours
    email: string;
    phone?: string;
    languages: string[];
}

export interface Features {
    hasSportsbook: boolean;
    hasCasino: boolean;
    hasLiveCasino: boolean;
    cryptoAccepted: boolean;
    mobileApps: Array<'iOS' | 'Android'>;
}

export interface Metrics {
    trustScore: number; // 0–100, used by “Most Trusted”
    bonusScore: number; // 0–100, used by “Best Bonuses”
    payoutSpeedScore: number; // 0–100, used by “Fast Payout”
    gameSelectionScore: number; // 0–100, used by “Best Game Selection”
    risingStarScore: number; // 0–100, used by “Rising Star”
}

export interface Fact {
    key: string; // machine-usable key, e.g., "avg_withdrawal_hours"
    value: string; // human-readable value
    unit?: string;
    period?: string; // e.g., "Jun–Aug 2025"
    sourceNote?: string; // short note like "internal KYC sample n=2,104"
    verifiedOn: string; // ISO date
}

export interface Review {
    overallRating: number; // 0–10 scale for editorial blend
    summary: string; // 1–2 line summary
    pros: string[];
    cons: string[];
    verdict: string; // short conclusion
    author: { name: string };
    lastUpdated: string; // ISO date
}

export interface Casino {
    id: string;
    rank: number; // position in the Top List
    slug: string;
    brand: string;
    urls: {
        homepage: string;
        review: string;
        signup: string; // replace with real tracking later
    };
    geo: {
        allowedCountries: string[]; // ISO-3166 alpha-2
        restrictedCountries: string[];
    };
    licenses: License[];
    trust: Trust;
    bonuses: Bonus[];
    payments: Payments;
    games: Games;
    support: Support;
    features: Features;
    metrics: Metrics;
    review: Review;
    facts: Fact[]; // fact snippets to power “proof” blurbs
}

// ===== Mock Data (DEMO ONLY) =====

export const TOP6_CASINOS_MOCK: Casino[] = [
    {
        id: 'auroraspin',
        rank: 1,
        slug: 'auroraspin',
        brand: 'AuroraSpin',
        urls: {
            homepage: 'https://example.com/casino/auroraspin',
            review: 'https://example.com/reviews/auroraspin',
            signup: 'https://example.com/go/auroraspin?aff=REPLACE',
        },
        geo: {
            allowedCountries: ['NO', 'CA', 'NZ', 'DE', 'FI'],
            restrictedCountries: ['UK', 'US', 'FR', 'IT'],
        },
        licenses: [
            {
                authority: 'MGA',
                licenseId: 'MGA/B2C/00123',
                validFrom: '2018-05-20',
            },
        ],
        trust: {
            rating: 4.7,
            audits: [{ provider: 'eCOGRA', lastAudit: '2025-05-12' }],
            ownership: 'Aurora Gaming Ltd.',
            established: '2018-05-20',
            complaintRate90d: 0.7,
            rtpTransparency: 'FULL',
            rgTools: [
                'deposit-limits',
                'cool-off',
                'self-exclusion',
                'reality-checks',
            ],
        },
        bonuses: [
            {
                id: 'aurora-welcome',
                type: 'WELCOME',
                title: '100% up to €1,000 + 100 FS',
                value: {
                    matchPercent: 100,
                    maxAmount: 1000,
                    currency: 'EUR',
                    spins: 100,
                },
                wagering: {
                    x: 35,
                    appliesTo: 'deposit+bonus',
                    maxBet: 5,
                    excludedGames: ['live-casino', 'progressive-jackpots'],
                    expiryDays: 30,
                },
                minDeposit: 20,
                verifiedOn: '2025-08-01',
            },
        ],
        payments: {
            depositMethods: [
                'Visa',
                'Mastercard',
                'Skrill',
                'Neteller',
                'Trustly',
                'Paysafecard',
            ],
            withdrawalMethods: [
                'Bank Transfer',
                'Skrill',
                'Neteller',
                'Trustly',
            ],
            minDeposit: 10,
            minWithdrawal: 20,
            maxWithdrawalPerDay: 10000,
            payoutSpeedHours: { min: 2, max: 6 },
            supportsInstant: false,
            fees: { deposits: 'none', withdrawals: 'none' },
            currencies: ['EUR', 'NOK', 'USD', 'CAD'],
        },
        games: {
            total: 4500,
            liveDealer: 220,
            providers: [
                'NetEnt',
                'Microgaming',
                'Pragmatic Play',
                "Play'n GO",
                'Evolution',
                'BTG',
            ],
            topTitles: [
                'Starburst',
                'Book of Dead',
                'Sweet Bonanza',
                "Gonzo's Quest Megaways",
            ],
        },
        support: {
            liveChat: '24/7',
            email: 'support@auroraspin.example',
            languages: ['EN', 'NO', 'DE', 'FI'],
        },
        features: {
            hasSportsbook: false,
            hasCasino: true,
            hasLiveCasino: true,
            cryptoAccepted: false,
            mobileApps: ['iOS', 'Android'],
        },
        metrics: {
            trustScore: 94,
            bonusScore: 88,
            payoutSpeedScore: 92,
            gameSelectionScore: 90,
            risingStarScore: 60,
        },
        review: {
            overallRating: 9.2,
            summary:
                'Balanced all-rounder with audited RTP, fair T&Cs, and speedy e-wallet payouts.',
            pros: [
                'Full RTP disclosure',
                'Fast e-wallet withdrawals',
                'Strong slot catalog',
            ],
            cons: ['No crypto', 'No phone support'],
            verdict:
                'Great for players who value trust and quick cashouts without sacrificing selection.',
            author: { name: 'Editorial Team' },
            lastUpdated: '2025-09-01',
        },
        facts: [
            {
                key: 'avg_withdrawal_hours',
                value: '3.8',
                unit: 'hours',
                period: 'Jun–Aug 2025',
                sourceNote: 'internal payout sample n=1,842',
                verifiedOn: '2025-09-01',
            },
            {
                key: 'audit',
                value: 'eCOGRA audit passed',
                period: 'May 2025',
                verifiedOn: '2025-05-12',
            },
            {
                key: 'rtp_transparency',
                value: 'Full per-game RTPs published',
                verifiedOn: '2025-08-20',
            },
        ],
    },
    {
        id: 'neonace',
        rank: 2,
        slug: 'neon-ace',
        brand: 'NeonAce',
        urls: {
            homepage: 'https://example.com/casino/neonace',
            review: 'https://example.com/reviews/neonace',
            signup: 'https://example.com/go/neonace?aff=REPLACE',
        },
        geo: {
            allowedCountries: ['NO', 'CA', 'NZ', 'DE'],
            restrictedCountries: ['UK', 'US', 'ES'],
        },
        licenses: [
            {
                authority: 'Gibraltar',
                licenseId: 'GIB-4567',
                validFrom: '2020-03-10',
            },
        ],
        trust: {
            rating: 4.5,
            audits: [{ provider: 'iTech Labs', lastAudit: '2025-04-22' }],
            ownership: 'Neon Digital N.V.',
            established: '2020-03-10',
            complaintRate90d: 1.1,
            rtpTransparency: 'PARTIAL',
            rgTools: ['deposit-limits', 'loss-limits', 'self-exclusion'],
        },
        bonuses: [
            {
                id: 'neon-welcome',
                type: 'WELCOME',
                title: '150% up to €1,200',
                value: { matchPercent: 150, maxAmount: 1200, currency: 'EUR' },
                wagering: {
                    x: 40,
                    appliesTo: 'bonus',
                    maxBet: 4,
                    excludedGames: ['jackpots'],
                    expiryDays: 21,
                },
                minDeposit: 20,
                verifiedOn: '2025-08-15',
            },
            {
                id: 'neon-fs',
                type: 'FREE_SPINS',
                title: '200 Free Spins',
                value: { spins: 200, currency: 'EUR' },
                wagering: {
                    x: 35,
                    appliesTo: 'bonus',
                    maxBet: 3,
                    excludedGames: [],
                    expiryDays: 14,
                },
                minDeposit: 10,
                verifiedOn: '2025-08-15',
            },
        ],
        payments: {
            depositMethods: [
                'Visa',
                'Mastercard',
                'Skrill',
                'Neteller',
                'MiFinity',
                'Paysafecard',
            ],
            withdrawalMethods: ['Skrill', 'Neteller', 'Bank Transfer'],
            minDeposit: 10,
            minWithdrawal: 20,
            maxWithdrawalPerDay: 8000,
            payoutSpeedHours: { min: 6, max: 24 },
            supportsInstant: false,
            fees: { deposits: 'none', withdrawals: 'varies' },
            currencies: ['EUR', 'USD', 'CAD', 'NOK'],
        },
        games: {
            total: 5200,
            liveDealer: 260,
            providers: [
                'Pragmatic Play',
                "Play'n GO",
                'Relax',
                'Yggdrasil',
                'Evolution',
                'Hacksaw',
            ],
            topTitles: [
                'Money Train 3',
                'Gates of Olympus',
                'Book of Dead',
                'Big Bass Bonanza',
            ],
        },
        support: {
            liveChat: '24/7',
            email: 'help@neonace.example',
            languages: ['EN', 'DE', 'NO'],
        },
        features: {
            hasSportsbook: false,
            hasCasino: true,
            hasLiveCasino: true,
            cryptoAccepted: true,
            mobileApps: ['Android'],
        },
        metrics: {
            trustScore: 90,
            bonusScore: 95,
            payoutSpeedScore: 85,
            gameSelectionScore: 92,
            risingStarScore: 70,
        },
        review: {
            overallRating: 9.0,
            summary:
                'Massive promos and huge library; wagering is on the higher side.',
            pros: [
                'Very generous welcome',
                'Excellent game variety',
                'Crypto-friendly',
            ],
            cons: ['Higher wagering (40x)', 'Withdrawal fees may apply'],
            verdict:
                'Top pick if you chase big bonuses and variety and don’t mind extra wagering.',
            author: { name: 'Editorial Team' },
            lastUpdated: '2025-09-02',
        },
        facts: [
            {
                key: 'welcome_bonus',
                value: '150% up to €1,200',
                verifiedOn: '2025-08-15',
            },
            {
                key: 'game_count',
                value: '5200',
                unit: 'games',
                verifiedOn: '2025-08-28',
            },
            {
                key: 'avg_withdrawal_hours',
                value: '12.1',
                unit: 'hours',
                period: 'May–Aug 2025',
                sourceNote: 'payments log n=1,106',
                verifiedOn: '2025-09-01',
            },
        ],
    },
    {
        id: 'vikingfortune',
        rank: 3,
        slug: 'viking-fortune',
        brand: 'VikingFortune',
        urls: {
            homepage: 'https://example.com/casino/vikingfortune',
            review: 'https://example.com/reviews/vikingfortune',
            signup: 'https://example.com/go/vikingfortune?aff=REPLACE',
        },
        geo: {
            allowedCountries: ['NO', 'SE', 'FI', 'DE'],
            restrictedCountries: ['UK', 'US'],
        },
        licenses: [
            {
                authority: 'MGA',
                licenseId: 'MGA/B2C/00456',
                validFrom: '2016-11-01',
            },
            {
                authority: 'IsleOfMan',
                licenseId: 'IOM-7788',
                validFrom: '2019-07-15',
            },
        ],
        trust: {
            rating: 4.9,
            audits: [{ provider: 'GLI', lastAudit: '2025-03-30' }],
            ownership: 'Nordic Wagering Ltd.',
            established: '2016-11-01',
            complaintRate90d: 0.4,
            rtpTransparency: 'FULL',
            rgTools: [
                'deposit-limits',
                'session-limits',
                'reality-checks',
                'self-exclusion',
            ],
        },
        bonuses: [
            {
                id: 'viking-cashback',
                type: 'CASHBACK',
                title: '10% Weekly Cashback',
                value: { cashbackPercent: 10, currency: 'EUR' },
                wagering: {
                    x: 1,
                    appliesTo: 'bonus',
                    maxBet: 10,
                    excludedGames: [],
                    expiryDays: 7,
                },
                minDeposit: 20,
                verifiedOn: '2025-08-10',
            },
        ],
        payments: {
            depositMethods: [
                'Visa',
                'Mastercard',
                'Trustly',
                'Skrill',
                'Neteller',
            ],
            withdrawalMethods: [
                'Trustly',
                'Skrill',
                'Neteller',
                'Bank Transfer',
            ],
            minDeposit: 10,
            minWithdrawal: 20,
            maxWithdrawalPerDay: 15000,
            payoutSpeedHours: { min: 1, max: 4 },
            supportsInstant: true,
            fees: { deposits: 'none', withdrawals: 'none' },
            currencies: ['EUR', 'NOK', 'SEK', 'USD'],
        },
        games: {
            total: 4100,
            liveDealer: 180,
            providers: [
                'NetEnt',
                "Play'n GO",
                'Thunderkick',
                'Evolution',
                'BTG',
            ],
            topTitles: [
                'Dead or Alive 2',
                'Reactoonz',
                "Jammin' Jars",
                'Temple Tumble',
            ],
        },
        support: {
            liveChat: '24/7',
            email: 'support@vikingfortune.example',
            languages: ['EN', 'NO', 'SE', 'FI'],
        },
        features: {
            hasSportsbook: false,
            hasCasino: true,
            hasLiveCasino: true,
            cryptoAccepted: false,
            mobileApps: [],
        },
        metrics: {
            trustScore: 96,
            bonusScore: 80,
            payoutSpeedScore: 94,
            gameSelectionScore: 87,
            risingStarScore: 65,
        },
        review: {
            overallRating: 9.4,
            summary:
                'Nordic veteran with elite trust markers and near-instant Trustly withdrawals.',
            pros: [
                'Lowest complaint rate in set',
                'Instant Trustly payouts',
                'Transparent RTP',
            ],
            cons: ['Smaller bonus emphasis', 'No crypto'],
            verdict:
                'A go-to pick for players who value reliability and rapid payouts over flashy promos.',
            author: { name: 'Editorial Team' },
            lastUpdated: '2025-09-01',
        },
        facts: [
            {
                key: 'avg_withdrawal_hours',
                value: '2.1',
                unit: 'hours',
                period: 'Q2–Q3 2025',
                sourceNote: 'banking telemetry n=2,307',
                verifiedOn: '2025-09-01',
            },
            {
                key: 'complaint_rate_90d',
                value: '0.4',
                unit: '%',
                verifiedOn: '2025-08-31',
            },
            {
                key: 'audited_by',
                value: 'GLI',
                verifiedOn: '2025-03-30',
            },
        ],
    },
    {
        id: 'riverjack',
        rank: 4,
        slug: 'river-jack',
        brand: 'RiverJack',
        urls: {
            homepage: 'https://example.com/casino/riverjack',
            review: 'https://example.com/reviews/riverjack',
            signup: 'https://example.com/go/riverjack?aff=REPLACE',
        },
        geo: {
            allowedCountries: ['CA', 'NZ', 'DE', 'NO'],
            restrictedCountries: ['UK', 'US'],
        },
        licenses: [
            {
                authority: 'Curacao',
                licenseId: 'CUR-804/JA',
                validFrom: '2023-02-01',
            },
        ],
        trust: {
            rating: 4.3,
            audits: [{ provider: 'BMM Testlabs', lastAudit: '2025-06-05' }],
            ownership: 'RiverJack N.V.',
            established: '2023-02-01',
            complaintRate90d: 1.6,
            rtpTransparency: 'PARTIAL',
            rgTools: ['deposit-limits', 'cool-off', 'self-exclusion'],
        },
        bonuses: [
            {
                id: 'river-welcome',
                type: 'WELCOME',
                title: '200% up to CA$1,500 + 150 FS',
                value: {
                    matchPercent: 200,
                    maxAmount: 1500,
                    currency: 'CAD',
                    spins: 150,
                },
                wagering: {
                    x: 45,
                    appliesTo: 'bonus',
                    maxBet: 5,
                    excludedGames: ['live-casino'],
                    expiryDays: 21,
                },
                minDeposit: 20,
                verifiedOn: '2025-08-20',
            },
        ],
        payments: {
            depositMethods: [
                'Visa',
                'Mastercard',
                'Interac',
                'MuchBetter',
                'Crypto',
            ],
            withdrawalMethods: ['Interac', 'Bank Transfer', 'Crypto'],
            minDeposit: 10,
            minWithdrawal: 25,
            maxWithdrawalPerDay: 7000,
            payoutSpeedHours: { min: 12, max: 48 },
            supportsInstant: false,
            fees: { deposits: 'none', withdrawals: 'varies' },
            currencies: ['CAD', 'USD', 'EUR', 'BTC', 'ETH'],
        },
        games: {
            total: 4800,
            liveDealer: 210,
            providers: [
                'Pragmatic Play',
                'Relax',
                'Evolution',
                "Play'n GO",
                'Hacksaw',
            ],
            topTitles: [
                'The Dog House',
                'Money Train 2',
                'Wanted Dead or a Wild',
                'Big Bass Splash',
            ],
        },
        support: {
            liveChat: '09:00–01:00 CET',
            email: 'care@riverjack.example',
            languages: ['EN', 'DE'],
        },
        features: {
            hasSportsbook: true,
            hasCasino: true,
            hasLiveCasino: true,
            cryptoAccepted: true,
            mobileApps: ['Android'],
        },
        metrics: {
            trustScore: 88,
            bonusScore: 86,
            payoutSpeedScore: 72,
            gameSelectionScore: 89,
            risingStarScore: 75,
        },
        review: {
            overallRating: 8.7,
            summary:
                'Bonus-forward newcomer with big promos and broad payment coverage.',
            pros: ['Huge 200% welcome', 'Interac for CA', 'Solid game mix'],
            cons: ['Higher wagering (45x)', 'Chat not truly 24/7'],
            verdict:
                'Compelling for bonus hunters in CA/NZ willing to accept steeper wagering.',
            author: { name: 'Editorial Team' },
            lastUpdated: '2025-09-03',
        },
        facts: [
            {
                key: 'welcome_bonus',
                value: '200% up to CA$1,500 + 150 FS',
                verifiedOn: '2025-08-20',
            },
            {
                key: 'avg_withdrawal_hours',
                value: '22.6',
                unit: 'hours',
                period: 'Jun–Aug 2025',
                sourceNote: 'payments log n=684',
                verifiedOn: '2025-09-01',
            },
        ],
    },
    {
        id: 'luckypine',
        rank: 5,
        slug: 'lucky-pine',
        brand: 'LuckyPine',
        urls: {
            homepage: 'https://example.com/casino/luckypine',
            review: 'https://example.com/reviews/luckypine',
            signup: 'https://example.com/go/luckypine?aff=REPLACE',
        },
        geo: {
            allowedCountries: ['NO', 'FI', 'NZ'],
            restrictedCountries: ['UK', 'US', 'DE'],
        },
        licenses: [
            {
                authority: 'MGA',
                licenseId: 'MGA/B2C/00999',
                validFrom: '2024-11-12',
            },
        ],
        trust: {
            rating: 4.2,
            audits: [{ provider: 'eCOGRA', lastAudit: '2025-07-18' }],
            ownership: 'Pine Digital Ltd.',
            established: '2024-11-12',
            complaintRate90d: 1.9,
            rtpTransparency: 'PARTIAL',
            rgTools: [
                'deposit-limits',
                'loss-limits',
                'time-outs',
                'self-exclusion',
            ],
        },
        bonuses: [
            {
                id: 'pine-welcome',
                type: 'WELCOME',
                title: '100% up to €800 + 200 FS',
                value: {
                    matchPercent: 100,
                    maxAmount: 800,
                    currency: 'EUR',
                    spins: 200,
                },
                wagering: {
                    x: 35,
                    appliesTo: 'deposit+bonus',
                    maxBet: 5,
                    excludedGames: ['jackpots'],
                    expiryDays: 30,
                },
                minDeposit: 20,
                verifiedOn: '2025-08-25',
            },
        ],
        payments: {
            depositMethods: ['Visa', 'Mastercard', 'Trustly', 'Skrill'],
            withdrawalMethods: ['Trustly', 'Skrill', 'Bank Transfer'],
            minDeposit: 10,
            minWithdrawal: 20,
            maxWithdrawalPerDay: 6000,
            payoutSpeedHours: { min: 8, max: 24 },
            supportsInstant: false,
            fees: { deposits: 'none', withdrawals: 'none' },
            currencies: ['EUR', 'NOK', 'USD'],
        },
        games: {
            total: 4300,
            liveDealer: 170,
            providers: [
                'NetEnt',
                'Pragmatic Play',
                'NoLimit City',
                'Evolution',
            ],
            topTitles: [
                'Fire in the Hole',
                'Starburst',
                'Sugar Rush',
                'Book of Dead',
            ],
        },
        support: {
            liveChat: '24/7',
            email: 'support@luckypine.example',
            languages: ['EN', 'NO', 'FI'],
        },
        features: {
            hasSportsbook: false,
            hasCasino: true,
            hasLiveCasino: true,
            cryptoAccepted: false,
            mobileApps: ['iOS'],
        },
        metrics: {
            trustScore: 84,
            bonusScore: 90,
            payoutSpeedScore: 78,
            gameSelectionScore: 88,
            risingStarScore: 85, // young brand momentum
        },
        review: {
            overallRating: 8.8,
            summary:
                'Fresh look, fair wagering, and strong slots lineup built for Nordics.',
            pros: ['Fair 35x wagering', 'Nordic payment focus', 'Polished UX'],
            cons: ['Lower daily withdrawal limit', 'No crypto'],
            verdict:
                'A rising option in NO/FI with clean UX and a sensible welcome package.',
            author: { name: 'Editorial Team' },
            lastUpdated: '2025-09-01',
        },
        facts: [
            {
                key: 'launch_date',
                value: '2024-11-12',
                verifiedOn: '2025-08-01',
            },
            {
                key: 'wagering',
                value: '35x on deposit+bonus',
                verifiedOn: '2025-08-25',
            },
            {
                key: 'avg_withdrawal_hours',
                value: '14.3',
                unit: 'hours',
                period: 'Jun–Aug 2025',
                verifiedOn: '2025-09-01',
            },
        ],
    },
    {
        id: 'solarisbet',
        rank: 6,
        slug: 'solaris-bet',
        brand: 'SolarisBet',
        urls: {
            homepage: 'https://example.com/casino/solarisbet',
            review: 'https://example.com/reviews/solarisbet',
            signup: 'https://example.com/go/solarisbet?aff=REPLACE',
        },
        geo: {
            allowedCountries: ['NZ', 'CA', 'NO'],
            restrictedCountries: ['UK', 'US', 'DE', 'FR'],
        },
        licenses: [
            {
                authority: 'Curacao',
                licenseId: 'CUR-5566/SB',
                validFrom: '2021-08-05',
            },
        ],
        trust: {
            rating: 4.1,
            audits: [{ provider: 'iTech Labs', lastAudit: '2025-05-09' }],
            ownership: 'Solaris Gaming N.V.',
            established: '2021-08-05',
            complaintRate90d: 2.1,
            rtpTransparency: 'NONE',
            rgTools: ['deposit-limits', 'self-exclusion'],
        },
        bonuses: [
            {
                id: 'solaris-welcome',
                type: 'WELCOME',
                title: '125% up to €700',
                value: { matchPercent: 125, maxAmount: 700, currency: 'EUR' },
                wagering: {
                    x: 40,
                    appliesTo: 'bonus',
                    maxBet: 5,
                    excludedGames: ['live-casino', 'jackpots'],
                    expiryDays: 21,
                },
                minDeposit: 20,
                verifiedOn: '2025-08-12',
            },
        ],
        payments: {
            depositMethods: [
                'Visa',
                'Mastercard',
                'Skrill',
                'Neteller',
                'Crypto',
            ],
            withdrawalMethods: ['Crypto', 'Skrill', 'Neteller'],
            minDeposit: 10,
            minWithdrawal: 20,
            maxWithdrawalPerDay: 20000,
            payoutSpeedHours: { min: 0.5, max: 2 },
            supportsInstant: true,
            fees: { deposits: 'none', withdrawals: 'none' },
            currencies: ['EUR', 'USD', 'CAD', 'BTC', 'ETH', 'LTC'],
        },
        games: {
            total: 3900,
            liveDealer: 150,
            providers: ['Pragmatic Play', 'Hacksaw', 'Relax', 'Evolution'],
            topTitles: [
                'Sugar Rush 1000',
                'Chaos Crew',
                'Money Train 4',
                'Sweet Bonanza',
            ],
        },
        support: {
            liveChat: '24/7',
            email: 'support@solarisbet.example',
            languages: ['EN'],
        },
        features: {
            hasSportsbook: true,
            hasCasino: true,
            hasLiveCasino: true,
            cryptoAccepted: true,
            mobileApps: [],
        },
        metrics: {
            trustScore: 82,
            bonusScore: 76,
            payoutSpeedScore: 98, // extremely fast via crypto
            gameSelectionScore: 85,
            risingStarScore: 68,
        },
        review: {
            overallRating: 8.5,
            summary:
                'Lightning-fast crypto cashouts with a decent mix of high-volatility slots.',
            pros: [
                'Crypto instant payouts',
                'High daily withdrawal cap',
                'Good volatility variety',
            ],
            cons: ['No RTP transparency', 'Curacao-only license'],
            verdict:
                'Best suited to crypto-first players prioritizing speed over transparency depth.',
            author: { name: 'Editorial Team' },
            lastUpdated: '2025-09-02',
        },
        facts: [
            {
                key: 'avg_withdrawal_hours',
                value: '1.1',
                unit: 'hours',
                period: 'Jul–Aug 2025',
                sourceNote: 'on-chain settlement logs',
                verifiedOn: '2025-09-01',
            },
            {
                key: 'max_withdrawal_per_day',
                value: '20000',
                unit: 'EUR',
                verifiedOn: '2025-08-10',
            },
        ],
    },
];
