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

export interface Address {
  fullName: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
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
  price: number
  mrp: number
  unit: string
  stock: number
  image: string
  gallery?: string[]
  /** Producer organisation (FPO / SHG / Dairy / Gaushala) */
  producer: string
  origin: string
  rating: number
  reviews: number
  tags: string[]
  featured?: boolean
  isDemo: boolean
  active: boolean
  createdAt: string
}

export interface ProductQuery {
  q?: string
  category?: ProductCategory | 'all'
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

export interface CartItem {
  productId: string
  qty: number
}

export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'COD'

export interface OrderLine {
  productId: string
  name: string
  image: string
  price: number
  qty: number
  unit: string
}

export interface Order {
  id: string
  number: string
  userId: string | null
  customerName: string
  email: string
  phone: string
  address: Address
  lines: OrderLine[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: 'SIMULATED_PAID' | 'COD_PENDING'
  /** Simulated transaction reference — never a real gateway id. */
  paymentRef: string
  status: OrderStatus
  isDemo: true
  createdAt: string
  history: { status: OrderStatus; at: string; note?: string }[]
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
  revenue: number
  orders: number
  pendingOrders: number
  products: number
  lowStock: number
  registrations: number
  pendingRegistrations: number
  enquiries: number
  newEnquiries: number
  byType: Record<RegistrationType, number>
  recentOrders: Order[]
  recentRegistrations: Registration[]
  salesByDay: { day: string; total: number }[]
}

export interface Paged<T> {
  items: T[]
  total: number
}
