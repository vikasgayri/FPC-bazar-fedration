import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { heroSlides } from '@/data/images'
import { goals, org } from '@/data/site'
import { useLang } from '@/hooks/useLang'
import { useCountUp } from '@/hooks/useUi'
import { cn } from '@/utils/format'
import { imgSources } from '@/utils/images'

const DURATION = 7000
const captions = [
  { en: 'Women’s self-help groups', hi: 'महिला स्वयं सहायता समूह' },
  { en: 'Gaushala & dairy development', hi: 'गौशाला एवं डेयरी विकास' },
  { en: 'PPP polyhouse clusters', hi: 'PPP पॉलीहाउस क्लस्टर' },
  { en: 'Natural, chemical-free farming', hi: 'प्राकृतिक, जहर मुक्त खेती' },
]

function Slide({ src, fallback, focus, first }: { src: string; fallback: string; focus: string; first?: boolean }) {
  const [s, setS] = useState(src)
  const o = imgSources(s, 1600)
  return (
    <img
      src={o.src}
      srcSet={o.srcSet}
      sizes="100vw"
      fetchPriority={first ? 'high' : 'auto'}
      decoding="async"
      onError={() => s !== fallback && setS(fallback)}
      alt=""
      // Focal point drives both the crop and the Ken Burns zoom origin, so the subject stays framed on wide screens.
      style={{ objectPosition: focus, transformOrigin: focus }}
      className="h-full w-full animate-kenburns object-cover"
      loading="eager"
    />
  )
}

function Stat({ g, i }: { g: (typeof goals)[number]; i: number }) {
  const { L } = useLang()
  const { ref, val } = useCountUp(g.value)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + i * 0.12, duration: 0.8 }}
      className={cn(
        // First cell of each row starts flush with the headline's left edge.
        'relative border-white/10 py-6 pr-4 sm:pr-8',
        i % 2 === 1 ? 'border-l pl-4 sm:pl-8' : 'pl-0',
        i === 2 && 'lg:border-l lg:pl-8',
        i >= 2 && 'border-t lg:border-t-0',
      )}
    >
      <p className="font-display text-[2.2rem] font-medium leading-none text-white sm:text-[2.8rem]">
        {g.prefix}
        <span ref={ref}>{val.toLocaleString('en-IN')}</span>
        {g.value >= 1000 && <span className="text-gold-400">+</span>}
      </p>
      <p className="mt-3 text-[13px] font-semibold leading-snug text-white/80">{L(g.label)}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">{L(g.note)}</p>
    </motion.div>
  )
}

export default function Hero() {
  const { t, L } = useLang()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setIdx((i) => (i + 1) % heroSlides.length), DURATION)
    return () => clearTimeout(id)
  }, [idx])

  // Warm the cache for the next slide so the cross-fade never shows an empty frame.
  useEffect(() => {
    const next = heroSlides[(idx + 1) % heroSlides.length]
    const o = imgSources(next.src, 1600)
    const im = new Image()
    im.sizes = '100vw'
    if (o.srcSet) im.srcset = o.srcSet
    im.src = o.src
  }, [idx])

  const lines = [t('home.heroTitle1'), t('home.heroTitle2'), t('home.heroTitle3')]

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950">
      {/* Slides */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="sync">
          <motion.div key={idx} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}>
            <Slide src={heroSlides[idx].src} fallback={heroSlides[idx].fallback} focus={heroSlides[idx].focus} first={idx === 0} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,22,44,0.94)_0%,rgba(6,22,44,0.82)_28%,rgba(6,22,44,0.5)_52%,rgba(6,22,44,0.18)_78%,rgba(6,22,44,0.08)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      <div className="absolute inset-0 -z-10 bg-grain opacity-70" />

      {/* Vertical motto */}
      <div className="pointer-events-none absolute right-[clamp(1rem,2vw,2.5rem)] top-1/2 hidden -translate-y-1/2 xl:block">
        <p className="font-hindi text-sm tracking-[0.3em] text-white/50 [writing-mode:vertical-rl]">{org.motto.hi}</p>
      </div>

      <div className="container-wide flex flex-1 flex-col justify-center pb-12 pt-36 sm:pt-40 lg:pt-44">
        <div className="w-full max-w-[min(100%,58rem)] xl:max-w-[62%] 2xl:max-w-[60%]">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="eyebrow eyebrow-light">
            {t('home.heroEyebrow')}
          </motion.p>
          <h1 className="mt-6 font-display text-[clamp(2.35rem,5.4vw,6.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-white">
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className={cn('block', i === 1 && 'italic text-gold-400', i === 2 && 'text-white')}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }} className="mt-7 max-w-[42rem] text-[clamp(1.02rem,1.15vw,1.25rem)] leading-relaxed text-white/80">
            {t('home.heroText')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75 }} className="mt-10 flex flex-wrap gap-3">
            <Link to="/register" className="btn-gold group !px-7 !py-4">
              {t('home.heroCta1')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/bazaar" className="btn-ghost-light !px-7 !py-4">
              <ShoppingBag className="h-4 w-4" /> {t('home.heroCta2')}
            </Link>
          </motion.div>
        </div>

        {/* Slide controls */}
        <div className="mt-14 flex items-center gap-6">
          <span className="font-display text-sm text-white">
            {String(idx + 1).padStart(2, '0')} <span className="text-white/40">/ {String(heroSlides.length).padStart(2, '0')}</span>
          </span>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="group relative h-[3px] w-10 overflow-hidden rounded-full bg-white/25 sm:w-14" aria-label={`Slide ${i + 1}`}>
                {i === idx && <motion.span key={idx} className="absolute inset-y-0 left-0 bg-gold-400" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: DURATION / 1000, ease: 'linear' }} />}
                {i < idx && <span className="absolute inset-0 bg-white/60" />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-white/60 sm:block">
              {L(captions[idx % captions.length])}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Goals band */}
      <div className="relative border-t border-white/10 bg-navy-950/60 backdrop-blur-md">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {goals.map((g, i) => (
              <Stat key={i} g={g} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
