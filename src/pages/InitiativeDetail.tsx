import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Handshake, UserPlus } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Motion'
import { Ornament } from '@/components/ui/Primitives'
import { Lightbox } from '@/components/ui/Overlay'
import { InitiativeIcon } from '@/components/ui/Brand'
import { getInitiative, groupLabel, initiatives } from '@/data/initiatives'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'

export default function InitiativeDetail() {
  const { slug = '' } = useParams()
  const it = getInitiative(slug)
  const { t, L } = useLang()
  const [lb, setLb] = useState<number | null>(null)
  useDocumentTitle(it ? L(it.title) : '')
  if (!it) return <Navigate to="/initiatives" replace />

  const related = initiatives.filter((x) => x.slug !== it.slug && x.group === it.group).slice(0, 3)
  const enquiryType = it.slug === 'cbg-biogas-project' ? 'CBG_INVESTMENT' : it.group === 'priority' ? 'PARTNERSHIP' : 'PPP_PROJECT'

  return (
    <>
      <PageHero
        title={L(it.title)}
        text={L(it.summary)}
        image={it.hero ?? it.image}
        fallback={it.hero ? it.image : it.fallback}
        eyebrow={it.hindiTitle}
        crumbs={[{ label: t('nav.initiatives'), to: '/initiatives' }, { label: L(groupLabel[it.group]) }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link to={`/partner?type=${enquiryType}`} className="btn-gold">
            <Handshake className="h-4 w-4" /> {t('initiatives.enquire')}
          </Link>
          <Link to="/register" className="btn-ghost-light">
            <UserPlus className="h-4 w-4" /> {t('initiatives.register')}
          </Link>
        </div>
      </PageHero>

      <section className="bg-cream-50 py-20 sm:py-28">
        <div className="container grid gap-14 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <Reveal>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-gold-400">
                <InitiativeIcon name={it.icon} className="h-7 w-7" />
              </span>
              <div className="mt-8 space-y-5 text-[1.08rem] leading-[1.85] text-ink-soft">
                {it.body.map((p, i) => (
                  <p key={i} className={i === 0 ? 'font-display text-[1.4rem] leading-[1.6] text-navy-900' : ''}>
                    {L(p)}
                  </p>
                ))}
              </div>
            </Reveal>
            {it.stats && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {it.stats.map((s, i) => (
                  <Reveal key={i} delay={i * 0.08} className="rounded-2xl bg-navy-900 p-6 text-white">
                    <p className="font-display text-4xl text-gold-400">{s.value}</p>
                    <p className="mt-2 text-sm text-white/70">{L(s.label)}</p>
                  </Reveal>
                ))}
              </div>
            )}
          </article>

          <aside className="lg:col-span-5">
            <Reveal delay={0.1} className="sticky top-28 rounded-[1.75rem] border border-navy-900/5 bg-white p-8 shadow-card">
              <p className="eyebrow">{t('initiatives.keyHighlights')}</p>
              <ul className="mt-6 space-y-4">
                {it.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-semibold text-navy-900">{L(h)}</span>
                  </li>
                ))}
              </ul>
              <Ornament className="mt-8" />
              <p className="mt-6 text-sm text-ink-soft">{t('initiatives.getInvolved')}</p>
              <div className="mt-4 grid gap-2">
                <Link to={`/partner?type=${enquiryType}`} className="btn-primary">
                  {t('initiatives.enquire')}
                </Link>
                <Link to="/register" className="btn-outline">
                  {t('initiatives.register')}
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {it.steps && (
        <section className="bg-navy-900 py-20 text-white sm:py-28">
          <div className="container">
            <Reveal>
              <span className="eyebrow eyebrow-light">{t('initiatives.workingModel')}</span>
              <h2 className="mt-4 font-display text-[2rem] sm:text-[2.6rem]">{L(it.title)}</h2>
            </Reveal>
            <div className={`mt-12 grid gap-4 sm:grid-cols-2 ${it.steps.length === 6 ? 'lg:grid-cols-3' : it.steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
              {it.steps.map((s, i) => (
                <Reveal key={i} delay={i * 0.07} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-display text-5xl text-gold-500/30">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl">{L(s.title)}</h3>
                  <p className="mt-2 text-sm text-white/65">{L(s.text)}</p>
                  {i < it.steps!.length - 1 && <ArrowRight className="absolute right-4 top-6 h-5 w-5 text-gold-500/60" />}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {it.gallery.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="container">
            <Reveal>
              <span className="eyebrow">{t('initiatives.gallery')}</span>
            </Reveal>
            <div className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
              {it.gallery.map((g, i) => (
                <button key={g} onClick={() => setLb(i)} className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl">
                  <Img src={g} alt="" natural sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" wrapClassName="min-h-[120px] w-full" className="transition duration-700 group-hover:scale-105" />
                </button>
              ))}
            </div>
            <Lightbox images={it.gallery.map((src) => ({ src, caption: L(it.title) }))} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-cream-50 py-20 sm:py-28">
          <div className="container">
            <h2 className="font-display text-[2rem] text-navy-900">{t('initiatives.related')}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/initiatives/${r.slug}`} className="group overflow-hidden rounded-[1.5rem] bg-white shadow-card transition hover:shadow-lift">
                  <Img src={r.image} fallback={r.fallback} alt={L(r.title)} sizes="(min-width: 768px) 33vw, 100vw" wrapClassName="aspect-[16/10]" className="transition duration-700 group-hover:scale-105" />
                  <div className="p-6">
                    <p className="font-hindi text-sm text-leaf-700">{r.hindiTitle}</p>
                    <h3 className="mt-1 font-display text-xl text-navy-900">{L(r.title)}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
