/**
 * Demo persistence layer (localStorage). ONLY services may import this.
 * Components and contexts must go through service functions.
 */
const PREFIX = 'fpcbf_demo_v1:'
/**
 * Bump when seed data (products, news, gallery…) changes so existing browsers pick up
 * the new content instead of their stale localStorage copy. Demo data is reset once.
 */
const SEED_VERSION = 3

try {
  const VERSION_KEY = PREFIX + '__seed_version'
  if (localStorage.getItem(VERSION_KEY) !== String(SEED_VERSION)) {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX) && !k.endsWith(':lang') && !k.endsWith(':session') && !k.endsWith(':admin_session'))
      .forEach((k) => localStorage.removeItem(k))
    localStorage.setItem(VERSION_KEY, String(SEED_VERSION))
  }
} catch {
  /* storage unavailable — nothing to migrate */
}

export const demoStore = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  },
  set<T>(key: string, value: T) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      /* storage unavailable (private mode) — demo continues in memory */
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(PREFIX + key)
    } catch {
      /* ignore */
    }
  },
  clearAll() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      /* ignore */
    }
  },
}

/** Seed-once collection helper: returns stored array or seeds with defaults. */
export function collection<T>(key: string, seed: () => T[]) {
  return {
    all(): T[] {
      const existing = demoStore.get<T[] | null>(key, null)
      if (existing) return existing
      const s = seed()
      demoStore.set(key, s)
      return s
    },
    save(items: T[]) {
      demoStore.set(key, items)
    },
  }
}
