import React from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';
import { Sparkles, Plus, Tag, Check, ArrowRight } from 'lucide-react';
import { ASSETS } from '../constants/assets';

interface DealItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  description: string;
  image: string;
  includes: string[];
}

const DEALS: DealItem[] = [
  {
    id: 'deal-family-crown',
    name: 'Royal Family Crown Feast',
    price: 2890,
    originalPrice: 3350,
    discountBadge: 'Save Rs. 460',
    description: 'The ultimate royal family gathering deal. Includes our signature stuffed Crown Crust Pizza and full sides.',
    image: ASSETS.pizza,
    includes: [
      '1x Large 13" Crown Crust Tikka Pizza',
      '1x Prince Zinger Supreme Burger',
      '1x Platter of Loaded Chicken Fries',
      '1x 1.5L Chilled Soft Drink Bottle',
    ],
  },
  {
    id: 'deal-midnight-zinger',
    name: 'Midnight Zinger Duo Combo',
    price: 1190,
    originalPrice: 1420,
    discountBadge: 'Save Rs. 230',
    description: 'Two golden crispy zinger burgers paired with fresh crinkle fries and ice-cold soft drink cans.',
    image: ASSETS.burger,
    includes: [
      '2x Prince Supreme Zinger Burgers',
      '1x Jumbo Seasoned Crinkle Fries',
      '2x Chilled Drink Cans (Coke/Sprite)',
      '2x Secret Garlic Mayo Dips',
    ],
  },
  {
    id: 'deal-broast-wings-party',
    name: 'Crispy Broast & Wings Box',
    price: 1490,
    originalPrice: 1750,
    discountBadge: 'Save Rs. 260',
    description: 'Crispy pressure-fried chicken broast quarters combined with spicy glazed buffalo chicken wings.',
    image: ASSETS.fries,
    includes: [
      '4x Golden Fried Broast Pieces (Half)',
      '6x Spicy Buffalo Crispy Wings',
      '2x Fresh Dinner Buns + Fries',
      '2x Garlic Sauce Tubs',
    ],
  },
];

export const DealsSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddDeal = (deal: DealItem, e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget.closest('.deal-card');
    const imgEl = card?.querySelector('img') || e.currentTarget;

    const dealMenuItem: MenuItem = {
      id: deal.id,
      name: deal.name,
      category: 'pizza',
      price: deal.price,
      originalPrice: deal.originalPrice,
      description: deal.includes.join(' · '),
      image: deal.image,
      tag: 'Exclusive Deal',
    };

    addToCart(dealMenuItem, {
      sourceElement: imgEl as HTMLElement,
    });
  };

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0ec] dark:bg-[#1a0b0e] text-xs font-bold text-red-700 dark:text-amber-400 border border-[#fbdad2] dark:border-[#3b171f] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Savings</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1f0b0f] dark:text-white tracking-tight">
            Royal Deals & Combos
          </h2>
          <p className="text-xs sm:text-sm text-[#522730] dark:text-[#f4cdd4]">
            Big feasts, bigger savings. Handcrafted combos packed with our bestselling items.
          </p>
        </div>

        <a
          href="#menu-section"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#c8102e] dark:text-amber-400 hover:underline shrink-0"
        >
          <span>View Regular A La Carte Menu</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Deals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {DEALS.map((deal, idx) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            className="deal-card group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] hover:border-red-500/70 shadow-sm dark:shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            {/* Top Image Showcase */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
              <img
                src={deal.image}
                onError={(e) => {
                  e.currentTarget.src = '/images/pizza.jpg';
                }}
                alt={deal.name}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Discount Badge */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs shadow-lg flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>{deal.discountBadge}</span>
              </div>

              {/* Deal Name Overlay */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-black text-white drop-shadow">
                  {deal.name}
                </h3>
              </div>
            </div>

            {/* Deal Details & Included Items */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <p className="text-xs text-[#522730] dark:text-[#f4cdd4] leading-relaxed">
                  {deal.description}
                </p>

                {/* Items Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-[#fbdad2]/60 dark:border-[#3b171f]/80">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#804a55] dark:text-stone-400">
                    Combo Includes:
                  </p>
                  <ul className="space-y-1 text-xs text-[#522730] dark:text-[#f4cdd4]">
                    {deal.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price and Add Deal Button */}
              <div className="pt-4 border-t border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-red-700 dark:text-amber-400 tabular-nums">
                      Rs. {deal.price}
                    </span>
                    <span className="text-xs text-stone-400 line-through tabular-nums">
                      Rs. {deal.originalPrice}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Special Combo Discount
                  </span>
                </div>

                <button
                  onClick={(e) => handleAddDeal(deal, e)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-md shadow-red-950/20 active:scale-95 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Deal</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
