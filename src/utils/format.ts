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


export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

/** Sensible +/- step for bulk quantities (moq 500 → 50, moq 25 → 5). */
export const qtyStep = (moq: number) => Math.max(1, 10 ** Math.floor(Math.log10(Math.max(1, moq))) / 2)

/**
 * Only allow in-site redirect targets ("/account", "/bazaar/enquiry/send").
 * Blocks "//evil.com", "/\evil.com" and absolute URLs passed via ?next=.
 */
export const safeNext = (v: string | null, fallback = '/account') => (v && /^\/(?![/\\])/.test(v) && !/[\\]/.test(v) ? v : fallback)
