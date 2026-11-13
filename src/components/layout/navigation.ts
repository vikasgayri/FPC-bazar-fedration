import { initiatives } from '@/data/initiatives'

export interface NavChild {
  key: string
  to: string
  labelKey?: string
  label?: { en: string; hi?: string }
}
export interface NavItem {
  labelKey: string
  to: string
  mega?: 'initiatives'
  children?: NavChild[]
}

export const mainNav: NavItem[] = [
  { labelKey: 'nav.home', to: '/' },
  {
    labelKey: 'nav.about',
    to: '/about',
    children: [
      { key: 'about', to: '/about', label: { en: 'Our Story, Mission & Vision', hi: 'हमारी कहानी, मिशन व विज़न' } },
      { key: 'leaders', to: '/about#leadership', label: { en: 'Leadership & Advisory', hi: 'नेतृत्व एवं सलाहकार' } },
      { key: 'how', to: '/about#how-it-works', label: { en: 'How We Work', hi: 'कार्य पद्धति' } },
      { key: 'reg', to: '/about#registration', label: { en: 'Registration & Official Details', hi: 'पंजीकरण एवं आधिकारिक विवरण' } },
    ],
  },
  { labelKey: 'nav.initiatives', to: '/initiatives', mega: 'initiatives' },
  {
    labelKey: 'nav.services',
    to: '/fpo-services',
    children: [
      { key: 'services', to: '/fpo-services', label: { en: 'Services for FPOs', hi: 'FPO के लिए सेवाएं' } },
      { key: 'bazaar', to: '/bazaar', label: { en: 'FPC Bazaar — buy from FPOs', hi: 'FPC बाजार — FPO से खरीदें' } },
      { key: 'register', to: '/register?type=FPO', label: { en: 'Register your FPO', hi: 'अपना FPO पंजीकृत करें' } },
    ],
  },
  {
    labelKey: 'nav.media',
    to: '/news',
    children: [
      { key: 'news', to: '/news', labelKey: 'nav.news' },
      { key: 'gallery', to: '/gallery', labelKey: 'nav.gallery' },
    ],
  },
  { labelKey: 'nav.contact', to: '/contact' },
]

export const megaGroups = [
  { group: 'priority' as const, items: initiatives.filter((i) => i.group === 'priority') },
  { group: 'special' as const, items: initiatives.filter((i) => i.group === 'special') },
  { group: 'flagship' as const, items: initiatives.filter((i) => i.group === 'flagship') },
]
