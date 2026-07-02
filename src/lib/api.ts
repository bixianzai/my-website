const BASE_URL = import.meta.env.VITE_API_URL || '/api'

let accessToken: string | null = null
let refreshToken: string | null = null
let refreshPromise: Promise<boolean> | null = null

export function setTokens(access: string, refresh: string) {
  accessToken = access
  refreshToken = refresh
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

export function clearTokens() {
  accessToken = null
  refreshToken = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export function loadTokens() {
  accessToken = localStorage.getItem('access_token')
  refreshToken = localStorage.getItem('refresh_token')
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`
  return headers
}

async function refreshAccessToken(): Promise<boolean> {
  if (!refreshToken) return false
  if (refreshPromise) return refreshPromise
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
      if (!res.ok) { clearTokens(); return false }
      const data = await res.json()
      setTokens(data.access_token, data.refresh_token)
      return true
    } catch { clearTokens(); return false } finally { refreshPromise = null }
  })()
  return refreshPromise
}

async function request<T>(method: string, path: string, body?: unknown, retry = true): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401 && retry) {
    const refreshed = await refreshAccessToken()
    if (refreshed) return request<T>(method, path, body, false)
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw new ApiError(res.status, error.detail || 'Request failed')
  }
  const text = await res.text()
  return text ? JSON.parse(text) : undefined as unknown as T
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) { super(message); this.status = status; this.name = 'ApiError' }
}

export const api = {
  get<T>(path: string) { return request<T>('GET', path) },
  post<T>(path: string, body?: unknown) { return request<T>('POST', path, body) },
  put<T>(path: string, body?: unknown) { return request<T>('PUT', path, body) },
  del<T>(path: string) { return request<T>('DELETE', path) },
}
