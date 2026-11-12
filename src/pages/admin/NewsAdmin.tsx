import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { AdminCard, ImageField, PageTitle, Table } from '@/components/admin/AdminUi'
import { Modal } from '@/components/ui/Overlay'
import { Input, Select, Textarea } from '@/components/forms/Field'
import Img from '@/components/ui/Img'
import { PageLoader, Spinner } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { useToast } from '@/context/ToastContext'
import { newsService } from '@/services/contentService'
import type { NewsItem } from '@/types'
import { cn, fmtDate } from '@/utils/format'

const CATS = ['Event', 'Press', 'Initiative', 'Award', 'Partnership'] as const
const schema = z.object({
  titleEn: z.string().trim().min(5, 'Title required'),
  titleHi: z.string().optional(),
  excerptEn: z.string().trim().min(10, 'Excerpt required'),
  excerptHi: z.string().optional(),
  bodyEn: z.string().trim().min(20, 'At least 20 characters'),
  bodyHi: z.string().optional(),
  category: z.enum(CATS),
  image: z.string().min(1, 'Image required'),
  date: z.string().min(1),
  published: z.boolean(),
})
type Form = z.infer<typeof schema>

function NewsForm({ initial, onDone }: { initial?: NewsItem; onDone: () => void }) {
  const toast = useToast()
  const { t } = useLang()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      titleEn: initial?.title.en ?? '',
      titleHi: initial?.title.hi ?? '',
      excerptEn: initial?.excerpt.en ?? '',
      excerptHi: initial?.excerpt.hi ?? '',
      bodyEn: initial?.body.en ?? '',
      bodyHi: initial?.body.hi ?? '',
      category: initial?.category ?? 'Event',
      image: initial?.image ?? '',
      date: (initial?.date ?? new Date().toISOString()).slice(0, 10),
      published: initial?.published ?? true,
    },
  })
  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (v) => {
        const payload = {
          title: { en: v.titleEn, hi: v.titleHi || undefined },
          excerpt: { en: v.excerptEn, hi: v.excerptHi || undefined },
          body: { en: v.bodyEn, hi: v.bodyHi || undefined },
          category: v.category,
          image: v.image,
          date: new Date(v.date).toISOString(),
          published: v.published,
        }
        if (initial) await newsService.update(initial.id, payload)
        else await newsService.create(payload)
        toast('success', initial ? 'Article updated (demo)' : 'Article published (demo)')
        onDone()
      })}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Input label="Title (English)" {...register('titleEn')} error={errors.titleEn?.message} />
      <Input label="शीर्षक (Hindi)" {...register('titleHi')} />
      <Textarea label="Excerpt (English)" rows={2} {...register('excerptEn')} error={errors.excerptEn?.message} />
      <Textarea label="सारांश (Hindi)" rows={2} {...register('excerptHi')} />
      <Textarea label="Body (English)" rows={5} {...register('bodyEn')} error={errors.bodyEn?.message} />
      <Textarea label="विवरण (Hindi)" rows={5} {...register('bodyHi')} />
      <Select label="Category" {...register('category')} options={CATS.map((c) => ({ value: c, label: c }))} />
      <Input label="Date" type="date" {...register('date')} />
      <div className="sm:col-span-2">
        <Controller control={control} name="image" render={({ field }) => <ImageField value={field.value} onChange={field.onChange} />} />
        {errors.image && <p className="field-error">{errors.image.message}</p>}
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" {...register('published')} className="h-4 w-4 accent-navy-900" /> {t('admin.published')}
      </label>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <button type="button" onClick={onDone} className="btn-outline">
          {t('common.cancel')}
        </button>
        <button className="btn-primary" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="h-4 w-4" />} {t('common.save')}
        </button>
      </div>
    </form>
  )
}

export default function NewsAdmin() {
  const { t, L } = useLang()
  useDocumentTitle(t('admin.news'))
  const toast = useToast()
  const { data, loading, reload } = useAsync(() => newsService.list({ includeDrafts: true }), [])
  const [edit, setEdit] = useState<NewsItem | 'new' | null>(null)
  return (
    <>
      <PageTitle
        title={t('admin.news')}
        text="Manage News & Events shown on the website (bilingual)."
        action={
          <button onClick={() => setEdit('new')} className="btn-primary">
            <Plus className="h-4 w-4" /> {t('admin.addNews')}
          </button>
        }
      />
      <AdminCard>
        {loading ? (
          <PageLoader />
        ) : (
          <Table head={['Article', 'Category', 'Date', 'Status', '']} empty={!data?.length}>
            {data?.map((n) => (
              <tr key={n.id} className="hover:bg-cream-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Img src={n.image} alt="" sizes="80px" wrapClassName="h-11 w-16 shrink-0 rounded-lg" />
                    <p className="line-clamp-2 font-semibold text-navy-900">{L(n.title)}</p>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-soft">{n.category}</td>
                <td className="px-5 py-3 text-ink-soft">{fmtDate(n.date)}</td>
                <td className="px-5 py-3">
                  <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-bold', n.published ? 'bg-leaf-100 text-leaf-700' : 'bg-gray-100 text-gray-500')}>{n.published ? t('admin.published') : t('admin.draft')}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => setEdit(n)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream-100" aria-label={t('common.edit')}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(t('admin.confirmDelete'))) return
                        await newsService.remove(n.id)
                        toast('success', 'Deleted (demo)')
                        reload()
                      }}
                      className="grid h-8 w-8 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                      aria-label={t('common.delete')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </AdminCard>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit === 'new' ? t('admin.addNews') : t('admin.editNews')} wide>
        {edit && (
          <NewsForm
            initial={edit === 'new' ? undefined : edit}
            onDone={() => {
              setEdit(null)
              reload()
            }}
          />
        )}
      </Modal>
    </>
  )
}
