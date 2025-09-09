import { HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Casino } from "../../../../data/casinos"

interface ReviewFAQProps {
  casino: Casino
}

export default function ReviewFAQ({ casino }: ReviewFAQProps) {
  const faqs = [
    {
      question: `Is ${casino.brand} safe and legitimate?`,
      answer: `Yes, ${casino.brand} is licensed by ${casino.licenses.map((l) => l.authority).join(" and ")} and has been operating since ${new Date(casino.trust.established).getFullYear()}. The casino is regularly audited by ${casino.trust.audits.map((a) => a.provider).join(" and ")} to ensure fair gaming.`,
    },
    {
      question: `How long do withdrawals take at ${casino.brand}?`,
      answer: `Withdrawal processing times at ${casino.brand} typically range from ${casino.payments.payoutSpeedHours.min} to ${casino.payments.payoutSpeedHours.max} hours, depending on the payment method chosen. ${casino.payments.supportsInstant ? "Instant withdrawals are available for certain payment methods." : ""}`,
    },
    {
      question: `What is the welcome bonus at ${casino.brand}?`,
      answer:
        casino.bonuses.length > 0
          ? `${casino.brand} offers a ${casino.bonuses[0].title} with ${casino.bonuses[0].wagering.x}x wagering requirements. The minimum deposit is ${casino.bonuses[0].value.currency}${casino.bonuses[0].minDeposit}.`
          : `${casino.brand} offers various promotional bonuses. Check their website for current offers.`,
    },
    {
      question: `How many games does ${casino.brand} have?`,
      answer: `${casino.brand} features over ${casino.games.total.toLocaleString()} games from top providers including ${casino.games.providers.slice(0, 3).join(", ")}. This includes ${casino.games.liveDealer} live dealer games and popular titles like ${casino.games.topTitles.slice(0, 2).join(" and ")}.`,
    },
    {
      question: `What payment methods are accepted?`,
      answer: `${casino.brand} accepts ${casino.payments.depositMethods.length} deposit methods including ${casino.payments.depositMethods.slice(0, 3).join(", ")}. For withdrawals, you can use ${casino.payments.withdrawalMethods.join(", ")}. The casino supports ${casino.payments.currencies.join(", ")} currencies.`,
    },
    {
      question: `Is customer support available 24/7?`,
      answer: `Customer support at ${casino.brand} is available via live chat ${casino.support.liveChat}, email at ${casino.support.email}${casino.support.phone ? `, and phone at ${casino.support.phone}` : ""}. Support is provided in ${casino.support.languages.join(", ")} languages.`,
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-card-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}
