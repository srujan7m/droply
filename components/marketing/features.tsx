"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Upload, Share2, Lock, Search, History, BarChart3 } from "lucide-react"

const items = [
  {
    icon: Upload,
    title: "Frictionless uploads",
    desc: "Drag-and-drop support with clear progress and reliable results.",
  },
  {
    icon: Share2,
    title: "Share with control",
    desc: "Create links or restrict access. You decide who sees what.",
  },
  { icon: Lock, title: "Privacy first", desc: "Minimal data collection with opt-in security controls." },
  { icon: Search, title: "Instant search", desc: "Find files quickly with names, types, and metadata." },
  { icon: History, title: "Version-friendly", desc: "Keep context with recent files and simple history." },
  { icon: BarChart3, title: "Light analytics", desc: "See what’s popular without sacrificing privacy." },
]

export function Features() {
  return (
    <section id="features" className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">What you get</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            A carefully crafted, token-based monochrome UI—performant, accessible, and predictable.
          </p>
          <Separator className="mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.03 }}
              >
                <Card className="h-full transition-transform duration-200 hover:-translate-y-0.5">
                  <CardHeader className="flex-row items-center gap-3">
                    <div className="rounded-md border p-2">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base md:text-lg">{it.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{it.desc}</CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
