// Core types for the iGaming affiliate website
export interface Language {
  code: string
  name: string
  flag: string
}

export interface Geo {
  country: string
  countryCode: string
  regulations: string[]
  currency: string
  language: Language
}

export interface Author {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  credentials: string[]
  experience: string
  specialties: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
  }
}

import type { SEOClusterContent } from "./seo-content"

export interface PageContent {
  id: string
  slug: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  author: Author
  publishedAt: string
  updatedAt: string
  language: Language
  geo: Geo
  content: {
    hero: {
      title: string
      subtitle: string
      description: string
    }
    sections: {
      id: string
      type: "casino-list" | "ai-generated" | "content"
      title: string
      content: string
      order: number
    }[]
  }
  seoContent?: SEOClusterContent
}

export interface AIGenerationRequest {
  pageContent: PageContent
  casinos: any[] // Will use Casino type from imported file
  context: {
    pageType: string
    criteria: string
    author: Author
    language: Language
    geo: Geo
  }
}

export interface AIGenerationStatus {
  status: "idle" | "generating" | "completed" | "error"
  progress: number
  message: string
  result?: any
  error?: string
}
