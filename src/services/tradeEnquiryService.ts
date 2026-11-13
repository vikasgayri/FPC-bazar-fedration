import type { BuyerType, SupplyFrequency, TradeEnquiry, TradeEnquiryStatus } from '@/types'
import { ApiError, USE_MOCK, http, mockDelay } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { collection } from './storage'
import { seedTradeEnquiries } from '@/mocks/tradeEnquiries'
import { productService } from './productService'
import { uid } from '@/utils/format'

const store = collection<TradeEnquiry>('trade_enquiries', seedTradeEnquiries)

export interface CreateTradeEnquiryInput {
  userId: string | null
  buyerName: string
  organisation?: string
  buyerType: BuyerType
  email: string
  phone: string
  city: string
  state: string
  pincode?: string
  frequency: SupplyFrequency
  requiredBy?: string
  message?: string
  lines: { productId: string; qty: number }[]
}

/** Order of the linkage workflow, used for timelines. */
export const TRADE_FLOW: TradeEnquiryStatus[] = ['RECEIVED', 'SHARED_WITH_FPO', 'QUOTE_SENT', 'LINKED']

/**
 * Buyer → FPO trade enquiries (market linkage).
 * The federation does not sell, invoice or collect payment: it verifies the enquiry and
 * connects the buyer with the producing FPOs, who quote and supply directly.
 */
export const tradeEnquiryService = {
  async create(input: CreateTradeEnquiryInput): Promise<TradeEnquiry> {
    if (!USE_MOCK) return http.post(endpoints.tradeEnquiries.create, input)
    await mockDelay(800)
    const products = productService.getManyByIdSync(input.lines.map((l) => l.productId))
    const lines = input.lines.map((l) => {
      const p = products.find((x) => x.id === l.productId)
      if (!p) throw new ApiError('A product in your list is no longer listed.', 409)
      return { productId: p.id, name: p.name.en, image: p.image, producer: p.producer, origin: p.origin, unit: p.unit, qty: l.qty, price: p.price }
    })
    const now = new Date().toISOString()
    const all = store.all()
    const { lines: _ignored, ...rest } = input
    void _ignored
    const enq: TradeEnquiry = {
      ...rest,
      id: uid('te'),
      number: `FPC-ENQ-${2000 + all.length + 1 + Math.floor(Math.random() * 50)}`,
      lines,
      indicativeValue: lines.reduce((s, l) => s + l.price * l.qty, 0),
      status: 'RECEIVED',
      isDemo: true,
      createdAt: now,
      history: [{ status: 'RECEIVED', at: now, note: 'Enquiry received by the federation (demo)' }],
    }
    store.save([enq, ...all])
    return enq
  },

  async getByNumber(no: string): Promise<TradeEnquiry> {
    if (!USE_MOCK) return http.get(endpoints.tradeEnquiries.byNumber(no))
    await mockDelay(200)
    const e = store.all().find((x) => x.number === no)
    if (!e) throw new ApiError('Enquiry not found', 404)
    return e
  },

  async mine(userId: string, email?: string): Promise<TradeEnquiry[]> {
    if (!USE_MOCK) return http.get(endpoints.tradeEnquiries.mine)
    await mockDelay(250)
    return store.all().filter((e) => e.userId === userId || (email && e.email.toLowerCase() === email.toLowerCase()))
  },

  async adminList(): Promise<TradeEnquiry[]> {
    if (!USE_MOCK) return http.get(endpoints.tradeEnquiries.adminList)
    await mockDelay(250)
    return store.all()
  },

  async updateStatus(id: string, status: TradeEnquiryStatus, note?: string): Promise<TradeEnquiry> {
    if (!USE_MOCK) return http.patch(endpoints.tradeEnquiries.updateStatus(id), { status, note })
    await mockDelay()
    const all = store.all()
    const e = all.find((x) => x.id === id)
    if (!e) throw new ApiError('Enquiry not found', 404)
    e.status = status
    e.history = [...e.history, { status, at: new Date().toISOString(), note }]
    store.save(all)
    return e
  },
}
