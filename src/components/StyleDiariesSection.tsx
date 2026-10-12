import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { STYLE_DIARIES, StyleDiaryCard } from '../data/products';
import { CoutureImage } from './CoutureImage';
import { SplitHeading } from './UxEnhancements';

interface StyleDiariesSectionProps {
  onSelectProductSlug: (slug: string) => void;
}

export const StyleDiariesSection: React.FC<StyleDiariesSectionProps> = ({
  onSelectProductSlug,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setDragStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollStartLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragStartX) * 1.4;
    if (Math.abs(walk) > 6) {
      setHasDragged(true);
    }
    trackRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleInspectLook = (diary: StyleDiaryCard) => {
    if (hasDragged) return;
    onSelectProductSlug(diary.featuredProductSlug);
  };

  return (
    <section
      id="liva-style-diaries"
      aria-labelledby="style-diaries-heading"
      className="py-20 md:py-28 bg-[#FAF7F2] border-b border-[#0B0B0B]/10 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#5A1424] mb-2">
              EDITORIAL CAMPAIGN ARCHIVE
            </p>
            <SplitHeading
              id="style-diaries-heading"
              text="Style Diaries"
              className="font-serif-display font-normal text-[#0B0B0B] tracking-[0.12em] uppercase"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)' }}
            />
          </div>

          <p className="text-xs sm:text-sm text-[#0B0B0B]/70 max-w-md leading-relaxed">
            Drag horizontally through our seasonal lookbook lensed across
            neutral grey plaster studios, ivory linen drapes, and heritage
            sandstone courtyards.
          </p>
        </div>
      </div>

      {/* Horizontal Drag-Scroll Gallery Wrapper with Custom "DRAG" Cursor */}
      <div
        className="relative"
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => {
          setCursorVisible(false);
          stopDragging();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
      >
        {/* Custom Floating "DRAG" Cursor */}
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${cursorPos.x - 42}px, ${cursorPos.y - 42}px, 0) scale(${
              cursorVisible ? (isDragging ? 0.88 : 1) : 0
            })`,
          }}
          className="hidden md:flex pointer-events-none absolute top-0 left-0 z-30 w-[84px] h-[84px] rounded-full bg-[#0B0B0B]/90 text-[#F7F3EC] border border-[#B8975A] backdrop-blur-sm items-center justify-center transition-transform duration-150 ease-out shadow-lg"
        >
          <span className="text-[10px] tracking-[0.28em] uppercase font-medium text-[#F7F3EC]">
            DRAG
          </span>
        </div>

        {/* Scrollable Editorial Track */}
        <div
          ref={trackRef}
          className={`flex gap-6 sm:gap-8 overflow-x-auto px-4 sm:px-8 lg:px-12 pb-4 no-scrollbar ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab md:cursor-none'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {STYLE_DIARIES.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[82vw] sm:w-[360px] lg:w-[400px] shrink-0 bg-[#F7F3EC] border border-[#0B0B0B]/10 flex flex-col justify-between group"
            >
              <div>
                {/* 4:5 Portrait Lookbook Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EBE5DA]">
                  <CoutureImage
                    src={card.image}
                    alt={`${card.title} — ${card.muse}`}
                    fallbackLabel={card.featuredProductName}
                    width={800}
                    height={1000}
                    draggable={false}
                    objectPosition={card.imagePosition}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#F7F3EC]">
                    <div>
                      <p className="text-[10px] tracking-[0.24em] uppercase text-[#B8975A]">
                        {card.location}
                      </p>
                      <p className="font-serif-display italic text-lg">
                        {card.muse}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editorial Copy */}
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.24em] uppercase text-[#5A1424] mb-1.5">
                    {card.chapter}
                  </p>
                  <h3 className="font-serif-display text-2xl text-[#0B0B0B] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#0B0B0B]/70 leading-relaxed">
                    {card.caption}
                  </p>
                </div>
              </div>

              {/* Shop Look Footer */}
              <div className="px-6 py-4 border-t border-[#0B0B0B]/8 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/60">
                  Wearing:{' '}
                  <strong className="text-[#0B0B0B] font-medium">
                    {card.featuredProductName}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => handleInspectLook(card)}
                  className="inline-flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-[#5A1424] hover:text-[#0B0B0B] font-medium transition-colors cursor-pointer"
                >
                  <span>View Piece</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
