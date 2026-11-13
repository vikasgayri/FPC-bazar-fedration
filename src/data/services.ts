import type { LText } from '@/types'
import { real } from './images'

/**
 * What the federation does for member FPOs — as described by the client (Nov 2026):
 * a not-for-profit federation that gives FPOs solutions, business linkage, government projects,
 * subsidy and funding support, and market linkage for their products.
 */
export const network = {
  fpos: 6000,
  states: 17,
}

export type ServiceIcon = 'solutions' | 'linkage' | 'projects' | 'subsidy' | 'funding' | 'market'

export interface FpoService {
  key: ServiceIcon
  title: LText
  text: LText
  points: LText[]
  image: string
  cta?: { to: string; label: LText }
}

export const fpoServices: FpoService[] = [
  {
    key: 'solutions',
    title: { en: 'Business solutions', hi: 'व्यावसायिक समाधान' },
    text: {
      en: 'Practical help to run the FPO well — planning, compliance, governance and training for the board and members.',
      hi: 'FPO को सुचारु रूप से चलाने में व्यावहारिक सहायता — योजना, अनुपालन, प्रबंधन और बोर्ड व सदस्यों का प्रशिक्षण।',
    },
    points: [
      { en: 'Business planning and product selection', hi: 'व्यवसाय योजना और उत्पाद चयन' },
      { en: 'Compliance, filings and resolving pending paperwork', hi: 'अनुपालन, फ़ाइलिंग और लंबित कागज़ी कार्य का समाधान' },
      { en: 'Training for FPO management and farmer members', hi: 'FPO प्रबंधन और किसान सदस्यों का प्रशिक्षण' },
    ],
    image: real.fpoTraining1,
  },
  {
    key: 'linkage',
    title: { en: 'Business linkage', hi: 'व्यावसायिक लिंकेज' },
    text: {
      en: 'Connecting FPOs with processors, input companies, institutions, technology partners and other FPOs.',
      hi: 'FPO को प्रसंस्करणकर्ताओं, इनपुट कंपनियों, संस्थाओं, तकनीकी साझेदारों और अन्य FPO से जोड़ना।',
    },
    points: [
      { en: 'Partnerships with companies and institutions', hi: 'कंपनियों और संस्थाओं के साथ साझेदारी' },
      { en: 'Input supply and technology tie-ups', hi: 'इनपुट आपूर्ति और तकनीकी गठजोड़' },
      { en: 'FPO-to-FPO collaboration across states', hi: 'राज्यों के बीच FPO से FPO सहयोग' },
    ],
    image: real.mouSigning,
  },
  {
    key: 'projects',
    title: { en: 'Government projects', hi: 'सरकारी परियोजनाएं' },
    text: {
      en: 'Helping FPOs get and carry out central and state government projects and programmes.',
      hi: 'FPO को केंद्र व राज्य सरकार की परियोजनाएं और कार्यक्रम दिलाने और लागू करने में सहायता।',
    },
    points: [
      { en: 'Information on open projects and programmes', hi: 'खुली परियोजनाओं और कार्यक्रमों की जानकारी' },
      { en: 'Project proposals and documentation', hi: 'परियोजना प्रस्ताव और दस्तावेज़ीकरण' },
      { en: 'Support during implementation', hi: 'क्रियान्वयन के दौरान सहयोग' },
    ],
    image: real.projectPresentation,
  },
  {
    key: 'subsidy',
    title: { en: 'Subsidy assistance', hi: 'सब्सिडी सहायता' },
    text: {
      en: 'Finding the subsidies an FPO is eligible for and following the application through to approval.',
      hi: 'FPO किन सब्सिडी के लिए पात्र है यह पहचानना और आवेदन को स्वीकृति तक आगे बढ़ाना।',
    },
    points: [
      { en: 'Eligibility check for schemes and subsidies', hi: 'योजनाओं और सब्सिडी की पात्रता जांच' },
      { en: 'Application preparation and submission', hi: 'आवेदन तैयार करना और जमा करना' },
      { en: 'Follow-up with departments', hi: 'विभागों से फ़ॉलो-अप' },
    ],
    image: real.tribalSchemePoster,
  },
  {
    key: 'funding',
    title: { en: 'Funding from government', hi: 'सरकारी फ़ंडिंग' },
    text: {
      en: 'Facilitating government funding, bank credit and CSR support so that FPO projects can start and grow.',
      hi: 'सरकारी फ़ंडिंग, बैंक ऋण और CSR सहयोग दिलाने में सहायता ताकि FPO परियोजनाएं शुरू होकर आगे बढ़ सकें।',
    },
    points: [
      { en: 'Access to government funding and grants', hi: 'सरकारी फ़ंडिंग और अनुदान तक पहुंच' },
      { en: 'Bank and institutional credit linkage', hi: 'बैंक और संस्थागत ऋण लिंकेज' },
      { en: 'CSR and PPP partners for projects', hi: 'परियोजनाओं के लिए CSR और PPP साझेदार' },
    ],
    image: real.partnersMeet,
  },
  {
    key: 'market',
    title: { en: 'Market linkage', hi: 'बाज़ार लिंकेज' },
    text: {
      en: 'Taking FPO products to wholesale, retail, institutional and export buyers — the FPO sells directly and keeps the full value.',
      hi: 'FPO उत्पादों को थोक, खुदरा, संस्थागत और निर्यात खरीदारों तक पहुंचाना — FPO सीधे बेचता है और पूरा मूल्य पाता है।',
    },
    points: [
      { en: 'Verified buyer enquiries through FPC Bazaar', hi: 'FPC बाजार से जांची हुई खरीदार पूछताछ' },
      { en: 'Exhibitions, buyer–seller meets and trade fairs', hi: 'प्रदर्शनी, खरीदार–विक्रेता बैठकें और व्यापार मेले' },
      { en: 'Branding, packaging and quality support', hi: 'ब्रांडिंग, पैकेजिंग और गुणवत्ता सहयोग' },
    ],
    image: real.fpoProducts,
    cta: { to: '/bazaar', label: { en: 'Explore FPC Bazaar', hi: 'FPC बाजार देखें' } },
  },
]

export const fpoJourney: { title: LText; text: LText }[] = [
  { title: { en: 'Register', hi: 'पंजीकरण' }, text: { en: 'The FPO applies to join the federation network.', hi: 'FPO फेडरेशन नेटवर्क से जुड़ने के लिए आवेदन करता है।' } },
  { title: { en: 'Needs assessment', hi: 'ज़रूरतों का आकलन' }, text: { en: 'Our team understands the FPO’s produce, members and gaps.', hi: 'हमारी टीम FPO की उपज, सदस्यों और कमियों को समझती है।' } },
  { title: { en: 'Linkage & support', hi: 'लिंकेज और सहयोग' }, text: { en: 'Schemes, funding, partners and buyers are connected.', hi: 'योजनाएं, फ़ंडिंग, साझेदार और खरीदार जोड़े जाते हैं।' } },
  { title: { en: 'Grow', hi: 'विकास' }, text: { en: 'The FPO trades directly and grows its business and income.', hi: 'FPO सीधे व्यापार करता है और अपना व्यवसाय व आय बढ़ाता है।' } },
]
