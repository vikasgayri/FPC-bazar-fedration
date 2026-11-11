import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AuthSession, User } from '@/types'
import { authService } from '@/services/authService'

interface AuthCtx {
  user: User | null
  admin: User | null
  login: (email: string, password: string) => Promise<AuthSession>
  register: (i: { name: string; email: string; phone: string; password: string }) => Promise<AuthSession>
  logout: () => void
  adminLogin: (email: string, password: string) => Promise<AuthSession>
  adminLogout: () => void
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => authService.getSession())
  const [adminSession, setAdminSession] = useState<AuthSession | null>(() => authService.getAdminSession())

  const login = useCallback(async (e: string, p: string) => {
    const s = await authService.login(e, p)
    setSession(s)
    return s
  }, [])
  const register = useCallback(async (i: { name: string; email: string; phone: string; password: string }) => {
    const s = await authService.register(i)
    setSession(s)
    return s
  }, [])
  const logout = useCallback(() => {
    authService.logout()
    setSession(null)
  }, [])
  const adminLogin = useCallback(async (e: string, p: string) => {
    const s = await authService.adminLogin(e, p)
    setAdminSession(s)
    return s
  }, [])
  const adminLogout = useCallback(() => {
    authService.adminLogout()
    setAdminSession(null)
  }, [])

  const value = useMemo(
    () => ({ user: session?.user ?? null, admin: adminSession?.user ?? null, login, register, logout, adminLogin, adminLogout }),
    [session, adminSession, login, register, logout, adminLogin, adminLogout],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth must be used inside AuthProvider')
  return c
}
