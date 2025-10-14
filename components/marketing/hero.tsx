"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="py-12 md:py-16 grid grid-cols-1 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-5 text-center"
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-pretty">
              Simple, <span className="rounded-sm bg-muted px-1.5 py-0.5">private</span> file management for teams and
              creators.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Upload, organize, and share files with confidence. Built on a clean, accessible, black-and-white design
              system—fast, focused, and distraction-free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link href="/files/upload">Get Started</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="#features" aria-label="Learn more about features">
                  Learn more
                </a>
              </Button>
            </div>
            <Separator className="max-w-2xl mx-auto" />
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>No tracking</span>
              <span aria-hidden="true">•</span>
              <span>Monochrome UI</span>
              <span aria-hidden="true">•</span>
              <span>Keyboard-friendly</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
