import type { ReactNode } from 'react'
import { Handshake, Users } from 'lucide-react'
import { useEnquiryList } from '@/context/EnquiryListContext'
import { useLang } from '@/hooks/useLang'
import { inr } from '@/utils/format'

/** Side panel: how many FPOs the enquiry reaches + indicative value (never a bill). */
export default function EnquirySummary({ cta, children }: { cta?: ReactNode; children?: ReactNode }) {
  const { indicativeValue, producers, count } = useEnquiryList()
  const { t } = useLang()
  return (
    <div className="rounded-[1.5rem] bg-white p-6 shadow-card">
      <p className="font-display text-xl text-navy-900">{t('send.summary')}</p>
      {children}
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft">{t('shop.results', { count })}</dt>
          <dd className="flex items-center gap-1.5 font-semibold text-leaf-700">
            <Users className="h-4 w-4" /> {producers} FPO
          </dd>
        </div>
        <div className="flex justify-between border-t border-navy-900/10 pt-4 text-base">
          <dt className="font-bold text-navy-900">{t('elist.value')}</dt>
          <dd className="font-display text-2xl text-navy-900">≈ {inr(indicativeValue)}</dd>
        </div>
        <p className="text-xs text-ink-mute">{t('elist.valueNote')}</p>
      </dl>
      <p className="mt-5 flex gap-2 rounded-xl bg-leaf-50 p-3 text-xs font-semibold leading-relaxed text-leaf-800">
        <Handshake className="h-4 w-4 shrink-0" /> {t('send.noPayment')}
      </p>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  )
}
