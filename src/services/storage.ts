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
/** Keys that survive a demo-data reset: language, signed-in user/admin, seed marker. */
const KEEP = [':lang', ':session', ':admin_session', ':__seed_version']

try {
  const VERSION_KEY = PREFIX + '__seed_version'
  if (localStorage.getItem(VERSION_KEY) !== String(SEED_VERSION)) {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX) && !KEEP.some((x) => k.endsWith(x)))
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
  /** Removes demo data (products, enquiries, registrations…) but keeps language and sign-in. */
  clearAll() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX) && !KEEP.some((x) => k.endsWith(x)))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      /* ignore */
    }
  },
}

/**
 * Seed-once collection helper: returns stored array or seeds with defaults.
 * `valid` guards against data saved by an older version of the app (e.g. a tab that was
 * still open during an update): if any stored record has the wrong shape, the demo data
 * for this collection is re-seeded instead of crashing the page.
 */
export function collection<T>(key: string, seed: () => T[], valid?: (item: T) => boolean) {
  return {
    all(): T[] {
      const existing = demoStore.get<T[] | null>(key, null)
      if (Array.isArray(existing) && (!valid || existing.every(valid))) return existing
      const s = seed()
      demoStore.set(key, s)
      return s
    },
    save(items: T[]) {
      demoStore.set(key, items)
    },
  }
}
