import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [threshold])
  return scrolled
}

/** Animated number that counts up when scrolled into view. */
export function useCountUp(target: number, duration = 1.8) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, target, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, target, duration])
  return { ref, val }
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | FPC Bazaar Federation` : 'FPC Bazaar Federation | Kisan • Yuva • Mahila Kalyan'
  }, [title])
}

export function useLockBody(lock: boolean) {
  useEffect(() => {
    if (!lock) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [lock])
}

/** Calls onClose when Escape is pressed while an overlay is open. */
export function useEscape(open: boolean, onClose: () => void) {
  const cb = useRef(onClose)
  useEffect(() => {
    cb.current = onClose
  })
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && cb.current()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])
}
