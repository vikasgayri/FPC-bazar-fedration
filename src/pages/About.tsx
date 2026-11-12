import { Link } from 'react-router-dom'
import { BadgeCheck, Building2, CalendarCheck2, FileText, Landmark, MapPin, Quote, ScrollText, UserRound, Check, Users, Receipt } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { Reveal, RevealImage } from '@/components/ui/Motion'
import { Ornament, SectionHeading } from '@/components/ui/Primitives'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { about, advisory, chairman, fpoAgenda, howItWorks, leadership, missionVision, moa, org, schemes } from '@/data/site'
import { real } from '@/data/images'

const initials = (n: string) =>
  n
    .replace(/^(Dr\.|Prof\.|Mr\.?|Mrs\.?)\s*/i, '')
    .split(' ')
    .map((x) => x[0])
    .slice(0, 2)
    .join('')

export default function About() {
  const { t, L, lang } = useLang()
  useDocumentTitle(t('nav.about'))

  const reg = [
    { I: Building2, k: t('about.legalName'), v: org.legalName },
    { I: FileText, k: t('about.cin'), v: org.cin },
    { I: CalendarCheck2, k: t('about.incorporated'), v: `${t('about.incorporatedVal')} • ${org.roc}` },
    { I: Receipt, k: `${t('about.pan')} / ${t('about.tan')}`, v: `${org.pan} • ${org.tan}` },
    { I: Landmark, k: t('about.type'), v: L(org.type) },
    { I: MapPin, k: t('about.office'), v: L(org.address) },
    { I: UserRound, k: t('about.chairman'), v: chairman.name },
    { I: Users, k: t('about.directors'), v: org.directors.join(' • ') },
    { I: BadgeCheck, k: t('about.certifications'), v: org.certifications.join(' • ') },
    { I: ScrollText, k: t('about.targetStates'), v: org.targetStates[lang].join(' • ') },
  ]

  return (
    <>
      <PageHero
        title={t('about.pageTitle')}
        text={t('about.pageText')}
        image={real.fpoTraining2}
        fallback={real.fpoTraining1}
        crumbs={[{ label: t('nav.about') }]}
        eyebrow={org.tagline.hi}
      />

      {/* Who we are */}
      <section className="bg-cream-50 py-24 sm:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">{t('about.whoEyebrow')}</span>
              <h2 className="mt-4 font-display text-[2.2rem] font-medium leading-[1.08] text-navy-900 sm:text-[3rem] text-balance">{t('about.whoTitle')}</h2>
              <Ornament className="mt-6" />
              <p className="lead mt-6">{L(about.intro)}</p>
              <p className="mt-6 font-display text-xl italic text-leaf-700">“{L(org.slogan)}”</p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { k: t('about.mission'), v: missionVision.mission },
                { k: t('about.vision'), v: missionVision.vision },
                { k: t('about.objective'), v: missionVision.objective },
              ].map((x, i) => (
                <Reveal key={x.k} delay={i * 0.08} className="rounded-2xl border-t-4 border-gold-500 bg-white p-5 shadow-card">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">{x.k}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{L(x.v)}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <RevealImage className="row-span-2 overflow-hidden rounded-[1.75rem]">
              <Img src={real.polyhouseCrop} alt="Polyhouse cultivation" sizes="(min-width: 1024px) 25vw, 50vw" wrapClassName="h-full min-h-[420px]" />
            </RevealImage>
            <RevealImage from="right" className="overflow-hidden rounded-[1.75rem]">
              <Img src={real.shgHandicraft} alt="SHG artisans" sizes="(min-width: 1024px) 25vw, 50vw" wrapClassName="aspect-square" />
            </RevealImage>
            <RevealImage from="bottom" className="overflow-hidden rounded-[1.75rem]">
              <Img src={real.gaushalaCattle} alt="Gaushala" sizes="(min-width: 1024px) 25vw, 50vw" wrapClassName="aspect-square" />
            </RevealImage>
          </div>
        </div>
      </section>

      {/* Chairman */}
      <section id="chairman" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,162,75,0.18),transparent_55%)]" />
        <div className="container relative grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="relative mx-auto w-64 sm:w-80">
              <div className="absolute -inset-4 rounded-[2.2rem] border border-gold-500/30" />
              <Img src={chairman.photo!} alt={chairman.name} sizes="320px" wrapClassName="aspect-[4/5] rounded-[1.8rem] bg-white" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-8">
            <span className="eyebrow eyebrow-light">{t('about.chairmanEyebrow')}</span>
            <Quote className="mt-6 h-10 w-10 text-gold-500" />
            <p className="mt-4 text-sm font-semibold text-white/60">{lang === 'hi' ? 'प्रिय हितधारकों,' : 'Dear Stakeholders,'}</p>
            <blockquote className="mt-4 font-display text-[1.25rem] leading-[1.65] text-white/90 sm:text-[1.45rem]">{L(chairman.message)}</blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gold-500" />
              <p>
                <span className="font-display text-xl">{chairman.name}</span>
                <span className="ml-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{L(chairman.role)}</span>
                {chairman.credential && <span className="mt-1 block text-sm text-white/60">{L(chairman.credential)}</span>}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-white py-24 sm:py-32">
        <div className="container">
          <SectionHeading eyebrow={t('about.leadershipEyebrow')} title={t('about.leadershipTitle')} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 0.07} className="group">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-cream-100">
                  {m.photo ? (
                    <Img src={m.photo} alt={m.name} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" wrapClassName="aspect-[4/4.6] bg-cream-100" className="transition duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="grid aspect-[4/4.6] place-items-center bg-gradient-to-br from-navy-800 to-navy-950 font-display text-6xl text-gold-400">{initials(m.name)}</div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-500 transition duration-500 group-hover:scale-x-100" />
                </div>
                <h3 className="mt-5 font-display text-xl text-navy-900">{m.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-leaf-700">{L(m.role)}</p>
                {m.credential && <p className="mt-2 text-sm text-ink-soft">{L(m.credential)}</p>}
                {m.message && <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink-mute">“{L(m.message)}”</p>}
              </Reveal>
            ))}
          </div>

          {/* Advisory */}
          <div className="mt-28 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow={t('about.advisoryEyebrow')} title={t('about.advisoryTitle')} text={t('about.advisoryText')} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
              {advisory.map((a, i) => (
                <Reveal key={a.name} delay={(i % 6) * 0.04} className="flex items-center gap-4 rounded-2xl border border-navy-900/5 bg-cream-50 p-4 transition hover:border-gold-500/40 hover:bg-white hover:shadow-card">
                  {a.photo ? (
                    <Img src={a.photo} alt={a.name} sizes="64px" wrapClassName="h-14 w-14 shrink-0 rounded-full ring-2 ring-gold-500/40" />
                  ) : (
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-sm text-gold-400">{initials(a.name)}</span>
                  )}
                  <div className="min-w-0">
                    <p className="font-display text-[1.05rem] text-navy-900">{a.name}</p>
                    <p className="text-xs text-ink-mute">{a.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative overflow-hidden bg-gold-50 py-24 sm:py-32">
        <div className="container">
          <SectionHeading align="center" eyebrow={t('about.howEyebrow')} title={t('about.howTitle')} />
          <div className="relative mt-16 grid gap-6 md:grid-cols-5">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent md:block" />
            {howItWorks.map((s, i) => (
              <Reveal key={i} delay={i * 0.1} className="relative text-center">
                <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-500 bg-white font-display text-xl text-navy-900 shadow-card">{i + 1}</span>
                <h3 className="mt-6 font-display text-lg text-navy-900">{L(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{L(s.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FPO agenda — alternating image/text */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <RevealImage className="overflow-hidden rounded-[2rem]">
            <Img src={real.fpoTraining1} alt="FPO training meeting" sizes="(min-width: 1024px) 50vw, 100vw" wrapClassName="aspect-[4/3.4]" />
          </RevealImage>
          <div>
            <SectionHeading eyebrow={t('about.agendaEyebrow')} title={t('about.agendaTitle')} />
            <ul className="mt-8 space-y-4">
              {fpoAgenda.map((a, i) => (
                <Reveal key={i} delay={i * 0.06} className="flex gap-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-[0.98rem] leading-relaxed text-ink-soft">{L(a)}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Registration details */}
      <section id="registration" className="bg-cream-50 py-24 sm:py-32">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={t('about.regEyebrow')} title={t('about.regTitle')} />
            <Reveal delay={0.1} className="mt-8 rounded-2xl bg-navy-900 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{t('about.schemes')}</p>
              <ul className="mt-4 space-y-4">
                {schemes.map((s, i) => (
                  <li key={i}>
                    <p className="font-display text-lg">{L(s.title)}</p>
                    <p className="text-sm text-white/65">{L(s.text)}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal className="overflow-hidden rounded-[1.75rem] border border-gold-500/30 bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-gold-500/20 bg-gold-50 px-6 py-4">
                <p className="font-display text-lg text-navy-900">{org.legalName}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <BadgeCheck className="h-3.5 w-3.5" /> Section 8 • 2022
                </span>
              </div>
              <dl className="divide-y divide-navy-900/5">
                {reg.map(({ I, k, v }) => (
                  <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                    <dt className="flex items-center gap-3 text-sm font-semibold text-ink-mute">
                      <I className="h-4 w-4 text-gold-600" /> {k}
                    </dt>
                    <dd className="text-sm font-semibold text-navy-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 rounded-[1.75rem] border border-navy-900/5 bg-white p-6 shadow-card sm:p-8">
              <span className="eyebrow">{t('about.moaEyebrow')}</span>
              <h3 className="mt-3 font-display text-2xl text-navy-900">{t('about.moaTitle')}</h3>
              <blockquote className="mt-5 border-l-2 border-gold-500 pl-5 text-[0.98rem] leading-relaxed text-ink-soft">{L(moa.object)}</blockquote>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {moa.clauses.map((c, i) => (
                  <li key={i} className="flex gap-3 text-sm text-navy-900">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    {L(c)}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-ink-mute">{t('about.moaNote')}</p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">
                {t('nav.join')}
              </Link>
              <Link to="/contact" className="btn-outline">
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
