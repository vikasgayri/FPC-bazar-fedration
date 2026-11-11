import { useState } from 'react'
import { Mail, Phone, Building } from 'lucide-react'
import { PageTitle } from '@/components/admin/AdminUi'
import { PageLoader, StatusBadge } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { useToast } from '@/context/ToastContext'
import { enquiryService } from '@/services/enquiryService'
import type { Enquiry } from '@/types'
import { cn, fmtDateTime } from '@/utils/format'

const ST: Enquiry['status'][] = ['NEW', 'IN_PROGRESS', 'CLOSED']

export default function Enquiries() {
  const { t } = useLang()
  useDocumentTitle(t('admin.enquiries'))
  const toast = useToast()
  const { data, loading, reload } = useAsync(() => enquiryService.adminList(), [])
  const [f, setF] = useState<Enquiry['status'] | 'ALL'>('ALL')
  const list = (data ?? []).filter((e) => f === 'ALL' || e.status === f)

  return (
    <>
      <PageTitle title={t('admin.enquiries')} text="Business, partnership, CSR and investment enquiries (demo — no emails sent)." />
      <div className="mb-4 flex gap-2">
        {(['ALL', ...ST] as const).map((s) => (
          <button key={s} onClick={() => setF(s)} className={cn('rounded-full border px-4 py-2 text-xs font-bold', f === s ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900')}>
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((e) => (
            <article key={e.id} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                    {t(`enquiry.types.${e.type}`)} • {e.refNo}
                  </p>
                  <p className="mt-1 font-display text-lg text-navy-900">{e.name}</p>
                </div>
                <StatusBadge status={e.status} />
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-soft">
                {e.organisation && (
                  <span className="flex items-center gap-1">
                    <Building className="h-3.5 w-3.5" /> {e.organisation}
                  </span>
                )}
                <a href={`mailto:${e.email}`} className="flex items-center gap-1 hover:text-navy-900">
                  <Mail className="h-3.5 w-3.5" /> {e.email}
                </a>
                <a href={`tel:${e.phone}`} className="flex items-center gap-1 hover:text-navy-900">
                  <Phone className="h-3.5 w-3.5" /> {e.phone}
                </a>
              </div>
              <p className="mt-4 rounded-xl bg-cream-50 p-4 text-sm leading-relaxed text-ink-soft">{e.message}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-ink-mute">{fmtDateTime(e.createdAt)}</p>
                <div className="flex gap-1">
                  {ST.map((s) => (
                    <button
                      key={s}
                      disabled={e.status === s}
                      onClick={async () => {
                        await enquiryService.updateStatus(e.id, s)
                        toast('success', `${e.refNo} → ${s}`)
                        reload()
                      }}
                      className={cn('rounded-full px-3 py-1.5 text-[11px] font-bold', e.status === s ? 'bg-navy-900 text-white' : 'bg-cream-100 text-navy-900 hover:bg-cream-200')}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
          {!list.length && <p className="text-sm text-ink-mute">No enquiries.</p>}
        </div>
      )}
    </>
  )
}
