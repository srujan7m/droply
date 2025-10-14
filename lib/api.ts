import axios, { AxiosHeaders } from "axios"
import { getAuthHeaders } from "./auth"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const authHeaders = getAuthHeaders()
  // Normalize existing headers and re-wrap as AxiosHeaders to satisfy typing
  const currentObj = config.headers instanceof AxiosHeaders ? config.headers.toJSON() : (config.headers || {})
  config.headers = new AxiosHeaders({ ...currentObj, ...authHeaders })
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error)
  },
)
