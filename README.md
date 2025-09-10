# AI-Powered Casino Listing Platform

> A sophisticated Next.js 15 application that combines traditional iGaming affiliate features with cutting-edge AI-powered content generation using OpenAI GPT-4o.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mikes-projects-5bb2e561/v0-ai-generated-casino-listing)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/vVzGWsNG5H5)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green?style=for-the-badge&logo=openai)](https://openai.com/)

## 🎯 Project Overview

**AI-Generated Casino Listing Platform** is a demonstration of how artificial intelligence can enhance iGaming affiliate websites by generating dynamic, data-driven content. The platform automatically creates detailed casino analysis based on structured data, providing users with intelligent rankings and comprehensive reviews.

### ✨ Key Features

-   **🤖 AI-Powered Content Generation**: Automatically generate detailed casino analysis using OpenAI GPT-4o
-   **📊 Dynamic Rankings**: Real-time casino rankings based on trust, bonuses, payouts, and more
-   **🎰 Comprehensive Reviews**: In-depth casino reviews with structured data and expert analysis
-   **🎨 Modern Design**: Responsive, accessible UI built with Tailwind CSS and Radix UI
-   **⚡ High Performance**: Next.js 15 App Router with optimal loading and SEO

### 🔥 AI Generation Capabilities

The platform can generate intelligent content for multiple criteria:

-   **Most Trusted Casinos**: Based on licensing, audits, and security features
-   **Best Bonus Offers**: Analyzing bonus value, wagering terms, and conditions
-   **Fastest Payouts**: Evaluating payment methods, speed, and limits
-   **Rising Stars**: Identifying rapidly improving casinos
-   **Best Game Libraries**: Assessing game variety, providers, and quality
-   **Fast Payout Leaders**: Focusing on withdrawal efficiency

## 🚀 Live Deployment

**Production Site**: [https://vercel.com/mikes-projects-5bb2e561/v0-ai-generated-casino-listing](https://vercel.com/mikes-projects-5bb2e561/v0-ai-generated-casino-listing)

**v0.app Project**: [https://v0.app/chat/projects/vVzGWsNG5H5](https://v0.app/chat/projects/vVzGWsNG5H5)

## 🛠️ Technology Stack

### Frontend

-   **Framework**: Next.js 15.5.2 with React 18.3.1
-   **Language**: TypeScript 5 with strict mode
-   **Styling**: Tailwind CSS 4.1.9 with custom design system
-   **UI Components**: Radix UI primitives with custom styling
-   **Icons**: Lucide React

### AI & Backend

-   **AI Integration**: OpenAI GPT-4o with structured output generation
-   **Schema Validation**: Zod for runtime type checking
-   **API Routes**: Next.js API routes for server-side logic
-   **Data Management**: TypeScript interfaces with comprehensive mock data

### Development & Deployment

-   **Package Manager**: PNPM
-   **Deployment**: Vercel with automatic GitHub integration
-   **Analytics**: Vercel Analytics for performance monitoring

## 🏃‍♂️ Quick Start

### Prerequisites

-   Node.js 18+
-   PNPM package manager
-   OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/mykhailo0bielichenko/v0-ai-generated-casino-listing.git
cd v0-ai-generated-casino-listing

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI API key to .env.local

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the application running.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
├── app/                          # Next.js 15 App Router
│   ├── api/ai-generate/          # AI content generation API
│   ├── casinos/fast-payout/      # Fast payout casino page
│   ├── reviews/[slug]/           # Dynamic casino review pages
│   └── layout.tsx                # Root layout with navigation
├── components/                   # Shared UI components
│   ├── ui/                      # Base design system components
│   └── navigation.tsx           # Site navigation
├── data/                        # Data layer with mock casino data
│   ├── casinos.ts               # Comprehensive casino database
│   └── authors.ts               # Expert reviewer profiles
├── types/                       # TypeScript definitions
│   ├── criteria-content-schemas.primitives.ts  # AI schema primitives
│   └── types.ts                 # Core application types
├── lib/ai-generation/           # AI generation logic
│   ├── ai-service.ts           # OpenAI service wrapper
│   └── master-prompt.ts        # Dynamic prompt generation
└── docs/                       # Comprehensive documentation
    ├── APPLICATION_OVERVIEW.md  # Complete application guide
    └── SCHEMA_DOCUMENTATION.md  # AI schema documentation
```

## 🤖 AI Integration

The platform uses a sophisticated AI generation system:

### Schema-Driven Content

-   **Zod Validation**: Runtime schema validation for type safety
-   **Structured Output**: GPT-4o generates JSON conforming to TypeScript interfaces
-   **Multiple Criteria**: Support for 6 different ranking criteria types

### Intelligent Prompting

-   **Dynamic Context**: Casino data, author info, geographic targeting
-   **Master Prompts**: Sophisticated prompt engineering for consistent output
-   **Error Handling**: Comprehensive error recovery and validation

### Example AI Generation

```typescript
const result = await generateObject({
    model: openai('gpt-4o-2024-08-06'),
    schema: CriteriaSnapshotSchema,
    prompt: masterPrompt,
    temperature: 0.7,
});
```

## 📊 Features Demo

### Casino Listings

-   **Dynamic Rankings**: Casinos automatically ranked by various criteria
-   **Rich Cards**: Comprehensive casino information with ratings and metrics
-   **Responsive Design**: Perfect display across all devices

### AI Content Generation

-   **Real-time Generation**: Click to generate AI analysis instantly
-   **Progress Tracking**: Visual feedback during generation process
-   **Rich Display**: Generated content presented in beautiful, structured cards

### Individual Reviews

-   **Comprehensive Analysis**: Detailed reviews with expert insights
-   **Structured Data**: SEO-optimized with JSON-LD schema markup
-   **Expert Attribution**: Professional credibility with author profiles

## 🎨 Design System

The platform features a modern, professional design:

-   **Color Palette**: Sophisticated dark theme with accent colors
-   **Typography**: Geist Sans for optimal readability
-   **Components**: Consistent design language across all features
-   **Accessibility**: ARIA compliant with keyboard navigation support

## 📚 Documentation

-   **[Complete Application Guide](./docs/APPLICATION_OVERVIEW.md)**: Comprehensive architecture and feature documentation
-   **[AI Schema Documentation](./docs/SCHEMA_DOCUMENTATION.md)**: Detailed guide for AI integration and schema usage

## 🔐 Environment Variables

Create a `.env.local` file with:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

-   **TypeScript**: Strict mode enabled, comprehensive type safety
-   **Code Style**: ESLint + Prettier for consistent formatting
-   **Components**: Functional components with React hooks
-   **Testing**: Manual testing required for AI generation features

## 📈 Performance

-   **Core Web Vitals**: Optimized for excellent performance scores
-   **SEO**: Server-side rendering with structured data
-   **Caching**: Optimized AI content caching strategies
-   **Bundle Size**: Tree-shaking and optimization for minimal payload

## 🔮 Roadmap

### Phase 1: Enhanced AI

-   Multi-model support (Claude, Gemini)
-   Real-time content updates
-   Personalized recommendations

### Phase 2: Data Integration

-   Live casino API integrations
-   Real-time bonus tracking
-   Dynamic ranking updates

### Phase 3: Platform Expansion

-   Multi-language support
-   Geographic expansion
-   Mobile app development

## 📄 License

This project is for demonstration purposes. See the repository for licensing information.

## 🙋‍♂️ Support

For questions or support:

-   **GitHub Issues**: Report bugs or request features
-   **Documentation**: Check the comprehensive docs in the `/docs` folder
-   **v0.app**: Continue building on the v0.app platform

---

_Built with ❤️ using Next.js 15, OpenAI GPT-4o, and modern web technologies. Demonstrating the future of AI-powered content generation for iGaming affiliates._
