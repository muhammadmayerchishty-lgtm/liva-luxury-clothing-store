import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { KageLandingPage } from '../shaders/landing-pages/LandingPages';
import { Calendar, Sparkles } from 'lucide-react';
import { isWebGL2Available } from '../utils/webgl';

interface KageStorySectionProps {
  onOpenAppointment: () => void;
}

export const KageStorySection: React.FC<KageStorySectionProps> = ({
  onOpenAppointment,
}) => {
  const [webgl2Supported, setWebgl2Supported] = useState(true);

  useEffect(() => {
    setWebgl2Supported(isWebGL2Available());
  }, []);

  return (
    <section
      id="liva-atelier"
      aria-labelledby="kage-story-heading"
      className="bg-[#0B0B0B] text-[#F7F3EC] border-y border-[#B8975A]/25 overflow-hidden"
    >
      {/* Editorial Introduction Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8975A] mb-2 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>BRAND STORY · OUR CRAFT</span>
            </p>
            <h2
              id="kage-story-heading"
              className="font-serif-display font-light text-[#F7F3EC] tracking-[0.06em]"
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                textWrap: 'balance',
              }}
            >
              Crafted for the moments that matter.
            </h2>
          </div>

          <div className="max-w-xl flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-xs sm:text-sm text-[#F7F3EC]/75 leading-relaxed font-light">
              Scroll inside our interactive 3D sanctuary below—where stillness,
              hand-guided antique gold zardozi, and centuries-old Lahore loom
              traditions converge.
            </p>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-6 py-3 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#0B0B0B] text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Private Atelier</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ThreeUI KageLandingPage Container with exact required props & WebGL2 fallback */}
      <div className="relative w-full h-[86vh] min-h-[680px] max-h-[980px] border-t border-[#B8975A]/20 bg-[#080808]">
        {webgl2Supported ? (
          <KageLandingPage
            headingFont="onest"
            bodyFont="onest"
            headingWeight="400"
            bodyWeight="300"
            primaryColor="#B8975A"
            headingSize={46}
            bodySize={17}
            headingLetterSpacing={-0.012}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          /* Graceful CSS Fallback when WebGL2 is unavailable */
          <div className="w-full h-full bg-gradient-to-br from-[#0B0B0B] via-[#5A1424]/45 to-[#0B0B0B] flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#B8975A] mb-3">
              THE HOUSE OF LIVA · HERITAGE ATELIER
            </p>
            <h3 className="font-serif-display text-3xl sm:text-5xl text-[#F7F3EC] max-w-xl mb-4">
              Where stillness reveals the unseen handwork.
            </h3>
            <p className="text-sm text-[#F7F3EC]/75 max-w-md leading-relaxed mb-8">
              Every bridal lehenga and kalidar pishwas undergoes up to 960 hours
              of hand-guided naqshi, dabka, and seed-pearl embellishment.
            </p>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-7 py-3.5 bg-[#B8975A] text-[#0B0B0B] text-xs tracking-[0.24em] uppercase font-medium cursor-pointer"
            >
              Book a Private Appointment
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
