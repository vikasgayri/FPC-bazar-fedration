import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutDashboard, Package, ShoppingCart, ClipboardList, MessagesSquare, Newspaper, Images, LogOut, ExternalLink, RotateCcw, Menu, X, FlaskConical } from 'lucide-react'
import { Logo } from '@/components/ui/Brand'
import { LangSwitch } from '@/components/layout/Header'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/hooks/useLang'
import { adminService } from '@/services/adminService'
import { cn } from '@/utils/format'

export default function AdminLayout() {
  const { admin, adminLogout } = useAuth()
  const { t } = useLang()
  const toast = useToast()
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])

  if (!admin) return <Navigate to="/admin/login" replace />

  const links = [
    { to: '/admin', I: LayoutDashboard, l: t('admin.dashboard'), end: true },
    { to: '/admin/orders', I: ShoppingCart, l: t('admin.orders') },
    { to: '/admin/products', I: Package, l: t('admin.products') },
    { to: '/admin/registrations', I: ClipboardList, l: t('admin.registrations') },
    { to: '/admin/enquiries', I: MessagesSquare, l: t('admin.enquiries') },
    { to: '/admin/news', I: Newspaper, l: t('admin.news') },
    { to: '/admin/gallery', I: Images, l: t('admin.gallery') },
  ]

  const Side = (
    <div className="flex h-full flex-col bg-navy-950 text-white">
      <div className="border-b border-white/10 p-5">
        <Logo light compact />
      </div>
      <p className="px-6 pb-2 pt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">{t('admin.console')}</p>
      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ to, I, l, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition', isActive ? 'bg-gold-500 text-navy-950' : 'text-white/70 hover:bg-white/5 hover:text-white')}>
            <I className="h-4 w-4" /> {l}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <Link to="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white">
          <ExternalLink className="h-4 w-4" /> {t('admin.viewSite')}
        </Link>
        <button
          onClick={() => {
            if (confirm(t('admin.resetConfirm'))) {
              adminService.resetDemoData()
              toast('success', t('admin.reset'))
              setTimeout(() => window.location.reload(), 300)
            }
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" /> {t('admin.reset')}
        </button>
        <button
          onClick={() => {
            adminLogout()
            nav('/admin/login')
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> {t('nav.logout')}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream-50 lg:pl-72">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">{Side}</aside>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy-950/60" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3 }} className="absolute inset-y-0 left-0 w-72">
              {Side}
              <button onClick={() => setOpen(false)} className="absolute right-3 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-navy-900/5 bg-white/90 px-4 py-3 backdrop-blur sm:px-8">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream-100 lg:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-saffron-600">
            <FlaskConical className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Demo admin —</span> local data only
          </span>
        </div>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-navy-900">{admin.name}</p>
            <p className="text-[11px] text-ink-mute">{admin.email}</p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-900 font-display text-gold-400">A</span>
        </div>
      </header>
      <main className="p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}
