import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, CheckCircle2, Copy, Milk, Sprout, Users } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import { DemoNotice, Spinner } from '@/components/ui/Primitives'
import { CheckChips, Input, Select } from '@/components/forms/Field'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { useToast } from '@/context/ToastContext'
import { registrationService } from '@/services/registrationService'
import { INDIAN_STATES, phone, reqText } from '@/utils/validation'
import type { Registration, RegistrationType } from '@/types'
import { real } from '@/data/images'
import { cn } from '@/utils/format'

const TYPES: RegistrationType[] = ['FARMER', 'FPO', 'SHG', 'DAIRY']

const INTERESTS: Record<RegistrationType, { en: string; hi: string }[]> = {
  FARMER: [
    { en: 'Organic fertilizer', hi: 'जैविक खाद' },
    { en: 'Natural farming training', hi: 'प्राकृतिक खेती प्रशिक्षण' },
    { en: 'Polyhouse (PPP)', hi: 'पॉलीहाउस (PPP)' },
    { en: 'Napier grass contract farming', hi: 'नेपियर घास कॉन्ट्रैक्ट फार्मिंग' },
    { en: 'Market linkage', hi: 'बाज़ार लिंकेज' },
    { en: 'Cold storage', hi: 'कोल्ड स्टोरेज' },
  ],
  FPO: [
    { en: 'Market linkage', hi: 'बाज़ार लिंकेज' },
    { en: 'Compliance support', hi: 'अनुपालन सहायता' },
    { en: 'Government schemes', hi: 'सरकारी योजनाएं' },
    { en: 'Branding & packaging', hi: 'ब्रांडिंग व पैकेजिंग' },
    { en: 'Agribusiness cluster centre', hi: 'एग्रीबिज़नेस क्लस्टर सेंटर' },
    { en: 'Youth employment (E-auto)', hi: 'युवा रोजगार (ई-ऑटो)' },
  ],
  SHG: [
    { en: 'Skill training', hi: 'कौशल प्रशिक्षण' },
    { en: 'Marketplace listing', hi: 'मार्केटप्लेस लिस्टिंग' },
    { en: 'Exhibitions', hi: 'प्रदर्शनियां' },
    { en: 'Credit linkage', hi: 'ऋण जुड़ाव' },
    { en: 'Food processing', hi: 'खाद्य प्रसंस्करण' },
  ],
  DAIRY: [
    { en: 'Enzybiotic Power Pro', hi: 'एन्ज़ायबायोटिक पावर प्रो' },
    { en: 'Fair milk pricing', hi: 'उचित दुग्ध मूल्य' },
    { en: 'Biogas / CBG unit', hi: 'बायोगैस / CBG यूनिट' },
    { en: 'Organic fertilizer model', hi: 'जैविक खाद मॉडल' },
    { en: 'Tribal dairy project', hi: 'ट्राइबल डेयरी प्रोजेक्ट' },
  ],
}

const schema = z
  .object({
    type: z.enum(['FARMER', 'FPO', 'SHG', 'DAIRY']),
    name: reqText(3, 'Please enter the applicant name'),
    phone,
    email: z.union([z.literal(''), z.string().email('Enter a valid email')]).optional(),
    state: reqText(2, 'Select a state'),
    district: reqText(2, 'District is required'),
    village: z.string().optional(),
    // type specific (strings from inputs)
    landAcres: z.string().optional(),
    crops: z.string().optional(),
    farmingType: z.string().optional(),
    fpoName: z.string().optional(),
    cin: z.string().optional(),
    members: z.string().optional(),
    commodities: z.string().optional(),
    designation: z.string().optional(),
    shgName: z.string().optional(),
    activity: z.string().optional(),
    bankLinked: z.string().optional(),
    unitType: z.string().optional(),
    cattle: z.string().optional(),
    dailyMilk: z.string().optional(),
    breeds: z.string().optional(),
    interests: z.array(z.string()),
    consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm to continue' }) }),
  })
  .superRefine((d, ctx) => {
    const need = (k: keyof typeof d, msg = 'Required') => {
      const v = d[k]
      if (v === undefined || v === '' || (typeof v === 'string' && !v.trim())) ctx.addIssue({ code: 'custom', path: [k], message: msg })
    }
    const num = (k: 'landAcres' | 'members' | 'cattle' | 'dailyMilk') => {
      need(k)
      if (d[k] && (isNaN(Number(d[k])) || Number(d[k]) < 0)) ctx.addIssue({ code: 'custom', path: [k], message: 'Enter a valid number' })
    }
    if (d.type === 'FARMER') {
      num('landAcres')
      need('crops')
      need('farmingType', 'Select farming type')
    }
    if (d.type === 'FPO') {
      need('fpoName')
      num('members')
      need('commodities')
    }
    if (d.type === 'SHG') {
      need('shgName')
      num('members')
      need('activity')
    }
    if (d.type === 'DAIRY') {
      need('unitType', 'Select unit type')
      num('cattle')
      num('dailyMilk')
    }
  })

type Form = z.input<typeof schema>

const list = (s?: string) => (s ?? '').split(',').map((x) => x.trim()).filter(Boolean)

export default function Register() {
  const { t, L, lang } = useLang()
  useDocumentTitle(t('register.pageTitle'))
  const toast = useToast()
  const [params, setParams] = useSearchParams()
  const initial = (TYPES.includes(params.get('type') as RegistrationType) ? params.get('type') : 'FARMER') as RegistrationType
  const [done, setDone] = useState<Registration | null>(null)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { type: initial, state: 'Rajasthan', interests: [], email: '', consent: undefined as unknown as true },
  })
  const type = watch('type') as RegistrationType

  useEffect(() => {
    const q = params.get('type') as RegistrationType
    if (TYPES.includes(q) && q !== type) setValue('type', q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const pick = (k: RegistrationType) => {
    setValue('type', k)
    setValue('interests', [])
    setParams({ type: k }, { replace: true })
  }

  const onSubmit = async (v: Form) => {
    const d: Record<string, string | number | boolean | string[]> = { interests: v.interests }
    if (v.type === 'FARMER') Object.assign(d, { landAcres: Number(v.landAcres), crops: list(v.crops), farmingType: v.farmingType! })
    if (v.type === 'FPO') Object.assign(d, { fpoName: v.fpoName!, cin: v.cin ?? '', members: Number(v.members), commodities: list(v.commodities), designation: v.designation ?? '' })
    if (v.type === 'SHG') Object.assign(d, { shgName: v.shgName!, members: Number(v.members), activity: v.activity!, bankLinked: v.bankLinked === 'yes' })
    if (v.type === 'DAIRY') Object.assign(d, { unitType: v.unitType!, cattle: Number(v.cattle), dailyMilkLitres: Number(v.dailyMilk), breeds: list(v.breeds) })
    try {
      const r = await registrationService.submit({
        type: v.type,
        name: v.name,
        phone: v.phone,
        email: v.email || undefined,
        state: v.state,
        district: v.district,
        village: v.village,
        details: d,
      })
      setDone(r)
      window.scrollTo({ top: 300, behavior: 'smooth' })
    } catch (e) {
      toast('error', e instanceof Error ? e.message : 'Submission failed')
    }
  }

  const cards = [
    { k: 'FARMER' as const, I: Sprout, title: t('register.farmer'), text: t('register.farmerDesc') },
    { k: 'FPO' as const, I: Building2, title: t('register.fpo'), text: t('register.fpoDesc') },
    { k: 'SHG' as const, I: Users, title: t('register.shg'), text: t('register.shgDesc') },
    { k: 'DAIRY' as const, I: Milk, title: t('register.dairy'), text: t('register.dairyDesc') },
  ]

  return (
    <>
      <PageHero title={t('register.pageTitle')} text={t('register.pageText')} image={real.fpoTraining1} crumbs={[{ label: t('nav.join') }]} eyebrow="किसान • युवा • महिला कल्याण" />
      <section className="bg-cream-50 py-16 sm:py-24">
        <div className="container max-w-5xl">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-white text-center shadow-lift">
                <div className="bg-leaf-700 px-8 py-10 text-white">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-gold-300" />
                  <h2 className="mt-4 font-display text-3xl">{t('register.successTitle')}</h2>
                  <p className="mt-2 text-sm text-white/80">{t('register.successText')}</p>
                </div>
                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-mute">{t('register.refNo')}</p>
                  <div className="mt-2 flex items-center justify-center gap-3">
                    <p className="font-display text-3xl tracking-wide text-navy-900">{done.refNo}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(done.refNo).catch(() => {})
                        toast('success', t('common.copied'))
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-cream-100"
                      aria-label={t('common.copy')}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <DemoNotice className="mt-6 text-left" />
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Link to={`/register/track?ref=${done.refNo}`} className="btn-primary">
                      {t('register.trackBtn')}
                    </Link>
                    <button
                      onClick={() => {
                        setDone(null)
                        reset({ type, state: 'Rajasthan', interests: [], email: '', consent: undefined as unknown as true })
                      }}
                      className="btn-outline"
                    >
                      {t('register.another')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="eyebrow">{t('register.chooseType')}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {cards.map(({ k, I, title, text }) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => pick(k)}
                      aria-pressed={type === k}
                      className={cn(
                        'group rounded-2xl border-2 p-5 text-left transition',
                        type === k ? 'border-navy-900 bg-navy-900 text-white shadow-lift' : 'border-navy-900/10 bg-white hover:border-navy-900/30',
                      )}
                    >
                      <I className={cn('h-7 w-7', type === k ? 'text-gold-400' : 'text-leaf-600')} />
                      <p className="mt-4 font-display text-lg">{title}</p>
                      <p className={cn('mt-1 hidden text-xs leading-relaxed sm:block', type === k ? 'text-white/70' : 'text-ink-mute')}>{text}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.75rem] bg-white p-6 shadow-card sm:p-10">
                  <DemoNotice />
                  <p className="mt-8 font-display text-2xl text-navy-900">{t('register.basic')}</p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Input label={type === 'FPO' || type === 'SHG' ? `${t('common.name')} (contact person)` : t('common.name')} {...register('name')} error={errors.name?.message} />
                    <Input label={t('common.phone')} type="tel" inputMode="numeric" {...register('phone')} error={errors.phone?.message} placeholder="98XXXXXXXX" />
                    <Input label={`${t('common.email')} (${t('common.optional')})`} type="email" {...register('email')} error={errors.email?.message} />
                    <Select label={t('common.state')} {...register('state')} error={errors.state?.message} options={INDIAN_STATES.map((s) => ({ value: s, label: s }))} />
                    <Input label={t('common.district')} {...register('district')} error={errors.district?.message} />
                    <Input label={`${t('common.village')} (${t('common.optional')})`} {...register('village')} />
                  </div>

                  <p className="mt-10 font-display text-2xl text-navy-900">
                    {t('register.specific')} — {cards.find((c) => c.k === type)?.title}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div key={type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 grid gap-5 sm:grid-cols-2">
                      {type === 'FARMER' && (
                        <>
                          <Input label={t('register.landAcres')} inputMode="decimal" {...register('landAcres')} error={errors.landAcres?.message} />
                          <Select
                            label={t('register.farmingType')}
                            {...register('farmingType')}
                            error={errors.farmingType?.message}
                            placeholder="—"
                            options={['Conventional', 'Natural / Organic', 'Mixed', 'Polyhouse / Protected'].map((x) => ({ value: x, label: x }))}
                          />
                          <Input label={t('register.crops')} {...register('crops')} error={errors.crops?.message} wrapClassName="sm:col-span-2" placeholder="Wheat, Mustard, Moong" />
                        </>
                      )}
                      {type === 'FPO' && (
                        <>
                          <Input label={t('register.fpoName')} {...register('fpoName')} error={errors.fpoName?.message} wrapClassName="sm:col-span-2" />
                          <Input label={`${t('register.cin')} (${t('common.optional')})`} {...register('cin')} />
                          <Input label={t('register.members')} inputMode="numeric" {...register('members')} error={errors.members?.message} />
                          <Input label={t('register.commodities')} {...register('commodities')} error={errors.commodities?.message} placeholder="Soybean, Wheat" />
                          <Input label={`${t('register.designation')} (${t('common.optional')})`} {...register('designation')} placeholder="CEO / Director" />
                        </>
                      )}
                      {type === 'SHG' && (
                        <>
                          <Input label={t('register.shgName')} {...register('shgName')} error={errors.shgName?.message} />
                          <Input label={t('register.members')} inputMode="numeric" {...register('members')} error={errors.members?.message} />
                          <Input label={t('register.activity')} {...register('activity')} error={errors.activity?.message} placeholder="Jute bags, pickles, handicrafts" />
                          <Select label={t('register.bankLinked')} {...register('bankLinked')} options={[{ value: 'yes', label: t('common.yes') }, { value: 'no', label: t('common.no') }]} />
                        </>
                      )}
                      {type === 'DAIRY' && (
                        <>
                          <Select
                            label={t('register.unitType')}
                            {...register('unitType')}
                            error={errors.unitType?.message}
                            placeholder="—"
                            options={['Individual dairy farmer', 'Milk producer society', 'Gaushala', 'Dairy unit / plant'].map((x) => ({ value: x, label: x }))}
                          />
                          <Input label={t('register.cattle')} inputMode="numeric" {...register('cattle')} error={errors.cattle?.message} />
                          <Input label={t('register.dailyMilk')} inputMode="numeric" {...register('dailyMilk')} error={errors.dailyMilk?.message} />
                          <Input label={`${t('register.breeds')} (${t('common.optional')})`} {...register('breeds')} placeholder="Gir, Sahiwal, Tharparkar" />
                        </>
                      )}
                      <div className="sm:col-span-2">
                        <Controller
                          control={control}
                          name="interests"
                          render={({ field }) => (
                            <CheckChips label={t('register.interests')} value={field.value} onChange={field.onChange} options={INTERESTS[type].map((o) => ({ value: o.en, label: lang === 'hi' ? o.hi : o.en }))} />
                          )}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
                    <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 accent-navy-900" />
                    {t('register.consent')}
                  </label>
                  {errors.consent && <p className="field-error">{errors.consent.message}</p>}

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button className="btn-primary !px-8 !py-4" disabled={isSubmitting}>
                      {isSubmitting && <Spinner className="h-4 w-4" />} {isSubmitting ? t('common.submitting') : t('common.submit')}
                    </button>
                    <Link to="/register/track" className="text-sm font-bold text-leaf-700 hover:underline">
                      {t('nav.track')} →
                    </Link>
                  </div>
                </div>
                <p className="mt-6 text-center text-xs text-ink-mute">{L({ en: 'Fields marked optional can be left blank.', hi: 'वैकल्पिक फ़ील्ड खाली छोड़ सकते हैं।' })}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
