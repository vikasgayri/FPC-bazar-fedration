import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLockBody } from '@/hooks/useUi'
import { cn } from '@/utils/format'
import { imgSources } from '@/utils/images'

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean
  onClose: () => void
  title: ReactNode
  children: ReactNode
  wide?: boolean
}) {
  useLockBody(open)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn('relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-lift sm:rounded-3xl', wide ? 'sm:max-w-3xl' : 'sm:max-w-lg')}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-900/5 bg-white/95 px-6 py-4 backdrop-blur">
              <h3 className="font-display text-xl text-navy-900">{title}</h3>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: { src: string; caption?: string }[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const open = index !== null
  useLockBody(open)
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index! + 1) % images.length)
      if (e.key === 'ArrowLeft') onIndex((index! - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, index, images.length, onClose, onIndex])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-navy-950/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={images[index!].caption ?? 'Photo'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onIndex((index! - 1 + images.length) % images.length)
            }}
            className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <motion.figure key={index} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img {...(() => { const o = imgSources(images[index!].src, 1600); return { src: o.src, srcSet: o.srcSet } })()} sizes="90vw" alt={images[index!].caption ?? ''} className="max-h-[80vh] w-auto rounded-xl object-contain" />
            {images[index!].caption && (
              <figcaption className="mt-4 text-center text-sm text-white/80">
                {images[index!].caption} <span className="ml-2 text-white/40">{index! + 1} / {images.length}</span>
              </figcaption>
            )}
          </motion.figure>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onIndex((index! + 1) % images.length)
            }}
            className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
