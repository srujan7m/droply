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
  const key = ["/files", query || ""]
  const { data, error, isLoading, mutate } = useSWR<FilesResponse>(key, () =>
    get<FilesResponse>("/files", query ? { query } : undefined),
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
  const { data, error, isLoading, mutate } = useSWR<FileItem>(shouldFetch ? ["/files", id] : null, () =>
    get<FileItem>(`/files/${id}`),
  )
  return { file: data, isLoading, isError: !!error, mutate }
}

export function useDeleteFile() {
  return useSWRMutation("/files", async (_key, { arg }: { arg: { id: string } }) => del(`/files/${arg.id}`))
}

export function useUploadFiles() {
  return useSWRMutation("/files/upload", async (_key, { arg }: { arg: { files: File[] } }) => {
    const form = new FormData()
    for (const f of arg.files) form.append("files", f)
    return post("/files", form, { headers: { "Content-Type": "multipart/form-data" } })
  })
}
