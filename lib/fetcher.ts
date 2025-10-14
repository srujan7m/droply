import { api } from "./api"
import type { AxiosRequestConfig } from "axios"

export async function get<T = unknown>(url: string, params?: Record<string, unknown>) {
  const res = await api.get<T>(url, { params })
  return res.data
}

export async function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  const res = await api.post<T>(url, data, config)
  return res.data
}

export async function del<T = unknown>(url: string) {
  const res = await api.delete<T>(url)
  return res.data
}
