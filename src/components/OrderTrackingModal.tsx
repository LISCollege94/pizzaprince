import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';
import { X, CheckCircle, MapPin, Phone, MessageCircle, Bike } from 'lucide-react';
import { Order } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingModalOpen, setIsTrackingModalOpen, activeTrackingOrder, orders } = useCart();

  const order: Order | undefined = activeTrackingOrder || orders[0];
  const [stepIndex, setStepIndex] = useState(2);

  useEffect(() => {
    if (!order) return;
    if (order.status === 'confirmed') setStepIndex(0);
    else if (order.status === 'baking' || order.status === 'preparing') setStepIndex(1);
    else if (order.status === 'dispatched') setStepIndex(2);
    else if (order.status === 'delivered') setStepIndex(3);
  }, [order]);

  if (!isTrackingModalOpen || !order) return null;

  const STEPS = [
    { title: 'Order Confirmed', time: 'Received at Surjani Kitchen', desc: 'Order sent to chef pass' },
    { title: 'Baking in Stone Oven', time: '10-15 mins', desc: 'Handcrafted dough & toppings' },
    { title: 'Out for Delivery', time: 'Rider on scooter', desc: 'Dispatched from Surjani ST 1' },
    { title: 'Delivered', time: 'Enjoy Royal Feast', desc: 'Delivered at doorstep' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-300">
        {/* Header */}
        <div className="p-5 bg-[#fff0ec] dark:bg-[#170b0e] border-b border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/public/assets/aistudio/Logo_dc615caa.jpg"
              alt="Pizza Prince Logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400 shrink-0 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1f0b0f] dark:text-white">Live Order Tracking</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-stone-800 text-red-700 dark:text-amber-400 border border-[#fbdad2] dark:border-stone-700 font-bold">
                  {order.id}
                </span>
              </div>
              <p className="text-xs text-[#804a55] dark:text-stone-400">
                {order.estimatedDeliveryTime} · {order.deliveryArea}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="p-2 rounded-lg text-[#804a55] hover:text-black dark:text-stone-400 dark:hover:text-white hover:bg-[#ffe6e0] dark:hover:bg-stone-800"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Simulated Live Route Map View */}
          <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-[#fbdad2] dark:border-stone-800 bg-[#fff0ec] dark:bg-stone-950">
            <div className="absolute inset-0 bg-[radial-gradient(#c8102e_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-25 dark:opacity-40" />

            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 60 140 Q 180 80 320 120 T 520 70"
                fill="none"
                stroke="#fbdad2"
                strokeWidth="8"
                strokeLinecap="round"
                className="dark:stroke-stone-700"
              />
              <path
                d="M 60 140 Q 180 80 320 120 T 520 70"
                fill="none"
                stroke="#dc2626"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>

            {/* Origin Pin */}
            <div className="absolute left-6 bottom-6 flex items-center gap-2 bg-white/95 dark:bg-stone-900/90 border border-[#fbdad2] dark:border-stone-700 px-3 py-1.5 rounded-xl shadow-md">
              <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
              <div>
                <p className="text-[10px] uppercase font-bold text-[#804a55] dark:text-stone-400">Origin</p>
                <p className="text-xs font-black text-[#1f0b0f] dark:text-white">Pizza Prince ST 1</p>
              </div>
            </div>

            {/* Scooter In-Transit Marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="p-2.5 rounded-full bg-amber-400 text-stone-950 shadow-xl shadow-amber-500/40 border-2 border-white animate-bounce">
                <Bike className="w-5 h-5" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-300 border border-stone-700 whitespace-nowrap">
                Rider en route (~{order.distanceKm} km)
              </span>
            </div>

            {/* Destination Pin */}
            <div className="absolute right-6 top-6 flex items-center gap-2 bg-white/95 dark:bg-stone-900/90 border border-amber-500/50 px-3 py-1.5 rounded-xl shadow-md">
              <MapPin className="w-4 h-4 text-amber-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-[#804a55] dark:text-stone-400">Destination</p>
                <p className="text-xs font-black text-red-700 dark:text-amber-300 truncate max-w-[140px]">
                  {order.deliveryArea}
                </p>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {STEPS.map((step, idx) => {
              const isDone = idx <= stepIndex;
              const isCurrent = idx === stepIndex;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isDone
                        ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                        : 'bg-[#fff0ec] dark:bg-stone-800 text-[#804a55] dark:text-stone-500 border border-[#fbdad2] dark:border-transparent'
                    } ${isCurrent ? 'ring-4 ring-amber-400/50' : ''}`}
                  >
                    {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                  </div>
                  <p
                    className={`text-xs font-bold ${
                      isDone ? 'text-[#1f0b0f] dark:text-stone-100' : 'text-[#804a55] dark:text-stone-500'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-[10px] text-[#804a55] dark:text-stone-400 hidden sm:block">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Rider Details & WhatsApp Help */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#fff0ec] dark:bg-stone-800 border border-[#fbdad2] dark:border-stone-700 flex items-center justify-center text-xl">
                🛵
              </div>
              <div>
                <p className="text-xs text-[#804a55] dark:text-stone-400">Assigned Delivery Rider</p>
                <p className="text-sm font-bold text-[#1f0b0f] dark:text-stone-100">
                  {order.riderName || 'Pizza Prince Fast Fleet'}
                </p>
                <p className="text-xs text-red-700 dark:text-amber-400 font-semibold">
                  Branch Contact: {RESTAURANT_LOCATION.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/923122274688?text=${encodeURIComponent(
                  `Hi Pizza Prince, checking status for Order ID: ${order.id} in ${order.deliveryArea}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Rider</span>
              </a>

              <a
                href={`tel:${RESTAURANT_LOCATION.phone}`}
                className="flex items-center justify-center p-2.5 rounded-xl border border-[#fbdad2] dark:border-stone-800 text-[#522730] dark:text-stone-300 hover:text-black dark:hover:text-white bg-[#fff0ec] dark:bg-stone-900"
                title="Call Branch"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Order Summary Details */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#0d0608]/70 border border-[#fbdad2] dark:border-[#3b171f] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f0b0f] dark:text-stone-300">
              Receipt Breakdown
            </h4>

            <div className="space-y-2 text-xs divide-y divide-[#fbdad2]/60 dark:divide-stone-800/80">
              {order.items.map((i, idx) => (
                <div key={idx} className="pt-2 flex justify-between text-[#522730] dark:text-stone-300">
                  <div>
                    <span className="font-bold text-[#1f0b0f] dark:text-white">{i.menuItem.name}</span>
                    <span className="text-[#804a55] dark:text-stone-500 ml-1.5">
                      ({i.selectedSize?.name || 'Standard'}) x {i.quantity}
                    </span>
                  </div>
                  <span className="tabular-nums font-bold">Rs. {i.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#fbdad2] dark:border-[#3b171f] space-y-1 text-xs">
              <div className="flex justify-between text-[#804a55] dark:text-stone-400">
                <span>Delivery Distance:</span>
                <span className="text-[#1f0b0f] dark:text-stone-200">~{order.distanceKm} km from Surjani</span>
              </div>
              <div className="flex justify-between text-[#804a55] dark:text-stone-400">
                <span>Delivery Fee:</span>
                <span className="text-[#1f0b0f] dark:text-stone-200">Rs. {order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-[#804a55] dark:text-stone-400">
                <span>Payment Mode:</span>
                <span className="text-red-700 dark:text-amber-400 font-bold">{order.paymentMethod}</span>
              </div>
              <div className="pt-2 border-t border-[#fbdad2] dark:border-[#3b171f] flex justify-between text-sm font-bold text-[#1f0b0f] dark:text-white">
                <span>Total Amount:</span>
                <span className="text-red-700 dark:text-amber-400 text-base tabular-nums">Rs. {order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fff0ec] dark:bg-[#0d0608] border-t border-[#fbdad2] dark:border-[#3b171f] flex justify-end">
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
