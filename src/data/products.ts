import {
  CATEGORY_CIRCLE_IMAGES,
  getProductImage,
  getProductSecondaryImage,
  HERO_IMAGES,
  LIFESTYLE_IMAGES,
  STYLE_DIARY_IMAGES,
} from './images';

export type NavCategory =
  | 'HOME'
  | 'SALE'
  | 'FORMALS'
  | 'LUXURY FORMALS'
  | 'PRET'
  | 'CO-ORDS'
  | 'LAWN'
  | 'BRIDAL'
  | 'NEW ARRIVALS'
  | 'BEST SELLERS'
  | 'ABOUT';

export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rateFromPKR: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', label: 'PKR — Pakistani Rupee', symbol: 'PKR ', rateFromPKR: 1 },
  USD: { code: 'USD', label: 'USD — US Dollar', symbol: '$', rateFromPKR: 0.0036 },
  GBP: { code: 'GBP', label: 'GBP — British Pound', symbol: '£', rateFromPKR: 0.0028 },
  AED: { code: 'AED', label: 'AED — UAE Dirham', symbol: 'AED ', rateFromPKR: 0.0132 },
};

export function formatPrice(pkrAmount: number, currency: CurrencyCode = 'PKR'): string {
  const config = CURRENCIES[currency];
  const converted = Math.round(pkrAmount * config.rateFromPKR);
  return `${config.symbol}${converted.toLocaleString('en-US')}`;
}

export const NAV_ITEMS: NavCategory[] = [
  'HOME',
  'SALE',
  'FORMALS',
  'LUXURY FORMALS',
  'PRET',
  'CO-ORDS',
  'LAWN',
  'BRIDAL',
  'NEW ARRIVALS',
  'BEST SELLERS',
  'ABOUT',
];

export interface HeroSlide {
  id: string;
  edition: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  targetCategory: NavCategory;
  ctaLabel: string;
  garmentNote: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-dark-studio-01',
    edition: 'ATELIER ARCHIVE · EDITION I',
    title: 'SIGNATURE',
    subtitle: 'Collection',
    description:
      'Dramatic dark plaster studio couture illuminated by soft golden rim lighting—featuring midnight blue and ivory raw silk zardozi ensembles.',
    image: HERO_IMAGES.darkstudio,
    alt: 'Two Pakistani couture models in midnight blue and ivory zardozi formal wear in a dark charcoal studio with soft golden rim light',
    targetCategory: 'LUXURY FORMALS',
    ctaLabel: 'SHOP NOW',
    garmentNote: 'Featuring MIRHA MIDNIGHT LEHENGA & LIVIA KALIDAR',
  },
  {
    id: 'slide-signature-02',
    edition: 'HERITAGE COURTYARD · EDITION II',
    title: 'SIGNATURE',
    subtitle: 'Collection',
    description:
      'Heirloom ivory raw silk and hand-guided antique gold zardozi, tailored for timeless ceremonies.',
    image: HERO_IMAGES.signature,
    alt: 'Two models in ivory and antique gold embellished Pakistani formal couture standing in a sandstone courtyard',
    targetCategory: 'FORMALS',
    ctaLabel: 'SHOP NOW',
    garmentNote: 'Featuring LIVIA KALIDAR & AURELIA PISHWAS',
  },
  {
    id: 'slide-bridal-03',
    edition: 'ROYAL BRIDAL · EDITION III',
    title: 'SIGNATURE',
    subtitle: 'Collection',
    description:
      'Deep burgundy micro-velvet and pure katan silk lehengas illuminated with museum-grade dabka and naqshi.',
    image: HERO_IMAGES.bridal,
    alt: 'Two Pakistani models wearing deep burgundy and antique gold bridal lehengas in a heritage haveli',
    targetCategory: 'BRIDAL',
    ctaLabel: 'SHOP NOW',
    garmentNote: 'Featuring DILAAB VELVET & PARISA BRIDAL',
  },
  {
    id: 'slide-organza-04',
    edition: 'PAVILION PRET · EDITION IV',
    title: 'SIGNATURE',
    subtitle: 'Collection',
    description:
      'Weightless pure silk organza angrakhas and farshi ghararas with hand-knotted chikankari and pearl kamdani.',
    image: HERO_IMAGES.organza,
    alt: 'Two models in ivory and champagne gold organza angrakha and gharara couture in a marble pavilion',
    targetCategory: 'NEW ARRIVALS',
    ctaLabel: 'SHOP NOW',
    garmentNote: 'Featuring MAHROZE CHIKANKARI & NOOR-E-JAHAN',
  },
];

/* -------------------------------------------------------------------------- */
/* 1. SHOP BY CATEGORY (8 Circular Image Tiles)                               */
/* -------------------------------------------------------------------------- */
export interface CategoryTile {
  id: string;
  slug: string;
  label: string;
  targetNav: NavCategory;
  image: string;
  imagePosition: string;
  itemCount: string;
}

export const SHOP_BY_CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'cat-lawn-pret',
    slug: 'lawnpret',
    label: 'Lawn Pret',
    targetNav: 'PRET',
    image: CATEGORY_CIRCLE_IMAGES.lawnpret,
    imagePosition: '50% 18%',
    itemCount: '24 Pieces',
  },
  {
    id: 'cat-lawn',
    slug: 'lawn',
    label: 'Lawn',
    targetNav: 'LAWN',
    image: CATEGORY_CIRCLE_IMAGES.lawn,
    imagePosition: '66% 18%',
    itemCount: '18 Pieces',
  },
  {
    id: 'cat-formal-pret',
    slug: 'formalpret',
    label: 'Formal Pret',
    targetNav: 'PRET',
    image: CATEGORY_CIRCLE_IMAGES.formalpret,
    imagePosition: '50% 18%',
    itemCount: '32 Pieces',
  },
  {
    id: 'cat-formals',
    slug: 'formals',
    label: 'Formals',
    targetNav: 'FORMALS',
    image: CATEGORY_CIRCLE_IMAGES.formals,
    imagePosition: '50% 16%',
    itemCount: '40 Pieces',
  },
  {
    id: 'cat-luxury-formals',
    slug: 'luxuryformals',
    label: 'Luxury Formals',
    targetNav: 'LUXURY FORMALS',
    image: CATEGORY_CIRCLE_IMAGES.luxuryformals,
    imagePosition: '50% 16%',
    itemCount: '28 Pieces',
  },
  {
    id: 'cat-bridals',
    slug: 'bridals',
    label: 'Bridals',
    targetNav: 'BRIDAL',
    image: CATEGORY_CIRCLE_IMAGES.bridals,
    imagePosition: '50% 18%',
    itemCount: '16 Couture Sets',
  },
  {
    id: 'cat-coord-sets',
    slug: 'coordsets',
    label: 'Co-ord Sets',
    targetNav: 'CO-ORDS',
    image: CATEGORY_CIRCLE_IMAGES.coordsets,
    imagePosition: '50% 18%',
    itemCount: '22 Pieces',
  },
  {
    id: 'cat-sales',
    slug: 'sales',
    label: 'Sales',
    targetNav: 'SALE',
    image: CATEGORY_CIRCLE_IMAGES.sales,
    imagePosition: '50% 50%',
    itemCount: 'Archive Edit',
  },
];

/* -------------------------------------------------------------------------- */
/* 2. STYLE DIARIES (4 Editorial Lookbook Images)                             */
/* -------------------------------------------------------------------------- */
export interface StyleDiaryCard {
  id: string;
  chapter: string;
  title: string;
  muse: string;
  location: string;
  featuredProductName: string;
  featuredProductSlug: string;
  image: string;
  imagePosition: string;
  caption: string;
}

export const STYLE_DIARIES: StyleDiaryCard[] = [
  {
    id: 'diary-01',
    chapter: 'DIARY I · IVORY DRAPES & TRAVERTINE',
    title: 'Ivory Architecture',
    muse: 'Ayla Sikandar in Livia',
    location: 'Lahore Limestone Studio',
    featuredProductName: 'Livia',
    featuredProductSlug: 'livia',
    image: STYLE_DIARY_IMAGES.diarylivia,
    imagePosition: '50% 18%',
    caption:
      'Sixteen hand-worked kalidar panels of Korean raw silk catch soft studio light through carved sandstone arches.',
  },
  {
    id: 'diary-02',
    chapter: 'DIARY II · GREY PLASTER ATELIER',
    title: 'Sage Mirror & Resham',
    muse: 'Zoya Rahman in Havor',
    location: 'Grey Plaster Gallery',
    featuredProductName: 'Havor',
    featuredProductSlug: 'havor',
    image: STYLE_DIARY_IMAGES.diaryhavor,
    imagePosition: '50% 18%',
    caption:
      'Muted sage raw silk anarkali embroidered with silver-gold resham, mirror work, and freshwater seed pearls.',
  },
  {
    id: 'diary-03',
    chapter: 'DIARY III · DRAPED LINEN SALON',
    title: 'Royal Plum Silhouette',
    muse: 'Mehreen Qureshi in Soraya',
    location: 'Ivory Drape Studio',
    featuredProductName: 'Soraya',
    featuredProductSlug: 'soraya',
    image: STYLE_DIARY_IMAGES.diarysoraya,
    imagePosition: '50% 18%',
    caption:
      'Deep plum long front-slit raw silk shirt over a flared sharara encrusted with antique gold zardozi and sequins.',
  },
  {
    id: 'diary-04',
    chapter: 'DIARY IV · GOLDEN HOUR ARCHES',
    title: 'Shadow & Zari Co-Ord',
    muse: 'Noor Al-Maktoum in Zariyab',
    location: 'Old Lahore Courtyard',
    featuredProductName: 'Zariyab',
    featuredProductSlug: 'zariyab',
    image: STYLE_DIARY_IMAGES.diarynoir,
    imagePosition: '50% 18%',
    caption:
      'Structured ink-black raw silk meets geometric antique gold tilla borders for effortless modern evening soirées.',
  },
];

/* -------------------------------------------------------------------------- */
/* 3. 12+ DISTINCT PORTRAIT (4:5) COUTURE PRODUCTS                            */
/* -------------------------------------------------------------------------- */
export interface ProductItem {
  id: string;
  slug: string;
  sku: string;
  name: string;
  colorStory: string;
  silhouette: string;
  dupattaStyle: string;
  subtitle: string;
  primaryCategory: NavCategory;
  categories: NavCategory[];
  pricePKR: number;
  originalPricePKR?: number;
  image: string;
  secondaryImage: string;
  imagePosition: string;
  secondaryImagePosition?: string;
  fabric: string;
  embroidery: string;
  artisanHours: number;
  piecesIncluded: string;
  deliveryEstimate: string;
  statusTag?: string;
  sizes: string[];
  description: string;
  careInstructions: string;
}

export const FORMALS_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-livia',
    slug: 'livia',
    sku: 'LV-FRM-101',
    name: 'Livia',
    colorStory: 'Ivory & Antique Gold',
    silhouette: '16-Panel Kalidar Anarkali',
    dupattaStyle: 'Scalloped Mulberry Organza Dupatta',
    subtitle: 'Ivory & Antique Gold Zardozi Kalidar Pishwas',
    primaryCategory: 'FORMALS',
    categories: ['FORMALS', 'LUXURY FORMALS', 'BEST SELLERS', 'NEW ARRIVALS'],
    pricePKR: 68500,
    image: getProductImage('livia'),
    secondaryImage: getProductSecondaryImage('livia'),
    imagePosition: '50% 15%',
    secondaryImagePosition: '36% 18%',
    fabric: 'Pure Korean Raw Silk & Silk Organza Dupatta',
    embroidery: 'Antique Gold Zardozi, Dabka, Resham & Seed Pearls',
    artisanHours: 240,
    piecesIncluded: '3 Pieces — Kalidar Pishwas, Raw Silk Izhaar, Organza Dupatta',
    deliveryEstimate: '2 to 3 Weeks',
    statusTag: 'Signature Best Seller',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Named after the house itself, Livia is cut from luminous ivory raw silk with sixteen flared kalidar panels richly worked in antique gold zardozi and freshwater seed pearls.',
    careInstructions: 'Specialist dry clean only. Store in provided muslin garment bag away from direct moisture.',
  },
  {
    id: 'prod-havor',
    slug: 'havor',
    sku: 'LV-FRM-102',
    name: 'Havor',
    colorStory: 'Muted Sage Green',
    silhouette: 'Floor-Length Anarkali Kalidar',
    dupattaStyle: 'Sheer Sage Organza Mirror-Bordered Dupatta',
    subtitle: 'Sage Raw Silk Anarkali with Mirror & Pearl Work',
    primaryCategory: 'FORMALS',
    categories: ['FORMALS', 'NEW ARRIVALS', 'BEST SELLERS'],
    pricePKR: 64000,
    image: getProductImage('havor'),
    secondaryImage: getProductSecondaryImage('havor'),
    imagePosition: '50% 14%',
    secondaryImagePosition: '50% 16%',
    fabric: 'Muted Sage Pure Raw Silk & Organza',
    embroidery: 'Silver-Gold Resham, Mirror Work (Sheesha) & Seed Pearls',
    artisanHours: 220,
    piecesIncluded: '3 Pieces — Sage Anarkali, Churidar Pajama, Mirror-Work Dupatta',
    deliveryEstimate: '2 to 3 Weeks',
    statusTag: 'New Arrival',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Lensed against neutral grey plaster, Havor pairs serene sage green raw silk with artisanal sheesha mirror work, pastel resham florals, and hand-strung seed pearls.',
    careInstructions: 'Dry clean only using hydrocarbon solvent. Do not steam directly over mirror embroidery.',
  },
  {
    id: 'prod-soraya',
    slug: 'soraya',
    sku: 'LV-FRM-103',
    name: 'Soraya',
    colorStory: 'Royal Plum Purple',
    silhouette: 'Long Open Front-Slit Shirt & Sharara',
    dupattaStyle: 'Draped Plum Silk Organza Dupatta with Kiran',
    subtitle: 'Deep Plum Silk Open Shirt & Zardozi Flared Sharara',
    primaryCategory: 'FORMALS',
    categories: ['FORMALS', 'LUXURY FORMALS', 'NEW ARRIVALS'],
    pricePKR: 72000,
    image: getProductImage('soraya'),
    secondaryImage: getProductSecondaryImage('soraya'),
    imagePosition: '50% 14%',
    secondaryImagePosition: '50% 16%',
    fabric: 'Deep Plum Pure Katan Silk & Organza',
    embroidery: 'Antique Gold Zardozi, Dabka & Sequin Floral Jaal',
    artisanHours: 265,
    piecesIncluded: '3 Pieces — Front-Slit Long Shirt, Flared Sharara, Organza Dupatta',
    deliveryEstimate: '3 Weeks',
    statusTag: 'Editor’s Pick',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Regal royal plum katan silk tailored into an elongated front-slit silhouette over a sweeping sharara, richly bordered with antique gold zardozi and sequin medallions.',
    careInstructions: 'Specialist dry clean only. Iron on reverse side at low silk setting.',
  },
  {
    id: 'prod-celestria',
    slug: 'celestria',
    sku: 'LV-FRM-104',
    name: 'Celestria',
    colorStory: 'Champagne Gold',
    silhouette: 'Long Straight Kameez & Churidar',
    dupattaStyle: 'Hand-Loomed Metallic Tissue Dupatta',
    subtitle: 'Champagne Gold Hand-Loomed Tissue Formal Set',
    primaryCategory: 'FORMALS',
    categories: ['FORMALS', 'PRET', 'NEW ARRIVALS'],
    pricePKR: 59000,
    image: getProductImage('celestria'),
    secondaryImage: getProductSecondaryImage('celestria'),
    imagePosition: '50% 15%',
    secondaryImagePosition: '64% 18%',
    fabric: 'Hand-Loomed Champagne Tissue Silk & Churidar',
    embroidery: 'Crystal Cut-Dana, Mukesh & Tonal Resham',
    artisanHours: 190,
    piecesIncluded: '3 Pieces — Long Tissue Kameez, Silk Churidar, Scalloped Dupatta',
    deliveryEstimate: '2 Weeks',
    statusTag: 'New Arrival',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Liquid-drape champagne gold tissue silk encrusted with delicate cut-dana geometry and hand-knotted resham florals along the neckline and daman.',
    careInstructions: 'Dry clean only. Wrap tissue dupatta in acid-free tissue paper.',
  },
  {
    id: 'prod-mahroze',
    slug: 'mahroze',
    sku: 'LV-FRM-105',
    name: 'Mahroze',
    colorStory: 'Pearl Ivory',
    silhouette: 'Straight Chikankari Tunic & Izhaar',
    dupattaStyle: 'Scalloped Cutwork Mulberry Organza Dupatta',
    subtitle: 'Ivory Chikankari & Scalloped Organza Formal Pret',
    primaryCategory: 'FORMALS',
    categories: ['FORMALS', 'PRET', 'LAWN', 'NEW ARRIVALS'],
    pricePKR: 46500,
    image: getProductImage('mahroze'),
    secondaryImage: getProductSecondaryImage('mahroze'),
    imagePosition: '50% 15%',
    secondaryImagePosition: '32% 18%',
    fabric: 'Fine Egyptian Mulmul & Pure Mulberry Organza',
    embroidery: 'Hand-Guided Shadow Chikankari, Pearl & Schiffli Cutwork',
    artisanHours: 145,
    piecesIncluded: '3 Pieces — Chikankari Tunic, Straight Izhaar, Scalloped Dupatta',
    deliveryEstimate: '5 to 7 Business Days',
    statusTag: 'Ready to Ship',
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Ethereal daytime and daytime-nikkah elegance. Mahroze pairs intricate ivory shadow chikankari with hand-finished scalloped organza borders.',
    careInstructions: 'Gentle dry clean only.',
  },
  {
    id: 'prod-zariyab',
    slug: 'zariyab',
    sku: 'LV-FRM-106',
    name: 'Zariyab',
    colorStory: 'Ink Black & Antique Gold',
    silhouette: 'Structured Raw Silk Co-Ord Set',
    dupattaStyle: 'Optional Gold Tissue Stole',
    subtitle: 'Ink Black Raw Silk & Antique Gold Zari Co-Ord Formal',
    primaryCategory: 'CO-ORDS',
    categories: ['FORMALS', 'CO-ORDS', 'PRET', 'BEST SELLERS'],
    pricePKR: 54000,
    image: getProductImage('zariyab'),
    secondaryImage: getProductSecondaryImage('zariyab'),
    imagePosition: '50% 15%',
    secondaryImagePosition: '38% 18%',
    fabric: 'Ink Black Pure Raw Silk',
    embroidery: 'Architectural Gold Zardozi Neckline & Cuffs',
    artisanHours: 160,
    piecesIncluded: '2 Pieces — Zardozi Raw Silk Tunic & Wide-Leg Culottes',
    deliveryEstimate: '7 to 10 Business Days',
    statusTag: 'Best Seller',
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Tailored ink black raw silk illuminated by geometric antique gold zardozi along the mandarin neckline, cuffs, and hem.',
    careInstructions: 'Dry clean only.',
  },
];

export const LUXURY_FORMALS_PRODUCTS: ProductItem[] = [
  {
    id: 'lux-dilaab',
    slug: 'dilaab',
    sku: 'LV-LUX-201',
    name: 'Dilaab',
    colorStory: 'Deep Burgundy & Gold',
    silhouette: 'Long Kameez & Flared Sharara',
    dupattaStyle: '9000 Micro-Velvet Heirloom Shawl',
    subtitle: 'Deep Burgundy Raw Silk & Velvet Shawl Ensemble',
    primaryCategory: 'LUXURY FORMALS',
    categories: ['LUXURY FORMALS', 'FORMALS', 'BEST SELLERS'],
    pricePKR: 138000,
    image: getProductImage('dilaab'),
    secondaryImage: getProductSecondaryImage('dilaab'),
    imagePosition: '50% 15%',
    secondaryImagePosition: '50% 50%',
    fabric: 'Deep Burgundy Raw Silk & 9000 Micro-Velvet Pallu',
    embroidery: 'Antique Gold Tilla, Naqshi & Gota Borders',
    artisanHours: 380,
    piecesIncluded: '3 Pieces — Embroidered Kameez, Flared Sharara, Velvet Shawl',
    deliveryEstimate: '3 to 4 Weeks',
    statusTag: 'Best Seller',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Regal deep burgundy (#5A1424) raw silk paired with a heritage velvet shawl framed in dense antique gold tilla and paisley zardozi medallions.',
    careInstructions: 'Specialist velvet dry clean only. Never fold velvet pile under heavy weight.',
  },
  {
    id: 'lux-elina',
    slug: 'elina',
    sku: 'LV-LUX-202',
    name: 'Elina',
    colorStory: 'Dusty Blush Rose',
    silhouette: 'Floor-Length Couture Organza Gown',
    dupattaStyle: 'Trailing Pearl-Edged Blush Veil',
    subtitle: 'Blush Rose Silk Organza Gown with Pearl & Cut-Dana',
    primaryCategory: 'LUXURY FORMALS',
    categories: ['LUXURY FORMALS', 'BRIDAL', 'NEW ARRIVALS'],
    pricePKR: 165000,
    image: getProductImage('elina'),
    secondaryImage: getProductSecondaryImage('elina'),
    imagePosition: '50% 14%',
    secondaryImagePosition: '50% 16%',
    fabric: '100% Pure Mulberry Silk Organza & Raw Silk Lining',
    embroidery: '3D Pastel Resham Florals, Seed Pearls & Crystal Cut-Dana',
    artisanHours: 410,
    piecesIncluded: '2 Pieces — Floor-Length Couture Gown & Embellished Organza Veil',
    deliveryEstimate: '4 to 5 Weeks',
    statusTag: 'Walima Edit',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Sculpted in dusty blush rose silk organza, Elina features cascading 3D resham blossoms, crystal cut-dana, and freshwater pearls tailored for Walima and engagement soirées.',
    careInstructions: 'Specialist couture dry clean only.',
  },
  {
    id: 'lux-mirha',
    slug: 'mirha',
    sku: 'LV-LUX-203',
    name: 'Mirha',
    colorStory: 'Midnight Blue & Silver-Gold',
    silhouette: 'Royal Lehenga Choli',
    dupattaStyle: 'Heavy Mirror & Zardozi Framed Dupatta',
    subtitle: 'Midnight Blue Raw Silk Lehenga with Mirror & Tilla Work',
    primaryCategory: 'LUXURY FORMALS',
    categories: ['LUXURY FORMALS', 'BRIDAL', 'BEST SELLERS'],
    pricePKR: 195000,
    image: getProductImage('mirha'),
    secondaryImage: getProductSecondaryImage('mirha'),
    imagePosition: '50% 14%',
    secondaryImagePosition: '40% 18%',
    fabric: 'Midnight Blue Pure Raw Silk & Tissue',
    embroidery: 'Silver-Gold Zardozi, Sheesha Mirror Work & Tilla Lattice',
    artisanHours: 490,
    piecesIncluded: '3 Pieces — Hand-Worked Choli, Flared Lehenga, Framed Dupatta',
    deliveryEstimate: '4 to 6 Weeks',
    statusTag: 'Couture Archive',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Set against dark stone with soft rim light, Mirha commands attention in deep midnight blue raw silk encrusted with architectural silver-gold zardozi and mirror work.',
    careInstructions: 'Specialist dry clean only.',
  },
  {
    id: 'lux-zoya',
    slug: 'zoya',
    sku: 'LV-LUX-204',
    name: 'Zoya',
    colorStory: 'Burnished Antique Gold',
    silhouette: 'Long Open Front Jacket & Lehenga',
    dupattaStyle: 'Metallic Tissue Net Dupatta',
    subtitle: 'Antique Gold Tissue Jacket & Zardozi Lehenga',
    primaryCategory: 'LUXURY FORMALS',
    categories: ['LUXURY FORMALS', 'BRIDAL', 'NEW ARRIVALS'],
    pricePKR: 215000,
    image: getProductImage('zoya'),
    secondaryImage: getProductSecondaryImage('zoya'),
    imagePosition: '50% 14%',
    secondaryImagePosition: '50% 16%',
    fabric: 'Burnished Gold Hand-Loomed Tissue & Raw Silk',
    embroidery: 'Dense Zardozi Paisley Jaal, Mirror Work & Sequins',
    artisanHours: 520,
    piecesIncluded: '3 Pieces — Long Open Jacket, Tissue Lehenga, Embellished Dupatta',
    deliveryEstimate: '5 to 6 Weeks',
    statusTag: 'Bridal Couture',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Monochromatic antique gold mastery: Zoya pairs a floor-sweeping hand-loomed tissue lehenga with an intricately embroidered open front jacket.',
    careInstructions: 'Specialist dry clean only.',
  },
  {
    id: 'lux-aylin',
    slug: 'aylin',
    sku: 'LV-LUX-205',
    name: 'Aylin',
    colorStory: 'Pearl Blush & Ivory',
    silhouette: 'Anarkali Pishwas & Churidar',
    dupattaStyle: 'Floral Resham Embroidered Organza Dupatta',
    subtitle: 'Pearl Blush Organza Pishwas with Resham & Gota',
    primaryCategory: 'LUXURY FORMALS',
    categories: ['LUXURY FORMALS', 'FORMALS', 'SALE'],
    pricePKR: 132000,
    originalPricePKR: 155000,
    image: getProductImage('aylin'),
    secondaryImage: getProductSecondaryImage('aylin'),
    imagePosition: '50% 14%',
    secondaryImagePosition: '50% 16%',
    fabric: 'Pure Mulberry Organza & Katan Silk Churidar',
    embroidery: 'Rosewood & Sage Resham Florals, Seed Pearls & Gota',
    artisanHours: 340,
    piecesIncluded: '3 Pieces — Organza Pishwas, Silk Churidar, Floral Dupatta',
    deliveryEstimate: '3 to 4 Weeks',
    statusTag: 'Seasonal Edit',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Soft pearl-blush organza meets heirloom rosewood resham threadwork and silver-gold gota borders in a timeless subcontinental pishwas.',
    careInstructions: 'Specialist dry clean only.',
  },
  {
    id: 'lux-parisa',
    slug: 'parisa',
    sku: 'LV-LUX-206',
    name: 'Parisa',
    colorStory: 'Aubergine Plum & Burgundy',
    silhouette: 'Bridal Velvet Kameez & Farshi Sharara',
    dupattaStyle: 'Zardozi Lattice Bridal Velvet Shawl',
    subtitle: 'Plum & Burgundy Velvet Bridal Sharara Ensemble',
    primaryCategory: 'BRIDAL',
    categories: ['BRIDAL', 'LUXURY FORMALS', 'BEST SELLERS'],
    pricePKR: 365000,
    image: getProductImage('parisa'),
    secondaryImage: getProductSecondaryImage('parisa'),
    imagePosition: '50% 14%',
    secondaryImagePosition: '42% 18%',
    fabric: '9000 Silk Micro-Velvet & Banarsi Jamawar',
    embroidery: 'Museum-Grade Zardozi, Dabka, Naqshi & Pearl Lattice',
    artisanHours: 860,
    piecesIncluded: '3 Pieces — Velvet Bridal Shirt, Farshi Sharara, Lattice Velvet Shawl',
    deliveryEstimate: '6 to 8 Weeks (Bespoke Bridal)',
    statusTag: 'Bespoke Bridal',
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier Fit'],
    description:
      'Designed for winter Barat ceremonies, Parisa is crafted from plush aubergine-burgundy velvet with an architectural gold zardozi jaal shawl.',
    careInstructions: 'Specialist bridal conservation dry clean only.',
  },
];

export const ALL_PRODUCTS: ProductItem[] = [
  ...FORMALS_PRODUCTS,
  ...LUXURY_FORMALS_PRODUCTS,
];

/* -------------------------------------------------------------------------- */
/* 4. CUSTOMER REVIEWS (4.9/5 Store Rating, Horizontally Scrollable Cards)    */
/* -------------------------------------------------------------------------- */
export interface CustomerReviewItem {
  id: string;
  reviewerName: string;
  location: string;
  verifiedPurchase: boolean;
  rating: number;
  title: string;
  text: string;
  date: string;
  productSlug: string;
  productName: string;
  productThumbnail: string;
  productPricePKR: number;
}

export const CUSTOMER_REVIEWS: CustomerReviewItem[] = [
  {
    id: 'cust-rev-01',
    reviewerName: 'Ayla Sikandar Khan',
    location: 'Lahore, Pakistan',
    verifiedPurchase: true,
    rating: 5,
    title: 'Museum-grade zardozi with a weightless, regal drape',
    text: 'I ordered the Livia Kalidar for my sister’s Nikkah in Lahore. Every panel was aligned to perfection, the ivory Korean raw silk felt celestial, and the antique gold dabka work caught the chandelier light effortlessly.',
    date: 'October 2026',
    productSlug: 'livia',
    productName: 'Livia — Ivory & Gold Kalidar',
    productThumbnail: getProductImage('livia'),
    productPricePKR: 68500,
  },
  {
    id: 'cust-rev-02',
    reviewerName: 'Zainab Al-Maktoum',
    location: 'Dubai, UAE',
    verifiedPurchase: true,
    rating: 5,
    title: 'Arrived in a cedar-lined trunk four days ahead of schedule',
    text: 'Commissioned Dilaab with Custom Atelier Fit measurements for a formal reception at One&Only Royal Mirage. The deep burgundy 9000 micro-velvet shawl and antique gold tilla borders needed zero alterations upon arrival.',
    date: 'September 2026',
    productSlug: 'dilaab',
    productName: 'Dilaab — Burgundy Velvet Ensemble',
    productThumbnail: getProductImage('dilaab'),
    productPricePKR: 138000,
  },
  {
    id: 'cust-rev-03',
    reviewerName: 'Dr. Mehreen Qureshi',
    location: 'London, UK',
    verifiedPurchase: true,
    rating: 5,
    title: 'The sage mirror-work and resham are heirloom quality',
    text: 'Havor exceeded every expectation. The sheesha mirror work and seed pearl handwork on muted sage raw silk is so refined compared to mass-produced formals. Endless compliments in Knightsbridge.',
    date: 'September 2026',
    productSlug: 'havor',
    productName: 'Havor — Sage Anarkali',
    productThumbnail: getProductImage('havor'),
    productPricePKR: 64000,
  },
  {
    id: 'cust-rev-04',
    reviewerName: 'Saba Tariq Mahmood',
    location: 'Karachi, Pakistan',
    verifiedPurchase: true,
    rating: 5,
    title: 'Royal plum sharara that photographs like a dream',
    text: 'Soraya is my third commission from LIVA this year. The front-slit katan silk shirt and flared sharara move with such grace, and the antique gold zardozi border is immaculate.',
    date: 'August 2026',
    productSlug: 'soraya',
    productName: 'Soraya — Plum Sharara Set',
    productThumbnail: getProductImage('soraya'),
    productPricePKR: 72000,
  },
];

export const REVIEWS_LIFESTYLE_IMAGE = LIFESTYLE_IMAGES.reviews;

/* -------------------------------------------------------------------------- */
/* 5. FOOTER LINKS & STORE METADATA                                           */
/* -------------------------------------------------------------------------- */
export const FOOTER_ABOUT_LINKS: { label: string; slug: string; summary: string }[] = [
  {
    label: 'Our Story',
    slug: 'our-story',
    summary:
      'Founded in Lahore, LIVA preserves centuries-old subcontinental zardozi, naqshi, and chikankari craftsmanship through contemporary couture silhouettes.',
  },
  {
    label: 'Reviews',
    slug: 'reviews',
    summary:
      'Rated 4.9/5 across 348+ verified patron commissions in Pakistan, the UAE, the UK, and North America.',
  },
  {
    label: 'Store Locations',
    slug: 'locations',
    summary:
      'Lahore Flagship: Plot 14-C, M.M. Alam Road, Gulberg III. Karachi Salon: Clifton Block 4. Private Trunk Suites in London & Dubai.',
  },
  {
    label: 'Shipping',
    slug: 'shipping',
    summary:
      'Complimentary insured delivery across Pakistan via TCS Couture & worldwide express dispatch via DHL in archival garment chests.',
  },
  {
    label: 'Returns',
    slug: 'returns',
    summary:
      'Ready-to-wear Pret & Lawn pieces qualify for 14-day atelier exchange or complimentary size alteration. Bespoke bridal commissions include two fittings.',
  },
  {
    label: 'FAQ',
    slug: 'faq',
    summary:
      'Custom Atelier Fit orders are tailored to your exact measurements with video consultation support from our senior master tailors.',
  },
  {
    label: 'Terms',
    slug: 'terms',
    summary:
      'All hand-embellished garments are individually crafted by adult artisans under fair-wage guild standards in our Lahore atelier.',
  },
  {
    label: 'Privacy',
    slug: 'privacy',
    summary:
      'Your measurement profiles and private commission records are encrypted and strictly confidential to the House of LIVA.',
  },
  {
    label: 'Careers',
    slug: 'careers',
    summary:
      'We welcome textile graduates, zardozi master artisans, and luxury client advisors in Lahore and Karachi. Write to careers@livacouture.pk.',
  },
  {
    label: 'Contact',
    slug: 'contact',
    summary:
      'Direct Atelier Concierge: +92 (42) 3575-8920 · WhatsApp Stylist: +92 300 8445482 · Email: concierge@livacouture.pk.',
  },
];
