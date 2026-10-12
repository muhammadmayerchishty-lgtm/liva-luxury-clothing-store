import React, { useMemo, useState } from 'react';
import { Eye, Plus, Check, SlidersHorizontal } from 'lucide-react';
import {
  ALL_PRODUCTS,
  CurrencyCode,
  formatPrice,
  NavCategory,
  ProductItem,
} from '../data/products';
import { CoutureImage } from './CoutureImage';
import { SplitHeading } from './UxEnhancements';

interface CollectionSectionProps {
  activeCategory: NavCategory;
  onSelectCategory: (category: NavCategory) => void;
  currency: CurrencyCode;
  onSelectProduct: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem, size: string) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'hours-desc';

const FILTER_CATEGORIES: { label: string; value: NavCategory }[] = [
  { label: 'ALL (12)', value: 'HOME' },
  { label: 'FORMALS', value: 'FORMALS' },
  { label: 'LUXURY FORMALS', value: 'LUXURY FORMALS' },
  { label: 'BRIDAL', value: 'BRIDAL' },
  { label: 'PRET', value: 'PRET' },
  { label: 'CO-ORDS', value: 'CO-ORDS' },
  { label: 'LAWN', value: 'LAWN' },
  { label: 'NEW ARRIVALS', value: 'NEW ARRIVALS' },
  { label: 'BEST SELLERS', value: 'BEST SELLERS' },
  { label: 'SALE', value: 'SALE' },
];

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  activeCategory,
  onSelectCategory,
  currency,
  onSelectProduct,
  onQuickView,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  const effectiveFilter: NavCategory =
    activeCategory === 'ABOUT' ? 'HOME' : activeCategory;

  const filteredProducts = useMemo(() => {
    const base =
      effectiveFilter === 'HOME'
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter(
            (item) =>
              item.primaryCategory === effectiveFilter ||
              item.categories.includes(effectiveFilter)
          );

    const copy = [...base];
    if (sortBy === 'price-asc') {
      copy.sort((a, b) => a.pricePKR - b.pricePKR);
    } else if (sortBy === 'price-desc') {
      copy.sort((a, b) => b.pricePKR - a.pricePKR);
    } else if (sortBy === 'hours-desc') {
      copy.sort((a, b) => b.artisanHours - a.artisanHours);
    }
    return copy;
  }, [effectiveFilter, sortBy]);

  const handleQuickAdd = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[1] || product.sizes[0]);
    setAddedId(product.id);
    window.setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  return (
    <section
      id="liva-collections"
      className="py-20 md:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#0B0B0B]/10">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#5A1424] mb-2">
            03. COMPLETE COUTURE CATALOG
          </p>
          <SplitHeading
            text={
              effectiveFilter === 'HOME'
                ? 'All 12 Signature Ensembles'
                : `${effectiveFilter} Archive`
            }
            className="font-serif-display font-normal text-[#0B0B0B] tracking-[0.04em] leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.1rem)' }}
          />
        </div>

        <p className="text-sm text-[#0B0B0B]/70 max-w-md leading-relaxed">
          Click any portrait below to open its dedicated product showcase page
          with 2x optical zoom, details accordion, and custom atelier sizing.
        </p>
      </div>

      {/* Filter Bar & Sort Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-6 border-b border-[#0B0B0B]/10 mb-12">
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar"
          role="tablist"
          aria-label="Filter collection by category"
        >
          {FILTER_CATEGORIES.map((cat) => {
            const active = effectiveFilter === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3.5 py-2 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  active
                    ? 'bg-[#0B0B0B] text-[#F7F3EC] font-medium'
                    : 'text-[#0B0B0B]/70 hover:text-[#0B0B0B] hover:bg-[#0B0B0B]/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-5 shrink-0">
          <span className="text-xs text-[#0B0B0B]/60 font-mono tabular-nums whitespace-nowrap">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'ENSEMBLE' : 'ENSEMBLES'}
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="w-3.5 h-3.5 text-[#B8975A]"
              aria-hidden="true"
            />
            <label htmlFor="liva-sort" className="sr-only">
              Sort ensembles
            </label>
            <select
              id="liva-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-b border-[#0B0B0B]/25 py-1 pr-2 text-xs tracking-[0.15em] uppercase text-[#0B0B0B] focus:outline-none focus:border-[#5A1424] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="hours-desc">Craftsmanship Hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3-Column Product Grid (4:5 Portrait Aspect Ratio) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {filteredProducts.map((product) => {
          const isAdded = addedId === product.id;

          return (
            <article
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* 4:5 Portrait Container */}
              <div className="relative w-full aspect-[4/5] bg-[#EBE5DA] overflow-hidden mb-5 border border-[#0B0B0B]/8">
                <CoutureImage
                  src={product.image}
                  alt={`${product.name} — ${product.colorStory} ${product.silhouette}`}
                  fallbackLabel={product.name}
                  width={800}
                  height={1000}
                  objectPosition={product.imagePosition}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Bottom Action Scrim on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/45 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="flex-1 py-2.5 px-3 bg-[#F7F3EC]/95 text-[#0B0B0B] hover:bg-[#B8975A] hover:text-[#0B0B0B] text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-150 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Quick View</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`py-2.5 px-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-150 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                      isAdded
                        ? 'bg-[#5A1424] text-[#F7F3EC]'
                        : 'bg-[#0B0B0B] text-[#F7F3EC] hover:bg-[#5A1424]'
                    }`}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[1.8]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[1.8]" />
                        <span>Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Clean Unboxed Metadata */}
              <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/60 mb-1.5">
                <span>{product.colorStory}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {product.artisanHours} HRS
                </span>
                {product.statusTag && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#5A1424] font-medium">
                      {product.statusTag}
                    </span>
                  </>
                )}
              </div>

              {/* Product Title & Price Row */}
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif-display text-2xl font-medium text-[#0B0B0B] group-hover:text-[#5A1424] transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 shrink-0 font-mono tabular-nums text-sm">
                  {product.originalPricePKR && (
                    <span className="text-xs text-[#0B0B0B]/45 line-through">
                      {formatPrice(product.originalPricePKR, currency)}
                    </span>
                  )}
                  <span className="font-medium text-[#0B0B0B]">
                    {formatPrice(product.pricePKR, currency)}
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-[#0B0B0B]/65 mt-1 line-clamp-1">
                {product.silhouette} · {product.dupattaStyle}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
