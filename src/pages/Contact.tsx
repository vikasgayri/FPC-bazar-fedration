import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import EnquiryForm from '@/components/forms/EnquiryForm'
import { Reveal } from '@/components/ui/Motion'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { org } from '@/data/site'
import { real } from '@/data/images'

export default function Contact() {
  const { t, L } = useLang()
  useDocumentTitle(t('contact.pageTitle'))
  const cards = [
    { I: MapPin, title: t('contact.office'), lines: [L(org.address)] },
    { I: Phone, title: t('contact.call'), lines: [...org.phones, org.landline], href: (l: string) => `tel:${l.replace(/\s/g, '')}` },
    { I: Mail, title: t('contact.write'), lines: org.emails, href: (l: string) => `mailto:${l}` },
    { I: Clock, title: t('contact.hours'), lines: [t('contact.hoursVal')] },
  ]
  return (
    <>
      <PageHero title={t('contact.pageTitle')} text={t('contact.pageText')} image={real.federationPavilion2} crumbs={[{ label: t('nav.contact') }]} size="sm" />
      <section className="bg-cream-50 py-16 sm:py-24">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ I, title, lines, href }, i) => (
              <Reveal key={title} delay={i * 0.06} className="rounded-[1.5rem] bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-400">
                  <I className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{title}</p>
                <div className="mt-2 space-y-1 text-sm font-semibold text-navy-900">
                  {lines.map((l) =>
                    href ? (
                      <a key={l} href={href(l)} className="block break-all hover:text-leaf-700">
                        {l}
                      </a>
                    ) : (
                      <p key={l}>{l}</p>
                    ),
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal className="rounded-[1.75rem] bg-white p-6 shadow-lift sm:p-10">
              <p className="font-display text-2xl text-navy-900">{t('contact.formTitle')}</p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-4">
              <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-[1.75rem] shadow-card">
                <iframe
                  title="FPC Bazaar Federation office map"
                  src="https://www.google.com/maps?q=Vishnu+Apartment,+Sardar+Patel+Marg,+Chomu+House+Circle,+Jaipur+302001&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a href={`https://wa.me/${org.whatsapp}`} target="_blank" rel="noreferrer" className="btn-leaf !py-4">
                <MessageCircle className="h-5 w-5" /> {t('contact.whatsapp')}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
