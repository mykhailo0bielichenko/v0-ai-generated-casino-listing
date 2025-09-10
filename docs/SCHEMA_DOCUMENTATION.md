# Casino Criteria Content Schemas Documentation

## Overview

This document describes the enhanced primitive schemas used for AI-generated casino criteria content. Each schema is designed to extract specific data from casino objects and provide structured, detailed information for different casino ranking criteria.

## Schema Structure

The primitive schemas follow a discriminated union pattern based on the `criterion` field, with each schema containing:

-   **Core Fields**: Common fields like `title`, `subtitle`, `proofText`, `keyStats`
-   **Criterion-Specific Fields**: Detailed data structures specific to each ranking criterion
-   **Links**: Methodology and review links for transparency

## Data Extraction Guidelines

### General Principles

1. **Always Provide Required Fields**: Use fallback values when source data is unavailable
2. **Extract from Specific Paths**: Follow the documented casino object structure
3. **Use Realistic Defaults**: When generating fallback data, use industry-standard values
4. **Maintain Data Integrity**: Ensure extracted values match expected types and ranges

## Individual Schema Documentation

### 1. MostTrustedContentSchema

**Purpose**: Identifies the most trustworthy casino based on licensing, audits, and security features.

#### Core Data Extraction

```typescript
// Extract from casino object:
casino.licenses[0].authority      → licensing.primaryLicense
casino.licenses[0].licenseId      → licensing.licenseId
casino.licenses[0].validFrom      → licensing.issuedDate
casino.metrics.trustScore         → trustMetrics.trustScore
casino.trust.rating              → trustMetrics.trustRating
casino.trust.complaintRate90d    → trustMetrics.complaintRate
casino.trust.established         → trustMetrics.established
casino.trust.audits              → securityFeatures.audits
casino.trust.rtpTransparency     → securityFeatures.rtpTransparency
casino.trust.ownership           → securityFeatures.ownership
casino.trust.rgTools             → securityFeatures.rgTools
```

#### Fallback Values

| Field                | Fallback Value                               | Usage                        |
| -------------------- | -------------------------------------------- | ---------------------------- |
| `licenseId`          | `"N/A"` or `"LIC-2024-001"`                  | When license ID unavailable  |
| `issuedDate`         | `casino.trust.established` or `"2020-01-01"` | When license date missing    |
| `additionalLicenses` | `[]`                                         | When only one license exists |
| `trustRating`        | `Math.round(trustScore/20)`                  | Calculate from trust score   |
| `complaintRate`      | `0`                                          | For highly trusted casinos   |
| `audits`             | `["Independent Auditor"]`                    | When audit data missing      |
| `rtpTransparency`    | `"PARTIAL"`                                  | Default transparency level   |
| `ownership`          | `"Licensed Gaming Company"`                  | Generic ownership info       |
| `rgTools`            | `["Self-exclusion", "Deposit limits"]`       | Standard RG tools            |

### 2. BestBonusContentSchema

**Purpose**: Identifies the best welcome bonus based on value, terms, and wagering requirements.

#### Core Data Extraction

```typescript
// Extract from casino object:
casino.bonuses[0].value.matchPercent    → bonusValue.matchPercent
casino.bonuses[0].value.maxAmount       → bonusValue.maxAmount
casino.bonuses[0].value.currency        → bonusValue.currency
casino.bonuses[0].value.spins           → bonusValue.spins (optional)
casino.bonuses[0].wagering.x            → wageringTerms.requirement
casino.bonuses[0].wagering.appliesTo    → wageringTerms.appliesTo
casino.bonuses[0].wagering.maxBet       → wageringTerms.maxBet
casino.bonuses[0].wagering.expiryDays   → wageringTerms.expiryDays
casino.bonuses[0].bonusCode             → bonusCode (optional)
```

#### Fallback Values

| Field          | Fallback Value | Usage                      |
| -------------- | -------------- | -------------------------- |
| `matchPercent` | `100`          | Standard 100% match        |
| `maxAmount`    | `500`          | Reasonable bonus amount    |
| `currency`     | `"EUR"`        | Default currency           |
| `requirement`  | `35`           | Industry standard wagering |
| `appliesTo`    | `"bonus"`      | Conservative default       |
| `maxBet`       | `5`            | Standard bet limit         |
| `expiryDays`   | `30`           | Standard expiry period     |

### 3. BestPayoutContentSchema

**Purpose**: Identifies the casino with the best overall payout experience.

#### Core Data Extraction

```typescript
// Extract from casino object:
casino.payments.payoutSpeedHours.min        → payoutSpeed.minHours
casino.payments.payoutSpeedHours.max        → payoutSpeed.maxHours
casino.payments.supportsInstant             → payoutSpeed.supportsInstant
casino.payments.withdrawalMethods           → paymentMethods.withdrawalMethods
casino.payments.currencies                  → paymentMethods.currencies
casino.payments.minWithdrawal               → paymentMethods.minWithdrawal
casino.payments.maxWithdrawalPerDay         → paymentMethods.maxWithdrawalPerDay
casino.payments.fees.deposits               → fees.deposits
casino.payments.fees.withdrawals            → fees.withdrawals
```

#### Fallback Values

| Field                 | Fallback Value                  | Usage                   |
| --------------------- | ------------------------------- | ----------------------- |
| `withdrawalMethods`   | `["Bank Transfer", "E-wallet"]` | Basic methods           |
| `currencies`          | `["EUR"]`                       | Default currency        |
| `minWithdrawal`       | `20`                            | Standard minimum        |
| `maxWithdrawalPerDay` | `5000`                          | Reasonable daily limit  |
| `fees.deposits`       | `"none"`                        | Player-friendly default |
| `fees.withdrawals`    | `"none"`                        | Player-friendly default |

### 4. RisingStarContentSchema

**Purpose**: Identifies casinos showing rapid growth and improvement.

#### Core Data Extraction

```typescript
// Extract from casino object:
casino.trust.established                    → establishmentData.established
// Calculate months from current date       → establishmentData.monthsActive
// monthsActive < 24                        → establishmentData.isNewCasino
casino.metrics.risingStarScore             → improvementMetrics.risingStarScore
casino.trust.rating                        → improvementMetrics.trustRating
casino.games.total (for growth estimate)   → improvementMetrics.gameGrowth
casino.features (analyze for new features) → improvementMetrics.newFeatures
```

#### Fallback Values

| Field           | Fallback Value                                          | Usage                    |
| --------------- | ------------------------------------------------------- | ------------------------ |
| `established`   | `"2020-01-01"`                                          | When date unavailable    |
| `monthsActive`  | `24`                                                    | Default moderate age     |
| `isNewCasino`   | `false`                                                 | Conservative default     |
| `trustRating`   | `4.0`                                                   | Good default rating      |
| `gameGrowth`    | `50`                                                    | Reasonable growth number |
| `newFeatures`   | `["Mobile App", "Live Chat", "Crypto Support"]`         | Common features          |
| `recentUpdates` | `["Added 100+ new games", "Improved mobile interface"]` | Realistic updates        |

### 5. BestGamesContentSchema

**Purpose**: Identifies the casino with the best game selection and variety.

#### Core Data Extraction

```typescript
// Extract from casino object:
casino.games.total                          → gameLibrary.totalGames
casino.games.liveDealer                     → gameLibrary.liveDealerGames
// Estimate from total games                 → gameLibrary.gameCategories
casino.games.providers.length               → providers.totalProviders
casino.games.providers                      → providers.topProviders
casino.features (check for exclusives)      → providers.exclusiveContent
casino.games.topTitles                      → gameQuality.topTitles
// Check features/games for jackpots         → gameQuality.hasJackpots
casino.features (check for tournaments)     → gameQuality.hasTournaments
```

#### Fallback Values

| Field              | Fallback Value                                   | Usage                      |
| ------------------ | ------------------------------------------------ | -------------------------- |
| `liveDealerGames`  | `totalGames * 0.1`                               | Estimate 10% live games    |
| `gameCategories`   | `["Slots", "Table Games", "Live Casino"]`        | Basic categories           |
| `totalProviders`   | `15`                                             | Reasonable provider count  |
| `topProviders`     | `["NetEnt", "Microgaming", "Play'n GO"]`         | Popular providers          |
| `exclusiveContent` | `false`                                          | Conservative default       |
| `topTitles`        | `["Starburst", "Gonzo's Quest", "Book of Dead"]` | Popular games              |
| `hasJackpots`      | `true`                                           | Most casinos have jackpots |
| `hasTournaments`   | `false`                                          | Less common feature        |

### 6. FastPayoutContentSchema

**Purpose**: Identifies the casino with the fastest withdrawal processing.

#### Core Data Extraction

```typescript
// Extract from casino object:
casino.payments.payoutSpeedHours.min        → withdrawalSpeed.minHours
casino.payments.payoutSpeedHours.max        → withdrawalSpeed.maxHours
// Calculate (min + max) / 2                 → withdrawalSpeed.averageHours
// Filter instant methods                    → withdrawalSpeed.instantMethods
// Standard KYC process                      → verificationProcess.*
// Filter e-wallets from methods             → fastMethods.eWallets
casino.features.cryptoAccepted             → fastMethods.cryptoOptions
// Generate realistic description            → fastMethods.bankTransferSpeed
casino.payments.minWithdrawal               → limits.minWithdrawal
casino.payments.maxWithdrawalPerDay         → limits.maxDailyWithdrawal
```

#### Fallback Values

| Field                   | Fallback Value                                 | Usage                         |
| ----------------------- | ---------------------------------------------- | ----------------------------- |
| `instantMethods`        | `["Skrill", "Neteller"]`                       | Common instant methods        |
| `kycRequired`           | `true`                                         | Standard for licensed casinos |
| `verificationTimeHours` | `24`                                           | Standard verification time    |
| `documentsRequired`     | `["ID", "Proof of address", "Payment method"]` | Standard docs                 |
| `eWallets`              | `["Skrill", "Neteller", "PayPal"]`             | Popular e-wallets             |
| `cryptoOptions`         | `["Bitcoin", "Ethereum"]` if crypto supported  | Major cryptocurrencies        |
| `bankTransferSpeed`     | `"1-3 business days"`                          | Realistic timeframe           |

## Best Practices

### 1. Data Validation

-   Always validate extracted values against schema constraints
-   Use type guards when accessing nested properties
-   Implement null checks for optional fields

### 2. Fallback Strategy

```typescript
// Example: Safe property access with fallback
const trustScore = casino.metrics?.trustScore ?? 85;
const licenseId = casino.licenses?.[0]?.licenseId ?? 'LIC-2024-001';
const currencies =
    casino.payments?.currencies?.length > 0
        ? casino.payments.currencies
        : ['EUR'];
```

### 3. Error Handling

-   Provide meaningful error messages when required data is missing
-   Log extraction issues for debugging
-   Ensure schema validation passes with fallback values

### 4. Performance Considerations

-   Cache calculated values (like monthsActive)
-   Avoid redundant property access
-   Use efficient array operations for filtering/mapping

## Schema Evolution

When updating schemas:

1. **Maintain Backward Compatibility**: Avoid breaking changes to existing fields
2. **Add Optional Fields First**: New required fields should start as optional
3. **Update Documentation**: Keep this document synchronized with schema changes
4. **Test Thoroughly**: Validate changes against real casino data

## Common Issues and Solutions

### Issue: Required Fields Missing

**Problem**: AI generates content without required object fields
**Solution**: Enhanced descriptions now provide explicit extraction paths and fallback values

### Issue: Type Mismatches

**Problem**: Extracted values don't match expected types
**Solution**: Use type conversion and validation in extraction logic

### Issue: Array Length Constraints

**Problem**: Generated arrays don't meet minimum length requirements
**Solution**: Provide default arrays and ensure minimum requirements are met

## Testing

Test each schema with:

1. **Complete Casino Data**: Full casino objects with all properties
2. **Partial Data**: Casino objects missing some properties
3. **Edge Cases**: Empty arrays, null values, extreme numbers
4. **Validation**: Ensure all generated content passes Zod validation

## AI Model Integration

When integrating with AI models:

1. Provide clear context about available casino data
2. Include examples of successful extractions
3. Emphasize the importance of required fields
4. Specify fallback strategies in the prompt

This documentation ensures consistent, accurate data extraction and helps the AI model understand exactly how to populate each schema field based on available casino data.
