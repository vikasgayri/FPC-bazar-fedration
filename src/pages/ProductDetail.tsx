import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CalendarClock, Heart, Handshake, MapPin, PackageCheck, ShieldCheck, Sprout, Users, PackageX } from 'lucide-react'
import Img from '@/components/ui/Img'
import { Breadcrumb, DemoNotice, DemoPill, EmptyState, PageLoader } from '@/components/ui/Primitives'
import ProductCard from '@/components/shop/ProductCard'
import { QtyInput } from '@/components/shop/EnquiryDrawer'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { productService } from '@/services/productService'
import { useEnquiryList } from '@/context/EnquiryListContext'
import { useToast } from '@/context/ToastContext'
import { categories } from '@/mocks/products'
import { cn, inr, qtyStep } from '@/utils/format'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const { t, L } = useLang()
  const nav = useNavigate()
  const { add, toggleWish, isWished, setDrawerOpen } = useEnquiryList()
  const toast = useToast()
  const { data: p, loading, error } = useAsync(() => productService.getBySlug(slug), [slug])
  const related = useAsync(async () => (p ? (await productService.list({ category: p.category })).filter((x) => x.id !== p.id).slice(0, 4) : []), [p?.id])
  const [qtyState, setQty] = useState<{ id: string; qty: number } | null>(null)
  const [img, setImg] = useState(0)
  useDocumentTitle(p ? L(p.name) : t('shop.title'))

  if (loading) return <div className="pt-40"><PageLoader /></div>
  if (error || !p)
    return (
      <div className="container pb-24 pt-44">
        <EmptyState icon={<PackageX className="h-7 w-7" />} title="Product not found" action={<Link to="/bazaar" className="btn-primary">{t('elist.continue')}</Link>} />
      </div>
    )

  const qty = qtyState?.id === p.id ? qtyState.qty : p.moq
  const gallery = p.gallery?.length ? p.gallery : [p.image]
  const cat = categories.find((c) => c.key === p.category)
  const seasonal = p.capacity <= 0
  const n = (v: number) => v.toLocaleString('en-IN')

  return (
    <>
      <div className="bg-navy-950 pb-8 pt-36">
        <div className="container">
          <Breadcrumb items={[{ label: t('nav.home'), to: '/' }, { label: t('nav.bazaar'), to: '/bazaar' }, { label: cat ? L(cat.label) : '', to: `/bazaar?cat=${p.category}` }, { label: L(p.name) }]} />
        </div>
      </div>
      <section className="bg-cream-50 py-12 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-card">
              <Img src={gallery[img] ?? gallery[0]} alt={L(p.name)} priority sizes="(min-width: 1024px) 50vw, 100vw" wrapClassName="aspect-square" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {gallery.map((g, i) => (
                  <button key={g} onClick={() => setImg(i)} className={cn('overflow-hidden rounded-xl border-2', i === img ? 'border-navy-900' : 'border-transparent')}>
                    <Img src={g} alt="" sizes="80px" wrapClassName="h-20 w-20" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gold-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-600">{cat && L(cat.label)}</span>
              <DemoPill label={t('shop.demoListing')} />
            </div>
            <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-navy-900 sm:text-[2.8rem]">{L(p.name)}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-leaf-700">
              <Users className="h-4 w-4" /> {p.producer}
            </p>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">{t('shop.indicative')}</p>
              <p className="mt-1 font-display text-4xl text-navy-900">
                {inr(p.price)} <span className="font-sans text-base font-semibold text-ink-mute">{t('shop.perUnit', { unit: p.unit })}</span>
              </p>
            </div>
            <p className="lead mt-6">{L(p.description)}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                { I: Users, k: t('shop.producer'), v: p.producer },
                { I: MapPin, k: t('shop.origin'), v: p.origin },
                { I: PackageCheck, k: t('shop.moq'), v: `${n(p.moq)} ${p.unit}` },
                { I: CalendarClock, k: t('shop.capacity'), v: seasonal ? t('shop.seasonal') : t('shop.perMonth', { qty: `${n(p.capacity)} ${p.unit}` }) },
              ].map(({ I, k, v }) => (
                <div key={k} className="rounded-2xl bg-white p-4 shadow-card">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-mute">
                    <I className="h-4 w-4 text-gold-600" /> {k}
                  </dt>
                  <dd className="mt-1 font-semibold text-navy-900">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-mute">{t('shop.qty')}</p>
              <div className="flex flex-wrap items-center gap-3">
                <QtyInput value={qty} step={qtyStep(p.moq)} unit={p.unit.length <= 8 ? p.unit : undefined} onChange={(v) => setQty({ id: p.id, qty: Math.max(1, v) })} />
                <button
                  onClick={() => {
                    add(p.id, qty)
                    setDrawerOpen(true)
                  }}
                  className="btn-primary flex-1 !py-3.5 sm:flex-none"
                >
                  {t('shop.addToEnquiry')}
                </button>
                <button
                  onClick={() => {
                    add(p.id, qty)
                    nav('/bazaar/enquiry/send')
                  }}
                  className="btn-gold flex-1 !py-3.5 sm:flex-none"
                >
                  {t('shop.enquireNow')}
                </button>
                <button
                  onClick={() => {
                    toggleWish(p.id)
                    toast('info', isWished(p.id) ? t('shop.wishlistRemove') : t('shop.wishlistAdd'))
                  }}
                  className={cn('grid h-12 w-12 place-items-center rounded-full border', isWished(p.id) ? 'border-saffron-500 text-saffron-500' : 'border-navy-900/15 text-navy-900')}
                  aria-label={t('shop.wishlistAdd')}
                >
                  <Heart className={cn('h-5 w-5', isWished(p.id) && 'fill-current')} />
                </button>
              </div>
              {qty < p.moq && <p className="mt-3 text-sm font-semibold text-saffron-600">{t('elist.belowMin', { qty: `${n(p.moq)} ${p.unit}` })}</p>}
            </div>

            <ul className="mt-8 space-y-3 border-t border-navy-900/10 pt-6 text-sm text-ink-soft">
              <li className="flex items-center gap-3">
                <Sprout className="h-4 w-4 shrink-0 text-leaf-600" /> {t('shop.direct')}
              </li>
              <li className="flex items-center gap-3">
                <Handshake className="h-4 w-4 shrink-0 text-leaf-600" /> {t('shop.linkageNote')}
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-leaf-600" /> {t('shop.verifiedNote')}
              </li>
            </ul>
            <DemoNotice className="mt-6">{t('shop.demoBanner')}</DemoNotice>
          </div>
        </div>
      </section>

      {related.data && related.data.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container">
            <h2 className="font-display text-[2rem] text-navy-900">{t('shop.youMayLike')}</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.data.map((r) => (
                <ProductCard key={r.id} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
