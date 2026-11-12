/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE FOR ALL SITE IMAGERY
 * ─────────────────────────────────────────────────────────────
 *  • `real.*`  → photographs from the FPC Bazaar Federation company profile
 *                (stored in /public/images/real). Replace with higher-resolution
 *                originals when available — keep the same file names.
 *  • `stock.*` → licensed-free Unsplash photography used as placeholders until the
 *                client supplies its own photos. Swap any URL here; no UI edits needed.
 *  • `team.*`  → leadership portraits (/public/images/team).
 *  Every <Img> in the UI has a graceful fallback, so a missing file never breaks a layout.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

const r = (name: string) => `/images/real/${name}.jpg`

export const brand = {
  logo: '/brand/logo.png',
}

export const real = {
  polyhouseVisit: r('polyhouse-visit'),
  polyhouseCrop: r('polyhouse-crop'),
  fpoTraining1: r('fpo-training-1'),
  fpoTraining2: r('fpo-training-2'),
  federationStall: r('federation-stall'),
  federationPavilion: r('federation-pavilion'),
  federationPavilion2: r('federation-pavilion-2'),
  organicExpo: r('organic-expo'),
  organicPavilion: r('organic-pavilion'),
  fieldVisit: r('field-visit'),
  newsAmulLaunch: r('news-amul-organic-launch'),
  newsOrganicFertilizer: r('news-organic-fertilizer'),
  nationalSeminar: r('national-seminar'),
  ngoAward1: r('ngo-day-award-1'),
  ngoAward2: r('ngo-day-award-2'),
  ngoAward3: r('ngo-day-award-3'),
  ngoGroup: r('ngo-day-group'),
  partnerMeet: r('amul-partner-meet'),
  partnersMeet: r('partners-meet'),
  processingPlant: r('processing-plant'),
  farmerMeeting: r('farmer-meeting'),
  produceExhibit: r('produce-exhibit'),
  cattleVisit: r('cattle-visit'),
  agriDrone: r('agri-drone'),
  droneDemo: r('drone-demo'),
  fpoVisit: r('fpo-visit'),
  fpoProducts: r('fpo-products'),
  tribalFestival: r('tribal-festival'),
  tribalFestivalStage: r('tribal-festival-stage'),
  amcslBanner: r('amcsl-banner'),
  fpoStall: r('fpo-stall'),
  awardFelicitation: r('award-felicitation'),
  internationalDelegates: r('international-delegates'),
  shgHandicraft: r('shg-handicraft'),
  shgJuteBags: r('shg-jute-bags'),
  shgProductsStall: r('shg-products-stall'),
  shgStall2: r('shg-stall-2'),
  tribalDairyProject: r('tribal-dairy-project'),
  cowShedDesign: r('cow-shed-design'),
  expoBooth: r('expo-booth'),
  biogasPlant: r('biogas-plant'),
  biogasUnit: r('biogas-unit'),
  biogasBalloon: r('biogas-balloon'),
  gaushalaProjects: r('gaushala-projects'),
  gaushalaCattle: r('gaushala-cattle'),
  delegation: r('delegation'),
  // Added from the company profile (Jun 2025)
  ngoAward4: r('ngo-day-award-4'),
  ngoAward5: r('ngo-day-award-5'),
  ngoAward6: r('ngo-day-award-6'),
  shgEventStall: r('shg-event-stall'),
  productProcessing: r('product-processing'),
  organicPartnerHandover: r('organic-partner-handover'),
  partnerMeetingOffice: r('partner-meeting-office'),
  fpoMemberVisit: r('fpo-member-visit'),
  fpoProductTasting: r('fpo-product-tasting'),
  polyhouseTomatoes: r('polyhouse-tomatoes'),
  tribalSchemePoster: r('tribal-festival-scheme-poster'),
  amcslMeeting: r('amcsl-meeting'),
  organicFarmersExpo: r('organic-farmers-expo'),
  shgJuteBaskets: r('shg-jute-baskets'),
  mouSigning: r('mou-signing'),
  expoStageEvent: r('expo-stage-event'),
  trainingCertificates: r('training-certificates'),
  organicProductLaunch: r('organic-product-launch'),
  projectSiteVisit: r('project-site-visit'),
  shgArtisan: r('shg-handicraft-artisan'),
  expoDelegation: r('expo-delegation'),
  startupTraining: r('startup-training'),
  expoDiscussion: r('expo-discussion'),
  fpoCentreVisit: r('fpo-centre-visit'),
  projectPresentation: r('project-presentation'),
  digitalIndiaExpo: r('digital-india-expo'),
}

export const stock = {
  // Landscapes & people
  womenInField: u('1707721690544-781fe6ede937'),
  oxenPlough: u('1642578235897-efde6d98183b'),
  farmIndia: u('1604491671692-bb9413a6003b'),
  wheatField: u('1694621216902-905423a13491'),
  farmIndia2: u('1600150806193-cf869bcfee05'),
  indianFarm: u('1666545743813-e692fb2b2430'),
  village: u('1651678938586-affccc71c270'),
  womanSari: u('1622182605529-ee049ded8c82'),
  villageWomen: u('1759738101500-6d8d522b2681'),
  farmers: u('1633410195091-bd66114cef5f'),
  // Dairy & cattle
  cowCalf: u('1673107805538-f3813d78fb2b'),
  cowsPen: u('1671959238482-c1b873dfb878'),
  cowsFeeders: u('1772948260894-30489146e54e'),
  cattleGrazing: u('1742376089143-41b0bdafc312'),
  milkBottle: u('1647786028279-58e5a9669f6d', 900),
  milkPour: u('1678314462045-63e68648b891', 900),
  // Protected cultivation & soil
  greenhouse: u('1683476383052-150b12031d17'),
  greenhouse2: u('1653583822864-fe72defa9d93'),
  tomatoesGreenhouse: u('1683009118690-a5851ccb1112'),
  soilHands: u('1649577193391-f13d769d011d'),
  soilHands2: u('1575310897644-3636494ee2b1'),
  // Market & produce
  vegMarket: u('1663753489332-626c2786e1a0'),
  vegBaskets: u('1588519722329-51b46166ecbd'),
  freshProduce: u('1751376414971-aac3d7664969'),
  veggies: u('1661792218963-d68c87bf6388', 900),
  spicesMarket: u('1509813685-e7f0e4eaf3ee', 900),
  spicesBowls: u('1771541897176-44a3e01dc484', 900),
  spicesRound: u('1742748912566-b2f1851e6021', 900),
  turmeric: u('1768729340164-7d83fe18384d', 900),
  honeyJars: u('1692624569180-a46a71b7359b', 900),
  honeyDipper: u('1684693342351-7e2a8ebebd97', 900),
  gheeJar: u('1601232265936-6da280cff563', 900),
  oilJar: u('1741461555296-4e75b7bb8553', 900),
  butterJar: u('1573812461383-e5f8b759d12e', 900),
  riceCup: u('1771493003867-1aa55f96df5d', 900),
  lentils: u('1708436477916-f97964f3ccf1', 900),
  flour: u('1714842981153-ffeaf74e7a1a', 900),
  paperBag: u('1764070254247-351def349875', 900),
  jaggery: u('1615485500834-bc10199bc727', 900),
}

export const team = {
  laxmanLohana: '/images/team/laxman-lohana.jpg',
  naveenDhingra: '/images/team/naveen-dhingra.jpg',
  ashokSarrangan: '/images/team/ashok-sarrangan.jpg',
  narendraGaur: '/images/team/narendra-gaur.jpg',
  shyamSingh: '/images/team/shyam-singh-rajpurohit.jpg',
  mittalShah: '/images/team/mittal-shah.jpg',
  nileshPatel: '/images/team/nilesh-patel.jpg',
  rajendraJi: '/images/team/rajendra-ji.jpg',
  sourabhSindhi: '/images/team/sourabh-sindhi.jpg',
}

/** Advisory committee portraits (cropped from the company profile, pages 12–13). */
const a = (name: string) => `/images/advisory/${name}.jpg`
export const advisoryPhotos = {
  sunilShastri: a('sunil-shastri'),
  rahulDwivedi: a('rahul-dwivedi'),
  sarikaChoudhary: a('sarika-choudhary'),
  mkVajpayee: a('mk-vajpayee'),
  kishanPanchal: a('kishan-panchal'),
  yusufPathan: a('yusuf-pathan'),
  shaileshDadhich: a('shailesh-dadhich'),
  nGanesan: a('n-ganesan'),
  shankerSinghRawat: a('shanker-singh-rawat'),
  mohinderGill: a('mohinder-gill'),
  apurvaDesai: a('apurva-desai'),
  devanjanBose: a('devanjan-bose'),
  nareshKumar: a('naresh-kumar'),
  sanjaySuthar: a('sanjay-suthar'),
}

/**
 * Hero slideshow — swap freely. `fallback` is used if the primary URL fails.
 * `focus` is the CSS object-position focal point (x y). Keep the subject slightly right of centre
 * so it fills the right half of the hero while the headline sits on the left.
 */
export const heroSlides = [
  { src: stock.womenInField, fallback: real.fieldVisit, focus: '62% 38%' },
  { src: stock.cowCalf, fallback: real.gaushalaCattle, focus: '58% 55%' },
  { src: stock.greenhouse, fallback: real.polyhouseCrop, focus: '50% 45%' },
  { src: stock.oxenPlough, fallback: real.fpoTraining2, focus: '60% 50%' },
]

/**
 * Per-image display hints.
 *  • fit: 'contain' — documents/posters/clippings are shown whole on a blurred backdrop, never cropped.
 *  • pos — CSS object-position focal point so faces/subjects stay in frame when cropped.
 * Portrait photos without a hint default to an upper-third focus (faces).
 */
const HINTS: Record<string, { fit?: 'cover' | 'contain'; pos?: string }> = {
  [real.newsAmulLaunch]: { fit: 'contain' },
  [real.newsOrganicFertilizer]: { fit: 'contain' },
  [real.tribalSchemePoster]: { fit: 'contain' },
  [real.tribalDairyProject]: { fit: 'contain' },
  [real.cowShedDesign]: { fit: 'contain' },
  [real.startupTraining]: { pos: '40% 35%' },
  [real.fpoTraining2]: { pos: '50% 40%' },
  [real.polyhouseCrop]: { pos: '50% 30%' },
  [real.biogasBalloon]: { pos: '50% 40%' },
  [real.shgHandicraft]: { pos: '50% 35%' },
  [team.laxmanLohana]: { pos: '50% 20%' },
  [team.narendraGaur]: { pos: '50% 30%' },
  [team.shyamSingh]: { pos: '50% 20%' },
  [team.mittalShah]: { pos: '50% 20%' },
  [team.sourabhSindhi]: { pos: '50% 18%' },
}
export const imageHint = (src: string) => HINTS[src] ?? {}
