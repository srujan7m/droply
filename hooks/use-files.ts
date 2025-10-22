"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { get, del, post } from "@/lib/fetcher"

export type FileItem = {
  id: string
  name: string
  size?: number
  type?: string
  createdAt?: string
  url?: string
  thumbnailUrl?: string
}

export type FilesResponse = {
  items: FileItem[]
  total?: number
}

export function useFiles(query?: string) {
  const key = ["/api/files", query || ""]
  const { data, error, isLoading, mutate } = useSWR<FilesResponse>(key, () =>
    get<FilesResponse>("/api/files", query ? { query } : undefined),
  )
  return {
    files: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: !!error,
    mutate,
  }
}

export function useFile(id?: string) {
  const shouldFetch = !!id
  const { data, error, isLoading, mutate } = useSWR<FileItem>(shouldFetch ? ["/api/files", id] : null, () =>
    get<FileItem>(`/api/files/${id}`),
  )
  return { file: data, isLoading, isError: !!error, mutate }
}

export function useDeleteFile() {
  return useSWRMutation("/api/files", async (_key, { arg }: { arg: { id: string } }) => del(`/api/files/${arg.id}`))
}

export function useUploadFiles() {
  return useSWRMutation("/api/files/upload", async (_key, { arg }: { arg: { files: File[] } }) => {
    const form = new FormData()
    // For now support single file sequential uploads; adjust later for multi-file parallel
    for (const f of arg.files) {
      form.set("file", f)
      await post("/api/files/upload", form)
    }
    return true
  })
}
