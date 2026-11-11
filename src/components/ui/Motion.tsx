import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<'div'>, 'children'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Image reveal: a curtain wipes away from the image. */
export function RevealImage({ children, className, from = 'left' }: { children: ReactNode; className?: string; from?: 'left' | 'right' | 'bottom' }) {
  const clip = {
    left: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
    right: ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'],
    bottom: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
  }[from]
  return (
    <motion.div
      initial={{ clipPath: clip[0] }}
      whileInView={{ clipPath: clip[1] }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
