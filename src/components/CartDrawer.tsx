import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, MapPin, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    selectedArea,
    customDistanceKm,
    deliveryFee,
    subtotal,
    discount,
    total,
    setIsLocationModalOpen,
    setIsCheckoutModalOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const effectiveDistance = customDistanceKm !== null ? customDistanceKm : (selectedArea?.distanceKm || 2.0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-[#fff7f5] dark:bg-[#0d0608] text-[#1f0b0f] dark:text-stone-100 border-l border-[#fbdad2] dark:border-[#3b171f] flex flex-col shadow-2xl animate-slideLeft transition-colors duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between bg-[#fff0ec] dark:bg-[#170b0e]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400">
              <ShoppingBag className="w-5 h-5 text-red-600" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1f0b0f] dark:text-white">Your Royal Bag</h3>
              <p className="text-xs text-[#804a55] dark:text-stone-400">
                {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-[#804a55] hover:text-[#1f0b0f] dark:text-stone-400 dark:hover:text-white hover:bg-[#ffe6e0] dark:hover:bg-stone-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Location Banner inside Cart */}
        <div className="p-3.5 bg-white/70 dark:bg-[#170b0e]/40 border-b border-[#fbdad2] dark:border-[#3b171f]/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#522730] dark:text-stone-300 truncate">
            <MapPin className="w-4 h-4 text-red-600 shrink-0" />
            <div className="truncate">
              <p className="font-bold truncate text-[#1f0b0f] dark:text-white">
                {selectedArea ? selectedArea.name : 'Surjani Town / 4K Chowrangi'}
              </p>
              <p className="text-[11px] text-[#804a55] dark:text-stone-500">
                ~{effectiveDistance} km from ST 1 Surjani branch
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="text-xs font-bold text-red-700 dark:text-amber-400 hover:underline shrink-0 ml-2"
          >
            Change Area
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <span className="text-4xl">🍕</span>
              <p className="text-[#1f0b0f] dark:text-stone-300 font-bold text-base">Your bag is empty</p>
              <p className="text-xs text-[#804a55] dark:text-stone-500 max-w-xs">
                Explore our signature Crown Crust pizzas, crispy zingers, and loaded fries!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-3 px-5 py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-950/20"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="p-3.5 rounded-xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] flex gap-3 text-xs shadow-xs"
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 bg-stone-950"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-[#1f0b0f] dark:text-stone-200">{item.menuItem.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-[#804a55] hover:text-red-600 dark:text-stone-500 dark:hover:text-red-400 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variant metadata */}
                    <div className="text-[11px] text-[#522730] dark:text-stone-400 space-y-0.5 mt-0.5">
                      {item.selectedSize && <div>Size: {item.selectedSize.name}</div>}
                      {item.selectedSpice && <div>Spice: {item.selectedSpice}</div>}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <div>
                          Addons: {item.selectedAddons.map((a) => a.name).join(', ')}
                        </div>
                      )}
                      {item.specialInstructions && (
                        <div className="italic text-[#804a55] dark:text-stone-500 truncate">
                          "{item.specialInstructions}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#fbdad2]/60 dark:border-[#3b171f]/60 mt-1">
                    <div className="flex items-center border border-[#fbdad2] dark:border-[#3b171f] rounded-lg bg-[#fff0ec] dark:bg-[#0d0608] px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="p-1 text-[#522730] dark:text-stone-400 hover:text-black dark:hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-[#1f0b0f] dark:text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="p-1 text-[#522730] dark:text-stone-400 hover:text-black dark:hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-red-700 dark:text-amber-400 tabular-nums">
                      Rs. {item.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Distance-Based Delivery Fee Calculation */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#fbdad2] dark:border-[#3b171f] bg-[#fff0ec] dark:bg-[#14080b] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#522730] dark:text-stone-400">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1f0b0f] dark:text-stone-200 tabular-nums">Rs. {subtotal}</span>
              </div>

              {/* Delivery fee calculated automatically by distance */}
              <div className="flex justify-between text-[#522730] dark:text-stone-400">
                <span className="flex items-center gap-1">
                  <span>Delivery ({effectiveDistance} km)</span>
                  <span className="text-[10px] text-[#804a55] dark:text-stone-500">
                    (4K Chowrangi base Rs. 100)
                  </span>
                </span>
                <span className="font-semibold text-[#1f0b0f] dark:text-stone-200 tabular-nums">
                  Rs. {deliveryFee}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Royal Family Discount (Subtotal ≥ Rs. 3000)</span>
                  <span className="tabular-nums">-Rs. {discount}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#fbdad2] dark:border-[#3b171f] flex justify-between text-sm font-black text-[#1f0b0f] dark:text-white">
                <span>Grand Total</span>
                <span className="text-red-700 dark:text-amber-400 text-base tabular-nums">Rs. {total}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearCart}
                className="px-3 py-3 rounded-xl border border-[#fbdad2] dark:border-[#3b171f] text-[#804a55] dark:text-stone-400 hover:text-black dark:hover:text-stone-200 text-xs font-semibold bg-white dark:bg-transparent"
                title="Clear all items"
              >
                Clear
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutModalOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-lg shadow-red-950/30 hover:scale-102 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#804a55] dark:text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Cash on Delivery (COD) & Online Transfer Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
