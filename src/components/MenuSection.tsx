import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, MenuCategory } from '../types';
import { useCart } from '../context/CartContext';
import { CustomizeModal } from './CustomizeModal';
import { formatPrice } from '../utils/format';
import { Search, Plus, Check, SlidersHorizontal, Flame, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES: { id: MenuCategory; label: string; shortLabel: string; icon: string }[] = [
  { id: 'pizza', label: 'Crown Pizzas', shortLabel: 'Pizzas', icon: '🍕' },
  { id: 'burgers', label: 'Zinger Burgers', shortLabel: 'Burgers', icon: '🍔' },
  { id: 'crispy-chicken', label: 'Crispy Broast', shortLabel: 'Broast', icon: '🍗' },
  { id: 'loaded-fries', label: 'Loaded Fries', shortLabel: 'Fries', icon: '🍟' },
  { id: 'rolls', label: 'Paratha Rolls', shortLabel: 'Rolls', icon: '🌯' },
  { id: 'drinks', label: 'Drinks & Shakes', shortLabel: 'Drinks', icon: '🥤' },
];

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('pizza');
  const [searchQuery, setSearchQuery] = useState('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const { addToCart, cart } = useCart();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = trimmedQuery.length > 0
    ? MENU_ITEMS.filter((item) => {
        const catMeta = CATEGORIES.find((c) => c.id === item.category);
        return (
          item.name.toLowerCase().includes(trimmedQuery) ||
          item.category.toLowerCase().includes(trimmedQuery) ||
          (catMeta && catMeta.label.toLowerCase().includes(trimmedQuery))
        );
      }).sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().includes(trimmedQuery) ? 0 : 1;
        const bNameMatch = b.name.toLowerCase().includes(trimmedQuery) ? 0 : 1;
        return aNameMatch - bNameMatch;
      })
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const centerCategoryButton = (catId: MenuCategory) => {
    requestAnimationFrame(() => {
      const track = trackRef.current;
      const btn = tabRefs.current[catId];
      if (!track || !btn) return;
      const targetLeft = btn.offsetLeft - (track.clientWidth - btn.clientWidth) / 2;
      track.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    });
  };

  const handleCategorySelect = (catId: MenuCategory) => {
    setActiveCategory(catId);
    if (searchQuery) setSearchQuery('');
    centerCategoryButton(catId);
  };

  const handleArrowStep = (direction: -1 | 1) => {
    const currentIndex = CATEGORIES.findIndex((c) => c.id === activeCategory);
    const nextIndex = (currentIndex + direction + CATEGORIES.length) % CATEGORIES.length;
    handleCategorySelect(CATEGORIES[nextIndex].id);
  };

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
    <section id="menu-section" className="pt-6 sm:pt-10 pb-12 sm:pb-16 px-2.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Search Bar & Full-Width Animated Category Carousel */}
      <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
        {/* Prominent Quick Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-3 sm:top-3.5 text-[#804a55] dark:text-stone-400 pointer-events-none" />
          <input
            id="menu-search-input"
            type="text"
            aria-label="Search pizza and fast food items by name"
            placeholder="Search pizza or fast food by name (e.g. Tikka, Zinger, Broast, Fries)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] rounded-2xl text-[#1f0b0f] dark:text-white placeholder-[#804a55] dark:placeholder-stone-500 shadow-xs sm:shadow-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 sm:top-2.5 p-1 rounded-full text-[#804a55] hover:text-red-600 dark:text-stone-400 dark:hover:text-white transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Full-Width Sliding Category Carousel with Left/Right Arrows */}
        <LayoutGroup id="menu-category-tabs">
          <div className="w-full flex items-center gap-1.5 sm:gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleArrowStep(-1)}
              aria-label="Previous food category"
              className="w-9 h-10 sm:w-11 sm:h-12 rounded-xl flex items-center justify-center bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-[#f4cdd4] hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 shadow-xs transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            <div
              ref={trackRef}
              className="flex-1 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-0.5"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id && !trimmedQuery;

                return (
                  <motion.button
                    key={cat.id}
                    ref={(el) => {
                      tabRefs.current[cat.id] = el;
                    }}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 26,
                    }}
                    className={`relative flex-1 min-w-[144px] sm:min-w-[195px] lg:min-w-[235px] flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 border transition-colors duration-200 ${
                      isActive
                        ? 'text-white border-amber-400 shadow-md shadow-red-950/25'
                        : 'bg-white dark:bg-[#1a0b0e] text-[#522730] dark:text-[#f4cdd4] hover:bg-[#fff0ec] dark:hover:bg-[#281116] border-[#fbdad2] dark:border-[#3b171f] hover:border-red-400/60'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeCategoryPill"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 28,
                        }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#c8102e] to-rose-600 ring-1 ring-amber-400/70 shadow-inner"
                      />
                    )}

                    <span className="relative z-10 text-sm sm:text-base shrink-0">{cat.icon}</span>
                    <span className="relative z-10">{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleArrowStep(1)}
              aria-label="Next food category"
              className="w-9 h-10 sm:w-11 sm:h-12 rounded-xl flex items-center justify-center bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-[#f4cdd4] hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 shadow-xs transition-colors shrink-0"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </LayoutGroup>
      </div>

      {/* Section Sub-Header */}
      <div className="flex items-center justify-between gap-2 pb-3 sm:pb-4 mb-4 border-b border-[#fbdad2]/60 dark:border-[#3b171f]/80">
        <div className="flex items-center gap-2 min-w-0">
          <Flame className="w-4 h-4 text-red-600 shrink-0" />
          <h2 className="text-base sm:text-xl font-black text-[#1f0b0f] dark:text-white tracking-tight truncate">
            {trimmedQuery
              ? `Search Results for "${searchQuery.trim()}"`
              : CATEGORIES.find((c) => c.id === activeCategory)?.label || 'Royal Menu'}
          </h2>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          {trimmedQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[11px] sm:text-xs font-bold text-red-600 dark:text-amber-400 hover:underline whitespace-nowrap"
            >
              Clear search
            </button>
          )}
          <span className="text-[11px] sm:text-xs font-bold text-[#804a55] dark:text-stone-400 tabular-nums whitespace-nowrap">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Menu Cards Grid - Smooth Category Switch Animation & 2 Columns on Mobile */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-14 px-4 bg-[#fff0ec] dark:bg-[#170b0e] rounded-2xl border border-[#fbdad2] dark:border-[#3b171f] space-y-3">
          <p className="text-[#522730] dark:text-stone-300 text-xs sm:text-sm font-semibold">
            No pizza or fast food items matched &ldquo;{searchQuery.trim()}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Search</span>
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={trimmedQuery ? 'search-results' : activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 lg:gap-8"
          >
            {filteredItems.map((item) => {
              const cartQty = cart
                .filter((ci) => ci.menuItem.id === item.id)
                .reduce((sum, ci) => sum + ci.quantity, 0);
              const isAdded = cartQty > 0;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] shadow-xs sm:shadow-sm hover:shadow-xl dark:shadow-none hover:border-red-500/60 transition-all duration-300"
                >
                  {/* Product Image Box */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                    <img
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
                      <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-600/90 text-white font-bold text-[9px] sm:text-[11px] shadow-md backdrop-blur-sm">
                        {item.tag}
                      </div>
                    )}

                    {/* Category label */}
                    <div className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 px-1.5 py-0.5 rounded bg-black/80 text-amber-400 font-semibold text-[8px] sm:text-[10px] backdrop-blur-sm border border-stone-800">
                      {item.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-2 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between space-y-1.5 sm:space-y-3">
                    <div>
                      <h3 className="text-xs sm:text-base font-bold text-[#1f0b0f] dark:text-[#fff1f3] group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 sm:line-clamp-2 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-[#522730] dark:text-[#f4cdd4] mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-1.5 sm:pt-3 border-t border-[#fbdad2]/70 dark:border-[#3b171f]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                      <div className="flex items-baseline justify-between sm:justify-start gap-1">
                        <span className="text-xs sm:text-base font-black text-red-700 dark:text-amber-400 tabular-nums">
                          Rs. {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[9px] sm:text-[11px] text-stone-400 line-through tabular-nums">
                            Rs. {formatPrice(item.originalPrice)}
                          </span>
                        )}
                        {item.sizes && item.sizes.length > 1 && (
                          <span className="text-[9px] text-[#804a55] dark:text-stone-400 hidden sm:inline ml-1">
                            Sizes
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 sm:gap-1.5 w-full sm:w-auto">
                        {/* Customize Button */}
                        <button
                          onClick={() => setCustomizingItem(item)}
                          className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-[#f4cdd4] hover:text-red-600 dark:hover:text-amber-400 bg-[#fff0ec] dark:bg-[#1a0b0e] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] transition-colors shrink-0"
                          title="Customize portion & spice"
                          aria-label="Customize portion and spice"
                        >
                          <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>

                        {/* Quick Add / Added Green Indicator Button */}
                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          onClick={(e) => handleQuickAdd(item, e)}
                          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs text-white shadow-xs sm:shadow-md transition-all duration-300 ${
                            isAdded
                              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/20'
                              : 'bg-red-600 hover:bg-red-500 shadow-red-950/20'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                              <span>Added{cartQty > 1 ? ` (${cartQty})` : ''}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                              <span>Add</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Item Customization Modal - Mounted conditionally to guarantee React Hook ordering */}
      {customizingItem && (
        <CustomizeModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
        />
      )}
    </section>
  );
};
