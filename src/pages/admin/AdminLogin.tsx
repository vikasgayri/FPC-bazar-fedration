import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react'
import AuthShell from '@/components/layout/AuthShell'
import { Spinner } from '@/components/ui/Primitives'
import { useAuth } from '@/context/AuthContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { loginSchema, type LoginForm } from '@/utils/validation'
import { DEMO_ADMIN } from '@/mocks/users'
import { real } from '@/data/images'

export default function AdminLogin() {
  const { t } = useLang()
  useDocumentTitle(t('auth.adminTitle'))
  const { admin, adminLogin } = useAuth()
  const nav = useNavigate()
  const [err, setErr] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })
  if (admin) return <Navigate to="/admin" replace />

  const dark = 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold-500'
  return (
    <AuthShell dark title={t('auth.adminTitle')} text={t('auth.adminText')} image={real.ngoGroup}>
      <form
        onSubmit={handleSubmit(async (v) => {
          setErr(null)
          try {
            await adminLogin(v.email, v.password)
            nav('/admin', { replace: true })
          } catch (e) {
            setErr(e instanceof Error ? e.message : 'Login failed')
          }
        })}
        noValidate
        className="space-y-5"
      >
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/70" htmlFor="ae">
            {t('common.email')}
          </label>
          <input id="ae" type="email" {...register('email')} className={dark} autoComplete="username" />
          {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/70" htmlFor="ap">
            {t('auth.password')}
          </label>
          <input id="ap" type="password" {...register('password')} className={dark} autoComplete="current-password" />
          {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>}
        </div>
        {err && <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">{err}</p>}
        <button className="btn-gold w-full !py-3.5" disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />} {t('auth.loginBtn')}
        </button>
      </form>
      <div className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4 text-white">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
          <KeyRound className="h-4 w-4" /> {t('auth.demoCreds')}
        </p>
        <p className="mt-2 text-sm">
          {DEMO_ADMIN.email} / {DEMO_ADMIN.password}
        </p>
        <button
          type="button"
          onClick={() => {
            setValue('email', DEMO_ADMIN.email)
            setValue('password', DEMO_ADMIN.password)
          }}
          className="mt-3 text-sm font-bold text-gold-400 hover:underline"
        >
          {t('auth.useDemo')} →
        </button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-white/50">{t('auth.simulatedAuth')}</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> {t('admin.viewSite')}
      </Link>
    </AuthShell>
  )
}
