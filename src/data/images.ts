/**
 * Centralized mapping of product slugs to local /images/*.webp files in /public/images/.
 * All filenames strictly follow lowercase-with-hyphens convention for Linux/Vercel case sensitivity.
 */

export const PRODUCT_IMAGES: Record<string, { primary: string; secondary: string }> = {
  livia: {
    primary: '/images/livia.webp',
    secondary: '/images/hero-signature.webp',
  },
  celestria: {
    primary: '/images/celestria.webp',
    secondary: '/images/hero-noir.webp',
  },
  dilaab: {
    primary: '/images/dilaab.webp',
    secondary: '/images/atelier-craft.webp',
  },
  mahroze: {
    primary: '/images/mahroze.webp',
    secondary: '/images/hero-organza.webp',
  },
  havor: {
    primary: '/images/havor.webp',
    secondary: '/images/livia.webp',
  },
  soraya: {
    primary: '/images/soraya.webp',
    secondary: '/images/dilaab.webp',
  },
  elina: {
    primary: '/images/elina.webp',
    secondary: '/images/aylin.webp',
  },
  mirha: {
    primary: '/images/mirha.webp',
    secondary: '/images/hero.webp',
  },
  zoya: {
    primary: '/images/zoya.webp',
    secondary: '/images/celestria.webp',
  },
  aylin: {
    primary: '/images/aylin.webp',
    secondary: '/images/elina.webp',
  },
  parisa: {
    primary: '/images/parisa.webp',
    secondary: '/images/hero-bridal.webp',
  },
  zariyab: {
    primary: '/images/zariyab.webp',
    secondary: '/images/hero-noir.webp',
  },
  aurelia: {
    primary: '/images/aurelia.webp',
    secondary: '/images/livia.webp',
  },
  maharani: {
    primary: '/images/maharani.webp',
    secondary: '/images/parisa.webp',
  },
  shahnaz: {
    primary: '/images/shahnaz.webp',
    secondary: '/images/zariyab.webp',
  },
  noorejahan: {
    primary: '/images/noor-e-jahan.webp',
    secondary: '/images/mahroze.webp',
  },
};

export const HERO_IMAGES = {
  darkstudio: '/images/hero.webp',
  signature: '/images/hero-signature.webp',
  bridal: '/images/hero-bridal.webp',
  noir: '/images/hero-noir.webp',
  organza: '/images/hero-organza.webp',
} as const;

export const CATEGORY_CIRCLE_IMAGES: Record<string, string> = {
  lawnpret: '/images/cat-lawn-pret.webp',
  lawn: '/images/cat-lawn.webp',
  formalpret: '/images/cat-formal-pret.webp',
  formals: '/images/cat-formals.webp',
  luxuryformals: '/images/cat-luxury-formals.webp',
  bridals: '/images/cat-bridals.webp',
  coordsets: '/images/cat-coords.webp',
  sales: '/images/cat-sales.webp',
};

export const STYLE_DIARY_IMAGES: Record<string, string> = {
  diarylivia: '/images/diary-livia.webp',
  diarynoir: '/images/diary-noir.webp',
  diaryhavor: '/images/diary-havor.webp',
  diarysoraya: '/images/diary-soraya.webp',
};

export const LIFESTYLE_IMAGES = {
  reviews: '/images/reviews-lifestyle.webp',
  craft: '/images/atelier-craft.webp',
  og: '/images/og-image.webp',
} as const;

export function getProductImage(slug: string): string {
  const clean = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  return PRODUCT_IMAGES[clean]?.primary || '/images/livia.webp';
}

export function getProductSecondaryImage(slug: string): string {
  const clean = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  return PRODUCT_IMAGES[clean]?.secondary || '/images/hero-signature.webp';
}
