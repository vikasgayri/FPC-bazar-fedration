import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IndianRupee, Handshake, Package, ClipboardList, MessagesSquare, ArrowUpRight } from 'lucide-react'
import { AdminCard, PageTitle } from '@/components/admin/AdminUi'
import { PageLoader, StatusBadge } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { adminService } from '@/services/adminService'
import { fmtDateTime, inr } from '@/utils/format'
import type { RegistrationType } from '@/types'

const TYPE_COLOR: Record<RegistrationType, string> = { FARMER: '#2E7D32', FPO: '#10325C', SHG: '#E8792B', DAIRY: '#C9A24B' }

export default function Dashboard() {
  const { t } = useLang()
  useDocumentTitle(t('admin.dashboard'))
  const { data: s, loading } = useAsync(() => adminService.dashboard(), [])
  if (loading || !s) return <PageLoader />

  const max = Math.max(1, ...s.enquiriesByDay.map((d) => d.total))
  const totalRegs = Object.values(s.byType).reduce((a, b) => a + b, 0) || 1
  let acc = 0
  const arcs = (Object.keys(s.byType) as RegistrationType[]).map((k) => {
    const from = acc / totalRegs
    acc += s.byType[k]
    return { k, from, to: acc / totalRegs }
  })
  const conic = arcs.map((a) => `${TYPE_COLOR[a.k]} ${a.from * 360}deg ${a.to * 360}deg`).join(', ')

  const cards = [
    { I: IndianRupee, l: t('admin.pipeline'), v: `≈ ${inr(s.pipelineValue)}`, sub: `${s.openTradeEnquiries} ${t('admin.pending')}`, to: '/admin/trade-enquiries' },
    { I: Handshake, l: t('admin.orders'), v: s.tradeEnquiries, sub: `${s.linkedTradeEnquiries} ${t('admin.linked')}`, to: '/admin/trade-enquiries' },
    { I: Package, l: t('admin.products'), v: s.products, sub: `${s.seasonal} ${t('admin.seasonal')}`, to: '/admin/products' },
    { I: ClipboardList, l: t('admin.registrations'), v: s.registrations, sub: `${s.pendingRegistrations} ${t('admin.pending')}`, to: '/admin/registrations' },
    { I: MessagesSquare, l: t('admin.enquiries'), v: s.enquiries, sub: `${s.newEnquiries} ${t('admin.newLabel')}`, to: '/admin/enquiries' },
  ]

  return (
    <>
      <PageTitle title={t('admin.dashboard')} text="Overview of buyer–FPO trade enquiries, member registrations and general enquiries (demo data)." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map(({ I, l, v, sub, to }, i) => (
          <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={i === 0 ? 'col-span-2 lg:col-span-1' : ''}>
            <Link to={to} className={`group block rounded-2xl p-5 shadow-card transition hover:shadow-lift ${i === 0 ? 'bg-navy-900 text-white' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${i === 0 ? 'bg-gold-500 text-navy-950' : 'bg-navy-50 text-navy-700'}`}>
                  <I className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-30 transition group-hover:opacity-100" />
              </div>
              <p className={`mt-4 text-xs font-semibold ${i === 0 ? 'text-white/60' : 'text-ink-mute'}`}>{l}</p>
              <p className="mt-1 font-display text-2xl">{v}</p>
              <p className={`mt-1 text-xs ${i === 0 ? 'text-gold-300' : 'text-saffron-600'}`}>{sub}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <AdminCard title={t('admin.salesWeek')} className="lg:col-span-2">
          <div className="flex h-64 items-end gap-3 px-5 pb-5 pt-8">
            {s.enquiriesByDay.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-ink-mute">{d.total || ''}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(4, (d.total / max) * 170)}px` }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full max-w-12 rounded-t-lg ${d.total ? 'bg-gradient-to-t from-navy-900 to-navy-600' : 'bg-navy-900/10'}`}
                />
                <span className="text-xs font-semibold text-ink-soft">{d.day}</span>
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title={t('admin.byType')}>
          <div className="flex flex-col items-center gap-6 p-6">
            <div className="relative h-40 w-40 rounded-full" style={{ background: `conic-gradient(${conic})` }}>
              <div className="absolute inset-6 grid place-items-center rounded-full bg-white">
                <div className="text-center">
                  <p className="font-display text-3xl text-navy-900">{s.registrations}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-mute">total</p>
                </div>
              </div>
            </div>
            <ul className="grid w-full grid-cols-2 gap-2 text-sm">
              {(Object.keys(s.byType) as RegistrationType[]).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: TYPE_COLOR[k] }} />
                  <span className="font-semibold text-navy-900">{k}</span>
                  <span className="ml-auto text-ink-mute">{s.byType[k]}</span>
                </li>
              ))}
            </ul>
          </div>
        </AdminCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminCard title={t('admin.recentOrders')} action={<Link to="/admin/trade-enquiries" className="text-xs font-bold text-leaf-700">{t('common.viewAll')} →</Link>}>
          <ul className="divide-y divide-navy-900/5">
            {s.recentTradeEnquiries.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy-900">{o.number}</p>
                  <p className="truncate text-xs text-ink-mute">
                    {o.organisation || o.buyerName} • {fmtDateTime(o.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={o.status} />
                  <span className="w-24 text-right text-sm font-bold">≈ {inr(o.indicativeValue)}</span>
                </div>
              </li>
            ))}
          </ul>
        </AdminCard>
        <AdminCard title={t('admin.recentRegs')} action={<Link to="/admin/registrations" className="text-xs font-bold text-leaf-700">{t('common.viewAll')} →</Link>}>
          <ul className="divide-y divide-navy-900/5">
            {s.recentRegistrations.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy-900">{r.name}</p>
                  <p className="truncate text-xs text-ink-mute">
                    {r.type} • {r.refNo} • {r.district}, {r.state}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </>
  )
}
