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
import { orderService } from '@/services/orderService'
import type { Order, OrderStatus } from '@/types'
import { cn, fmtDateTime, inr } from '@/utils/format'

const STATUSES: OrderStatus[] = ['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export default function Orders() {
  const { t } = useLang()
  useDocumentTitle(t('admin.orders'))
  const toast = useToast()
  const { data, loading, reload } = useAsync(() => orderService.adminList(), [])
  const [q, setQ] = useState('')
  const [st, setSt] = useState<OrderStatus | 'ALL'>('ALL')
  const [view, setView] = useState<Order | null>(null)
  const list = useMemo(
    () => (data ?? []).filter((o) => (st === 'ALL' || o.status === st) && (o.number + o.customerName + o.phone).toLowerCase().includes(q.toLowerCase())),
    [data, q, st],
  )

  const update = async (o: Order, s: OrderStatus) => {
    const u = await orderService.updateStatus(o.id, s, 'Updated by admin (demo)')
    toast('success', `${o.number} → ${s}`)
    setView(u)
    reload()
  }

  return (
    <>
      <PageTitle title={t('admin.orders')} text="Demo orders created on the FPC Bazaar storefront. Payments are simulated." />
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {(['ALL', ...STATUSES] as const).map((s) => (
          <button key={s} onClick={() => setSt(s)} className={cn('shrink-0 rounded-full border px-4 py-2 text-xs font-bold', st === s ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900')}>
            {s} <span className="opacity-50">{s === 'ALL' ? data?.length ?? 0 : data?.filter((o) => o.status === s).length ?? 0}</span>
          </button>
        ))}
      </div>
      <AdminCard>
        <div className="flex items-center gap-3 border-b border-navy-900/5 p-4">
          <SearchBox value={q} onChange={setQ} placeholder="Order no., name, phone…" />
        </div>
        {loading ? (
          <PageLoader />
        ) : (
          <Table head={['Order', 'Customer', 'Date', 'Payment', 'Total', 'Status', '']} empty={!list.length}>
            {list.map((o) => (
              <tr key={o.id} className="cursor-pointer hover:bg-cream-50" onClick={() => setView(o)}>
                <td className="px-5 py-3 font-bold text-navy-900">{o.number}</td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-navy-900">{o.customerName}</p>
                  <p className="text-xs text-ink-mute">{o.address.city}</p>
                </td>
                <td className="px-5 py-3 text-ink-soft">{fmtDateTime(o.createdAt)}</td>
                <td className="px-5 py-3 text-xs">
                  <p className="font-bold">{o.paymentMethod}</p>
                  <p className="text-ink-mute">{o.paymentStatus === 'COD_PENDING' ? 'COD pending' : 'Simulated paid'}</p>
                </td>
                <td className="px-5 py-3 font-bold">{inr(o.total)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={o.status} />
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
                <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">Customer</p>
                <p className="mt-1 font-semibold">{view.customerName}</p>
                <p className="text-ink-soft">{view.phone}</p>
                <p className="break-all text-ink-soft">{view.email}</p>
              </div>
              <div className="rounded-xl bg-cream-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">Ship to</p>
                <p className="mt-1 text-ink-soft">
                  {view.address.line1}
                  {view.address.line2 ? `, ${view.address.line2}` : ''}, {view.address.city}, {view.address.state} {view.address.pincode}
                </p>
              </div>
              <div className="rounded-xl bg-cream-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">Payment (simulated)</p>
                <p className="mt-1 font-semibold">{view.paymentMethod}</p>
                <p className="text-ink-soft">{view.paymentRef}</p>
              </div>
            </div>
            <ul className="divide-y divide-navy-900/5 rounded-xl border border-navy-900/5">
              {view.lines.map((l) => (
                <li key={l.productId} className="flex items-center gap-3 p-3">
                  <Img src={l.image} alt="" wrapClassName="h-12 w-12 rounded-lg" />
                  <p className="flex-1 text-sm font-semibold">
                    {l.name} <span className="text-ink-mute">× {l.qty}</span>
                  </p>
                  <p className="text-sm font-bold">{inr(l.price * l.qty)}</p>
                </li>
              ))}
              <li className="flex justify-between p-3 text-sm">
                <span className="text-ink-soft">Shipping</span>
                <span>{view.shipping ? inr(view.shipping) : 'Free'}</span>
              </li>
              <li className="flex justify-between p-3 font-bold">
                <span>Total</span>
                <span>{inr(view.total)}</span>
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
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="field-label">History</p>
              <ol className="space-y-2 text-sm">
                {view.history.map((h, i) => (
                  <li key={i} className="flex items-center gap-3">
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
