"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const items = [
  "Fast uploads",
  "Private by default",
  "Shareable links",
  "Clean previews",
  "Keyboard-friendly",
  "No clutter",
]

export function Highlights() {
  return (
    <section className="container mx-auto px-4">
      <Separator className="my-6" />
      <motion.ul
        className="flex flex-wrap items-center justify-center gap-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {items.map((item) => (
          <motion.li key={item} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
            {/* Using secondary/outline badges keeps it monochrome while drawing attention */}
            <Badge variant="secondary" className="text-sm">
              {item}
            </Badge>
          </motion.li>
        ))}
      </motion.ul>
      <Separator className="my-6" />
    </section>
  )
}
