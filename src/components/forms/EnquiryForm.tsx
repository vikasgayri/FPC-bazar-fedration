import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { Input, Select, Textarea } from './Field'
import { DemoNotice, Spinner } from '@/components/ui/Primitives'
import { useLang } from '@/hooks/useLang'
import { useToast } from '@/context/ToastContext'
import { enquiryService } from '@/services/enquiryService'
import { enquirySchema, type EnquiryForm as Form } from '@/utils/validation'
import type { Enquiry, EnquiryType } from '@/types'

const TYPES: EnquiryType[] = ['PARTNERSHIP', 'BULK_PURCHASE', 'PPP_PROJECT', 'CBG_INVESTMENT', 'CSR', 'GENERAL']

export default function EnquiryForm({ defaultType = 'GENERAL', compact }: { defaultType?: EnquiryType; compact?: boolean }) {
  const { t } = useLang()
  const toast = useToast()
  const [done, setDone] = useState<Enquiry | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form, unknown, z.output<typeof enquirySchema>>({ resolver: zodResolver(enquirySchema), defaultValues: { type: defaultType } })

  const onSubmit = async (v: z.output<typeof enquirySchema>) => {
    try {
      setDone(await enquiryService.submit(v))
    } catch (e) {
      toast('error', e instanceof Error ? e.message : 'Failed')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-leaf-600" />
          <p className="mt-4 font-display text-2xl text-navy-900">{t('enquiry.successTitle')}</p>
          <p className="mt-2 text-sm text-ink-soft">{t('enquiry.successText')}</p>
          <p className="mt-4 inline-block rounded-full bg-cream-100 px-4 py-2 text-sm font-bold tracking-wide text-navy-900">{done.refNo}</p>
          <div className="mt-6">
            <button
              onClick={() => {
                setDone(null)
                reset({ type: defaultType })
              }}
              className="btn-outline"
            >
              {t('common.back')}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
          {!compact && (
            <Select label={t('enquiry.type')} {...register('type')} wrapClassName="sm:col-span-2" options={TYPES.map((k) => ({ value: k, label: t(`enquiry.types.${k}`) }))} />
          )}
          <Input label={t('common.name')} {...register('name')} error={errors.name?.message} autoComplete="name" />
          <Input label={`${t('enquiry.organisation')} (${t('common.optional')})`} {...register('organisation')} autoComplete="organization" />
          <Input label={t('common.email')} type="email" {...register('email')} error={errors.email?.message} autoComplete="email" />
          <Input label={t('common.phone')} type="tel" inputMode="numeric" {...register('phone')} error={errors.phone?.message} autoComplete="tel" />
          {!compact && <Input label={`${t('common.city')} (${t('common.optional')})`} {...register('city')} wrapClassName="sm:col-span-2" />}
          <Textarea label={t('common.message')} {...register('message')} error={errors.message?.message} wrapClassName="sm:col-span-2" rows={5} />
          <DemoNotice className="sm:col-span-2">{t('enquiry.successText')}</DemoNotice>
          <div className="sm:col-span-2">
            <button className="btn-primary !px-8 !py-4" disabled={isSubmitting}>
              {isSubmitting ? <Spinner className="h-4 w-4" /> : <Send className="h-4 w-4" />} {isSubmitting ? t('common.submitting') : t('common.submit')}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
