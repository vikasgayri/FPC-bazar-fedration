/**
 * API client configuration.
 *
 * PHASE 1 (current): `USE_MOCK` is true — every service resolves against local mock
 * data persisted in localStorage. No network requests are made and no fake server exists.
 *
 * PHASE 2: set VITE_USE_MOCK=false, install axios, and implement `http` below
 * (base URL, JWT bearer header from the auth session, 401 handling).
 * Service functions already return the same Promise shapes, so the UI does not change.
 */

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1'
export const USE_MOCK: boolean = (import.meta.env.VITE_USE_MOCK ?? 'true') !== 'false'

export class ApiError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

/** Simulates network latency so loading states are visible in the demo. */
export const mockDelay = (ms = 350) => new Promise<void>((r) => setTimeout(r, ms + Math.random() * 200))

/**
 * Placeholder for the Phase 2 HTTP layer. Intentionally throws so that nobody
 * accidentally ships a half-wired backend call during Phase 1.
 *
 * Phase 2 sketch (axios):
 *   const http = axios.create({ baseURL: API_BASE_URL })
 *   http.interceptors.request.use(cfg => { cfg.headers.Authorization = `Bearer ${token}`; return cfg })
 */
export const http = {
  async get<T>(_url: string): Promise<T> {
    throw new ApiError('Backend not connected in Phase 1 (mock mode).', 501)
  },
  async post<T>(_url: string, _body?: unknown): Promise<T> {
    throw new ApiError('Backend not connected in Phase 1 (mock mode).', 501)
  },
  async put<T>(_url: string, _body?: unknown): Promise<T> {
    throw new ApiError('Backend not connected in Phase 1 (mock mode).', 501)
  },
  async patch<T>(_url: string, _body?: unknown): Promise<T> {
    throw new ApiError('Backend not connected in Phase 1 (mock mode).', 501)
  },
  async delete<T>(_url: string): Promise<T> {
    throw new ApiError('Backend not connected in Phase 1 (mock mode).', 501)
  },
}
