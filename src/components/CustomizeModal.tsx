import React, { useState } from 'react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';

interface CustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();

  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState(
    item.sizes && item.sizes.length > 0 ? item.sizes[1] || item.sizes[0] : undefined
  );
  const [selectedSpice, setSelectedSpice] = useState(
    item.spiceLevels && item.spiceLevels.length > 0 ? item.spiceLevels[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const basePrice = selectedSize ? selectedSize.price : item.price;
  const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + addonsPrice;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon: { name: string; price: number }) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const modalImg = document.querySelector('.animate-fadeIn img');
    addToCart(item, {
      size: selectedSize,
      spice: selectedSpice,
      addons: selectedAddons,
      quantity,
      instructions,
      sourceElement: (modalImg as HTMLElement) || e.currentTarget,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-stone-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/20 backdrop-blur-md"
            aria-label="Close customization"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {item.category.toUpperCase()}
            </span>
            <h3 className="text-xl font-black text-white">{item.name}</h3>
          </div>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <p className="text-xs text-[#522730] dark:text-stone-400 leading-relaxed">{item.description}</p>

          {/* Sizes Option */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1f0b0f] dark:text-stone-200 uppercase tracking-wider">
                  Select Size / Portion:
                </label>
                <span className="text-[11px] text-[#804a55] dark:text-stone-500">Required</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {item.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      selectedSize?.name === s.name
                        ? 'bg-rose-100 dark:bg-red-950/70 border-red-500 text-red-950 dark:text-white shadow-xs font-bold'
                        : 'bg-white dark:bg-[#0d0608] border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-stone-300 hover:border-red-400'
                    }`}
                  >
                    <span>{s.name}</span>
                    <span className="text-red-700 dark:text-amber-400 font-bold tabular-nums">Rs. {s.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level Option */}
          {item.spiceLevels && item.spiceLevels.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#1f0b0f] dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-600" />
                Spice Level:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {item.spiceLevels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSpice(lvl)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      selectedSpice === lvl
                        ? 'bg-amber-100 dark:bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-300 font-bold'
                        : 'bg-white dark:bg-[#0d0608] border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-stone-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Addons */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#1f0b0f] dark:text-stone-200 uppercase tracking-wider">
                Extra Add-ons & Sauces:
              </label>
              <div className="space-y-2">
                {item.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.name === addon.name);
                  return (
                    <button
                      key={addon.name}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                        isChecked
                          ? 'bg-rose-100 dark:bg-[#1f0c11] border-red-500 text-red-950 dark:text-white font-semibold'
                          : 'bg-white dark:bg-[#0d0608] border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-stone-300 hover:bg-[#fff0ec] dark:hover:bg-[#1a0b0e]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'border-stone-300 dark:border-stone-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </span>
                        <span>{addon.name}</span>
                      </div>
                      <span className="text-red-700 dark:text-amber-400 font-bold tabular-nums">
                        +Rs. {addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#804a55] dark:text-stone-400">
              Kitchen Notes (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g., Less spicy, extra crispy, sauce on the side"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 placeholder-[#804a55] dark:placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Modal Footer with Quantity and Add Button */}
        <div className="p-4 bg-[#fff0ec] dark:bg-[#0d0608] border-t border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[#fbdad2] dark:border-[#3b171f] rounded-xl bg-white dark:bg-[#170b0e] p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 rounded-lg hover:bg-[#fff0ec] dark:hover:bg-stone-800 text-[#522730] dark:text-stone-400"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-[#1f0b0f] dark:text-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-lg hover:bg-[#fff0ec] dark:hover:bg-stone-800 text-[#522730] dark:text-stone-400"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-between px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-lg shadow-red-950/30 transition-all hover:scale-102"
          >
            <span>Add to Cart</span>
            <span className="font-extrabold text-amber-300 tabular-nums">
              Rs. {totalPrice}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
