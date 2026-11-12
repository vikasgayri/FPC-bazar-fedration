import type { LText } from '@/types'
import { real, stock } from './images'

export type InitiativeGroup = 'priority' | 'special' | 'flagship'
export type IconKey =
  | 'cow'
  | 'milk'
  | 'store'
  | 'women'
  | 'salad'
  | 'leaf'
  | 'handshake'
  | 'tribal'
  | 'youth'
  | 'building'
  | 'recycle'
  | 'truck'
  | 'flask'
  | 'flame'

export interface Initiative {
  slug: string
  group: InitiativeGroup
  icon: IconKey
  title: LText
  hindiTitle: string
  summary: LText
  body: LText[]
  highlights: LText[]
  steps?: { title: LText; text: LText }[]
  stats?: { value: string; label: LText }[]
  image: string
  fallback: string
  gallery: string[]
}

export const initiatives: Initiative[] = [
  // ───────────── Core priorities ─────────────
  {
    slug: 'gaushala-development',
    group: 'priority',
    icon: 'cow',
    title: { en: 'Gaushala Development & Management', hi: 'गौशाला विकास एवं प्रबंधन' },
    hindiTitle: 'गौशाला विकास एवं प्रबंधन',
    summary: {
      en: 'Sustainable cattle shelters with better hygiene, care and management — turning gaushalas into self-reliant, profitable centres.',
      hi: 'स्वच्छता, देखभाल और प्रबंधन के साथ टिकाऊ गौशालाएं — गौशालाओं को आत्मनिर्भर व लाभदायक केंद्र बनाना।',
    },
    body: [
      {
        en: 'Indigenous cattle are central to India’s rural economy. The federation works with gaushalas to improve shelter design, hygiene, fodder and veterinary care, and to preserve native breeds.',
        hi: 'देसी गौवंश ग्रामीण अर्थव्यवस्था का केंद्र है। फेडरेशन गौशालाओं के साथ मिलकर शेड डिज़ाइन, स्वच्छता, चारा और पशु-चिकित्सा देखभाल में सुधार तथा देसी नस्लों के संरक्षण का कार्य करता है।',
      },
      {
        en: 'By converting cow dung into organic fertilizer and biogas, and promoting gaushala-based products, each gaushala gains a dependable income stream of its own.',
        hi: 'गोबर से जैविक खाद व बायोगैस बनाकर और गौशाला-आधारित उत्पादों को बढ़ावा देकर हर गौशाला को अपनी स्थायी आय मिलती है।',
      },
    ],
    highlights: [
      { en: 'Modern cow-shed design & hygiene protocols', hi: 'आधुनिक गौ-शेड डिज़ाइन एवं स्वच्छता' },
      { en: 'Native breed preservation & cow welfare', hi: 'देसी नस्ल संरक्षण एवं गौ कल्याण' },
      { en: 'Gaushala-based eco-products & bio-inputs', hi: 'गौशाला-आधारित इको उत्पाद व जैव-इनपुट' },
      { en: 'Biogas & organic fertilizer revenue models', hi: 'बायोगैस व जैविक खाद से आय मॉडल' },
    ],
    image: real.gaushalaCattle,
    fallback: stock.cowsPen,
    gallery: [real.gaushalaProjects, real.cowShedDesign, real.cattleVisit, real.gaushalaCattle],
  },
  {
    slug: 'dairy-producer-empowerment',
    group: 'priority',
    icon: 'milk',
    title: { en: 'Dairy Producer Empowerment', hi: 'दुग्ध उत्पादक सशक्तिकरण' },
    hindiTitle: 'दुग्ध उत्पादक सशक्तिकरण',
    summary: {
      en: 'Training, fair pricing and milk-quality improvement for small dairy farmers and producer groups.',
      hi: 'छोटे दुग्ध उत्पादकों के लिए प्रशिक्षण, उचित मूल्य और दूध की गुणवत्ता में सुधार।',
    },
    body: [
      {
        en: 'Through the Dairy Excellence Programme the federation supports high-tech dairy facilities, efficient operations and better animal nutrition — so that every litre earns a fair price.',
        hi: 'डेयरी एक्सीलेंस प्रोग्राम के माध्यम से फेडरेशन आधुनिक डेयरी सुविधाएं, कुशल संचालन और बेहतर पशु पोषण को बढ़ावा देता है — ताकि हर लीटर का उचित दाम मिले।',
      },
      {
        en: 'A dedicated tribal dairy project with up to 90% subsidy support is being developed to bring families into organised dairying.',
        hi: 'आदिवासी परिवारों को संगठित डेयरी से जोड़ने हेतु 90% तक सब्सिडी सहायता वाला ट्राइबल डेयरी प्रोजेक्ट विकसित किया जा रहा है।',
      },
    ],
    highlights: [
      { en: 'Clean-milk & quality testing training', hi: 'स्वच्छ दुग्ध एवं गुणवत्ता जांच प्रशिक्षण' },
      { en: 'Fair, transparent procurement pricing', hi: 'उचित व पारदर्शी खरीद मूल्य' },
      { en: 'Animal health & nutrition support', hi: 'पशु स्वास्थ्य एवं पोषण सहायता' },
      { en: 'Tribal dairy project (90% subsidy)', hi: 'ट्राइबल डेयरी प्रोजेक्ट (90% सब्सिडी)' },
    ],
    image: stock.cowCalf,
    fallback: real.cattleVisit,
    gallery: [real.tribalDairyProject, real.cattleVisit, real.processingPlant],
  },
  {
    slug: 'fpo-market-linkage',
    group: 'priority',
    icon: 'store',
    title: { en: 'Market Linkage for FPOs', hi: 'FPOs को बाज़ार जोड़ना' },
    hindiTitle: 'FPOs को बाज़ार जोड़ना',
    summary: {
      en: 'Direct market access, supply chain and fair trade — connecting FPO produce to wholesale, retail and export buyers.',
      hi: 'सीधी बाज़ार पहुंच, आपूर्ति श्रृंखला और उचित व्यापार — FPO उत्पादों को थोक, खुदरा व निर्यात खरीदारों से जोड़ना।',
    },
    body: [
      {
        en: 'Robust supply chains establish direct farmer-to-market connections, ensuring better pricing and reducing dependency on intermediaries.',
        hi: 'मज़बूत आपूर्ति श्रृंखला किसान से सीधे बाज़ार तक जुड़ाव बनाती है — बेहतर दाम और बिचौलियों पर निर्भरता कम।',
      },
      {
        en: 'The FPC Bazaar digital marketplace lets member FPOs, SHGs and dairies list products, reach new buyers and receive digital payments.',
        hi: 'FPC बाजार डिजिटल मंडी से सदस्य FPO, SHG और डेयरियां अपने उत्पाद सूचीबद्ध कर नए खरीदारों तक पहुंचती हैं।',
      },
    ],
    highlights: [
      { en: 'Buyer–seller connect & bulk orders', hi: 'खरीदार–विक्रेता जुड़ाव एवं थोक ऑर्डर' },
      { en: 'Branding, packaging & quality standards', hi: 'ब्रांडिंग, पैकेजिंग एवं गुणवत्ता मानक' },
      { en: 'Digital mandi with live prices', hi: 'लाइव भाव के साथ डिजिटल मंडी' },
      { en: 'Export readiness support', hi: 'निर्यात तैयारी सहायता' },
    ],
    image: stock.vegMarket,
    fallback: real.produceExhibit,
    gallery: [real.produceExhibit, real.fpoProducts, real.federationPavilion, real.fpoStall],
  },
  {
    slug: 'women-shg-employment',
    group: 'priority',
    icon: 'women',
    title: { en: 'Women Employment through SHGs', hi: 'महिलाओं को रोजगार – SHG' },
    hindiTitle: 'महिलाओं को रोजगार',
    summary: {
      en: 'Self-help groups, skill training and livelihoods — helping rural women become producers and entrepreneurs.',
      hi: 'स्वयं सहायता समूह, कौशल प्रशिक्षण और आजीविका — ग्रामीण महिलाओं को उत्पादक एवं उद्यमी बनाना।',
    },
    body: [
      {
        en: 'The federation builds the capacity of women’s self-help groups in food processing, handicrafts, jute and natural-fibre products, and gaushala-based goods.',
        hi: 'फेडरेशन महिला स्वयं सहायता समूहों की क्षमता को खाद्य प्रसंस्करण, हस्तशिल्प, जूट व प्राकृतिक रेशा उत्पादों तथा गौशाला-आधारित वस्तुओं में बढ़ाता है।',
      },
      {
        en: 'SHG products are showcased at exhibitions and listed on the FPC Bazaar marketplace so that women earn directly from every sale.',
        hi: 'SHG उत्पाद प्रदर्शनियों और FPC बाजार मार्केटप्लेस पर उपलब्ध कराए जाते हैं ताकि हर बिक्री से महिलाओं को सीधी आय हो।',
      },
    ],
    highlights: [
      { en: 'SHG formation & capacity building', hi: 'SHG गठन एवं क्षमता निर्माण' },
      { en: 'Skill training & micro-enterprise', hi: 'कौशल प्रशिक्षण एवं सूक्ष्म उद्यम' },
      { en: 'Exhibition & marketplace access', hi: 'प्रदर्शनी एवं मार्केटप्लेस पहुंच' },
      { en: 'Financial literacy & credit linkage', hi: 'वित्तीय साक्षरता एवं ऋण जुड़ाव' },
    ],
    image: real.shgHandicraft,
    fallback: stock.villageWomen,
    gallery: [real.shgHandicraft, real.shgJuteBags, real.shgProductsStall, real.shgStall2],
  },
  {
    slug: 'healthy-india-organic-food',
    group: 'priority',
    icon: 'salad',
    title: { en: 'Swasth Bharat – Organic Food Initiative', hi: 'स्वस्थ भारत – जैविक खाद्य पहल' },
    hindiTitle: 'स्वस्थ भारत',
    summary: {
      en: 'Promoting organic, natural and healthy foods — from farm to family, free of adulteration.',
      hi: 'जैविक, प्राकृतिक और स्वास्थ्यवर्धक भोजन को बढ़ावा — खेत से परिवार तक, बिना मिलावट।',
    },
    body: [
      {
        en: 'Healthy food begins with healthy soil. The federation promotes organic and natural produce, millets and traditional foods, and makes them accessible to urban consumers.',
        hi: 'स्वस्थ भोजन की शुरुआत स्वस्थ मिट्टी से होती है। फेडरेशन जैविक व प्राकृतिक उपज, मिलेट्स और पारंपरिक खाद्य पदार्थों को बढ़ावा देता है।',
      },
    ],
    highlights: [
      { en: 'Organic & natural produce aggregation', hi: 'जैविक व प्राकृतिक उपज एकत्रीकरण' },
      { en: 'Millets & traditional foods', hi: 'मिलेट्स एवं पारंपरिक खाद्य' },
      { en: 'Consumer awareness drives', hi: 'उपभोक्ता जागरूकता अभियान' },
    ],
    image: stock.vegBaskets,
    fallback: real.organicPavilion,
    gallery: [real.organicPavilion, real.organicExpo, real.produceExhibit],
  },
  {
    slug: 'chemical-free-farming',
    group: 'priority',
    icon: 'leaf',
    title: { en: 'Zahar Mukt Krishi – Chemical-free Farming', hi: 'जहर मुक्त कृषि' },
    hindiTitle: 'जहर मुक्त कृषि',
    summary: {
      en: 'Natural farming, soil health and eco-friendly practices — training farmers to move away from harmful chemicals.',
      hi: 'प्राकृतिक खेती, मृदा स्वास्थ्य और पर्यावरण-अनुकूल पद्धतियां — किसानों को रसायनों से मुक्त खेती का प्रशिक्षण।',
    },
    body: [
      {
        en: 'Workshops on organic farming methods, compost and bio-fertilizer use, and field demonstrations help farmers lower input costs while restoring soil fertility.',
        hi: 'जैविक खेती, कम्पोस्ट व जैव उर्वरक उपयोग पर कार्यशालाएं और खेत प्रदर्शन किसानों की लागत घटाते हुए मिट्टी की उर्वरता लौटाते हैं।',
      },
    ],
    highlights: [
      { en: 'Workshops on organic farming methods', hi: 'जैविक खेती पद्धतियों पर कार्यशालाएं' },
      { en: 'Compost & bio-fertilizer training', hi: 'कम्पोस्ट एवं जैव उर्वरक प्रशिक्षण' },
      { en: 'Field demonstrations & capacity building', hi: 'खेत प्रदर्शन एवं क्षमता निर्माण' },
    ],
    image: stock.soilHands,
    fallback: real.fieldVisit,
    gallery: [real.fieldVisit, real.fpoTraining1, real.farmerMeeting],
  },

  // ───────────── Special initiatives ─────────────
  {
    slug: 'ppp-zero-investment',
    group: 'special',
    icon: 'handshake',
    title: { en: 'PPP Projects – Development Without Investment', hi: 'PPP प्रोजेक्ट – बिना निवेश के विकास' },
    hindiTitle: 'पॉलीहाउस • डेयरी • बायोगैस',
    summary: {
      en: 'Polyhouses, dairies and biogas units installed and managed by the federation — at no cost to the beneficiary.',
      hi: 'पॉलीहाउस, डेयरी और बायोगैस यूनिट फेडरेशन द्वारा स्थापित व संचालित — लाभार्थी पर कोई खर्च नहीं।',
    },
    body: [
      {
        en: 'Under the zero-investment PPP model the federation, with investors, CSR partners and institutions, sets up productive units on behalf of farmers, gaushalas and groups.',
        hi: 'शून्य-निवेश PPP मॉडल के अंतर्गत फेडरेशन निवेशकों, CSR साझेदारों और संस्थाओं के साथ मिलकर किसानों, गौशालाओं और समूहों के लिए उत्पादक इकाइयां स्थापित करता है।',
      },
      {
        en: 'No investment is needed from the beneficiary: the federation installs the units, manages operations and ensures market buyback — removing every financial burden.',
        hi: 'लाभार्थी से कोई निवेश नहीं: फेडरेशन यूनिट लगाता है, संचालन करता है और बाज़ार बायबैक सुनिश्चित करता है।',
      },
    ],
    highlights: [
      { en: 'Climate-controlled net & poly houses', hi: 'जलवायु-नियंत्रित नेट एवं पॉली हाउस' },
      { en: 'Dairy units with buyback', hi: 'बायबैक के साथ डेयरी यूनिट' },
      { en: 'Biogas units for gaushalas & farms', hi: 'गौशाला व खेतों के लिए बायोगैस यूनिट' },
      { en: 'No financial burden on beneficiaries', hi: 'लाभार्थियों पर कोई आर्थिक बोझ नहीं' },
    ],
    image: real.polyhouseCrop,
    fallback: stock.greenhouse,
    gallery: [real.polyhouseVisit, real.polyhouseCrop, real.biogasPlant, real.tribalDairyProject],
  },
  {
    slug: 'tribal-self-reliance',
    group: 'special',
    icon: 'tribal',
    title: { en: 'Making Tribal Families Self-Reliant', hi: 'आदिवासी परिवारों को आत्मनिर्भर बनाना' },
    hindiTitle: 'आदिवासी परिवारों को आत्मनिर्भर बनाना',
    summary: {
      en: 'Skill training, crafts, farming and micro-enterprise — backed by market support and fair buyback assurance.',
      hi: 'कौशल प्रशिक्षण, शिल्प, खेती और सूक्ष्म उद्यम — बाज़ार सहायता और उचित बायबैक आश्वासन के साथ।',
    },
    body: [
      {
        en: 'Tribal communities hold deep traditional knowledge of forests, crafts and farming. The federation helps convert that knowledge into sustainable livelihoods with assured markets.',
        hi: 'आदिवासी समुदायों के पास वन, शिल्प और खेती का गहरा पारंपरिक ज्ञान है। फेडरेशन इस ज्ञान को सुनिश्चित बाज़ार के साथ स्थायी आजीविका में बदलने में मदद करता है।',
      },
    ],
    highlights: [
      { en: 'Skill training programmes for livelihood', hi: 'आजीविका हेतु कौशल प्रशिक्षण कार्यक्रम' },
      { en: 'Crafts, farming & micro-enterprise development', hi: 'शिल्प, खेती एवं सूक्ष्म उद्यम विकास' },
      { en: 'Market support & fair buyback assurance', hi: 'बाज़ार सहायता एवं उचित बायबैक आश्वासन' },
    ],
    image: real.tribalFestival,
    fallback: stock.village,
    gallery: [real.tribalFestival, real.tribalFestivalStage, real.tribalDairyProject],
  },
  {
    slug: 'youth-employment',
    group: 'special',
    icon: 'youth',
    title: { en: 'Youth Employment & Agri-preneurship', hi: 'युवाओं को रोजगार – स्वरोजगार' },
    hindiTitle: 'स्वरोजगार, एग्रीप्रेन्योर',
    summary: {
      en: 'Agri-entrepreneurship, startup support and agri-tech training — creating rural employment for young people.',
      hi: 'एग्री-उद्यमिता, स्टार्टअप सहायता और एग्री-टेक प्रशिक्षण — युवाओं के लिए ग्रामीण रोजगार।',
    },
    body: [
      {
        en: 'The federation’s objective is to work with 1,000 FPOs to create employment for 10,000 youth. Young people are trained in agri-tech, dairy and organic farming, and supported to launch their own enterprises.',
        hi: 'फेडरेशन का उद्देश्य 1000 FPO के साथ मिलकर 10,000 युवाओं को रोजगार देना है। युवाओं को एग्री-टेक, डेयरी और जैविक खेती में प्रशिक्षित कर अपना उद्यम शुरू करने में सहायता दी जाती है।',
      },
    ],
    highlights: [
      { en: 'Agri-entrepreneurship & self-employment', hi: 'एग्री-उद्यमिता एवं स्वरोजगार' },
      { en: 'Startup support for young farmers', hi: 'युवा किसानों हेतु स्टार्टअप सहायता' },
      { en: 'Training in agri-tech, drones, dairy & organic farming', hi: 'एग्री-टेक, ड्रोन, डेयरी व जैविक खेती प्रशिक्षण' },
      { en: 'Employment generation in rural areas', hi: 'ग्रामीण क्षेत्रों में रोजगार सृजन' },
    ],
    stats: [
      { value: '10,000', label: { en: 'Youth employment target', hi: 'युवा रोजगार लक्ष्य' } },
      { value: '1,000', label: { en: 'Partner FPOs', hi: 'साझेदार FPO' } },
    ],
    image: real.droneDemo,
    fallback: stock.farmers,
    gallery: [real.agriDrone, real.droneDemo, real.fpoTraining2],
  },

  // ───────────── Flagship projects ─────────────
  {
    slug: 'agri-business-cluster',
    group: 'flagship',
    icon: 'building',
    title: { en: 'Agribusiness Cluster Development Centre', hi: 'एग्रीकल्चर बिजनेस क्लस्टर डेवलपमेंट सेंटर' },
    hindiTitle: 'एक केंद्र • अनेक समाधान',
    summary: {
      en: 'A Gram Panchayat-level hub that gives farmers every service in one place — inputs, market linkage, cold storage, processing, training and a digital mandi.',
      hi: 'ग्राम पंचायत स्तर का केंद्र जहां किसानों को सभी सुविधाएं एक ही जगह — इनपुट, बाज़ार लिंकेज, कोल्ड स्टोरेज, प्रोसेसिंग, प्रशिक्षण और डिजिटल मंडी।',
    },
    body: [
      {
        en: 'Each cluster centre is designed as “one centre – many solutions”, bringing farmer services, local employment and value addition together at the Gram Panchayat level.',
        hi: 'हर क्लस्टर केंद्र “एक केंद्र – अनेक समाधान” की सोच पर आधारित है — किसान सेवाएं, स्थानीय रोजगार और मूल्य संवर्धन ग्राम पंचायत स्तर पर।',
      },
    ],
    highlights: [
      { en: 'All services for farmers at one place', hi: 'किसानों को एक ही जगह सभी सुविधा' },
      { en: 'Local employment generation', hi: 'स्थानीय रोजगार सृजन' },
      { en: 'Value addition & higher farmer income', hi: 'मूल्य संवर्धन एवं अधिक किसान आय' },
    ],
    steps: [
      { title: { en: 'Agricultural Input Centre', hi: 'कृषि इनपुट सेंटर' }, text: { en: 'Seeds, fertilizer, organic inputs and tools.', hi: 'बीज, उर्वरक, जैविक इनपुट एवं उपकरण।' } },
      { title: { en: 'Market Linkage Centre', hi: 'बाज़ार लिंकेज सेंटर' }, text: { en: 'Buyer–seller connect, supply chain, export access.', hi: 'खरीदार–विक्रेता जुड़ाव, आपूर्ति श्रृंखला, निर्यात।' } },
      { title: { en: 'Cold Storage Facility', hi: 'कोल्ड स्टोरेज' }, text: { en: 'Perishable storage and preservation at 0–5°C.', hi: '0–5°C पर नाशवान उपज का भंडारण।' } },
      { title: { en: 'Processing Unit', hi: 'प्रोसेसिंग यूनिट' }, text: { en: 'Milk, dairy and food processing — value addition.', hi: 'दूध, डेयरी व खाद्य प्रसंस्करण — मूल्य संवर्धन।' } },
      { title: { en: 'Training & Skill Centre', hi: 'ट्रेनिंग सेंटर' }, text: { en: 'Workshops, farmer training, SHG capacity building.', hi: 'कार्यशालाएं, किसान प्रशिक्षण, SHG क्षमता निर्माण।' } },
      { title: { en: 'Digital Mandi', hi: 'डिजिटल मंडी' }, text: { en: 'Online platform, digital payments, live prices.', hi: 'ऑनलाइन प्लेटफ़ॉर्म, डिजिटल भुगतान, लाइव भाव।' } },
    ],
    image: stock.wheatField,
    fallback: real.fpoVisit,
    gallery: [real.processingPlant, real.fpoVisit, real.fpoTraining1],
  },
  {
    slug: 'gaushala-organic-fertilizer',
    group: 'flagship',
    icon: 'recycle',
    title: { en: 'Gaushala-based Organic Fertilizer Model', hi: 'गौशाला आधारित जैविक खाद मॉडल' },
    hindiTitle: 'जहर मुक्त कृषि के लिए गौशाला आधारित जैविक खाद',
    summary: {
      en: 'Cow dung from gaushalas is fermented, activated and packed into high-quality bio-fertilizer — distributed to farmers through cooperative networks.',
      hi: 'गौशालाओं के गोबर का किण्वन व सक्रियण कर उच्च गुणवत्ता की जैविक खाद तैयार — सहकारी नेटवर्क द्वारा किसानों तक वितरण।',
    },
    body: [
      {
        en: 'The model links gaushalas, farmers and cooperatives in a circular economy. It includes collaboration with Amul Organic and other cooperative societies for distribution, and bulk supply to farmers at subsidised rates.',
        hi: 'यह मॉडल गौशालाओं, किसानों और सहकारी संस्थाओं को सर्कुलर इकॉनमी में जोड़ता है — अमूल ऑर्गेनिक व अन्य सहकारी संस्थाओं के साथ वितरण सहयोग और किसानों को रियायती दर पर थोक आपूर्ति।',
      },
    ],
    highlights: [
      { en: 'Gaushala becomes self-reliant & profitable', hi: 'गौशाला आत्मनिर्भर होगी' },
      { en: 'Farmers gain better yield & income', hi: 'किसान समृद्ध होगा' },
      { en: 'Building a healthy, chemical-free India', hi: 'स्वस्थ भारत का निर्माण होगा' },
    ],
    steps: [
      { title: { en: 'Gaushala Cow Dung', hi: 'गौशाला गोबर' }, text: { en: 'Collection of cow dung from gaushalas.', hi: 'गौशालाओं से गोबर का संग्रह।' } },
      { title: { en: 'Anaerobic Fermentation', hi: 'एनारोबिक किण्वन' }, text: { en: 'Fermentation in closed digester units.', hi: 'बंद डाइजेस्टर यूनिट में किण्वन।' } },
      { title: { en: 'Aerobic Activation', hi: 'एरोबिक सक्रियण' }, text: { en: 'Aeration and compost activation.', hi: 'वायु संचार एवं कम्पोस्ट सक्रियण।' } },
      { title: { en: 'Organic Fertilizer', hi: 'जैविक खाद उत्पादन' }, text: { en: 'Quality-tested and packed into bio-fertilizer bags.', hi: 'गुणवत्ता जांच के बाद बैग में पैकिंग।' } },
    ],
    image: real.newsAmulLaunch,
    fallback: stock.soilHands2,
    gallery: [real.newsAmulLaunch, real.newsOrganicFertilizer, real.organicPavilion, real.partnerMeet],
  },
  {
    slug: 'e-auto-fresh-delivery',
    group: 'flagship',
    icon: 'truck',
    title: { en: 'E-Auto Fresh Fruits & Vegetables Delivery', hi: 'इलेक्ट्रिक ऑटो से घर-घर फल-सब्ज़ी' },
    hindiTitle: 'किसान से सीधे आपके घर तक',
    summary: {
      en: 'Trained youth entrepreneurs deliver fresh, clean and chemical-free produce from farmers directly to homes on electric auto-rickshaws.',
      hi: 'प्रशिक्षित युवा उद्यमी इलेक्ट्रिक ऑटो से किसानों की ताज़ी, स्वच्छ और रसायन मुक्त सब्ज़ी सीधे घर तक पहुंचाते हैं।',
    },
    body: [
      {
        en: 'People travel to markets burning fuel; unhygienic and adulterated food is sold; and many homes lack access to fresh vegetables. This project solves all three — while creating self-employment for youth.',
        hi: 'लोग ईंधन जलाकर बाज़ार भटकते हैं, मिलावटी खाद्य बिकता है और घर-घर ताज़ी सब्ज़ी उपलब्ध नहीं है। यह परियोजना तीनों समस्याओं का समाधान करती है और युवाओं को स्वरोजगार देती है।',
      },
    ],
    highlights: [
      { en: 'Self-employment & stable income for youth', hi: 'युवाओं को स्वरोजगार और स्थायी आय' },
      { en: 'Better price for farmers — no middlemen', hi: 'किसानों को बेहतर मूल्य, बिचौलिए खत्म' },
      { en: 'Pure, fresh vegetables at the doorstep', hi: 'शुद्ध ताज़ी सब्ज़ी घर पर' },
      { en: 'Fuel saving & clean food', hi: 'ईंधन बचत • स्वच्छ भोजन' },
    ],
    steps: [
      { title: { en: 'Farmer', hi: 'किसान' }, text: { en: 'Fresh produce collected from local farmers.', hi: 'स्थानीय किसानों से ताज़ा उपज एकत्र।' } },
      { title: { en: 'FPC Collection Centre', hi: 'FPC संग्रह केंद्र' }, text: { en: 'Stored at the collection & storage centre.', hi: 'संग्रह एवं भंडारण केंद्र पर रखना।' } },
      { title: { en: 'Sorting & Grading', hi: 'छंटाई एवं श्रेणीकरण' }, text: { en: 'Quality check and grading of produce.', hi: 'फल-सब्ज़ी की गुणवत्ता जांच व छंटाई।' } },
      { title: { en: 'Youth E-Auto Dispatch', hi: 'युवा उद्यमी – ई-ऑटो' }, text: { en: 'Dispatched by trained youth on e-autos.', hi: 'प्रशिक्षित युवा ई-ऑटो से वितरण।' } },
      { title: { en: 'Doorstep Delivery', hi: 'घर-घर डिलीवरी' }, text: { en: 'Fresh produce delivered to the customer.', hi: 'ग्राहक के घर तक ताज़ी सब्ज़ी।' } },
    ],
    image: stock.freshProduce,
    fallback: real.produceExhibit,
    gallery: [real.produceExhibit, real.fpoProducts],
  },
  {
    slug: 'enzybiotic-power-pro',
    group: 'flagship',
    icon: 'flask',
    title: { en: 'Enzybiotic Power Pro for Dairy Animals', hi: 'एन्ज़ायबायोटिक पावर प्रो' },
    hindiTitle: 'पशुपालन में क्रांति के लिए प्राकृतिक समाधान',
    summary: {
      en: 'A 100% natural enzyme + probiotic formula for milch animals, in partnership with Super Maps Biotech Pvt. Ltd. (est. 1975).',
      hi: 'दुधारू पशुओं के लिए 100% प्राकृतिक एन्ज़ाइम + प्रोबायोटिक फ़ॉर्मूला — सुपर मैप्स बायोटेक प्रा. लि. (स्थापना 1975) के साथ साझेदारी।',
    },
    body: [
      {
        en: 'Poor digestion leaves animals weak and milk yields low. The formula supports complete digestion, animal health and higher milk output — making dairy a sustainable income centre.',
        hi: 'कमज़ोर पाचन से पशु कमज़ोर और दूध उत्पादन कम रहता है। यह फ़ॉर्मूला संपूर्ण पाचन, पशु स्वास्थ्य और अधिक दूध उत्पादन में सहायक है।',
      },
    ],
    highlights: [
      { en: '15–20% increase in milk production (as per partner)', hi: '15–20% दूध उत्पादन में बढ़ोतरी (साझेदार के अनुसार)' },
      { en: '100% natural & safe — no chemicals', hi: '100% प्राकृतिक एवं सुरक्षित' },
      { en: 'Lower medicine costs, higher profit', hi: 'लागत कम, लाभ ज़्यादा' },
      { en: 'Dairy becomes an income centre', hi: 'डेयरी आय केंद्र बनेगा' },
    ],
    image: stock.cowsFeeders,
    fallback: real.cattleVisit,
    gallery: [real.cattleVisit, real.gaushalaCattle],
  },
  {
    slug: 'cbg-biogas-project',
    group: 'flagship',
    icon: 'flame',
    title: { en: 'Biogas / CBG Project on PPP Model', hi: 'बायोगैस CBG प्रोजेक्ट – PPP मॉडल' },
    hindiTitle: '5 से 10 टन बायोगैस / CBG प्रोजेक्ट',
    summary: {
      en: '5–10 TPD compressed biogas plants with funding, technology and buyback — using cow dung and Napier grass as feedstock.',
      hi: '5–10 टन प्रतिदिन CBG प्लांट — फंडिंग, तकनीक और बायबैक उपलब्ध; गोबर व नेपियर घास से उत्पादन।',
    },
    body: [
      {
        en: 'Farmers’ fallow land is used for Napier grass contract farming with seeds, training and buyback guarantee. Together with gaushala cow dung, it feeds anaerobic digesters producing CBG for fuel and commercial use.',
        hi: 'किसानों के खाली खेतों में नेपियर घास कॉन्ट्रैक्ट फार्मिंग — बीज, प्रशिक्षण व बायबैक गारंटी के साथ। गौशालाओं के गोबर के साथ यह CBG उत्पादन का आधार बनता है।',
      },
      {
        en: 'Slurry by-product is converted into high-quality organic fertilizer. Private investors, CSR partners and institutions participate under the PPP mode. Initial focus: MP, Rajasthan, Gujarat and Maharashtra.',
        hi: 'स्लरी से उच्च गुणवत्ता की जैविक खाद बनती है। निजी निवेशक, CSR साझेदार और संस्थाएं PPP मोड में भागीदार। प्रारंभिक फोकस: म.प्र., राजस्थान, गुजरात, महाराष्ट्र।',
      },
    ],
    highlights: [
      { en: 'Napier grass contract farming on fallow land', hi: 'खाली खेतों में नेपियर घास कॉन्ट्रैक्ट फार्मिंग' },
      { en: 'Biogas plants in collaboration with gaushalas', hi: 'गौशालाओं के साथ बायोगैस प्लांट' },
      { en: 'Investor partnership — funding, technology, management', hi: 'निवेशक साझेदारी — फंडिंग, तकनीक, प्रबंधन' },
      { en: 'Guaranteed offtake & buyback by gas companies', hi: 'गैस कंपनियों द्वारा गारंटीड बायबैक' },
    ],
    steps: [
      { title: { en: 'Feedstock Input', hi: 'फीडस्टॉक' }, text: { en: 'Cow dung + Napier grass.', hi: 'गोबर + नेपियर घास।' } },
      { title: { en: 'Biogas Digester', hi: 'बायोगैस डाइजेस्टर' }, text: { en: 'Anaerobic digestion technology.', hi: 'एनारोबिक डाइजेशन तकनीक।' } },
      { title: { en: 'CBG Production', hi: 'CBG उत्पादन' }, text: { en: '5–10 tonnes per day compressed biogas.', hi: '5–10 टन प्रतिदिन संपीड़ित बायोगैस।' } },
      { title: { en: 'Offtake & Buyback', hi: 'ऑफटेक एवं बायबैक' }, text: { en: 'Guaranteed buyback by gas companies.', hi: 'गैस कंपनियों द्वारा गारंटीड बायबैक।' } },
    ],
    stats: [
      { value: '5–10 TPD', label: { en: 'CBG plant capacity', hi: 'CBG प्लांट क्षमता' } },
      { value: '4 States', label: { en: 'Initial target region', hi: 'प्रारंभिक लक्षित राज्य' } },
    ],
    image: real.biogasPlant,
    fallback: stock.cowsPen,
    gallery: [real.biogasPlant, real.biogasUnit, real.biogasBalloon, real.gaushalaProjects],
  },
]

export const groupLabel: Record<InitiativeGroup, LText> = {
  priority: { en: 'Core Priority', hi: 'प्राथमिक कार्य क्षेत्र' },
  special: { en: 'Special Initiative', hi: 'विशेष पहल' },
  flagship: { en: 'Flagship Project', hi: 'प्रमुख परियोजना' },
}

export const getInitiative = (slug: string) => initiatives.find((i) => i.slug === slug)
