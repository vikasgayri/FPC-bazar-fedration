import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Img from '@/components/ui/Img'
import { Logo } from '@/components/ui/Brand'
import { org } from '@/data/site'

/** Split-screen shell for login / signup / admin login. */
export default function AuthShell({ title, text, image, fallback, children, dark }: { title: string; text: string; image: string; fallback?: string; children: ReactNode; dark?: boolean }) {
  return (
    <section className={`min-h-screen ${dark ? 'bg-navy-950' : 'bg-cream-50'} pt-24 lg:pt-0`}>
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:block">
          <Img src={image} fallback={fallback} alt="" wrapClassName="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/20" />
          <div className="absolute inset-x-0 bottom-0 p-12 text-white">
            <p className="font-hindi text-2xl text-gold-400">{org.motto.hi}</p>
            <p className="mt-4 max-w-md font-display text-3xl leading-snug">{org.slogan.en}</p>
          </div>
        </div>
        <div className="flex items-center justify-center px-5 py-16 sm:px-10 lg:pt-36">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
            {dark && <Logo light />}
            <h1 className={`mt-8 font-display text-[2.2rem] leading-tight ${dark ? 'text-white' : 'text-navy-900'}`}>{title}</h1>
            <p className={`mt-2 ${dark ? 'text-white/60' : 'text-ink-soft'}`}>{text}</p>
            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
