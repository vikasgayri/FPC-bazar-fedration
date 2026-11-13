import { forwardRef, useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/format'

/** Unique, label-linked id even for inputs without a `name` (and no clashes between two forms). */
function useFieldId(id?: string, name?: string) {
  const auto = useId()
  return id ?? (name ? `${name}-${auto}` : auto)
}

interface Base {
  label: ReactNode
  error?: string
  hint?: string
  wrapClassName?: string
}

export const Input = forwardRef<HTMLInputElement, Base & InputHTMLAttributes<HTMLInputElement>>(function Input(
  { label, error, hint, wrapClassName, className, id, ...rest },
  ref,
) {
  const fid = useFieldId(id, rest.name as string | undefined)
  return (
    <div className={wrapClassName}>
      <label htmlFor={fid} className="field-label">
        {label}
      </label>
      <input id={fid} ref={ref} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined} className={cn('field', error && 'border-red-400 focus:border-red-500 focus:ring-red-500/10', className)} {...rest} />
      {error ? (
        <p id={`${fid}-err`} className="field-error">
          {error}
        </p>
      ) : hint ? <p className="mt-1 text-xs text-ink-mute">{hint}</p> : null}
    </div>
  )
})

export const Select = forwardRef<HTMLSelectElement, Base & SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[]; placeholder?: string }>(
  function Select({ label, error, wrapClassName, className, options, placeholder, id, ...rest }, ref) {
    const fid = useFieldId(id, rest.name as string | undefined)
    return (
      <div className={wrapClassName}>
        <label htmlFor={fid} className="field-label">
          {label}
        </label>
        <select id={fid} ref={ref} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined} className={cn('field appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2712%27%20height%3D%278%27%3E%3Cpath%20d%3D%27M1%201l5%205%205-5%27%20stroke%3D%27%230B2545%27%20fill%3D%27none%27%20stroke-width%3D%271.5%27/%3E%3C/svg%3E")] bg-[right_1rem_center] bg-no-repeat pr-10', error && 'border-red-400', className)} {...rest}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${fid}-err`} className="field-error">
            {error}
          </p>
        )}
      </div>
    )
  },
)

export const Textarea = forwardRef<HTMLTextAreaElement, Base & TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { label, error, wrapClassName, className, id, ...rest },
  ref,
) {
  const fid = useFieldId(id, rest.name as string | undefined)
  return (
    <div className={wrapClassName}>
      <label htmlFor={fid} className="field-label">
        {label}
      </label>
      <textarea id={fid} ref={ref} rows={4} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined} className={cn('field resize-y', error && 'border-red-400', className)} {...rest} />
      {error && (
        <p id={`${fid}-err`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
})

export function CheckChips({
  label,
  options,
  value,
  onChange,
}: {
  label: ReactNode
  options: { value: string; label: string }[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  return (
    <fieldset>
      <legend className="field-label">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.value)
          return (
            <button
              type="button"
              key={o.value}
              onClick={() => onChange(on ? value.filter((v) => v !== o.value) : [...value, o.value])}
              className={cn(
                'rounded-full border px-3.5 py-2 text-xs font-semibold transition',
                on ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/40',
              )}
              aria-pressed={on}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
