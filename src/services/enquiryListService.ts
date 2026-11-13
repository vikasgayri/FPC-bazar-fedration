import type { EnquiryListItem } from '@/types'
import { demoStore } from './storage'

/**
 * Buyer's enquiry list (products + quantities they want quotes for) and saved products.
 * Phase 1: browser storage. Phase 2: sync to the buyer's account on the server.
 */
export const enquiryListService = {
  load: (): EnquiryListItem[] => demoStore.get<EnquiryListItem[]>('enquiry_list', []),
  save: (items: EnquiryListItem[]) => demoStore.set('enquiry_list', items),
  loadSaved: (): string[] => demoStore.get<string[]>('wishlist', []),
  saveSaved: (ids: string[]) => demoStore.set('wishlist', ids),
}
