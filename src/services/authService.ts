import type { AuthSession, User } from '@/types'
import { ApiError, USE_MOCK, http, mockDelay } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { collection, demoStore } from './storage'
import { seedUsers, type DemoUserRecord } from '@/mocks/users'
import { uid } from '@/utils/format'

const users = collection<DemoUserRecord>('users', seedUsers)
const SESSION_KEY = 'session'
const ADMIN_SESSION_KEY = 'admin_session'

const strip = ({ password: _p, ...u }: DemoUserRecord): User => u

const makeSession = (user: User): AuthSession => ({
  user,
  token: `demo.${btoa(user.id)}.${uid()}`,
  expiresAt: new Date(Date.now() + 7 * 864e5).toISOString(),
})

export const authService = {
  /** Customer login (simulated). */
  async login(email: string, password: string): Promise<AuthSession> {
    if (!USE_MOCK) return http.post(endpoints.auth.login, { email, password })
    await mockDelay()
    const u = users.all().find((x) => x.email.toLowerCase() === email.toLowerCase().trim())
    if (!u || u.password !== password) throw new ApiError('Invalid email or password (demo accounts only).', 401)
    if (u.role !== 'CUSTOMER') throw new ApiError('Please use the Admin Console login for admin accounts.', 403)
    const s = makeSession(strip(u))
    demoStore.set(SESSION_KEY, s)
    return s
  },

  async register(input: { name: string; email: string; phone: string; password: string }): Promise<AuthSession> {
    if (!USE_MOCK) return http.post(endpoints.auth.register, input)
    await mockDelay()
    const list = users.all()
    if (list.some((x) => x.email.toLowerCase() === input.email.toLowerCase()))
      throw new ApiError('An account with this email already exists in this demo.', 409)
    const rec: DemoUserRecord = { id: uid('u-'), role: 'CUSTOMER', createdAt: new Date().toISOString(), ...input }
    users.save([...list, rec])
    const s = makeSession(strip(rec))
    demoStore.set(SESSION_KEY, s)
    return s
  },

  async adminLogin(email: string, password: string): Promise<AuthSession> {
    if (!USE_MOCK) return http.post(endpoints.auth.adminLogin, { email, password })
    await mockDelay()
    const u = users.all().find((x) => x.email.toLowerCase() === email.toLowerCase().trim())
    if (!u || u.password !== password || u.role !== 'ADMIN') throw new ApiError('Invalid admin credentials (demo).', 401)
    const s = makeSession(strip(u))
    demoStore.set(ADMIN_SESSION_KEY, s)
    return s
  },

  getSession(): AuthSession | null {
    const s = demoStore.get<AuthSession | null>(SESSION_KEY, null)
    return s && new Date(s.expiresAt) > new Date() ? s : null
  },
  getAdminSession(): AuthSession | null {
    const s = demoStore.get<AuthSession | null>(ADMIN_SESSION_KEY, null)
    return s && new Date(s.expiresAt) > new Date() ? s : null
  },
  logout() {
    demoStore.remove(SESSION_KEY)
  },
  adminLogout() {
    demoStore.remove(ADMIN_SESSION_KEY)
  },
}
