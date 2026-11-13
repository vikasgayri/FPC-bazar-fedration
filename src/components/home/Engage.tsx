import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CalendarDays, Sprout, Building2, Users, Milk } from 'lucide-react'
import Img from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Motion'
import { SectionHeading, DemoNotice } from '@/components/ui/Primitives'
import { Lightbox } from '@/components/ui/Overlay'
import ProductCard, { ProductSkeleton } from '@/components/shop/ProductCard'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { productService } from '@/services/productService'
import { galleryService, newsService } from '@/services/contentService'
import { partners } from '@/data/site'
import { real, stock } from '@/data/images'
import { fmtDate } from '@/utils/format'

export function BazaarShowcase() {
  const { t } = useLang()
  const { data, loading } = useAsync(() => productService.featured(8), [])
  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow={t('home.bazaarEyebrow')}
          title={t('home.bazaarTitle')}
          text={t('home.bazaarText')}
          action={
            <Link to="/bazaar" className="btn-primary group">
              {t('home.bazaarCta')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          }
        />
        <DemoNotice className="mt-8">{t('shop.howBanner')}</DemoNotice>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {loading ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />) : data?.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

export function JoinTypes() {
  const { t } = useLang()
  const types = [
    { key: 'FARMER', I: Sprout, title: t('register.farmer'), text: t('register.farmerDesc'), img: stock.oxenPlough, fb: real.fieldVisit },
    { key: 'FPO', I: Building2, title: t('register.fpo'), text: t('register.fpoDesc'), img: real.fpoTraining2, fb: real.fpoTraining1 },
    { key: 'SHG', I: Users, title: t('register.shg'), text: t('register.shgDesc'), img: real.shgHandicraft, fb: real.shgJuteBags },
    { key: 'DAIRY', I: Milk, title: t('register.dairy'), text: t('register.dairyDesc'), img: stock.cowCalf, fb: real.gaushalaCattle },
  ]
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container">
        <SectionHeading align="center" eyebrow={t('home.joinEyebrow')} title={t('home.joinTitle')} text={t('home.joinText')} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {types.map(({ key, I, title, text, img, fb }, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <Link to={`/register?type=${key}`} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-navy-900/5 bg-cream-50 transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative">
                  <Img src={img} fallback={fb} alt={title} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" wrapClassName="aspect-[4/3]" className="transition duration-700 group-hover:scale-105" />
                  <span className="absolute -bottom-6 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-400 shadow-lift transition group-hover:bg-gold-500 group-hover:text-navy-950">
                    <I className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-10">
                  <h3 className="font-display text-xl text-navy-900">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-leaf-700">
                    {t('nav.join')} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NewsGallery() {
  const { t, L, lang } = useLang()
  const news = useAsync(() => newsService.list(), [])
  const gallery = useAsync(() => galleryService.list(), [])
  const [lb, setLb] = useState<number | null>(null)
  const [lead, ...rest] = news.data ?? []
  const pics = (gallery.data ?? []).slice(0, 9)

  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow={t('home.newsEyebrow')}
          title={t('home.newsTitle')}
          action={
            <Link to="/news" className="btn-outline">
              {t('common.viewAll')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        />
        {lead && (
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Link to={`/news/${lead.slug}`} className="group relative block h-full min-h-[420px] overflow-hidden rounded-[1.75rem]">
                <Img src={lead.image} alt={L(lead.title)} sizes="(min-width: 1024px) 58vw, 100vw" wrapClassName="absolute inset-0" className="transition duration-[1.2s] group-hover:scale-105" overlay />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                  <span className="rounded-full bg-gold-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-navy-950">{lead.category}</span>
                  <h3 className="mt-4 max-w-xl font-display text-[1.7rem] leading-tight sm:text-[2.1rem]">{L(lead.title)}</h3>
                  <p className="mt-3 flex items-center gap-2 text-sm text-white/70">
                    <CalendarDays className="h-4 w-4" /> {fmtDate(lead.date, lang)}
                  </p>
                </div>
              </Link>
            </Reveal>
            <div className="flex flex-col gap-4 lg:col-span-5">
              {rest.slice(0, 3).map((n, i) => (
                <Reveal key={n.id} delay={i * 0.08}>
                  <Link to={`/news/${n.slug}`} className="group flex gap-5 rounded-2xl bg-white p-4 shadow-card transition hover:shadow-lift">
                    <Img src={n.image} alt="" sizes="144px" wrapClassName="h-24 w-28 shrink-0 rounded-xl sm:h-28 sm:w-36" className="transition duration-700 group-hover:scale-110" />
                    <div className="min-w-0 py-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                        {n.category} • {fmtDate(n.date, lang)}
                      </p>
                      <h4 className="mt-2 line-clamp-2 font-display text-[1.1rem] leading-snug text-navy-900 group-hover:text-leaf-700">{L(n.title)}</h4>
                      <p className="mt-1 line-clamp-1 text-xs text-ink-mute">{L(n.excerpt)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <span className="eyebrow">{t('home.galleryEyebrow')}</span>
            <h3 className="mt-3 font-display text-[2rem] text-navy-900 sm:text-[2.4rem]">{t('home.galleryTitle')}</h3>
          </Reveal>
          <Link to="/gallery" className="text-sm font-bold text-leaf-700 hover:text-leaf-800">
            {t('common.viewAll')} →
          </Link>
        </div>
        <div className="mt-8 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:grid-cols-4">
          {pics.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setLb(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''} `}
            >
              <Img src={g.image} alt={L(g.title)} sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} wrapClassName="absolute inset-0" className="transition duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/80 to-transparent p-4 text-left text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                {L(g.title)}
              </span>
            </motion.button>
          ))}
        </div>
        <Lightbox images={pics.map((g) => ({ src: g.image, caption: L(g.title) }))} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      </div>
    </section>
  )
}

export function Partners() {
  const { t, L } = useLang()
  const row = [...partners, ...partners]
  return (
    <section className="border-y border-navy-900/5 bg-white py-16">
      <div className="container text-center">
        <span className="eyebrow justify-center">{t('home.partnersEyebrow')}</span>
        <p className="mt-3 font-display text-2xl text-navy-900">{t('home.partnersTitle')}</p>
      </div>
      <div className="mask-fade-x mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee gap-4">
          {row.map((p, i) => (
            <div key={i} className="flex w-72 shrink-0 flex-col items-center justify-center rounded-2xl border border-navy-900/5 bg-cream-50 px-6 py-6 text-center">
              <p className="font-display text-lg text-navy-900">{p.name}</p>
              <p className="mt-1 text-xs text-ink-mute">{L(p.note)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBand() {
  const { t } = useLang()
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 sm:py-32">
      <Img src={stock.wheatField} fallback={real.fpoTraining2} alt="" wrapClassName="absolute inset-0 -z-10" className="opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-leaf-800/60" />
      <div className="container grid items-center gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="font-hindi text-xl text-gold-400">सतत विकास • स्वच्छ ऊर्जा • आत्मनिर्भर किसान • आत्मनिर्भर भारत</p>
          <h2 className="mt-5 font-display text-[2.4rem] font-medium leading-[1.05] text-white sm:text-[3.6rem] text-balance">{t('home.ctaTitle')}</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{t('home.ctaText')}</p>
        </Reveal>
        <Reveal delay={0.15} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <Link to="/partner" className="btn-gold !px-8 !py-4">
            {t('home.ctaBtn')} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/initiatives/cbg-biogas-project" className="btn-ghost-light !px-8 !py-4">
            CBG Project
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
