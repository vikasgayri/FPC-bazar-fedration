import { useEffect, useId, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, SlidersHorizontal, X, PackageSearch, Handshake, ShieldCheck, Sprout, Store } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import ProductCard, { ProductSkeleton } from '@/components/shop/ProductCard'
import { DemoNotice, EmptyState } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle, useEscape, useLockBody } from '@/hooks/useUi'
import { productService, stateOf } from '@/services/productService'
import { categories } from '@/mocks/products'
import { stock } from '@/data/images'
import type { ProductCategory, ProductQuery } from '@/types'
import { cn } from '@/utils/format'

export default function Shop() {
  const { t, L } = useLang()
  useDocumentTitle(t('shop.title'))
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [drawer, setDrawer] = useState(false)
  useLockBody(drawer)
  useEscape(drawer, () => setDrawer(false))

  const query: ProductQuery = {
    q: params.get('q') ?? undefined,
    category: (params.get('cat') as ProductCategory) ?? 'all',
    sort: (params.get('sort') as ProductQuery['sort']) ?? 'featured',
    available: params.get('avail') === '1',
    state: params.get('state') ?? undefined,
  }
  const key = params.toString()
  const { data, loading } = useAsync(() => productService.list(query), [key])
  const all = useAsync(() => productService.list(), [])
  const states = useMemo(() => [...new Set((all.data ?? []).map(stateOf))].filter((x) => x !== 'India').sort(), [all.data])

  // debounce search → URL
  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(params)
      if (q.trim()) next.set('q', q.trim())
      else next.delete('q')
      if (next.toString() !== params.toString()) setParams(next, { replace: true })
    }, 300)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const set = (k: string, v: string | null) => {
    const next = new URLSearchParams(params)
    if (v === null || v === '' || v === 'all') next.delete(k)
    else next.set(k, v)
    setParams(next, { replace: true })
  }
  const activeCount = ['cat', 'avail', 'state', 'q'].filter((k) => params.get(k)).length

  const Filters = useMemo(
    () =>
      function FiltersPanel() {
        const stateId = useId()
        return (
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('shop.categories')}</p>
              <ul className="mt-4 space-y-1">
                {[{ key: 'all', label: { en: t('common.all'), hi: t('common.all') } }, ...categories].map((c) => {
                  const on = (query.category ?? 'all') === c.key
                  return (
                    <li key={c.key}>
                      <button
                        onClick={() => {
                          set('cat', c.key)
                          setDrawer(false)
                        }}
                        className={cn('flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition', on ? 'bg-navy-900 text-white' : 'text-navy-900 hover:bg-cream-100')}
                      >
                        {L(c.label)}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <label htmlFor={stateId} className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                {t('shop.state')}
              </label>
              <select id={stateId} value={params.get('state') ?? ''} onChange={(e) => set('state', e.target.value || null)} className="field mt-4 !rounded-xl !py-2.5 text-sm font-semibold">
                <option value="">{t('shop.allStates')}</option>
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-navy-900">
              <input type="checkbox" checked={!!query.available} onChange={(e) => set('avail', e.target.checked ? '1' : null)} className="h-4 w-4 accent-navy-900" />
              {t('shop.availableOnly')}
            </label>
            {activeCount > 0 && (
              <button
                onClick={() => {
                  setQ('')
                  setParams(new URLSearchParams(), { replace: true })
                }}
                className="text-sm font-bold text-saffron-600 hover:underline"
              >
                {t('shop.clear')}
              </button>
            )}
          </div>
        )
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, t, L, states],
  )

  return (
    <>
      <PageHero title={t('shop.title')} text={t('shop.subtitle')} image={stock.vegMarket} fallback="/images/real/produce-exhibit.jpg" crumbs={[{ label: t('nav.bazaar') }]} eyebrow="मार्केट लिंकेज • FPO से सीधे खरीदार तक" size="sm">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex max-w-xl items-center gap-3 rounded-full bg-white p-1.5 pl-5 shadow-lift"
          role="search"
        >
          <Search className="h-5 w-5 shrink-0 text-ink-mute" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('shop.searchPlaceholder')} className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-navy-900 outline-none" aria-label={t('common.search')} />
          {q && (
            <button type="button" onClick={() => setQ('')} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream-100" aria-label="Clear">
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </PageHero>

      <div className="border-b border-navy-900/5 bg-white">
        <div className="container grid grid-cols-1 gap-4 py-5 text-sm sm:grid-cols-3">
          {[
            { I: Sprout, t: t('shop.direct') },
            { I: ShieldCheck, t: t('shop.verifiedNote') },
            { I: Handshake, t: t('shop.linkageNote') },
          ].map(({ I, t: x }, i) => (
            <p key={i} className="flex items-center gap-3 font-semibold text-navy-900">
              <I className="h-5 w-5 shrink-0 text-leaf-600" /> {x}
            </p>
          ))}
        </div>
      </div>

      <section className="bg-cream-50 py-12 sm:py-16">
        <div className="container">
          <div className="rounded-[1.5rem] bg-navy-900 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{t('shop.howTitle')}</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">{t('shop.howBanner')}</p>
            <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[t('shop.how1'), t('shop.how2'), t('shop.how3'), t('shop.how4')].map((x, i) => (
                <li key={x} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-sm font-semibold">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-extrabold text-navy-950">{i + 1}</span>
                  {x}
                </li>
              ))}
            </ol>
          </div>
          <DemoNotice className="mt-4">{t('shop.demoBanner')}</DemoNotice>
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[250px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-card">
                <Filters />
              </div>
            </aside>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink-soft">{loading ? t('common.loading') : t('shop.results', { count: data?.length ?? 0 })}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setDrawer(true)} className="btn-outline !px-4 !py-2.5 lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" /> {t('shop.filters')} {activeCount > 0 && <span className="rounded-full bg-gold-500 px-1.5 text-[10px] text-navy-950">{activeCount}</span>}
                  </button>
                  <label className="sr-only" htmlFor="sort">
                    {t('shop.sort')}
                  </label>
                  <select id="sort" value={query.sort} onChange={(e) => set('sort', e.target.value === 'featured' ? null : e.target.value)} className="field !w-auto !rounded-full !py-2.5 text-sm font-semibold">
                    <option value="featured">{t('shop.sortFeatured')}</option>
                    <option value="price-asc">{t('shop.sortPriceAsc')}</option>
                    <option value="price-desc">{t('shop.sortPriceDesc')}</option>
                    <option value="newest">{t('shop.sortNewest')}</option>
                  </select>
                </div>
              </div>

              <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 lg:hidden">
                {[{ key: 'all', label: { en: t('common.all') } }, ...categories].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => set('cat', c.key)}
                    className={cn('shrink-0 rounded-full border px-4 py-2 text-xs font-bold', (query.category ?? 'all') === c.key ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900')}
                  >
                    {L(c.label)}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {loading ? (
                  [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
                ) : data && data.length > 0 ? (
                  data.map((p) => <ProductCard key={p.id} p={p} />)
                ) : (
                  <div className="col-span-full">
                    <EmptyState icon={<PackageSearch className="h-7 w-7" />} title={t('shop.noResults')} action={<button onClick={() => { setQ(''); setParams(new URLSearchParams()) }} className="btn-primary">{t('shop.clear')}</button>} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-leaf-50 p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-leaf-600 text-white">
              <Store className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-2xl text-navy-900">{t('shop.listTitle')}</p>
              <p className="mt-1 max-w-xl text-sm text-ink-soft">{t('shop.listText')}</p>
            </div>
          </div>
          <Link to="/register?type=FPO" className="btn-primary shrink-0">
            {t('shop.listCta')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-[85] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy-950/60" onClick={() => setDrawer(false)} />
            <motion.div role="dialog" aria-modal="true" aria-label={t('shop.filters')} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.35 }} className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-xl text-navy-900">{t('shop.filters')}</p>
                <button onClick={() => setDrawer(false)} className="grid h-9 w-9 place-items-center rounded-full bg-cream-100" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Filters />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
