import type { Casino } from '../../data/casinos';
import type { PageContent, Author, Language, Geo } from '../../types/types';

export interface MasterPromptContext {
    pageContent: PageContent;
    casinos: Casino[];
    author: Author;
    language: Language;
    geo: Geo;
    criteria: string;
}

export function generateMasterPrompt(context: MasterPromptContext): string {
    const { pageContent, casinos, author, language, geo, criteria } = context;

    return `# iGaming Affiliate Content Generation Task

## Context Overview
You are an expert iGaming content analyst generating structured content for an affiliate website. Your task is to analyze the provided casino data and create a comprehensive "Top Casinos by Ranking Criteria" section.

## Page Information
- **Page Type**: ${pageContent.slug}
- **Title**: ${pageContent.title}
- **Description**: ${pageContent.description}
- **Focus Criteria**: ${criteria}
- **Language**: ${language.name} (${language.code})
- **Target Geography**: ${geo.country} (${geo.countryCode})
- **Currency**: ${geo.currency}

## Author Information
- **Name**: ${author.name}
- **Role**: ${author.role}
- **Experience**: ${author.experience || 'Experienced iGaming professional'}
- **Specialties**: ${
        author.specialties?.join(', ') || 'Casino analysis and review'
    }
- **Bio**: ${author.bio}

## Regulatory Context
- **Jurisdiction**: ${geo.country}
- **Regulations**: ${geo.regulations?.join(', ') || 'Local gaming regulations'}
- **Compliance Requirements**: Must adhere to ${geo.country} gaming regulations

## Casino Data Analysis
You have access to ${
        casinos.length
    } casinos with the following data points for each:
- Trust metrics (rating, audits, licensing, complaint rates)
- Bonus information (types, wagering, terms)
- Payment data (methods, speeds, limits, fees)
- Game selection (total games, providers, live dealer)
- Support quality (availability, languages, channels)
- Features (mobile apps, crypto support, sportsbook)

### Top ${Math.min(6, casinos.length)} Casinos (Complete Data):
${casinos
    .slice(0, 6)
    .map(
        (casino, index) => `
${index + 1}. **${casino.brand}** (ID: ${casino.id}, Rank: ${casino.rank})
   **Basic Info:**
   - Slug: ${casino.slug}
   - Established: ${casino.trust?.established || 'N/A'}
   - Ownership: ${casino.trust?.ownership || 'N/A'}
   
   **Geographic Access:**
   - Allowed Countries: ${casino.geo?.allowedCountries?.join(', ') || 'N/A'}
   - Restricted Countries: ${
       casino.geo?.restrictedCountries?.join(', ') || 'N/A'
   }
   
   **Licensing & Trust:**
   - Licenses: ${
       casino.licenses
           ?.map((l) => `${l.authority} (${l.licenseId})`)
           .join(', ') || 'N/A'
   }
   - Trust Rating: ${casino.trust?.rating || 'N/A'}/5
   - Audits: ${
       casino.trust?.audits
           ?.map((a) => `${a.provider} (${a.lastAudit})`)
           .join(', ') || 'N/A'
   }
   - Complaint Rate (90d): ${casino.trust?.complaintRate90d || 'N/A'}%
   - RTP Transparency: ${casino.trust?.rtpTransparency || 'N/A'}
   - RG Tools: ${casino.trust?.rgTools?.join(', ') || 'N/A'}
   
   **Bonuses:**
   ${
       casino.bonuses
           ?.map(
               (bonus) =>
                   `   - ${bonus.title}: ${bonus.type} | Wagering: ${bonus.wagering?.x}x | Min Deposit: ${bonus.minDeposit} | Verified: ${bonus.verifiedOn}`
           )
           .join('\n') || '   - No bonus data'
   }
   
   **Payments:**
   - Deposit Methods: ${casino.payments?.depositMethods?.join(', ') || 'N/A'}
   - Withdrawal Methods: ${
       casino.payments?.withdrawalMethods?.join(', ') || 'N/A'
   }
   - Min/Max Withdrawal: ${casino.payments?.minWithdrawal || 'N/A'}/${
            casino.payments?.maxWithdrawalPerDay || 'N/A'
        }
   - Payout Speed: ${casino.payments?.payoutSpeedHours?.min || 'N/A'}-${
            casino.payments?.payoutSpeedHours?.max || 'N/A'
        }h
   - Instant Payouts: ${casino.payments?.supportsInstant ? 'Yes' : 'No'}
   - Fees: Deposits ${casino.payments?.fees?.deposits || 'N/A'}, Withdrawals ${
            casino.payments?.fees?.withdrawals || 'N/A'
        }
   - Currencies: ${casino.payments?.currencies?.join(', ') || 'N/A'}
   
   **Games:**
   - Total Games: ${casino.games?.total || 'N/A'}
   - Live Dealer: ${casino.games?.liveDealer || 'N/A'}
   - Providers: ${casino.games?.providers?.join(', ') || 'N/A'}
   - Top Titles: ${casino.games?.topTitles?.join(', ') || 'N/A'}
   
   **Support:**
   - Live Chat: ${casino.support?.liveChat || 'N/A'}
   - Email: ${casino.support?.email || 'N/A'}
   - Phone: ${casino.support?.phone || 'N/A'}
   - Languages: ${casino.support?.languages?.join(', ') || 'N/A'}
   
   **Features:**
   - Sportsbook: ${casino.features?.hasSportsbook ? 'Yes' : 'No'}
   - Casino: ${casino.features?.hasCasino ? 'Yes' : 'No'}
   - Live Casino: ${casino.features?.hasLiveCasino ? 'Yes' : 'No'}
   - Crypto: ${casino.features?.cryptoAccepted ? 'Yes' : 'No'}
   - Mobile Apps: ${casino.features?.mobileApps?.join(', ') || 'None'}
   
   **Performance Metrics:**
   - Trust Score: ${casino.metrics?.trustScore || 'N/A'}/100
   - Bonus Score: ${casino.metrics?.bonusScore || 'N/A'}/100
   - Payout Speed Score: ${casino.metrics?.payoutSpeedScore || 'N/A'}/100
   - Game Selection Score: ${casino.metrics?.gameSelectionScore || 'N/A'}/100
   - Rising Star Score: ${casino.metrics?.risingStarScore || 'N/A'}/100
   
   **Review Summary:**
   - Overall Rating: ${casino.review?.overallRating || 'N/A'}/10
   - Summary: ${casino.review?.summary || 'N/A'}
   - Pros: ${casino.review?.pros?.join(', ') || 'N/A'}
   - Cons: ${casino.review?.cons?.join(', ') || 'N/A'}
   - Verdict: ${casino.review?.verdict || 'N/A'}
   - Last Updated: ${casino.review?.lastUpdated || 'N/A'}
   
   **Key Facts:**
   ${
       casino.facts
           ?.map(
               (fact) =>
                   `   - ${fact.key}: ${fact.value}${
                       fact.unit ? ` ${fact.unit}` : ''
                   }${fact.period ? ` (${fact.period})` : ''} | Verified: ${
                       fact.verifiedOn
                   }`
           )
           .join('\n') || '   - No facts data'
   }
`
    )
    .join('')}

## Task Requirements

Generate a structured analysis that selects winners for exactly 6 criteria:
1. **Most Trusted** - Based on trust scores, licensing, audits, complaint rates
2. **Best Bonus** - Based on bonus value, wagering terms, variety
3. **Best Payout** - Based on overall payout experience and reliability
4. **Rising Star** - Based on recent improvements and momentum
5. **Best Game Selection** - Based on game variety, providers, quality
6. **Fast Payout** - Based on withdrawal speed and processing efficiency

## Selection Methodology
- Use ONLY the provided casino data - no invented information
- Apply deterministic tie-breakers when scores are close
- Ensure each winner is justified with specific data points
- Consider the target geography (${geo.country}) regulations and preferences
- Factor in the page focus on "${criteria}" when relevant
- **CRITICAL: Each casino can only win ONE criterion - ensure all 6 winnerCasinoId values are unique**

## Content Guidelines
- Write in ${language.name} if not English
- Use ${geo.currency} for monetary values
- Reference ${author.name}'s expertise appropriately
- Maintain professional, trustworthy tone
- Include specific data points as evidence
- Ensure compliance with ${geo.country} gaming regulations

## Output Format
Return a structured JSON object following the CriteriaSnapshot schema with:
- Section header with title and description
- Author attribution
- E-E-A-T metadata including methodology and data provenance
- Exactly 6 criteria cards with winners and justifications
- Change log explaining the selection process

## CRITICAL Schema Requirements:
- EVERY keyStats array MUST contain 2-4 elements (never just 1)
- methodologyUpdatedAt MUST be full ISO datetime (e.g., "2023-09-15T10:00:00Z")
- eeat.trustSignals object is REQUIRED with auditBadges array
- eeat.jurisdictionFocus array is REQUIRED with country codes

Generate the analysis now based on this context and the current casino rankings.`;
}

export function generateContextSummary(context: MasterPromptContext): string {
    return `Page: ${context.pageContent.title} | Author: ${context.author.name} | Geo: ${context.geo.country} | Casinos: ${context.casinos.length} | Criteria: ${context.criteria}`;
}
