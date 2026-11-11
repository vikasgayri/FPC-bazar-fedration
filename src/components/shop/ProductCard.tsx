import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Plus, MapPin } from 'lucide-react'
import type { Product } from '@/types'
import Img from '@/components/ui/Img'
import { Stars } from '@/components/ui/Primitives'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/hooks/useLang'
import { cn, discountPct, inr } from '@/utils/format'

export default function ProductCard({ p, className }: { p: Product; className?: string }) {
  const { add, toggleWish, isWished, setDrawerOpen } = useCart()
  const toast = useToast()
  const { t, L } = useLang()
  const off = discountPct(p.price, p.mrp)
  const wished = isWished(p.id)
  const out = p.stock <= 0

  return (
    <motion.article
      layout
      className={cn('group relative flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white transition-shadow duration-500 hover:shadow-lift', className)}
    >
      <Link to={`/bazaar/${p.slug}`} className="relative block">
        <Img src={p.image} alt={L(p.name)} wrapClassName="aspect-[4/3.4]" className="transition duration-700 group-hover:scale-[1.06]" />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && <span className="rounded-full bg-leaf-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">{t('shop.off', { pct: off })}</span>}
          {out && <span className="rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">{t('shop.outOfStock')}</span>}
        </div>
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
          <MapPin className="h-3 w-3" /> {p.origin}
        </p>
        <Link to={`/bazaar/${p.slug}`} className="mt-1.5 line-clamp-2 font-display text-[1.08rem] leading-snug text-navy-900 hover:text-leaf-700">
          {L(p.name)}
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-ink-mute">{p.producer}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink-mute">
          <Stars value={p.rating} /> <span>({p.reviews})</span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="text-lg font-extrabold text-navy-900">
              {inr(p.price)} <span className="block text-xs font-semibold text-ink-mute sm:inline">/ {p.unit}</span>
            </p>
            {off > 0 && <p className="text-xs text-ink-mute line-through">{inr(p.mrp)}</p>}
          </div>
          <button
            disabled={out}
            onClick={() => {
              add(p.id)
              setDrawerOpen(true)
            }}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-900 text-white transition hover:bg-leaf-700 disabled:cursor-not-allowed disabled:bg-navy-900/20"
            aria-label={t('shop.addToCart')}
          >
            <Plus className="h-5 w-5" />
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
