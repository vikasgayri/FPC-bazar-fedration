import type { LText, Lang } from '@/types'

export const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export const fmtDate = (iso: string, lang: Lang = 'en', opts?: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', opts ?? { day: 'numeric', month: 'short', year: 'numeric' })

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export const lt = (t: LText | undefined, lang: Lang) => (t ? (lang === 'hi' && t.hi ? t.hi : t.en) : '')

export const uid = (prefix = '') => prefix + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4)

export const refNo = (prefix: string) =>
  `${prefix}-${new Date().getFullYear().toString().slice(-2)}${String(Math.floor(Math.random() * 90000) + 10000)}`

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const discountPct = (price: number, mrp: number) => (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0)

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
