import { useMemo, useState } from 'react'
import { Eye } from 'lucide-react'
import { AdminCard, PageTitle, SearchBox, Table } from '@/components/admin/AdminUi'
import { Modal } from '@/components/ui/Overlay'
import Img from '@/components/ui/Img'
import { PageLoader, StatusBadge } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { useToast } from '@/context/ToastContext'
import { tradeEnquiryService } from '@/services/tradeEnquiryService'
import type { TradeEnquiry, TradeEnquiryStatus } from '@/types'
import { cn, fmtDate, fmtDateTime, inr } from '@/utils/format'

const STATUSES: TradeEnquiryStatus[] = ['RECEIVED', 'SHARED_WITH_FPO', 'QUOTE_SENT', 'LINKED', 'CLOSED']
const label = (s: string) => s.replace(/_/g, ' ')

export default function TradeEnquiries() {
  const { t } = useLang()
  useDocumentTitle(t('admin.orders'))
  const toast = useToast()
  const { data, loading, reload } = useAsync(() => tradeEnquiryService.adminList(), [])
  const [q, setQ] = useState('')
  const [st, setSt] = useState<TradeEnquiryStatus | 'ALL'>('ALL')
  const [view, setView] = useState<TradeEnquiry | null>(null)
  const list = useMemo(
    () =>
      (data ?? []).filter(
        (e) => (st === 'ALL' || e.status === st) && [e.number, e.buyerName, e.organisation ?? '', e.phone, ...e.lines.map((l) => l.producer)].join(' ').toLowerCase().includes(q.toLowerCase()),
      ),
    [data, q, st],
  )

  const update = async (e: TradeEnquiry, s: TradeEnquiryStatus) => {
    const u = await tradeEnquiryService.updateStatus(e.id, s, 'Updated by federation (demo)')
    toast('success', `${e.number} → ${label(s)}`)
    setView(u)
    reload()
  }

  return (
    <>
      <PageTitle
        title={t('admin.orders')}
        text="Buyer enquiries from FPC Bazaar. Verify each requirement, share it with the producing FPOs and record when the buyer and FPO are linked. The federation does not invoice or collect payment."
      />
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {(['ALL', ...STATUSES] as const).map((s) => (
          <button key={s} onClick={() => setSt(s)} className={cn('shrink-0 rounded-full border px-4 py-2 text-xs font-bold', st === s ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900')}>
            {label(s)} <span className="opacity-50">{s === 'ALL' ? data?.length ?? 0 : data?.filter((e) => e.status === s).length ?? 0}</span>
          </button>
        ))}
      </div>
      <AdminCard>
        <div className="flex items-center gap-3 border-b border-navy-900/5 p-4">
          <SearchBox value={q} onChange={setQ} placeholder="Enquiry no., buyer, FPO, phone…" />
        </div>
        {loading ? (
          <PageLoader />
        ) : (
          <Table head={['Enquiry', 'Buyer', 'FPOs', 'Date', 'Indicative value', 'Status', '']} empty={!list.length}>
            {list.map((e) => (
              <tr key={e.id} className="cursor-pointer hover:bg-cream-50" onClick={() => setView(e)}>
                <td className="whitespace-nowrap px-5 py-3 font-bold text-navy-900">{e.number}</td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-navy-900">{e.organisation || e.buyerName}</p>
                  <p className="text-xs text-ink-mute">
                    {t(`send.types.${e.buyerType}`)} • {e.city}, {e.state}
                  </p>
                </td>
                <td className="px-5 py-3 font-semibold">{new Set(e.lines.map((l) => l.producer)).size}</td>
                <td className="whitespace-nowrap px-5 py-3 text-ink-soft">{fmtDateTime(e.createdAt)}</td>
                <td className="whitespace-nowrap px-5 py-3 font-bold">≈ {inr(e.indicativeValue)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={e.status} />
                </td>
                <td className="px-5 py-3 text-right">
                  <Eye className="ml-auto h-4 w-4 text-ink-mute" />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </AdminCard>

      <Modal open={!!view} onClose={() => setView(null)} title={view?.number ?? ''} wide>
        {view && (
          <div className="space-y-6">
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-cream-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">Buyer</p>
                <p className="mt-1 font-semibold">{view.buyerName}</p>
                {view.organisation && <p className="text-ink-soft">{view.organisation}</p>}
                <p className="text-ink-soft">{view.phone}</p>
                <p className="break-all text-ink-soft">{view.email}</p>
              </div>
              <div className="rounded-xl bg-cream-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">Delivery to</p>
                <p className="mt-1 text-ink-soft">
                  {view.city}, {view.state} {view.pincode}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-mute">Buyer type</p>
                <p className="text-ink-soft">{t(`send.types.${view.buyerType}`)}</p>
              </div>
              <div className="rounded-xl bg-cream-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">Requirement</p>
                <p className="mt-1 font-semibold">{t(`send.freq.${view.frequency}`)}</p>
                {view.requiredBy && <p className="text-ink-soft">By {fmtDate(view.requiredBy)}</p>}
              </div>
            </div>
            {view.message && <p className="rounded-xl border border-navy-900/5 p-4 text-sm text-ink-soft">“{view.message}”</p>}
            <ul className="divide-y divide-navy-900/5 rounded-xl border border-navy-900/5">
              {view.lines.map((l) => (
                <li key={l.productId} className="flex items-center gap-3 p-3">
                  <Img src={l.image} alt="" sizes="80px" wrapClassName="h-12 w-12 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{l.name}</p>
                    <p className="text-xs text-leaf-700">
                      {l.producer} • {l.origin}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-sm font-bold">
                    {l.qty.toLocaleString('en-IN')} {l.unit}
                    <span className="block text-xs font-semibold text-ink-mute">@ {inr(l.price)}</span>
                  </p>
                </li>
              ))}
              <li className="flex justify-between p-3 font-bold">
                <span>Indicative value (not an invoice)</span>
                <span>≈ {inr(view.indicativeValue)}</span>
              </li>
            </ul>
            <div>
              <p className="field-label">{t('admin.updateStatus')}</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    disabled={view.status === s}
                    onClick={() => update(view, s)}
                    className={cn('rounded-full border px-3.5 py-2 text-xs font-bold transition', view.status === s ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 hover:border-navy-900')}
                  >
                    {label(s)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="field-label">History</p>
              <ol className="space-y-2 text-sm">
                {view.history.map((h, i) => (
                  <li key={i} className="flex flex-wrap items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-leaf-600" />
                    <StatusBadge status={h.status} /> <span className="text-ink-mute">{fmtDateTime(h.at)}</span>
                    {h.note && <span className="text-xs text-ink-mute">— {h.note}</span>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
