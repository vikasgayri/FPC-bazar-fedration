import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Pencil, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { AdminCard, ImageField, PageTitle, SearchBox, Table } from '@/components/admin/AdminUi'
import { Modal } from '@/components/ui/Overlay'
import { Input, Select, Textarea } from '@/components/forms/Field'
import Img from '@/components/ui/Img'
import { PageLoader, Spinner } from '@/components/ui/Primitives'
import { useAsync } from '@/hooks/useAsync'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { useToast } from '@/context/ToastContext'
import { productService } from '@/services/productService'
import { categories } from '@/mocks/products'
import type { Product, ProductCategory } from '@/types'
import { cn, inr } from '@/utils/format'

const schema = z.object({
    nameEn: z.string().trim().min(3, 'Name required'),
    nameHi: z.string().optional(),
    descEn: z.string().trim().min(10, 'At least 10 characters'),
    descHi: z.string().optional(),
    category: z.string().min(1),
    price: z.coerce.number().positive('Must be > 0'),
    unit: z.string().trim().min(1, 'Unit required'),
    moq: z.coerce.number().int().min(1, 'At least 1'),
    capacity: z.coerce.number().int().min(0),
    producer: z.string().trim().min(2, 'Producer required'),
    origin: z.string().trim().min(2, 'Origin required'),
    image: z.string().min(1, 'Image required'),
    featured: z.boolean(),
    active: z.boolean(),
  })
type Form = z.input<typeof schema>
type Out = z.output<typeof schema>

const toForm = (p?: Product): Form => ({
  nameEn: p?.name.en ?? '',
  nameHi: p?.name.hi ?? '',
  descEn: p?.description.en ?? '',
  descHi: p?.description.hi ?? '',
  category: p?.category ?? 'grains',
  price: (p?.price ?? '') as unknown as number,
  unit: p?.unit ?? '',
  moq: p?.moq ?? 1,
  capacity: p?.capacity ?? 0,
  producer: p?.producer ?? '',
  origin: p?.origin ?? '',
  image: p?.image ?? '',
  featured: p?.featured ?? false,
  active: p?.active ?? true,
})

function ProductForm({ initial, onDone }: { initial?: Product; onDone: () => void }) {
  const toast = useToast()
  const { t } = useLang()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Form, unknown, Out>({ resolver: zodResolver(schema), defaultValues: toForm(initial) })

  const submit = async (v: Out) => {
    const payload = {
      name: { en: v.nameEn, hi: v.nameHi || undefined },
      description: { en: v.descEn, hi: v.descHi || undefined },
      category: v.category as ProductCategory,
      price: v.price,
      unit: v.unit,
      moq: v.moq,
      capacity: v.capacity,
      producer: v.producer,
      origin: v.origin,
      image: v.image,
      gallery: [v.image],
      featured: v.featured,
      active: v.active,
      tags: initial?.tags ?? [],
    }
    if (initial) await productService.update(initial.id, payload)
    else await productService.create(payload)
    toast('success', initial ? 'Product updated (demo)' : 'Product added (demo)')
    onDone()
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4 sm:grid-cols-2">
      <Input label="Name (English)" {...register('nameEn')} error={errors.nameEn?.message} />
      <Input label="नाम (Hindi)" {...register('nameHi')} />
      <Textarea label="Description (English)" {...register('descEn')} error={errors.descEn?.message} rows={3} />
      <Textarea label="विवरण (Hindi)" {...register('descHi')} rows={3} />
      <Select label="Category" {...register('category')} options={categories.map((c) => ({ value: c.key, label: c.label.en }))} />
      <Input label="Trading unit" {...register('unit')} error={errors.unit?.message} placeholder="kg, litre, 40 kg bag…" />
      <Input label="Indicative price per unit (₹)" inputMode="numeric" {...register('price')} error={errors.price?.message} />
      <Input label="Minimum enquiry quantity" inputMode="numeric" {...register('moq')} error={errors.moq?.message} />
      <Input label="Monthly supply capacity (0 = out of season)" inputMode="numeric" {...register('capacity')} error={errors.capacity?.message} />
      <Input label="Producer (FPO / SHG / Dairy)" {...register('producer')} error={errors.producer?.message} wrapClassName="sm:col-span-2" />
      <Input label="Origin" {...register('origin')} error={errors.origin?.message} wrapClassName="sm:col-span-2" placeholder="District, State" />
      <div className="sm:col-span-2">
        <Controller control={control} name="image" render={({ field }) => <ImageField value={field.value} onChange={field.onChange} />} />
        {errors.image && <p className="field-error">{errors.image.message}</p>}
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" {...register('featured')} className="h-4 w-4 accent-navy-900" /> Featured on homepage
      </label>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" {...register('active')} className="h-4 w-4 accent-navy-900" /> Visible in FPC Bazaar
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

export default function Products() {
  const { t, L } = useLang()
  useDocumentTitle(t('admin.products'))
  const toast = useToast()
  const { data, loading, reload } = useAsync(() => productService.list({}, { includeInactive: true }), [])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [edit, setEdit] = useState<Product | 'new' | null>(null)
  const list = useMemo(
    () => (data ?? []).filter((p) => (cat === 'all' || p.category === cat) && (p.name.en + p.producer).toLowerCase().includes(q.toLowerCase())),
    [data, q, cat],
  )

  return (
    <>
      <PageTitle
        title={t('admin.products')}
        text="FPO product listings shown in FPC Bazaar (demo — saved in this browser only). Prices are indicative; FPOs quote buyers directly."
        action={
          <button onClick={() => setEdit('new')} className="btn-primary">
            <Plus className="h-4 w-4" /> {t('admin.addProduct')}
          </button>
        }
      />
      <AdminCard>
        <div className="flex flex-wrap items-center gap-3 border-b border-navy-900/5 p-4">
          <SearchBox value={q} onChange={setQ} />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="field !w-auto !rounded-full !py-2.5" aria-label="Category">
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label.en}
              </option>
            ))}
          </select>
          <span className="ml-auto text-xs font-semibold text-ink-mute">{list.length} items</span>
        </div>
        {loading ? (
          <PageLoader />
        ) : (
          <Table head={['Product', 'Category', 'Indicative price', 'Min. / Capacity', 'Status', '']} empty={!list.length}>
            {list.map((p) => (
              <tr key={p.id} className="hover:bg-cream-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Img src={p.image} alt="" sizes="80px" wrapClassName="h-11 w-11 shrink-0 rounded-lg" />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-navy-900">{L(p.name)}</p>
                      <p className="truncate text-xs text-ink-mute">{p.producer}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-soft">{categories.find((c) => c.key === p.category)?.label.en}</td>
                <td className="px-5 py-3 font-semibold">
                  {inr(p.price)} <span className="text-xs text-ink-mute">/ {p.unit}</span>
                </td>
                <td className={cn('px-5 py-3 text-xs font-semibold', p.capacity <= 0 ? 'text-saffron-600' : 'text-navy-900')}>
                  {p.moq.toLocaleString('en-IN')} / {p.capacity > 0 ? `${p.capacity.toLocaleString('en-IN')} pm` : 'out of season'}
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={async () => {
                      await productService.update(p.id, { active: !p.active })
                      reload()
                    }}
                    className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold', p.active ? 'bg-leaf-100 text-leaf-700' : 'bg-gray-100 text-gray-500')}
                  >
                    {p.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} {p.active ? t('admin.active') : t('admin.hidden')}
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => setEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream-100" aria-label={t('common.edit')}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(t('admin.confirmDelete'))) return
                        await productService.remove(p.id)
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
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit === 'new' ? t('admin.addProduct') : t('admin.editProduct')} wide>
        {edit && (
          <ProductForm
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
