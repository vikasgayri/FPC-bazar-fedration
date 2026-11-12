import { Link, Navigate } from 'react-router-dom'
import { LogOut, Package, Heart, Mail, Phone } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { DemoNotice, EmptyState, PageLoader, StatusBadge } from '@/components/ui/Primitives'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { orderService } from '@/services/orderService'
import { stock } from '@/data/images'
import { fmtDate, inr } from '@/utils/format'

const FLOW = ['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED']

export default function Account() {
  const { user, logout } = useAuth()
  const { wishlist } = useCart()
  const { t, lang } = useLang()
  useDocumentTitle(t('account.title'))
  const { data: orders, loading } = useAsync(() => (user ? orderService.mine(user.id, user.email) : Promise.resolve([])), [user?.id])
  if (!user) return <Navigate to="/login?next=/account" replace />

  return (
    <>
      <PageHero title={t('account.hello', { name: user.name })} image={stock.indianFarm} fallback="/images/real/field-visit.jpg" crumbs={[{ label: t('account.title') }]} size="sm" />
      <section className="bg-cream-50 py-12 sm:py-16">
        <div className="container grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-card">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-navy-900 font-display text-xl text-gold-400">{user.name[0]}</span>
              <p className="mt-4 font-display text-xl text-navy-900">{user.name}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                <Mail className="h-4 w-4" /> {user.email}
              </p>
              {user.phone && (
                <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
                  <Phone className="h-4 w-4" /> {user.phone}
                </p>
              )}
              <div className="mt-5 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-cream-50 p-3">
                  <Package className="mx-auto h-5 w-5 text-gold-600" />
                  <p className="mt-1 text-lg font-bold">{orders?.length ?? 0}</p>
                  <p className="text-[11px] text-ink-mute">{t('account.orders')}</p>
                </div>
                <Link to="/wishlist" className="rounded-xl bg-cream-50 p-3 hover:bg-gold-50">
                  <Heart className="mx-auto h-5 w-5 text-saffron-500" />
                  <p className="mt-1 text-lg font-bold">{wishlist.length}</p>
                  <p className="text-[11px] text-ink-mute">{t('nav.wishlist')}</p>
                </Link>
              </div>
              <button onClick={logout} className="btn-outline mt-5 w-full">
                <LogOut className="h-4 w-4" /> {t('nav.logout')}
              </button>
            </div>
            <DemoNotice />
          </aside>
          <div>
            <h2 className="font-display text-2xl text-navy-900">{t('account.orders')}</h2>
            <div className="mt-5 space-y-4">
              {loading ? (
                <PageLoader />
              ) : !orders?.length ? (
                <EmptyState icon={<Package className="h-7 w-7" />} title={t('account.noOrders')} action={<Link to="/bazaar" className="btn-primary">{t('home.bazaarCta')}</Link>} />
              ) : (
                orders.map((o) => {
                  const step = FLOW.indexOf(o.status)
                  return (
                    <article key={o.id} className="rounded-[1.5rem] bg-white p-6 shadow-card">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-bold text-navy-900">{o.number}</p>
                          <p className="text-xs text-ink-mute">
                            {t('account.placedOn')} {fmtDate(o.createdAt, lang)} • {o.lines.length} {t('account.items')}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={o.status} />
                          <p className="font-display text-xl text-navy-900">{inr(o.total)}</p>
                        </div>
                      </div>
                      {o.status !== 'CANCELLED' && (
                        <div className="mt-5 grid grid-cols-5 gap-1">
                          {FLOW.map((s, i) => (
                            <div key={s}>
                              <div className={`h-1.5 rounded-full ${i <= step ? 'bg-leaf-600' : 'bg-navy-900/10'}`} />
                              <p className={`mt-1.5 hidden text-[10px] font-bold uppercase tracking-wider sm:block ${i <= step ? 'text-leaf-700' : 'text-ink-mute'}`}>{s}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-5 flex -space-x-3">
                        {o.lines.map((l) => (
                          <Img key={l.productId} src={l.image} alt={l.name} sizes="48px" wrapClassName="h-12 w-12 rounded-full border-2 border-white" />
                        ))}
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
