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
                                                    <p className='text-xs text-muted-foreground'>
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
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center'>
                        <span className='text-sm font-semibold text-white'>
                            {data.authoring.author.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </span>
                    </div>
                    <div>
                        <p className='font-medium text-card-foreground'>
                            {data.authoring.author.name}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                            {data.authoring.author.role}
                        </p>
                        <p className='text-xs text-muted-foreground mt-1'>
                            {data.authoring.author.bioLine}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
