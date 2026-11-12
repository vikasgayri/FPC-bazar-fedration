import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Banknote, CreditCard, Landmark, Lock, Smartphone, ShieldAlert } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { DemoNotice, Spinner } from '@/components/ui/Primitives'
import { Input, Select } from '@/components/forms/Field'
import OrderSummary from '@/components/shop/OrderSummary'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { orderService } from '@/services/orderService'
import { checkoutSchema, INDIAN_STATES, type CheckoutForm } from '@/utils/validation'
import { stock } from '@/data/images'
import type { PaymentMethod } from '@/types'
import { cn, inr } from '@/utils/format'

export default function Checkout() {
  const { t, L } = useLang()
  useDocumentTitle(t('checkout.title'))
  const { lines, items, clear, total } = useCart()
  const { user } = useAuth()
  const toast = useToast()
  const nav = useNavigate()
  const [processing, setProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm, unknown, z.output<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name.replace(' (Demo)', '') ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      state: 'Rajasthan',
      paymentMethod: 'UPI',
      upiId: '',
    },
  })
  const method = watch('paymentMethod') as PaymentMethod

  if (lines.length === 0 && !processing) return <Navigate to="/bazaar/cart" replace />

  const onSubmit = async (v: z.output<typeof checkoutSchema>) => {
    setProcessing(true)
    try {
      const order = await orderService.create({
        userId: user?.id ?? null,
        customerName: v.fullName,
        email: v.email,
        phone: v.phone,
        address: { fullName: v.fullName, phone: v.phone, line1: v.line1, line2: v.line2, city: v.city, state: v.state, pincode: v.pincode },
        lines: items,
        paymentMethod: v.paymentMethod,
      })
      clear()
      nav(`/bazaar/order/${order.number}`, { replace: true })
    } catch (e) {
      toast('error', e instanceof Error ? e.message : 'Could not place order')
      setProcessing(false)
    }
  }

  const methods: { key: PaymentMethod; I: typeof CreditCard; label: string }[] = [
    { key: 'UPI', I: Smartphone, label: t('checkout.upi') },
    { key: 'CARD', I: CreditCard, label: t('checkout.card') },
    { key: 'NETBANKING', I: Landmark, label: t('checkout.netbanking') },
    { key: 'COD', I: Banknote, label: t('checkout.cod') },
  ]

  return (
    <>
      <PageHero title={t('checkout.title')} image={stock.vegBaskets} fallback="/images/real/produce-exhibit.jpg" crumbs={[{ label: t('nav.bazaar'), to: '/bazaar' }, { label: t('checkout.title') }]} size="sm" />
      <section className="bg-cream-50 py-12 sm:py-16">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="container grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0 space-y-6">
            <DemoNotice>{t('checkout.simulatedText')}</DemoNotice>
            {!user && (
              <p className="rounded-xl bg-white px-4 py-3 text-sm text-ink-soft shadow-card">
                {t('checkout.loginHint')}{' '}
                <Link to="/login?next=/bazaar/checkout" className="font-bold text-leaf-700">
                  {t('nav.login')} →
                </Link>
              </p>
            )}

            <fieldset className="rounded-[1.5rem] bg-white p-6 shadow-card sm:p-8">
              <legend className="sr-only">{t('checkout.contact')}</legend>
              <p className="font-display text-xl text-navy-900">1. {t('checkout.contact')}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input label={t('common.name')} {...register('fullName')} error={errors.fullName?.message} autoComplete="name" wrapClassName="sm:col-span-2" />
                <Input label={t('common.email')} type="email" {...register('email')} error={errors.email?.message} autoComplete="email" />
                <Input label={t('common.phone')} type="tel" inputMode="numeric" {...register('phone')} error={errors.phone?.message} autoComplete="tel" placeholder="98XXXXXXXX" />
              </div>
            </fieldset>

            <fieldset className="rounded-[1.5rem] bg-white p-6 shadow-card sm:p-8">
              <legend className="sr-only">{t('checkout.address')}</legend>
              <p className="font-display text-xl text-navy-900">2. {t('checkout.address')}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input label={t('checkout.line1')} {...register('line1')} error={errors.line1?.message} wrapClassName="sm:col-span-2" autoComplete="address-line1" />
                <Input label={`${t('checkout.line2')} (${t('common.optional')})`} {...register('line2')} wrapClassName="sm:col-span-2" autoComplete="address-line2" />
                <Input label={t('common.city')} {...register('city')} error={errors.city?.message} autoComplete="address-level2" />
                <Select label={t('common.state')} {...register('state')} error={errors.state?.message} options={INDIAN_STATES.map((s) => ({ value: s, label: s }))} />
                <Input label={t('checkout.pincode')} inputMode="numeric" maxLength={6} {...register('pincode')} error={errors.pincode?.message} autoComplete="postal-code" />
              </div>
            </fieldset>

            <fieldset className="rounded-[1.5rem] bg-white p-6 shadow-card sm:p-8">
              <legend className="sr-only">{t('checkout.payment')}</legend>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-xl text-navy-900">3. {t('checkout.payment')}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-saffron-600">
                  <ShieldAlert className="h-3.5 w-3.5" /> {t('checkout.simulated')}
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {methods.map(({ key, I, label }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setValue('paymentMethod', key)}
                    aria-pressed={method === key}
                    className={cn('flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center text-xs font-bold transition', method === key ? 'border-navy-900 bg-navy-50 text-navy-900' : 'border-navy-900/10 text-ink-soft hover:border-navy-900/30')}
                  >
                    <I className="h-6 w-6" /> {label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={method} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5">
                  {method === 'UPI' && <Input label="UPI ID (demo — not validated with any bank)" placeholder="name@upi" {...register('upiId')} />}
                  {method === 'CARD' && (
                    <div className="rounded-2xl border border-dashed border-navy-900/20 bg-cream-50 p-4 text-sm text-ink-soft">
                      Card fields are intentionally not collected in this demo. A secure hosted checkout (Razorpay / Cashfree) will handle card data in Phase 2.
                    </div>
                  )}
                  {method === 'NETBANKING' && <div className="rounded-2xl border border-dashed border-navy-900/20 bg-cream-50 p-4 text-sm text-ink-soft">Net banking will redirect to the gateway in Phase 2. Here it is simulated.</div>}
                  {method === 'COD' && <div className="rounded-2xl border border-dashed border-navy-900/20 bg-cream-50 p-4 text-sm text-ink-soft">Pay on delivery — order will be marked “COD pending” in the admin console.</div>}
                </motion.div>
              </AnimatePresence>
            </fieldset>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <OrderSummary
              cta={
                <>
                  <button type="submit" disabled={processing} className="btn-primary w-full !py-4">
                    {processing ? <Spinner className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    {processing ? t('checkout.processing') : `${t('checkout.placeOrder')} • ${inr(total)}`}
                  </button>
                  <p className="mt-3 text-center text-[11px] text-ink-mute">{t('checkout.simulatedText')}</p>
                </>
              }
            >
              <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto border-b border-navy-900/5 pb-4">
                {lines.map(({ product: p, qty }) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Img src={p.image} alt="" sizes="80px" wrapClassName="h-14 w-14 rounded-xl" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-navy-900 px-1 text-[10px] font-bold text-white">{qty}</span>
                    </div>
                    <p className="line-clamp-2 flex-1 text-sm font-semibold text-navy-900">{L(p.name)}</p>
                    <p className="text-sm font-bold text-navy-900">{inr(p.price * qty)}</p>
                  </li>
                ))}
              </ul>
            </OrderSummary>
          </div>
        </form>
      </section>

      <AnimatePresence>
        {processing && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center bg-navy-950/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mx-4 max-w-sm rounded-3xl bg-white p-8 text-center">
              <Spinner className="mx-auto h-10 w-10 text-gold-500" />
              <p className="mt-5 font-display text-xl text-navy-900">{t('checkout.processing')}</p>
              <p className="mt-2 text-sm text-ink-soft">{t('checkout.simulatedText')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
