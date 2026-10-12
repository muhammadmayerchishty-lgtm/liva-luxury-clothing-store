import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

/**
 * 1. Top Scroll Progress Bar + Subtle Editorial Film Grain Overlay
 * + Custom Magnetic Pointer Follower
 */
export const UxEnhancements: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
    hoveringInteractive: false,
    visible: false,
  });

  useEffect(() => {
    let rafId = 0;
    const updateScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, pct)));
      });
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isCoarse) return;

    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'button, a, select, input, [role="button"], [role="tab"]'
      );
      setCursor({
        x: e.clientX,
        y: e.clientY,
        hoveringInteractive: isInteractive,
        visible: true,
      });
    };

    const onMouseLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[95] pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#B8975A] transition-transform duration-75 origin-left"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* Subtle Editorial Film Grain Overlay (Pure SVG Filter, zero data: URLs) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] w-full h-full opacity-[0.028] mix-blend-multiply"
      >
        <filter id="liva-editorial-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#liva-editorial-grain)" />
      </svg>

      {/* Custom Magnetic Halo Cursor (Desktop only) */}
      {cursor.visible && (
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          }}
          className="hidden lg:block fixed top-0 left-0 z-[92] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        >
          <div
            className={`rounded-full border transition-all duration-200 ${
              cursor.hoveringInteractive
                ? 'w-11 h-11 border-[#B8975A] bg-[#B8975A]/15 scale-110'
                : 'w-5 h-5 border-[#B8975A]/60 bg-transparent'
            }`}
          />
        </div>
      )}
    </>
  );
};

/**
 * 2. Split-Text Heading Reveal Component
 */
interface SplitHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  text,
  as: Tag = 'h2',
  id,
  className = '',
  style,
}) => {
  const words = text.split(' ');

  return (
    <Tag id={id} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.28em]">
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`} className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
};
