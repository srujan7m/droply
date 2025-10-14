"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { Upload, Search, Plus } from "lucide-react"
import { useState } from "react"

export function AppHeader() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim().length) {
      router.push(`/files?query=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-semibold text-balance">
              <span className="text-primary">Droply</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <form onSubmit={onSubmit} className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search files..."
                  className="pl-8 w-[260px]"
                  aria-label="Search files"
                />
              </div>
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/files/upload">
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/files">
                <Plus className="mr-2 h-4 w-4" /> New
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
