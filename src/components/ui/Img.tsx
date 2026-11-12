import { useLayoutEffect, useRef, useState, type CSSProperties, type ImgHTMLAttributes } from 'react'
import { Wheat } from 'lucide-react'
import { cn } from '@/utils/format'
import { imageHint } from '@/data/images'
import { imgSources } from '@/utils/images'

/* ───────────────────────── component ───────────────────────── */

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  fallback?: string
  /** Wrapper classes — sizing / aspect ratio / rounding. */
  wrapClassName?: string
  overlay?: boolean
  /** Rendered width hint for srcset selection, e.g. "(min-width:1024px) 33vw, 50vw". Default 100vw. */
  sizes?: string
  /** Above-the-fold image: load immediately with high priority. */
  priority?: boolean
  /** cover (crop to fill) or contain (show the whole picture on a blurred backdrop). */
  fit?: 'cover' | 'contain'
  /** CSS object-position focal point, e.g. "50% 25%". */
  position?: string
  /** Size the wrapper to the photo's own aspect ratio (no cropping) — for masonry layouts. */
  natural?: boolean
}

/**
 * Image with responsive WebP sources, blur-up placeholder, focal point and fallback.
 * Never shows a broken-image icon.
 */
export default function Img({
  src,
  fallback,
  alt = '',
  className,
  wrapClassName,
  overlay,
  sizes = '100vw',
  priority,
  fit,
  position,
  natural,
  loading,
  style,
  ...rest
}: Props) {
  // Track the current source without an effect (no race with cached images firing onLoad early).
  const [prop, setProp] = useState(src)
  const [current, setCurrent] = useState(src)
  if (src !== prop) {
    setProp(src)
    setCurrent(src)
  }
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState<Record<string, true>>({})
  const ref = useRef<HTMLImageElement>(null)

  const { src: url, srcSet, meta } = imgSources(current, natural ? 960 : 1200)
  const hint = imageHint(current)
  const mode = fit ?? hint.fit ?? 'cover'
  const isPortrait = meta ? meta.h > meta.w * 1.12 : false
  const objectPosition = position ?? hint.pos ?? (isPortrait ? '50% 28%' : '50% 50%')
  const loaded = loadedSrc === url
  const isFailed = !!failed[current] && (!fallback || current === fallback)

  // Images served from the browser cache can finish before React attaches onLoad.
  useLayoutEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth > 0) setLoadedSrc(url)
  }, [url])

  const wrapStyle: CSSProperties | undefined = natural && meta ? { aspectRatio: `${meta.w} / ${meta.h}` } : undefined
  const absolute = /\b(absolute|fixed)\b/.test(wrapClassName ?? '')

  return (
    <div className={cn(absolute ? '' : 'relative', 'overflow-hidden bg-navy-800', wrapClassName)} style={wrapStyle}>
      {/* Blur-up preview (local images) — also the soft backdrop for "contain" mode */}
      {meta && (
        <img
          src={meta.lqip}
          alt=""
          aria-hidden
          className={cn('absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-500', mode === 'contain' ? 'opacity-70' : loaded ? 'opacity-0' : 'opacity-100')}
          style={{ objectPosition }}
        />
      )}
      {!meta && !loaded && !isFailed && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy-800 via-navy-700 to-leaf-700" />}
      {mode === 'contain' && <div className="absolute inset-0 bg-navy-950/30" />}

      {!isFailed && (
        <img
          key={url}
          ref={ref}
          src={url}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          loading={priority ? 'eager' : (loading ?? 'lazy')}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          width={meta?.w}
          height={meta?.h}
          onLoad={() => setLoadedSrc(url)}
          onError={() => {
            setFailed((f) => ({ ...f, [current]: true }))
            if (fallback && current !== fallback) setCurrent(fallback)
          }}
          style={{ objectPosition, ...style }}
          className={cn(
            'relative h-full w-full transition-opacity duration-500',
            mode === 'contain' ? 'object-contain' : 'object-cover',
            loaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
          {...rest}
        />
      )}
      {isFailed && (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-navy-800 via-navy-700 to-leaf-700">
          <Wheat className="h-10 w-10 text-gold-400/40" />
        </div>
      )}
      {overlay && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />}
    </div>
  )
}
