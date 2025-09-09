export interface TestimonialData {
  id: string
  name: string
  location: string
  rating: number
  date: string
  content: string
  verified: boolean
  payoutTime: string
  paymentMethod: string
  avatar?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: "general" | "payments" | "verification" | "security" | "bonuses"
}

export interface PaymentMethodInfo {
  id: string
  name: string
  type: "e-wallet" | "crypto" | "bank-transfer" | "card" | "instant-banking"
  averageTime: string
  minWithdrawal: string
  maxWithdrawal: string
  fees: string
  availability: string[]
  icon: string
  pros: string[]
  cons: string[]
}

export interface StepGuide {
  id: string
  title: string
  steps: {
    stepNumber: number
    title: string
    description: string
    tips?: string[]
    warning?: string
  }[]
}

export interface ComparisonTable {
  id: string
  title: string
  description: string
  headers: string[]
  rows: {
    casino: string
    data: (string | number | boolean)[]
    highlighted?: boolean
  }[]
  footnotes?: string[]
}

export interface TrustSignal {
  id: string
  type: "license" | "certification" | "award" | "partnership" | "security"
  title: string
  description: string
  icon: string
  verificationUrl?: string
}

export interface ContentSection {
  id: string
  type: "text" | "list" | "table" | "testimonials" | "faq" | "guide" | "comparison" | "trust-signals" | "interactive"
  heading: {
    level: 2 | 3 | 4
    text: string
    id: string
  }
  content: {
    text?: string[]
    list?: {
      type: "ordered" | "unordered"
      items: string[]
    }
    testimonials?: TestimonialData[]
    faq?: FAQItem[]
    guide?: StepGuide
    comparison?: ComparisonTable
    trustSignals?: TrustSignal[]
    interactive?: {
      type: "calculator" | "quiz" | "filter" | "comparison-tool"
      config: Record<string, any>
    }
  }
  cta?: {
    text: string
    link: string
    variant: "primary" | "secondary" | "outline"
  }
  lastUpdated?: string
}

export interface SEOClusterContent {
  id: string
  title: string
  description: string
  lastUpdated: string
  author: {
    name: string
    expertise: string[]
    bio: string
  }
  tableOfContents: {
    id: string
    title: string
    level: number
  }[]
  sections: ContentSection[]
  paymentMethods: PaymentMethodInfo[]
  relatedTopics: {
    title: string
    url: string
    description: string
  }[]
  schema: {
    type: "Article" | "Guide" | "Review"
    data: Record<string, any>
  }
}
