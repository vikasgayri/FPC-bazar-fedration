import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ClipboardList, Heart, Mail, Phone, User, X } from 'lucide-react'
import { Logo } from '@/components/ui/Brand'
import { LangSwitch } from './Header'
import { useLang } from '@/hooks/useLang'
import { useEscape, useLockBody } from '@/hooks/useUi'
import { mainNav, megaGroups } from './navigation'
import { groupLabel } from '@/data/initiatives'
import { org } from '@/data/site'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils/format'

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, L } = useLang()
  const { user } = useAuth()
  const [expanded, setExpanded] = useState<string | null>(null)
  useLockBody(open)
  useEscape(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-navy-950 text-white"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Logo light compact />
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10" aria-label={t('nav.close')}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="divide-y divide-white/10">
                {mainNav.map((item, idx) => {
                  const sub = item.mega
                    ? megaGroups.flatMap((g) => [{ header: L(groupLabel[g.group]) }, ...g.items.map((i) => ({ to: `/initiatives/${i.slug}`, label: L(i.title) }))])
                    : item.children?.map((c) => ({ to: c.to, label: c.labelKey ? t(c.labelKey) : L(c.label) }))
                  const isOpen = expanded === item.to
                  return (
                    <motion.li key={item.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + idx * 0.04 }}>
                      <div className="flex items-center justify-between">
                        <Link to={item.to} onClick={onClose} className="flex-1 py-4 font-display text-[1.6rem] leading-none">
                          {t(item.labelKey)}
                        </Link>
                        {sub && (
                          <button onClick={() => setExpanded(isOpen ? null : item.to)} className="grid h-10 w-10 place-items-center rounded-full bg-white/5" aria-label="Expand" aria-expanded={isOpen}>
                            <ChevronDown className={cn('h-5 w-5 transition', isOpen && 'rotate-180')} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {sub && isOpen && (
                          <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="pb-4">
                              {sub.map((s, i) =>
                                'header' in s ? (
                                  <li key={i} className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                                    {s.header}
                                  </li>
                                ) : (
                                  <li key={i}>
                                    <Link to={s.to!} onClick={onClose} className="block py-2 text-sm text-white/75 hover:text-white">
                                      {s.label}
                                    </Link>
                                  </li>
                                ),
                              )}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  )
                })}
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-2 text-xs font-semibold">
                <Link to="/bazaar/enquiry" onClick={onClose} className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 py-4">
                  <ClipboardList className="h-5 w-5 text-gold-400" /> {t('nav.cart')}
                </Link>
                <Link to="/wishlist" onClick={onClose} className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 py-4">
                  <Heart className="h-5 w-5 text-gold-400" /> {t('nav.wishlist')}
                </Link>
                <Link to={user ? '/account' : '/login'} onClick={onClose} className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 py-4">
                  <User className="h-5 w-5 text-gold-400" /> {user ? t('nav.account') : t('nav.login')}
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/register" onClick={onClose} className="btn-gold flex-1">
                  {t('nav.join')}
                </Link>
                <Link to="/partner" onClick={onClose} className="btn-ghost-light flex-1">
                  {t('nav.partner')}
                </Link>
              </div>
            </div>

            <div className="space-y-3 border-t border-white/10 px-5 py-5 text-sm text-white/70">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Language / भाषा</span>
                <LangSwitch light />
              </div>
              <a href={`tel:${org.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-400" /> {org.phones[0]}
              </a>
              <a href={`mailto:${org.emails[0]}`} className="flex items-center gap-2 break-all">
                <Mail className="h-4 w-4 text-gold-400" /> {org.emails[0]}
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
