/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import {
  ALL_PRODUCTS,
  CurrencyCode,
  FORMALS_PRODUCTS,
  LUXURY_FORMALS_PRODUCTS,
  NavCategory,
  ProductItem,
} from './data/products';
import { PageLoader } from './components/PageLoader';
import { UxEnhancements } from './components/UxEnhancements';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { ShopByCategorySection } from './components/ShopByCategorySection';
import { Footer } from './components/Footer';
import { FloatingUtilities } from './components/FloatingUtilities';
import {
  AtelierPortalModal,
  CartDrawer,
  CartItem,
  QuickViewModal,
  SearchModal,
} from './components/ModalsAndDrawers';

// Code-split below-the-fold sections & Three.js scenes for optimal Lighthouse performance
const StyleDiariesSection = lazy(() =>
  import('./components/StyleDiariesSection').then((m) => ({
    default: m.StyleDiariesSection,
  }))
);
const ProductCarouselSection = lazy(() =>
  import('./components/ProductCarouselSection').then((m) => ({
    default: m.ProductCarouselSection,
  }))
);
const CollectionSection = lazy(() =>
  import('./components/CollectionSection').then((m) => ({
    default: m.CollectionSection,
  }))
);
const KageStorySection = lazy(() =>
  import('./components/KageStorySection').then((m) => ({
    default: m.KageStorySection,
  }))
);
const ThreeAtelierSection = lazy(() =>
  import('./components/ThreeAtelierSection').then((m) => ({
    default: m.ThreeAtelierSection,
  }))
);
const CustomerReviewsSection = lazy(() =>
  import('./components/CustomerReviewsSection').then((m) => ({
    default: m.CustomerReviewsSection,
  }))
);
const ProductDetailPage = lazy(() =>
  import('./components/ProductDetailPage').then((m) => ({
    default: m.ProductDetailPage,
  }))
);

function parseProductSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/products\/([a-z0-9-]+)\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<NavCategory>('HOME');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');

  // Route state for /products/:slug
  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(
    () =>
      typeof window !== 'undefined'
        ? parseProductSlugFromPath(window.location.pathname)
        : null
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: FORMALS_PRODUCTS[0],
      size: 'S',
      quantity: 1,
    },
  ]);

  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(
    null
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [portalModal, setPortalModal] = useState<{
    open: boolean;
    tab: 'login' | 'appointment';
  }>({ open: false, tab: 'login' });

  const lenisRef = useRef<Lenis | null>(null);

  // Sync browser back/forward navigation for /products/:slug
  useEffect(() => {
    const onPopState = () => {
      setCurrentProductSlug(parseProductSlugFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateToProductSlug = (slug: string | null) => {
    const clean = slug ? slug.toLowerCase().replace(/[^a-z0-9-]/g, '') : null;
    setCurrentProductSlug(clean);
    if (typeof window !== 'undefined') {
      const nextUrl = clean ? `/products/${clean}` : '/';
      if (window.location.pathname !== nextUrl) {
        window.history.pushState({}, '', nextUrl);
      }
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeRouteProduct = useMemo(() => {
    if (!currentProductSlug) return null;
    return (
      ALL_PRODUCTS.find(
        (p) => p.slug.toLowerCase() === currentProductSlug.toLowerCase()
      ) || ALL_PRODUCTS[0]
    );
  }, [currentProductSlug]);

  // Dynamic document title & meta synchronization per route
  useEffect(() => {
    if (activeRouteProduct) {
      document.title = `${activeRouteProduct.name} — ${activeRouteProduct.subtitle} | LIVA Couture`;
    } else {
      document.title = 'LIVA — Luxury Pakistani Formal & Bridal Couture';
    }
  }, [activeRouteProduct]);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToElement = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -96 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: NavCategory) => {
    setActiveCategory(category);
    if (currentProductSlug) {
      navigateToProductSlug(null);
      window.setTimeout(() => {
        if (category === 'ABOUT') {
          scrollToElement('#liva-atelier');
        } else if (category === 'FORMALS') {
          scrollToElement('#liva-formals-carousel');
        } else if (category === 'LUXURY FORMALS') {
          scrollToElement('#liva-luxury-formals-carousel');
        } else if (category !== 'HOME') {
          scrollToElement('#liva-collections');
        }
      }, 120);
      return;
    }

    if (category === 'ABOUT') {
      scrollToElement('#liva-atelier');
    } else if (category === 'FORMALS') {
      scrollToElement('#liva-formals-carousel');
    } else if (category === 'LUXURY FORMALS') {
      scrollToElement('#liva-luxury-formals-carousel');
    } else if (category === 'HOME') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      scrollToElement('#liva-collections');
    }
  };

  const handleExploreFromHero = (category: NavCategory) => {
    setActiveCategory(category);
    scrollToElement('#liva-shop-by-category');
  };

  const handleAddToCart = (
    product: ProductItem,
    size: string = 'S',
    customNotes?: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
          customNotes: customNotes || updated[existingIndex].customNotes,
        };
        return updated;
      }
      return [...prev, { product, size, quantity: 1, customNotes }];
    });
  };

  const handleUpdateQty = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#0B0B0B] flex flex-col">
      {/* Page-Load Reveal Animation */}
      <PageLoader />

      {/* Scroll Progress Bar, Subtle Film Grain Overlay & Magnetic Cursor */}
      <UxEnhancements />

      {/* Sticky Shrinking Header & Announcement Bar */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenLogin={() => setPortalModal({ open: true, tab: 'login' })}
        onOpenAppointment={() =>
          setPortalModal({ open: true, tab: 'appointment' })
        }
        onScrollToReviews={() => {
          if (currentProductSlug) {
            navigateToProductSlug(null);
            window.setTimeout(() => scrollToElement('#liva-reviews'), 150);
          } else {
            scrollToElement('#liva-reviews');
          }
        }}
        currency={currency}
        onChangeCurrency={setCurrency}
      />

      {/* Main Content with Animated Route Transitions (/ vs /products/:slug) */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeRouteProduct ? (
            <motion.div
              key={`product-route-${activeRouteProduct.slug}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <Suspense
                fallback={
                  <div className="min-h-[70vh] flex items-center justify-center text-xs tracking-[0.26em] uppercase text-[#5A1424]">
                    Loading LIVA Ensemble Archive...
                  </div>
                }
              >
                <ProductDetailPage
                  product={activeRouteProduct}
                  currency={currency}
                  onBackToHome={() => navigateToProductSlug(null)}
                  onSelectProductSlug={(slug) => navigateToProductSlug(slug)}
                  onAddToCart={handleAddToCart}
                  onOpenAppointment={() =>
                    setPortalModal({ open: true, tab: 'appointment' })
                  }
                />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="home-route"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Full-Viewport Hero with 4-Slide Fade, Ken Burns Zoom & Slow Parallax */}
              <HeroCarousel onExploreCategory={handleExploreFromHero} />

              {/* 1. SHOP BY CATEGORY: 8 Circular Image Tiles */}
              <ShopByCategorySection onSelectCategory={handleSelectCategory} />

              <Suspense
                fallback={
                  <div className="py-24 text-center text-xs tracking-[0.24em] uppercase text-[#0B0B0B]/50">
                    Loading Curated Couture Sections...
                  </div>
                }
              >
                {/* 2. STYLE DIARIES: Horizontal Drag-Scroll Lookbook Gallery with Custom "DRAG" Cursor */}
                <StyleDiariesSection
                  onSelectProductSlug={(slug) => navigateToProductSlug(slug)}
                />

                {/* 3A. FORMALS: Horizontal Product Carousel (4 desktop / 1.2 mobile) */}
                <ProductCarouselSection
                  id="liva-formals-carousel"
                  sectionIndexLabel="01. SIGNATURE EVENINGWEAR"
                  title="Formals"
                  subtitle="Hand-embellished raw silk kalidars, tissue ensembles, and chikankari formals tailored for festive ceremonies."
                  products={FORMALS_PRODUCTS}
                  currency={currency}
                  onSelectProduct={(product) =>
                    navigateToProductSlug(product.slug)
                  }
                  onQuickAdd={(product) =>
                    handleAddToCart(product, product.sizes[1] || 'S')
                  }
                />

                {/* 3B. LUXURY FORMALS: Horizontal Product Carousel (4 desktop / 1.2 mobile) */}
                <ProductCarouselSection
                  id="liva-luxury-formals-carousel"
                  sectionIndexLabel="02. HEIRLOOM COUTURE ARCHIVE"
                  title="Luxury Formals"
                  subtitle="Museum-grade zardozi, naqshi, and dabka handwork on pure mulberry silk organza and 9000 micro-velvet."
                  products={LUXURY_FORMALS_PRODUCTS}
                  currency={currency}
                  onSelectProduct={(product) =>
                    navigateToProductSlug(product.slug)
                  }
                  onQuickAdd={(product) =>
                    handleAddToCart(product, product.sizes[1] || 'S')
                  }
                />

                {/* Interactive Filterable Complete Collection Grid */}
                <CollectionSection
                  activeCategory={activeCategory}
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                  currency={currency}
                  onSelectProduct={(product) =>
                    navigateToProductSlug(product.slug)
                  }
                  onQuickView={(product) => setQuickViewProduct(product)}
                  onAddToCart={(product, size) => handleAddToCart(product, size)}
                />

                {/* ThreeUI KageLandingPage Cinematic Scroll "Story" Section (Brand Story / Our Craft) */}
                <KageStorySection
                  onOpenAppointment={() =>
                    setPortalModal({ open: true, tab: 'appointment' })
                  }
                />

                {/* Interactive Three.js 3D Couture Textile & Zardozi Drape Studio */}
                <ThreeAtelierSection
                  onOpenAppointment={() =>
                    setPortalModal({ open: true, tab: 'appointment' })
                  }
                />

                {/* 4. CUSTOMER REVIEWS: 4.9/5 Store Rating & Horizontally Scrollable Cards */}
                <CustomerReviewsSection
                  currency={currency}
                  onSelectProductSlug={(slug) => navigateToProductSlug(slug)}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 5. FOOTER (Black) */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onScrollToReviews={() => {
          if (currentProductSlug) {
            navigateToProductSlug(null);
            window.setTimeout(() => scrollToElement('#liva-reviews'), 150);
          } else {
            scrollToElement('#liva-reviews');
          }
        }}
        onOpenAppointment={() =>
          setPortalModal({ open: true, tab: 'appointment' })
        }
      />

      {/* 6. Floating LiquidMetalButton ("Book a Private Appointment"), WhatsApp "Chat with Us" & PKR Currency Selector */}
      <FloatingUtilities
        currency={currency}
        onChangeCurrency={setCurrency}
        onOpenAppointment={() =>
          setPortalModal({ open: true, tab: 'appointment' })
        }
      />

      {/* Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        currency={currency}
        onSelectProduct={(product) => {
          setSearchOpen(false);
          navigateToProductSlug(product.slug);
        }}
      />

      <AtelierPortalModal
        isOpen={portalModal.open}
        initialTab={portalModal.tab}
        onClose={() => setPortalModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
