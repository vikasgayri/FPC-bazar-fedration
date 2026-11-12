import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, ArrowUpRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Motion'
import { PageLoader } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { newsService } from '@/services/contentService'
import { real } from '@/data/images'
import { cn, fmtDate } from '@/utils/format'

export default function News() {
  const { t, L, lang } = useLang()
  useDocumentTitle(t('news.pageTitle'))
  const { data, loading } = useAsync(() => newsService.list(), [])
  const [cat, setCat] = useState('all')
  const cats = ['all', ...Array.from(new Set((data ?? []).map((n) => n.category)))]
  const list = (data ?? []).filter((n) => cat === 'all' || n.category === cat)

  return (
    <>
      <PageHero title={t('news.pageTitle')} text={t('news.pageText')} image={real.ngoAward2} crumbs={[{ label: t('nav.news') }]} size="sm" />
      <section className="bg-cream-50 py-16 sm:py-24">
        <div className="container">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={cn('shrink-0 rounded-full border px-5 py-2 text-sm font-bold', cat === c ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900')}>
                {c === 'all' ? t('news.all') : c}
              </button>
            ))}
          </div>
          {loading ? (
            <PageLoader />
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((n, i) => (
                <Reveal key={n.id} delay={(i % 3) * 0.07}>
                  <Link to={`/news/${n.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                    <div className="relative">
                      <Img src={n.image} alt={L(n.title)} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" wrapClassName="aspect-[16/10]" className="transition duration-700 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-navy-950">{n.category}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex items-center gap-2 text-xs font-semibold text-ink-mute">
                        <CalendarDays className="h-3.5 w-3.5" /> {fmtDate(n.date, lang)}
                      </p>
                      <h2 className="mt-3 font-display text-xl leading-snug text-navy-900 group-hover:text-leaf-700">{L(n.title)}</h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{L(n.excerpt)}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-leaf-700">
                        {t('common.readMore')} <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
