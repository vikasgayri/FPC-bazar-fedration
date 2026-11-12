import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Expand } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import { Lightbox } from '@/components/ui/Overlay'
import { PageLoader } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { galleryService } from '@/services/contentService'
import { real } from '@/data/images'
import { cn } from '@/utils/format'

export default function Gallery() {
  const { t, L } = useLang()
  useDocumentTitle(t('gallery.pageTitle'))
  const { data, loading } = useAsync(() => galleryService.list(), [])
  const [album, setAlbum] = useState('all')
  const [lb, setLb] = useState<number | null>(null)
  const albums = ['all', ...Array.from(new Set((data ?? []).map((g) => g.album)))]
  const list = (data ?? []).filter((g) => album === 'all' || g.album === album)

  return (
    <>
      <PageHero title={t('gallery.pageTitle')} text={t('gallery.pageText')} image={real.ngoGroup} crumbs={[{ label: t('nav.gallery') }]} size="sm" />
      <section className="bg-cream-50 py-16 sm:py-24">
        <div className="container">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {albums.map((a) => (
              <button key={a} onClick={() => setAlbum(a)} className={cn('shrink-0 rounded-full border px-5 py-2 text-sm font-bold', album === a ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900')}>
                {a === 'all' ? t('gallery.all') : a}
              </button>
            ))}
          </div>
          {loading ? (
            <PageLoader />
          ) : (
            <motion.div layout className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
              <AnimatePresence>
                {list.map((g, i) => (
                  <motion.button
                    layout
                    key={g.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setLb(i)}
                    className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl sm:mb-4"
                  >
                    <Img src={g.image} alt={L(g.title)} natural fit="cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" wrapClassName="min-h-[120px]" className="transition duration-700 group-hover:scale-105" />
                    <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-950/85 via-transparent to-transparent p-4 text-left opacity-0 transition group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">{g.album}</span>
                      <span className="mt-1 text-sm font-semibold text-white">{L(g.title)}</span>
                    </span>
                    <Expand className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 p-2 text-navy-900 opacity-0 transition group-hover:opacity-100" />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          <Lightbox images={list.map((g) => ({ src: g.image, caption: L(g.title) }))} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
        </div>
      </section>
    </>
  )
}
