import { Button } from "@/components/ui/button"
import { FilePlus2 } from "lucide-react"
import Link from "next/link"

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FilePlus2 className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">No files yet</h3>
      <p className="text-sm text-muted-foreground mt-1">Upload your first file to get started.</p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/files/upload">Upload files</Link>
        </Button>
      </div>
    </div>
  )
}
