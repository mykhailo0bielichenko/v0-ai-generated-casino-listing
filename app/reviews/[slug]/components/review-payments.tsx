import { CreditCard, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Casino } from "../../../../data/casinos"

interface ReviewPaymentsProps {
  casino: Casino
}

export default function ReviewPayments({ casino }: ReviewPaymentsProps) {
  const formatPayoutTime = (hours: { min: number; max: number }) => {
    if (hours.max <= 24) {
      return `${hours.min}-${hours.max} hours`
    }
    return `${Math.floor(hours.min / 24)}-${Math.floor(hours.max / 24)} days`
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Banking & Payments</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Deposit Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {casino.payments.depositMethods.map((method) => (
                <Badge key={method} variant="outline" className="bg-background text-foreground border-border">
                  {method}
                </Badge>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm text-foreground/80">
              <p>
                • Minimum deposit: {casino.payments.currencies[0]}
                {casino.payments.minDeposit}
              </p>
              <p>• Fees: {casino.payments.fees.deposits}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Withdrawal Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {casino.payments.withdrawalMethods.map((method) => (
                <Badge key={method} variant="outline" className="bg-background text-foreground border-border">
                  {method}
                </Badge>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm text-foreground/80">
              <p>
                • Minimum withdrawal: {casino.payments.currencies[0]}
                {casino.payments.minWithdrawal}
              </p>
              <p>
                • Daily limit: {casino.payments.currencies[0]}
                {casino.payments.maxWithdrawalPerDay.toLocaleString()}
              </p>
              <p>• Processing time: {formatPayoutTime(casino.payments.payoutSpeedHours)}</p>
              <p>• Fees: {casino.payments.fees.withdrawals}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Supported Currencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {casino.payments.currencies.map((currency) => (
              <Badge key={currency} variant="outline" className="bg-primary text-white border-primary">
                {currency}
              </Badge>
            ))}
          </div>
          {casino.payments.supportsInstant && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Instant withdrawals available
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
