"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useUploadFiles } from "@/hooks/use-files"
import { useToast } from "@/hooks/use-toast"

type UploadItem = {
  file: File
  progress: number
  status: "pending" | "uploading" | "done" | "error"
}

export function UploadDropzone() {
  const [items, setItems] = useState<UploadItem[]>([])
  const upload = useUploadFiles()
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const next = acceptedFiles.map((f) => ({ file: f, progress: 0, status: "pending" as const }))
    setItems((prev) => [...prev, ...next])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  async function startUpload() {
    const files = items.map((i) => i.file)
    setItems((prev) => prev.map((i) => ({ ...i, status: "uploading" })))
    try {
      await upload.trigger({ files })
      setItems((prev) => prev.map((i) => ({ ...i, progress: 100, status: "done" })))
      toast({ title: "Upload complete", description: "Your files were uploaded successfully." })
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error"
      setItems((prev) => prev.map((i) => ({ ...i, status: "error" })))
      toast({ title: "Upload failed", description: message || "Please try again.", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className="rounded-lg border border-dashed p-10 text-center hover:bg-muted/40 transition cursor-pointer"
        aria-label="File upload area"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm text-muted-foreground">Drop the files here…</p>
        ) : (
          <p className="text-sm text-muted-foreground">Drag & drop files here, or click to select</p>
        )}
      </div>
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-md border p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{it.file.name}</span>
                <span className="text-muted-foreground">{(it.file.size / 1024).toFixed(1)} KB</span>
              </div>
              <div className="mt-2">
                <Progress value={it.progress} />
                <div className="mt-1 text-xs text-muted-foreground capitalize">{it.status}</div>
              </div>
            </div>
          ))}
          <Button onClick={startUpload}>Start upload</Button>
        </div>
      )}
    </div>
  )
}
