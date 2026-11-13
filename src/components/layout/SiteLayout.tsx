import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import EnquiryDrawer from '@/components/shop/EnquiryDrawer'
import { org } from '@/data/site'
import { useScrolled } from '@/hooks/useUi'
import { useLang } from '@/hooks/useLang'

export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const tryScroll = (n = 0) => {
        const el = document.getElementById(hash.slice(1))
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
        else if (n < 10) setTimeout(() => tryScroll(n + 1), 80)
      }
      tryScroll()
    } else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

export default function SiteLayout() {
  const far = useScrolled(900)
  const { t } = useLang()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <EnquiryDrawer />

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {far && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy-900 shadow-lift"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <a
          href={`https://wa.me/${org.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="group flex h-14 items-center gap-2 rounded-full bg-leaf-600 pl-4 pr-5 text-white shadow-lift transition hover:bg-leaf-700"
          aria-label={t('contact.whatsapp')}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
