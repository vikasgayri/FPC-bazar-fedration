import type { Product, ProductQuery } from '@/types'
import { ApiError, USE_MOCK, http, mockDelay } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { collection } from './storage'
import { seedProducts } from '@/mocks/products'
import { slugify, uid } from '@/utils/format'

const store = collection<Product>('products', seedProducts)

export type ProductInput = Omit<Product, 'id' | 'slug' | 'createdAt' | 'isDemo'>

export const productService = {
  async list(query: ProductQuery = {}, opts: { includeInactive?: boolean } = {}): Promise<Product[]> {
    if (!USE_MOCK) return http.get(endpoints.products.list)
    await mockDelay(250)
    let items = store.all()
    if (!opts.includeInactive) items = items.filter((p) => p.active)
    const q = query.q?.trim().toLowerCase()
    if (q)
      items = items.filter((p) =>
        [p.name.en, p.name.hi ?? '', p.producer, p.origin, p.category, ...p.tags].join(' ').toLowerCase().includes(q),
      )
    if (query.category && query.category !== 'all') items = items.filter((p) => p.category === query.category)
    if (query.inStock) items = items.filter((p) => p.stock > 0)
    if (query.minPrice != null) items = items.filter((p) => p.price >= query.minPrice!)
    if (query.maxPrice != null) items = items.filter((p) => p.price <= query.maxPrice!)
    switch (query.sort) {
      case 'price-asc':
        items = [...items].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        items = [...items].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        items = [...items].sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        items = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        break
      default:
        items = [...items].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    }
    return items
  },

  async featured(limit = 8): Promise<Product[]> {
    const all = await this.list()
    return all.filter((p) => p.featured).slice(0, limit)
  },

  async getBySlug(slug: string): Promise<Product> {
    if (!USE_MOCK) return http.get(endpoints.products.bySlug(slug))
    await mockDelay(200)
    const p = store.all().find((x) => x.slug === slug)
    if (!p) throw new ApiError('Product not found', 404)
    return p
  },

  /** Synchronous lookup used by the cart to hydrate lines from ids. */
  getManyByIdSync(ids: string[]): Product[] {
    const all = store.all()
    return ids.map((id) => all.find((p) => p.id === id)).filter(Boolean) as Product[]
  },

  async create(input: ProductInput): Promise<Product> {
    if (!USE_MOCK) return http.post(endpoints.products.create, input)
    await mockDelay()
    const p: Product = { ...input, id: uid('p'), slug: slugify(input.name.en) + '-' + uid().slice(0, 4), isDemo: true, createdAt: new Date().toISOString() }
    store.save([p, ...store.all()])
    return p
  },

  async update(id: string, patch: Partial<ProductInput>): Promise<Product> {
    if (!USE_MOCK) return http.put(endpoints.products.update(id), patch)
    await mockDelay()
    const all = store.all()
    const i = all.findIndex((p) => p.id === id)
    if (i < 0) throw new ApiError('Product not found', 404)
    all[i] = { ...all[i], ...patch }
    store.save(all)
    return all[i]
  },

  async remove(id: string): Promise<void> {
    if (!USE_MOCK) return http.delete(endpoints.products.remove(id))
    await mockDelay()
    store.save(store.all().filter((p) => p.id !== id))
  },

  /** Internal: decrement stock after a demo order. */
  _decrementStock(lines: { productId: string; qty: number }[]) {
    const all = store.all()
    lines.forEach((l) => {
      const p = all.find((x) => x.id === l.productId)
      if (p) p.stock = Math.max(0, p.stock - l.qty)
    })
    store.save(all)
  },
}
