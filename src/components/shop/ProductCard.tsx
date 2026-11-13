import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Heart, MapPin, Plus } from 'lucide-react'
import type { Product } from '@/types'
import Img from '@/components/ui/Img'
import { useEnquiryList } from '@/context/EnquiryListContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/hooks/useLang'
import { cn, inr } from '@/utils/format'

export default function ProductCard({ p, className }: { p: Product; className?: string }) {
  const { add, has, toggleWish, isWished, setDrawerOpen } = useEnquiryList()
  const toast = useToast()
  const { t, L } = useLang()
  const wished = isWished(p.id)
  const seasonal = p.capacity <= 0
  const inList = has(p.id)

  return (
    <motion.article
      layout
      className={cn('group relative flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white transition-shadow duration-500 hover:shadow-lift', className)}
    >
      <Link to={`/bazaar/${p.slug}`} className="relative block">
        <Img src={p.image} alt={L(p.name)} sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 30vw, 50vw" wrapClassName="aspect-[4/3.4]" className="transition duration-700 group-hover:scale-[1.06]" />
        {seasonal && (
          <span className="absolute left-3 top-3 rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">{t('shop.seasonal')}</span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-saffron-600 backdrop-blur">{t('shop.demoListing')}</span>
      </Link>
      <button
        onClick={() => {
          toggleWish(p.id)
          toast('info', wished ? t('shop.wishlistRemove') : t('shop.wishlistAdd'), L(p.name))
        }}
        className={cn('absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110', wished ? 'text-saffron-500' : 'text-navy-900')}
        aria-label={wished ? t('shop.wishlistRemove') : t('shop.wishlistAdd')}
        aria-pressed={wished}
      >
        <Heart className={cn('h-4 w-4', wished && 'fill-current')} />
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-600">
          <MapPin className="h-3 w-3 shrink-0" /> <span className="truncate">{p.origin}</span>
        </p>
        <Link to={`/bazaar/${p.slug}`} className="mt-1.5 line-clamp-2 font-display text-[1.08rem] leading-snug text-navy-900 hover:text-leaf-700">
          {L(p.name)}
        </Link>
        <p className="mt-1 line-clamp-1 text-xs font-semibold text-leaf-700">{p.producer}</p>
        <p className="mt-1 text-[11px] text-ink-mute">
          {t('shop.moq')}: {p.moq.toLocaleString('en-IN')} {p.unit}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-mute">{t('shop.indicative')}</p>
            <p className="text-lg font-extrabold leading-tight text-navy-900">
              {inr(p.price)} <span className="block text-xs font-semibold text-ink-mute sm:inline">/ {p.unit}</span>
            </p>
          </div>
          <button
            onClick={() => {
              add(p.id)
              setDrawerOpen(true)
            }}
            className={cn(
              'grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition',
              inList ? 'bg-leaf-600 hover:bg-leaf-700' : 'bg-navy-900 hover:bg-leaf-700',
            )}
            aria-label={inList ? t('shop.inEnquiry') : t('shop.addToEnquiry')}
            title={inList ? t('shop.inEnquiry') : t('shop.addToEnquiry')}
          >
            {inList ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-900/5 bg-white">
      <div className="aspect-[4/3.4] animate-pulse bg-cream-100" />
      <div className="space-y-2 p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-cream-100" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-cream-100" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-cream-100" />
      </div>
    </div>
  )
}
