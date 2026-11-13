/**
 * Shared domain types.
 * These mirror the DTOs the future Spring Boot + MongoDB backend is expected to expose,
 * so services can switch from mock data to REST calls without UI changes.
 */

export type Lang = 'en' | 'hi'

/** Bilingual text. `hi` is optional — UI falls back to English. */
export interface LText {
  en: string
  hi?: string
}

export type Role = 'CUSTOMER' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: Role
  createdAt: string
}

export interface AuthSession {
  user: User
  /** Demo token only. Will be a JWT issued by Spring Security in Phase 2. */
  token: string
  expiresAt: string
}

export type ProductCategory =
  | 'dairy'
  | 'grains'
  | 'pulses'
  | 'spices'
  | 'oils'
  | 'organic-inputs'
  | 'gaushala'
  | 'shg-crafts'
  | 'fresh-produce'

export interface Product {
  id: string
  slug: string
  name: LText
  description: LText
  category: ProductCategory
  /** Indicative price per unit as shared by the FPO — final rate is quoted by the FPO. */
  price: number
  /** Trading unit, e.g. "kg", "litre", "40 kg bag". */
  unit: string
  /** Minimum enquiry quantity, in units. */
  moq: number
  /** Approx. monthly supply capacity, in units. 0 = currently out of season. */
  capacity: number
  image: string
  gallery?: string[]
  /** Producer organisation (FPO / SHG / Dairy / Gaushala) that sells directly to the buyer. */
  producer: string
  /** "District, State" */
  origin: string
  tags: string[]
  featured?: boolean
  isDemo: boolean
  active: boolean
  createdAt: string
}

export interface ProductQuery {
  q?: string
  category?: ProductCategory | 'all'
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest'
  state?: string
  minPrice?: number
  maxPrice?: number
  available?: boolean
}

/** One product in the buyer's enquiry list (kept in the browser until sent). */
export interface EnquiryListItem {
  productId: string
  qty: number
}

/**
 * FPC Bazaar is a market-linkage platform, not a seller.
 * A buyer sends a trade enquiry; the federation verifies it and connects the buyer
 * with the producing FPOs, who quote and sell directly. No payment passes through the federation.
 */
export type BuyerType = 'RETAILER' | 'WHOLESALER' | 'PROCESSOR' | 'EXPORTER' | 'INSTITUTION' | 'HORECA' | 'OTHER'
export type TradeEnquiryStatus = 'RECEIVED' | 'SHARED_WITH_FPO' | 'QUOTE_SENT' | 'LINKED' | 'CLOSED'
export type SupplyFrequency = 'ONE_TIME' | 'MONTHLY' | 'SEASONAL'

export interface TradeEnquiryLine {
  productId: string
  name: string
  image: string
  producer: string
  origin: string
  unit: string
  qty: number
  /** Indicative price per unit at the time of enquiry. */
  price: number
}

export interface TradeEnquiry {
  id: string
  number: string
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
  lines: TradeEnquiryLine[]
  /** Sum of qty × indicative price — for reference only, not an invoice. */
  indicativeValue: number
  status: TradeEnquiryStatus
  isDemo: true
  createdAt: string
  history: { status: TradeEnquiryStatus; at: string; note?: string }[]
}

export type RegistrationType = 'FARMER' | 'FPO' | 'SHG' | 'DAIRY'
export type RegistrationStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'

export interface Registration {
  id: string
  refNo: string
  type: RegistrationType
  /** Primary contact / applicant name */
  name: string
  phone: string
  email?: string
  state: string
  district: string
  village?: string
  /** Type-specific fields captured from the form */
  details: Record<string, string | number | boolean | string[]>
  status: RegistrationStatus
  isDemo: true
  createdAt: string
  notes?: string
}

export type EnquiryType = 'PARTNERSHIP' | 'BULK_PURCHASE' | 'PPP_PROJECT' | 'CBG_INVESTMENT' | 'CSR' | 'GENERAL'

export interface Enquiry {
  id: string
  refNo: string
  type: EnquiryType
  name: string
  organisation?: string
  email: string
  phone: string
  city?: string
  message: string
  status: 'NEW' | 'IN_PROGRESS' | 'CLOSED'
  isDemo: true
  createdAt: string
}

export interface NewsItem {
  id: string
  slug: string
  title: LText
  excerpt: LText
  body: LText
  category: 'Event' | 'Press' | 'Initiative' | 'Award' | 'Partnership'
  image: string
  date: string
  published: boolean
}

export interface GalleryItem {
  id: string
  title: LText
  image: string
  album: 'Events' | 'Field Work' | 'Gaushala & Dairy' | 'SHG & Women' | 'Exhibitions' | 'Projects'
  createdAt: string
}

export interface DashboardStats {
  /** Indicative value of open trade enquiries (not revenue — the federation does not sell). */
  pipelineValue: number
  tradeEnquiries: number
  openTradeEnquiries: number
  linkedTradeEnquiries: number
  products: number
  seasonal: number
  registrations: number
  pendingRegistrations: number
  enquiries: number
  newEnquiries: number
  byType: Record<RegistrationType, number>
  recentTradeEnquiries: TradeEnquiry[]
  recentRegistrations: Registration[]
  enquiriesByDay: { day: string; total: number }[]
}

export interface Paged<T> {
  items: T[]
  total: number
}
