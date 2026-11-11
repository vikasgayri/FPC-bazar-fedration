import type { GalleryItem, NewsItem } from '@/types'
import { ApiError, USE_MOCK, http, mockDelay } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { collection } from './storage'
import { seedGallery, seedNews } from '@/mocks/content'
import { slugify, uid } from '@/utils/format'

const news = collection<NewsItem>('news', seedNews)
const gallery = collection<GalleryItem>('gallery', seedGallery)

export type NewsInput = Omit<NewsItem, 'id' | 'slug'>
export type GalleryInput = Omit<GalleryItem, 'id' | 'createdAt'>

export const newsService = {
  async list(opts: { includeDrafts?: boolean } = {}): Promise<NewsItem[]> {
    if (!USE_MOCK) return http.get(opts.includeDrafts ? endpoints.content.adminNews : endpoints.content.news)
    await mockDelay(200)
    return news
      .all()
      .filter((n) => opts.includeDrafts || n.published)
      .sort((a, b) => b.date.localeCompare(a.date))
  },
  async getBySlug(slug: string): Promise<NewsItem> {
    if (!USE_MOCK) return http.get(endpoints.content.newsBySlug(slug))
    await mockDelay(200)
    const n = news.all().find((x) => x.slug === slug)
    if (!n) throw new ApiError('Article not found', 404)
    return n
  },
  async create(input: NewsInput): Promise<NewsItem> {
    if (!USE_MOCK) return http.post(endpoints.content.adminNews, input)
    await mockDelay()
    const n: NewsItem = { ...input, id: uid('n'), slug: slugify(input.title.en) + '-' + uid().slice(0, 4) }
    news.save([n, ...news.all()])
    return n
  },
  async update(id: string, patch: Partial<NewsInput>): Promise<NewsItem> {
    if (!USE_MOCK) return http.put(endpoints.content.adminNewsItem(id), patch)
    await mockDelay()
    const all = news.all()
    const i = all.findIndex((x) => x.id === id)
    if (i < 0) throw new ApiError('Not found', 404)
    all[i] = { ...all[i], ...patch }
    news.save(all)
    return all[i]
  },
  async remove(id: string): Promise<void> {
    if (!USE_MOCK) return http.delete(endpoints.content.adminNewsItem(id))
    await mockDelay()
    news.save(news.all().filter((x) => x.id !== id))
  },
}

export const galleryService = {
  async list(): Promise<GalleryItem[]> {
    if (!USE_MOCK) return http.get(endpoints.content.gallery)
    await mockDelay(200)
    return gallery.all()
  },
  async create(input: GalleryInput): Promise<GalleryItem> {
    if (!USE_MOCK) return http.post(endpoints.content.adminGallery, input)
    await mockDelay()
    const g: GalleryItem = { ...input, id: uid('g'), createdAt: new Date().toISOString() }
    gallery.save([g, ...gallery.all()])
    return g
  },
  async remove(id: string): Promise<void> {
    if (!USE_MOCK) return http.delete(endpoints.content.adminGalleryItem(id))
    await mockDelay()
    gallery.save(gallery.all().filter((x) => x.id !== id))
  },
}
