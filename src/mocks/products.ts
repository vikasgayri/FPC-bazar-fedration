import type { Product, ProductCategory, LText } from '@/types'
import { real, stock } from '@/data/images'

/** DEMO catalogue — illustrative products & prices for the client presentation only. */
const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 864e5).toISOString()

type Seed = Omit<Product, 'id' | 'slug' | 'isDemo' | 'active' | 'createdAt' | 'gallery'> & { gallery?: string[] }

const seeds: Seed[] = [
  {
    name: { en: 'A2 Desi Cow Ghee', hi: 'A2 देसी गाय घी' },
    description: {
      en: 'Traditional bilona-method ghee from gaushala-reared indigenous cows. Rich aroma, granular texture.',
      hi: 'गौशाला में पली देसी गायों के दूध से बिलोना विधि द्वारा बना पारंपरिक घी। सुगंधित और दानेदार।',
    },
    category: 'dairy', price: 1450, mrp: 1650, unit: '1 L jar', stock: 42, image: stock.gheeJar,
    producer: 'Gau Seva Gaushala Network', origin: 'Jaipur, Rajasthan', rating: 4.8, reviews: 126, tags: ['bilona', 'a2', 'gaushala'], featured: true,
  },
  {
    name: { en: 'Fresh Toned Milk (Daily Subscription)', hi: 'ताज़ा टोन्ड दूध (दैनिक)' },
    description: { en: 'Chilled, quality-tested milk collected from member dairy producers every morning.', hi: 'सदस्य दुग्ध उत्पादकों से हर सुबह एकत्र, गुणवत्ता जांचा हुआ ठंडा दूध।' },
    category: 'dairy', price: 62, mrp: 66, unit: '1 L', stock: 300, image: stock.milkBottle,
    producer: 'Sanchore Dugdh Utpadak Samiti', origin: 'Jalore, Rajasthan', rating: 4.6, reviews: 88, tags: ['milk', 'daily'],
  },
  {
    name: { en: 'Wild Forest Honey', hi: 'जंगली वन शहद' },
    description: { en: 'Raw, unprocessed honey collected by tribal collectors from forest belts. No added sugar.', hi: 'आदिवासी संग्राहकों द्वारा वन क्षेत्रों से एकत्र कच्चा शहद। बिना चीनी।' },
    category: 'shg-crafts', price: 420, mrp: 499, unit: '500 g', stock: 64, image: stock.honeyJars,
    producer: 'Aravali Van Dhan SHG', origin: 'Udaipur, Rajasthan', rating: 4.7, reviews: 211, tags: ['tribal', 'raw', 'honey'], featured: true,
  },
  {
    name: { en: 'Organic Turmeric Powder', hi: 'जैविक हल्दी पाउडर' },
    description: { en: 'High-curcumin turmeric, sun-dried and stone-ground by a women’s SHG.', hi: 'उच्च करक्यूमिन हल्दी — महिला SHG द्वारा धूप में सुखाकर पत्थर पर पिसी।' },
    category: 'spices', price: 180, mrp: 220, unit: '250 g', stock: 120, image: stock.turmeric,
    producer: 'Mahila Shakti SHG', origin: 'Nimar, Madhya Pradesh', rating: 4.6, reviews: 74, tags: ['organic', 'shg'], featured: true,
  },
  {
    name: { en: 'Kitchen Spice Combo (6 Masalas)', hi: 'रसोई मसाला कॉम्बो (6 मसाले)' },
    description: { en: 'Red chilli, coriander, cumin, garam masala, turmeric and kasuri methi — FPO sourced.', hi: 'लाल मिर्च, धनिया, जीरा, गरम मसाला, हल्दी और कसूरी मेथी — FPO से।' },
    category: 'spices', price: 549, mrp: 650, unit: '6 × 100 g', stock: 38, image: stock.spicesBowls,
    producer: 'Marwar Masala FPO', origin: 'Jodhpur, Rajasthan', rating: 4.5, reviews: 59, tags: ['combo', 'gift'],
  },
  {
    name: { en: 'Cold-pressed Mustard Oil', hi: 'कच्ची घानी सरसों तेल' },
    description: { en: 'Kachi ghani oil pressed from Bharatpur mustard seed. Pungent, pure, unrefined.', hi: 'भरतपुर की सरसों से कच्ची घानी में निकाला शुद्ध, अपरिष्कृत तेल।' },
    category: 'oils', price: 260, mrp: 299, unit: '1 L', stock: 90, image: stock.oilJar,
    producer: 'Braj Kisan Producer Co.', origin: 'Bharatpur, Rajasthan', rating: 4.6, reviews: 143, tags: ['kachi-ghani'], featured: true,
  },
  {
    name: { en: 'Bajra (Pearl Millet) – Organic', hi: 'बाजरा – जैविक' },
    description: { en: 'Nutrient-dense desert millet grown without chemicals. Ideal for rotis and khichdi.', hi: 'रसायन मुक्त उगाया गया पोषक तत्वों से भरपूर बाजरा।' },
    category: 'grains', price: 95, mrp: 110, unit: '1 kg', stock: 210, image: stock.paperBag,
    producer: 'Thar Millet FPO', origin: 'Barmer, Rajasthan', rating: 4.4, reviews: 41, tags: ['millet', 'organic'],
  },
  {
    name: { en: 'Sharbati Wheat Atta (Stone-ground)', hi: 'शरबती गेहूं आटा (चक्की)' },
    description: { en: 'Golden Sharbati wheat milled slow on stone chakki to retain fibre and taste.', hi: 'शरबती गेहूं को चक्की पर धीमी गति से पीसा गया — स्वाद और फाइबर बरकरार।' },
    category: 'grains', price: 340, mrp: 380, unit: '5 kg', stock: 75, image: stock.flour,
    producer: 'Sehore Kisan FPO', origin: 'Sehore, Madhya Pradesh', rating: 4.7, reviews: 167, tags: ['atta'], featured: true,
  },
  {
    name: { en: 'Basmati Rice – Aged', hi: 'बासमती चावल – पुराना' },
    description: { en: 'Long-grain basmati aged 12 months for fluffy, aromatic rice.', hi: '12 महीने पुराना लंबे दाने वाला सुगंधित बासमती।' },
    category: 'grains', price: 640, mrp: 720, unit: '5 kg', stock: 54, image: stock.riceCup,
    producer: 'Narmada Valley FPO', origin: 'Hoshangabad, Madhya Pradesh', rating: 4.5, reviews: 92, tags: ['rice'],
  },
  {
    name: { en: 'Moong Dal – Unpolished', hi: 'मूंग दाल – बिना पॉलिश' },
    description: { en: 'Unpolished split green gram from Nagaur farmers. Quick cooking, high protein.', hi: 'नागौर के किसानों की बिना पॉलिश मूंग दाल।' },
    category: 'pulses', price: 165, mrp: 190, unit: '1 kg', stock: 140, image: stock.lentils,
    producer: 'Nagaur Dalhan FPO', origin: 'Nagaur, Rajasthan', rating: 4.5, reviews: 63, tags: ['dal'],
  },
  {
    name: { en: 'Organic Jaggery (Gur) Powder', hi: 'जैविक गुड़ पाउडर' },
    description: { en: 'Chemical-free jaggery from organic sugarcane — a healthy sugar alternative.', hi: 'जैविक गन्ने से बना रसायन मुक्त गुड़ — चीनी का स्वस्थ विकल्प।' },
    category: 'grains', price: 120, mrp: 140, unit: '1 kg', stock: 0, image: stock.jaggery,
    producer: 'Malwa Organic FPO', origin: 'Indore, Madhya Pradesh', rating: 4.3, reviews: 28, tags: ['gur'],
  },
  {
    name: { en: 'Gaushala Organic Fertilizer', hi: 'गौशाला जैविक खाद' },
    description: { en: 'Quality-tested bio-fertilizer made from gaushala cow dung through anaerobic + aerobic processing.', hi: 'गौशाला गोबर से एनारोबिक + एरोबिक प्रक्रिया द्वारा बनी, जांची हुई जैविक खाद।' },
    category: 'organic-inputs', price: 450, mrp: 520, unit: '40 kg bag', stock: 300, image: stock.soilHands, gallery: [stock.soilHands, real.newsAmulLaunch],
    producer: 'FPC Gaushala Fertilizer Unit', origin: 'Jaipur, Rajasthan', rating: 4.6, reviews: 51, tags: ['bulk', 'farmer'], featured: true,
  },
  {
    name: { en: 'Vermicompost – Premium', hi: 'वर्मी कम्पोस्ट – प्रीमियम' },
    description: { en: 'Earthworm compost for kitchen gardens, nurseries and polyhouses.', hi: 'किचन गार्डन, नर्सरी व पॉलीहाउस के लिए केंचुआ खाद।' },
    category: 'organic-inputs', price: 299, mrp: 349, unit: '10 kg', stock: 160, image: stock.soilHands2,
    producer: 'Green Earth SHG', origin: 'Ajmer, Rajasthan', rating: 4.4, reviews: 37, tags: ['garden'],
  },
  {
    name: { en: 'Enzybiotic Power Pro (Cattle Feed Supplement)', hi: 'एन्ज़ायबायोटिक पावर प्रो (पशु आहार पूरक)' },
    description: { en: 'Natural enzyme + probiotic formula for milch animals. Partner product — Super Maps Biotech.', hi: 'दुधारू पशुओं के लिए प्राकृतिक एन्ज़ाइम + प्रोबायोटिक फ़ॉर्मूला। साझेदार उत्पाद।' },
    category: 'organic-inputs', price: 650, mrp: 750, unit: '1 kg', stock: 80, image: stock.cowsFeeders,
    producer: 'Super Maps Biotech (Partner)', origin: 'India', rating: 4.7, reviews: 46, tags: ['dairy', 'partner'],
  },
  {
    name: { en: 'Cow-dung Dhoop & Diya Set', hi: 'गोमय धूप एवं दीया सेट' },
    description: { en: 'Handmade gomay dhoop sticks and diyas — eco-friendly gaushala products.', hi: 'हस्तनिर्मित गोमय धूप व दीये — पर्यावरण-अनुकूल गौशाला उत्पाद।' },
    category: 'gaushala', price: 199, mrp: 249, unit: 'Gift box', stock: 95, image: real.shgStall2,
    producer: 'Shri Krishna Gaushala', origin: 'Pushkar, Rajasthan', rating: 4.5, reviews: 82, tags: ['puja', 'eco'],
  },
  {
    name: { en: 'Handwoven Jute Tote Bags (Set of 3)', hi: 'हाथ से बुने जूट बैग (3 का सेट)' },
    description: { en: 'Durable, printed jute bags crafted by women’s self-help groups.', hi: 'महिला स्वयं सहायता समूहों द्वारा बने मज़बूत, प्रिंटेड जूट बैग।' },
    category: 'shg-crafts', price: 549, mrp: 699, unit: 'Set of 3', stock: 48, image: real.shgJuteBags,
    producer: 'Sakhi Mahila SHG', origin: 'Kota, Rajasthan', rating: 4.8, reviews: 104, tags: ['shg', 'handmade'], featured: true,
  },
  {
    name: { en: 'Sikki Grass Decor Wall Plates', hi: 'सिक्की घास सजावटी प्लेट' },
    description: { en: 'Traditional natural-fibre craft woven by rural women artisans.', hi: 'ग्रामीण महिला कारीगरों द्वारा बुना पारंपरिक प्राकृतिक रेशा शिल्प।' },
    category: 'shg-crafts', price: 899, mrp: 1099, unit: 'Set of 2', stock: 20, image: real.shgHandicraft,
    producer: 'Gramin Kala SHG', origin: 'Rajasthan', rating: 4.6, reviews: 33, tags: ['handicraft'],
  },
  {
    name: { en: 'Seasonal Vegetable Basket', hi: 'मौसमी सब्ज़ी टोकरी' },
    description: { en: 'Farm-fresh, chemical-free seasonal vegetables — delivered by e-auto youth entrepreneurs.', hi: 'खेत से ताज़ी, रसायन मुक्त मौसमी सब्ज़ियां — युवा ई-ऑटो उद्यमियों द्वारा डिलीवरी।' },
    category: 'fresh-produce', price: 349, mrp: 399, unit: '5 kg basket', stock: 60, image: stock.vegBaskets,
    producer: 'FPC E-Auto Fresh', origin: 'Jaipur, Rajasthan', rating: 4.5, reviews: 210, tags: ['fresh', 'delivery'], featured: true,
  },
  {
    name: { en: 'Polyhouse Cherry Tomatoes', hi: 'पॉलीहाउस चेरी टमाटर' },
    description: { en: 'Residue-free cherry tomatoes grown in climate-controlled polyhouses.', hi: 'जलवायु-नियंत्रित पॉलीहाउस में उगे अवशेष-मुक्त चेरी टमाटर।' },
    category: 'fresh-produce', price: 120, mrp: 150, unit: '500 g', stock: 70, image: stock.tomatoesGreenhouse,
    producer: 'PPP Polyhouse Cluster', origin: 'Jaipur, Rajasthan', rating: 4.4, reviews: 19, tags: ['polyhouse'],
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
