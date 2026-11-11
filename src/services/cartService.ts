import type { CartItem } from '@/types'
import { demoStore } from './storage'

/**
 * Cart & wishlist persistence. Phase 1: browser storage.
 * Phase 2: sync to /cart and /wishlist endpoints for logged-in users.
 */
export const cartService = {
  loadCart: (): CartItem[] => demoStore.get<CartItem[]>('cart', []),
  saveCart: (items: CartItem[]) => demoStore.set('cart', items),
  loadWishlist: (): string[] => demoStore.get<string[]>('wishlist', []),
  saveWishlist: (ids: string[]) => demoStore.set('wishlist', ids),
}

export const prefService = {
  getLang: (): 'en' | 'hi' | null => demoStore.get<'en' | 'hi' | null>('lang', null),
  setLang: (l: 'en' | 'hi') => demoStore.set('lang', l),
}
