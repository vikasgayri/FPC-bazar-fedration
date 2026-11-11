import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Quote } from 'lucide-react'
import Img from '@/components/ui/Img'
import { Reveal, RevealImage } from '@/components/ui/Motion'
import { Ornament } from '@/components/ui/Primitives'
import { InitiativeIcon } from '@/components/ui/Brand'
import { getInitiative } from '@/data/initiatives'
import { chairman } from '@/data/site'
import { real, stock } from '@/data/images'
import { useLang } from '@/hooks/useLang'

/** Alternating image / text feature: PPP zero-investment model. */
export function PppFeature() {
  const { t, L } = useLang()
  const it = getInitiative('ppp-zero-investment')!
  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <RevealImage className="overflow-hidden rounded-[2rem]">
            <Img src={real.polyhouseCrop} fallback={stock.greenhouse} alt="Polyhouse cultivation" wrapClassName="aspect-[5/6] sm:aspect-[4/4.4]" />
          </RevealImage>
          <div className="absolute -bottom-8 right-4 grid grid-cols-3 gap-3 sm:right-[-2rem]">
            {[real.polyhouseVisit, real.biogasPlant, real.tribalDairyProject].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }}
                className="overflow-hidden rounded-2xl border-4 border-cream-50 shadow-lift"
              >
                <Img src={src} alt="" wrapClassName="h-20 w-24 sm:h-28 sm:w-32" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="pt-8 lg:pt-0">
          <Reveal>
            <span className="eyebrow">{t('home.pppEyebrow')}</span>
            <h2 className="mt-4 font-display text-[2.2rem] font-medium leading-[1.08] tracking-[-0.02em] text-navy-900 sm:text-[3rem]">{t('home.pppTitle')}</h2>
            <p className="mt-3 font-hindi text-xl text-leaf-700">बिना किसी इन्वेस्टमेंट के यूनिट लगा कर देने का कार्य</p>
            <p className="lead mt-6">{t('home.pppText')}</p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {it.highlights.map((h, i) => (
              <Reveal key={i} delay={i * 0.06} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold text-navy-900">{L(h)}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
            <Link to={`/initiatives/${it.slug}`} className="btn-primary group">
              {t('common.learnMore')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <div className="rounded-2xl border-2 border-dashed border-gold-500/50 px-5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">Beneficiary investment</p>
              <p className="font-display text-2xl text-navy-900">₹0</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Gaushala → organic fertilizer circular model. Image right. */
export function OrganicModel() {
  const { t, L } = useLang()
  const it = getInitiative('gaushala-organic-fertilizer')!
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:order-2">
          <RevealImage from="right" className="relative overflow-hidden rounded-[2rem]">
            <Img src={stock.soilHands} fallback={real.fieldVisit} alt="Healthy soil" wrapClassName="aspect-[4/3.6]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-5 backdrop-blur-md">
              <div className="grid grid-cols-3 divide-x divide-navy-900/10 text-center">
                {it.highlights.map((h, i) => (
                  <p key={i} className="px-2 text-[11px] font-bold leading-snug text-navy-900 sm:text-xs">
                    {L(h)}
                  </p>
                ))}
              </div>
            </div>
          </RevealImage>
        </div>
        <div className="lg:col-span-6 lg:order-1">
          <Reveal>
            <span className="eyebrow">{t('home.modelEyebrow')}</span>
            <h2 className="mt-4 font-display text-[2.2rem] font-medium leading-[1.08] tracking-[-0.02em] text-navy-900 sm:text-[3rem]">{t('home.modelTitle')}</h2>
            <p className="mt-3 font-hindi text-xl text-leaf-700">{it.hindiTitle}</p>
            <p className="lead mt-6">{L(it.summary)}</p>
          </Reveal>
          <ol className="relative mt-10 space-y-0">
            {it.steps!.map((s, i) => (
              <Reveal key={i} delay={i * 0.08} className="relative flex gap-5 pb-7 last:pb-0">
                {i < it.steps!.length - 1 && <span className="absolute left-[19px] top-11 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-gold-500 to-gold-500/10" />}
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500 bg-gold-50 font-display text-sm text-navy-900">{i + 1}</span>
                <div>
                  <p className="font-display text-lg text-navy-900">{L(s.title)}</p>
                  <p className="mt-1 text-sm text-ink-soft">{L(s.text)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <Link to={`/initiatives/${it.slug}`} className="btn-outline group mt-10">
              {t('common.learnMore')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Agribusiness cluster centre: six services orbiting a central image. */
export function ClusterCentre() {
  const { t, L } = useLang()
  const it = getInitiative('agri-business-cluster')!
  const icons = ['warehouse', 'store', 'flask', 'building', 'youth', 'truck'] as const
  const left = it.steps!.slice(0, 3)
  const right = it.steps!.slice(3)
  const Node = ({ s, i }: { s: (typeof left)[number]; i: number }) => (
    <Reveal delay={i * 0.08} className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-gold-500/50 hover:bg-white/[0.08]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
        <InitiativeIcon name={icons[i]} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">0{i + 1}</p>
        <p className="mt-1 font-display text-lg leading-snug text-white">{L(s.title)}</p>
        <p className="mt-1 text-sm text-white/60">{L(s.text)}</p>
      </div>
    </Reveal>
  )
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.15),transparent_60%)]" />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow eyebrow-light justify-center">{t('home.clusterEyebrow')}</span>
            <h2 className="mt-4 font-display text-[2.2rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[3rem] text-balance">{t('home.clusterTitle')}</h2>
            <p className="mt-3 font-hindi text-xl text-gold-400">एक केंद्र • अनेक समाधान • किसान सशक्तिकरण</p>
            <p className="mt-5 text-white/70">{t('home.clusterText')}</p>
          </Reveal>
        </div>
        <div className="mt-16 grid items-center gap-6 lg:grid-cols-[1fr_1.1fr_1fr]">
          <div className="space-y-4">
            {left.map((s, i) => (
              <Node key={i} s={s} i={i} />
            ))}
          </div>
          <Reveal className="relative order-first lg:order-none">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-gold-500/30" />
              <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-gold-500/40">
                <Img src={stock.wheatField} fallback={real.fpoVisit} alt="Agribusiness cluster" wrapClassName="h-full w-full" />
              </div>
              <div className="absolute inset-x-0 -bottom-2 mx-auto w-max rounded-full bg-gold-500 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-navy-950 shadow-lift">
                Agribusiness Cluster Centre
              </div>
            </div>
          </Reveal>
          <div className="space-y-4">
            {right.map((s, i) => (
              <Node key={i} s={s} i={i + 3} />
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {it.highlights.map((h, i) => (
            <Reveal key={i} delay={i * 0.08} className="rounded-2xl border border-gold-500/20 bg-gold-500/[0.06] p-5 text-center">
              <p className="font-display text-lg text-gold-300">{L(h)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ChairmanQuote() {
  const { t, L } = useLang()
  return (
    <section className="relative overflow-hidden bg-gold-50 py-24 sm:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="relative mx-auto w-64 sm:w-72">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold-500/40" />
            <Img src={chairman.photo!} alt={chairman.name} wrapClassName="aspect-[4/5] rounded-[1.6rem]" className="object-top" />
            <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-navy-900 px-5 py-2 text-center text-white shadow-lift">
              <p className="font-display text-base">{chairman.name}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-8">
          <span className="eyebrow">{t('about.chairmanEyebrow')}</span>
          <Quote className="mt-6 h-10 w-10 text-gold-500" />
          <blockquote className="mt-4 font-display text-[1.45rem] font-normal leading-[1.5] text-navy-900 sm:text-[1.8rem]">
            {L(chairman.message).split('. ').slice(0, 3).join('. ')}.
          </blockquote>
          <Ornament className="mt-8" />
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-navy-900">
            {chairman.name} <span className="text-gold-600">— {L(chairman.role)}, FPC Bazaar Federation</span>
          </p>
          <Link to="/about#chairman" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-leaf-700 hover:text-leaf-800">
            {t('common.readMore')} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
