import Link from "next/link"
import { Logo } from "./logo"

interface FooterProps {
  variant?: "default" | "language"
  language?: string
}

export function Footer({ variant = "default", language = "en" }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    casino: [
      { href: "/casinos", label: "All Casinos" },
      { href: "/casinos/fast-payout", label: "Fast Payout Casinos" },
      { href: "/casinos/new", label: "New Casinos" },
      { href: "/casinos/mobile", label: "Mobile Casinos" },
    ],
    resources: [
      { href: "/guides", label: "Casino Guides" },
      { href: "/bonuses", label: "Casino Bonuses" },
      { href: "/reviews", label: "Casino Reviews" },
      { href: "/news", label: "Industry News" },
    ],
    legal: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/responsible-gaming", label: "Responsible Gaming" },
      { href: "/contact", label: "Contact Us" },
    ],
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Your trusted source for casino reviews, bonuses, and expert analysis. We help you find the best online
              casinos with fast payouts and fair play.
            </p>
          </div>

          {/* Casino Links */}
          <div>
            <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wider mb-4">Casinos</h3>
            <ul className="space-y-3">
              {footerLinks.casino.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {currentYear} CasinoHub. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-muted-foreground">18+ Only. Gamble responsibly. BeGambleAware.org</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
