import { Briefcase, Handshake, Landmark, BadgePercent, Banknote, Store, type LucideIcon } from 'lucide-react'
import type { ServiceIcon as Key } from '@/data/services'

const MAP: Record<Key, LucideIcon> = {
  solutions: Briefcase,
  linkage: Handshake,
  projects: Landmark,
  subsidy: BadgePercent,
  funding: Banknote,
  market: Store,
}

export default function ServiceIcon({ name, className }: { name: Key; className?: string }) {
  const I = MAP[name]
  return <I className={className} />
}
