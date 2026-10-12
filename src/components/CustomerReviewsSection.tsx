import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import {
  CurrencyCode,
  CUSTOMER_REVIEWS,
  formatPrice,
  REVIEWS_LIFESTYLE_IMAGE,
} from '../data/products';
import { CoutureImage } from './CoutureImage';
import { SplitHeading } from './UxEnhancements';

interface CustomerReviewsSectionProps {
  currency: CurrencyCode;
  onSelectProductSlug: (slug: string) => void;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  currency,
  onSelectProductSlug,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const amount = dir === 'next' ? 400 : -400;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section
      id="liva-reviews"
      aria-labelledby="customer-reviews-heading"
      className="py-20 md:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-b border-[#0B0B0B]/10"
    >
      {/* Header Row with 4.9/5 Store Rating & Scroll Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#5A1424] mb-2">
            PATRON TESTIMONIALS
          </p>
          <SplitHeading
            id="customer-reviews-heading"
            text="Customer Reviews"
            className="font-serif-display font-normal text-[#0B0B0B] tracking-[0.12em] uppercase"
            style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)' }}
          />
        </div>

        {/* Store Rating Summary + Scroll Arrows */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3.5 border border-[#0B0B0B]/12 bg-[#FAF7F2] px-5 py-3">
            <span className="font-serif-display text-3xl font-semibold text-[#0B0B0B] font-mono tabular-nums">
              4.9/5
            </span>
            <div className="h-7 w-[1px] bg-[#0B0B0B]/15" />
            <div>
              <div
                className="text-[#B8975A] tracking-[0.18em] text-sm"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#0B0B0B]/60 font-mono tabular-nums">
                VERIFIED STORE RATING (348+ REVIEWS)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('prev')}
              className="w-10 h-10 border border-[#0B0B0B]/20 hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F7F3EC] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('next')}
              className="w-10 h-10 border border-[#0B0B0B]/20 hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F7F3EC] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll reviews right"
            >
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Layout: Left Bridal Salon Lifestyle Image + Right Horizontally Scrollable Review Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Lifestyle Couture Salon Image (4 Cols on Desktop) */}
        <div className="lg:col-span-4 relative aspect-[4/5] lg:aspect-auto min-h-[380px] overflow-hidden border border-[#0B0B0B]/10 bg-[#EBE5DA]">
          <CoutureImage
            src={REVIEWS_LIFESTYLE_IMAGE}
            alt="Pakistani bride admiring her ivory and gold LIVA couture ensemble in a gilded salon mirror"
            fallbackLabel="LIVA Bridal Salon"
            width={800}
            height={1000}
            objectPosition="50% 20%"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-[#F7F3EC]">
            <p className="text-[10px] tracking-[0.26em] uppercase text-[#B8975A]">
              LAHORE PRIVÉ SALON · FITTING ARCHIVE
            </p>
            <p className="font-serif-display italic text-xl mt-1">
              “Every stitch is tailored to your silhouette.”
            </p>
          </div>
        </div>

        {/* Horizontally Scrollable Review Cards (8 Cols on Desktop) */}
        <div className="lg:col-span-8 flex items-stretch overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CUSTOMER_REVIEWS.map((review, index) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-[84vw] sm:w-[340px] md:w-[360px] shrink-0 snap-start border border-[#0B0B0B]/10 bg-[#FAF7F2] p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: 5 Stars & Date */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="text-[#B8975A] tracking-[0.2em] text-sm"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      ★★★★★
                    </span>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#0B0B0B]/50">
                      {review.date}
                    </span>
                  </div>

                  {/* Reviewer Name & Verified Purchase */}
                  <div className="flex items-center flex-wrap gap-2 mb-4">
                    <span className="text-xs tracking-[0.18em] uppercase font-semibold text-[#0B0B0B]">
                      {review.reviewerName}
                    </span>
                    <span className="text-[#0B0B0B]/30" aria-hidden="true">
                      ·
                    </span>
                    {review.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#5A1424] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.8]" />
                        <span>Verified Purchase</span>
                      </span>
                    )}
                  </div>

                  {/* Review Title */}
                  <h3 className="font-serif-display text-xl font-medium text-[#0B0B0B] mb-2.5 leading-snug">
                    “{review.title}”
                  </h3>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#0B0B0B]/75 leading-relaxed mb-6">
                    {review.text}
                  </p>
                </div>

                {/* Reviewed Product Thumbnail Footer */}
                <button
                  type="button"
                  onClick={() => onSelectProductSlug(review.productSlug)}
                  className="pt-4 border-t border-[#0B0B0B]/10 flex items-center gap-3.5 text-left group cursor-pointer w-full"
                >
                  <div className="w-12 h-15 bg-[#EBE5DA] border border-[#0B0B0B]/10 overflow-hidden shrink-0">
                    <CoutureImage
                      src={review.productThumbnail}
                      alt={review.productName}
                      fallbackLabel={review.productName}
                      width={96}
                      height={120}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#0B0B0B]/50">
                      Reviewed Ensemble
                    </p>
                    <p className="font-serif-display text-base font-medium text-[#0B0B0B] group-hover:text-[#5A1424] transition-colors truncate">
                      {review.productName}
                    </p>
                    <p className="text-xs font-mono tabular-nums text-[#0B0B0B]/70 mt-0.5">
                      {formatPrice(review.productPricePKR, currency)}
                    </p>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
