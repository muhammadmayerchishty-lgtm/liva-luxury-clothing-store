import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LivaLogo } from './LivaLogo';

export const PageLoader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timer = window.setTimeout(
      () => {
        setVisible(false);
      },
      prefersReduced ? 150 : 1150
    );

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="liva-page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-6%',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0B] text-[#F7F3EC] cursor-pointer select-none px-6"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <LivaLogo tone="light" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-28 h-[1px] bg-[#B8975A] my-5 origin-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="font-serif-display italic text-lg md:text-xl tracking-wide text-[#F7F3EC]/90"
            >
              Crafted for the moments that matter.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
