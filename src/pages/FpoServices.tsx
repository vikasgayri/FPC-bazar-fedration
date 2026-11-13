import { Link } from 'react-router-dom'
import { ArrowRight, Check, HeartHandshake } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Motion'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { fpoJourney, fpoServices, network } from '@/data/services'
import { real } from '@/data/images'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { cn } from '@/utils/format'

export default function FpoServices() {
  const { t, L } = useLang()
  useDocumentTitle(t('services.pageTitle'))
  const n = (v: number) => v.toLocaleString('en-IN')

  return (
    <>
      <PageHero
        title={t('services.pageTitle')}
        text={t('services.pageText')}
        image={real.fpoTraining2}
        fallback={real.fpoTraining1}
        eyebrow="FPO सेवाएं • समाधान से बाज़ार तक"
        crumbs={[{ label: t('services.pageTitle') }]}
      />

      {/* Who we are for FPOs */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">{t('services.introEyebrow')}</span>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.1] text-navy-900 sm:text-[2.6rem]">{t('services.introTitle')}</h2>
            <p className="lead mt-6">{t('services.introText')}</p>
            <p className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-5 text-sm font-semibold leading-relaxed text-navy-900 shadow-card">
              <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" /> {t('services.npNote')}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: `${n(network.fpos)}+`, l: t('services.statFpos') },
              { v: String(network.states), l: t('services.statStates') },
              { v: '6', l: t('services.statServices') },
              { v: t('services.statNpValue'), l: t('services.statNp') },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.06} className={cn('rounded-[1.5rem] p-6 shadow-card', i === 0 ? 'bg-navy-900 text-white' : 'bg-white')}>
                <p className={cn('font-display text-[2.2rem] leading-none sm:text-[2.6rem]', i === 0 ? 'text-gold-400' : 'text-navy-900')}>{s.v}</p>
                <p className={cn('mt-3 text-sm font-semibold', i === 0 ? 'text-white/75' : 'text-ink-soft')}>{s.l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container">
          <SectionHeading align="center" eyebrow={t('services.eyebrow')} title={t('services.title')} text={t('services.text')} />
          <div className="mt-16 space-y-16 sm:space-y-24">
            {fpoServices.map((s, i) => (
              <article key={s.key} id={s.key} className="grid scroll-mt-32 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn('min-w-0', i % 2 === 1 && 'lg:order-2')}>
                  <Img src={s.image} alt={L(s.title)} sizes="(min-width: 1024px) 45vw, 100vw" wrapClassName="aspect-[4/3] rounded-[1.75rem] shadow-lift" />
                </Reveal>
                <Reveal delay={0.08} className="min-w-0">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-gold-400">
                      <ServiceIcon name={s.key} className="h-7 w-7" />
                    </span>
                    <span className="font-display text-lg text-ink-mute">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.9rem] leading-tight text-navy-900 sm:text-[2.3rem]">{L(s.title)}</h3>
                  <p className="lead mt-4">{L(s.text)}</p>
                  <ul className="mt-6 space-y-3">
                    {s.points.map((p) => (
                      <li key={p.en} className="flex items-start gap-3 text-[15px] text-navy-900">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf-700">
                          <Check className="h-3 w-3" />
                        </span>
                        {L(p)}
                      </li>
                    ))}
                  </ul>
                  {s.cta && (
                    <Link to={s.cta.to} className="btn-primary mt-8">
                      {L(s.cta.label)} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="container">
          <SectionHeading align="center" eyebrow={t('services.journeyEyebrow')} title={t('services.journeyTitle')} />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fpoJourney.map((j, i) => (
              <Reveal key={j.title.en} delay={i * 0.08} className="relative rounded-[1.5rem] bg-white p-7 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500 font-display text-lg text-navy-950">{i + 1}</span>
                <p className="mt-5 font-display text-xl text-navy-900">{L(j.title)}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{L(j.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-8 py-14 text-white sm:px-14">
            <Img src={real.ngoGroup} alt="" sizes="100vw" wrapClassName="absolute inset-0 opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-[2rem] leading-tight sm:text-[2.6rem]">{t('services.ctaTitle')}</h2>
              <p className="mt-4 text-white/75">{t('services.ctaText')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register?type=FPO" className="btn-gold">
                  {t('services.ctaRegister')} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-ghost-light">
                  {t('services.ctaContact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
