import { useMemo, useState } from 'react'
import { Download, Eye } from 'lucide-react'
import { AdminCard, PageTitle, SearchBox, Table } from '@/components/admin/AdminUi'
import { Modal } from '@/components/ui/Overlay'
import { Textarea } from '@/components/forms/Field'
import { PageLoader, StatusBadge } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { useToast } from '@/context/ToastContext'
import { registrationService } from '@/services/registrationService'
import type { Registration, RegistrationStatus, RegistrationType } from '@/types'
import { cn, fmtDate } from '@/utils/format'

const TYPES: (RegistrationType | 'ALL')[] = ['ALL', 'FARMER', 'FPO', 'SHG', 'DAIRY']
const STATUSES: RegistrationStatus[] = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED']

const label = (k: string) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())

export default function Registrations() {
  const { t } = useLang()
  useDocumentTitle(t('admin.registrations'))
  const toast = useToast()
  const { data, loading, reload } = useAsync(() => registrationService.adminList(), [])
  const [type, setType] = useState<RegistrationType | 'ALL'>('ALL')
  const [q, setQ] = useState('')
  const [view, setView] = useState<Registration | null>(null)
  const [notes, setNotes] = useState('')
  const list = useMemo(
    () => (data ?? []).filter((r) => (type === 'ALL' || r.type === type) && (r.name + r.refNo + r.district + r.phone).toLowerCase().includes(q.toLowerCase())),
    [data, type, q],
  )

  const exportCsv = () => {
    const rows = [['Ref', 'Type', 'Name', 'Phone', 'State', 'District', 'Status', 'Date'], ...list.map((r) => [r.refNo, r.type, r.name, r.phone, r.state, r.district, r.status, r.createdAt.slice(0, 10)])]
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `fpc-registrations-demo.csv`
    a.click()
  }

  return (
    <>
      <PageTitle
        title={t('admin.registrations')}
        text="Farmer, FPO, SHG and Dairy applications submitted through the website (demo)."
        action={
          <button onClick={exportCsv} className="btn-outline">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {TYPES.map((k) => (
          <button key={k} onClick={() => setType(k)} className={cn('shrink-0 rounded-full border px-4 py-2 text-xs font-bold', type === k ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900')}>
            {k} <span className="opacity-50">{k === 'ALL' ? data?.length ?? 0 : data?.filter((r) => r.type === k).length ?? 0}</span>
          </button>
        ))}
      </div>
      <AdminCard>
        <div className="border-b border-navy-900/5 p-4">
          <SearchBox value={q} onChange={setQ} placeholder="Name, ref no., district…" />
        </div>
        {loading ? (
          <PageLoader />
        ) : (
          <Table head={['Reference', 'Type', 'Applicant', 'Location', 'Date', 'Status', '']} empty={!list.length}>
            {list.map((r) => (
              <tr
                key={r.id}
                className="cursor-pointer hover:bg-cream-50"
                onClick={() => {
                  setView(r)
                  setNotes(r.notes ?? '')
                }}
              >
                <td className="px-5 py-3 font-bold text-navy-900">{r.refNo}</td>
                <td className="px-5 py-3">
                  <span className="rounded-md bg-navy-50 px-2 py-1 text-[11px] font-bold text-navy-700">{r.type}</span>
                </td>
                <td className="px-5 py-3">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-ink-mute">{r.phone}</p>
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {r.district}, {r.state}
                </td>
                <td className="px-5 py-3 text-ink-soft">{fmtDate(r.createdAt)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-5 py-3 text-right">
                  <Eye className="ml-auto h-4 w-4 text-ink-mute" />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </AdminCard>

      <Modal open={!!view} onClose={() => setView(null)} title={view ? `${view.type} • ${view.refNo}` : ''} wide>
        {view && (
          <div className="space-y-6">
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              {[
                ['Name', view.name],
                ['Phone', view.phone],
                ['Email', view.email ?? '—'],
                ['Location', [view.village, view.district, view.state].filter(Boolean).join(', ')],
                ...Object.entries(view.details).map(([k, v]) => [label(k), Array.isArray(v) ? v.join(', ') || '—' : typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v)]),
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-cream-50 p-3">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-mute">{k}</dt>
                  <dd className="mt-0.5 font-semibold text-navy-900">{v}</dd>
                </div>
              ))}
            </dl>
            <Textarea label={t('admin.notes')} value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
            <div>
              <p className="field-label">{t('admin.updateStatus')}</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={async () => {
                      const u = await registrationService.updateStatus(view.id, s, notes)
                      toast('success', `${view.refNo} → ${s}`)
                      setView(u)
                      reload()
                    }}
                    className={cn('rounded-full border px-3.5 py-2 text-xs font-bold', view.status === s ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 hover:border-navy-900')}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
