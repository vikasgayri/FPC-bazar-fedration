import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Img from './Img'
import { Breadcrumb } from './Primitives'
import { useLang } from '@/hooks/useLang'

/** Inner-page banner — full-bleed photograph, navy gradient, breadcrumb and large serif title. */
export default function PageHero({
  title,
  text,
  image,
  fallback,
  crumbs,
  eyebrow,
  children,
  size = 'md',
}: {
  title: ReactNode
  text?: ReactNode
  image: string
  fallback?: string
  crumbs: { label: string; to?: string }[]
  eyebrow?: string
  children?: ReactNode
  size?: 'sm' | 'md'
}) {
  const { t } = useLang()
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <Img src={image} fallback={fallback} alt="" loading="eager" wrapClassName="absolute inset-0 -z-10" className="scale-105 opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
      <div className="absolute inset-0 -z-10 bg-grain opacity-60" />
      <div className={`container ${size === 'sm' ? 'pb-14 pt-36 sm:pt-40' : 'pb-20 pt-40 sm:pb-24 sm:pt-48'}`}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="max-w-3xl">
          <Breadcrumb items={[{ label: t('nav.home'), to: '/' }, ...crumbs]} />
          {eyebrow && <p className="mt-6 font-hindi text-lg text-gold-400">{eyebrow}</p>}
          <h1 className="mt-4 font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-[3.4rem] lg:text-[4rem] text-balance">
            {title}
          </h1>
          {text && <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">{text}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-gold-500 via-saffron-500 to-leaf-600" />
    </section>
  )
}
