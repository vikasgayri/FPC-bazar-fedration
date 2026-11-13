import { safeNext } from '@/utils/format'
import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound } from 'lucide-react'
import AuthShell from '@/components/layout/AuthShell'
import { Input } from '@/components/forms/Field'
import { DemoNotice, Spinner } from '@/components/ui/Primitives'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { loginSchema, type LoginForm } from '@/utils/validation'
import { DEMO_CUSTOMER } from '@/mocks/users'
import { real, stock } from '@/data/images'

export default function Login() {
  const { t } = useLang()
  useDocumentTitle(t('nav.login'))
  const { login, user } = useAuth()
  const toast = useToast()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const [err, setErr] = useState<string | null>(null)
  const next = safeNext(params.get('next'))
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  if (user) return <Navigate to={next} replace />

  const onSubmit = async (v: LoginForm) => {
    setErr(null)
    try {
      const s = await login(v.email, v.password)
      toast('success', t('account.hello', { name: s.user.name }))
      nav(next, { replace: true })
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Login failed')
    }
  }

  return (
    <AuthShell title={t('auth.loginTitle')} text={t('auth.loginText')} image={stock.womanSari} fallback={real.shgProductsStall}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Input label={t('common.email')} type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
        <Input label={t('auth.password')} type="password" autoComplete="current-password" {...register('password')} error={errors.password?.message} />
        {err && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{err}</p>}
        <button className="btn-primary w-full !py-3.5" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="h-4 w-4" />} {t('auth.loginBtn')}
        </button>
      </form>
      <div className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-50 p-4">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600">
          <KeyRound className="h-4 w-4" /> {t('auth.demoCreds')}
        </p>
        <p className="mt-2 text-sm text-navy-900">
          {DEMO_CUSTOMER.email} / {DEMO_CUSTOMER.password}
        </p>
        <button
          type="button"
          onClick={() => {
            setValue('email', DEMO_CUSTOMER.email)
            setValue('password', DEMO_CUSTOMER.password)
          }}
          className="mt-3 text-sm font-bold text-leaf-700 hover:underline"
        >
          {t('auth.useDemo')} →
        </button>
      </div>
      <DemoNotice className="mt-4">{t('auth.simulatedAuth')}</DemoNotice>
      <p className="mt-6 text-sm text-ink-soft">
        {t('auth.noAccount')}{' '}
        <Link to={`/signup?next=${encodeURIComponent(next)}`} className="font-bold text-navy-900 hover:underline">
          {t('auth.registerBtn')}
        </Link>
      </p>
    </AuthShell>
  )
}
