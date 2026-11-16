import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { Clock } from 'lucide-react';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';

interface WaitTimeInfo {
  waitTime: string;
  periodLabel: string;
  isOpen: boolean;
  dotColor: string;
}

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

  const waitInfo = getWaitTimeByHour(currentHour);

  const message = encodeURIComponent(
    'Hello Pizza Prince! I would like to place an order for delivery from your Surjani Town branch.'
  );

  return (
    <motion.aside
      aria-label="Direct WhatsApp Contact"
      variants={containerVariants}
      initial="hidden"
      animate={isPageLoaded ? 'visible' : 'hidden'}
      className="fixed bottom-5 left-3 sm:bottom-6 sm:left-6 z-40 group"
    >
      {/* Dynamic Hour-Based Wait Time & Contact Tooltip ABOVE the WhatsApp Icon */}
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
          Order on WhatsApp:{' '}
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            {RESTAURANT_LOCATION.phone}
          </span>
        </div>
        {/* Small downward pointer notch */}
        <span className="absolute -bottom-1.5 left-5 w-3 h-3 rotate-45 bg-white dark:bg-[#170b0e] border-r border-b border-[#fbdad2] dark:border-[#3b171f]" />
      </div>

      <motion.a
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        href={`https://wa.me/923122274688?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp ${RESTAURANT_LOCATION.phone} (${waitInfo.waitTime})`}
        onMouseEnter={() => setCurrentHour(new Date().getHours())}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-950/60 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
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
      </motion.a>
    </motion.aside>
  );
};

