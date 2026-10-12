import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, NavCategory } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface HeroCarouselProps {
  onExploreCategory: (category: NavCategory) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onExploreCategory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const activeSlide = HERO_SLIDES[currentIndex];

  // Auto-advance 4-slide fade carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6800);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  // Slow scroll parallax effect (compositor transform only)
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          setParallaxY(y * 0.24);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Subtle Three.js antique gold Zari dust particles in hero atmosphere (lazy-loaded)
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let disposed = false;
    let animationFrameId = 0;
    let cleanupFn: (() => void) | undefined;

    import('three')
      .then((THREE) => {
        if (disposed || !container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          55,
          container.clientWidth / Math.max(container.clientHeight, 1),
          0.1,
          100
        );
        camera.position.z = 12;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const canvasEl = renderer.domElement;
        const handleContextLost = (e: Event) => {
          e.preventDefault();
          cancelAnimationFrame(animationFrameId);
        };
        canvasEl.addEventListener('webglcontextlost', handleContextLost, false);

        const particleCount = 75;
        const positions = new Float32Array(particleCount * 3);
        const speeds = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 26;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
          speeds[i] = 0.003 + Math.random() * 0.006;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
          color: new THREE.Color('#B8975A'),
          size: 0.075,
          transparent: true,
          opacity: 0.45,
          blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let mouseX = 0;
        let mouseY = 0;
        const onPointerMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
        };
        window.addEventListener('mousemove', onPointerMove, { passive: true });

        const handleResize = () => {
          if (!container) return;
          const w = container.clientWidth;
          const h = Math.max(container.clientHeight, 1);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
          const posAttr = geometry.getAttribute('position');
          for (let i = 0; i < particleCount; i++) {
            let y = posAttr.getY(i);
            y += speeds[i];
            if (y > 7) y = -7;
            posAttr.setY(i, y);
          }
          posAttr.needsUpdate = true;

          points.rotation.y += (mouseX - points.rotation.y) * 0.03;
          points.rotation.x += (-mouseY - points.rotation.x) * 0.03;

          renderer.render(scene, camera);
        };
        animate();

        cleanupFn = () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('mousemove', onPointerMove);
          window.removeEventListener('resize', handleResize);
          canvasEl.removeEventListener('webglcontextlost', handleContextLost);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      })
      .catch(() => {
        // Fallback silently if WebGL is unavailable
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      cleanupFn?.();
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      aria-label="Signature Collection Hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[calc(100vh-108px)] min-h-[620px] max-h-[1080px] overflow-hidden bg-[#0B0B0B] select-none"
    >
      {/* Parallax & Ken Burns 4-Slide Fade Container */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: `translate3d(0, ${parallaxY}px, 0)`,
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.085 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 7.5, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <SafeImage
              src={activeSlide.image}
              alt={activeSlide.alt}
              fallbackLabel={activeSlide.title}
              width={1600}
              height={900}
              eager
              objectPosition="50% 22%"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured Contrast Scrim for WCAG AA Legibility across all frames */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/35 to-[#0B0B0B]/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0B0B0B]/55"
          aria-hidden="true"
        />
      </div>

      {/* Subtle Three.js WebGL Zari Dust Atmosphere Layer */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* Semantic DOM Overlay Architecture */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-end pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Edition Kicker */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`edition-${activeSlide.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] tracking-[0.32em] uppercase text-[#B8975A] mb-3"
            >
              {activeSlide.edition}
            </motion.p>
          </AnimatePresence>

          {/* Large "SIGNATURE" Title */}
          <h1
            className="font-serif-display font-light text-[#F7F3EC] tracking-[0.18em] uppercase leading-none mb-2"
            style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.75rem)' }}
          >
            {activeSlide.title}
          </h1>

          {/* "Collection" Subtitle */}
          <p
            className="font-serif-display italic font-light text-[#F7F3EC]/95 tracking-[0.06em] mb-5"
            style={{ fontSize: 'clamp(1.65rem, 3.2vw, 2.75rem)' }}
          >
            {activeSlide.subtitle}
          </p>

          {/* Editorial Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeSlide.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#F7F3EC]/85 max-w-xl font-light leading-relaxed mb-8"
              style={{ textWrap: 'balance' }}
            >
              {activeSlide.description}
            </motion.p>
          </AnimatePresence>

          {/* Outlined "SHOP NOW" Button */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onExploreCategory(activeSlide.targetCategory)}
              className="px-9 py-3.5 border border-[#F7F3EC] text-[#F7F3EC] text-xs tracking-[0.28em] uppercase font-medium bg-transparent hover:bg-[#F7F3EC] hover:text-[#0B0B0B] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]"
            >
              {activeSlide.ctaLabel}
            </button>
          </div>
        </div>

        {/* Bottom Controls Bar: Garment Callout, 4-Slide Dot Indicators, Prev/Next */}
        <div className="mt-10 pt-5 border-t border-[#F7F3EC]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Featured Garment Note */}
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#F7F3EC]/70 whitespace-nowrap">
            <span>{activeSlide.garmentNote}</span>
          </div>

          {/* Center: 4 Dot Indicators */}
          <div
            className="flex items-center gap-3"
            role="tablist"
            aria-label="Hero slides"
          >
            {HERO_SLIDES.map((slide, index) => {
              const isCurrent = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`View slide ${index + 1}: ${slide.edition}`}
                  onClick={() => setCurrentIndex(index)}
                  className="group py-2 px-1 cursor-pointer focus-visible:outline-none"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-7 h-2 bg-[#B8975A]'
                        : 'w-2 h-2 bg-[#F7F3EC]/45 group-hover:bg-[#F7F3EC]/80'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Slide Counter + Prev/Next Buttons */}
          <div className="flex items-center gap-3 text-[#F7F3EC]">
            <span className="font-mono tabular-nums text-xs tracking-[0.18em] text-[#F7F3EC]/75">
              0{currentIndex + 1} / 0{HERO_SLIDES.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 border border-[#F7F3EC]/25 hover:border-[#B8975A] hover:text-[#B8975A] flex items-center justify-center transition-colors duration-150 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 border border-[#F7F3EC]/25 hover:border-[#B8975A] hover:text-[#B8975A] flex items-center justify-center transition-colors duration-150 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
