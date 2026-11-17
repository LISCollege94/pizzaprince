import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Clock,
  Receipt,
  MapPin,
  CreditCard,
  Compass,
  RotateCcw,
  Check,
  CheckCircle2,
  ChefHat,
  Bike,
  ShoppingBag,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { ASSETS } from '../constants/assets';
import { Order } from '../types';

type OrderFilter = 'all' | 'active' | 'delivered';

const STATUS_META: Record<
  Order['status'],
  { label: string; badgeClass: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  confirmed: {
    label: 'Confirmed',
    badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    Icon: CheckCircle2,
  },
  preparing: {
    label: 'Preparing',
    badgeClass: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800',
    Icon: ChefHat,
  },
  baking: {
    label: 'Baking',
    badgeClass: 'bg-rose-100 dark:bg-red-950/70 text-red-800 dark:text-red-300 border-rose-300 dark:border-red-800',
    Icon: ChefHat,
  },
  dispatched: {
    label: 'Out for Delivery',
    badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800',
    Icon: Bike,
  },
  delivered: {
    label: 'Delivered',
    badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    Icon: CheckCircle2,
  },
};

function formatOrderTimestamp(createdAt: number): string {
  try {
    return new Intl.DateTimeFormat('en-PK', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(createdAt));
  } catch {
    return new Date(createdAt).toLocaleString();
  }
}

const OrderHistoryModalInner: React.FC = () => {
  const { user, setIsOrderHistoryOpen, setIsAuthModalOpen } = useAuth();
  const {
    orders,
    addToCart,
    setActiveTrackingOrder,
    setIsTrackingModalOpen,
    setIsCartOpen,
  } = useCart();

  const [statusFilter, setStatusFilter] = useState<OrderFilter>('all');
  const [expandedOrderIds, setExpandedOrderIds] = useState<Record<string, boolean>>({});
  const [reorderedOrderId, setReorderedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOrderHistoryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOrderHistoryOpen]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => b.createdAt - a.createdAt);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'active') {
      return sortedOrders.filter((o) => o.status !== 'delivered');
    }
    if (statusFilter === 'delivered') {
      return sortedOrders.filter((o) => o.status === 'delivered');
    }
    return sortedOrders;
  }, [sortedOrders, statusFilter]);

  const activeCount = useMemo(
    () => sortedOrders.filter((o) => o.status !== 'delivered').length,
    [sortedOrders]
  );
  const deliveredCount = useMemo(
    () => sortedOrders.filter((o) => o.status === 'delivered').length,
    [sortedOrders]
  );

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderIds((prev) => ({
      ...prev,
      [orderId]: prev[orderId] === undefined ? false : !prev[orderId],
    }));
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.menuItem, {
        size: item.selectedSize,
        spice: item.selectedSpice,
        addons: item.selectedAddons,
        quantity: item.quantity,
        instructions: item.specialInstructions,
      });
    });
    setReorderedOrderId(order.id);
  };

  const handleTrackOrder = (order: Order) => {
    setActiveTrackingOrder(order);
    setIsOrderHistoryOpen(false);
    setIsTrackingModalOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-history-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOrderHistoryOpen(false);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-2xl rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 bg-[#fff0ec] dark:bg-[#170b0e] border-b border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {user ? (
              <img
                src={user.avatar}
                onError={(e) => {
                  e.currentTarget.src = ASSETS.logo;
                }}
                alt={user.name}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover ring-2 ring-amber-400 shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-600/15 dark:bg-red-950/60 border border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-center shrink-0">
                <Receipt className="w-5 h-5 text-red-600 dark:text-amber-400" />
              </div>
            )}

            <div className="min-w-0">
              <h2
                id="order-history-modal-title"
                className="text-base sm:text-lg font-black text-[#1f0b0f] dark:text-white tracking-tight truncate"
              >
                Past Orders &amp; Receipts
              </h2>
              <p className="text-[11px] sm:text-xs text-[#804a55] dark:text-stone-400 truncate">
                {user
                  ? `${user.name} · ${user.email}`
                  : 'Customer authentication required to view order history'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-2 rounded-xl text-[#804a55] hover:text-[#1f0b0f] dark:text-stone-400 dark:hover:text-white hover:bg-[#ffe6e0] dark:hover:bg-[#281116] transition-colors shrink-0"
            aria-label="Close past orders modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth-Gated Content */}
        {!user ? (
          <div className="p-6 sm:p-10 text-center space-y-5 flex-1 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#fff0ec] dark:bg-[#1a0b0e] border border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-center">
              <Lock className="w-6 h-6 text-red-600 dark:text-amber-400" />
            </div>

            <div className="space-y-2 max-w-sm">
              <h3 className="text-base sm:text-lg font-black text-[#1f0b0f] dark:text-white">
                Sign in to View Your Past Orders
              </h3>
              <p className="text-xs sm:text-sm text-[#522730] dark:text-stone-300 leading-relaxed">
                Access itemized receipts, order timestamps, live courier tracking, and 1-click reordering with your customer account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <span>Sign in with Google</span>
            </button>
          </div>
        ) : (
          <>
            {/* Filter Controls */}
            <div className="px-4 sm:px-6 py-3 bg-[#fff0ec]/60 dark:bg-[#0d0608] border-b border-[#fbdad2] dark:border-[#3b171f] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#170b0e] border border-[#fbdad2] dark:border-[#3b171f]">
                {(
                  [
                    { id: 'all', label: `All (${sortedOrders.length})` },
                    { id: 'active', label: `Active (${activeCount})` },
                    { id: 'delivered', label: `Delivered (${deliveredCount})` },
                  ] as { id: OrderFilter; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      statusFilter === tab.id
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-[#522730] dark:text-stone-300 hover:text-red-700 dark:hover:text-amber-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-semibold text-[#804a55] dark:text-stone-400 tabular-nums">
                {user.royaltyPoints} Royalty Points
              </span>
            </div>

            {/* Order History List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] space-y-3">
                  <ShoppingBag className="w-8 h-8 text-[#804a55] dark:text-stone-500 mx-auto" />
                  <p className="text-xs sm:text-sm font-semibold text-[#522730] dark:text-stone-300">
                    {statusFilter === 'all'
                      ? 'You have not placed any orders yet.'
                      : `No ${statusFilter} orders found in your history.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (statusFilter !== 'all') {
                        setStatusFilter('all');
                      } else {
                        setIsOrderHistoryOpen(false);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
                  >
                    {statusFilter !== 'all' ? 'Show All Orders' : 'Browse Menu'}
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {filteredOrders.map((order) => {
                    const statusInfo = STATUS_META[order.status] || STATUS_META.confirmed;
                    const StatusIcon = statusInfo.Icon;
                    const isExpanded = expandedOrderIds[order.id] ?? true;
                    const wasReordered = reorderedOrderId === order.id;

                    return (
                      <motion.article
                        key={order.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="rounded-2xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] shadow-xs overflow-hidden"
                      >
                        {/* Order Top Summary Bar */}
                        <div className="p-4 flex flex-wrap items-start justify-between gap-3 border-b border-[#fbdad2]/60 dark:border-[#3b171f]/80">
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs sm:text-sm font-black text-red-700 dark:text-amber-400">
                                #{order.id}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusInfo.badgeClass}`}
                              >
                                <StatusIcon className="w-3 h-3 shrink-0" />
                                <span>{statusInfo.label}</span>
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#804a55] dark:text-stone-400 tabular-nums">
                              <Clock className="w-3.5 h-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                              <span>{formatOrderTimestamp(order.createdAt)}</span>
                              <span aria-hidden="true">·</span>
                              <span>{order.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="text-right">
                              <span className="block text-[10px] font-semibold text-[#804a55] dark:text-stone-400">
                                Order Total
                              </span>
                              <span className="text-sm sm:text-base font-black text-red-700 dark:text-amber-400 tabular-nums">
                                Rs. {formatPrice(order.total)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleOrderDetails(order.id)}
                              className="p-1.5 rounded-lg bg-[#fff0ec] dark:bg-[#1a0b0e] border border-[#fbdad2] dark:border-[#3b171f] text-[#522730] dark:text-stone-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                              aria-label={isExpanded ? 'Collapse item details' : 'Expand item details'}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Itemized Dish Details & Receipt Breakdown */}
                        {isExpanded && (
                          <div className="p-4 space-y-4">
                            <div className="space-y-2.5">
                              {order.items.map((item) => (
                                <div
                                  key={item.cartId}
                                  className="flex items-start justify-between gap-3 pb-2.5 border-b border-[#fbdad2]/40 dark:border-[#3b171f]/50 last:border-b-0 last:pb-0"
                                >
                                  <div className="flex items-start gap-3 min-w-0">
                                    <img
                                      src={item.menuItem.image}
                                      onError={(e) => {
                                        e.currentTarget.src = ASSETS.menu.pizzaTikka;
                                      }}
                                      alt={item.menuItem.name}
                                      className="w-12 h-12 rounded-xl object-cover border border-[#fbdad2] dark:border-[#3b171f] shrink-0"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="min-w-0 space-y-0.5">
                                      <p className="text-xs sm:text-sm font-bold text-[#1f0b0f] dark:text-white leading-snug">
                                        {item.menuItem.name}{' '}
                                        <span className="text-red-600 dark:text-amber-400 font-extrabold tabular-nums">
                                          &times; {item.quantity}
                                        </span>
                                      </p>
                                      <p className="text-[11px] text-[#804a55] dark:text-stone-400">
                                        {[
                                          item.selectedSize?.name,
                                          item.selectedSpice ? `Spice: ${item.selectedSpice}` : null,
                                          item.selectedAddons && item.selectedAddons.length > 0
                                            ? `Add-ons: ${item.selectedAddons.map((a) => a.name).join(', ')}`
                                            : null,
                                        ]
                                          .filter(Boolean)
                                          .join(' · ') || 'Standard Portion'}
                                      </p>
                                      {item.specialInstructions && (
                                        <p className="text-[11px] italic text-[#522730] dark:text-stone-400">
                                          Note: &ldquo;{item.specialInstructions}&rdquo;
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="text-xs sm:text-sm font-bold text-[#1f0b0f] dark:text-stone-200 tabular-nums">
                                      Rs. {formatPrice(item.totalPrice)}
                                    </span>
                                    {item.quantity > 1 && (
                                      <span className="block text-[10px] text-[#804a55] dark:text-stone-500 tabular-nums">
                                        Rs. {formatPrice(item.unitPrice)} each
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Delivery & Receipt Totals */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#fbdad2]/60 dark:border-[#3b171f]/80 text-[11px] sm:text-xs">
                              <div className="space-y-1.5 text-[#522730] dark:text-stone-300">
                                <div className="flex items-start gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                                  <span>
                                    <strong className="text-[#1f0b0f] dark:text-white">
                                      {order.deliveryArea}:
                                    </strong>{' '}
                                    {order.deliveryAddress}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <CreditCard className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                  <span>{order.paymentMethod}</span>
                                </div>
                              </div>

                              <div className="space-y-1 text-xs bg-[#fff7f5] dark:bg-[#170b0e] p-3 rounded-xl border border-[#fbdad2]/70 dark:border-[#3b171f]">
                                <div className="flex justify-between text-[#804a55] dark:text-stone-400">
                                  <span>Subtotal</span>
                                  <span className="tabular-nums">Rs. {formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-[#804a55] dark:text-stone-400">
                                  <span>Delivery ({order.distanceKm} km)</span>
                                  <span className="tabular-nums">Rs. {formatPrice(order.deliveryFee)}</span>
                                </div>
                                {order.discount > 0 && (
                                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                                    <span>Discount</span>
                                    <span className="tabular-nums">-Rs. {formatPrice(order.discount)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between pt-1.5 border-t border-[#fbdad2] dark:border-[#3b171f] font-black text-[#1f0b0f] dark:text-white">
                                  <span>Total Paid</span>
                                  <span className="text-red-700 dark:text-amber-400 tabular-nums">
                                    Rs. {formatPrice(order.total)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => handleTrackOrder(order)}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fff0ec] dark:bg-[#1a0b0e] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] text-[#1f0b0f] dark:text-stone-200 border border-[#fbdad2] dark:border-[#3b171f] text-xs font-bold transition-colors whitespace-nowrap"
                              >
                                <Compass className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
                                <span>Track Order</span>
                              </button>

                              {wasReordered ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsOrderHistoryOpen(false);
                                    setIsCartOpen(true);
                                  }}
                                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added! View Cart</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleReorder(order)}
                                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  <span>Reorder Items</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#fff0ec] dark:bg-[#0d0608] border-t border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#804a55] dark:text-stone-400">
                Showing {filteredOrders.length} of {sortedOrders.length} orders
              </span>
              <button
                type="button"
                onClick={() => setIsOrderHistoryOpen(false)}
                className="px-5 py-2 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export const OrderHistoryModal: React.FC = () => {
  const { isOrderHistoryOpen } = useAuth();

  return (
    <AnimatePresence>
      {isOrderHistoryOpen ? <OrderHistoryModalInner /> : null}
    </AnimatePresence>
  );
};
