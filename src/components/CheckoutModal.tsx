import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';
import { X, MapPin, Phone, User, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    subtotal,
    deliveryFee,
    discount,
    total,
    selectedArea,
    customAddress,
    customDistanceKm,
    placeOrder,
  } = useCart();

  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || 'Prince Customer');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '0312-2274688');
  const [deliveryAddress, setDeliveryAddress] = useState(
    customAddress || (selectedArea ? `${selectedArea.name}, Karachi` : 'Surjani Town, Karachi')
  );
  const [paymentMethod, setPaymentMethod] = useState<
    'Cash on Delivery (COD)' | 'Online Bank Transfer / JazzCash / EasyPaisa'
  >('Cash on Delivery (COD)');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutModalOpen) return null;

  const effectiveDistance = customDistanceKm !== null ? customDistanceKm : (selectedArea?.distanceKm || 2.0);

  const handleConfirmOrder = (viaWhatsApp: boolean = false) => {
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setErrorMsg('Please enter a valid active phone number.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setErrorMsg('Please enter delivery address.');
      return;
    }

    setErrorMsg('');

    // Place order in state
    const createdOrder = placeOrder({
      customerName,
      customerPhone,
      deliveryAddress,
      paymentMethod,
      notes,
    });

    if (viaWhatsApp) {
      const itemsList = createdOrder.items
        .map(
          (i, idx) =>
            `${idx + 1}. *${i.menuItem.name}* (${i.selectedSize?.name || 'Standard'}) x ${i.quantity} = Rs. ${i.totalPrice}${
              i.selectedSpice ? ` [Spice: ${i.selectedSpice}]` : ''
            }`
        )
        .join('\n');

      const text = `👑 *NEW ORDER - PIZZA PRINCE SURJANI TOWN*\n\n` +
        `*Order ID:* ${createdOrder.id}\n` +
        `*Customer Name:* ${createdOrder.customerName}\n` +
        `*Phone:* ${createdOrder.customerPhone}\n\n` +
        `*Delivery Address:* ${createdOrder.deliveryAddress}\n` +
        `*Area:* ${createdOrder.deliveryArea}\n` +
        `*Distance from Surjani ST 1:* ${createdOrder.distanceKm} km\n\n` +
        `*Items Ordered:*\n${itemsList}\n\n` +
        `*Subtotal:* Rs. ${createdOrder.subtotal}\n` +
        `*Delivery Fee:* Rs. ${createdOrder.deliveryFee}\n` +
        (createdOrder.discount > 0 ? `*Discount:* -Rs. ${createdOrder.discount}\n` : '') +
        `*Total Amount:* Rs. ${createdOrder.total}\n` +
        `*Payment Method:* ${createdOrder.paymentMethod}\n` +
        (notes ? `*Special Notes:* ${notes}\n` : '') +
        `\nThank you for choosing Pizza Prince! 🍕`;

      const waUrl = `https://wa.me/923122274688?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-300">
        {/* Header */}
        <div className="p-5 bg-[#fff0ec] dark:bg-[#170b0e] border-b border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/public/assets/aistudio/Logo_dc615caa.jpg"
              alt="Pizza Prince Logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400 shrink-0 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-[#1f0b0f] dark:text-white">Checkout & Delivery Details</h3>
              <p className="text-xs text-[#804a55] dark:text-stone-400">
                Surjani Town ST 1 Kitchen Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-2 rounded-lg text-[#804a55] hover:text-black dark:text-stone-400 dark:hover:text-white hover:bg-[#ffe6e0] dark:hover:bg-stone-800"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 text-xs text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800/60 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#522730] dark:text-stone-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                Customer Full Name:
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#522730] dark:text-stone-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Contact Phone / WhatsApp:
              </label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0312-XXXXXXX"
                className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#522730] dark:text-stone-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Complete Street Address & Landmark:
            </label>
            <textarea
              rows={2}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="e.g. House # 14, Street 3, Sector 1-B, near 4K Chowrangi, Surjani Town"
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Distance & Delivery Fee Calculation Box */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#522730] dark:text-stone-300">
              <span>Origin Restaurant Branch:</span>
              <span className="text-red-700 dark:text-amber-400 font-bold">ST 1, Sector 1 Surjani Town</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#804a55] dark:text-stone-400">
              <span>Calculated GPS Distance:</span>
              <span className="font-bold text-[#1f0b0f] dark:text-white tabular-nums">~{effectiveDistance} km</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#804a55] dark:text-stone-400">
              <span>Delivery Rate Rule:</span>
              <span className="text-[#522730] dark:text-stone-300 text-[11px]">
                4K Chowrangi Base (Rs. 100) + Distance Scale
              </span>
            </div>
            <div className="pt-2 border-t border-[#fbdad2]/60 dark:border-[#3b171f]/80 flex items-center justify-between text-xs font-bold">
              <span className="text-[#1f0b0f] dark:text-stone-300">Calculated Delivery Fee:</span>
              <span className="text-red-700 dark:text-amber-400 tabular-nums">Rs. {deliveryFee}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#522730] dark:text-stone-300">Payment Option:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  paymentMethod === 'Cash on Delivery (COD)'
                    ? 'bg-rose-100 dark:bg-red-950/70 border-red-500 text-[#1f0b0f] dark:text-white'
                    : 'bg-white dark:bg-[#0d0608] border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-stone-400'
                }`}
              >
                <p className="font-bold">Cash on Delivery (COD)</p>
                <p className="text-[11px] text-[#804a55] dark:text-stone-400 mt-0.5">Pay with cash when rider arrives</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Online Bank Transfer / JazzCash / EasyPaisa')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  paymentMethod === 'Online Bank Transfer / JazzCash / EasyPaisa'
                    ? 'bg-rose-100 dark:bg-red-950/70 border-red-500 text-[#1f0b0f] dark:text-white'
                    : 'bg-white dark:bg-[#0d0608] border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-stone-400'
                }`}
              >
                <p className="font-bold">JazzCash / EasyPaisa / Bank</p>
                <p className="text-[11px] text-[#804a55] dark:text-stone-400 mt-0.5">Direct screenshot confirmation</p>
              </button>
            </div>
          </div>

          {/* Special Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#804a55] dark:text-stone-400">
              Delivery Instructions for Rider:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Ring the bell twice, gate is green color"
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 placeholder-[#804a55] dark:placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Order Bill Summary */}
          <div className="p-4 rounded-xl bg-[#fff0ec] dark:bg-[#0d0608]/90 border border-[#fbdad2] dark:border-[#3b171f] text-xs space-y-1.5">
            <div className="flex justify-between text-[#522730] dark:text-stone-400">
              <span>Items Total ({cart.reduce((a, b) => a + b.quantity, 0)} items):</span>
              <span className="text-[#1f0b0f] dark:text-stone-200 font-semibold tabular-nums">Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-[#522730] dark:text-stone-400">
              <span>Delivery Charges ({effectiveDistance} km):</span>
              <span className="text-[#1f0b0f] dark:text-stone-200 font-semibold tabular-nums">Rs. {deliveryFee}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Family Promotion Discount:</span>
                <span className="tabular-nums">-Rs. {discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#fbdad2] dark:border-[#3b171f] flex justify-between text-sm font-black text-[#1f0b0f] dark:text-white">
              <span>Total Payable Amount:</span>
              <span className="text-red-700 dark:text-amber-400 text-base tabular-nums">Rs. {total}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer with Two Confirmation Buttons */}
        <div className="p-4 bg-[#fff0ec] dark:bg-[#0d0608] border-t border-[#fbdad2] dark:border-[#3b171f] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => handleConfirmOrder(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/20 hover:scale-102 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send on WhatsApp (0312-2274688)</span>
          </button>

          <button
            onClick={() => handleConfirmOrder(false)}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-lg shadow-red-950/40 hover:scale-102 transition-all"
          >
            <span>Confirm Order & Track Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};
