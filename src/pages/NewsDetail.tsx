import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, FileX } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { EmptyState, Ornament, PageLoader } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { newsService } from '@/services/contentService'
import { fmtDate } from '@/utils/format'

export default function NewsDetail() {
  const { slug = '' } = useParams()
  const { t, L, lang } = useLang()
  const { data: n, loading } = useAsync(() => newsService.getBySlug(slug), [slug])
  const more = useAsync(() => newsService.list(), [])
  useDocumentTitle(n ? L(n.title) : t('news.pageTitle'))

  if (loading) return <div className="pt-40"><PageLoader /></div>
  if (!n)
    return (
      <div className="container pb-24 pt-44">
        <EmptyState icon={<FileX className="h-7 w-7" />} title="Article not found" action={<Link to="/news" className="btn-primary">{t('news.pageTitle')}</Link>} />
      </div>
    )

  return (
    <>
      <PageHero title={L(n.title)} image={n.image} crumbs={[{ label: t('nav.news'), to: '/news' }, { label: n.category }]} size="sm">
        <p className="flex items-center gap-2 text-sm text-white/70">
          <CalendarDays className="h-4 w-4" /> {fmtDate(n.date, lang, { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </PageHero>
      <section className="bg-cream-50 py-16 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <Img src={n.image} alt={L(n.title)} wrapClassName="rounded-[1.75rem] aspect-[16/10] bg-white" className="!object-contain" />
            <p className="mt-10 font-display text-[1.45rem] leading-[1.6] text-navy-900">{L(n.excerpt)}</p>
            <Ornament className="my-8" />
            {L(n.body)
              .split('\n\n')
              .map((p, i) => (
                <p key={i} className="mt-5 text-[1.05rem] leading-[1.9] text-ink-soft">
                  {p}
                </p>
              ))}
            <Link to="/news" className="btn-outline mt-10">
              <ArrowLeft className="h-4 w-4" /> {t('news.pageTitle')}
            </Link>
          </article>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-[1.5rem] bg-white p-6 shadow-card">
              <p className="eyebrow">{t('home.newsEyebrow')}</p>
              <ul className="mt-5 space-y-4">
                {(more.data ?? [])
                  .filter((x) => x.id !== n.id)
                  .slice(0, 4)
                  .map((x) => (
                    <li key={x.id}>
                      <Link to={`/news/${x.slug}`} className="group flex gap-3">
                        <Img src={x.image} alt="" wrapClassName="h-16 w-20 shrink-0 rounded-lg" />
                        <div>
                          <p className="line-clamp-2 text-sm font-semibold text-navy-900 group-hover:text-leaf-700">{L(x.title)}</p>
                          <p className="mt-1 text-xs text-ink-mute">{fmtDate(x.date, lang)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
