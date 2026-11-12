import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Heart, MapPin, ShieldCheck, Sprout, Truck, Users, PackageX } from 'lucide-react'
import Img from '@/components/ui/Img'
import { Breadcrumb, DemoNotice, DemoPill, EmptyState, PageLoader, Stars } from '@/components/ui/Primitives'
import ProductCard from '@/components/shop/ProductCard'
import { QtyStepper } from '@/components/shop/CartDrawer'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { productService } from '@/services/productService'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { categories } from '@/mocks/products'
import { cn, discountPct, inr } from '@/utils/format'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const { t, L } = useLang()
  const nav = useNavigate()
  const { add, toggleWish, isWished, setDrawerOpen } = useCart()
  const toast = useToast()
  const { data: p, loading, error } = useAsync(() => productService.getBySlug(slug), [slug])
  const related = useAsync(async () => (p ? (await productService.list({ category: p.category })).filter((x) => x.id !== p.id).slice(0, 4) : []), [p?.id])
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  useDocumentTitle(p ? L(p.name) : t('shop.title'))

  if (loading) return <div className="pt-40"><PageLoader /></div>
  if (error || !p)
    return (
      <div className="container pb-24 pt-44">
        <EmptyState icon={<PackageX className="h-7 w-7" />} title="Product not found" action={<Link to="/bazaar" className="btn-primary">{t('cart.continue')}</Link>} />
      </div>
    )

  const off = discountPct(p.price, p.mrp)
  const gallery = p.gallery?.length ? p.gallery : [p.image]
  const cat = categories.find((c) => c.key === p.category)
  const out = p.stock <= 0

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
            <div className="mt-3 flex items-center gap-3 text-sm text-ink-mute">
              <Stars value={p.rating} /> {p.rating} • {t('shop.reviews', { count: p.reviews })}
            </div>
            <div className="mt-6 flex items-end gap-3">
              <p className="font-display text-4xl text-navy-900">{inr(p.price)}</p>
              {off > 0 && (
                <>
                  <p className="pb-1 text-lg text-ink-mute line-through">{inr(p.mrp)}</p>
                  <span className="mb-1.5 rounded-full bg-leaf-600 px-2.5 py-1 text-xs font-bold text-white">{t('shop.off', { pct: off })}</span>
                </>
              )}
            </div>
            <p className="mt-1 text-sm text-ink-mute">
              {t('shop.unit')}: {p.unit}
            </p>
            <p className="lead mt-6">{L(p.description)}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white p-4 shadow-card">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-mute">
                  <Users className="h-4 w-4 text-gold-600" /> {t('shop.producer')}
                </dt>
                <dd className="mt-1 font-semibold text-navy-900">{p.producer}</dd>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-card">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-mute">
                  <MapPin className="h-4 w-4 text-gold-600" /> {t('shop.origin')}
                </dt>
                <dd className="mt-1 font-semibold text-navy-900">{p.origin}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QtyStepper value={qty} max={Math.max(1, p.stock)} onChange={(v) => setQty(Math.max(1, v))} />
              <button
                disabled={out}
                onClick={() => {
                  add(p.id, qty)
                  setDrawerOpen(true)
                }}
                className="btn-primary flex-1 !py-3.5 sm:flex-none"
              >
                {out ? t('shop.outOfStock') : t('shop.addToCart')}
              </button>
              <button
                disabled={out}
                onClick={() => {
                  add(p.id, qty)
                  nav('/bazaar/checkout')
                }}
                className="btn-gold flex-1 !py-3.5 sm:flex-none"
              >
                {t('shop.buyNow')}
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
            {!out && p.stock < 15 && <p className="mt-3 text-sm font-semibold text-saffron-600">{t('shop.onlyLeft', { count: p.stock })}</p>}

            <ul className="mt-8 space-y-3 border-t border-navy-900/10 pt-6 text-sm text-ink-soft">
              <li className="flex items-center gap-3">
                <Sprout className="h-4 w-4 text-leaf-600" /> {t('shop.support')}
              </li>
              <li className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-leaf-600" /> {t('shop.deliveryNote')}
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-leaf-600" /> {t('checkout.simulatedText')}
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
