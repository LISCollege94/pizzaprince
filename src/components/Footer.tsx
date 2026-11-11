import React from 'react';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';
import { MapPin, Phone, Clock, ArrowUp, Navigation } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#fff0ec] dark:bg-[#080304] text-[#522730] dark:text-stone-400 border-t border-[#fbdad2] dark:border-[#3b171f] text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/public/assets/aistudio/Logo_dc615caa.jpg"
                alt="Pizza Prince Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400 shrink-0 shadow-md"
              />
              <span className="text-xl font-black text-[#1f0b0f] dark:text-white tracking-tight">
                PIZZA <span className="text-amber-500 dark:text-amber-400">PRINCE</span>
              </span>
            </div>
            <p className="text-[#522730] dark:text-stone-400 text-xs leading-relaxed">
              Surjani Town's premier kitchen for handcrafted crown crust pizzas, zinger burgers, and loaded fries. Fast delivery across Karachi with real-time distance calculation.
            </p>
            <div className="text-[11px] text-[#804a55] dark:text-stone-500 font-semibold">
              Branch: ST 1, Sector 1 Surjani Town, Karachi
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f0b0f] dark:text-stone-200">
              Menu Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-[#522730] dark:text-stone-400 font-medium">
              <li>
                <a href="#menu-section" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                  Crown Crust Pizzas
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                  Zinger & Smash Burgers
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                  Crispy Chicken Broast
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                  Special Loaded Fries
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                  Paratha Rolls & Shakes
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery & Timings */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f0b0f] dark:text-stone-200">
              Coverage & Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>1:00 PM – 3:00 AM (Open 7 Days a Week)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                <span>Base Delivery: 4K Chowrangi (Rs. 100)</span>
              </div>
              <div className="flex items-start gap-2">
                <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>All Karachi Delivery with Distance GPS Rate</span>
              </div>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f0b0f] dark:text-stone-200">
              Hotline & Support
            </h4>
            <p className="text-xs text-[#522730] dark:text-stone-400">
              For direct orders, catering, and home deliveries:
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] space-y-1 shadow-xs">
              <div className="flex items-center gap-2 text-[#1f0b0f] dark:text-white font-bold text-sm">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{RESTAURANT_LOCATION.phone}</span>
              </div>
              <p className="text-[11px] text-red-700 dark:text-amber-400 font-bold">
                WhatsApp & Direct Call Orders
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Unboxed Clean Metadata */}
        <div className="pt-8 border-t border-[#fbdad2] dark:border-[#3b171f]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#804a55] dark:text-stone-500">
            <span>© {new Date().getFullYear()} Pizza Prince Restaurant</span>
            <span aria-hidden="true">·</span>
            <span>All Rights Reserved</span>
            <span aria-hidden="true">·</span>
            <span>Surjani Town, Karachi</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a0b0e] hover:bg-[#fff0ec] dark:hover:bg-[#281116] text-[#1f0b0f] dark:text-stone-300 border border-[#fbdad2] dark:border-[#3b171f] transition-colors font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
