import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, MapPin, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Asad Rauf',
    area: 'Sector 1, Surjani Town',
    review: 'Best Crown Crust in Karachi hands down! The stuffed cheese pockets were overflowing, chicken tikka was tender and smoky. Delivered in 25 minutes hot and fresh.',
    rating: 5,
    order: 'Large Crown Crust Tikka + Loaded Fries',
  },
  {
    name: 'Mariam Tariq',
    area: '4K Chowrangi, Surjani',
    review: 'The live delivery tracking feature is super helpful. I could see the scooter rider moving right towards our street. Cash on Delivery was completely smooth.',
    rating: 5,
    order: 'Prince Zinger Supreme + Mint Lemonade',
  },
  {
    name: 'Bilal Siddiqui',
    area: 'Sector 4, Surjani Town',
    review: 'Finally a quality fast food branch right here in Surjani Town. Their stone oven crust rivals top international pizza brands. 10/10 cheese pull!',
    rating: 5,
    order: 'Fajita Sensation Pizza + Buffalo Wings',
  },
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0ec] dark:bg-[#1a0b0e] text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-[#fbdad2] dark:border-[#3b171f] uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Surjani Town Verified Reviews</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1f0b0f] dark:text-white tracking-tight">
          Loved by Our Neighborhood
        </h2>
        <p className="text-xs sm:text-sm text-[#522730] dark:text-[#f4cdd4]">
          Hear what pizza lovers across Surjani Town, 4K Chowrangi, and North Karachi say about Pizza Prince.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            className="p-6 rounded-2xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#fbdad2] dark:text-stone-700" />
              </div>
              <p className="text-xs text-[#522730] dark:text-[#f4cdd4] leading-relaxed italic">
                "{rev.review}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#fbdad2]/60 dark:border-[#3b171f]/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#1f0b0f] dark:text-white">{rev.name}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#804a55] dark:text-stone-400">
                  <MapPin className="w-3 h-3 text-red-600" />
                  <span>{rev.area}</span>
                </div>
              </div>
              <span className="text-[10px] text-red-700 dark:text-amber-400 font-bold max-w-[130px] text-right truncate">
                {rev.order}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
