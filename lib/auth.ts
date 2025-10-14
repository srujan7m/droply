export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const token = window.localStorage.getItem("droply_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}
