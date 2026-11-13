import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, FlaskConical, Info, Loader2 } from 'lucide-react'
import { cn } from '@/utils/format'
import { Reveal } from './Motion'
import { useLang } from '@/hooks/useLang'

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  light,
  className,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  text?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  action?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <span className={cn('eyebrow', light && 'eyebrow-light')}>{eyebrow}</span>}
        <h2
          className={cn(
            'mt-4 font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem] lg:text-[3rem] text-balance',
            light ? 'text-white' : 'text-navy-900',
          )}
        >
          {title}
        </h2>
        {text && <p className={cn('mt-5 text-[1.05rem] leading-relaxed', light ? 'text-white/70' : 'text-ink-soft')}>{text}</p>}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  )
}

/** Gold wheat ornament used as a section divider (inspired by the federation emblem). */
export function Ornament({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-hidden>
      <span className={cn('h-px w-10', light ? 'bg-gold-400/50' : 'bg-gold-500/50')} />
      <svg width="34" height="20" viewBox="0 0 34 20" className={light ? 'text-gold-400' : 'text-gold-500'}>
        <path d="M17 2v16M17 6c-3-3-6-3-8-2 2 3 5 4 8 3M17 6c3-3 6-3 8-2-2 3-5 4-8 3M17 11c-3-3-6-3-8-2 2 3 5 4 8 3M17 11c3-3 6-3 8-2-2 3-5 4-8 3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <span className={cn('h-px w-10', light ? 'bg-gold-400/50' : 'bg-gold-500/50')} />
    </div>
  )
}

export function Breadcrumb({ items, light = true }: { items: { label: string; to?: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em]', light ? 'text-white/60' : 'text-ink-mute')}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.to ? (
            <Link to={it.to} className={cn('transition', light ? 'hover:text-white' : 'hover:text-navy-900')}>
              {it.label}
            </Link>
          ) : (
            <span className={light ? 'text-gold-400' : 'text-navy-900'}>{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
        </span>
      ))}
    </nav>
  )
}

export function DemoPill({ className, label }: { className?: string; label?: string }) {
  const { t } = useLang()
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full bg-saffron-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-saffron-600', className)}>
      <FlaskConical className="h-3 w-3" /> {label ?? t('common.demo')}
    </span>
  )
}

export function DemoNotice({ children, className }: { children?: ReactNode; className?: string }) {
  const { t } = useLang()
  return (
    <div className={cn('flex items-start gap-3 rounded-xl border border-saffron-400/40 bg-saffron-100/60 px-4 py-3 text-[0.8rem] leading-relaxed text-saffron-600', className)}>
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        <strong className="font-bold">{t('common.demoMode')}:</strong> {children ?? t('common.demoNotice')}
      </p>
    </div>
  )
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('h-5 w-5 animate-spin', className)} />
}

export function PageLoader() {
  return (
    <div className="grid min-h-[40vh] place-items-center">
      <Spinner className="h-7 w-7 text-gold-500" />
    </div>
  )
}

export function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-navy-900/15 bg-white px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-50 text-gold-600">{icon}</div>
      <h3 className="mt-5 font-display text-xl text-navy-900">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-sm text-ink-soft">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

const statusColor: Record<string, string> = {
  RECEIVED: 'bg-saffron-100 text-saffron-600',
  SHARED_WITH_FPO: 'bg-sky-100 text-sky-700',
  QUOTE_SENT: 'bg-violet-100 text-violet-700',
  LINKED: 'bg-leaf-100 text-leaf-700',
  PENDING: 'bg-amber-100 text-amber-700',
  UNDER_REVIEW: 'bg-sky-100 text-sky-700',
  APPROVED: 'bg-leaf-100 text-leaf-700',
  REJECTED: 'bg-red-100 text-red-700',
  NEW: 'bg-saffron-100 text-saffron-600',
  IN_PROGRESS: 'bg-sky-100 text-sky-700',
  CLOSED: 'bg-gray-100 text-gray-600',
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider', statusColor[status] ?? 'bg-gray-100 text-gray-600')}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
