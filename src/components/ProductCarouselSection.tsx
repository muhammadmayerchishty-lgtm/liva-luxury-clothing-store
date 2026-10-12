import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import {
  CurrencyCode,
  formatPrice,
  ProductItem,
} from '../data/products';
import { CoutureImage } from './CoutureImage';
import { SplitHeading } from './UxEnhancements';

interface ProductCarouselSectionProps {
  id: string;
  sectionIndexLabel: string;
  title: string;
  subtitle: string;
  products: ProductItem[];
  currency: CurrencyCode;
  onSelectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem) => void;
}

export const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({
  id,
  sectionIndexLabel,
  title,
  subtitle,
  products,
  currency,
  onSelectProduct,
  onQuickAdd,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const scrollByAmount = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.clientWidth;
    const scrollAmount =
      direction === 'next' ? containerWidth * 0.78 : -containerWidth * 0.78;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleAddClick = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    onQuickAdd(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    window.setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1400);
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="py-20 md:py-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-b border-[#0B0B0B]/10"
    >
      {/* Section Header + Left/Right Carousel Arrow Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#5A1424] mb-2">
            {sectionIndexLabel}
          </p>
          <SplitHeading
            id={`${id}-heading`}
            text={title}
            className="font-serif-display font-normal text-[#0B0B0B] tracking-[0.12em] uppercase"
            style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)' }}
          />
          <p className="text-xs sm:text-sm text-[#0B0B0B]/65 mt-1.5 max-w-lg">
            {subtitle}
          </p>
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-end shrink-0">
          <button
            type="button"
            onClick={() => scrollByAmount('prev')}
            className="w-11 h-11 border border-[#0B0B0B]/20 hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F7F3EC] flex items-center justify-center transition-colors duration-150 cursor-pointer"
            aria-label={`Previous ${title} products`}
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount('next')}
            className="w-11 h-11 border border-[#0B0B0B]/20 hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F7F3EC] flex items-center justify-center transition-colors duration-150 cursor-pointer"
            aria-label={`Next ${title} products`}
          >
            <ChevronRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Horizontal Product Carousel: 1.2 visible on mobile (82% width), 4 visible on desktop */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, index) => {
          const isAdded = addedIds[product.id];

          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectProduct(product)}
              className="w-[82%] sm:w-[46%] lg:w-[calc(25%-18px)] shrink-0 snap-start group cursor-pointer flex flex-col"
            >
              {/* 4:5 Portrait Image with Hover Swap to Second Image */}
              <div className="relative aspect-[4/5] w-full bg-[#EBE5DA] overflow-hidden border border-[#0B0B0B]/8 mb-4">
                {/* Primary Image */}
                <CoutureImage
                  src={product.image}
                  alt={`${product.name} — ${product.colorStory} ${product.silhouette}`}
                  fallbackLabel={product.name}
                  width={800}
                  height={1000}
                  objectPosition={product.imagePosition}
                  className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105"
                />

                {/* Secondary Hover-Swap Image */}
                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                  <CoutureImage
                    src={product.secondaryImage}
                    alt={`${product.name} secondary editorial view`}
                    fallbackLabel={product.name}
                    width={800}
                    height={1000}
                    objectPosition={product.secondaryImagePosition || '50% 20%'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Quick-Add Button Overlay at Bottom of Portrait */}
                <div className="absolute inset-x-3 bottom-3 z-10">
                  <button
                    type="button"
                    onClick={(e) => handleAddClick(e, product)}
                    className={`w-full py-2.5 px-4 text-[11px] tracking-[0.22em] uppercase font-medium transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isAdded
                        ? 'bg-[#5A1424] text-[#F7F3EC] opacity-100'
                        : 'bg-[#0B0B0B]/90 text-[#F7F3EC] hover:bg-[#5A1424] opacity-95 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[1.8]" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[1.8]" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Clean Unboxed Metadata */}
              <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#0B0B0B]/55 mb-1">
                <span>{product.colorStory}</span>
                {product.statusTag && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#5A1424]">{product.statusTag}</span>
                  </>
                )}
              </div>

              {/* Product Name & Price in PKR */}
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif-display text-xl font-medium text-[#0B0B0B] group-hover:text-[#5A1424] transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 font-mono tabular-nums text-xs sm:text-sm shrink-0">
                  {product.originalPricePKR && (
                    <span className="text-xs text-[#0B0B0B]/40 line-through">
                      {formatPrice(product.originalPricePKR, currency)}
                    </span>
                  )}
                  <span className="font-medium text-[#0B0B0B]">
                    {formatPrice(product.pricePKR, currency)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#0B0B0B]/60 mt-0.5 line-clamp-1">
                {product.subtitle}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
