"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function CTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-lg border bg-card"
        >
          <div className="px-6 py-8 md:px-10 md:py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-pretty">
              A focused, monochrome file manager that respects your attention.
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Start uploading in seconds—no clutter, just the essentials.
            </p>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/files/upload">Start uploading</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/files">Browse files</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
