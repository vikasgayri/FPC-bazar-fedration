import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  Milk,
  Store,
  Users,
  Salad,
  Leaf,
  Handshake,
  Tent,
  GraduationCap,
  Building2,
  Recycle,
  Truck,
  FlaskConical,
  Flame,
  Warehouse,
  type LucideProps,
} from 'lucide-react'
import { brand } from '@/data/images'
import type { IconKey } from '@/data/initiatives'
import { cn } from '@/utils/format'
import { useLang } from '@/hooks/useLang'

export function Logo({ light, compact, className }: { light?: boolean; compact?: boolean; className?: string }) {
  const { isHi } = useLang()
  return (
    <Link to="/" className={cn('group flex min-w-0 items-center gap-2.5 sm:gap-3', className)} aria-label="FPC Bazaar Federation — Home">
      <span className={cn('relative grid shrink-0 place-items-center rounded-full bg-white transition-all duration-500', compact ? 'h-11 w-11 sm:h-12 sm:w-12' : 'h-12 w-12 sm:h-16 sm:w-16', light ? 'ring-1 ring-white/20' : 'shadow-soft ring-1 ring-gold-500/30')}>
        <img src={brand.logo} alt="" className="h-[88%] w-[88%] object-contain" />
      </span>
      <span className="leading-none">
        <span className={cn('block whitespace-nowrap font-display font-semibold tracking-[-0.01em]', compact ? 'text-[0.95rem] sm:text-[1.05rem]' : 'text-[1rem] sm:text-[1.3rem]', light ? 'text-white' : 'text-navy-900')}>
          {isHi ? 'एफपीसी बाज़ार फेडरेशन' : 'FPC Bazaar Federation'}
        </span>
        <span className={cn('mt-1 block whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.16em] sm:text-[0.6rem] sm:tracking-[0.2em]', light ? 'text-gold-400' : 'text-gold-600')}>
          {isHi ? 'किसान • युवा • महिला कल्याण' : 'Kisan • Yuva • Mahila Kalyan'}
        </span>
      </span>
    </Link>
  )
}

/** Simple cow glyph (lucide has no cow icon). */
function Cow(props: LucideProps) {
  const { size = 24, strokeWidth = 1.6, className } = props
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 7c-1-1-2-1-3 0 1 1.5 2 2 3 2M20 7c1-1 2-1 3 0-1 1.5-2 2-3 2" />
      <path d="M5 8c0-2 2-3 4-3h6c2 0 4 1 4 3v3c0 1-.5 2-1.5 2.5L17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2l-.5-4.5C5.5 13 5 12 5 11Z" />
      <path d="M9 16.5h6M10 10h.01M14 10h.01" />
    </svg>
  )
}

const map: Record<IconKey | 'warehouse', (p: LucideProps) => ReactElement> = {
  cow: (p) => <Cow {...p} />,
  milk: (p) => <Milk {...p} />,
  store: (p) => <Store {...p} />,
  women: (p) => <Users {...p} />,
  salad: (p) => <Salad {...p} />,
  leaf: (p) => <Leaf {...p} />,
  handshake: (p) => <Handshake {...p} />,
  tribal: (p) => <Tent {...p} />,
  youth: (p) => <GraduationCap {...p} />,
  building: (p) => <Building2 {...p} />,
  recycle: (p) => <Recycle {...p} />,
  truck: (p) => <Truck {...p} />,
  flask: (p) => <FlaskConical {...p} />,
  flame: (p) => <Flame {...p} />,
  warehouse: (p) => <Warehouse {...p} />,
}

export function InitiativeIcon({ name, ...p }: { name: IconKey | 'warehouse' } & LucideProps) {
  const C = map[name]
  return <C strokeWidth={1.6} {...p} />
}
