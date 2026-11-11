import type { DashboardStats, RegistrationType } from '@/types'
import { USE_MOCK, http } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { orderService } from './orderService'
import { productService } from './productService'
import { registrationService } from './registrationService'
import { enquiryService } from './enquiryService'
import { demoStore } from './storage'

export const adminService = {
  async dashboard(): Promise<DashboardStats> {
    if (!USE_MOCK) return http.get(endpoints.admin.dashboard)
    const [orders, products, regs, enquiries] = await Promise.all([
      orderService.adminList(),
      productService.list({}, { includeInactive: true }),
      registrationService.adminList(),
      enquiryService.adminList(),
    ])
    const valid = orders.filter((o) => o.status !== 'CANCELLED')
    const byType = { FARMER: 0, FPO: 0, SHG: 0, DAIRY: 0 } as Record<RegistrationType, number>
    regs.forEach((r) => (byType[r.type] += 1))
    const days = [...Array(7)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const key = d.toISOString().slice(0, 10)
      const total = valid.filter((o) => o.createdAt.slice(0, 10) === key).reduce((s, o) => s + o.total, 0)
      return { day: d.toLocaleDateString('en-IN', { weekday: 'short' }), total }
    })
    return {
      revenue: valid.reduce((s, o) => s + o.total, 0),
      orders: orders.length,
      pendingOrders: orders.filter((o) => ['PLACED', 'CONFIRMED', 'PACKED'].includes(o.status)).length,
      products: products.length,
      lowStock: products.filter((p) => p.stock < 10).length,
      registrations: regs.length,
      pendingRegistrations: regs.filter((r) => r.status === 'PENDING' || r.status === 'UNDER_REVIEW').length,
      enquiries: enquiries.length,
      newEnquiries: enquiries.filter((e) => e.status === 'NEW').length,
      byType,
      recentOrders: orders.slice(0, 5),
      recentRegistrations: regs.slice(0, 5),
      salesByDay: days,
    }
  },

  /** Wipes all demo data in this browser and re-seeds on next read. */
  resetDemoData() {
    demoStore.clearAll()
  },
}
