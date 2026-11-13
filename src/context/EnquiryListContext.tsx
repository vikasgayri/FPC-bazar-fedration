import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { EnquiryListItem, Product } from '@/types'
import { enquiryListService } from '@/services/enquiryListService'
import { productService } from '@/services/productService'

export interface EnquiryLine {
  product: Product
  qty: number
}

interface EnquiryListCtx {
  items: EnquiryListItem[]
  lines: EnquiryLine[]
  /** Number of products in the list */
  count: number
  /** Σ qty × indicative price — reference only */
  indicativeValue: number
  /** Number of different producer organisations the enquiry will reach */
  producers: number
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
  has: (productId: string) => boolean
  wishlist: string[]
  toggleWish: (productId: string) => void
  isWished: (productId: string) => boolean
  drawerOpen: boolean
  setDrawerOpen: (v: boolean) => void
}

const Ctx = createContext<EnquiryListCtx | null>(null)
export const MAX_QTY = 1_000_000

export function EnquiryListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryListItem[]>(() => enquiryListService.load())
  const [wishlist, setWishlist] = useState<string[]>(() => enquiryListService.loadSaved())
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => enquiryListService.save(items), [items])
  useEffect(() => enquiryListService.saveSaved(wishlist), [wishlist])

  const lines = useMemo<EnquiryLine[]>(() => {
    const products = productService.getManyByIdSync(items.map((i) => i.productId))
    return items
      .map((i) => ({ product: products.find((p) => p.id === i.productId)!, qty: i.qty }))
      .filter((l) => l.product)
  }, [items])

  /** Adds a product; when no qty is given the FPO's minimum enquiry quantity is used. */
  const add = useCallback((productId: string, qty?: number) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.productId === productId)
      const q = qty ?? productService.getManyByIdSync([productId])[0]?.moq ?? 1
      if (ex) return prev.map((i) => (i.productId === productId ? { ...i, qty: qty ? Math.min(MAX_QTY, qty) : i.qty } : i))
      return [...prev, { productId, qty: Math.max(1, Math.min(MAX_QTY, q)) }]
    })
  }, [])
  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.productId !== productId) : prev.map((i) => (i.productId === productId ? { ...i, qty: Math.min(MAX_QTY, Math.round(qty)) } : i))))
  }, [])
  const remove = useCallback((productId: string) => setItems((p) => p.filter((i) => i.productId !== productId)), [])
  const clear = useCallback(() => setItems([]), [])
  const toggleWish = useCallback((id: string) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])), [])

  const value: EnquiryListCtx = {
    items,
    lines,
    count: lines.length,
    indicativeValue: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    producers: new Set(lines.map((l) => l.product.producer)).size,
    add,
    setQty,
    remove,
    clear,
    has: (id) => items.some((i) => i.productId === id),
    wishlist,
    toggleWish,
    isWished: (id) => wishlist.includes(id),
    drawerOpen,
    setDrawerOpen,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEnquiryList = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useEnquiryList must be used inside EnquiryListProvider')
  return c
}
