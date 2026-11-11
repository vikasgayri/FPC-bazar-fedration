import type { User } from '@/types'

/**
 * DEMO accounts only. Passwords are stored in plain text purely for the
 * front-end simulation — the real backend will use BCrypt + Spring Security JWT.
 */
export interface DemoUserRecord extends User {
  password: string
}

export const DEMO_ADMIN = { email: 'admin@fpcbazaar.demo', password: 'admin@123' }
export const DEMO_CUSTOMER = { email: 'customer@fpcbazaar.demo', password: 'demo@123' }

export const seedUsers = (): DemoUserRecord[] => [
  {
    id: 'u-admin',
    name: 'Federation Admin (Demo)',
    email: DEMO_ADMIN.email,
    password: DEMO_ADMIN.password,
    phone: '9000000001',
    role: 'ADMIN',
    createdAt: new Date(Date.now() - 90 * 864e5).toISOString(),
  },
  {
    id: 'u-cust-1',
    name: 'Ananya Sharma (Demo)',
    email: DEMO_CUSTOMER.email,
    password: DEMO_CUSTOMER.password,
    phone: '9000000002',
    role: 'CUSTOMER',
    createdAt: new Date(Date.now() - 30 * 864e5).toISOString(),
  },
]
