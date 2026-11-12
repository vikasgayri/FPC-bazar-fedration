import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react'
import Img from '@/components/ui/Img'
import { groupLabel, initiatives } from '@/data/initiatives'
import { useLang } from '@/hooks/useLang'
import { real } from '@/data/images'

/** Dark band with horizontally scrolling initiative cards (inspired by the reference's "Social Missions" rail). */
export default function MissionsScroller() {
  const { t, L } = useLang()
  const rail = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const items = initiatives.filter((i) => i.group !== 'priority')

  const scrollBy = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * (rail.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <section ref={section} className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-[0.12]">
        <Img src={real.fpoTraining2} alt="" wrapClassName="h-[120%] w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/80 to-navy-950" />
      <div className="relative">
        <div className="container flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-hindi text-2xl text-gold-400 sm:text-3xl">सहकार से समृद्धि।</p>
            <p className="eyebrow eyebrow-light mt-6">{t('home.missionsEyebrow')}</p>
            <h2 className="mt-4 font-display text-[2.2rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[3rem] text-balance">{t('home.missionsTitle')}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-3 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 sm:flex">
              <MoveHorizontal className="h-4 w-4" /> {t('home.missionsDrag')}
            </span>
            <button onClick={() => scrollBy(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition hover:bg-white hover:text-navy-900" aria-label="Previous">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scrollBy(1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition hover:bg-white hover:text-navy-900" aria-label="Next">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={rail} className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:px-8 xl:px-[max(2.5rem,calc((100vw_-_1320px)/2_+_2.5rem))]">
          {items.map((it, i) => (
            <motion.div
              key={it.slug}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: Math.min(i, 4) * 0.08 }}
              className="w-[82vw] shrink-0 snap-start sm:w-[380px]"
            >
              <Link to={`/initiatives/${it.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Img src={it.image} fallback={it.fallback} alt={L(it.title)} sizes="(min-width: 640px) 380px, 82vw" wrapClassName="aspect-[4/3]" className="transition duration-[1.2s] group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-navy-950/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
                    {L(groupLabel[it.group])}
                  </span>
                </div>
                <div className="pt-6">
                  <p className="font-hindi text-sm text-gold-400/90">{it.hindiTitle}</p>
                  <h3 className="mt-2 font-display text-[1.45rem] leading-snug transition group-hover:text-gold-300">{L(it.title)}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">{L(it.summary)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-gold-500/60 pb-1 text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                    {t('common.readMore')} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
          <div className="w-1 shrink-0" />
        </div>
      </div>
    </section>
  )
}
