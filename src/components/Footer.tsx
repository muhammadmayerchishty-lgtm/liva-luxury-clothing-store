import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Mail,
  X,
  ExternalLink,
} from 'lucide-react';
import {
  FOOTER_ABOUT_LINKS,
  NAV_ITEMS,
  NavCategory,
} from '../data/products';
import { LivaLogo } from './LivaLogo';

interface FooterProps {
  onSelectCategory: (category: NavCategory) => void;
  onScrollToReviews: () => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToReviews,
  onOpenAppointment,
}) => {
  const [email, setEmail] = useState('');
  const whatsappNumber = (
    (import.meta.env.VITE_WHATSAPP_CONCIERGE as string | undefined) ||
    '+923008445482'
  ).replace(/[^0-9]/g, '');
  const [subscribed, setSubscribed] = useState(false);
  const [activeInfoItem, setActiveInfoItem] = useState<{
    label: string;
    summary: string;
  } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const handleAboutLinkClick = (item: {
    label: string;
    slug: string;
    summary: string;
  }) => {
    if (item.slug === 'reviews') {
      onScrollToReviews();
      return;
    }
    if (item.slug === 'our-story') {
      onSelectCategory('ABOUT');
      return;
    }
    setActiveInfoItem({ label: item.label, summary: item.summary });
  };

  return (
    <>
      <footer className="bg-[#0B0B0B] text-[#F7F3EC] pt-20 pb-24 md:pb-16 border-t border-[#B8975A]/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Top Brand + Newsletter Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#F7F3EC]/12 items-end">
            <div className="lg:col-span-6 flex flex-col items-start">
              <LivaLogo tone="light" />
              <p className="font-serif-display italic text-xl sm:text-2xl text-[#B8975A] mt-4">
                Crafted for the moments that matter.
              </p>
              <p className="text-xs text-[#F7F3EC]/65 leading-relaxed max-w-md mt-2">
                Luxury Pakistani formal, bridal, and pret couture. Individually
                hand-embellished in our Lahore atelier and dispatched worldwide.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="lg:col-span-6">
              <p className="text-[11px] tracking-[0.26em] uppercase text-[#B8975A] mb-2">
                THE LIVA ATELIER JOURNAL
              </p>
              <p className="text-xs text-[#F7F3EC]/70 mb-4">
                Subscribe for private bridal trunk show invitations, new
                seasonal formal releases, and priority atelier previews.
              </p>

              {subscribed ? (
                <div className="p-3.5 border border-[#B8975A]/45 bg-[#B8975A]/10 text-xs text-[#F7F3EC] flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B8975A] shrink-0" />
                  <span>
                    Thank you for subscribing. Your email has been added to the
                    LIVA Private Register.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <label htmlFor="liva-footer-newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="liva-footer-newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-[#141414] border border-[#F7F3EC]/20 px-4 py-3 text-xs text-[#F7F3EC] placeholder:text-[#F7F3EC]/40 focus:outline-none focus:border-[#B8975A]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#B8975A] text-[#0B0B0B] hover:bg-[#F7F3EC] text-xs tracking-[0.24em] uppercase font-medium transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1.8]" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Main 4-Column Footer Grid: Main Menu | About | Contact Us | Social & Bridal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-b border-[#F7F3EC]/12">
            {/* Column 1: Main Menu (3 Cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-[11px] tracking-[0.28em] uppercase text-[#B8975A] font-medium mb-5">
                MAIN MENU
              </h3>
              <ul className="space-y-2.5 text-xs tracking-[0.18em] uppercase text-[#F7F3EC]/75">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => onSelectCategory(item)}
                      className="hover:text-[#B8975A] transition-colors cursor-pointer text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: About (3 Cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-[11px] tracking-[0.28em] uppercase text-[#B8975A] font-medium mb-5">
                ABOUT
              </h3>
              <ul className="space-y-2.5 text-xs tracking-[0.16em] uppercase text-[#F7F3EC]/75">
                {FOOTER_ABOUT_LINKS.map((link) => (
                  <li key={link.slug}>
                    <button
                      type="button"
                      onClick={() => handleAboutLinkClick(link)}
                      className="hover:text-[#B8975A] transition-colors cursor-pointer text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Us (4 Cols) */}
            <div className="lg:col-span-4">
              <h3 className="text-[11px] tracking-[0.28em] uppercase text-[#B8975A] font-medium mb-5">
                CONTACT US
              </h3>
              <ul className="space-y-4 text-xs text-[#F7F3EC]/80 leading-relaxed">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B8975A] shrink-0 mt-0.5 stroke-[1.5]" />
                  <div>
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#F7F3EC]/50 mb-0.5">
                      ATELIER TELEPHONE &amp; WHATSAPP
                    </span>
                    <a
                      href="tel:+924235758920"
                      className="block font-mono hover:text-[#B8975A] transition-colors"
                    >
                      +92 (42) 3575-8920
                    </a>
                    <a
                      href="tel:+923008445482"
                      className="block font-mono hover:text-[#B8975A] transition-colors mt-0.5"
                    >
                      +92 300 8445482 (Bridal Concierge)
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B8975A] shrink-0 mt-0.5 stroke-[1.5]" />
                  <div>
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#F7F3EC]/50 mb-0.5">
                      CLIENT CARE &amp; BESPOKE INQUIRIES
                    </span>
                    <a
                      href="mailto:concierge@livacouture.pk"
                      className="hover:text-[#B8975A] transition-colors"
                    >
                      concierge@livacouture.pk
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B8975A] shrink-0 mt-0.5 stroke-[1.5]" />
                  <div>
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#F7F3EC]/50 mb-0.5">
                      FLAGSHIP STORE ADDRESS
                    </span>
                    <p>
                      Plot 14-C, M.M. Alam Road, Gulberg III,
                      <br />
                      Lahore, 54660, Pakistan
                    </p>
                    <p className="text-[#F7F3EC]/55 mt-1 text-[11px]">
                      Mon – Sat: 11:00 AM – 9:00 PM PKT
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Icons & Private Bridal Consultation (2 Cols) */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-[11px] tracking-[0.28em] uppercase text-[#B8975A] font-medium mb-5">
                  FOLLOW LIVA
                </h3>
                <div className="flex items-center flex-wrap gap-2.5">
                  {[
                    {
                      name: 'Instagram',
                      path: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
                    },
                    {
                      name: 'Facebook',
                      path: 'M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z',
                    },
                    {
                      name: 'Pinterest',
                      path: 'M12 2a10 10 0 0 0-3.54 19.36c-.09-.8-.17-2.01.03-2.87.19-.79 1.22-5.16 1.22-5.16s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.34-4.23-2.96 0-4.69 2.22-4.69 4.51 0 .89.34 1.85.77 2.37.08.1.09.19.07.29-.08.33-.25 1.04-.29 1.18-.05.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.03 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.41 2.57 6.41 6.01 0 3.58-2.26 6.46-5.4 6.46-1.05 0-2.05-.55-2.39-1.2l-.65 2.48c-.23.9-.87 2.02-1.3 2.71A10 10 0 1 0 12 2z',
                    },
                    {
                      name: 'YouTube',
                      path: 'M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z',
                    },
                  ].map((social) => (
                    <button
                      key={social.name}
                      type="button"
                      onClick={() =>
                        setActiveInfoItem({
                          label: `LIVA on ${social.name}`,
                          summary: `Follow @livacouture.official on ${social.name} for daily behind-the-scenes zardozi craftsmanship reels, bridal fittings, and campaign films.`,
                        })
                      }
                      aria-label={social.name}
                      className="w-9 h-9 border border-[#F7F3EC]/20 hover:border-[#B8975A] hover:text-[#B8975A] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                      >
                        <path d={social.path} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F7F3EC]/12">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#F7F3EC]/50 mb-2">
                  BRIDAL SALON
                </p>
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="w-full py-2.5 px-3 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#0B0B0B] text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar: "© 2026 LIVA", Payment Icons, and Pitch Concept Credit */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
              <p className="text-xs tracking-[0.24em] uppercase text-[#F7F3EC]/75">
                © 2026 LIVA
              </p>
              <span className="hidden sm:inline text-[#F7F3EC]/20" aria-hidden="true">
                |
              </span>
              <p className="text-[11px] tracking-[0.12em] text-[#F7F3EC]/60 flex items-center gap-2">
                <span>Demo concept by Muhammad Mayer Chishty</span>
                <span aria-hidden="true">·</span>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20explored%20your%20LIVA%20luxury%20couture%20demo%20and%20would%20love%20to%20get%20a%20website%20like%20this.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B8975A] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Get a website like this</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            {/* Payment Icons */}
            <div
              className="flex items-center flex-wrap justify-center gap-2.5"
              aria-label="Accepted payment methods"
            >
              {[
                { label: 'VISA' },
                { label: 'MASTERCARD' },
                { label: 'AMEX' },
                { label: 'UNIONPAY' },
                { label: 'COD / IBAN' },
              ].map((pay) => (
                <div
                  key={pay.label}
                  className="px-3 py-1.5 bg-[#151515] border border-[#F7F3EC]/15 flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#F7F3EC]/80 font-mono"
                >
                  <span className="font-semibold text-[#B8975A]">
                    {pay.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Drawer for Footer About Links */}
      <AnimatePresence>
        {activeInfoItem && (
          <motion.div
            key="footer-info-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveInfoItem(null)}
            className="fixed inset-0 z-[90] bg-[#0B0B0B]/75 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#F7F3EC] text-[#0B0B0B] border border-[#B8975A] p-7 relative"
            >
              <button
                type="button"
                onClick={() => setActiveInfoItem(null)}
                className="absolute top-4 right-4 text-[#0B0B0B]/60 hover:text-[#0B0B0B] cursor-pointer"
                aria-label="Close information dialog"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-[10px] tracking-[0.26em] uppercase text-[#5A1424] mb-1">
                HOUSE OF LIVA · CLIENT CHARTER
              </p>
              <h3 className="font-serif-display text-2xl text-[#0B0B0B] mb-3">
                {activeInfoItem.label}
              </h3>
              <p className="text-xs sm:text-sm text-[#0B0B0B]/80 leading-relaxed mb-6">
                {activeInfoItem.summary}
              </p>
              <button
                type="button"
                onClick={() => setActiveInfoItem(null)}
                className="w-full py-2.5 bg-[#0B0B0B] text-[#F7F3EC] text-[11px] tracking-[0.22em] uppercase cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
