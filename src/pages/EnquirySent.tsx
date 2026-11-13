import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, SearchX } from 'lucide-react'
import Img from '@/components/ui/Img'
import { DemoNotice, EmptyState, PageLoader, StatusBadge } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { tradeEnquiryService } from '@/services/tradeEnquiryService'
import { useAuth } from '@/context/AuthContext'
import { fmtDateTime, inr } from '@/utils/format'

export default function EnquirySent() {
  const { number = '' } = useParams()
  const { t } = useLang()
  const { user } = useAuth()
  useDocumentTitle(t('send.successTitle'))
  const { data: e, loading } = useAsync(() => tradeEnquiryService.getByNumber(number), [number])
  const producers = e ? [...new Set(e.lines.map((l) => l.producer))] : []

  return (
    <section className="min-h-screen bg-cream-50 pb-24 pt-36">
      <div className="container max-w-3xl">
        {loading ? (
          <PageLoader />
        ) : !e ? (
          <EmptyState icon={<SearchX className="h-7 w-7" />} title="Enquiry not found" action={<Link to="/bazaar" className="btn-primary">{t('elist.continue')}</Link>} />
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[2rem] bg-white shadow-lift">
            <div className="bg-navy-900 px-8 py-10 text-center text-white">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                <CheckCircle2 className="mx-auto h-16 w-16 text-gold-400" />
              </motion.div>
              <h1 className="mt-5 font-display text-3xl">{t('send.successTitle')}</h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/70">{t('send.successText')}</p>
            </div>
            <div className="p-6 sm:p-8">
              <DemoNotice>{t('send.demoText')}</DemoNotice>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-2xl bg-cream-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-mute">{t('send.enquiryNo')}</dt>
                  <dd className="mt-1 font-bold text-navy-900">{e.number}</dd>
                </div>
                <div className="rounded-2xl bg-cream-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-mute">FPO</dt>
                  <dd className="mt-1 font-bold text-navy-900">{producers.length}</dd>
                </div>
                <div className="rounded-2xl bg-cream-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-mute">{t('common.status')}</dt>
                  <dd className="mt-1">
                    <StatusBadge status={e.status} />
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('send.next')}</p>
                <ol className="mt-4 space-y-3">
                  {[t('send.step1'), t('send.step2'), t('send.step3'), t('send.step4')].map((s, i) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-navy-900">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-100 text-xs font-extrabold text-gold-700">{i + 1}</span>
                      <span className="pt-1">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="mt-8 divide-y divide-navy-900/5 border-t border-navy-900/10">
                {e.lines.map((l) => (
                  <li key={l.productId} className="flex items-center gap-4 py-3">
                    <Img src={l.image} alt="" sizes="80px" wrapClassName="h-14 w-14 shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-navy-900">{l.name}</p>
                      <p className="truncate text-xs text-leaf-700">{l.producer}</p>
                    </div>
                    <p className="shrink-0 text-sm font-bold">
                      {l.qty.toLocaleString('en-IN')} <span className="text-xs font-semibold text-ink-mute">{l.unit}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-navy-900/10 pt-4">
                <p className="text-sm text-ink-soft">{fmtDateTime(e.createdAt)}</p>
                <p className="text-sm text-ink-soft">
                  {t('elist.value')}: <span className="font-display text-xl text-navy-900">≈ {inr(e.indicativeValue)}</span>
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/bazaar" className="btn-primary">
                  {t('elist.continue')}
                </Link>
                {user && (
                  <Link to="/account" className="btn-outline">
                    {t('send.viewMine')}
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
