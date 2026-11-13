import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardList, Minus, Plus, Trash2, Users, X } from 'lucide-react'
import { MAX_QTY, useEnquiryList } from '@/context/EnquiryListContext'
import { useLang } from '@/hooks/useLang'
import { useEscape, useLockBody } from '@/hooks/useUi'
import { inr, qtyStep } from '@/utils/format'
import Img from '@/components/ui/Img'
import { DemoPill } from '@/components/ui/Primitives'

/** Bulk quantity input: type any amount, or step with − / +. */
export function QtyInput({ value, onChange, step = 1, unit, small }: { value: number; onChange: (v: number) => void; step?: number; unit?: string; small?: boolean }) {
  const h = small ? 'h-9' : 'h-12'
  return (
    <div className={`inline-flex items-center rounded-full border border-navy-900/15 bg-white ${h}`}>
      <button type="button" onClick={() => onChange(Math.max(0, value - step))} className={`grid h-full place-items-center text-navy-900 hover:text-leaf-700 ${small ? 'w-8' : 'w-11'}`} aria-label="Decrease">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX_QTY}
        value={value}
        onChange={(e) => onChange(Math.max(0, Math.min(MAX_QTY, Number(e.target.value) || 0)))}
        className={`w-16 bg-transparent text-center font-bold text-navy-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none ${small ? 'text-xs' : 'text-sm'}`}
        aria-label="Quantity"
      />
      {unit && <span className={`pr-1 font-semibold text-ink-mute ${small ? 'text-[10px]' : 'text-xs'}`}>{unit}</span>}
      <button type="button" onClick={() => onChange(Math.min(MAX_QTY, value + step))} className={`grid h-full place-items-center text-navy-900 hover:text-leaf-700 ${small ? 'w-8' : 'w-11'}`} aria-label="Increase">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default function EnquiryDrawer() {
  const { drawerOpen, setDrawerOpen, lines, indicativeValue, producers, setQty, remove, count } = useEnquiryList()
  const { t, L } = useLang()
  const nav = useNavigate()
  useLockBody(drawerOpen)
  useEscape(drawerOpen, () => setDrawerOpen(false))

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div className="fixed inset-0 z-[85]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50"
            role="dialog"
            aria-modal="true"
            aria-label={t('elist.title')}
          >
            <div className="flex items-center justify-between border-b border-navy-900/10 bg-white px-6 py-5">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl text-navy-900">{t('elist.title')}</h3>
                <span className="rounded-full bg-navy-900 px-2 py-0.5 text-xs font-bold text-white">{count}</span>
                <DemoPill />
              </div>
              <button onClick={() => setDrawerOpen(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-gold-50 text-gold-600">
                  <ClipboardList className="h-8 w-8" />
                </div>
                <p className="mt-5 font-display text-xl text-navy-900">{t('elist.empty')}</p>
                <p className="mt-2 text-sm text-ink-soft">{t('elist.emptyText')}</p>
                <Link to="/bazaar" onClick={() => setDrawerOpen(false)} className="btn-primary mt-6">
                  {t('elist.continue')}
                </Link>
              </div>
            ) : (
              <>
                <p className="flex items-center gap-2 border-b border-navy-900/5 bg-leaf-50 px-6 py-3 text-xs font-semibold text-leaf-800">
                  <Users className="h-4 w-4 shrink-0" /> {t('elist.producers', { count: producers })}
                </p>
                <ul className="flex-1 divide-y divide-navy-900/5 overflow-y-auto px-6">
                  {lines.map(({ product: p, qty }) => (
                    <li key={p.id} className="flex gap-4 py-5">
                      <Img src={p.image} alt={L(p.name)} sizes="80px" wrapClassName="h-20 w-20 shrink-0 rounded-xl" />
                      <div className="min-w-0 flex-1">
                        <Link to={`/bazaar/${p.slug}`} onClick={() => setDrawerOpen(false)} className="line-clamp-2 text-sm font-bold text-navy-900 hover:text-leaf-700">
                          {L(p.name)}
                        </Link>
                        <p className="mt-0.5 truncate text-xs text-ink-mute">{p.producer}</p>
                        <div className="mt-3">
                          <QtyInput small value={qty} step={qtyStep(p.moq)} unit={p.unit.length <= 8 ? p.unit : undefined} onChange={(v) => setQty(p.id, v)} />
                        </div>
                        {qty < p.moq && <p className="mt-1.5 text-[11px] font-semibold text-saffron-600">{t('elist.belowMin', { qty: `${p.moq} ${p.unit}` })}</p>}
                      </div>
                      <button onClick={() => remove(p.id)} className="self-start text-ink-mute hover:text-red-600" aria-label={t('elist.remove')}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-navy-900/10 bg-white px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{t('elist.value')}</span>
                    <span className="text-lg font-extrabold text-navy-900">≈ {inr(indicativeValue)}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-mute">{t('elist.valueNote')}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link to="/bazaar/enquiry" onClick={() => setDrawerOpen(false)} className="btn-outline">
                      {t('elist.review')}
                    </Link>
                    <button
                      onClick={() => {
                        setDrawerOpen(false)
                        nav('/bazaar/enquiry/send')
                      }}
                      className="btn-primary"
                    >
                      {t('elist.send')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
