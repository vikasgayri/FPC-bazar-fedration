import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { ImageField, PageTitle } from '@/components/admin/AdminUi'
import { Modal } from '@/components/ui/Overlay'
import { Input, Select } from '@/components/forms/Field'
import Img from '@/components/ui/Img'
import { PageLoader } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { useToast } from '@/context/ToastContext'
import { galleryService } from '@/services/contentService'
import type { GalleryItem } from '@/types'

const ALBUMS: GalleryItem['album'][] = ['Events', 'Field Work', 'Gaushala & Dairy', 'SHG & Women', 'Exhibitions', 'Projects']

export default function GalleryAdmin() {
  const { t, L } = useLang()
  useDocumentTitle(t('admin.gallery'))
  const toast = useToast()
  const { data, loading, reload } = useAsync(() => galleryService.list(), [])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ en: '', hi: '', album: ALBUMS[0], image: '' })
  const [err, setErr] = useState<string | null>(null)

  return (
    <>
      <PageTitle
        title={t('admin.gallery')}
        text={`${data?.length ?? 0} photos • demo uploads are stored in this browser only.`}
        action={
          <button onClick={() => setOpen(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> {t('admin.addPhoto')}
          </button>
        }
      />
      {loading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.map((g) => (
            <figure key={g.id} className="group overflow-hidden rounded-2xl bg-white shadow-card">
              <div className="relative">
                <Img src={g.image} alt="" wrapClassName="aspect-[4/3]" />
                <button
                  onClick={async () => {
                    if (!confirm(t('admin.confirmDelete'))) return
                    await galleryService.remove(g.id)
                    toast('success', 'Removed (demo)')
                    reload()
                  }}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-red-600 opacity-0 transition group-hover:opacity-100"
                  aria-label={t('common.delete')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <figcaption className="p-3">
                <p className="truncate text-sm font-semibold text-navy-900">{L(g.title)}</p>
                <p className="text-[11px] text-ink-mute">{g.album}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title={t('admin.addPhoto')}>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!form.en.trim() || !form.image) return setErr('Title and image are required.')
            await galleryService.create({ title: { en: form.en, hi: form.hi || undefined }, album: form.album, image: form.image })
            toast('success', 'Photo added (demo)')
            setForm({ en: '', hi: '', album: ALBUMS[0], image: '' })
            setErr(null)
            setOpen(false)
            reload()
          }}
          className="space-y-4"
        >
          <ImageField value={form.image} onChange={(image) => setForm((f) => ({ ...f, image }))} />
          <Input label="Caption (English)" value={form.en} onChange={(e) => setForm((f) => ({ ...f, en: e.target.value }))} />
          <Input label="कैप्शन (Hindi)" value={form.hi} onChange={(e) => setForm((f) => ({ ...f, hi: e.target.value }))} />
          <Select label="Album" value={form.album} onChange={(e) => setForm((f) => ({ ...f, album: e.target.value as GalleryItem['album'] }))} options={ALBUMS.map((a) => ({ value: a, label: a }))} />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="btn-outline">
              {t('common.cancel')}
            </button>
            <button className="btn-primary">{t('common.save')}</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
