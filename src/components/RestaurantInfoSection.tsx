import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Flame, Compass } from 'lucide-react';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';
import { useCart } from '../context/CartContext';

export const RestaurantInfoSection: React.FC = () => {
  const { setIsTrackingModalOpen } = useCart();

  return (
    <section id="restaurant-story" className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#fbdad2] dark:border-[#3b171f] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
      >
        {/* Left: Real Counter & New High-Res Artwork Showcase */}
        <div className="lg:col-span-6 space-y-4">
          {/* New Pristine Pizza Prince Widescreen Artwork */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#fbdad2] dark:border-[#3b171f] shadow-xl bg-stone-900 group">
            <img
              src="/public/assets/aistudio/Gemini_Generated_Image_2pcgg62pcgg62pcg_da13fa02.jpg"
              alt="Pizza Prince Official Widescreen Signboard Artwork"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-lg bg-stone-950/90 text-amber-300 font-bold border border-stone-800">
                Official Pizza Prince Artwork
              </span>
              <span className="text-white font-medium text-[11px] drop-shadow">Surjani Town Branch</span>
            </div>
          </div>

          {/* Sub Grid: Counter + Official Circular Logo */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#fbdad2] dark:border-[#3b171f] shadow bg-stone-900">
              <img
                src="/src/assets/images/restaurant_counter_kitchen_1794413391861.jpg"
                alt="Pizza Prince Stone Oven Kitchen Counter"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-2 left-2 text-[10px] sm:text-[11px] font-bold text-white bg-black/70 px-2 py-0.5 rounded">
                Live Stone Oven Counter
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] flex items-center gap-3">
              <img
                src="/public/assets/aistudio/Logo_dc615caa.jpg"
                alt="Pizza Prince Circular Official Emblem"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-amber-400 shrink-0 shadow-md"
              />
              <div className="min-w-0">
                <p className="font-bold text-[#1f0b0f] dark:text-white text-xs truncate">
                  Pizza Prince
                </p>
                <p className="text-[#804a55] dark:text-stone-400 text-[10px] sm:text-[11px] truncate">
                  ST 1, Sector 1 Surjani
                </p>
                <p className="text-red-700 dark:text-amber-400 text-[10px] font-bold mt-0.5">
                  Base Delivery Rs. 100
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Branch Info & Google Maps Location Link */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              Visit Our Kitchen & Counter
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1f0b0f] dark:text-white tracking-tight">
              Pizza Prince Surjani Town
            </h2>
            <p className="text-[#522730] dark:text-[#f4cdd4] text-xs sm:text-sm leading-relaxed">
              Step up to our counter at ST 1, Sector 1 Surjani Town for freshly tossed pizzas straight out of our high-heat stone oven, or order online for fast piping-hot delivery across Karachi.
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3 text-xs">
            <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f]">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1f0b0f] dark:text-white">Physical Address:</p>
                <p className="text-[#522730] dark:text-[#f4cdd4] mt-0.5">{RESTAURANT_LOCATION.address}</p>
                <p className="text-[#804a55] dark:text-stone-400 text-[11px] mt-0.5">Landmark: {RESTAURANT_LOCATION.landmark}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f]">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1f0b0f] dark:text-white">Operating Hours:</p>
                <p className="text-[#522730] dark:text-[#f4cdd4] mt-0.5">
                  Monday to Sunday: 1:00 PM – 3:00 AM (Midnight Delivery)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f]">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1f0b0f] dark:text-white">WhatsApp & Calling Order Hotline:</p>
                <p className="text-[#522730] dark:text-[#f4cdd4] mt-0.5 font-semibold">
                  {RESTAURANT_LOCATION.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <a
              href={RESTAURANT_LOCATION.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-950/20 hover:scale-102 transition-all shrink-0"
            >
              <Navigation className="w-4 h-4" />
              <span>Google Maps Location</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md transition-all shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>Track Live Delivery</span>
            </button>

            <a
              href={`https://wa.me/923122274688?text=${encodeURIComponent(
                'Assalam-o-Alaikum! I want to inquire about Pizza Prince Surjani Town menu and delivery.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/20 hover:scale-102 transition-all shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp 0312-2274688</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
