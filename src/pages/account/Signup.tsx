import { safeNext } from '@/utils/format'
import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import AuthShell from '@/components/layout/AuthShell'
import { Input } from '@/components/forms/Field'
import { DemoNotice, Spinner } from '@/components/ui/Primitives'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { signupSchema, type SignupForm } from '@/utils/validation'
import { real, stock } from '@/data/images'

export default function Signup() {
  const { t } = useLang()
  useDocumentTitle(t('auth.registerTitle'))
  const { register: signup, user } = useAuth()
  const toast = useToast()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const [err, setErr] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm, unknown, z.output<typeof signupSchema>>({ resolver: zodResolver(signupSchema) })

  if (user) return <Navigate to={next} replace />

  const onSubmit = async (v: z.output<typeof signupSchema>) => {
    setErr(null)
    try {
      await signup({ name: v.name, email: v.email, phone: v.phone, password: v.password })
      toast('success', t('account.hello', { name: v.name }), t('common.demoMode'))
      nav(next, { replace: true })
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Registration failed')
    }
  }

  return (
    <AuthShell title={t('auth.registerTitle')} text={t('auth.registerText')} image={stock.vegBaskets} fallback={real.produceExhibit}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
        <Input label={t('common.name')} autoComplete="name" {...register('name')} error={errors.name?.message} wrapClassName="sm:col-span-2" />
        <Input label={t('common.email')} type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
        <Input label={t('common.phone')} type="tel" inputMode="numeric" autoComplete="tel" {...register('phone')} error={errors.phone?.message} />
        <Input label={t('auth.password')} type="password" autoComplete="new-password" {...register('password')} error={errors.password?.message} />
        <Input label={t('auth.confirmPassword')} type="password" autoComplete="new-password" {...register('confirm')} error={errors.confirm?.message} />
        {err && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 sm:col-span-2">{err}</p>}
        <button className="btn-primary w-full !py-3.5 sm:col-span-2" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="h-4 w-4" />} {t('auth.registerBtn')}
        </button>
      </form>
      <DemoNotice className="mt-6">{t('auth.simulatedAuth')}</DemoNotice>
      <p className="mt-6 text-sm text-ink-soft">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="font-bold text-navy-900 hover:underline">
          {t('auth.loginBtn')}
        </Link>
      </p>
    </AuthShell>
  )
}
