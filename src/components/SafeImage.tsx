import React, { useState } from 'react';

export interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackLabel?: string;
  eager?: boolean;
  objectPosition?: string;
  className?: string;
  draggable?: boolean;
}

/**
 * Reusable <SafeImage> component:
 * - Takes src, alt, width, height
 * - Uses loading="lazy" (or "eager" when explicitly requested for LCP hero), decoding="async"
 * - Provides an onError fallback that renders an ivory gradient block with the product name in elegant type
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width = 800,
  height = 1000,
  fallbackLabel,
  eager = false,
  objectPosition = '50% 18%',
  className = '',
  draggable = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const displayName = fallbackLabel || alt || 'LIVA Couture';

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full bg-gradient-to-br from-[#F7F3EC] via-[#EAE2D3] to-[#DFD3BE] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <div className="w-8 h-[1px] bg-[#B8975A] mb-3" />
        <span className="font-serif-display text-lg sm:text-xl tracking-[0.18em] uppercase text-[#0B0B0B]">
          {displayName}
        </span>
        <span className="text-[10px] tracking-[0.24em] uppercase text-[#5A1424] mt-1">
          LIVA ATELIER ARCHIVE
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      srcSet={`${src} 800w, ${src} 1200w, ${src} 1600w`}
      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 25vw"
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={draggable}
      onError={() => setHasError(true)}
      style={{ objectPosition }}
      className={`transition-transform duration-700 ease-out ${className}`}
    />
  );
};
