import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Plus,
  Ruler,
  ShieldCheck,
  Sparkles,
  ZoomIn,
} from 'lucide-react';
import {
  ALL_PRODUCTS,
  CurrencyCode,
  formatPrice,
  ProductItem,
} from '../data/products';
import { CoutureImage } from './CoutureImage';

interface ProductDetailPageProps {
  product: ProductItem;
  currency: CurrencyCode;
  onBackToHome: () => void;
  onSelectProductSlug: (slug: string) => void;
  onAddToCart: (product: ProductItem, size: string, customNotes?: string) => void;
  onOpenAppointment: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  currency,
  onBackToHome,
  onSelectProductSlug,
  onAddToCart,
  onOpenAppointment,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[1] || product.sizes[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState<0 | 1>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('craft');
  const [customFit, setCustomFit] = useState({
    bust: '36"',
    waist: '29"',
    length: '56"',
  });

  useEffect(() => {
    setSelectedSize(product.sizes[1] || product.sizes[0]);
    setActiveImageIndex(0);
    setIsZoomed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id, product.sizes]);

  const galleryImages = [
    {
      src: product.image,
      label: '01. Portrait Silhouette',
      pos: product.imagePosition,
    },
    {
      src: product.secondaryImage,
      label: '02. Editorial & Zardozi Detail',
      pos: product.secondaryImagePosition || '50% 20%',
    },
  ];

  const completeTheLookItems = ALL_PRODUCTS.filter(
    (item) => item.id !== product.id
  ).slice(0, 4);

  const handleMouseMoveZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
    const y = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
    setZoomOrigin({ x, y });
  };

  const triggerAddToCart = () => {
    const notes =
      selectedSize === 'Custom Atelier Fit'
        ? `Bust ${customFit.bust}, Waist ${customFit.waist}, Length ${customFit.length}`
        : undefined;
    onAddToCart(product, selectedSize, notes);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1600);
  };

  const accordionSections = [
    {
      id: 'craft',
      title: '01. Fabric, Silhouette & Zardozi Handwork',
      content: `${product.fabric}. Hand-embellished with ${product.embroidery} over ${product.artisanHours} artisan hours in our Lahore atelier. Silhouette: ${product.silhouette}. Dupatta: ${product.dupattaStyle}.`,
    },
    {
      id: 'pieces',
      title: '02. Ensemble Components Included',
      content: product.piecesIncluded,
    },
    {
      id: 'delivery',
      title: '03. Dispatch Timeline & Bespoke Fitting',
      content: `Estimated dispatch: ${product.deliveryEstimate}. Complimentary insured global courier via DHL Express and TCS Couture inside archival cedar-lined garment boxes.`,
    },
    {
      id: 'care',
      title: '04. Garment Care & Preservation',
      content: product.careInstructions,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pb-28"
    >
      {/* Top Breadcrumb Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-5 border-b border-[#0B0B0B]/10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[#0B0B0B]/75 hover:text-[#5A1424] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
          <span>Back to Boutique</span>
        </button>

        <nav
          aria-label="Breadcrumb"
          className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#0B0B0B]/55"
        >
          <button
            type="button"
            onClick={onBackToHome}
            className="hover:text-[#0B0B0B] cursor-pointer"
          >
            HOME
          </button>
          <span aria-hidden="true">/</span>
          <span>{product.primaryCategory}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#5A1424] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Main Contiguous Purchase Module (Sticky Gallery Left, Purchase Details Right) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 7 Columns: 4:5 Portrait Image Gallery with Optical Zoom */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Thumbnails Column */}
            <div className="sm:col-span-2 flex sm:flex-col gap-3 order-2 sm:order-1">
              {galleryImages.map((img, idx) => {
                const active = activeImageIndex === idx;
                return (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(idx as 0 | 1);
                      setIsZoomed(false);
                    }}
                    className={`relative aspect-[4/5] w-20 sm:w-full overflow-hidden border transition-all cursor-pointer ${
                      active
                        ? 'border-[#0B0B0B] ring-1 ring-[#0B0B0B]'
                        : 'border-[#0B0B0B]/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <CoutureImage
                      src={img.src}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fallbackLabel={product.name}
                      width={200}
                      height={250}
                      objectPosition={img.pos}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main 4:5 Zoomable Portrait Viewport */}
            <div className="sm:col-span-10 order-1 sm:order-2 relative aspect-[4/5] w-full bg-[#EBE5DA] border border-[#0B0B0B]/10 overflow-hidden">
              <div
                onClick={() => setIsZoomed((prev) => !prev)}
                onMouseMove={handleMouseMoveZoom}
                onMouseLeave={() => setIsZoomed(false)}
                className={`w-full h-full overflow-hidden ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
              >
                <div
                  style={{
                    transform: isZoomed ? 'scale(2.05)' : 'scale(1)',
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  }}
                  className="w-full h-full transition-transform duration-200 ease-out"
                >
                  <CoutureImage
                    src={galleryImages[activeImageIndex].src}
                    alt={`${product.name} — ${product.subtitle}`}
                    fallbackLabel={product.name}
                    width={1200}
                    height={1500}
                    eager
                    objectPosition={galleryImages[activeImageIndex].pos}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="absolute bottom-4 right-4 z-10 px-3.5 py-2 bg-[#0B0B0B]/80 backdrop-blur-xs text-[#F7F3EC] text-[10px] tracking-[0.2em] uppercase inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#B8975A]" />
                <span>{isZoomed ? 'Reset Zoom' : 'Click to Zoom 2x'}</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[#5A1424] mb-2">
              <span>{product.primaryCategory}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{product.sku}</span>
              <span aria-hidden="true">·</span>
              <span>{product.colorStory}</span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0B0B0B] tracking-[0.04em] mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-[#0B0B0B]/70 mb-5">{product.subtitle}</p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-6 mb-6 border-b border-[#0B0B0B]/12 font-mono tabular-nums">
              <span className="text-2xl font-medium text-[#0B0B0B]">
                {formatPrice(product.pricePKR, currency)}
              </span>
              {product.originalPricePKR && (
                <span className="text-sm text-[#0B0B0B]/45 line-through">
                  {formatPrice(product.originalPricePKR, currency)}
                </span>
              )}
              <span className="ml-auto text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/60">
                {product.artisanHours} HRS HANDWORK
              </span>
            </div>

            <p className="text-sm text-[#0B0B0B]/80 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase mb-3">
                <span className="font-medium">SELECT SIZE</span>
                <span className="text-[#5A1424] inline-flex items-center gap-1 text-[11px]">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Complimentary Atelier Tailoring</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-xs tracking-[0.18em] uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#0B0B0B] text-[#F7F3EC] border-[#0B0B0B] font-medium'
                          : 'border-[#0B0B0B]/20 text-[#0B0B0B] hover:border-[#0B0B0B]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {selectedSize === 'Custom Atelier Fit' && (
                <div className="mt-4 p-4 bg-[#FAF7F2] border border-[#B8975A]/50 grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0B0B0B]/70 mb-1">
                      Bust (in)
                    </label>
                    <input
                      type="text"
                      value={customFit.bust}
                      onChange={(e) =>
                        setCustomFit((p) => ({ ...p, bust: e.target.value }))
                      }
                      className="w-full bg-white border border-[#0B0B0B]/20 px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0B0B0B]/70 mb-1">
                      Waist (in)
                    </label>
                    <input
                      type="text"
                      value={customFit.waist}
                      onChange={(e) =>
                        setCustomFit((p) => ({ ...p, waist: e.target.value }))
                      }
                      className="w-full bg-white border border-[#0B0B0B]/20 px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0B0B0B]/70 mb-1">
                      Length (in)
                    </label>
                    <input
                      type="text"
                      value={customFit.length}
                      onChange={(e) =>
                        setCustomFit((p) => ({ ...p, length: e.target.value }))
                      }
                      className="w-full bg-white border border-[#0B0B0B]/20 px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Primary Add to Cart & Private Consultation CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                type="button"
                onClick={triggerAddToCart}
                className={`flex-1 py-4 px-6 text-xs tracking-[0.24em] uppercase font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2 cursor-pointer ${
                  addedFeedback
                    ? 'bg-[#5A1424] text-[#F7F3EC]'
                    : 'bg-[#0B0B0B] text-[#F7F3EC] hover:bg-[#5A1424]'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Atelier Bag</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>
                      Add to Bag — {formatPrice(product.pricePKR, currency)}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="py-4 px-5 border border-[#0B0B0B] text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F7F3EC] text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                Virtual Fitting
              </button>
            </div>

            {/* Trust Note */}
            <div className="p-4 bg-[#FAF7F2] border border-[#0B0B0B]/10 flex items-center gap-3 text-xs text-[#0B0B0B]/75 mb-8">
              <ShieldCheck className="w-4 h-4 text-[#5A1424] shrink-0" />
              <span>
                Dispatched in an archival cedar-lined LIVA chest with
                authenticity certificate signed by the master karigar.
              </span>
            </div>

            {/* Details Accordion */}
            <div className="border-t border-[#0B0B0B]/12 divide-y divide-[#0B0B0B]/12">
              {accordionSections.map((sec) => {
                const isOpen = openAccordion === sec.id;
                return (
                  <div key={sec.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenAccordion(isOpen ? '' : sec.id)
                      }
                      aria-expanded={isOpen}
                      className="w-full py-4 flex items-center justify-between gap-4 text-left text-xs tracking-[0.18em] uppercase font-medium text-[#0B0B0B] hover:text-[#5A1424] transition-colors cursor-pointer"
                    >
                      <span>{sec.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#5A1424]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 text-xs sm:text-sm text-[#0B0B0B]/75 leading-relaxed">
                        {sec.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* "Complete the Look" Carousel */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-8 border-t border-[#0B0B0B]/10">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#5A1424] mb-1.5 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED PAIRING</span>
            </p>
            <h2 className="font-serif-display text-2xl sm:text-3xl uppercase tracking-[0.1em] text-[#0B0B0B]">
              Complete The Look
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {completeTheLookItems.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectProductSlug(item.slug)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full bg-[#EBE5DA] overflow-hidden border border-[#0B0B0B]/10 mb-3.5">
                <CoutureImage
                  src={item.image}
                  alt={item.name}
                  fallbackLabel={item.name}
                  width={600}
                  height={750}
                  objectPosition={item.imagePosition}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif-display text-lg font-medium text-[#0B0B0B] group-hover:text-[#5A1424]">
                  {item.name}
                </h3>
                <span className="font-mono tabular-nums text-xs font-medium">
                  {formatPrice(item.pricePKR, currency)}
                </span>
              </div>
              <p className="text-xs text-[#0B0B0B]/60 mt-0.5 line-clamp-1">
                {item.colorStory} · {item.silhouette}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Add-to-Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#F7F3EC]/95 backdrop-blur-md border-t border-[#0B0B0B]/15 py-3 px-4 sm:px-8 shadow-xl">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-12 bg-[#EBE5DA] border border-[#0B0B0B]/10 overflow-hidden shrink-0 hidden sm:block">
              <CoutureImage
                src={product.image}
                alt={product.name}
                fallbackLabel={product.name}
                width={80}
                height={100}
                objectPosition={product.imagePosition}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-serif-display text-lg font-medium text-[#0B0B0B] truncate">
                {product.name}
              </p>
              <p className="text-[11px] tracking-[0.16em] uppercase text-[#0B0B0B]/60">
                Size: {selectedSize} · {formatPrice(product.pricePKR, currency)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={triggerAddToCart}
              className="px-6 py-3 bg-[#0B0B0B] text-[#F7F3EC] hover:bg-[#5A1424] text-xs tracking-[0.22em] uppercase font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {addedFeedback ? 'Added to Bag ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
