import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, FileSearch } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import { DemoNotice, Spinner, StatusBadge } from '@/components/ui/Primitives'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { registrationService } from '@/services/registrationService'
import type { Registration } from '@/types'
import { real } from '@/data/images'
import { fmtDate } from '@/utils/format'

const STEPS = ['PENDING', 'UNDER_REVIEW', 'APPROVED'] as const

export default function TrackApplication() {
  const { t, lang } = useLang()
  useDocumentTitle(t('register.trackTitle'))
  const [params] = useSearchParams()
  const [ref, setRef] = useState(params.get('ref') ?? '')
  const [res, setRes] = useState<Registration | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const go = async (r = ref) => {
    if (!r.trim()) return
    setLoading(true)
    setErr(null)
    setRes(null)
    try {
      setRes(await registrationService.track(r))
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Not found')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (params.get('ref')) go(params.get('ref')!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stepIdx = res ? (res.status === 'REJECTED' ? -1 : STEPS.indexOf(res.status as (typeof STEPS)[number])) : 0

  return (
    <>
      <PageHero title={t('register.trackTitle')} text={t('register.trackText')} image={real.farmerMeeting} crumbs={[{ label: t('nav.join'), to: '/register' }, { label: t('nav.track') }]} size="sm" />
      <section className="bg-cream-50 py-16 sm:py-24">
        <div className="container max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              go()
            }}
            className="flex items-center gap-2 rounded-full bg-white p-2 pl-6 shadow-card"
          >
            <Search className="h-5 w-5 text-ink-mute" />
            <input value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} placeholder="FRM-2541203" className="min-w-0 flex-1 bg-transparent py-2 font-semibold tracking-wider text-navy-900 outline-none" aria-label={t('register.refNo')} />
            <button className="btn-primary" disabled={loading}>
              {loading ? <Spinner className="h-4 w-4" /> : t('register.trackBtn')}
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-ink-mute">Demo references: FRM-2541203 • FPO-2539871 • SHG-2540112 • DRY-2538554</p>

          {err && (
            <div className="mt-8 flex flex-col items-center rounded-3xl bg-white p-10 text-center shadow-card">
              <FileSearch className="h-10 w-10 text-gold-500" />
              <p className="mt-4 text-sm text-ink-soft">{err}</p>
            </div>
          )}
          {res && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 overflow-hidden rounded-[1.75rem] bg-white shadow-lift">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-900 px-6 py-5 text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{res.type}</p>
                  <p className="font-display text-2xl">{res.refNo}</p>
                </div>
                <StatusBadge status={res.status} />
              </div>
              <div className="p-6">
                {res.status !== 'REJECTED' ? (
                  <div className="grid grid-cols-3 gap-2">
                    {STEPS.map((s, i) => (
                      <div key={s}>
                        <div className={`h-2 rounded-full ${i <= stepIdx ? 'bg-leaf-600' : 'bg-navy-900/10'}`} />
                        <p className={`mt-2 text-[11px] font-bold uppercase tracking-wider ${i <= stepIdx ? 'text-leaf-700' : 'text-ink-mute'}`}>{s.replace('_', ' ')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{res.notes ?? 'Application not approved.'}</p>
                )}
                <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-ink-mute">{t('common.name')}</dt>
                    <dd className="font-semibold text-navy-900">{res.name}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-mute">{t('common.district')}</dt>
                    <dd className="font-semibold text-navy-900">
                      {res.district}, {res.state}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-mute">Submitted</dt>
                    <dd className="font-semibold text-navy-900">{fmtDate(res.createdAt, lang)}</dd>
                  </div>
                </dl>
                <DemoNotice className="mt-6" />
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
