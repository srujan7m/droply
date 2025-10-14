import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="px-4 sm:px-6">
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="font-medium">Droply</p>
              <p className="text-sm text-muted-foreground">
                Minimal, monochrome file management for teams and creators.
              </p>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/files" className="hover:underline">
                Files
              </Link>
              <Link href="/files/upload" className="hover:underline">
                Upload
              </Link>
              <Link href="/settings" className="hover:underline">
                Settings
              </Link>
            </nav>
          </div>
          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Droply. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
