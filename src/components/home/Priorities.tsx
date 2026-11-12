import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Img from '@/components/ui/Img'
import { SectionHeading } from '@/components/ui/Primitives'
import { InitiativeIcon } from '@/components/ui/Brand'
import { initiatives } from '@/data/initiatives'
import { useLang } from '@/hooks/useLang'

export default function Priorities() {
  const { t, L } = useLang()
  const items = initiatives.filter((i) => i.group === 'priority')
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow={t('home.prioritiesEyebrow')}
          title={t('home.prioritiesTitle')}
          text={t('home.prioritiesText')}
          action={
            <Link to="/initiatives" className="btn-outline">
              {t('common.viewAll')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/initiatives/${it.slug}`} className="group relative block h-[420px] overflow-hidden rounded-[1.75rem] bg-navy-900">
                <Img src={it.image} fallback={it.fallback} alt={L(it.title)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" wrapClassName="absolute inset-0" className="transition duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/5 transition duration-500 group-hover:via-navy-950/75" />
                <div className="absolute left-6 top-6 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-gold-300 backdrop-blur-md transition group-hover:bg-gold-500 group-hover:text-navy-950">
                    <InitiativeIcon name={it.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm text-white/60">0{i + 1}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-hindi text-[1.05rem] text-gold-300">{it.hindiTitle}</p>
                  <h3 className="mt-2 font-display text-[1.6rem] leading-tight text-white">{L(it.title)}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                    <p className="overflow-hidden text-sm leading-relaxed text-white/75">
                      <span className="block pt-3">{L(it.summary)}</span>
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                    {t('common.explore')} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
