"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    n: 1,
    title: "Upload",
    desc: "Drop files or browse from your device. We handle progress and errors clearly.",
  },
  { n: 2, title: "Organize", desc: "Rename, sort, and filter with an interface designed for speed." },
  { n: 3, title: "Share", desc: "Create a link or keep it private. You stay in control." },
]

export function HowItWorks() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Built on a consistent system of tokens for a reliable, monochrome experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-3">
                  <Badge variant="outline" aria-label={`Step ${s.n}`}>
                    Step {s.n}
                  </Badge>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
