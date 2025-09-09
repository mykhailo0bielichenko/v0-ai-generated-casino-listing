import type { Author } from "../types/types"

export const authors: Author[] = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Senior iGaming Analyst",
    bio: "Sarah has been analyzing online casinos and payment methods for over 8 years, specializing in fast payout verification and player protection.",
    avatar: "/images/authors/sarah-mitchell.jpg",
    credentials: [
      "CAMS Certified",
      "8+ years iGaming experience",
      "Payment systems specialist",
      "Player protection advocate",
    ],
    experience: "8+ years in iGaming industry with focus on payment processing and regulatory compliance",
    specialties: [
      "Fast payout analysis",
      "Payment method verification",
      "Casino licensing review",
      "Player protection standards",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarah-mitchell-igaming",
      twitter: "https://twitter.com/sarah_igaming",
    },
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Casino Review Specialist",
    bio: "Marcus brings 6 years of hands-on casino testing experience, focusing on game variety, bonus terms, and user experience evaluation.",
    avatar: "/images/authors/marcus-chen.jpg",
    credentials: [
      "Certified Gaming Analyst",
      "6+ years casino testing",
      "Bonus terms expert",
      "UX evaluation specialist",
    ],
    experience: "6+ years testing and reviewing online casinos with emphasis on player experience",
    specialties: ["Casino game analysis", "Bonus evaluation", "User experience testing", "Mobile casino review"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/marcus-chen-casino",
    },
  },
]

export const getAuthorById = (id: string): Author | undefined => {
  return authors.find((author) => author.id === id)
}

export const getAuthorByName = (name: string): Author | undefined => {
  return authors.find((author) => author.name === name)
}
