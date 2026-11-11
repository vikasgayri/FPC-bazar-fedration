import { useRef, useState, type ReactNode } from 'react'
import { ImagePlus, Upload } from 'lucide-react'
import Img from '@/components/ui/Img'
import { real, stock } from '@/data/images'
import { cn } from '@/utils/format'

export function AdminCard({ title, action, children, className }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-navy-900/5 bg-white shadow-card', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-navy-900/5 px-5 py-4">
          <h3 className="font-display text-lg text-navy-900">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

export function PageTitle({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[1.9rem] leading-tight text-navy-900">{title}</h1>
        {text && <p className="mt-1 text-sm text-ink-soft">{text}</p>}
      </div>
      {action}
    </div>
  )
}

export function Table({ head, children, empty }: { head: ReactNode[]; children: ReactNode; empty?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-navy-900/5 text-[11px] font-bold uppercase tracking-wider text-ink-mute">
            {head.map((h, i) => (
              <th key={i} className="px-5 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-900/5">{children}</tbody>
      </table>
      {empty && <p className="px-5 py-10 text-center text-sm text-ink-mute">No records found.</p>}
    </div>
  )
}

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? 'Search…'} className="field !w-full !rounded-full !py-2.5 sm:!w-64" aria-label="Search" />
}

const LIBRARY = [...Object.values(real), ...Object.values(stock).slice(0, 18)]

/** Image picker for the demo: URL, library or local upload stored as data URL (browser only). */
export function ImageField({ value, onChange, label = 'Image' }: { value: string; onChange: (v: string) => void; label?: string }) {
  const [lib, setLib] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const file = useRef<HTMLInputElement>(null)
  return (
    <div>
      <p className="field-label">{label}</p>
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-navy-900/10 bg-cream-100">{value ? <Img src={value} alt="" wrapClassName="h-full w-full" /> : <ImagePlus className="m-auto mt-8 h-7 w-7 text-ink-mute" />}</div>
        <div className="min-w-0 flex-1 space-y-2">
          <input value={value.startsWith('data:') ? '(uploaded file — stored in this browser)' : value} onChange={(e) => onChange(e.target.value)} placeholder="https://… or /images/real/…" className="field !py-2.5" />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setLib((x) => !x)} className="rounded-full border border-navy-900/15 px-3 py-1.5 text-xs font-bold text-navy-900 hover:bg-cream-100">
              Choose from library
            </button>
            <button type="button" onClick={() => file.current?.click()} className="inline-flex items-center gap-1 rounded-full border border-navy-900/15 px-3 py-1.5 text-xs font-bold text-navy-900 hover:bg-cream-100">
              <Upload className="h-3.5 w-3.5" /> Upload (demo)
            </button>
            <input
              ref={file}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (!f) return
                if (f.size > 700_000) return setErr('Demo upload limit is 700 KB (stored in browser). Cloudinary uploads arrive in Phase 2.')
                setErr(null)
                const r = new FileReader()
                r.onload = () => onChange(String(r.result))
                r.readAsDataURL(f)
              }}
            />
          </div>
          {err && <p className="text-xs text-red-600">{err}</p>}
        </div>
      </div>
      {lib && (
        <div className="mt-3 grid max-h-56 grid-cols-5 gap-2 overflow-y-auto rounded-xl border border-navy-900/10 p-2 sm:grid-cols-7">
          {LIBRARY.map((src) => (
            <button
              type="button"
              key={src}
              onClick={() => {
                onChange(src)
                setLib(false)
              }}
              className={cn('overflow-hidden rounded-lg border-2', value === src ? 'border-navy-900' : 'border-transparent')}
            >
              <Img src={src} alt="" wrapClassName="aspect-square" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
