import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "default" | "white"
  className?: string
}

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-45"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
      </div>
      <span className={cn("text-xl font-bold", variant === "white" ? "text-white" : "text-foreground")}>CasinoHub</span>
    </div>
  )
}
