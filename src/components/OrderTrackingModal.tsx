import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';
import {
  X,
  CheckCircle,
  MapPin,
  Phone,
  MessageCircle,
  Bike,
  Flame,
  ClipboardCheck,
  PackageCheck,
  RotateCcw,
} from 'lucide-react';
import { Order } from '../types';
import { ASSETS } from '../constants/assets';
import { formatPrice } from '../utils/format';

const TRACKING_STEPS = [
  {
    id: 'confirmed',
    title: 'Confirmed',
    subtitle: 'Order sent to Surjani kitchen',
    etaText: 'Order Received',
    icon: ClipboardCheck,
    mapProgress: 12,
  },
  {
    id: 'cooking',
    title: 'Cooking',
    subtitle: 'Baking fresh in stone oven',
    etaText: 'Chef Preparing (~12 mins)',
    icon: Flame,
    mapProgress: 36,
  },
  {
    id: 'out-for-delivery',
    title: 'Out for Delivery',
    subtitle: 'Dispatched from Surjani ST 1',
    etaText: 'Rider En Route',
    icon: Bike,
    mapProgress: 68,
  },
  {
    id: 'delivered',
    title: 'Delivered',
    subtitle: 'Enjoy your royal feast',
    etaText: 'Delivered at Doorstep',
    icon: PackageCheck,
    mapProgress: 90,
  },
];

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingModalOpen, setIsTrackingModalOpen, activeTrackingOrder, orders } = useCart();

  const order: Order | undefined = activeTrackingOrder || orders[0];
  const [stepIndex, setStepIndex] = useState(1);
  const [isLiveSimulating, setIsLiveSimulating] = useState(false);

  useEffect(() => {
    if (!order || !isTrackingModalOpen) {
      setIsLiveSimulating(false);
      return;
    }

    if (order.status === 'confirmed') {
      setStepIndex(0);
      setIsLiveSimulating(true);
    } else if (order.status === 'baking' || order.status === 'preparing') {
      setStepIndex(1);
      setIsLiveSimulating(true);
    } else if (order.status === 'dispatched') {
      setStepIndex(2);
      setIsLiveSimulating(false);
    } else if (order.status === 'delivered') {
      setStepIndex(3);
      setIsLiveSimulating(false);
    }
  }, [order, isTrackingModalOpen]);

  // Smoothly animate through stages automatically when live simulation is active
  useEffect(() => {
    if (!isTrackingModalOpen || !isLiveSimulating) return;
    if (stepIndex >= TRACKING_STEPS.length - 1) {
      setIsLiveSimulating(false);
      return;
    }

    const timer = setTimeout(() => {
      setStepIndex((prev) => Math.min(prev + 1, TRACKING_STEPS.length - 1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [isTrackingModalOpen, isLiveSimulating, stepIndex]);

  if (!isTrackingModalOpen || !order) return null;

  const currentStep = TRACKING_STEPS[stepIndex] || TRACKING_STEPS[0];
  const progressPercent = (stepIndex / (TRACKING_STEPS.length - 1)) * 100;

  const handleReplayStages = () => {
    setStepIndex(0);
    setIsLiveSimulating(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-300">
        {/* Header */}
        <div className="p-5 bg-[#fff0ec] dark:bg-[#170b0e] border-b border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.logo}
              onError={(e) => {
                e.currentTarget.src = '/assets/aistudio/Logo_dc615caa.jpg';
              }}
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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Simulated Live Route Map View */}
          <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-[#fbdad2] dark:border-stone-800 bg-[#fff0ec] dark:bg-stone-950">
            <div className="absolute inset-0 bg-[radial-gradient(#c8102e_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-25 dark:opacity-40" />

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <path
                d="M 60 140 Q 200 65 330 115 T 535 65"
                fill="none"
                stroke="#fbdad2"
                strokeWidth="8"
                strokeLinecap="round"
                className="dark:stroke-stone-800"
              />
              <motion.path
                d="M 60 140 Q 200 65 330 115 T 535 65"
                fill="none"
                stroke="#dc2626"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0.1 }}
                animate={{ pathLength: Math.max(0.12, (stepIndex + 0.35) / TRACKING_STEPS.length) }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            {/* Origin Pin */}
            <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-5 flex items-center gap-2 bg-white/95 dark:bg-stone-900/90 border border-[#fbdad2] dark:border-stone-700 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-[#804a55] dark:text-stone-400">Origin</p>
                <p className="text-[11px] sm:text-xs font-black text-[#1f0b0f] dark:text-white">Pizza Prince ST 1</p>
              </div>
            </div>

            {/* Animated Courier / Stage Marker synchronized with Progress Bar */}
            <motion.div
              animate={{
                left: `${currentStep.mapProgress}%`,
                top: stepIndex === 0 ? '62%' : stepIndex === 1 ? '44%' : stepIndex === 2 ? '50%' : '32%',
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none"
            >
              <motion.div
                animate={stepIndex < 3 ? { y: [0, -4, 0] } : { scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className={`p-2.5 rounded-full shadow-xl border-2 border-white ${
                  stepIndex === 3
                    ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                    : stepIndex === 1
                    ? 'bg-red-600 text-white shadow-red-600/40'
                    : 'bg-amber-400 text-stone-950 shadow-amber-500/40'
                }`}
              >
                {stepIndex === 1 ? (
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : stepIndex === 3 ? (
                  <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Bike className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.div>
              <span className="mt-1 px-2 py-0.5 rounded bg-black/85 text-[10px] font-bold text-amber-300 border border-stone-700 whitespace-nowrap shadow">
                {currentStep.title} · ~{order.distanceKm} km
              </span>
            </motion.div>

            {/* Destination Pin */}
            <div className="absolute right-4 sm:right-6 top-4 sm:top-5 flex items-center gap-2 bg-white/95 dark:bg-stone-900/90 border border-amber-500/50 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-[#804a55] dark:text-stone-400">Destination</p>
                <p className="text-[11px] sm:text-xs font-black text-red-700 dark:text-amber-300 truncate max-w-[120px] sm:max-w-[140px]">
                  {order.deliveryArea}
                </p>
              </div>
            </div>
          </div>

          {/* Framer Motion Animated Stage Progress Section */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f] shadow-xs space-y-5">
            {/* Active Stage Headline & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-600/10 dark:bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-600 dark:text-amber-400 shrink-0">
                    <currentStep.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#1f0b0f] dark:text-white">
                        {currentStep.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-red-700 dark:text-amber-300 border border-amber-400/40">
                        {currentStep.etaText}
                      </span>
                    </div>
                    <p className="text-xs text-[#804a55] dark:text-stone-400">{currentStep.subtitle}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={handleReplayStages}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#fff0ec] dark:bg-[#230e13] hover:bg-[#ffe6e0] dark:hover:bg-[#31131a] text-[#522730] dark:text-amber-300 border border-[#fbdad2] dark:border-[#3b171f] transition-colors"
                title="Animate through all delivery stages"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isLiveSimulating ? 'Live Updating...' : 'Replay Stages'}</span>
              </button>
            </div>

            {/* Animated Progress Bar & Stepper Nodes */}
            <div className="relative pt-1">
              {/* Connecting Horizontal Progress Track */}
              <div className="relative h-2.5 w-full rounded-full bg-[#ffe6e0] dark:bg-[#2a1117] overflow-hidden mb-5 border border-[#fbdad2]/70 dark:border-[#3b171f]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 relative"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.max(8, progressPercent)}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Animated Shine / Pulse on leading edge */}
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="absolute right-0 top-0 bottom-0 w-3 bg-white/60 blur-[2px] rounded-full"
                  />
                </motion.div>
              </div>

              {/* Stage Stepper Nodes */}
              <div className="grid grid-cols-4 gap-2">
                {TRACKING_STEPS.map((step, idx) => {
                  const isDone = idx <= stepIndex;
                  const isCurrent = idx === stepIndex;
                  const StepIcon = step.icon;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        setIsLiveSimulating(false);
                        setStepIndex(idx);
                      }}
                      className="flex flex-col items-center text-center space-y-1.5 group focus:outline-none"
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isCurrent ? 1.12 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                          isDone
                            ? idx === 3 && isCurrent
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                              : 'bg-red-600 text-white shadow-md shadow-red-900/30'
                            : 'bg-[#fff0ec] dark:bg-stone-800 text-[#804a55] dark:text-stone-500 border border-[#fbdad2] dark:border-stone-700 group-hover:border-red-400'
                        } ${isCurrent ? 'ring-4 ring-amber-400/50' : ''}`}
                      >
                        {idx < stepIndex ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <StepIcon className="w-4 h-4" />
                        )}
                      </motion.div>
                      <p
                        className={`text-[11px] sm:text-xs font-bold leading-tight ${
                          isDone ? 'text-[#1f0b0f] dark:text-stone-100' : 'text-[#804a55] dark:text-stone-500'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] text-[#804a55] dark:text-stone-400 hidden sm:block leading-snug">
                        {step.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
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
                  <span className="tabular-nums font-bold">Rs. {formatPrice(i.totalPrice)}</span>
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
                <span className="text-[#1f0b0f] dark:text-stone-200">Rs. {formatPrice(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-[#804a55] dark:text-stone-400">
                <span>Payment Mode:</span>
                <span className="text-red-700 dark:text-amber-400 font-bold">{order.paymentMethod}</span>
              </div>
              <div className="pt-2 border-t border-[#fbdad2] dark:border-[#3b171f] flex justify-between text-sm font-bold text-[#1f0b0f] dark:text-white">
                <span>Total Amount:</span>
                <span className="text-red-700 dark:text-amber-400 text-base tabular-nums">Rs. {formatPrice(order.total)}</span>
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
