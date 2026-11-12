import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { DemoNotice, EmptyState } from '@/components/ui/Primitives'
import { QtyStepper } from '@/components/shop/CartDrawer'
import OrderSummary from '@/components/shop/OrderSummary'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { stock } from '@/data/images'
import { inr } from '@/utils/format'

export default function Cart() {
  const { lines, setQty, remove } = useCart()
  const { t, L } = useLang()
  useDocumentTitle(t('cart.title'))
  return (
    <>
      <PageHero title={t('cart.title')} image={stock.vegBaskets} fallback="/images/real/produce-exhibit.jpg" crumbs={[{ label: t('nav.bazaar'), to: '/bazaar' }, { label: t('nav.cart') }]} size="sm" />
      <section className="bg-cream-50 py-12 sm:py-16">
        <div className="container">
          {lines.length === 0 ? (
            <EmptyState icon={<ShoppingBag className="h-7 w-7" />} title={t('cart.empty')} action={<Link to="/bazaar" className="btn-primary">{t('cart.continue')}</Link>} />
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
              <div className="min-w-0 space-y-4">
                <DemoNotice />
                <ul className="divide-y divide-navy-900/5 rounded-[1.5rem] bg-white px-5 shadow-card sm:px-6">
                  {lines.map(({ product: p, qty }) => (
                    <li key={p.id} className="flex gap-4 py-5 sm:gap-6">
                      <Img src={p.image} alt={L(p.name)} sizes="112px" wrapClassName="h-24 w-24 shrink-0 rounded-2xl sm:h-28 sm:w-28" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link to={`/bazaar/${p.slug}`} className="font-display text-lg leading-snug text-navy-900 hover:text-leaf-700">
                              {L(p.name)}
                            </Link>
                            <p className="mt-0.5 text-xs text-ink-mute">
                              {p.unit} • {p.producer}
                            </p>
                          </div>
                          <button onClick={() => remove(p.id)} className="text-ink-mute hover:text-red-600" aria-label={t('cart.remove')}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <QtyStepper small value={qty} max={p.stock} onChange={(v) => setQty(p.id, v)} />
                          <p className="font-bold text-navy-900">{inr(p.price * qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="/bazaar" className="inline-block text-sm font-bold text-leaf-700">
                  ← {t('cart.continue')}
                </Link>
              </div>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <OrderSummary
                  cta={
                    <Link to="/bazaar/checkout" className="btn-primary w-full !py-4">
                      {t('cart.checkout')} <ArrowRight className="h-4 w-4" />
                    </Link>
                  }
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
