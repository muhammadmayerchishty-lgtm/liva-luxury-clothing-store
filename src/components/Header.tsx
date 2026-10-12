import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, ShoppingBag, User, Menu, X, Calendar } from 'lucide-react';
import { LivaLogo } from './LivaLogo';
import {
  CurrencyCode,
  CURRENCIES,
  NAV_ITEMS,
  NavCategory,
} from '../data/catalog';

interface HeaderProps {
  activeCategory: NavCategory;
  onSelectCategory: (category: NavCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  onOpenAppointment: () => void;
  onScrollToReviews: () => void;
  currency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenLogin,
  onOpenAppointment,
  onScrollToReviews,
  currency,
  onChangeCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (item: NavCategory) => {
    onSelectCategory(item);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        {/* 1. Black Announcement Bar: "REVIEWS 4.9 ★★★★★" */}
        <div className="bg-[#0B0B0B] text-[#F7F3EC] border-b border-[#B8975A]/20 px-4 md:px-10 h-9 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase">
          <div className="hidden md:flex items-center gap-4 text-[#F7F3EC]/70 whitespace-nowrap shrink-0">
            <span>WORLDWIDE COUTURE DISPATCH</span>
          </div>

          <button
            type="button"
            onClick={onScrollToReviews}
            className="mx-auto md:mx-0 flex items-center gap-2 text-[#F7F3EC] hover:text-[#B8975A] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8975A]"
            title="Read verified Atelier client reviews"
          >
            <span className="font-medium">REVIEWS 4.9</span>
            <span className="text-[#B8975A] tracking-[0.15em]" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
          </button>

          {/* Currency selector */}
          <div className="hidden sm:flex items-center gap-2 whitespace-nowrap shrink-0">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code, idx) => (
              <React.Fragment key={code}>
                {idx > 0 && (
                  <span className="text-[#F7F3EC]/25" aria-hidden="true">
                    /
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onChangeCurrency(code)}
                  className={`cursor-pointer transition-colors duration-150 ${
                    currency === code
                      ? 'text-[#B8975A] font-medium'
                      : 'text-[#F7F3EC]/65 hover:text-[#F7F3EC]'
                  }`}
                >
                  {code}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 2. Sticky Header that shrinks on scroll with a blur background */}
        <header
          className={`w-full transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-[#F7F3EC]/88 backdrop-blur-md border-[#0B0B0B]/10 shadow-sm'
              : 'bg-[#F7F3EC]/96 backdrop-blur-sm border-[#0B0B0B]/8'
          }`}
        >
          {/* Main Logo & Actions Bar */}
          <div
            className={`max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-3 items-center transition-all duration-300 ${
              isScrolled ? 'py-2.5' : 'py-4 md:py-5'
            }`}
          >
            {/* Left Zone: Mobile Hamburger / Desktop Bridal Consultation Trigger */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#0B0B0B] hover:text-[#5A1424] transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#0B0B0B]/80 hover:text-[#5A1424] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B8975A] stroke-[1.5]" />
                <span>Bridal Atelier</span>
              </button>
            </div>

            {/* Center Zone: Centered LIVA Logo (Clean Monogram + Wordmark in SVG) */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleNavClick('HOME')}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8975A]"
                aria-label="LIVA Home"
              >
                <LivaLogo compact={isScrolled} tone="dark" />
              </button>
            </div>

            {/* Right Zone: Login / Search / Cart */}
            <div className="flex items-center justify-end gap-3 sm:gap-6">
              <button
                type="button"
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[#0B0B0B] hover:text-[#5A1424] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5"
                aria-label="Login to Client Atelier"
              >
                <User className="w-4 h-4 stroke-[1.5]" />
                <span className="hidden md:inline">LOGIN</span>
              </button>

              <button
                type="button"
                onClick={onOpenSearch}
                className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[#0B0B0B] hover:text-[#5A1424] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5"
                aria-label="Search collections"
              >
                <Search className="w-4 h-4 stroke-[1.5]" />
                <span className="hidden md:inline">SEARCH</span>
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[#0B0B0B] hover:text-[#5A1424] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                <span className="hidden md:inline">CART</span>
                <span className="font-mono tabular-nums text-[11px] text-[#5A1424] font-medium">
                  ({cartCount})
                </span>
              </button>
            </div>
          </div>

          {/* 3. Desktop Navigation Bar: Wide letter-spaced uppercase */}
          <nav
            aria-label="Primary Couture Navigation"
            className={`hidden lg:flex items-center justify-center border-t border-[#0B0B0B]/6 transition-all duration-300 ${
              isScrolled ? 'py-2' : 'py-3'
            }`}
          >
            <ul className="flex items-center justify-center gap-5 xl:gap-7 px-6 max-w-[1440px] mx-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = activeCategory === item;
                const isSale = item === 'SALE';
                return (
                  <li key={item} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleNavClick(item)}
                      className={`relative py-1 text-[11px] tracking-[0.22em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'text-[#5A1424] font-medium'
                          : isSale
                          ? 'text-[#5A1424]/85 hover:text-[#5A1424]'
                          : 'text-[#0B0B0B]/80 hover:text-[#0B0B0B]'
                      }`}
                    >
                      {item}
                      <span
                        className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#B8975A] transition-transform duration-200 origin-center ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
      </div>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="liva-mobile-menu"
            initial={{ opacity: 0, y: '-4%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-4%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#0B0B0B] text-[#F7F3EC] flex flex-col justify-between overflow-y-auto"
            data-lenis-prevent
          >
            {/* Mobile Menu Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F7F3EC]/10">
              <LivaLogo compact tone="light" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 inline-flex items-center justify-center text-[#F7F3EC] hover:text-[#B8975A] transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Mobile Nav Links with Staggered Reveal */}
            <div className="px-8 py-8 flex-1 flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8975A] mb-6">
                COUTURE &amp; BRIDAL ARCHIVE
              </p>
              <ul className="space-y-3.5">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeCategory === item;
                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.03 * index,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick(item)}
                        className={`w-full text-left font-serif-display text-2xl sm:text-3xl tracking-[0.14em] uppercase py-1 flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'text-[#B8975A] italic'
                            : 'text-[#F7F3EC] hover:text-[#B8975A]'
                        }`}
                      >
                        <span>{item}</span>
                        <span className="text-xs font-sans tracking-[0.2em] text-[#F7F3EC]/35 tabular-nums">
                          0{index + 1}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile Menu Footer Actions & Currency */}
            <div className="px-8 py-6 border-t border-[#F7F3EC]/10 bg-[#0B0B0B] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.22em] uppercase text-[#F7F3EC]/60">
                  CURRENCY
                </span>
                <div className="flex items-center gap-3">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => onChangeCurrency(code)}
                      className={`text-xs tracking-[0.18em] px-2 py-1 cursor-pointer transition-colors ${
                        currency === code
                          ? 'text-[#0B0B0B] bg-[#B8975A] font-medium'
                          : 'text-[#F7F3EC]/70 hover:text-[#F7F3EC]'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAppointment();
                  }}
                  className="py-3 px-4 border border-[#B8975A] text-[#B8975A] text-[11px] tracking-[0.2em] uppercase text-center hover:bg-[#B8975A] hover:text-[#0B0B0B] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Bridal Consultation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="py-3 px-4 border border-[#F7F3EC]/25 text-[#F7F3EC] text-[11px] tracking-[0.2em] uppercase text-center hover:border-[#F7F3EC] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Client Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
