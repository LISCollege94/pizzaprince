import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, MenuCategory } from '../types';
import { useCart } from '../context/CartContext';
import { CustomizeModal } from './CustomizeModal';
import { Search, Plus, SlidersHorizontal, Flame } from 'lucide-react';

const CATEGORIES: { id: MenuCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Items', icon: '👑' },
  { id: 'pizza', label: 'Crown Pizzas', icon: '🍕' },
  { id: 'burgers', label: 'Zinger Burgers', icon: '🍔' },
  { id: 'crispy-chicken', label: 'Crispy Broast', icon: '🍗' },
  { id: 'loaded-fries', label: 'Loaded Fries', icon: '🍟' },
  { id: 'rolls', label: 'Paratha Rolls', icon: '🌯' },
  { id: 'drinks', label: 'Drinks & Shakes', icon: '🥤' },
];

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget.closest('.group');
    const imgEl = card?.querySelector('img') || e.currentTarget;

    if (item.sizes && item.sizes.length > 1) {
      setCustomizingItem(item);
    } else {
      addToCart(item, {
        sourceElement: imgEl as HTMLElement,
      });
    }
  };

  return (
    <section id="menu-section" className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8 sm:mb-10">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0ec] dark:bg-[#1a0b0e] text-xs font-bold text-red-700 dark:text-red-400 border border-[#fbdad2] dark:border-[#3b171f] uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5 text-red-600" />
          <span>Surjani Town Kitchen Pass</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#1f0b0f] dark:text-white tracking-tight">
          Explore Our Royal Menu
        </h2>
        <p className="text-xs sm:text-sm text-[#522730] dark:text-[#f4cdd4]">
          Handcrafted stone-baked pizzas, double smash zinger burgers, and crispy platters prepared fresh daily.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
        {/* Category Tabs (Segmented control) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/30 scale-102'
                  : 'bg-[#fff0ec] dark:bg-[#1a0b0e] text-[#522730] dark:text-[#f4cdd4] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] border border-[#fbdad2] dark:border-[#3b171f]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#804a55] dark:text-stone-400" />
          <input
            type="text"
            placeholder="Search pizza, burger, broast, fries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-white placeholder-[#804a55] dark:placeholder-stone-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      {/* Menu Cards Grid with Dynamic Scrolling Animation */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#fff0ec] dark:bg-[#170b0e] rounded-2xl border border-[#fbdad2] dark:border-[#3b171f]">
          <p className="text-[#804a55] dark:text-stone-400 text-xs sm:text-sm">No items found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 45, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] shadow-sm hover:shadow-2xl dark:shadow-none hover:border-red-500/60 transition-all duration-300"
            >
              {/* Product Image Box with Floating Animation */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                <motion.img
                  src={item.image}
                  onError={(e) => {
                    e.currentTarget.src = '/images/pizza.jpg';
                  }}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Tag Banner */}
                {item.tag && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-red-600/90 text-white font-bold text-[10px] sm:text-[11px] shadow-md backdrop-blur-sm">
                    {item.tag}
                  </div>
                )}

                {/* Category label */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/80 text-amber-400 font-semibold text-[10px] backdrop-blur-sm border border-stone-800">
                  {item.category.toUpperCase()}
                </div>
              </div>

              {/* Product Details Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1f0b0f] dark:text-[#fff1f3] group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#522730] dark:text-[#f4cdd4] mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-3 border-t border-[#fbdad2]/70 dark:border-[#3b171f]/80 flex items-center justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-baseline gap-1.5 truncate">
                      <span className="text-base sm:text-lg font-black text-red-700 dark:text-amber-400 tabular-nums">
                        Rs. {item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[11px] text-stone-400 line-through tabular-nums">
                          Rs. {item.originalPrice}
                        </span>
                      )}
                    </div>
                    {item.sizes && item.sizes.length > 1 && (
                      <span className="text-[10px] text-[#804a55] dark:text-stone-400 truncate">Multiple sizes</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Customize Button */}
                    <button
                      onClick={() => setCustomizingItem(item)}
                      className="p-2 sm:p-2.5 rounded-xl border border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-[#f4cdd4] hover:text-red-600 dark:hover:text-amber-400 bg-[#fff0ec] dark:bg-[#1a0b0e] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] transition-colors shrink-0"
                      title="Customize portion & spice"
                      aria-label="Customize portion and spice"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {/* Quick Add To Cart Button */}
                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className="flex items-center gap-1 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-950/20 active:scale-95 transition-all shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Item Customization Modal */}
      <CustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
      />
    </section>
  );
};
