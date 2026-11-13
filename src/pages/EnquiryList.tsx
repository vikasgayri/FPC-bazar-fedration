import { Link } from 'react-router-dom'
import { ClipboardList, Trash2, ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { DemoNotice, EmptyState } from '@/components/ui/Primitives'
import { QtyInput } from '@/components/shop/EnquiryDrawer'
import EnquirySummary from '@/components/shop/EnquirySummary'
import { useEnquiryList } from '@/context/EnquiryListContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { stock } from '@/data/images'
import { inr, qtyStep } from '@/utils/format'

export default function EnquiryList() {
  const { lines, setQty, remove } = useEnquiryList()
  const { t, L } = useLang()
  useDocumentTitle(t('elist.title'))
  return (
    <>
      <PageHero title={t('elist.title')} image={stock.vegBaskets} fallback="/images/real/produce-exhibit.jpg" crumbs={[{ label: t('nav.bazaar'), to: '/bazaar' }, { label: t('nav.cart') }]} size="sm" />
      <section className="bg-cream-50 py-12 sm:py-16">
        <div className="container">
          {lines.length === 0 ? (
            <EmptyState icon={<ClipboardList className="h-7 w-7" />} title={t('elist.empty')} text={t('elist.emptyText')} action={<Link to="/bazaar" className="btn-primary">{t('elist.continue')}</Link>} />
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
              <div className="min-w-0 space-y-4">
                <DemoNotice>{t('send.demoText')}</DemoNotice>
                <ul className="divide-y divide-navy-900/5 rounded-[1.5rem] bg-white px-5 shadow-card sm:px-6">
                  {lines.map(({ product: p, qty }) => (
                    <li key={p.id} className="flex gap-4 py-5 sm:gap-6">
                      <Img src={p.image} alt={L(p.name)} sizes="112px" wrapClassName="h-24 w-24 shrink-0 rounded-2xl sm:h-28 sm:w-28" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link to={`/bazaar/${p.slug}`} className="font-display text-lg leading-snug text-navy-900 hover:text-leaf-700">
                              {L(p.name)}
                            </Link>
                            <p className="mt-0.5 text-xs font-semibold text-leaf-700">{p.producer}</p>
                            <p className="mt-0.5 text-xs text-ink-mute">
                              {p.origin} • {t('shop.indicative')} {inr(p.price)} / {p.unit}
                            </p>
                          </div>
                          <button onClick={() => remove(p.id)} className="text-ink-mute hover:text-red-600" aria-label={t('elist.remove')}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                          <QtyInput small value={qty} step={qtyStep(p.moq)} unit={p.unit.length <= 8 ? p.unit : undefined} onChange={(v) => setQty(p.id, v)} />
                          <p className="font-bold text-navy-900">≈ {inr(p.price * qty)}</p>
                        </div>
                        {qty < p.moq && <p className="mt-1.5 text-xs font-semibold text-saffron-600">{t('elist.belowMin', { qty: `${p.moq} ${p.unit}` })}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="/bazaar" className="inline-block text-sm font-bold text-leaf-700">
                  ← {t('elist.continue')}
                </Link>
              </div>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <EnquirySummary
                  cta={
                    <Link to="/bazaar/enquiry/send" className="btn-primary w-full !py-4">
                      {t('elist.send')} <ArrowRight className="h-4 w-4" />
                    </Link>
                  }
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
