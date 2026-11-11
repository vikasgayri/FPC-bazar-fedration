import type { Order, OrderStatus } from '@/types'
import { seedProducts } from './products'

const ago = (h: number) => new Date(Date.now() - h * 36e5).toISOString()

const mk = (
  n: number,
  name: string,
  city: string,
  items: [number, number][],
  status: OrderStatus,
  hoursAgo: number,
  method: Order['paymentMethod'] = 'UPI',
): Order => {
  const products = seedProducts()
  const lines = items.map(([idx, qty]) => {
    const p = products[idx]
    return { productId: p.id, name: p.name.en, image: p.image, price: p.price, qty, unit: p.unit }
  })
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const shipping = subtotal >= 999 ? 0 : 60
  const flow: OrderStatus[] = ['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED']
  const upto = status === 'CANCELLED' ? 1 : flow.indexOf(status) + 1
  const history = flow.slice(0, upto).map((s, i) => ({ status: s, at: ago(hoursAgo - i * 6) }))
  if (status === 'CANCELLED') history.push({ status: 'CANCELLED', at: ago(hoursAgo - 2) })
  return {
    id: `o${n}`,
    number: `FPC-DEMO-${1000 + n}`,
    userId: n === 1 ? 'u-cust-1' : null,
    customerName: `${name} (Demo)`,
    email: `${name.split(' ')[0].toLowerCase()}@example.com`,
    phone: '90000000' + String(10 + n),
    address: { fullName: name, phone: '9000000000', line1: 'Demo Address, Sector 4', city, state: 'Rajasthan', pincode: '302001' },
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping,
    paymentMethod: method,
    paymentStatus: method === 'COD' ? 'COD_PENDING' : 'SIMULATED_PAID',
    paymentRef: method === 'COD' ? '—' : `SIM-TXN-${(900000 + n * 137).toString()}`,
    status,
    isDemo: true,
    createdAt: ago(hoursAgo),
    history,
  }
}

export const seedOrders = (): Order[] => [
  mk(1, 'Ananya Sharma', 'Jaipur', [[0, 1], [2, 2]], 'SHIPPED', 30),
  mk(2, 'Rohit Meena', 'Ajmer', [[7, 2], [9, 3]], 'DELIVERED', 120, 'CARD'),
  mk(3, 'Kavita Rathore', 'Udaipur', [[15, 1], [3, 2]], 'PLACED', 4, 'COD'),
  mk(4, 'Imran Qureshi', 'Kota', [[11, 4]], 'CONFIRMED', 20),
  mk(5, 'Pooja Jain', 'Jodhpur', [[17, 2], [5, 1]], 'PACKED', 12, 'NETBANKING'),
  mk(6, 'Suresh Patel', 'Ahmedabad', [[4, 1]], 'CANCELLED', 70),
  mk(7, 'Neha Verma', 'Bhopal', [[8, 1], [1, 6]], 'DELIVERED', 160),
]
