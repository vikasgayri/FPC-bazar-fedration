import { useEffect, useState, type ImgHTMLAttributes } from 'react'
import { Wheat } from 'lucide-react'
import { cn } from '@/utils/format'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  fallback?: string
  /** Classes for the wrapper (use for sizing / aspect ratio). */
  wrapClassName?: string
  overlay?: boolean
}

/**
 * Image with fade-in, fallback source and a branded placeholder.
 * Never shows a broken-image icon — important for a client-facing demo.
 */
export default function Img({ src, fallback, alt = '', className, wrapClassName, overlay, loading = 'lazy', ...rest }: Props) {
  const [current, setCurrent] = useState(src)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setCurrent(src)
    setLoaded(false)
    setFailed(false)
  }, [src])

  return (
    <div className={cn(/\b(absolute|fixed)\b/.test(wrapClassName ?? '') ? '' : 'relative', 'overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-leaf-700', wrapClassName)}>
      {!failed && (
        <img
          src={current}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (fallback && current !== fallback) setCurrent(fallback)
            else setFailed(true)
          }}
          className={cn('h-full w-full object-cover transition-opacity duration-700', loaded ? 'opacity-100' : 'opacity-0', className)}
          {...rest}
        />
      )}
      {(failed || !loaded) && (
        <div className="absolute inset-0 grid place-items-center">
          <Wheat className={cn('h-10 w-10 text-gold-400/40', !failed && 'animate-pulse')} />
        </div>
      )}
      {overlay && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />}
    </div>
  )
}
