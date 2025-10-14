"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Folder, Upload, Settings } from "lucide-react"

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/files", label: "Files", icon: Folder },
  { href: "/files/upload", label: "Upload", icon: Upload },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:block border-r bg-sidebar text-sidebar-foreground">
      <nav className="w-56 h-[calc(100dvh-56px)] p-3">
        <ul className="flex flex-col gap-1">
          {links.map((l) => {
            const active = pathname === l.href
            const Icon = l.icon
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
