import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, ChevronUp, MessageCircle, Send, X } from 'lucide-react';
import { CURRENCIES, CurrencyCode } from '../data/products';
import { LiquidMetalButton } from '../shaders/liquid-metal-button/LiquidMetalButton';
import { isWebGL2Available } from '../utils/webgl';

interface FloatingUtilitiesProps {
  currency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
  onOpenAppointment: () => void;
}

export const FloatingUtilities: React.FC<FloatingUtilitiesProps> = ({
  currency,
  onChangeCurrency,
  onOpenAppointment,
}) => {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [webgl2Ready, setWebgl2Ready] = useState(true);
  const whatsappDisplay =
    (import.meta.env.VITE_WHATSAPP_CONCIERGE as string | undefined) ||
    '+92 300 8445482';

  useEffect(() => {
    setWebgl2Ready(isWebGL2Available());
  }, []);

  const [messages, setMessages] = useState<
    { id: string; sender: 'stylist' | 'patron'; text: string; time: string }[]
  >([
    {
      id: 'm1',
      sender: 'stylist',
      text: 'Assalam-o-Alaikum & welcome to LIVA Lahore Atelier. How may our bridal & formal stylists assist you today?',
      time: 'Just now',
    },
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const userText = messageInput.trim();
    setMessageInput('');

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: 'patron',
        text: userText,
        time: 'Now',
      },
    ]);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `s-${Date.now()}`,
          sender: 'stylist',
          text: 'Thank you for your inquiry. A Senior LIVA Stylist on WhatsApp (+92 300 8445482) has noted your request and can share custom measurement charts or live atelier videos immediately.',
          time: 'Now',
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* 1. Bottom-Left PKR Currency Selector */}
      <div className="fixed bottom-5 left-5 z-40">
        <div className="relative">
          <AnimatePresence>
            {currencyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-full left-0 mb-2 w-48 bg-[#0B0B0B] text-[#F7F3EC] border border-[#B8975A]/40 shadow-xl py-1.5"
              >
                <p className="px-3.5 py-1.5 text-[10px] tracking-[0.22em] uppercase text-[#B8975A] border-b border-[#F7F3EC]/10">
                  SELECT CURRENCY
                </p>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const active = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        onChangeCurrency(code);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs tracking-[0.16em] flex items-center justify-between transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#5A1424] text-[#F7F3EC] font-medium'
                          : 'text-[#F7F3EC]/80 hover:bg-[#F7F3EC]/10'
                      }`}
                    >
                      <span>{code}</span>
                      <span className="text-[10px] text-[#B8975A] font-mono">
                        {CURRENCIES[code].symbol.trim()}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setCurrencyOpen((prev) => !prev)}
            className="h-11 px-4 bg-[#0B0B0B] text-[#F7F3EC] border border-[#B8975A]/50 hover:border-[#B8975A] shadow-lg flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]"
            aria-label="PKR Currency selector"
            aria-expanded={currencyOpen}
          >
            <span className="font-mono font-medium">{currency}</span>
            <ChevronUp
              className={`w-3.5 h-3.5 text-[#B8975A] transition-transform duration-200 ${
                currencyOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. Bottom-Right Floating Stack: LiquidMetalButton (variant="circle") + WhatsApp "Chat with Us" */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="mb-1 w-[320px] sm:w-[350px] bg-[#F7F3EC] text-[#0B0B0B] border border-[#0B0B0B]/20 shadow-2xl overflow-hidden"
            >
              <div className="bg-[#0B0B0B] text-[#F7F3EC] px-4 py-3.5 flex items-center justify-between border-b border-[#B8975A]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1F6E43] text-white flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.16em] uppercase font-medium">
                      LIVA WhatsApp Stylist
                    </p>
                    <p className="text-[10px] text-[#B8975A] tracking-[0.14em]">
                      {whatsappDisplay} · Online
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="text-[#F7F3EC]/70 hover:text-[#F7F3EC] cursor-pointer"
                  aria-label="Close WhatsApp chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 max-h-64 overflow-y-auto space-y-3 bg-[#FAF7F2]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'patron' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`px-3.5 py-2.5 text-xs leading-relaxed max-w-[85%] ${
                        msg.sender === 'patron'
                          ? 'bg-[#5A1424] text-[#F7F3EC]'
                          : 'bg-white text-[#0B0B0B] border border-[#0B0B0B]/10'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[#0B0B0B]/45 mt-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendChat}
                className="p-2.5 bg-[#F7F3EC] border-t border-[#0B0B0B]/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Ask about sizing, bridal, or delivery..."
                  className="flex-1 bg-white border border-[#0B0B0B]/15 px-3 py-2 text-xs focus:outline-none focus:border-[#5A1424]"
                />
                <button
                  type="submit"
                  className="w-9 h-9 bg-[#1F6E43] hover:bg-[#175634] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ThreeUI LiquidMetalButton (variant="circle", Liquid Orb) for "Book a Private Appointment" */}
        <div className="group relative flex items-center">
          <span className="pointer-events-none mr-2.5 px-3 py-1.5 bg-[#0B0B0B]/90 text-[#F7F3EC] border border-[#B8975A]/40 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
            Book a Private Appointment
          </span>

          {webgl2Ready ? (
            <div
              onClick={onOpenAppointment}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenAppointment();
                }
              }}
              aria-label="Book a Private Appointment"
              className="w-16 h-16 rounded-full overflow-hidden shadow-2xl border border-[#B8975A]/45 cursor-pointer relative bg-[#0e0f12]"
            >
              <LiquidMetalButton
                variant="circle"
                text="Book Appointment"
                embedded
                onClick={onOpenAppointment}
                className="w-full h-full pointer-events-none"
              />
            </div>
          ) : (
            /* Graceful CSS Fallback if WebGL2 is unavailable */
            <button
              type="button"
              onClick={onOpenAppointment}
              aria-label="Book a Private Appointment"
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B8975A] via-[#F7F3EC] to-[#5A1424] text-[#0B0B0B] shadow-xl border border-[#B8975A] flex items-center justify-center cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Floating WhatsApp "Chat with Us" Button */}
        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className="h-11 px-4 bg-[#1F6E43] hover:bg-[#185835] text-[#F7F3EC] border border-[#B8975A]/40 shadow-lg flex items-center gap-2.5 text-xs tracking-[0.18em] uppercase font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]"
          aria-label="Chat with Us on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Chat with Us</span>
        </button>
      </div>
    </>
  );
};
