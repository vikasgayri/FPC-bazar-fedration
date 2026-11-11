import { useSearchParams } from 'react-router-dom'
import { Flame, Handshake, HeartHandshake, Package, Sprout, Building } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import EnquiryForm from '@/components/forms/EnquiryForm'
import { Reveal } from '@/components/ui/Motion'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { real } from '@/data/images'
import { partners } from '@/data/site'
import type { EnquiryType } from '@/types'

export default function Partner() {
  const { t, L } = useLang()
  useDocumentTitle(t('enquiry.pageTitle'))
  const [params] = useSearchParams()
  const type = (params.get('type') as EnquiryType) ?? 'PARTNERSHIP'

  const why = [
    { I: Flame, k: 'CBG_INVESTMENT', en: '5–10 TPD CBG plants with feedstock, technology partners and assured buyback.', hi: 'फीडस्टॉक, तकनीकी साझेदार और सुनिश्चित बायबैक के साथ 5–10 TPD CBG प्लांट।' },
    { I: Building, k: 'PPP_PROJECT', en: 'PPP polyhouses, dairy and biogas units — zero investment for beneficiaries.', hi: 'PPP पॉलीहाउस, डेयरी और बायोगैस यूनिट — लाभार्थियों के लिए शून्य निवेश।' },
    { I: HeartHandshake, k: 'CSR', en: 'CSR programmes for women SHGs, tribal livelihoods and youth skilling.', hi: 'महिला SHG, आदिवासी आजीविका और युवा कौशल हेतु CSR कार्यक्रम।' },
    { I: Package, k: 'BULK_PURCHASE', en: 'Traceable bulk sourcing of grains, spices, ghee and organic inputs from FPOs.', hi: 'FPO से अनाज, मसाले, घी और जैविक इनपुट की ट्रेस करने योग्य थोक खरीद।' },
    { I: Sprout, k: 'PARTNERSHIP', en: 'Technology, input and distribution partnerships across the federation network.', hi: 'फेडरेशन नेटवर्क में तकनीक, इनपुट और वितरण साझेदारी।' },
  ]

  return (
    <>
      <PageHero title={t('enquiry.pageTitle')} text={t('enquiry.pageText')} image={real.partnersMeet} crumbs={[{ label: t('nav.partner') }]} eyebrow="निवेशक • CSR • संस्थाएं • थोक खरीदार" />
      <section className="bg-cream-50 py-16 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">{t('enquiry.why')}</span>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {why.map(({ I, k, en, hi }, i) => (
                <Reveal key={k} delay={i * 0.06} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400">
                    <I className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg text-navy-900">{t(`enquiry.types.${k}`)}</p>
                    <p className="mt-1 text-sm text-ink-soft">{L({ en, hi })}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-navy-900 p-6 text-white">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                <Handshake className="h-4 w-4" /> {t('home.partnersTitle')}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {partners.map((p) => (
                  <li key={p.name}>• {p.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-lift sm:p-10">
              <p className="font-display text-2xl text-navy-900">{t('contact.formTitle')}</p>
              <div className="mt-6">
                <EnquiryForm key={type} defaultType={type} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
