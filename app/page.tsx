import { AppHeader } from "@/components/app-header"
import { Hero } from "@/components/marketing/hero"
import { Features } from "@/components/marketing/features"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { FAQ } from "@/components/marketing/faq"
import { CTA } from "@/components/marketing/cta"
import { SiteFooter } from "@/components/site-footer"
import { Highlights } from "@/components/marketing/highlights"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppHeader />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
