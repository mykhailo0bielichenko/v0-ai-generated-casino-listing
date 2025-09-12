'use client';

import { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Clock,
    Shield,
    Star,
    CheckCircle,
    ExternalLink,
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../../../../components/ui/collapsible';
import type {
    SEOClusterContent,
    ContentSection,
    TestimonialData,
    FAQItem,
    PaymentMethodInfo,
} from '../../../../types/seo-content';

interface SEOContentSectionProps {
    content: SEOClusterContent;
    variant?: 'default' | 'compact';
    language?: string;
}

export function SEOContentSection({
    content,
    variant = 'default',
    language = 'en',
}: SEOContentSectionProps) {
    return (
        <div className='space-y-8'>
            {/* Table of Contents */}
            <TableOfContents items={content.tableOfContents} />

            {/* Content Sections */}
            {content.sections.map((section) => (
                <ContentSectionRenderer key={section.id} section={section} />
            ))}

            {/* Payment Methods Overview */}
            <PaymentMethodsSection methods={content.paymentMethods} />

            {/* Related Topics */}
            <RelatedTopicsSection topics={content.relatedTopics} />
        </div>
    );
}

function TableOfContents({
    items,
}: {
    items: { id: string; title: string; level: number }[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className='bg-muted/30 border-muted'>
            <CardHeader className='pb-3'>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <CollapsibleTrigger asChild>
                        <Button
                            variant='ghost'
                            className='w-full justify-between p-0 h-auto font-semibold text-foreground'
                        >
                            Table of Contents
                            {isOpen ? (
                                <ChevronUp className='h-4 w-4' />
                            ) : (
                                <ChevronDown className='h-4 w-4' />
                            )}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-4'>
                        <nav className='space-y-2'>
                            {items.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                                        item.level === 2
                                            ? 'font-medium'
                                            : item.level === 3
                                            ? 'ml-4'
                                            : 'ml-8'
                                    }`}
                                >
                                    {item.title}
                                </a>
                            ))}
                        </nav>
                    </CollapsibleContent>
                </Collapsible>
            </CardHeader>
        </Card>
    );
}

function ContentSectionRenderer({ section }: { section: ContentSection }) {
    const HeadingComponent =
        section.heading.level === 2
            ? 'h2'
            : section.heading.level === 3
            ? 'h3'
            : 'h4';
    const headingClasses = {
        2: 'text-2xl font-bold text-foreground mb-4',
        3: 'text-xl font-semibold text-foreground mb-3',
        4: 'text-lg font-medium text-foreground mb-2',
    };

    return (
        <section id={section.heading.id} className='scroll-mt-20'>
            <HeadingComponent className={headingClasses[section.heading.level]}>
                {section.heading.text}
            </HeadingComponent>

            {section.type === 'text' && section.content.text && (
                <div className='prose prose-gray max-w-none space-y-4'>
                    {section.content.text.map((paragraph, index) => (
                        <p
                            key={index}
                            className='text-muted-foreground leading-relaxed'
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            )}

            {section.type === 'list' && section.content.list && (
                <div className='mt-4'>
                    {section.content.list.type === 'ordered' ? (
                        <ol className='list-decimal list-inside space-y-2 text-muted-foreground'>
                            {section.content.list.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    ) : (
                        <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                            {section.content.list.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {section.type === 'guide' && section.content.guide && (
                <GuideSection guide={section.content.guide} />
            )}

            {section.type === 'testimonials' &&
                section.content.testimonials && (
                    <TestimonialsSection
                        testimonials={section.content.testimonials}
                    />
                )}

            {section.type === 'comparison' && section.content.comparison && (
                <ComparisonTableSection
                    comparison={section.content.comparison}
                />
            )}

            {section.type === 'trust-signals' &&
                section.content.trustSignals && (
                    <TrustSignalsSection
                        signals={section.content.trustSignals}
                    />
                )}

            {section.type === 'faq' && section.content.faq && (
                <FAQSection faqs={section.content.faq} />
            )}

            {section.cta && (
                <div className='mt-6'>
                    <Button
                        variant={
                            section.cta.variant === 'primary'
                                ? 'default'
                                : section.cta.variant
                        }
                        asChild
                        className='bg-primary text-primary-foreground hover:bg-primary/90'
                    >
                        <a href={section.cta.link}>{section.cta.text}</a>
                    </Button>
                </div>
            )}

            {section.lastUpdated && (
                <p className='text-xs text-muted-foreground mt-4'>
                    Last updated:{' '}
                    {new Date(section.lastUpdated).toLocaleDateString()}
                </p>
            )}
        </section>
    );
}

function GuideSection({ guide }: { guide: any }) {
    return (
        <div className='space-y-6 mt-4'>
            {guide.steps.map((step: any) => (
                <Card key={step.stepNumber} className='bg-card border-border'>
                    <CardHeader className='pb-3'>
                        <CardTitle className='flex items-center gap-3 text-lg'>
                            <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold'>
                                {step.stepNumber}
                            </div>
                            {step.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-muted-foreground mb-3'>
                            {step.description}
                        </p>
                        {step.tips && (
                            <div className='space-y-2'>
                                <h5 className='font-medium text-foreground'>
                                    Tips:
                                </h5>
                                <ul className='list-disc list-inside space-y-1 text-sm text-muted-foreground'>
                                    {step.tips.map(
                                        (tip: string, index: number) => (
                                            <li key={index}>{tip}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                        {step.warning && (
                            <div className='mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md'>
                                <p className='text-sm text-destructive font-medium'>
                                    ⚠️ {step.warning}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function TestimonialsSection({
    testimonials,
}: {
    testimonials: TestimonialData[];
}) {
    return (
        <div className='grid gap-6 md:grid-cols-2 mt-4'>
            {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className='bg-card border-border'>
                    <CardHeader className='pb-3'>
                        <div className='flex items-start justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                                    <span className='text-sm font-bold text-primary'>
                                        {testimonial.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </span>
                                </div>
                                <div>
                                    <h4 className='font-medium text-foreground'>
                                        {testimonial.name}
                                    </h4>
                                    <p className='text-xs text-muted-foreground'>
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                {testimonial.verified && (
                                    <Badge
                                        variant='secondary'
                                        className='text-xs bg-green-100 text-green-800 border-green-200'
                                    >
                                        <CheckCircle className='w-3 h-3 mr-1' />
                                        Verified
                                    </Badge>
                                )}
                                <div className='flex'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < testimonial.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className='text-muted-foreground mb-3'>
                            {testimonial.content}
                        </p>
                        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                            <span className='flex items-center gap-1'>
                                <Clock className='w-3 h-3' />
                                {testimonial.payoutTime}
                            </span>
                            <span>{testimonial.paymentMethod}</span>
                            <span>
                                {new Date(
                                    testimonial.date
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function ComparisonTableSection({ comparison }: { comparison: any }) {
    return (
        <div className='mt-4'>
            <p className='text-muted-foreground mb-4'>
                {comparison.description}
            </p>
            <div className='overflow-x-auto'>
                <table className='w-full border-collapse border border-border rounded-lg'>
                    <thead>
                        <tr className='bg-muted/50'>
                            {comparison.headers.map(
                                (header: string, index: number) => (
                                    <th
                                        key={index}
                                        className='border border-border p-3 text-left font-medium text-foreground'
                                    >
                                        {header}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {comparison.rows.map((row: any, index: number) => (
                            <tr
                                key={index}
                                className={
                                    row.highlighted ? 'bg-primary/5' : 'bg-card'
                                }
                            >
                                <td className='border border-border p-3 font-medium text-foreground'>
                                    {row.casino}
                                </td>
                                {row.data.map(
                                    (cell: any, cellIndex: number) => (
                                        <td
                                            key={cellIndex}
                                            className='border border-border p-3 text-muted-foreground'
                                        >
                                            {cell}
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {comparison.footnotes && (
                <div className='mt-4 space-y-1'>
                    {comparison.footnotes.map((note: string, index: number) => (
                        <p
                            key={index}
                            className='text-xs text-muted-foreground'
                        >
                            * {note}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

function TrustSignalsSection({ signals }: { signals: any[] }) {
    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>
            {signals.map((signal) => (
                <Card
                    key={signal.id}
                    className='bg-card border-border text-center'
                >
                    <CardContent className='p-4'>
                        <div className='w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center'>
                            <Shield className='w-6 h-6 text-primary' />
                        </div>
                        <h4 className='font-medium text-foreground mb-2'>
                            {signal.title}
                        </h4>
                        <p className='text-xs text-muted-foreground mb-3'>
                            {signal.description}
                        </p>
                        {signal.verificationUrl && (
                            <Button
                                variant='outline'
                                size='sm'
                                asChild
                                className='text-xs bg-transparent'
                            >
                                <a
                                    href={signal.verificationUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Verify{' '}
                                    <ExternalLink className='w-3 h-3 ml-1' />
                                </a>
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setOpenItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className='space-y-4 mt-4'>
            {faqs.map((faq) => (
                <Card key={faq.id} className='bg-card border-border'>
                    <Collapsible
                        open={openItems.includes(faq.id)}
                        onOpenChange={() => toggleItem(faq.id)}
                    >
                        <CollapsibleTrigger asChild>
                            <CardHeader className='cursor-pointer hover:bg-muted/50 transition-colors'>
                                <div className='flex items-center justify-between'>
                                    <h4 className='font-medium text-foreground text-left'>
                                        {faq.question}
                                    </h4>
                                    {openItems.includes(faq.id) ? (
                                        <ChevronUp className='h-4 w-4 text-muted-foreground' />
                                    ) : (
                                        <ChevronDown className='h-4 w-4 text-muted-foreground' />
                                    )}
                                </div>
                            </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <CardContent className='pt-0'>
                                <p className='text-muted-foreground'>
                                    {faq.answer}
                                </p>
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
            ))}
        </div>
    );
}

function PaymentMethodsSection({ methods }: { methods: PaymentMethodInfo[] }) {
    return (
        <section className='scroll-mt-20'>
            <h2 className='text-2xl font-bold text-foreground mb-4'>
                Payment Methods Comparison
            </h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {methods.map((method) => (
                    <Card key={method.id} className='bg-card border-border'>
                        <CardHeader>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                                    <Clock className='w-5 h-5 text-primary' />
                                </div>
                                <div>
                                    <CardTitle className='text-lg'>
                                        {method.name}
                                    </CardTitle>
                                    <Badge
                                        variant='secondary'
                                        className='text-xs'
                                    >
                                        {method.type}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-3'>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-muted-foreground'>
                                        Processing Time:
                                    </span>
                                    <span className='text-sm font-medium text-foreground'>
                                        {method.averageTime}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-muted-foreground'>
                                        Min/Max:
                                    </span>
                                    <span className='text-sm font-medium text-foreground'>
                                        {method.minWithdrawal} -{' '}
                                        {method.maxWithdrawal}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-muted-foreground'>
                                        Fees:
                                    </span>
                                    <span className='text-sm font-medium text-foreground'>
                                        {method.fees}
                                    </span>
                                </div>

                                <div className='pt-3 border-t border-border'>
                                    <h5 className='text-sm font-medium text-foreground mb-2'>
                                        Pros:
                                    </h5>
                                    <ul className='text-xs text-muted-foreground space-y-1'>
                                        {method.pros
                                            .slice(0, 2)
                                            .map((pro, index) => (
                                                <li
                                                    key={index}
                                                    className='flex items-center gap-1'
                                                >
                                                    <CheckCircle className='w-3 h-3 text-green-500' />
                                                    {pro}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

function RelatedTopicsSection({ topics }: { topics: any[] }) {
    return (
        <section className='scroll-mt-20'>
            <h2 className='text-2xl font-bold text-foreground mb-4'>
                Related Guides
            </h2>
            <div className='grid gap-4 md:grid-cols-3'>
                {topics.map((topic, index) => (
                    <Card
                        key={index}
                        className='bg-card border-border hover:bg-muted/50 transition-colors'
                    >
                        <CardContent className='p-4'>
                            <h4 className='font-medium text-foreground mb-2'>
                                {topic.title}
                            </h4>
                            <p className='text-sm text-muted-foreground mb-3'>
                                {topic.description}
                            </p>
                            <Button variant='outline' size='sm' asChild>
                                <a href={topic.url}>Read More</a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
