import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { DemoNotice, Spinner } from '@/components/ui/Primitives'
import { Input, Select, Textarea } from '@/components/forms/Field'
import EnquirySummary from '@/components/shop/EnquirySummary'
import { useEnquiryList } from '@/context/EnquiryListContext'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { tradeEnquiryService } from '@/services/tradeEnquiryService'
import { tradeEnquirySchema, INDIAN_STATES, type TradeEnquiryForm } from '@/utils/validation'
import { stock } from '@/data/images'
import type { BuyerType, SupplyFrequency } from '@/types'

const BUYER_TYPES: BuyerType[] = ['RETAILER', 'WHOLESALER', 'PROCESSOR', 'EXPORTER', 'INSTITUTION', 'HORECA', 'OTHER']
const FREQS: SupplyFrequency[] = ['ONE_TIME', 'MONTHLY', 'SEASONAL']

export default function SendEnquiry() {
  const { t, L } = useLang()
  useDocumentTitle(t('send.title'))
  const { lines, items, clear } = useEnquiryList()
  const { user } = useAuth()
  const toast = useToast()
  const nav = useNavigate()
  const [processing, setProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TradeEnquiryForm, unknown, z.output<typeof tradeEnquirySchema>>({
    resolver: zodResolver(tradeEnquirySchema),
    defaultValues: {
      buyerName: user?.name.replace(' (Demo)', '') ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      buyerType: 'RETAILER',
      state: 'Rajasthan',
      frequency: 'MONTHLY',
    },
  })

  if (lines.length === 0 && !processing) return <Navigate to="/bazaar/enquiry" replace />

  const onSubmit = async (v: z.output<typeof tradeEnquirySchema>) => {
    setProcessing(true)
    try {
      const enq = await tradeEnquiryService.create({
        ...v,
        organisation: v.organisation || undefined,
        pincode: v.pincode || undefined,
        requiredBy: v.requiredBy || undefined,
        message: v.message || undefined,
        userId: user?.id ?? null,
        lines: items,
      })
      clear()
      nav(`/bazaar/enquiry/${enq.number}`, { replace: true })
    } catch (e) {
      toast('error', e instanceof Error ? e.message : 'Could not send enquiry')
      setProcessing(false)
    }
  }

  const card = 'rounded-[1.5rem] bg-white p-6 shadow-card sm:p-8'
  return (
    <>
      <PageHero title={t('send.title')} image={stock.vegBaskets} fallback="/images/real/produce-exhibit.jpg" crumbs={[{ label: t('nav.bazaar'), to: '/bazaar' }, { label: t('nav.cart'), to: '/bazaar/enquiry' }, { label: t('send.title') }]} size="sm" />
      <section className="bg-cream-50 py-12 sm:py-16">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="container grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0 space-y-6">
            <DemoNotice>{t('send.demoText')}</DemoNotice>
            {!user && (
              <p className="rounded-xl bg-white px-4 py-3 text-sm text-ink-soft shadow-card">
                {t('send.loginHint')}{' '}
                <Link to="/login?next=/bazaar/enquiry/send" className="font-bold text-leaf-700">
                  {t('nav.login')} →
                </Link>
              </p>
            )}

            <fieldset className={card}>
              <legend className="sr-only">{t('send.buyer')}</legend>
              <p className="font-display text-xl text-navy-900">1. {t('send.buyer')}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input label={t('common.name')} {...register('buyerName')} error={errors.buyerName?.message} autoComplete="name" />
                <Input label={`${t('send.org')} (${t('common.optional')})`} {...register('organisation')} autoComplete="organization" />
                <Select label={t('send.buyerType')} {...register('buyerType')} options={BUYER_TYPES.map((b) => ({ value: b, label: t(`send.types.${b}`) }))} />
                <Input label={t('common.phone')} type="tel" inputMode="numeric" {...register('phone')} error={errors.phone?.message} autoComplete="tel" placeholder="98XXXXXXXX" />
                <Input label={t('common.email')} type="email" {...register('email')} error={errors.email?.message} autoComplete="email" wrapClassName="sm:col-span-2" />
              </div>
            </fieldset>

            <fieldset className={card}>
              <legend className="sr-only">{t('send.delivery')}</legend>
              <p className="font-display text-xl text-navy-900">2. {t('send.delivery')}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <Input label={t('common.city')} {...register('city')} error={errors.city?.message} autoComplete="address-level2" />
                <Select label={t('common.state')} {...register('state')} error={errors.state?.message} options={INDIAN_STATES.map((s) => ({ value: s, label: s }))} />
                <Input label={`${t('send.pincode')} (${t('common.optional')})`} inputMode="numeric" maxLength={6} {...register('pincode')} error={errors.pincode?.message} autoComplete="postal-code" />
              </div>
            </fieldset>

            <fieldset className={card}>
              <legend className="sr-only">{t('send.requirement')}</legend>
              <p className="font-display text-xl text-navy-900">3. {t('send.requirement')}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Select label={t('send.frequency')} {...register('frequency')} options={FREQS.map((f) => ({ value: f, label: t(`send.freq.${f}`) }))} />
                <Input label={`${t('send.requiredBy')} (${t('common.optional')})`} type="date" min={new Date().toISOString().slice(0, 10)} {...register('requiredBy')} />
                <Textarea label={`${t('send.message')} (${t('common.optional')})`} rows={3} {...register('message')} error={errors.message?.message} wrapClassName="sm:col-span-2" />
              </div>
            </fieldset>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <EnquirySummary
              cta={
                <>
                  <button type="submit" disabled={processing} className="btn-primary w-full !py-4">
                    {processing ? <Spinner className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    {processing ? t('send.processing') : t('send.submit')}
                  </button>
                  <p className="mt-3 text-center text-[11px] text-ink-mute">{t('send.demoText')}</p>
                </>
              }
            >
              <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto border-b border-navy-900/5 pb-4">
                {lines.map(({ product: p, qty }) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <Img src={p.image} alt="" sizes="80px" wrapClassName="h-14 w-14 shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-semibold text-navy-900">{L(p.name)}</p>
                      <p className="truncate text-xs text-ink-mute">{p.producer}</p>
                    </div>
                    <p className="shrink-0 text-right text-xs font-bold text-navy-900">
                      {qty.toLocaleString('en-IN')} <span className="font-semibold text-ink-mute">{p.unit}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </EnquirySummary>
          </div>
        </form>
      </section>

      <AnimatePresence>
        {processing && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center bg-navy-950/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mx-4 max-w-sm rounded-3xl bg-white p-8 text-center">
              <Spinner className="mx-auto h-10 w-10 text-gold-500" />
              <p className="mt-5 font-display text-xl text-navy-900">{t('send.processing')}</p>
              <p className="mt-2 text-sm text-ink-soft">{t('send.demoText')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
