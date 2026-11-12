import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/hooks/useLang'
import { useLockBody } from '@/hooks/useUi'
import { inr } from '@/utils/format'
import { SHIPPING_FREE_ABOVE } from '@/services/orderService'
import Img from '@/components/ui/Img'
import { DemoPill } from '@/components/ui/Primitives'

export function QtyStepper({ value, onChange, max = 99, small }: { value: number; onChange: (v: number) => void; max?: number; small?: boolean }) {
  return (
    <div className={`inline-flex items-center rounded-full border border-navy-900/15 bg-white ${small ? 'h-8' : 'h-11'}`}>
      <button type="button" onClick={() => onChange(value - 1)} className={`grid place-items-center text-navy-900 hover:text-leaf-700 ${small ? 'w-8' : 'w-11'}`} aria-label="Decrease">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className={`min-w-6 text-center font-bold ${small ? 'text-xs' : 'text-sm'}`}>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className={`grid place-items-center text-navy-900 hover:text-leaf-700 ${small ? 'w-8' : 'w-11'}`} aria-label="Increase">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal, setQty, remove, count } = useCart()
  const { t, L } = useLang()
  const nav = useNavigate()
  useLockBody(drawerOpen)
  const remaining = SHIPPING_FREE_ABOVE - subtotal

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
          >
            <div className="flex items-center justify-between border-b border-navy-900/10 bg-white px-6 py-5">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl text-navy-900">{t('cart.title')}</h3>
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
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <p className="mt-5 font-display text-xl text-navy-900">{t('cart.empty')}</p>
                <Link to="/bazaar" onClick={() => setDrawerOpen(false)} className="btn-primary mt-6">
                  {t('cart.continue')}
                </Link>
              </div>
            ) : (
              <>
                {remaining > 0 && (
                  <div className="border-b border-navy-900/5 bg-gold-50 px-6 py-3">
                    <p className="text-xs font-semibold text-navy-900">{t('cart.freeShipHint', { amount: inr(remaining) })}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gold-100">
                      <div className="h-full rounded-full bg-gold-500 transition-all" style={{ width: `${Math.min(100, (subtotal / SHIPPING_FREE_ABOVE) * 100)}%` }} />
                    </div>
                  </div>
                )}
                <ul className="flex-1 divide-y divide-navy-900/5 overflow-y-auto px-6">
                  {lines.map(({ product: p, qty }) => (
                    <li key={p.id} className="flex gap-4 py-5">
                      <Img src={p.image} alt={L(p.name)} sizes="80px" wrapClassName="h-20 w-20 shrink-0 rounded-xl" />
                      <div className="min-w-0 flex-1">
                        <Link to={`/bazaar/${p.slug}`} onClick={() => setDrawerOpen(false)} className="line-clamp-2 text-sm font-bold text-navy-900 hover:text-leaf-700">
                          {L(p.name)}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-mute">{p.unit}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <QtyStepper small value={qty} max={p.stock} onChange={(v) => setQty(p.id, v)} />
                          <span className="font-bold text-navy-900">{inr(p.price * qty)}</span>
                        </div>
                      </div>
                      <button onClick={() => remove(p.id)} className="self-start text-ink-mute hover:text-red-600" aria-label={t('cart.remove')}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-navy-900/10 bg-white px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{t('cart.subtotal')}</span>
                    <span className="text-lg font-extrabold text-navy-900">{inr(subtotal)}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link to="/bazaar/cart" onClick={() => setDrawerOpen(false)} className="btn-outline">
                      {t('nav.cart')}
                    </Link>
                    <button
                      onClick={() => {
                        setDrawerOpen(false)
                        nav('/bazaar/checkout')
                      }}
                      className="btn-primary"
                    >
                      {t('cart.checkout')}
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
