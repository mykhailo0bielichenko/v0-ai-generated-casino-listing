import type { Casino } from "../../data/casinos"
import type { PageContent, Author, Language, Geo } from "../../types/types"

export interface MasterPromptContext {
  pageContent: PageContent
  casinos: Casino[]
  author: Author
  language: Language
  geo: Geo
  criteria: string
}

export function generateMasterPrompt(context: MasterPromptContext): string {
  const { pageContent, casinos, author, language, geo, criteria } = context

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
- **Experience**: ${author.experience}
- **Specialties**: ${author.specialties.join(", ")}
- **Bio**: ${author.bio}

## Regulatory Context
- **Jurisdiction**: ${geo.country}
- **Regulations**: ${geo.regulations.join(", ")}
- **Compliance Requirements**: Must adhere to ${geo.country} gaming regulations

## Casino Data Analysis
You have access to ${casinos.length} casinos with the following data points for each:
- Trust metrics (rating, audits, licensing, complaint rates)
- Bonus information (types, wagering, terms)
- Payment data (methods, speeds, limits, fees)
- Game selection (total games, providers, live dealer)
- Support quality (availability, languages, channels)
- Features (mobile apps, crypto support, sportsbook)

### Top ${Math.min(6, casinos.length)} Casinos (Current Ranking):
${casinos
  .slice(0, 6)
  .map(
    (casino, index) => `
${index + 1}. **${casino.brand}** (ID: ${casino.id})
   - Trust Score: ${casino.metrics.trustScore}/100
   - Payout Speed: ${casino.payments.payoutSpeedHours.min}-${casino.payments.payoutSpeedHours.max}h
   - License: ${casino.licenses[0]?.authority}
   - Bonus Score: ${casino.metrics.bonusScore}/100
   - Game Selection: ${casino.games.total} games
   - Rising Star Score: ${casino.metrics.risingStarScore}/100
`,
  )
  .join("")}

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

Generate the analysis now based on this context and the current casino rankings.`
}

export function generateContextSummary(context: MasterPromptContext): string {
  return `Page: ${context.pageContent.title} | Author: ${context.author.name} | Geo: ${context.geo.country} | Casinos: ${context.casinos.length} | Criteria: ${context.criteria}`
}
