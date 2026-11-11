import type { ReactNode } from 'react'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/hooks/useLang'
import { SHIPPING_FREE_ABOVE } from '@/services/orderService'
import { inr } from '@/utils/format'

export default function OrderSummary({ cta, children }: { cta?: ReactNode; children?: ReactNode }) {
  const { subtotal, shipping, total } = useCart()
  const { t } = useLang()
  return (
    <div className="rounded-[1.5rem] bg-white p-6 shadow-card">
      <p className="font-display text-xl text-navy-900">{t('checkout.summary')}</p>
      {children}
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft">{t('cart.subtotal')}</dt>
          <dd className="font-semibold text-navy-900">{inr(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">{t('cart.shipping')}</dt>
          <dd className="font-semibold text-navy-900">{shipping === 0 ? t('cart.free') : inr(shipping)}</dd>
        </div>
        {subtotal > 0 && subtotal < SHIPPING_FREE_ABOVE && <p className="text-xs text-leaf-700">{t('cart.freeShipHint', { amount: inr(SHIPPING_FREE_ABOVE - subtotal) })}</p>}
        <div className="flex justify-between border-t border-navy-900/10 pt-4 text-base">
          <dt className="font-bold text-navy-900">{t('cart.total')}</dt>
          <dd className="font-display text-2xl text-navy-900">{inr(total)}</dd>
        </div>
      </dl>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  )
}

