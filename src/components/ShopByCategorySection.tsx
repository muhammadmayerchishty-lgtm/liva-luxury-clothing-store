import React from 'react';
import { motion } from 'motion/react';
import {
  CategoryTile,
  NavCategory,
  SHOP_BY_CATEGORY_TILES,
} from '../data/products';
import { CoutureImage } from './CoutureImage';
import { SplitHeading } from './UxEnhancements';

interface ShopByCategorySectionProps {
  onSelectCategory: (category: NavCategory) => void;
}

export const ShopByCategorySection: React.FC<ShopByCategorySectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section
      id="liva-shop-by-category"
      aria-labelledby="shop-by-category-heading"
      className="py-20 md:py-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-b border-[#0B0B0B]/8"
    >
      {/* Section Header with Split-Text Reveal */}
      <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#5A1424] mb-2">
          CURATED DEPARTMENTS
        </p>
        <SplitHeading
          id="shop-by-category-heading"
          text="Shop By Category"
          className="font-serif-display font-normal text-[#0B0B0B] tracking-[0.12em] uppercase justify-center"
          style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)' }}
        />
        <div className="w-12 h-[1px] bg-[#B8975A] mx-auto mt-4" />
      </div>

      {/* 8 Circular Image Tiles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-5 gap-y-10 items-start justify-items-center">
        {SHOP_BY_CATEGORY_TILES.map((tile: CategoryTile, index: number) => (
          <motion.button
            key={tile.id}
            type="button"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.55,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => onSelectCategory(tile.targetNav)}
            className="group flex flex-col items-center text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A] w-full max-w-[150px]"
          >
            {/* Circular Image Tile: on hover gets thin black border & scales 1.05 */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden bg-[#EBE5DA] border border-transparent group-hover:border-[#0B0B0B] p-1 transition-all duration-300 ease-out group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <CoutureImage
                  src={tile.image}
                  alt={`${tile.label} — LIVA Pakistani Couture Department`}
                  fallbackLabel={tile.label}
                  width={320}
                  height={320}
                  objectPosition={tile.imagePosition}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/10 transition-colors duration-300 rounded-full" />
              </div>
            </div>

            {/* Label slides up on hover */}
            <div className="mt-4 transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
              <span className="block text-xs tracking-[0.2em] uppercase font-medium text-[#0B0B0B] group-hover:text-[#5A1424] transition-colors whitespace-nowrap">
                {tile.label}
              </span>
              <span className="block text-[10px] tracking-[0.14em] text-[#0B0B0B]/50 mt-0.5 font-mono tabular-nums">
                {tile.itemCount}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
