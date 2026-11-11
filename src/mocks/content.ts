import type { NewsItem, GalleryItem } from '@/types'
import { real } from '@/data/images'

/**
 * News & gallery seed. Photos are from the federation's company profile.
 * Dates and captions are approximate placeholders — confirm with the client before go-live.
 */
const day = (iso: string) => new Date(iso).toISOString()

export const seedNews = (): NewsItem[] => [
  {
    id: 'n1',
    slug: 'amul-organic-fertilizer-launch-pinjrapole-gaushala',
    category: 'Partnership',
    image: real.newsAmulLaunch,
    date: day('2025-05-20'),
    published: true,
    title: {
      en: 'Amul Organic fertilizer launched at Pinjrapole Gaushala, Jaipur',
      hi: 'जयपुर की पिंजरापोल गौशाला में अमूल ऑर्गेनिक फर्टिलाइज़र का लॉन्च',
    },
    excerpt: {
      en: 'A landmark step for chemical-free farming — gaushala-based organic fertilizer reaches farmers through the cooperative network.',
      hi: 'जहर मुक्त कृषि की दिशा में अहम कदम — गौशाला आधारित जैविक खाद सहकारी नेटवर्क से किसानों तक।',
    },
    body: {
      en: 'The launch event at Pinjrapole Gaushala in Jaipur brought together farmers, cooperative leaders and gaushala representatives. The federation highlighted its gaushala-based organic fertilizer model — collection of cow dung, fermentation, activation and quality-tested packaging — and the distribution collaboration that will help farmers access organic inputs at fair rates.\n\nThe initiative supports three outcomes: gaushalas becoming self-reliant, farmers gaining better yields and income, and a healthier, chemical-free India.',
      hi: 'जयपुर की पिंजरापोल गौशाला में आयोजित लॉन्च कार्यक्रम में किसान, सहकारी संस्थाओं के प्रतिनिधि और गौशाला संचालक शामिल हुए। फेडरेशन ने अपने गौशाला आधारित जैविक खाद मॉडल और वितरण सहयोग की जानकारी दी।\n\nइस पहल से गौशाला आत्मनिर्भर होगी, किसान समृद्ध होगा और स्वस्थ भारत का निर्माण होगा।',
    },
  },
  {
    id: 'n2',
    slug: 'world-ngo-day-recognition',
    category: 'Award',
    image: real.ngoAward1,
    date: day('2025-02-27'),
    published: true,
    title: { en: 'Federation team recognised on World NGO Day', hi: 'विश्व NGO दिवस पर फेडरेशन टीम को सम्मान' },
    excerpt: {
      en: 'Members of the FPC Bazaar Federation were felicitated for their contribution to rural development and farmer welfare.',
      hi: 'ग्रामीण विकास और किसान कल्याण में योगदान के लिए फेडरेशन सदस्यों का सम्मान।',
    },
    body: {
      en: 'At the World NGO Day ceremony, representatives of the federation were felicitated alongside organisations working for social impact. The recognition reflects the federation’s work with FPOs, women’s self-help groups and gaushalas.',
      hi: 'विश्व NGO दिवस समारोह में फेडरेशन के प्रतिनिधियों को सामाजिक प्रभाव के लिए कार्यरत संस्थाओं के साथ सम्मानित किया गया।',
    },
  },
  {
    id: 'n3',
    slug: 'international-tribal-culture-festival-2024',
    category: 'Event',
    image: real.tribalFestival,
    date: day('2024-12-10'),
    published: true,
    title: { en: 'Participation in the International Tribal Culture Festival 2024', hi: 'अंतर्राष्ट्रीय जनजाति संस्कृति समारोह 2024 में भागीदारी' },
    excerpt: {
      en: 'The federation presented its tribal self-reliance and dairy project plans to communities and stakeholders.',
      hi: 'फेडरेशन ने आदिवासी आत्मनिर्भरता और डेयरी परियोजना योजनाएं प्रस्तुत कीं।',
    },
    body: {
      en: 'At the festival, the federation showcased its roadmap for tribal families — skill training, crafts and micro-enterprise, a tribal dairy project with subsidy support, and assured market buyback.',
      hi: 'समारोह में फेडरेशन ने आदिवासी परिवारों के लिए कौशल प्रशिक्षण, शिल्प व सूक्ष्म उद्यम, सब्सिडी सहायता वाला ट्राइबल डेयरी प्रोजेक्ट और बायबैक की रूपरेखा प्रस्तुत की।',
    },
  },
  {
    id: 'n4',
    slug: 'fpo-capacity-building-training',
    category: 'Initiative',
    image: real.fpoTraining2,
    date: day('2025-03-15'),
    published: true,
    title: { en: 'FPO capacity-building training for farmers', hi: 'किसानों के लिए FPO क्षमता निर्माण प्रशिक्षण' },
    excerpt: {
      en: 'Farmers and FPO managers learned about compliance, government schemes and the benefits of collective marketing.',
      hi: 'किसानों और FPO प्रबंधकों को अनुपालन, सरकारी योजनाओं और सामूहिक विपणन के लाभ बताए गए।',
    },
    body: {
      en: 'The training is part of the federation’s agenda to organise FPOs in Rajasthan, communicate central and state schemes effectively, and help resolve compliance paperwork.',
      hi: 'यह प्रशिक्षण राजस्थान के FPO को संगठित करने, योजनाओं की जानकारी देने और अनुपालन संबंधी कार्यवाही में सहायता के एजेंडे का हिस्सा है।',
    },
  },
  {
    id: 'n5',
    slug: 'federation-pavilion-agri-expo',
    category: 'Event',
    image: real.federationPavilion,
    date: day('2025-01-18'),
    published: true,
    title: { en: 'FPC Bazaar Federation pavilion at agri exhibition', hi: 'कृषि प्रदर्शनी में एफपीसी बाज़ार फेडरेशन पवेलियन' },
    excerpt: {
      en: 'Member FPOs and SHGs displayed organic produce, dairy and gaushala products to buyers and visitors.',
      hi: 'सदस्य FPO और SHG ने जैविक उपज, डेयरी व गौशाला उत्पाद प्रदर्शित किए।',
    },
    body: {
      en: 'The pavilion connected producer groups directly with institutional buyers and consumers, demonstrating the federation’s market-linkage model in action.',
      hi: 'पवेलियन ने उत्पादक समूहों को सीधे संस्थागत खरीदारों और उपभोक्ताओं से जोड़ा।',
    },
  },
  {
    id: 'n6',
    slug: 'polyhouse-field-visit',
    category: 'Initiative',
    image: real.polyhouseVisit,
    date: day('2025-04-08'),
    published: true,
    title: { en: 'Field visit to PPP polyhouse cluster', hi: 'PPP पॉलीहाउस क्लस्टर का फील्ड विज़िट' },
    excerpt: {
      en: 'The team reviewed climate-controlled cultivation under the zero-investment PPP model.',
      hi: 'टीम ने शून्य-निवेश PPP मॉडल के तहत जलवायु-नियंत्रित खेती की समीक्षा की।',
    },
    body: {
      en: 'Polyhouses installed and managed by the federation allow farmers to grow high-value crops with no upfront investment, backed by market buyback.',
      hi: 'फेडरेशन द्वारा स्थापित पॉलीहाउस में किसान बिना निवेश के उच्च मूल्य वाली फसलें उगा सकते हैं।',
    },
  },
]

const g = (id: string, album: GalleryItem['album'], image: string, en: string, hi: string): GalleryItem => ({
  id,
  album,
  image,
  title: { en, hi },
  createdAt: new Date().toISOString(),
})

export const seedGallery = (): GalleryItem[] => [
  g('g1', 'Field Work', real.fpoTraining2, 'FPO training session', 'FPO प्रशिक्षण सत्र'),
  g('g2', 'Projects', real.polyhouseVisit, 'Polyhouse cluster visit', 'पॉलीहाउस क्लस्टर विज़िट'),
  g('g3', 'Exhibitions', real.federationPavilion, 'Federation pavilion', 'फेडरेशन पवेलियन'),
  g('g4', 'Gaushala & Dairy', real.gaushalaCattle, 'Gaushala cattle care', 'गौशाला गौ सेवा'),
  g('g5', 'SHG & Women', real.shgHandicraft, 'SHG handicraft artisans', 'SHG हस्तशिल्प कारीगर'),
  g('g6', 'Events', real.ngoAward2, 'World NGO Day felicitation', 'विश्व NGO दिवस सम्मान'),
  g('g7', 'Projects', real.biogasPlant, 'Biogas unit demonstration', 'बायोगैस यूनिट प्रदर्शन'),
  g('g8', 'Field Work', real.fieldVisit, 'Farm field visit', 'खेत भ्रमण'),
  g('g9', 'Exhibitions', real.produceExhibit, 'Produce exhibition', 'उपज प्रदर्शनी'),
  g('g10', 'SHG & Women', real.shgJuteBags, 'Jute bags by SHGs', 'SHG के जूट बैग'),
  g('g11', 'Events', real.tribalFestivalStage, 'Tribal Culture Festival 2024', 'जनजाति संस्कृति समारोह 2024'),
  g('g12', 'Projects', real.agriDrone, 'Agri-drone technology', 'एग्री-ड्रोन तकनीक'),
  g('g13', 'Gaushala & Dairy', real.gaushalaProjects, 'Gaushala projects', 'गौशाला प्रोजेक्ट्स'),
  g('g14', 'Exhibitions', real.organicPavilion, 'Organic pavilion', 'जैविक पवेलियन'),
  g('g15', 'Events', real.nationalSeminar, 'National seminar', 'राष्ट्रीय संगोष्ठी'),
  g('g16', 'Field Work', real.farmerMeeting, 'Farmer meeting', 'किसान बैठक'),
  g('g17', 'Events', real.internationalDelegates, 'Meeting with delegates', 'प्रतिनिधियों से भेंट'),
  g('g18', 'Exhibitions', real.fpoStall, 'FPO stall', 'FPO स्टॉल'),
  g('g19', 'Projects', real.processingPlant, 'Processing unit visit', 'प्रोसेसिंग यूनिट विज़िट'),
  g('g20', 'SHG & Women', real.shgProductsStall, 'SHG products stall', 'SHG उत्पाद स्टॉल'),
  g('g21', 'Gaushala & Dairy', real.cattleVisit, 'Cattle visit', 'पशु भ्रमण'),
  g('g22', 'Events', real.ngoGroup, 'World NGO Day', 'विश्व NGO दिवस'),
  g('g23', 'Projects', real.polyhouseCrop, 'Polyhouse cultivation', 'पॉलीहाउस खेती'),
  g('g24', 'Field Work', real.fpoTraining1, 'Community training', 'सामुदायिक प्रशिक्षण'),
]
