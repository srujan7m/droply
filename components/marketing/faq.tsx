"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

const faqs = [
  {
    q: "Is this really monochrome?",
    a: "Yes. The interface relies on background, foreground, border, and muted tokens with a single red reserved for destructive actions.",
  },
  {
    q: "Do I need to set anything up?",
    a: "Add NEXT_PUBLIC_API_BASE_URL in Vars to connect your backend. Uploads and lists will populate from your API.",
  },
  {
    q: "Is it accessible?",
    a: "We follow semantic HTML, keyboard-friendly components, and WCAG-minded contrasts in both light and dark.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Absolutely—mobile-first layouts, responsive grids, and touch-friendly controls are built-in.",
  },
]

export function FAQ() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Frequently asked questions</h2>
          <Separator className="mt-4" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Accordion type="single" collapsible>
            {faqs.map((f, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
