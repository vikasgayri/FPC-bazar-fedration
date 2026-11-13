import type { DashboardStats, RegistrationType } from '@/types'
import { USE_MOCK, http } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { tradeEnquiryService } from './tradeEnquiryService'
import { productService } from './productService'
import { registrationService } from './registrationService'
import { enquiryService } from './enquiryService'
import { demoStore } from './storage'

export const adminService = {
  async dashboard(): Promise<DashboardStats> {
    if (!USE_MOCK) return http.get(endpoints.admin.dashboard)
    const [trade, products, regs, enquiries] = await Promise.all([
      tradeEnquiryService.adminList(),
      productService.list({}, { includeInactive: true }),
      registrationService.adminList(),
      enquiryService.adminList(),
    ])
    const open = trade.filter((e) => e.status !== 'CLOSED' && e.status !== 'LINKED')
    const byType = { FARMER: 0, FPO: 0, SHG: 0, DAIRY: 0 } as Record<RegistrationType, number>
    regs.forEach((r) => (byType[r.type] += 1))
    const days = [...Array(7)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const key = d.toISOString().slice(0, 10)
      const total = trade.filter((e) => e.createdAt.slice(0, 10) === key).length
      return { day: d.toLocaleDateString('en-IN', { weekday: 'short' }), total }
    })
    return {
      pipelineValue: open.reduce((s, e) => s + e.indicativeValue, 0),
      tradeEnquiries: trade.length,
      openTradeEnquiries: open.length,
      linkedTradeEnquiries: trade.filter((e) => e.status === 'LINKED').length,
      products: products.length,
      seasonal: products.filter((p) => p.capacity <= 0).length,
      registrations: regs.length,
      pendingRegistrations: regs.filter((r) => r.status === 'PENDING' || r.status === 'UNDER_REVIEW').length,
      enquiries: enquiries.length,
      newEnquiries: enquiries.filter((e) => e.status === 'NEW').length,
      byType,
      recentTradeEnquiries: trade.slice(0, 5),
      recentRegistrations: regs.slice(0, 5),
      enquiriesByDay: days,
    }
  },

  /** Wipes all demo data in this browser and re-seeds on next read. */
  resetDemoData() {
    demoStore.clearAll()
  },
}
