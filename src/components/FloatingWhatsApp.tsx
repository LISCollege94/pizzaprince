import React from 'react';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';

export const FloatingWhatsApp: React.FC = () => {
  const message = encodeURIComponent(
    'Hello Pizza Prince! I would like to place an order for delivery from your Surjani Town branch.'
  );

  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-5 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-row-reverse items-center gap-3 group">
      <a
        href={`https://wa.me/923122274688?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp 0312-2274688"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-950/60 transition-transform duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp Official SVG Logo */}
        <svg
          className="w-7 h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.203.043.072.043.419-.101.824z" />
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.16-1.33c1.42.8 3.06 1.33 4.84 1.33 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.03-.43-4.29-1.19l-.31-.18-3.07.79.82-2.98-.2-.33C4.35 14.86 3.9 13.48 3.9 12c0-4.47 3.63-8.1 8.1-8.1s8.1 3.63 8.1 8.1-3.63 8.1-8.1 8.1z" />
        </svg>

        {/* Hover label */}
        <span className="sr-only">Contact Pizza Prince on WhatsApp</span>
      </a>

      {/* Direct phone tooltip on hover */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 border border-stone-800 text-stone-200 text-xs px-3 py-1.5 rounded-xl shadow-xl pointer-events-none whitespace-nowrap">
        Order on WhatsApp: <span className="text-amber-400 font-bold">0312-2274688</span>
      </div>
    </aside>
  );
};
