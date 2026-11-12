import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, Target, Crosshair } from 'lucide-react'
import Img from '@/components/ui/Img'
import { Reveal, RevealImage } from '@/components/ui/Motion'
import { Ornament } from '@/components/ui/Primitives'
import { useLang } from '@/hooks/useLang'
import { about, missionVision, org } from '@/data/site'
import { real, stock } from '@/data/images'

export function MottoMarquee() {
  const { L } = useLang()
  const words = [org.motto.hi, org.tagline.en, L(org.slogan), 'सहकारिता • रोजगार • विकास', 'Sustainable • Inclusive • Self-Reliant']
  const row = [...words, ...words]
  return (
    <div className="relative overflow-hidden border-y border-gold-500/20 bg-gold-50 py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl text-navy-900/80 sm:text-2xl">
            {w}
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-gold-500" aria-hidden>
              <path fill="currentColor" d="M12 2c1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7 4-1 6-3 7-7Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AboutIntro() {
  const { t, L } = useLang()
  const pillars = [
    [t('home.pillarsA'), t('home.pillarsA2')],
    [t('home.pillarsB'), t('home.pillarsB2')],
    [t('home.pillarsC'), t('home.pillarsC2')],
  ]
  const cards = [
    { I: Target, title: t('about.mission'), text: L(missionVision.mission) },
    { I: Eye, title: t('about.vision'), text: L(missionVision.vision) },
    { I: Crosshair, title: t('about.objective'), text: L(missionVision.objective) },
  ]

  return (
    <section className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-gold-100/60 blur-3xl" />
      <div className="container relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="eyebrow">{t('home.visionEyebrow')}</span>
          </Reveal>
          <div className="mt-8 space-y-1">
            {pillars.map(([a, b], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-baseline gap-x-4"
              >
                <span className="font-display text-[2.4rem] font-light leading-[1.05] text-navy-900/30 sm:text-[3.6rem]">{a}</span>
                <span className="font-display text-[2.4rem] font-semibold uppercase leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-[3.6rem]">{b}</span>
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Ornament className="mt-8" />
            <p className="lead mt-8 max-w-xl">{L(about.intro)}</p>
            <p className="mt-5 font-hindi text-lg text-leaf-700">“{org.motto.hi}”</p>
            <Link to="/about" className="btn-primary group mt-8">
              {t('home.aboutCta')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-xl">
            <RevealImage className="overflow-hidden rounded-[2rem] shadow-lift">
              <Img src={stock.womenInField} fallback={real.fieldVisit} alt="Rural women in a field" sizes="(min-width: 1024px) 40vw, 100vw" wrapClassName="aspect-[4/5]" />
            </RevealImage>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -bottom-10 -left-4 w-[52%] overflow-hidden rounded-3xl border-[6px] border-cream-50 shadow-lift sm:-left-12"
            >
              <Img src={real.fpoTraining1} alt="Farmer training session" sizes="(min-width: 1024px) 20vw, 50vw" wrapClassName="aspect-[4/3]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -right-2 top-8 grid h-32 w-32 place-items-center rounded-full bg-navy-900 text-center text-white shadow-lift sm:-right-8 sm:h-36 sm:w-36"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Est.</p>
                <p className="font-display text-4xl leading-none">{org.registeredYear}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">Jaipur</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container relative mt-28 grid gap-5 md:grid-cols-3">
        {cards.map(({ I, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1} className="group relative overflow-hidden rounded-3xl border border-navy-900/5 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
            <span className="absolute right-6 top-6 font-display text-6xl leading-none text-navy-900/[0.04]">0{i + 1}</span>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
              <I className="h-5 w-5" />
            </span>
            <h3 className="mt-6 font-display text-2xl text-navy-900">{title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
