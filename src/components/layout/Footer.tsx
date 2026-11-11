import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { Logo } from '@/components/ui/Brand'
import { Ornament } from '@/components/ui/Primitives'
import { useLang } from '@/hooks/useLang'
import { org } from '@/data/site'
import { initiatives } from '@/data/initiatives'

export default function Footer() {
  const { t, L } = useLang()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const year = new Date().getFullYear()

  const quick = [
    { to: '/about', label: t('nav.about') },
    { to: '/initiatives', label: t('nav.initiatives') },
    { to: '/bazaar', label: t('nav.bazaar') },
    { to: '/news', label: t('nav.news') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ]
  const get = [
    { to: '/register?type=FARMER', label: t('register.farmer') },
    { to: '/register?type=FPO', label: t('register.fpo') },
    { to: '/register?type=SHG', label: t('register.shg') },
    { to: '/register?type=DAIRY', label: t('register.dairy') },
    { to: '/partner', label: t('nav.partner') },
    { to: '/register/track', label: t('nav.track') },
  ]
  const socials = [
    { I: Facebook, href: org.social.facebook, l: 'Facebook' },
    { I: Instagram, href: org.social.instagram, l: 'Instagram' },
    { I: Youtube, href: org.social.youtube, l: 'YouTube' },
    { I: Linkedin, href: org.social.linkedin, l: 'LinkedIn' },
  ]

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/70">
      <div className="absolute inset-0 bg-grain opacity-50" />
      <div className="pointer-events-none absolute -bottom-6 left-1/2 hidden w-max -translate-x-1/2 select-none font-hindi text-[9rem] leading-none text-white/[0.03] lg:block">
        सहकारिता • रोजगार • विकास
      </div>

      {/* Newsletter band */}
      <div className="relative border-b border-white/10">
        <div className="container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl text-white sm:text-3xl">{t('footer.newsletter')}</p>
            <p className="mt-1 text-sm">{t('footer.newsletterText')}</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (/\S+@\S+\.\S+/.test(email)) setDone(true)
            }}
            className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label={t('common.email')}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
            <button className="btn-gold !px-5 !py-2.5" disabled={done}>
              {done ? t('footer.subscribed') : t('footer.subscribe')}
            </button>
          </form>
        </div>
      </div>

      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{t('footer.about')}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {org.certifications.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 px-3 py-1 text-[11px] font-semibold text-gold-300">
                <BadgeCheck className="h-3.5 w-3.5" /> {c}
              </span>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            {socials.map(({ I, href, l }) => (
              <a key={l} href={href} aria-label={l} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{t('footer.quick')}</p>
          <ul className="mt-5 space-y-3 text-sm">
            {quick.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{t('footer.work')}</p>
          <ul className="mt-5 space-y-3 text-sm">
            {initiatives
              .filter((i) => i.group !== 'priority')
              .slice(0, 7)
              .map((i) => (
                <li key={i.slug}>
                  <Link to={`/initiatives/${i.slug}`} className="link-underline hover:text-white">
                    {L(i.title)}
                  </Link>
                </li>
              ))}
          </ul>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{t('footer.get')}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {get.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{t('footer.reach')}</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{L(org.address)}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="flex flex-col">
                {org.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-white">
                    {p}
                  </a>
                ))}
                <a href={`tel:${org.landline}`} className="hover:text-white">
                  {org.landline}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="flex min-w-0 flex-col">
                {org.emails.map((m) => (
                  <a key={m} href={`mailto:${m}`} className="break-all hover:text-white">
                    {m}
                  </a>
                ))}
              </span>
            </li>
          </ul>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-400 hover:text-gold-300">
            {t('nav.contact')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col items-center gap-3 py-6 text-center text-xs md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {org.legalName}. {t('footer.rights')} <span className="text-white/40">• CIN {org.cin}</span>
          </p>
          <Ornament light className="hidden md:flex" />
          <p className="text-white/50">
            {t('footer.demo')}{' '}
            <Link to="/admin/login" className="font-semibold text-gold-400 hover:text-gold-300">
              {t('nav.admin')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
