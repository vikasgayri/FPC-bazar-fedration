import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, Product } from '@/types'
import { cartService } from '@/services/cartService'
import { productService } from '@/services/productService'
import { calcShipping } from '@/services/orderService'

export interface CartLine {
  product: Product
  qty: number
}

interface CartCtx {
  items: CartItem[]
  lines: CartLine[]
  count: number
  subtotal: number
  shipping: number
  total: number
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
  wishlist: string[]
  toggleWish: (productId: string) => void
  isWished: (productId: string) => boolean
  drawerOpen: boolean
  setDrawerOpen: (v: boolean) => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => cartService.loadCart())
  const [wishlist, setWishlist] = useState<string[]>(() => cartService.loadWishlist())
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => cartService.saveCart(items), [items])
  useEffect(() => cartService.saveWishlist(wishlist), [wishlist])

  const lines = useMemo<CartLine[]>(() => {
    const products = productService.getManyByIdSync(items.map((i) => i.productId))
    return items
      .map((i) => ({ product: products.find((p) => p.id === i.productId)!, qty: i.qty }))
      .filter((l) => l.product)
  }, [items])

  const add = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.productId === productId)
      if (ex) return prev.map((i) => (i.productId === productId ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
      return [...prev, { productId, qty }]
    })
  }, [])
  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.productId !== productId) : prev.map((i) => (i.productId === productId ? { ...i, qty: Math.min(99, qty) } : i))))
  }, [])
  const remove = useCallback((productId: string) => setItems((p) => p.filter((i) => i.productId !== productId)), [])
  const clear = useCallback(() => setItems([]), [])
  const toggleWish = useCallback(
    (id: string) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    [],
  )

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const shipping = calcShipping(subtotal)
  const value: CartCtx = {
    items,
    lines,
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal,
    shipping,
    total: subtotal + shipping,
    add,
    setQty,
    remove,
    clear,
    wishlist,
    toggleWish,
    isWished: (id) => wishlist.includes(id),
    drawerOpen,
    setDrawerOpen,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used inside CartProvider')
  return c
}
