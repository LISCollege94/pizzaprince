import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Clock, MessageCircle, Send, X } from 'lucide-react';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';

interface WaitTimeInfo {
  waitTime: string;
  periodLabel: string;
  isOpen: boolean;
  dotColor: string;
}

interface QueryTemplate {
  id: string;
  label: string;
  message: string;
}

const QUERY_TEMPLATES: QueryTemplate[] = [
  {
    id: 'track-order',
    label: 'How to track my order',
    message:
      'Hello Pizza Prince! How to track my order? Please share an update on my delivery status.',
  },
  {
    id: 'place-order',
    label: 'Place a new order',
    message:
      'Hello Pizza Prince! I would like to place an order for delivery from your Surjani Town branch.',
  },
  {
    id: 'delivery-fee',
    label: 'Delivery time & charges',
    message:
      'Hello Pizza Prince! Could you confirm the estimated delivery time and charges for my area?',
  },
  {
    id: 'menu-deals',
    label: 'Deals & menu inquiry',
    message:
      'Hello Pizza Prince! I have a question about your pizza deals and fast food menu items.',
  },
];

function getWaitTimeByHour(hour: number): WaitTimeInfo {
  // Peak evening & dinner hours (7 PM - 11:59 PM)
  if (hour >= 19 && hour <= 23) {
    return {
      waitTime: '30–40 mins',
      periodLabel: 'Peak Dinner Rush',
      isOpen: true,
      dotColor: 'bg-amber-400',
    };
  }
  // Midnight delivery hours (12 AM - 2:59 AM)
  if (hour >= 0 && hour < 3) {
    return {
      waitTime: '25–35 mins',
      periodLabel: 'Midnight Delivery',
      isOpen: true,
      dotColor: 'bg-emerald-400',
    };
  }
  // Afternoon & early evening (1 PM - 6:59 PM)
  if (hour >= 13 && hour < 19) {
    return {
      waitTime: '20–25 mins',
      periodLabel: 'Express Kitchen',
      isOpen: true,
      dotColor: 'bg-emerald-400',
    };
  }
  // Morning / before 1:00 PM opening (3 AM - 12:59 PM)
  return {
    waitTime: 'Opens at 1:00 PM',
    periodLabel: 'Pre-Order on WhatsApp',
    isOpen: false,
    dotColor: 'bg-amber-400',
  };
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 64,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.75,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 360,
      damping: 18,
    },
  },
};

export const FloatingWhatsApp: React.FC = () => {
  const [currentHour, setCurrentHour] = useState<number>(() => new Date().getHours());
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.readyState === 'complete' : true
  );
  const [showGreeting, setShowGreeting] = useState<boolean>(false);
  const [greetingDismissed, setGreetingDismissed] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(QUERY_TEMPLATES[0].id);
  const [customMessage, setCustomMessage] = useState<string>(QUERY_TEMPLATES[0].message);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateHour = () => setCurrentHour(new Date().getHours());
    const interval = setInterval(updateHour, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
      return;
    }

    const handleLoad = () => setIsPageLoaded(true);
    window.addEventListener('load', handleLoad, { once: true });
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Display temporary slide-in greeting "Need help?" 3 seconds after page load
  useEffect(() => {
    if (!isPageLoaded || greetingDismissed || isMenuOpen) return;

    const showTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, [isPageLoaded, greetingDismissed, isMenuOpen]);

  // Auto-hide temporary greeting after 6.5 seconds
  useEffect(() => {
    if (!showGreeting) return;

    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
      setGreetingDismissed(true);
    }, 6500);

    return () => clearTimeout(hideTimer);
  }, [showGreeting]);

  // Close template menu on outside click or Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const waitInfo = getWaitTimeByHour(currentHour);

  const handleToggleMenu = () => {
    setCurrentHour(new Date().getHours());
    setShowGreeting(false);
    setGreetingDismissed(true);
    setIsMenuOpen((prev) => !prev);
  };

  const handleSelectTemplate = (template: QueryTemplate) => {
    setSelectedTemplateId(template.id);
    setCustomMessage(template.message);
  };

  const encodedMessage = encodeURIComponent(
    customMessage.trim() || QUERY_TEMPLATES[0].message
  );
  const whatsappUrl = `https://wa.me/923122274688?text=${encodedMessage}`;

  return (
    <motion.aside
      ref={containerRef}
      aria-label="Direct WhatsApp Contact"
      variants={containerVariants}
      initial="hidden"
      animate={isPageLoaded ? 'visible' : 'hidden'}
      className="fixed bottom-5 left-3 sm:bottom-6 sm:left-6 z-40 group flex items-center"
    >
      {/* Predefined Query Template Panel (Opened when clicking Contact Button) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full left-0 mb-3 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 rounded-2xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden"
          >
            {/* Header with dynamic wait time */}
            <div className="px-4 py-3 bg-[#fff0ec] dark:bg-[#1a0b0e] border-b border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-black text-[#1f0b0f] dark:text-white truncate">
                    WhatsApp Quick Support
                  </p>
                  <p className="text-[10px] text-[#804a55] dark:text-stone-400 truncate">
                    {waitInfo.isOpen ? `Est. Wait: ${waitInfo.waitTime}` : waitInfo.waitTime} · {RESTAURANT_LOCATION.phone}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-lg text-[#804a55] hover:text-[#1f0b0f] dark:text-stone-400 dark:hover:text-white hover:bg-[#ffe6e0] dark:hover:bg-[#281116] transition-colors shrink-0"
                aria-label="Close WhatsApp support menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Common Customer Query Templates */}
            <div className="p-3.5 space-y-3">
              <div className="space-y-1.5">
                <span className="block text-[11px] font-bold text-[#804a55] dark:text-stone-400">
                  Choose a quick question:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUERY_TEMPLATES.map((tpl) => {
                    const isSelected = selectedTemplateId === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleSelectTemplate(tpl)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors border text-left ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-[#fff7f5] dark:bg-[#0d0608] text-[#522730] dark:text-stone-300 border-[#fbdad2] dark:border-[#3b171f] hover:border-emerald-500/60'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editable Message Preview */}
              <div className="space-y-1">
                <label
                  htmlFor="whatsapp-template-message"
                  className="block text-[11px] font-bold text-[#804a55] dark:text-stone-400"
                >
                  Predefined message:
                </label>
                <textarea
                  id="whatsapp-template-message"
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#fff7f5] dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-100 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Direct WhatsApp Send Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Hour-Based Wait Time & Contact Tooltip ABOVE the WhatsApp Icon (when menu closed) */}
      {!isMenuOpen && (
        <div className="absolute bottom-full left-0 mb-3 opacity-0 translate-y-3 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 transition-all duration-300 ease-out origin-bottom-left bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 text-xs px-3.5 py-2.5 rounded-xl shadow-2xl pointer-events-none whitespace-nowrap space-y-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${waitInfo.dotColor} animate-pulse shrink-0`} />
            <Clock className="w-3.5 h-3.5 text-red-600 dark:text-amber-400 shrink-0" />
            <span className="font-black text-[#1f0b0f] dark:text-white">
              {waitInfo.isOpen ? `Est. Wait: ${waitInfo.waitTime}` : waitInfo.waitTime}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#fff0ec] dark:bg-[#2a1016] text-red-700 dark:text-amber-300 border border-[#fbdad2] dark:border-[#3b171f]">
              {waitInfo.periodLabel}
            </span>
          </div>
          <div className="text-[11px] text-[#522730] dark:text-stone-300">
            Click for quick queries ·{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {RESTAURANT_LOCATION.phone}
            </span>
          </div>
          {/* Small downward pointer notch */}
          <span className="absolute -bottom-1.5 left-5 w-3 h-3 rotate-45 bg-white dark:bg-[#170b0e] border-r border-b border-[#fbdad2] dark:border-[#3b171f]" />
        </div>
      )}

      {/* Circular WhatsApp Contact Button */}
      <motion.button
        type="button"
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleToggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={`Chat on WhatsApp ${RESTAURANT_LOCATION.phone} (${waitInfo.waitTime})`}
        onMouseEnter={() => setCurrentHour(new Date().getHours())}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-950/60 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 shrink-0"
      >
        {/* Subtle Pulse Ring */}
        <motion.span
          variants={iconVariants}
          className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none"
        />

        {/* WhatsApp Official SVG Logo */}
        <motion.svg variants={iconVariants} className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.203.043.072.043.419-.101.824z" />
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.16-1.33c1.42.8 3.06 1.33 4.84 1.33 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.03-.43-4.29-1.19l-.31-.18-3.07.79.82-2.98-.2-.33C4.35 14.86 3.9 13.48 3.9 12c0-4.47 3.63-8.1 8.1-8.1s8.1 3.63 8.1 8.1-3.63 8.1-8.1 8.1z" />
        </motion.svg>

        <span className="sr-only">Contact Pizza Prince on WhatsApp</span>
      </motion.button>

      {/* Temporary Slide-In Greeting Next to the Icon (3 seconds after page loads) */}
      <AnimatePresence>
        {showGreeting && !isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -14, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.94 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="ml-3 flex items-center gap-2 bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 pl-3 pr-2 py-2 rounded-xl shadow-xl whitespace-nowrap"
          >
            <button
              type="button"
              onClick={handleToggleMenu}
              className="flex items-center gap-1.5 text-xs font-extrabold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Need help?</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowGreeting(false);
                setGreetingDismissed(true);
              }}
              aria-label="Dismiss greeting"
              className="p-0.5 rounded-md text-[#804a55] hover:text-[#1f0b0f] dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};
