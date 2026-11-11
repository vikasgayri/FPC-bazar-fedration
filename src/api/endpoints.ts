/**
 * REST endpoint map for the future Spring Boot backend (Phase 2).
 * Nothing calls these in Phase 1 — services use mock implementations.
 * Keep paths in sync with the backend team's controller mappings.
 */
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    adminLogin: '/auth/admin/login',
    me: '/auth/me',
    logout: '/auth/logout',
  },
  products: {
    list: '/products',
    bySlug: (slug: string) => `/products/slug/${slug}`,
    byId: (id: string) => `/products/${id}`,
    create: '/admin/products',
    update: (id: string) => `/admin/products/${id}`,
    remove: (id: string) => `/admin/products/${id}`,
  },
  orders: {
    create: '/orders',
    mine: '/orders/me',
    byNumber: (no: string) => `/orders/number/${no}`,
    adminList: '/admin/orders',
    updateStatus: (id: string) => `/admin/orders/${id}/status`,
  },
  registrations: {
    create: '/registrations',
    track: (ref: string) => `/registrations/track/${ref}`,
    adminList: '/admin/registrations',
    updateStatus: (id: string) => `/admin/registrations/${id}/status`,
  },
  enquiries: {
    create: '/enquiries',
    adminList: '/admin/enquiries',
    updateStatus: (id: string) => `/admin/enquiries/${id}/status`,
  },
  content: {
    news: '/news',
    newsBySlug: (slug: string) => `/news/${slug}`,
    adminNews: '/admin/news',
    adminNewsItem: (id: string) => `/admin/news/${id}`,
    gallery: '/gallery',
    adminGallery: '/admin/gallery',
    adminGalleryItem: (id: string) => `/admin/gallery/${id}`,
  },
  admin: {
    dashboard: '/admin/dashboard',
  },
} as const
