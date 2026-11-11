import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Mail, Menu, Phone, ShieldCheck, ShoppingBag, User, ArrowUpRight } from 'lucide-react'
import { Logo, InitiativeIcon } from '@/components/ui/Brand'
import { useScrolled } from '@/hooks/useUi'
import { useLang } from '@/hooks/useLang'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { org } from '@/data/site'
import { groupLabel } from '@/data/initiatives'
import { real } from '@/data/images'
import { mainNav, megaGroups } from './navigation'
import MobileMenu from './MobileMenu'
import Img from '@/components/ui/Img'
import { cn } from '@/utils/format'

export function LangSwitch({ light, className }: { light?: boolean; className?: string }) {
  const { lang, setLang } = useLang()
  return (
    <div className={cn('inline-flex items-center rounded-full p-0.5 text-[11px] font-bold', light ? 'bg-white/10' : 'bg-navy-900/5', className)} role="group" aria-label="Language">
      {(['en', 'hi'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            'rounded-full px-3 py-1 transition',
            lang === l ? (light ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-white') : light ? 'text-white/70 hover:text-white' : 'text-navy-900/60 hover:text-navy-900',
          )}
        >
          {l === 'en' ? 'EN' : 'हिं'}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const scrolled = useScrolled(40)
  const { t, L } = useLang()
  const { count, setDrawerOpen, wishlist } = useCart()
  const { user } = useAuth()
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname, hash])

  const lightTop = ['/login', '/signup'].includes(pathname) || pathname.startsWith('/bazaar/order')
  const solid = scrolled || open !== null || lightTop
  const iconBtn = cn(
    'relative grid h-10 w-10 place-items-center rounded-full transition',
    solid ? 'text-navy-900 hover:bg-navy-900/5' : 'text-white hover:bg-white/10',
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setOpen(null)}>
        {/* Utility bar */}
        <div className={cn('hidden overflow-hidden bg-navy-950 text-white/75 transition-all duration-500 lg:block', scrolled ? 'max-h-0' : 'max-h-10')}>
          <div className="container flex h-10 items-center justify-between text-[12px]">
            <div className="flex items-center gap-6">
              <a href={`tel:${org.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-3.5 w-3.5 text-gold-400" /> {t('top.helpline')}: {org.phones[0]}
              </a>
              <a href={`mailto:${org.emails[0]}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-3.5 w-3.5 text-gold-400" /> {org.emails[0]}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400" /> {t('top.registered')}
              </span>
              <Link to="/partner" className="hover:text-white">
                {t('nav.partner')}
              </Link>
              <Link to="/register/track" className="hover:text-white">
                {t('nav.track')}
              </Link>
              <LangSwitch light />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            'relative transition-all duration-500',
            solid ? 'bg-white/95 shadow-[0_8px_30px_-12px_rgba(11,37,69,0.25)] backdrop-blur-xl' : 'bg-gradient-to-b from-navy-950/70 to-transparent',
          )}
        >
          <div className={cn('container flex items-center justify-between gap-2 transition-all duration-500 sm:gap-6', scrolled ? 'h-[76px]' : 'h-[92px]')}>
            <Logo light={!solid} compact={scrolled} />

            <nav className="hidden items-center xl:flex" aria-label="Primary">
              {mainNav.map((item) => {
                const has = !!(item.children || item.mega)
                return (
                  <div key={item.to} className="relative" onMouseEnter={() => setOpen(has ? item.to : null)}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[12.5px] font-bold uppercase tracking-[0.08em] transition-colors',
                          solid ? 'text-navy-900' : 'text-white',
                          isActive && (solid ? 'text-leaf-700' : 'text-gold-400'),
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {t(item.labelKey)}
                          {has && <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open === item.to && 'rotate-180')} />}
                          <span className={cn('absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-gold-500 transition-transform duration-300', isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')} />
                        </>
                      )}
                    </NavLink>

                    <AnimatePresence>
                      {open === item.to && item.children && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full w-72 pt-3"
                        >
                          <div className="overflow-hidden rounded-2xl border border-navy-900/5 bg-white p-2 shadow-lift">
                            {item.children.map((c) => (
                              <Link key={c.key} to={c.to} className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-cream-100">
                                {c.labelKey ? t(c.labelKey) : L(c.label)}
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              <Link to="/wishlist" className={cn(iconBtn, 'hidden sm:grid')} aria-label={t('nav.wishlist')}>
                <Heart className="h-[19px] w-[19px]" />
                {wishlist.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-saffron-500" />}
              </Link>
              <button onClick={() => setDrawerOpen(true)} className={iconBtn} aria-label={t('nav.cart')}>
                <ShoppingBag className="h-[19px] w-[19px]" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-extrabold text-navy-950">{count}</span>
                )}
              </button>
              <Link to={user ? '/account' : '/login'} className={cn(iconBtn, 'hidden sm:grid')} aria-label={t('nav.account')}>
                <User className="h-[19px] w-[19px]" />
              </Link>
              <Link to="/register" className="btn-gold ml-2 hidden whitespace-nowrap !px-5 !py-2.5 lg:inline-flex">
                {t('nav.join')}
              </Link>
              <button onClick={() => setMobile(true)} className={cn(iconBtn, 'xl:hidden')} aria-label={t('nav.menu')}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mega menu: initiatives */}
          <AnimatePresence>
            {open === '/initiatives' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-0 top-full hidden border-t border-navy-900/5 bg-white shadow-lift xl:block"
                onMouseEnter={() => setOpen('/initiatives')}
              >
                <div className="container grid grid-cols-12 gap-8 py-10">
                  {megaGroups.map((g) => (
                    <div key={g.group} className="col-span-3">
                      <p className="eyebrow mb-4">{L(groupLabel[g.group])}</p>
                      <ul className="space-y-1">
                        {g.items.map((i) => (
                          <li key={i.slug}>
                            <Link to={`/initiatives/${i.slug}`} className="group flex items-start gap-3 rounded-xl p-2 hover:bg-cream-100">
                              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700 transition group-hover:bg-navy-900 group-hover:text-gold-400">
                                <InitiativeIcon name={i.icon} className="h-4 w-4" />
                              </span>
                              <span className="text-[13px] font-semibold leading-snug text-navy-900">{L(i.title)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link to="/initiatives" className="group relative col-span-3 overflow-hidden rounded-2xl">
                    <Img src={real.fpoTraining2} alt="" wrapClassName="absolute inset-0" className="transition duration-700 group-hover:scale-105" overlay />
                    <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6 text-white">
                      <p className="font-hindi text-gold-400">जहर मुक्त कृषि • स्वस्थ भारत</p>
                      <p className="mt-2 font-display text-2xl leading-tight">{t('initiatives.pageTitle')}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                        {t('common.viewAll')} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  )
}
