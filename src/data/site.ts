import type { LText } from '@/types'
import { advisoryPhotos as ap, team } from './images'

/** Organisation facts — sourced from the client's proposal (2025) and company profile (Jun 2025). */
export const org = {
  name: 'FPC Bazaar Federation',
  legalName: 'FPC Bazar Federation',
  nameHi: 'एफपीसी बाजार फेडरेशन',
  tagline: { en: 'Kisan • Yuva • Mahila Kalyan', hi: 'किसान • युवा • महिला कल्याण' } as LText,
  motto: { en: 'Chemical-free Farming • Healthy India • Self-reliant India', hi: 'जहर मुक्त कृषि • स्वस्थ भारत • आत्मनिर्भर भारत' } as LText,
  slogan: { en: 'Prosperous India, Prosperous Farmers', hi: 'समृद्ध किसान, समृद्ध भारत' } as LText,
  footerLine: { en: 'Cooperation • Employment • Development', hi: 'सहकारिता • रोजगार • विकास' } as LText,
  // Verified from the MCA Certificate of Incorporation (issued 3 Jan 2022, Central Registration Centre).
  cin: 'U85197RJ2022NPL078943',
  registeredYear: 2022,
  incorporatedOn: '2022-01-03',
  roc: 'RoC – Jaipur',
  pan: 'AAECF8742R',
  tan: 'JPRF02094B',
  directors: ['Laxman Lohana Satiya Sindhi', 'Sourabh Sindhi'],
  type: {
    en: 'Section 8 (Not-for-Profit) Company, limited by shares — licensed under Section 8 of the Companies Act, 2013',
    hi: 'धारा 8 (गैर-लाभकारी) कंपनी, शेयरों द्वारा सीमित — कंपनी अधिनियम, 2013 की धारा 8 के अंतर्गत लाइसेंस प्राप्त',
  } as LText,
  certifications: ['Section 12A', 'Section 80G', 'MCA Registered (2022)'],
  address: {
    en: 'Flat No. 104, Vishnu Apartment, A-8, Sardar Patel Marg, Chomu House Circle, Jaipur, Rajasthan 302001',
    hi: 'फ्लैट नं. 104, विष्णु अपार्टमेंट, A-8, सरदार पटेल मार्ग, चौमूं हाउस सर्किल, जयपुर, राजस्थान 302001',
  } as LText,
  phones: ['+91 88906 56575', '+91 89906 56575'],
  landline: '0141-4820481',
  emails: ['info@fpcbazarfederation.org', 'contactfpcbazaar@gmail.com'],
  website: 'www.fpcbazarfederation.org',
  whatsapp: '918890656575',
  targetStates: { en: ['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Maharashtra'], hi: ['मध्य प्रदेश', 'राजस्थान', 'गुजरात', 'महाराष्ट्र'] },
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    linkedin: '#',
  },
}

export const goals = [
  { value: 6000, suffix: '', label: { en: 'FPOs in the federation network', hi: 'फेडरेशन नेटवर्क में FPO' }, note: { en: 'Current network', hi: 'वर्तमान नेटवर्क' } },
  { value: 17, suffix: '', label: { en: 'States connected with the federation', hi: 'फेडरेशन से जुड़े राज्य' }, note: { en: 'Pan-India presence', hi: 'देशव्यापी उपस्थिति' } },
  { value: 10000, suffix: '', label: { en: 'Youth to be employed & self-reliant', hi: 'युवाओं को रोजगार एवं आत्मनिर्भरता' }, note: { en: 'Mission target', hi: 'मिशन लक्ष्य' } },
  { value: 0, prefix: '₹', suffix: '', label: { en: 'Investment required from beneficiaries', hi: 'लाभार्थी से कोई निवेश नहीं' }, note: { en: 'PPP model', hi: 'PPP मॉडल' } },
]

export const missionVision = {
  mission: {
    en: 'To empower farmers and rural communities by providing innovative and sustainable solutions in agriculture, dairy and rural development — ensuring economic growth and self-reliance.',
    hi: 'कृषि, डेयरी और ग्रामीण विकास में नवाचारी एवं टिकाऊ समाधान देकर किसानों और ग्रामीण समुदायों को सशक्त बनाना — आर्थिक प्रगति और आत्मनिर्भरता सुनिश्चित करना।',
  },
  vision: {
    en: 'To be a transformative force in rural development — employment for youth, employment for women, and self-reliance for tribal families — while fostering sustainable agriculture and preserving traditional resources.',
    hi: 'युवाओं को रोजगार, महिलाओं को रोजगार और आदिवासी परिवारों को आत्मनिर्भर बनाना — टिकाऊ कृषि और पारंपरिक संसाधनों के संरक्षण के साथ ग्रामीण विकास में परिवर्तनकारी शक्ति बनना।',
  },
  objective: {
    en: 'Through a network of 6,000+ FPOs across 17 states, create employment for 10,000 youth — self-reliant youth, self-sufficient farmers, prosperous India.',
    hi: '17 राज्यों के 6,000+ FPO के नेटवर्क के माध्यम से 10,000 युवाओं को रोजगार — आत्मनिर्भर युवा, स्वावलंबी किसान, समृद्ध भारत।',
  },
}

export const about = {
  intro: {
    en: 'FPC Bazaar Federation is a not-for-profit federation of Farmer Producer Organisations, with 6,000+ FPOs across 17 states in its network. Working across agriculture, dairy projects, gaushala development, government initiatives, net-house and poly-house farming and market linkage, we bridge the gap between farmers and sustainable growth opportunities — so that the backbone of our economy, the farmer, thrives in a competitive market.',
    hi: 'एफपीसी बाजार फेडरेशन किसान उत्पादक संगठनों का एक गैर-लाभकारी फेडरेशन है, जिसके नेटवर्क में 17 राज्यों के 6,000+ FPO जुड़े हैं। कृषि, डेयरी परियोजनाएं, गौशाला विकास, सरकारी योजनाएं, नेट-हाउस व पॉली-हाउस खेती और बाज़ार लिंकेज के माध्यम से हम किसानों और टिकाऊ विकास के अवसरों के बीच सेतु बनाते हैं।',
  },
}

export const howItWorks = [
  { title: { en: 'Community Engagement', hi: 'सामुदायिक जुड़ाव' }, text: { en: 'Engaging local farmers, self-help groups and rural communities to identify real needs.', hi: 'स्थानीय किसानों, स्वयं सहायता समूहों और ग्रामीण समुदायों से जुड़कर वास्तविक ज़रूरतों की पहचान।' } },
  { title: { en: 'Capacity Building', hi: 'क्षमता निर्माण' }, text: { en: 'Training sessions and workshops on modern agricultural and dairy practices.', hi: 'आधुनिक कृषि और डेयरी पद्धतियों पर प्रशिक्षण सत्र एवं कार्यशालाएं।' } },
  { title: { en: 'Project Implementation', hi: 'परियोजना क्रियान्वयन' }, text: { en: 'Designing and executing customised projects tailored to each cluster.', hi: 'हर क्लस्टर की ज़रूरत के अनुसार परियोजनाओं की रूपरेखा और क्रियान्वयन।' } },
  { title: { en: 'Sustainability Focus', hi: 'स्थिरता पर ध्यान' }, text: { en: 'Ensuring every project is environmentally and economically sustainable.', hi: 'हर परियोजना पर्यावरण और आर्थिक दृष्टि से टिकाऊ हो, यह सुनिश्चित करना।' } },
  { title: { en: 'Market Integration', hi: 'बाज़ार एकीकरण' }, text: { en: 'Connecting producers to buyers through streamlined supply chains for fair trade.', hi: 'सुव्यवस्थित आपूर्ति श्रृंखला से उत्पादकों को सीधे खरीदारों से जोड़ना — उचित व्यापार।' } },
]

export const fpoAgenda = [
  { en: 'Organising all FPOs (Farmer Producer Organisations) in Rajasthan and providing them with training.', hi: 'राजस्थान के सभी FPO को संगठित कर उन्हें प्रशिक्षण देना।' },
  { en: 'Enhancing production of Specific Product Areas and providing high-level marketing for their products.', hi: 'विशिष्ट उत्पाद क्षेत्रों का उत्पादन बढ़ाना और उनके उत्पादों की उच्च-स्तरीय मार्केटिंग।' },
  { en: 'Resolving penalties and paperwork arising from non-compliance with government regulations.', hi: 'सरकारी नियमों के अनुपालन से जुड़े दंड व कागज़ी कार्यवाही का समाधान।' },
  { en: 'Ensuring central and state government schemes are effectively communicated to FPOs.', hi: 'केंद्र व राज्य सरकार की योजनाओं की जानकारी FPO तक प्रभावी रूप से पहुंचाना।' },
  { en: 'Coordination and training programmes so farmers and FPO management understand the benefits of FPOs.', hi: 'किसानों और FPO प्रबंधन को FPO के लाभ समझाने हेतु समन्वय एवं प्रशिक्षण कार्यक्रम।' },
]

export interface Leader {
  name: string
  role: LText
  credential?: LText
  photo?: string
  message?: LText
}

export const chairman: Leader = {
  name: 'Laxman Lohana',
  role: { en: 'Chairman', hi: 'अध्यक्ष' },
  credential: { en: 'Founder Director & Promoter', hi: 'संस्थापक निदेशक एवं प्रवर्तक' },
  photo: team.laxmanLohana,
  message: {
    en: 'It gives me immense pleasure to introduce FPC Bazaar Federation, an organisation committed to transforming the agricultural landscape of our nation. Agriculture is not just a profession; it is the backbone of our economy and a way of life for millions. We are driven by the belief that empowering farmers is key to building a prosperous and sustainable future. Our vision is clear: to be a trusted partner in every farmer’s journey towards growth and success. I invite you to join hands with us in this mission.',
    hi: 'एफपीसी बाजार फेडरेशन का परिचय कराते हुए मुझे अत्यंत प्रसन्नता हो रही है — एक ऐसा संगठन जो देश के कृषि परिदृश्य को बदलने के लिए प्रतिबद्ध है। कृषि केवल व्यवसाय नहीं, हमारी अर्थव्यवस्था की रीढ़ और करोड़ों लोगों की जीवनशैली है। हमारा विश्वास है कि किसानों को सशक्त करना ही समृद्ध और टिकाऊ भविष्य की कुंजी है। हमारा लक्ष्य हर किसान की विकास यात्रा में एक भरोसेमंद साथी बनना है। मैं आपको इस मिशन से जुड़ने के लिए आमंत्रित करता हूं।',
  },
}

export const leadership: Leader[] = [
  {
    name: 'Naveen Dhingra',
    role: { en: 'Managing Director', hi: 'प्रबंध निदेशक' },
    photo: team.naveenDhingra,
    message: {
      en: 'Our federation was founded with a clear purpose — to uplift rural India through sustainable agriculture, innovative technologies and economic empowerment, acting as a bridge between rural potential and national progress.',
      hi: 'फेडरेशन की स्थापना एक स्पष्ट उद्देश्य से हुई — टिकाऊ कृषि, नवाचारी तकनीक और आर्थिक सशक्तिकरण द्वारा ग्रामीण भारत का उत्थान।',
    },
  },
  {
    name: 'Narendra Gaur',
    role: { en: 'Director – Finance', hi: 'निदेशक – वित्त' },
    credential: { en: 'Retd. Income Tax Chief Commissioner', hi: 'सेवानिवृत्त आयकर मुख्य आयुक्त' },
    photo: team.narendraGaur,
  },
  {
    name: 'Shyam Singh Rajpurohit',
    role: { en: 'Director – Administration', hi: 'निदेशक – प्रशासन' },
    credential: { en: 'Retd. IAS Officer', hi: 'सेवानिवृत्त IAS अधिकारी' },
    photo: team.shyamSingh,
  },
  {
    name: 'Ashok Sarrangan',
    role: { en: 'Director – Farming Products', hi: 'निदेशक – कृषि उत्पाद' },
    credential: { en: 'MD – Technical, Richplus Bio Fertilizers & Feeds Pvt. Ltd.', hi: 'एमडी – तकनीकी, रिचप्लस बायो फर्टिलाइज़र्स एंड फीड्स प्रा. लि.' },
    photo: team.ashokSarrangan,
  },
  {
    name: 'Sourabh Sindhi',
    role: { en: 'Chief Financial Officer', hi: 'मुख्य वित्तीय अधिकारी' },
    credential: { en: 'Director & founding subscriber', hi: 'निदेशक एवं संस्थापक सदस्य' },
    photo: team.sourabhSindhi,
  },
  {
    name: 'Mittal Shah',
    role: { en: 'Agriculture Project Head', hi: 'कृषि परियोजना प्रमुख' },
    credential: { en: 'Value Chain & Business Development Strategist', hi: 'वैल्यू चेन एवं व्यवसाय विकास विशेषज्ञ' },
    photo: team.mittalShah,
  },
  {
    name: 'Nilesh Patel',
    role: { en: 'Marketing Head', hi: 'मार्केटिंग प्रमुख' },
    photo: team.nileshPatel,
  },
  {
    name: 'Rajendra Ji',
    role: { en: 'Project Head', hi: 'परियोजना प्रमुख' },
    photo: team.rajendraJi,
  },
]

export const advisory: { name: string; role: string; photo?: string }[] = [
  { name: 'Sunil Shastri', role: 'S/o Lal Bahadur Shastri', photo: ap.sunilShastri },
  { name: 'Rahul Dwivedi', role: 'Director, MoEFCC', photo: ap.rahulDwivedi },
  { name: 'Sarika Choudhary', role: 'Media Panelist', photo: ap.sarikaChoudhary },
  { name: 'Prof. M. K. Vajpayee', role: 'Roma University', photo: ap.mkVajpayee },
  { name: 'Kishan Ji Panchal', role: 'Agriculture Scientist', photo: ap.kishanPanchal },
  { name: 'Yusuf Pathan', role: 'Ex Chief Engineer, GIDC Gujarat', photo: ap.yusufPathan },
  { name: 'Shailesh Dadhich', role: 'Management Board Head', photo: ap.shaileshDadhich },
  { name: 'N. Ganesan', role: 'Director – Technical, Richplus Bio Fertilizers & Feeds', photo: ap.nGanesan },
  { name: 'Shanker Singh Rawat', role: 'Secretary, GMVSS', photo: ap.shankerSinghRawat },
  { name: 'Mohinder Gill', role: 'Advocate, Allahabad & Delhi High Court — Legal Advisor', photo: ap.mohinderGill },
  { name: 'Apurva Desai', role: 'International Marketing Expert', photo: ap.apurvaDesai },
  { name: 'Devanjan Bose', role: 'Agriculture, Technology, Marketing & Management Consultant', photo: ap.devanjanBose },
  { name: 'Dr. Naresh Kumar', role: 'Ex HR, Medanta Hospital', photo: ap.nareshKumar },
  { name: 'Sanjay Suthar', role: 'Field Marketing', photo: ap.sanjaySuthar },
]

/** Collaborators named in the proposal / profile. Text wordmarks only (no third-party logos). */
export const partners = [
  { name: 'Amul Organic', note: { en: 'Organic fertilizer distribution collaboration', hi: 'जैविक खाद वितरण सहयोग' } },
  { name: 'Super Maps Biotech Pvt. Ltd.', note: { en: 'Enzybiotic Power Pro partnership', hi: 'एन्ज़ायबायोटिक पावर प्रो साझेदारी' } },
  { name: 'Richplus Bio Fertilizers & Feeds', note: { en: 'Bio-inputs & technical expertise', hi: 'जैव-इनपुट एवं तकनीकी विशेषज्ञता' } },
  { name: 'Alliance Multi State Cooperative Society', note: { en: 'Cooperative network', hi: 'सहकारी नेटवर्क' } },
  { name: 'Cooperative Societies & FPOs', note: { en: 'Farmer reach & aggregation', hi: 'किसान पहुंच एवं एकत्रीकरण' } },
  { name: 'CSR Partners & Investors', note: { en: 'PPP project funding', hi: 'PPP परियोजना वित्तपोषण' } },
]

export const schemes = [
  { title: { en: 'E-Auto Rickshaw Door-to-Door', hi: 'ई-ऑटो रिक्शा डोर-टू-डोर' }, text: { en: 'Fresh fruits & vegetables supply by trained youth entrepreneurs.', hi: 'प्रशिक्षित युवा उद्यमियों द्वारा फल व सब्ज़ी की घर-घर आपूर्ति।' } },
  { title: { en: 'Amul Parlour & Café', hi: 'अमूल पार्लर एवं कैफ़े' }, text: { en: 'Outlet programme with up to 90% loan facility for entrepreneurs.', hi: 'उद्यमियों के लिए 90% तक लोन सुविधा के साथ आउटलेट योजना।' } },
]

/** Main object & key clauses — Memorandum of Association (INC-13) and Section 8 licence application. */
export const moa = {
  object: {
    en: 'To support, promote, execute, train, consult and set up / run centres providing public service in the modernisation of agriculture and all related activities; to develop programmes for the growth and diversification of agriculture and agro-based industries; to educate and assist farmers in farming with new techniques and equipment by availing benefits of government policies and promotion schemes; to take promotion subsidy from government, enterprises or CSR funds for the benefit of farmers; and to pave the way for integrated producers’ organisations with forward and backward linkages.',
    hi: 'कृषि के आधुनिकीकरण एवं संबंधित सभी गतिविधियों हेतु जनसेवा केंद्रों की स्थापना/संचालन, प्रशिक्षण, परामर्श एवं प्रोत्साहन; कृषि व कृषि-आधारित उद्योगों के विकास और विविधीकरण के कार्यक्रम; सरकारी नीतियों व प्रोत्साहन योजनाओं का लाभ दिलाकर किसानों को नई तकनीक व उपकरणों से खेती हेतु शिक्षित करना; किसानों के हित में सरकार, उद्यमों या CSR कोष से प्रोत्साहन सहायता प्राप्त करना; तथा फॉरवर्ड व बैकवर्ड लिंकेज वाले एकीकृत उत्पादक संगठनों का मार्ग प्रशस्त करना।',
  },
  clauses: [
    { en: 'Not-for-profit: any profits or income are applied solely to promote the objects — no dividend is paid to members.', hi: 'गैर-लाभकारी: कोई भी लाभ या आय केवल उद्देश्यों के लिए उपयोग — सदस्यों को कोई लाभांश नहीं।' },
    { en: 'The objects of the company extend to the whole of India.', hi: 'कंपनी के उद्देश्य पूरे भारत में लागू।' },
    { en: 'Objects are carried out with the permission of competent authorities.', hi: 'उद्देश्य सक्षम प्राधिकरणों की अनुमति से संचालित।' },
    { en: 'Accounts are audited annually by qualified auditors.', hi: 'खातों का प्रतिवर्ष योग्य लेखा परीक्षकों द्वारा ऑडिट।' },
  ] as LText[],
}
