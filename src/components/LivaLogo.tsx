import React from 'react';

interface LivaLogoProps {
  className?: string;
  compact?: boolean;
  tone?: 'dark' | 'light';
}

export const LivaLogo: React.FC<LivaLogoProps> = ({
  className = '',
  compact = false,
  tone = 'dark',
}) => {
  const primaryColor = tone === 'dark' ? '#0B0B0B' : '#F7F3EC';
  const accentColor = '#B8975A';

  return (
    <div
      className={`inline-flex flex-col items-center select-none whitespace-nowrap shrink-0 ${className}`}
      aria-label="LIVA — Luxury Pakistani Formal & Bridal Wear"
    >
      {/* Architectural Monogram Crest + Wordmark SVG */}
      <svg
        viewBox={compact ? '0 0 180 42' : '0 0 200 68'}
        className={
          compact
            ? 'h-7 md:h-8 w-auto transition-transform duration-300'
            : 'h-11 md:h-14 w-auto transition-transform duration-300'
        }
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {!compact && (
          <g transform="translate(100, 14)">
            {/* Outer Octagonal Mughal Geometric Frame */}
            <path
              d="M0 -11 L8 -8 L11 0 L8 8 L0 11 L-8 8 L-11 0 L-8 -8 Z"
              stroke={accentColor}
              strokeWidth="0.9"
            />
            {/* Inner Diamond Filigree */}
            <path
              d="M0 -7 L7 0 L0 7 L-7 0 Z"
              stroke={primaryColor}
              strokeWidth="0.65"
              strokeOpacity="0.6"
            />
            {/* Monogram L + V Interlock */}
            <path
              d="M-3 -3.5 V3.5 H2.5 M-1.5 -3.5 L1.5 3.5 L4.5 -3.5"
              stroke={accentColor}
              strokeWidth="1.1"
              strokeLinecap="square"
            />
          </g>
        )}

        {/* Wordmark: L I V A in bespoke high-contrast serif paths */}
        <g transform={compact ? 'translate(0, 0)' : 'translate(10, 24)'}>
          {/* Letter L */}
          <path
            d="M18 10 V32 H33 V30.2 H20.4 V10 H18 Z"
            fill={primaryColor}
          />
          <line x1="16" y1="10" x2="22" y2="10" stroke={primaryColor} strokeWidth="1.2" />
          <line x1="16" y1="32" x2="33" y2="32" stroke={primaryColor} strokeWidth="1.2" />

          {/* Letter I */}
          <path
            d="M58 10 V32 H60.4 V10 H58 Z"
            fill={primaryColor}
          />
          <line x1="55.5" y1="10" x2="62.9" y2="10" stroke={primaryColor} strokeWidth="1.2" />
          <line x1="55.5" y1="32" x2="62.9" y2="32" stroke={primaryColor} strokeWidth="1.2" />

          {/* Subtle Antique Gold Diamond Divider */}
          <path d="M84 19 L86.2 21.2 L84 23.4 L81.8 21.2 Z" fill={accentColor} />

          {/* Letter V */}
          <path
            d="M104 10 L112.5 32 H114.2 L122.7 10 H120.5 L113.6 28.4 L106.5 10 H104 Z"
            fill={primaryColor}
          />
          <line x1="102" y1="10" x2="108.5" y2="10" stroke={primaryColor} strokeWidth="1.2" />
          <line x1="118.5" y1="10" x2="124.5" y2="10" stroke={primaryColor} strokeWidth="1.2" />

          {/* Letter A */}
          <path
            d="M153.5 10 L144.8 32 H147 L149.8 24.8 H158.8 L161.6 32 H164 L155.2 10 H153.5 Z M150.5 23 L154.3 13.2 L158.1 23 H150.5 Z"
            fill={primaryColor}
          />
          {/* Antique Gold Crossbar Accent on A */}
          <line x1="150" y1="23.5" x2="158.6" y2="23.5" stroke={accentColor} strokeWidth="1.2" />
          <line x1="143" y1="32" x2="149" y2="32" stroke={primaryColor} strokeWidth="1.2" />
          <line x1="159.5" y1="32" x2="165.5" y2="32" stroke={primaryColor} strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
};
