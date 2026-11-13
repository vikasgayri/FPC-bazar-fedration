import type { Product, ProductCategory, LText } from '@/types'
import { real, stock } from '@/data/images'

/**
 * DEMO catalogue — illustrative FPO products, indicative bulk prices and capacities for the
 * client presentation only. FPC Bazaar does not sell: buyers send enquiries, FPOs quote directly.
 */
const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 864e5).toISOString()

type Seed = Omit<Product, 'id' | 'slug' | 'isDemo' | 'active' | 'createdAt' | 'gallery'> & { gallery?: string[] }

const seeds: Seed[] = [
  {
    name: { en: 'A2 Desi Cow Ghee', hi: 'A2 देसी गाय घी' },
    description: {
      en: 'Traditional bilona-method ghee from gaushala-reared indigenous cows. Rich aroma, granular texture.',
      hi: 'गौशाला में पली देसी गायों के दूध से बिलोना विधि द्वारा बना पारंपरिक घी। सुगंधित और दानेदार।',
    },
    category: 'dairy', price: 1350, unit: 'kg', moq: 25, capacity: 800, image: stock.gheeJar,
    producer: 'Gau Seva Gaushala Network', origin: 'Jaipur, Rajasthan', tags: ['bilona', 'a2', 'gaushala'], featured: true,
  },
  {
    name: { en: 'Fresh Chilled Milk (Bulk)', hi: 'ताज़ा ठंडा दूध (थोक)' },
    description: { en: 'Chilled, quality-tested milk collected from member dairy producers every morning.', hi: 'सदस्य दुग्ध उत्पादकों से हर सुबह एकत्र, गुणवत्ता जांचा हुआ ठंडा दूध।' },
    category: 'dairy', price: 52, unit: 'litre', moq: 200, capacity: 30000, image: stock.milkBottle,
    producer: 'Sanchore Dugdh Utpadak Samiti', origin: 'Jalore, Rajasthan', tags: ['milk', 'daily'],
  },
  {
    name: { en: 'Wild Forest Honey', hi: 'जंगली वन शहद' },
    description: { en: 'Raw, unprocessed honey collected by tribal collectors from forest belts. No added sugar.', hi: 'आदिवासी संग्राहकों द्वारा वन क्षेत्रों से एकत्र कच्चा शहद। बिना चीनी।' },
    category: 'shg-crafts', price: 650, unit: 'kg', moq: 20, capacity: 400, image: stock.honeyJars,
    producer: 'Aravali Van Dhan SHG', origin: 'Udaipur, Rajasthan', tags: ['tribal', 'raw', 'honey'], featured: true,
  },
  {
    name: { en: 'Organic Turmeric Powder', hi: 'जैविक हल्दी पाउडर' },
    description: { en: 'High-curcumin turmeric, sun-dried and stone-ground by a women’s SHG.', hi: 'उच्च करक्यूमिन हल्दी — महिला SHG द्वारा धूप में सुखाकर पत्थर पर पिसी।' },
    category: 'spices', price: 160, unit: 'kg', moq: 50, capacity: 2000, image: stock.turmeric,
    producer: 'Mahila Shakti SHG', origin: 'Nimar, Madhya Pradesh', tags: ['organic', 'shg'], featured: true,
  },
  {
    name: { en: 'Kitchen Spice Combo (6 Masalas)', hi: 'रसोई मसाला कॉम्बो (6 मसाले)' },
    description: { en: 'Red chilli, coriander, cumin, garam masala, turmeric and kasuri methi — FPO sourced.', hi: 'लाल मिर्च, धनिया, जीरा, गरम मसाला, हल्दी और कसूरी मेथी — FPO से।' },
    category: 'spices', price: 420, unit: 'kit (6 × 100 g)', moq: 100, capacity: 1500, image: stock.spicesBowls,
    producer: 'Marwar Masala FPO', origin: 'Jodhpur, Rajasthan', tags: ['combo', 'gift'],
  },
  {
    name: { en: 'Cold-pressed Mustard Oil', hi: 'कच्ची घानी सरसों तेल' },
    description: { en: 'Kachi ghani oil pressed from Bharatpur mustard seed. Pungent, pure, unrefined.', hi: 'भरतपुर की सरसों से कच्ची घानी में निकाला शुद्ध, अपरिष्कृत तेल।' },
    category: 'oils', price: 175, unit: 'litre', moq: 100, capacity: 12000, image: stock.oilJar,
    producer: 'Braj Kisan Producer Co.', origin: 'Bharatpur, Rajasthan', tags: ['kachi-ghani'], featured: true,
  },
  {
    name: { en: 'Bajra (Pearl Millet) – Organic', hi: 'बाजरा – जैविक' },
    description: { en: 'Nutrient-dense desert millet grown without chemicals. Ideal for rotis and khichdi.', hi: 'रसायन मुक्त उगाया गया पोषक तत्वों से भरपूर बाजरा।' },
    category: 'grains', price: 32, unit: 'kg', moq: 500, capacity: 50000, image: stock.paperBag,
    producer: 'Thar Millet FPO', origin: 'Barmer, Rajasthan', tags: ['millet', 'organic'],
  },
  {
    name: { en: 'Sharbati Wheat Atta (Stone-ground)', hi: 'शरबती गेहूं आटा (चक्की)' },
    description: { en: 'Golden Sharbati wheat milled slow on stone chakki to retain fibre and taste.', hi: 'शरबती गेहूं को चक्की पर धीमी गति से पीसा गया — स्वाद और फाइबर बरकरार।' },
    category: 'grains', price: 48, unit: 'kg', moq: 200, capacity: 20000, image: stock.flour,
    producer: 'Sehore Kisan FPO', origin: 'Sehore, Madhya Pradesh', tags: ['atta'], featured: true,
  },
  {
    name: { en: 'Basmati Rice – Aged', hi: 'बासमती चावल – पुराना' },
    description: { en: 'Long-grain basmati aged 12 months for fluffy, aromatic rice.', hi: '12 महीने पुराना लंबे दाने वाला सुगंधित बासमती।' },
    category: 'grains', price: 95, unit: 'kg', moq: 500, capacity: 30000, image: stock.riceCup,
    producer: 'Narmada Valley FPO', origin: 'Hoshangabad, Madhya Pradesh', tags: ['rice'],
  },
  {
    name: { en: 'Moong Dal – Unpolished', hi: 'मूंग दाल – बिना पॉलिश' },
    description: { en: 'Unpolished split green gram from Nagaur farmers. Quick cooking, high protein.', hi: 'नागौर के किसानों की बिना पॉलिश मूंग दाल।' },
    category: 'pulses', price: 115, unit: 'kg', moq: 200, capacity: 10000, image: stock.lentils,
    producer: 'Nagaur Dalhan FPO', origin: 'Nagaur, Rajasthan', tags: ['dal'],
  },
  {
    name: { en: 'Organic Jaggery (Gur) Powder', hi: 'जैविक गुड़ पाउडर' },
    description: { en: 'Chemical-free jaggery from organic sugarcane — a healthy sugar alternative.', hi: 'जैविक गन्ने से बना रसायन मुक्त गुड़ — चीनी का स्वस्थ विकल्प।' },
    category: 'grains', price: 70, unit: 'kg', moq: 200, capacity: 0, image: stock.jaggery,
    producer: 'Malwa Organic FPO', origin: 'Indore, Madhya Pradesh', tags: ['gur'],
  },
  {
    name: { en: 'Gaushala Organic Fertilizer', hi: 'गौशाला जैविक खाद' },
    description: { en: 'Quality-tested bio-fertilizer made from gaushala cow dung through anaerobic + aerobic processing.', hi: 'गौशाला गोबर से एनारोबिक + एरोबिक प्रक्रिया द्वारा बनी, जांची हुई जैविक खाद।' },
    category: 'organic-inputs', price: 420, unit: '40 kg bag', moq: 50, capacity: 5000, image: stock.soilHands, gallery: [stock.soilHands, real.newsAmulLaunch],
    producer: 'FPC Gaushala Fertilizer Unit', origin: 'Jaipur, Rajasthan', tags: ['bulk', 'farmer'], featured: true,
  },
  {
    name: { en: 'Vermicompost – Premium', hi: 'वर्मी कम्पोस्ट – प्रीमियम' },
    description: { en: 'Earthworm compost for kitchen gardens, nurseries and polyhouses.', hi: 'किचन गार्डन, नर्सरी व पॉलीहाउस के लिए केंचुआ खाद।' },
    category: 'organic-inputs', price: 12, unit: 'kg', moq: 500, capacity: 40000, image: stock.soilHands2,
    producer: 'Green Earth SHG', origin: 'Ajmer, Rajasthan', tags: ['garden'],
  },
  {
    name: { en: 'Enzybiotic Power Pro (Cattle Feed Supplement)', hi: 'एन्ज़ायबायोटिक पावर प्रो (पशु आहार पूरक)' },
    description: { en: 'Natural enzyme + probiotic formula for milch animals. Partner product — Super Maps Biotech.', hi: 'दुधारू पशुओं के लिए प्राकृतिक एन्ज़ाइम + प्रोबायोटिक फ़ॉर्मूला। साझेदार उत्पाद।' },
    category: 'organic-inputs', price: 600, unit: 'kg', moq: 10, capacity: 1000, image: stock.cowsFeeders,
    producer: 'Super Maps Biotech (Partner)', origin: 'India', tags: ['dairy', 'partner'],
  },
  {
    name: { en: 'Cow-dung Dhoop & Diya Set', hi: 'गोमय धूप एवं दीया सेट' },
    description: { en: 'Handmade gomay dhoop sticks and diyas — eco-friendly gaushala products.', hi: 'हस्तनिर्मित गोमय धूप व दीये — पर्यावरण-अनुकूल गौशाला उत्पाद।' },
    category: 'gaushala', price: 140, unit: 'gift box', moq: 100, capacity: 3000, image: real.shgStall2,
    producer: 'Shri Krishna Gaushala', origin: 'Pushkar, Rajasthan', tags: ['puja', 'eco'],
  },
  {
    name: { en: 'Handwoven Jute Tote Bags (Set of 3)', hi: 'हाथ से बुने जूट बैग (3 का सेट)' },
    description: { en: 'Durable, printed jute bags crafted by women’s self-help groups.', hi: 'महिला स्वयं सहायता समूहों द्वारा बने मज़बूत, प्रिंटेड जूट बैग।' },
    category: 'shg-crafts', price: 420, unit: 'set of 3', moq: 50, capacity: 1200, image: real.shgJuteBags,
    producer: 'Sakhi Mahila SHG', origin: 'Kota, Rajasthan', tags: ['shg', 'handmade'], featured: true,
  },
  {
    name: { en: 'Sikki Grass Decor Wall Plates', hi: 'सिक्की घास सजावटी प्लेट' },
    description: { en: 'Traditional natural-fibre craft woven by rural women artisans.', hi: 'ग्रामीण महिला कारीगरों द्वारा बुना पारंपरिक प्राकृतिक रेशा शिल्प।' },
    category: 'shg-crafts', price: 750, unit: 'set of 2', moq: 20, capacity: 200, image: real.shgHandicraft,
    producer: 'Gramin Kala SHG', origin: 'Rajasthan', tags: ['handicraft'],
  },
  {
    name: { en: 'Seasonal Vegetables – Mixed Lots', hi: 'मौसमी सब्ज़ियां – मिश्रित लॉट' },
    description: { en: 'Farm-fresh, chemical-free seasonal vegetables in graded lots — local delivery by e-auto youth entrepreneurs.', hi: 'खेत से ताज़ी, रसायन मुक्त मौसमी सब्ज़ियां — युवा ई-ऑटो उद्यमियों द्वारा डिलीवरी।' },
    category: 'fresh-produce', price: 28, unit: 'kg', moq: 200, capacity: 15000, image: stock.vegBaskets,
    producer: 'FPC E-Auto Fresh', origin: 'Jaipur, Rajasthan', tags: ['fresh', 'delivery'], featured: true,
  },
  {
    name: { en: 'Polyhouse Cherry Tomatoes', hi: 'पॉलीहाउस चेरी टमाटर' },
    description: { en: 'Residue-free cherry tomatoes grown in climate-controlled polyhouses.', hi: 'जलवायु-नियंत्रित पॉलीहाउस में उगे अवशेष-मुक्त चेरी टमाटर।' },
    category: 'fresh-produce', price: 90, unit: 'kg', moq: 100, capacity: 3000, image: stock.tomatoesGreenhouse,
    producer: 'PPP Polyhouse Cluster', origin: 'Jaipur, Rajasthan', tags: ['polyhouse'],
  },
]

const slug = (t: LText) =>
  t.en
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const seedProducts = (): Product[] =>
  seeds.map((s, i) => ({
    ...s,
    id: `p${String(i + 1).padStart(3, '0')}`,
    slug: slug(s.name),
    gallery: s.gallery ?? [s.image],
    isDemo: true,
    active: true,
    createdAt: d(60 - i * 2),
  }))

export const categories: { key: ProductCategory; label: LText }[] = [
  { key: 'dairy', label: { en: 'Dairy & Ghee', hi: 'डेयरी व घी' } },
  { key: 'grains', label: { en: 'Grains & Millets', hi: 'अनाज व मिलेट्स' } },
  { key: 'pulses', label: { en: 'Pulses', hi: 'दालें' } },
  { key: 'spices', label: { en: 'Spices', hi: 'मसाले' } },
  { key: 'oils', label: { en: 'Cold-pressed Oils', hi: 'कच्ची घानी तेल' } },
  { key: 'fresh-produce', label: { en: 'Fresh Produce', hi: 'ताज़ी उपज' } },
  { key: 'organic-inputs', label: { en: 'Organic Farm Inputs', hi: 'जैविक कृषि इनपुट' } },
  { key: 'gaushala', label: { en: 'Gaushala Products', hi: 'गौशाला उत्पाद' } },
  { key: 'shg-crafts', label: { en: 'SHG & Tribal Crafts', hi: 'SHG व आदिवासी शिल्प' } },
]
