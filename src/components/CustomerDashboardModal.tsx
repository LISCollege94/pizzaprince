import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, MapPin, Plus, Trash2, Award, LogOut, Compass } from 'lucide-react';
import { KARACHI_AREAS } from '../data/karachiAreas';

export const CustomerDashboardModal: React.FC = () => {
  const { user, isDashboardOpen, setIsDashboardOpen, signOut, addSavedAddress, removeSavedAddress } = useAuth();
  const { orders, setActiveTrackingOrder, setIsTrackingModalOpen } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'rewards'>('orders');
  const [newLabel, setNewLabel] = useState('Home');
  const [newArea, setNewArea] = useState('4K Chowrangi, Surjani');
  const [newAddress, setNewAddress] = useState('');
  const [isAddingAddr, setIsAddingAddr] = useState(false);

  if (!isDashboardOpen || !user) return null;

  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    const matched = KARACHI_AREAS.find((a) => a.name.includes(newArea)) || KARACHI_AREAS[1];
    addSavedAddress({
      label: newLabel,
      areaName: newArea,
      streetAddress: newAddress,
      distanceKm: matched.distanceKm,
      deliveryFee: matched.deliveryFee,
    });
    setNewAddress('');
    setIsAddingAddr(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-300">
        {/* Header Profile Bar */}
        <div className="p-6 bg-[#fff0ec] dark:bg-[#170b0e] border-b border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              onError={(e) => {
                e.currentTarget.src = '/images/logo.jpg';
              }}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-[#1f0b0f] dark:text-white">{user.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-red-950 uppercase tracking-wider">
                  Royal VIP
                </span>
              </div>
              <p className="text-xs text-[#804a55] dark:text-stone-400">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-red-700 dark:text-amber-400">
                  {user.royaltyPoints} Prince Royalty Points
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={signOut}
              className="p-2 rounded-xl text-[#804a55] hover:text-red-600 dark:text-stone-400 dark:hover:text-red-400 hover:bg-[#ffe6e0] dark:hover:bg-stone-800 transition-colors"
              title="Sign Out"
              aria-label="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsDashboardOpen(false)}
              className="p-2 rounded-xl text-[#804a55] hover:text-black dark:text-stone-400 dark:hover:text-white hover:bg-[#ffe6e0] dark:hover:bg-stone-800 transition-colors"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#fbdad2] dark:border-[#3b171f] bg-[#fff0ec]/60 dark:bg-[#0d0608] px-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-red-600 text-red-700 dark:text-amber-400'
                : 'border-transparent text-[#804a55] dark:text-stone-400 hover:text-black dark:hover:text-stone-200'
            }`}
          >
            Past Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'addresses'
                ? 'border-red-600 text-red-700 dark:text-amber-400'
                : 'border-transparent text-[#804a55] dark:text-stone-400 hover:text-black dark:hover:text-stone-200'
            }`}
          >
            Saved Addresses ({user.savedAddresses.length})
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'rewards'
                ? 'border-red-600 text-red-700 dark:text-amber-400'
                : 'border-transparent text-[#804a55] dark:text-stone-400 hover:text-black dark:hover:text-stone-200'
            }`}
          >
            Royalty Perks
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-10 text-[#804a55] dark:text-stone-500 text-xs">
                  No orders placed yet. Your royal feasts will show up here!
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-red-700 dark:text-amber-400">
                          {ord.id}
                        </span>
                        <span className="text-[11px] text-[#804a55] dark:text-stone-500">{ord.date}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-rose-300 dark:border-red-800">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#522730] dark:text-stone-300">
                      {ord.items.map((it) => (
                        <div key={it.cartId} className="flex justify-between py-0.5">
                          <span>
                            {it.menuItem.name} x {it.quantity}
                          </span>
                          <span className="text-[#804a55] dark:text-stone-400 tabular-nums">Rs. {it.totalPrice}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#fbdad2]/60 dark:border-stone-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[#804a55] dark:text-stone-400">Total: </span>
                        <span className="font-bold text-red-700 dark:text-amber-400 tabular-nums">
                          Rs. {ord.total}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTrackingOrder(ord);
                          setIsDashboardOpen(false);
                          setIsTrackingModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fff0ec] dark:bg-stone-800 hover:bg-[#ffe6e0] dark:hover:bg-stone-700 text-[#1f0b0f] dark:text-stone-200 text-xs font-bold border border-[#fbdad2] dark:border-transparent"
                      >
                        <Compass className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
                        <span>Track Delivery</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#804a55] dark:text-stone-400">
                  Quick select addresses for fast doorstep delivery in Karachi
                </p>
                <button
                  onClick={() => setIsAddingAddr(!isAddingAddr)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingAddr ? 'Cancel' : 'Add New'}</span>
                </button>
              </div>

              {isAddingAddr && (
                <div className="p-4 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Label (e.g. Home, Office, Studio)"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="px-3 py-2 text-xs bg-[#fff0ec] dark:bg-stone-900 border border-[#fbdad2] dark:border-stone-800 rounded-lg text-[#1f0b0f] dark:text-white"
                    />
                    <select
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      className="px-3 py-2 text-xs bg-[#fff0ec] dark:bg-stone-900 border border-[#fbdad2] dark:border-stone-800 rounded-lg text-[#1f0b0f] dark:text-white"
                    >
                      {KARACHI_AREAS.map((a) => (
                        <option key={a.id} value={a.name}>
                          {a.name} ({a.distanceKm} km)
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Exact street, house/flat number, landmark"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#fff0ec] dark:bg-stone-900 border border-[#fbdad2] dark:border-stone-800 rounded-lg text-[#1f0b0f] dark:text-white"
                  />
                  <button
                    onClick={handleAddAddress}
                    className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                  >
                    Save Address
                  </button>
                </div>
              )}

              <div className="space-y-2.5">
                {user.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] flex items-start justify-between gap-3 text-xs shadow-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1f0b0f] dark:text-white">{addr.label}</span>
                          <span className="text-[11px] text-red-700 dark:text-amber-400 font-semibold">({addr.areaName})</span>
                        </div>
                        <p className="text-[#522730] dark:text-stone-400 text-xs mt-0.5">{addr.streetAddress}</p>
                        <p className="text-[11px] text-[#804a55] dark:text-stone-500 mt-0.5">
                          ~{addr.distanceKm} km from Surjani Town branch · Base Fee: Rs. {addr.deliveryFee}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeSavedAddress(addr.id)}
                      className="text-[#804a55] hover:text-red-600 dark:text-stone-500 dark:hover:text-red-400 p-1"
                      aria-label="Remove address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-100 via-[#fff0ec] to-white dark:from-amber-500/20 dark:via-[#0d0608] dark:to-[#0d0608] border border-[#fbdad2] dark:border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-500" />
                    <div>
                      <h4 className="text-sm font-bold text-[#1f0b0f] dark:text-white">Prince Royalty Club</h4>
                      <p className="text-xs text-[#804a55] dark:text-stone-400">Earn 10 points for every Rs. 100 spent</p>
                    </div>
                  </div>
                  <span className="text-xl font-black text-red-700 dark:text-amber-400 tabular-nums">
                    {user.royaltyPoints} PTS
                  </span>
                </div>

                {/* Progress bar towards Free Pizza */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#804a55] dark:text-stone-400 font-semibold">
                    <span>Progress to Free Regular Pizza (500 pts)</span>
                    <span>{user.royaltyPoints}/500</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#fbdad2] dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                      style={{ width: `${Math.min(100, (user.royaltyPoints / 500) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Promo Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] space-y-1">
                  <p className="font-bold text-[#1f0b0f] dark:text-white">Surjani Free Delivery Voucher</p>
                  <p className="text-[#804a55] dark:text-stone-400 text-[11px]">Valid on orders above Rs. 1500</p>
                  <span className="inline-block mt-1 font-mono text-[10px] text-red-700 dark:text-amber-400 font-bold bg-[#fff0ec] dark:bg-stone-900 px-2 py-0.5 rounded border border-[#fbdad2] dark:border-stone-800">
                    SURJANI100
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] space-y-1">
                  <p className="font-bold text-[#1f0b0f] dark:text-white">Crown Family Feast Discount</p>
                  <p className="text-[#804a55] dark:text-stone-400 text-[11px]">Rs. 200 off on bill above Rs. 3000</p>
                  <span className="inline-block mt-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-[#fff0ec] dark:bg-stone-900 px-2 py-0.5 rounded border border-[#fbdad2] dark:border-stone-800">
                    AUTOMATIC
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fff0ec] dark:bg-[#0d0608] border-t border-[#fbdad2] dark:border-[#3b171f] flex justify-end">
          <button
            onClick={() => setIsDashboardOpen(false)}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
