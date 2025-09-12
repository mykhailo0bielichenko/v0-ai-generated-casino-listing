'use client';

import { Clock, Star, TrendingUp, Shield, Gamepad2, Zap } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';

import type { CriteriaSnapshot } from '../../../../types/criteria-content-schemas-full';
import type { Casino } from '../../../../data/casinos';

interface AIGeneratedContentProps {
    data: CriteriaSnapshot;
    casinos: Casino[];
    variant?: 'default' | 'language';
    language?: string;
}

export function AIGeneratedContent({
    data,
    casinos,
    variant = 'default',
    language = 'en',
}: AIGeneratedContentProps) {
    const getCriterionIcon = (criterion: string) => {
        switch (criterion) {
            case 'most_trusted':
                return <Shield className='h-5 w-5' />;
            case 'best_bonus':
                return <Star className='h-5 w-5' />;
            case 'best_payout':
                return <TrendingUp className='h-5 w-5' />;
            case 'rising_star':
                return <Zap className='h-5 w-5' />;
            case 'best_games':
                return <Gamepad2 className='h-5 w-5' />;
            case 'fast_payout':
                return <Clock className='h-5 w-5' />;
            default:
                return <Star className='h-5 w-5' />;
        }
    };

    const getCriterionColor = (criterion: string) => {
        switch (criterion) {
            case 'most_trusted':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'best_bonus':
                return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'best_payout':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'rising_star':
                return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'best_games':
                return 'text-indigo-600 bg-indigo-50 border-indigo-200';
            case 'fast_payout':
                return 'text-emerald-600 bg-emerald-50 border-emerald-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const findCasinoById = (id: string) => {
        return casinos.find((casino) => casino.id === id);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className='space-y-8'>
            {/* Section Header */}
            <div className='bg-card border border-border rounded-lg p-6'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold text-card-foreground'>
                        {data.header.title}
                    </h2>
                    <Badge
                        variant='outline'
                        className='bg-accent/10 text-accent border-accent/20'
                    >
                        AI Generated
                    </Badge>
                </div>

                {data.header.subtitle && (
                    <h3 className='text-lg text-muted-foreground mb-3'>
                        {data.header.subtitle}
                    </h3>
                )}

                <p className='text-muted-foreground leading-relaxed mb-4'>
                    {data.header.description}
                </p>

                {data.header.showUpdatedOn && (
                    <p className='text-sm text-muted-foreground'>
                        Updated on {formatDate(data.updatedAt)}
                    </p>
                )}
            </div>

            {/* Criteria Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {data.items.map((item, index) => {
                    const casino = findCasinoById(item.winnerCasinoId);
                    const colorClasses = getCriterionColor(item.criterion);

                    return (
                        <Card
                            key={index}
                            className='bg-card border-border hover:shadow-lg transition-all duration-300'
                        >
                            <CardHeader className='pb-4'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses}`}
                                    >
                                        {getCriterionIcon(item.criterion)}
                                    </div>
                                    <div className='flex-1'>
                                        <CardTitle className='text-lg text-card-foreground'>
                                            {item.title}
                                        </CardTitle>
                                        {item.subtitle && (
                                            <p className='text-sm text-muted-foreground mt-1'>
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {casino && (
                                    <div className='flex items-center gap-2'>
                                        <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                                            <span className='text-sm font-bold text-white'>
                                                {casino.brand.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className='font-medium text-card-foreground'>
                                                {casino.brand}
                                            </p>
                                            <p className='text-xs text-foreground'>
                                                Rank #{casino.rank}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardHeader>

                            <CardContent className='space-y-4'>
                                {/* Proof Text */}
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    {item.proofText}
                                </p>

                                {/* Key Stats */}
                                {item.keyStats && item.keyStats.length > 0 && (
                                    <div className='grid grid-cols-2 gap-3'>
                                        {item.keyStats.map(
                                            (stat, statIndex) => (
                                                <div
                                                    key={statIndex}
                                                    className='bg-muted/30 rounded p-2'
                                                >
                                                    <p className='text-xs text-muted-foreground'>
                                                        {stat.label}
                                                    </p>
                                                    <p className='text-sm font-medium text-card-foreground'>
                                                        {stat.value}{' '}
                                                        {stat.unit && (
                                                            <span className='text-xs'>
                                                                {stat.unit}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                {/* Dynamic Content Based on Criterion */}
                                {item.criterion === 'most_trusted' &&
                                    'trustFactors' in item && (
                                        <div className='space-y-3'>
                                            <div className='space-y-2'>
                                                <p className='text-xs font-medium text-card-foreground'>
                                                    Trust Factors:
                                                </p>
                                                <div className='flex flex-wrap gap-1'>
                                                    {item.trustFactors
                                                        .slice(0, 3)
                                                        .map(
                                                            (
                                                                factor,
                                                                factorIndex
                                                            ) => (
                                                                <Badge
                                                                    key={
                                                                        factorIndex
                                                                    }
                                                                    variant='outline'
                                                                    className='text-xs bg-background'
                                                                >
                                                                    {factor}
                                                                </Badge>
                                                            )
                                                        )}
                                                </div>
                                            </div>

                                            {/* Trust Metrics */}
                                            {'trustMetrics' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Trust Metrics:
                                                    </p>
                                                    <div className='grid grid-cols-2 gap-2'>
                                                        <div>
                                                            <p className='text-xs text-muted-foreground'>
                                                                Score:{' '}
                                                                {
                                                                    item
                                                                        .trustMetrics
                                                                        .trustScore
                                                                }
                                                                /100
                                                            </p>
                                                            <p className='text-xs text-muted-foreground'>
                                                                Rating:{' '}
                                                                {
                                                                    item
                                                                        .trustMetrics
                                                                        .trustRating
                                                                }
                                                                /5 ⭐
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className='text-xs text-muted-foreground'>
                                                                Est:{' '}
                                                                {new Date(
                                                                    item.trustMetrics.established
                                                                ).getFullYear()}
                                                            </p>
                                                            <p className='text-xs text-muted-foreground'>
                                                                Complaints:{' '}
                                                                {
                                                                    item
                                                                        .trustMetrics
                                                                        .complaintRate
                                                                }
                                                                %
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {'licensing' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Licensing:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {
                                                            item.licensing
                                                                .primaryLicense
                                                        }{' '}
                                                        • License #
                                                        {
                                                            item.licensing
                                                                .licenseId
                                                        }
                                                    </p>
                                                    {item.licensing
                                                        .issuedDate && (
                                                        <p className='text-xs text-muted-foreground'>
                                                            Issued:{' '}
                                                            {new Date(
                                                                item.licensing.issuedDate
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                    {item.licensing
                                                        .additionalLicenses
                                                        .length > 0 && (
                                                        <p className='text-xs text-muted-foreground mt-1'>
                                                            Additional:{' '}
                                                            {item.licensing.additionalLicenses.join(
                                                                ', '
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {'securityFeatures' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Security:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {item.securityFeatures.audits.join(
                                                            ', '
                                                        )}{' '}
                                                        •{' '}
                                                        {
                                                            item
                                                                .securityFeatures
                                                                .rtpTransparency
                                                        }{' '}
                                                        RTP
                                                    </p>
                                                    {item.securityFeatures
                                                        .ownership && (
                                                        <p className='text-xs text-muted-foreground mt-1'>
                                                            Owner:{' '}
                                                            {
                                                                item
                                                                    .securityFeatures
                                                                    .ownership
                                                            }
                                                        </p>
                                                    )}
                                                    {item.securityFeatures
                                                        .rgTools.length > 0 && (
                                                        <p className='text-xs text-muted-foreground mt-1'>
                                                            RG Tools:{' '}
                                                            {item.securityFeatures.rgTools
                                                                .slice(0, 2)
                                                                .join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                {item.criterion === 'best_bonus' &&
                                    'bonusHighlights' in item && (
                                        <div className='space-y-3'>
                                            <div className='space-y-2'>
                                                <p className='text-xs font-medium text-card-foreground'>
                                                    Bonus Highlights:
                                                </p>
                                                <ul className='text-xs text-muted-foreground space-y-1'>
                                                    {item.bonusHighlights
                                                        .slice(0, 5)
                                                        .map(
                                                            (
                                                                highlight,
                                                                highlightIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        highlightIndex
                                                                    }
                                                                    className='flex items-start gap-1'
                                                                >
                                                                    <span className='text-accent mt-1'>
                                                                        •
                                                                    </span>
                                                                    {highlight}
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>

                                            {'bonusValue' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Bonus Details:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {
                                                            item.bonusValue
                                                                .matchPercent
                                                        }
                                                        % match up to{' '}
                                                        {
                                                            item.bonusValue
                                                                .maxAmount
                                                        }{' '}
                                                        {
                                                            item.bonusValue
                                                                .currency
                                                        }
                                                        {item.bonusValue
                                                            .spins &&
                                                            ` + ${item.bonusValue.spins} spins`}
                                                    </p>
                                                    {/* Bonus Code */}
                                                    {'bonusCode' in item &&
                                                        item.bonusCode && (
                                                            <div className='mt-2 p-1 bg-accent/10 rounded border border-accent/20'>
                                                                <p className='text-xs font-medium text-accent'>
                                                                    Code:{' '}
                                                                    {
                                                                        item.bonusCode
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}
                                                </div>
                                            )}

                                            {'wageringTerms' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Wagering:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {
                                                            item.wageringTerms
                                                                .requirement
                                                        }
                                                        x on{' '}
                                                        {
                                                            item.wageringTerms
                                                                .appliesTo
                                                        }{' '}
                                                        • Max bet{' '}
                                                        {
                                                            item.wageringTerms
                                                                .maxBet
                                                        }{' '}
                                                        •{' '}
                                                        {
                                                            item.wageringTerms
                                                                .expiryDays
                                                        }{' '}
                                                        days
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                {item.criterion === 'best_payout' &&
                                    'payoutHighlights' in item && (
                                        <div className='space-y-3'>
                                            <div className='space-y-2'>
                                                <p className='text-xs font-medium text-card-foreground'>
                                                    Payout Advantages:
                                                </p>
                                                <ul className='text-xs text-muted-foreground space-y-1'>
                                                    {item.payoutHighlights
                                                        .slice(0, 2)
                                                        .map(
                                                            (
                                                                highlight,
                                                                highlightIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        highlightIndex
                                                                    }
                                                                    className='flex items-start gap-1'
                                                                >
                                                                    <span className='text-accent mt-1'>
                                                                        •
                                                                    </span>
                                                                    {highlight}
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>

                                            {'payoutSpeed' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Payout Speed:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {
                                                            item.payoutSpeed
                                                                .minHours
                                                        }
                                                        -
                                                        {
                                                            item.payoutSpeed
                                                                .maxHours
                                                        }
                                                        h processing
                                                        {item.payoutSpeed
                                                            .supportsInstant &&
                                                            ' • Instant options available'}
                                                    </p>
                                                </div>
                                            )}

                                            {'paymentMethods' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Payment Options:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground mb-1'>
                                                        {item.paymentMethods.withdrawalMethods
                                                            .slice(0, 3)
                                                            .join(', ')}
                                                        {item.paymentMethods
                                                            .withdrawalMethods
                                                            .length > 3 &&
                                                            ` +${
                                                                item
                                                                    .paymentMethods
                                                                    .withdrawalMethods
                                                                    .length - 3
                                                            } more`}
                                                    </p>
                                                    {/* Withdrawal Limits */}
                                                    <p className='text-xs text-muted-foreground'>
                                                        Min:{' '}
                                                        {
                                                            item.paymentMethods
                                                                .minWithdrawal
                                                        }{' '}
                                                        • Max/day:{' '}
                                                        {
                                                            item.paymentMethods
                                                                .maxWithdrawalPerDay
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {/* Fees Information */}
                                            {'fees' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Fees:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        Deposits:{' '}
                                                        {item.fees.deposits} •
                                                        Withdrawals:{' '}
                                                        {item.fees.withdrawals}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                {item.criterion === 'rising_star' &&
                                    'growthFactors' in item && (
                                        <div className='space-y-3'>
                                            <div className='space-y-2'>
                                                <p className='text-xs font-medium text-card-foreground'>
                                                    Growth Factors:
                                                </p>
                                                <ul className='text-xs text-muted-foreground space-y-1'>
                                                    {item.growthFactors
                                                        .slice(0, 2)
                                                        .map(
                                                            (
                                                                factor,
                                                                factorIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        factorIndex
                                                                    }
                                                                    className='flex items-start gap-1'
                                                                >
                                                                    <span className='text-accent mt-1'>
                                                                        •
                                                                    </span>
                                                                    {factor}
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>

                                            {'establishmentData' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Establishment:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {
                                                            item
                                                                .establishmentData
                                                                .monthsActive
                                                        }{' '}
                                                        months active
                                                        {item.establishmentData
                                                            .isNewCasino &&
                                                            ' • New Casino'}
                                                    </p>
                                                </div>
                                            )}

                                            {'momentum' in item &&
                                                item.momentum.recentUpdates
                                                    .length > 0 && (
                                                    <div className='bg-muted/20 rounded p-2'>
                                                        <p className='text-xs font-medium text-card-foreground mb-1'>
                                                            Recent Updates:
                                                        </p>
                                                        <p className='text-xs text-muted-foreground'>
                                                            {
                                                                item.momentum
                                                                    .recentUpdates[0]
                                                            }
                                                        </p>
                                                        {item.momentum
                                                            .quarterlyGrowth && (
                                                            <p className='text-xs text-muted-foreground mt-1 font-medium text-accent'>
                                                                📈{' '}
                                                                {
                                                                    item
                                                                        .momentum
                                                                        .quarterlyGrowth
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    )}

                                {item.criterion === 'best_games' &&
                                    'gameHighlights' in item && (
                                        <div className='space-y-3'>
                                            <div className='space-y-2'>
                                                <p className='text-xs font-medium text-card-foreground'>
                                                    Game Highlights:
                                                </p>
                                                <ul className='text-xs text-muted-foreground space-y-1'>
                                                    {item.gameHighlights
                                                        .slice(0, 2)
                                                        .map(
                                                            (
                                                                highlight,
                                                                highlightIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        highlightIndex
                                                                    }
                                                                    className='flex items-start gap-1'
                                                                >
                                                                    <span className='text-accent mt-1'>
                                                                        •
                                                                    </span>
                                                                    {highlight}
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>

                                            {'gameLibrary' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Game Library:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {
                                                            item.gameLibrary
                                                                .totalGames
                                                        }{' '}
                                                        total games •{' '}
                                                        {
                                                            item.gameLibrary
                                                                .liveDealerGames
                                                        }{' '}
                                                        live dealer
                                                    </p>
                                                </div>
                                            )}

                                            {'providers' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Top Providers:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {item.providers.topProviders
                                                            .slice(0, 3)
                                                            .join(', ')}
                                                        {item.providers
                                                            .exclusiveContent &&
                                                            ' • Exclusive titles'}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Game Quality Indicators */}
                                            {'gameQuality' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Quality Features:
                                                    </p>
                                                    <div className='space-y-1'>
                                                        {item.gameQuality
                                                            .topTitles.length >
                                                            0 && (
                                                            <p className='text-xs text-muted-foreground'>
                                                                Featured:{' '}
                                                                {item.gameQuality.topTitles
                                                                    .slice(0, 2)
                                                                    .join(', ')}
                                                            </p>
                                                        )}
                                                        {item.gameQuality
                                                            .hasJackpots && (
                                                            <p className='text-xs text-muted-foreground'>
                                                                🎰 Progressive
                                                                Jackpots
                                                            </p>
                                                        )}
                                                        {item.gameQuality
                                                            .hasTournaments && (
                                                            <p className='text-xs text-muted-foreground'>
                                                                🏆 Tournaments
                                                                Available
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                {item.criterion === 'fast_payout' &&
                                    'speedHighlights' in item && (
                                        <div className='space-y-3'>
                                            <div className='space-y-2'>
                                                <p className='text-xs font-medium text-card-foreground'>
                                                    Speed Highlights:
                                                </p>
                                                <ul className='text-xs text-muted-foreground space-y-1'>
                                                    {item.speedHighlights
                                                        .slice(0, 2)
                                                        .map(
                                                            (
                                                                highlight,
                                                                highlightIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        highlightIndex
                                                                    }
                                                                    className='flex items-start gap-1'
                                                                >
                                                                    <span className='text-accent mt-1'>
                                                                        •
                                                                    </span>
                                                                    {highlight}
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>

                                            {'withdrawalSpeed' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Withdrawal Speed:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        Avg:{' '}
                                                        {
                                                            item.withdrawalSpeed
                                                                .averageHours
                                                        }
                                                        h • Range:{' '}
                                                        {
                                                            item.withdrawalSpeed
                                                                .minHours
                                                        }
                                                        -
                                                        {
                                                            item.withdrawalSpeed
                                                                .maxHours
                                                        }
                                                        h
                                                    </p>
                                                    {item.withdrawalSpeed
                                                        .instantMethods.length >
                                                        0 && (
                                                        <p className='text-xs text-muted-foreground mt-1'>
                                                            Instant:{' '}
                                                            {item.withdrawalSpeed.instantMethods
                                                                .slice(0, 2)
                                                                .join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {'fastMethods' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Fast Methods:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {item.fastMethods.eWallets
                                                            .slice(0, 2)
                                                            .join(', ')}
                                                        {item.fastMethods
                                                            .cryptoOptions
                                                            .length > 0 &&
                                                            ` • ${item.fastMethods.cryptoOptions
                                                                .slice(0, 2)
                                                                .join(', ')}`}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Withdrawal Limits */}
                                            {'limits' in item && (
                                                <div className='bg-muted/20 rounded p-2'>
                                                    <p className='text-xs font-medium text-card-foreground mb-1'>
                                                        Withdrawal Limits:
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        Min:{' '}
                                                        {
                                                            item.limits
                                                                .minWithdrawal
                                                        }{' '}
                                                        • Daily:{' '}
                                                        {
                                                            item.limits
                                                                .maxDailyWithdrawal
                                                        }
                                                        {item.limits
                                                            .monthlyLimit &&
                                                            ` • Monthly: ${item.limits.monthlyLimit}`}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                {/* Action Buttons */}
                                <div className='flex gap-2 pt-2'>
                                    <Button
                                        asChild
                                        size='sm'
                                        className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90'
                                    >
                                        <a
                                            href={item.reviewLink.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            {item.reviewLink.label}
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        variant='outline'
                                        size='sm'
                                        className='flex-1 border-border text-card-foreground hover:bg-muted bg-transparent'
                                    >
                                        <a
                                            href={item.methodologyLink.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            Methodology
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Author Attribution */}
            <div className='bg-muted/30 rounded-lg p-6'>
                <div className='flex items-center gap-4 mb-4'>
                    {data.authoring.author.image ? (
                        <img
                            src={data.authoring.author.image.url}
                            alt={data.authoring.author.image.alt}
                            className='w-12 h-12 rounded-full object-cover'
                        />
                    ) : (
                        <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center'>
                            <span className='text-sm font-semibold text-white'>
                                {data.authoring.author.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </span>
                        </div>
                    )}
                    <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                            <p className='font-medium text-card-foreground'>
                                {data.authoring.author.name}
                            </p>
                            <div className='flex gap-1'>
                                {data.authoring.author.credentials
                                    .slice(0, 2)
                                    .map((credential, index) => (
                                        <Badge
                                            key={index}
                                            variant='outline'
                                            className='text-xs'
                                        >
                                            {credential}
                                        </Badge>
                                    ))}
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            {data.authoring.author.role}
                        </p>
                        <p className='text-xs text-muted-foreground mt-1'>
                            {data.authoring.author.bioLine}
                        </p>
                        <Button
                            asChild
                            variant='ghost'
                            size='sm'
                            className='mt-2 h-auto p-0 text-xs text-primary hover:text-primary/80'
                        >
                            <a
                                href={data.authoring.author.profileUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                View Profile →
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Organization Info */}
                <div className='border-t border-border pt-4'>
                    <div className='flex items-center gap-3'>
                        {data.authoring.organization.logo ? (
                            <img
                                src={data.authoring.organization.logo.url}
                                alt={data.authoring.organization.logo.alt}
                                className='w-8 h-8 object-contain'
                            />
                        ) : (
                            <div className='w-8 h-8 bg-muted rounded flex items-center justify-center'>
                                <span className='text-xs font-medium'>
                                    {data.authoring.organization.name.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div>
                            <p className='text-sm font-medium text-card-foreground'>
                                Published by {data.authoring.organization.name}
                            </p>
                            <Button
                                asChild
                                variant='ghost'
                                size='sm'
                                className='h-auto p-0 text-xs text-muted-foreground hover:text-foreground'
                            >
                                <a
                                    href={data.authoring.organization.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Visit Website →
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Co-authors if any */}
                {data.authoring.coAuthors &&
                    data.authoring.coAuthors.length > 0 && (
                        <div className='border-t border-border pt-4 mt-4'>
                            <p className='text-xs font-medium text-card-foreground mb-2'>
                                Co-authors:
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                {data.authoring.coAuthors.map(
                                    (coAuthor, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center gap-2 bg-muted/50 rounded px-2 py-1'
                                        >
                                            <span className='text-xs text-muted-foreground'>
                                                {coAuthor.name} •{' '}
                                                {coAuthor.role}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
            </div>

            {/* E-E-A-T Metadata */}
            <div className='bg-card border border-border rounded-lg p-6'>
                <h3 className='text-lg font-semibold text-card-foreground mb-4'>
                    Methodology & Transparency
                </h3>

                {/* Methodology Info */}
                <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='bg-muted/30 rounded p-3'>
                            <p className='text-xs font-medium text-card-foreground mb-1'>
                                Methodology Version
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                v{data.eeat.methodology.methodologyVersion}
                            </p>
                            <p className='text-xs text-muted-foreground mt-1'>
                                Updated:{' '}
                                {formatDate(
                                    data.eeat.methodology.methodologyUpdatedAt
                                )}
                            </p>
                        </div>

                        <div className='bg-muted/30 rounded p-3'>
                            <p className='text-xs font-medium text-card-foreground mb-1'>
                                Data Coverage
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                {data.eeat.dataProvenance.coveragePeriod}
                            </p>
                            <p className='text-xs text-muted-foreground mt-1'>
                                Sample size:{' '}
                                {data.eeat.dataProvenance.sampleSize.toLocaleString()}{' '}
                                observations
                            </p>
                            <p className='text-xs text-muted-foreground mt-1'>
                                Data cutoff:{' '}
                                {new Date(
                                    data.eeat.dataProvenance.dataCutoffDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Trust Signals */}
                    <div className='space-y-3'>
                        <p className='text-sm font-medium text-card-foreground'>
                            Trust Signals
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {data.eeat.trustSignals.auditBadges.map(
                                (badge, index) => (
                                    <Badge
                                        key={index}
                                        className='bg-green-100 text-green-800 border-green-200'
                                    >
                                        <Shield className='w-3 h-3 mr-1' />
                                        {badge}
                                    </Badge>
                                )
                            )}
                            {data.eeat.trustSignals.adrProvider && (
                                <Badge className='bg-blue-100 text-blue-800 border-blue-200'>
                                    Dispute Resolution:{' '}
                                    {data.eeat.trustSignals.adrProvider}
                                </Badge>
                            )}
                            {data.eeat.trustSignals.complaintsWindowDays && (
                                <Badge variant='outline' className='text-xs'>
                                    {
                                        data.eeat.trustSignals
                                            .complaintsWindowDays
                                    }
                                    -day complaint tracking
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Source Types */}
                    <div className='space-y-3'>
                        <p className='text-sm font-medium text-card-foreground'>
                            Data Sources
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {data.eeat.dataProvenance.sourceTypes.map(
                                (sourceType, index) => (
                                    <Badge
                                        key={index}
                                        variant='outline'
                                        className='text-xs'
                                    >
                                        {sourceType
                                            .replace('_', ' ')
                                            .toUpperCase()}
                                    </Badge>
                                )
                            )}
                        </div>
                    </div>

                    {/* Jurisdiction Focus */}
                    <div className='space-y-3'>
                        <p className='text-sm font-medium text-card-foreground'>
                            Geographic Focus
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {data.eeat.jurisdictionFocus.map(
                                (country, index) => (
                                    <Badge
                                        key={index}
                                        variant='outline'
                                        className='text-xs'
                                    >
                                        {country}
                                    </Badge>
                                )
                            )}
                        </div>
                        {data.eeat.locale && data.eeat.locale !== 'en' && (
                            <p className='text-xs text-muted-foreground'>
                                Content localized for:{' '}
                                {data.eeat.locale.toUpperCase()}
                            </p>
                        )}
                    </div>

                    {/* Conflict of Interest Disclosure */}
                    <div className='bg-amber-50 border border-amber-200 rounded p-3'>
                        <p className='text-xs font-medium text-amber-800 mb-1'>
                            Transparency Disclosure
                        </p>
                        <p className='text-xs text-amber-700'>
                            {data.eeat.methodology.conflictOfInterest}
                        </p>
                    </div>

                    {/* Review Process */}
                    <div className='space-y-3'>
                        <p className='text-sm font-medium text-card-foreground'>
                            Editorial Process
                        </p>
                        <div className='bg-muted/30 rounded p-3'>
                            <p className='text-xs text-muted-foreground'>
                                {data.eeat.reviewProcess.processSummary}
                            </p>
                            {data.eeat.reviewProcess.reviewedAt && (
                                <p className='text-xs text-muted-foreground mt-2'>
                                    Last reviewed:{' '}
                                    {formatDate(
                                        data.eeat.reviewProcess.reviewedAt
                                    )}
                                </p>
                            )}
                        </div>

                        {/* Independent Reviewer */}
                        {data.eeat.reviewedBy && (
                            <div className='bg-muted/30 rounded p-3'>
                                <p className='text-xs font-medium text-card-foreground mb-2'>
                                    Independent Review
                                </p>
                                <div className='flex items-center gap-2'>
                                    <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center'>
                                        <span className='text-xs font-medium text-white'>
                                            {data.eeat.reviewedBy.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className='text-xs font-medium text-card-foreground'>
                                            {data.eeat.reviewedBy.name}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            {data.eeat.reviewedBy.role}
                                        </p>
                                    </div>
                                </div>
                                <p className='text-xs text-muted-foreground mt-2'>
                                    {data.eeat.reviewedBy.bioLine}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Links */}
                    <div className='flex gap-2 pt-2'>
                        <Button asChild variant='outline' size='sm'>
                            <a
                                href={data.eeat.methodology.methodologyHubUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Full Methodology
                            </a>
                        </Button>
                        <Button asChild variant='outline' size='sm'>
                            <a
                                href={data.eeat.methodology.editorialPolicyUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Editorial Policy
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Change Log */}
            {data.changeLog && data.changeLog.length > 0 && (
                <div className='bg-card border border-border rounded-lg p-6'>
                    <h3 className='text-lg font-semibold text-card-foreground mb-4'>
                        Recent Updates
                    </h3>
                    <div className='space-y-3'>
                        {data.changeLog.slice(0, 3).map((change, index) => (
                            <div
                                key={index}
                                className='border-l-2 border-primary/20 pl-4 pb-3'
                            >
                                <div className='flex items-center gap-2 mb-1'>
                                    <p className='text-sm font-medium text-card-foreground'>
                                        {change.reason}
                                    </p>
                                    <span className='text-xs text-muted-foreground'>
                                        {formatDate(change.at)}
                                    </span>
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                    {change.diffSummary}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sources */}
            {data.eeat.dataProvenance.sources &&
                data.eeat.dataProvenance.sources.length > 0 && (
                    <div className='bg-card border border-border rounded-lg p-6'>
                        <h3 className='text-lg font-semibold text-card-foreground mb-4'>
                            Data Sources
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {data.eeat.dataProvenance.sources
                                .slice(0, 6)
                                .map((source, index) => (
                                    <div
                                        key={index}
                                        className='bg-muted/30 rounded p-3'
                                    >
                                        <Button
                                            asChild
                                            variant='ghost'
                                            size='sm'
                                            className='h-auto p-0 text-xs font-medium text-card-foreground hover:text-primary'
                                        >
                                            <a
                                                href={source.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                {source.label} →
                                            </a>
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
        </div>
    );
}
