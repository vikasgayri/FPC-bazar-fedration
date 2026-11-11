import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, PackageX } from 'lucide-react'
import Img from '@/components/ui/Img'
import { DemoNotice, EmptyState, PageLoader, StatusBadge } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { orderService } from '@/services/orderService'
import { useAuth } from '@/context/AuthContext'
import { fmtDateTime, inr } from '@/utils/format'

export default function OrderSuccess() {
  const { number = '' } = useParams()
  const { t } = useLang()
  const { user } = useAuth()
  useDocumentTitle(t('checkout.successTitle'))
  const { data: o, loading } = useAsync(() => orderService.getByNumber(number), [number])

  return (
    <section className="min-h-screen bg-cream-50 pb-24 pt-36">
      <div className="container max-w-3xl">
        {loading ? (
          <PageLoader />
        ) : !o ? (
          <EmptyState icon={<PackageX className="h-7 w-7" />} title="Order not found" action={<Link to="/bazaar" className="btn-primary">{t('cart.continue')}</Link>} />
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[2rem] bg-white shadow-lift">
            <div className="bg-navy-900 px-8 py-10 text-center text-white">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                <CheckCircle2 className="mx-auto h-16 w-16 text-gold-400" />
              </motion.div>
              <h1 className="mt-5 font-display text-3xl">{t('checkout.successTitle')}</h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/70">{t('checkout.successText')}</p>
            </div>
            <div className="p-6 sm:p-8">
              <DemoNotice />
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-2xl bg-cream-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-mute">{t('checkout.orderNo')}</dt>
                  <dd className="mt-1 font-bold text-navy-900">{o.number}</dd>
                </div>
                <div className="rounded-2xl bg-cream-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-mute">{t('checkout.paymentRef')}</dt>
                  <dd className="mt-1 font-bold text-navy-900">
                    {o.paymentRef} <span className="text-xs font-semibold text-ink-mute">({o.paymentMethod})</span>
                  </dd>
                </div>
                <div className="rounded-2xl bg-cream-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-mute">{t('common.status')}</dt>
                  <dd className="mt-1">
                    <StatusBadge status={o.status} />
                  </dd>
                </div>
              </dl>
              <ul className="mt-6 divide-y divide-navy-900/5">
                {o.lines.map((l) => (
                  <li key={l.productId} className="flex items-center gap-4 py-3">
                    <Img src={l.image} alt="" wrapClassName="h-14 w-14 rounded-xl" />
                    <p className="flex-1 text-sm font-semibold text-navy-900">
                      {l.name} <span className="text-ink-mute">× {l.qty}</span>
                    </p>
                    <p className="text-sm font-bold">{inr(l.price * l.qty)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-navy-900/10 pt-4">
                <p className="text-sm text-ink-soft">{fmtDateTime(o.createdAt)}</p>
                <p className="font-display text-2xl text-navy-900">{inr(o.total)}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/bazaar" className="btn-primary">
                  {t('cart.continue')}
                </Link>
                {user && (
                  <Link to="/account" className="btn-outline">
                    {t('checkout.viewOrders')}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
