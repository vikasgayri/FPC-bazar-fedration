import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { InitiativeIcon } from '@/components/ui/Brand'
import { groupLabel, initiatives, type InitiativeGroup } from '@/data/initiatives'
import { real } from '@/data/images'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { cn } from '@/utils/format'

export default function Initiatives() {
  const { t, L } = useLang()
  useDocumentTitle(t('initiatives.pageTitle'))
  const [filter, setFilter] = useState<InitiativeGroup | 'all'>('all')
  const list = initiatives.filter((i) => filter === 'all' || i.group === filter)
  const tabs: (InitiativeGroup | 'all')[] = ['all', 'priority', 'special', 'flagship']

  return (
    <>
      <PageHero
        title={t('initiatives.pageTitle')}
        text={t('initiatives.pageText')}
        image={real.polyhouseCrop}
        crumbs={[{ label: t('nav.initiatives') }]}
        eyebrow="जहर मुक्त कृषि • स्वस्थ भारत • आत्मनिर्भर भारत"
      />
      <section className="bg-cream-50 py-20 sm:py-28">
        <div className="container">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={cn(
                  'shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition',
                  filter === g ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/40',
                )}
              >
                {g === 'all' ? t('initiatives.filterAll') : L(groupLabel[g])}
                <span className="ml-2 opacity-50">{g === 'all' ? initiatives.length : initiatives.filter((i) => i.group === g).length}</span>
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            <AnimatePresence mode="popLayout">
              {list.map((it, i) => (
                <motion.div
                  key={it.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.04 }}
                >
                  <Link
                    to={`/initiatives/${it.slug}`}
                    className={cn('group grid overflow-hidden rounded-[1.75rem] bg-white shadow-card transition hover:shadow-lift md:grid-cols-2', i % 2 === 1 && 'md:[&>*:first-child]:order-2')}
                  >
                    <div className="relative min-h-[260px] overflow-hidden">
                      <Img src={it.image} fallback={it.fallback} alt={L(it.title)} sizes="(min-width: 768px) 50vw, 100vw" wrapClassName="absolute inset-0" className="transition duration-[1.2s] group-hover:scale-105" />
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-900 backdrop-blur">
                        {L(groupLabel[it.group])}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-12">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-400">
                        <InitiativeIcon name={it.icon} className="h-6 w-6" />
                      </span>
                      <p className="mt-6 font-hindi text-lg text-leaf-700">{it.hindiTitle}</p>
                      <h2 className="mt-1 font-display text-[1.8rem] leading-tight text-navy-900 group-hover:text-leaf-700">{L(it.title)}</h2>
                      <p className="mt-4 leading-relaxed text-ink-soft">{L(it.summary)}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {it.highlights.slice(0, 3).map((h, k) => (
                          <li key={k} className="rounded-full bg-cream-100 px-3 py-1.5 text-xs font-semibold text-navy-900">
                            {L(h)}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-navy-900">
                        {t('common.learnMore')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
