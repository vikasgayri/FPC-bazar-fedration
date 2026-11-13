import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/Primitives'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { fpoServices, network } from '@/data/services'
import { useLang } from '@/hooks/useLang'

/** Home: what the federation does for its FPO network (non-profit facilitator). */
export default function FpoServices() {
  const { t, L } = useLang()
  const n = (v: number) => v.toLocaleString('en-IN')
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-leaf-700/20 blur-3xl" />
      <div className="container relative">
        <SectionHeading
          light
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          text={t('services.text')}
          action={
            <Link to="/fpo-services" className="btn-gold group">
              {t('services.cta')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-3">
          {[
            { v: `${n(network.fpos)}+`, l: t('services.statFpos') },
            { v: String(network.states), l: t('services.statStates') },
            { v: t('services.statNpValue'), l: t('services.statNp') },
          ].map((s) => (
            <div key={s.l} className="bg-navy-950 px-6 py-7 sm:px-8">
              <p className="font-display text-[2.4rem] leading-none text-gold-400 sm:text-[2.8rem]">{s.v}</p>
              <p className="mt-3 text-sm font-semibold text-white/75">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fpoServices.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/fpo-services#${s.key}`} className="group flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 transition hover:border-gold-400/40 hover:bg-white/[0.07]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500/15 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                  <ServiceIcon name={s.key} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-[1.45rem] leading-tight">{L(s.title)}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{L(s.text)}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                  {t('common.learnMore')} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
