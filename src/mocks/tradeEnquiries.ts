import type { BuyerType, SupplyFrequency, TradeEnquiry, TradeEnquiryStatus } from '@/types'
import { seedProducts } from './products'

/** DEMO trade enquiries from illustrative buyers — not real organisations. */
const ago = (h: number) => new Date(Date.now() - h * 36e5).toISOString()
const FLOW: TradeEnquiryStatus[] = ['RECEIVED', 'SHARED_WITH_FPO', 'QUOTE_SENT', 'LINKED']

const mk = (
  n: number,
  name: string,
  org: string,
  buyerType: BuyerType,
  city: string,
  state: string,
  items: [number, number][],
  status: TradeEnquiryStatus,
  hoursAgo: number,
  frequency: SupplyFrequency = 'MONTHLY',
): TradeEnquiry => {
  const products = seedProducts()
  const lines = items.map(([idx, qty]) => {
    const p = products[idx]
    return { productId: p.id, name: p.name.en, image: p.image, producer: p.producer, origin: p.origin, unit: p.unit, qty, price: p.price }
  })
  const upto = status === 'CLOSED' ? 1 : FLOW.indexOf(status) + 1
  const history: TradeEnquiry['history'] = FLOW.slice(0, upto).map((s, i) => ({ status: s, at: ago(hoursAgo - i * 8) }))
  if (status === 'CLOSED') history.push({ status: 'CLOSED', at: ago(hoursAgo - 4), note: 'Buyer requirement changed' })
  return {
    id: `te${n}`,
    number: `FPC-ENQ-${2000 + n}`,
    userId: n === 1 ? 'u-cust-1' : null,
    buyerName: `${name} (Demo)`,
    organisation: org,
    buyerType,
    email: `${name.split(' ')[0].toLowerCase()}@example.com`,
    phone: '90000000' + String(10 + n),
    city,
    state,
    frequency,
    lines,
    indicativeValue: lines.reduce((s, l) => s + l.price * l.qty, 0),
    status,
    isDemo: true,
    createdAt: ago(hoursAgo),
    history,
  }
}

export const seedTradeEnquiries = (): TradeEnquiry[] => [
  mk(1, 'Ananya Sharma', 'Organic Basket Stores (Demo)', 'RETAILER', 'Jaipur', 'Rajasthan', [[0, 50], [2, 40]], 'QUOTE_SENT', 30),
  mk(2, 'Rohit Meena', 'Meena Wholesale Traders (Demo)', 'WHOLESALER', 'Ajmer', 'Rajasthan', [[6, 2000], [8, 1000]], 'LINKED', 120),
  mk(3, 'Kavita Rathore', 'Hotel Lakeview (Demo)', 'HORECA', 'Udaipur', 'Rajasthan', [[17, 300], [3, 50]], 'RECEIVED', 4, 'ONE_TIME'),
  mk(4, 'Imran Qureshi', 'Kota Agro Inputs (Demo)', 'RETAILER', 'Kota', 'Rajasthan', [[11, 200]], 'SHARED_WITH_FPO', 20, 'SEASONAL'),
  mk(5, 'Pooja Jain', 'NutriFoods Processing (Demo)', 'PROCESSOR', 'Ahmedabad', 'Gujarat', [[9, 1500], [5, 500]], 'SHARED_WITH_FPO', 12),
  mk(6, 'Suresh Patel', 'Patel Exports (Demo)', 'EXPORTER', 'Surat', 'Gujarat', [[4, 300]], 'CLOSED', 70, 'ONE_TIME'),
  mk(7, 'Neha Verma', 'City School Canteens (Demo)', 'INSTITUTION', 'Bhopal', 'Madhya Pradesh', [[7, 800], [1, 3000]], 'LINKED', 160),
]
