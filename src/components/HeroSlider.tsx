import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Phone, Clock, ShieldCheck, Flame, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';
import { ASSETS } from '../constants/assets';

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  badge: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 'prince-main-banner',
    title: 'Welcome to Pizza Prince',
    subtitle: 'The Royal Artisanal Taste of Surjani Town',
    tagline: 'Handcrafted crown crust pizzas, double smash zingers, and loaded fries.',
    image: ASSETS.banner,
    badge: 'Official Pizza Prince Banner',
  },
  {
    id: 'crown-pizza',
    title: 'Handcrafted Crown Crust Pizza',
    subtitle: 'Golden Cheese Pockets & Smoked Tikka Chunks',
    tagline: 'Cheese stuffed crown pockets with bubbling mozzarella, bell peppers, and royal spices.',
    image: ASSETS.pizza,
    badge: 'Signature Specialty',
  },
  {
    id: 'crispy-zinger',
    title: 'Prince Zinger Supreme Burger',
    subtitle: 'Extra Crunchy Golden Chicken Fillet',
    tagline: 'Crispy fried chicken with melting cheddar, toasted brioche bun, and secret garlic mayo.',
    image: ASSETS.burger,
    badge: 'Fast Food Favorite',
  },
  {
    id: 'counter-kitchen',
    title: 'Stone Oven & Live Prep Counter',
    subtitle: 'Hygiene & Artisanal Precision in Karachi',
    tagline: 'Visit our counter at ST 1, Sector 1 Surjani Town or enjoy express doorstep delivery.',
    image: ASSETS.restaurant,
    badge: 'Fresh From Oven',
  },
  {
    id: 'loaded-fries',
    title: 'Loaded Chicken Tikka Fries',
    subtitle: 'Crinkle Cut Fries & Molten Cheddar',
    tagline: 'Golden fries layered with spiced chicken chunks, jalapeños, and signature garlic herb cream.',
    image: ASSETS.fries,
    badge: 'Crispy Side Platter',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setIsLocationModalOpen, setIsTrackingModalOpen } = useCart();

  // Exactly 2-second continuous loop sliding animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#fff7f5] dark:bg-[#0d0608] min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between transition-colors duration-300">
      {/* Full-Screen Immersive Sliding Image Backdrop */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0.35, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.25, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="w-full h-full relative"
          >
            <img
              src={slide.image}
              onError={(e) => {
                e.currentTarget.src = '/images/banner.jpg';
              }}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay adjusting dynamically for Creamy Red light mode and Obsidian dark mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fff7f5] via-[#fff7f5]/80 to-[#fff7f5]/30 dark:from-[#0d0608] dark:via-[#0d0608]/75 dark:to-[#0d0608]/50 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f5]/95 via-[#fff7f5]/75 to-transparent dark:from-[#0d0608]/95 dark:via-[#0d0608]/75 dark:to-transparent transition-colors duration-300" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Full-Screen Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex-1 flex flex-col justify-center w-full">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Top Brand Pill & Live Karachi Distance Marker */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wide">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0ec] dark:bg-[#1a0b0e] border border-[#fbdad2] dark:border-[#3b171f] text-red-700 dark:text-amber-400 backdrop-blur-md shadow-xs">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              <span>ST 1, Sector 1 Surjani Town</span>
            </span>
            <span className="hidden xs:inline text-stone-400">·</span>
            <span className="text-[#522730] dark:text-[#f4cdd4]">Express Delivery from 4K Chowrangi</span>
          </div>

          {/* Changing Animated Headline and Subtitle (Loops every 2 sec) */}
          <div className="min-h-[110px] sm:min-h-[140px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#c8102e] dark:text-amber-400 bg-rose-100/90 dark:bg-red-950/80 px-2.5 py-0.5 rounded border border-rose-300 dark:border-red-800/60">
                    {slide.badge}
                  </span>
                  <span className="text-[11px] text-[#804a55] dark:text-stone-400">
                    Slide {currentSlide + 1} / {SLIDES.length}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-[#1f0b0f] dark:text-white mt-1 drop-shadow-xs">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg font-bold text-[#c8102e] dark:text-amber-300 mt-1">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-[#522730] dark:text-stone-200 text-xs sm:text-base leading-relaxed max-w-xl">
            Experience Karachi's royal fast food experience: hot stone-oven crown crust pizzas, crunchy double zingers, and loaded platters. Order online with live distance GPS delivery fee calculation!
          </p>

          {/* Action CTAs: Order Now, View Menu, Track Order, WhatsApp */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2">
            <a
              href="#menu-section"
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-xl shadow-red-900/30 hover:scale-102 transition-all shrink-0"
            >
              <span>Order Royal Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-950/20 hover:scale-102 transition-all shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>Track Active Order</span>
            </button>

            <a
              href={`https://wa.me/923122274688?text=${encodeURIComponent('Hello Pizza Prince! I want to order from your Surjani Town branch.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/20 hover:scale-102 transition-all shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp 0312-2274688</span>
            </a>

            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl font-bold text-xs text-[#522730] dark:text-stone-300 hover:text-[#1f0b0f] dark:hover:text-white bg-[#fff0ec] dark:bg-[#1a0b0e] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] border border-[#fbdad2] dark:border-[#3b171f] backdrop-blur-md transition-all shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
              <span>Change Area</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: 2-Second Progress Ticker & Fast Delivery Trust Strip */}
      <div className="relative z-10 w-full border-t border-[#fbdad2] dark:border-[#3b171f] bg-[#fff0ec]/90 dark:bg-[#0d0608]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#522730] dark:text-stone-400">
          {/* Progress Indicators for 2-Second Continuous Loop */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-[#804a55] dark:text-stone-400 whitespace-nowrap mr-1">Loop:</span>
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-7 bg-red-600 dark:bg-amber-400'
                    : 'w-2.5 bg-[#fbdad2] dark:bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Hot Delivery 25-40 mins</span>
            </div>
            <span aria-hidden="true" className="text-stone-400 dark:text-stone-700">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Cash on Delivery (COD)</span>
            </div>
            <span aria-hidden="true" className="text-stone-400 dark:text-stone-700">·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span>4K Chowrangi Base: Rs. 100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
