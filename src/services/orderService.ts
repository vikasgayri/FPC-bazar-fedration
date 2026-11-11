import type { Address, Order, OrderStatus, PaymentMethod } from '@/types'
import { ApiError, USE_MOCK, http, mockDelay } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { collection } from './storage'
import { seedOrders } from '@/mocks/orders'
import { productService } from './productService'
import { uid } from '@/utils/format'

const store = collection<Order>('orders', seedOrders)

export const SHIPPING_FREE_ABOVE = 999
export const SHIPPING_FEE = 60
export const calcShipping = (subtotal: number) => (subtotal === 0 || subtotal >= SHIPPING_FREE_ABOVE ? 0 : SHIPPING_FEE)

export interface CreateOrderInput {
  userId: string | null
  customerName: string
  email: string
  phone: string
  address: Address
  lines: { productId: string; qty: number }[]
  paymentMethod: PaymentMethod
}

export const orderService = {
  /**
   * Creates a DEMO order. Payment is SIMULATED — no gateway (Razorpay/Cashfree) is called
   * and no money is charged. Phase 2 will create a gateway order server-side.
   */
  async create(input: CreateOrderInput): Promise<Order> {
    if (!USE_MOCK) return http.post(endpoints.orders.create, input)
    await mockDelay(900)
    const products = productService.getManyByIdSync(input.lines.map((l) => l.productId))
    const lines = input.lines.map((l) => {
      const p = products.find((x) => x.id === l.productId)
      if (!p) throw new ApiError('A product in your cart is no longer available.', 409)
      if (p.stock < l.qty) throw new ApiError(`Only ${p.stock} left of ${p.name.en}.`, 409)
      return { productId: p.id, name: p.name.en, image: p.image, price: p.price, qty: l.qty, unit: p.unit }
    })
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
    const shipping = calcShipping(subtotal)
    const now = new Date().toISOString()
    const all = store.all()
    const order: Order = {
      id: uid('o'),
      number: `FPC-DEMO-${1000 + all.length + 1 + Math.floor(Math.random() * 50)}`,
      userId: input.userId,
      customerName: input.customerName,
      email: input.email,
      phone: input.phone,
      address: input.address,
      lines,
      subtotal,
      shipping,
      total: subtotal + shipping,
      paymentMethod: input.paymentMethod,
      paymentStatus: input.paymentMethod === 'COD' ? 'COD_PENDING' : 'SIMULATED_PAID',
      paymentRef: input.paymentMethod === 'COD' ? '—' : `SIM-TXN-${Date.now().toString().slice(-8)}`,
      status: 'PLACED',
      isDemo: true,
      createdAt: now,
      history: [{ status: 'PLACED', at: now, note: 'Demo order created' }],
    }
    store.save([order, ...all])
    productService._decrementStock(input.lines)
    return order
  },

  async getByNumber(no: string): Promise<Order> {
    if (!USE_MOCK) return http.get(endpoints.orders.byNumber(no))
    await mockDelay(200)
    const o = store.all().find((x) => x.number === no)
    if (!o) throw new ApiError('Order not found', 404)
    return o
  },

  async mine(userId: string, email?: string): Promise<Order[]> {
    if (!USE_MOCK) return http.get(endpoints.orders.mine)
    await mockDelay(250)
    return store.all().filter((o) => o.userId === userId || (email && o.email.toLowerCase() === email.toLowerCase()))
  },

  async adminList(): Promise<Order[]> {
    if (!USE_MOCK) return http.get(endpoints.orders.adminList)
    await mockDelay(250)
    return store.all()
  },

  async updateStatus(id: string, status: OrderStatus, note?: string): Promise<Order> {
    if (!USE_MOCK) return http.patch(endpoints.orders.updateStatus(id), { status, note })
    await mockDelay()
    const all = store.all()
    const o = all.find((x) => x.id === id)
    if (!o) throw new ApiError('Order not found', 404)
    o.status = status
    o.history = [...o.history, { status, at: new Date().toISOString(), note }]
    store.save(all)
    return o
  },
}
