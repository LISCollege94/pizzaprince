import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { KARACHI_AREAS, RESTAURANT_LOCATION, getDistanceInKm, calculateDeliveryFee, calculateEstimatedMinutes } from '../data/karachiAreas';
import { MapPin, Navigation, Check, X, Search, ShieldAlert } from 'lucide-react';
import { KarachiArea } from '../types';

export const LocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    selectedArea,
    setSelectedArea,
    customAddress,
    setCustomAddress,
    setCustomDistanceKm,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [tempSelected, setTempSelected] = useState<KarachiArea | null>(selectedArea || KARACHI_AREAS[1]);
  const [manualAddress, setManualAddress] = useState(customAddress);

  if (!isLocationModalOpen) return null;

  const filteredAreas = KARACHI_AREAS.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.sectorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAutoDetectGPS = () => {
    setIsLocating(true);
    setGpsError(null);

    if (!('geolocation' in navigator)) {
      setGpsError('Geolocation is not supported on this device. Please select your area below.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const distance = getDistanceInKm(
          RESTAURANT_LOCATION.lat,
          RESTAURANT_LOCATION.lng,
          latitude,
          longitude
        );

        let closest = KARACHI_AREAS[0];
        let minDiff = 999;
        KARACHI_AREAS.forEach((area) => {
          const diff = Math.abs(area.distanceKm - distance);
          if (diff < minDiff) {
            minDiff = diff;
            closest = area;
          }
        });

        const fee = calculateDeliveryFee(distance);
        const autoDetectedArea: KarachiArea = {
          id: `gps-${Date.now()}`,
          name: `Current Location (${distance} km from Surjani Town)`,
          sectorName: 'GPS Pinpoint Karachi',
          distanceKm: distance,
          deliveryFee: fee,
          estimatedMinutes: calculateEstimatedMinutes(distance),
        };

        setTempSelected(autoDetectedArea);
        setCustomDistanceKm(distance);
        setManualAddress(`Detected via GPS (~${distance} km from ST 1 Surjani Town)`);
        setIsLocating(false);
      },
      (err) => {
        console.warn('GPS error', err);
        setGpsError('Could not access current location. Please choose your area from the list below.');
        setIsLocating(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleConfirmLocation = () => {
    if (tempSelected) {
      setSelectedArea(tempSelected);
      setCustomAddress(manualAddress || tempSelected.name);
    }
    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="p-6 bg-[#fff0ec] dark:bg-[#170b0e] border-b border-[#fbdad2] dark:border-[#3b171f]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/public/assets/aistudio/Logo_dc615caa.jpg"
                alt="Pizza Prince Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400 shrink-0 shadow-md"
              />
              <div>
                <h3 className="text-lg font-bold text-[#1f0b0f] dark:text-white">Select Delivery Location</h3>
                <p className="text-xs text-[#804a55] dark:text-stone-400">
                  Delivering hot from ST 1, Sector 1 Surjani Town, Karachi
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-2 text-[#804a55] hover:text-black dark:text-stone-400 dark:hover:text-white rounded-lg hover:bg-[#ffe6e0] dark:hover:bg-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* GPS Auto-Detect Button */}
          <button
            onClick={handleAutoDetectGPS}
            disabled={isLocating}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white dark:bg-[#1a0b0e] hover:bg-[#fff0ec] dark:hover:bg-[#281116] border border-amber-500/50 text-[#1f0b0f] dark:text-stone-100 transition-all shadow-xs group"
          >
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
              </span>
              <div className="text-left">
                <p className="text-sm font-bold text-red-700 dark:text-amber-300">
                  {isLocating ? 'Detecting your GPS coordinates...' : 'Auto-Detect My Current Location'}
                </p>
                <p className="text-xs text-[#804a55] dark:text-stone-400">
                  Uses device GPS to calculate exact distance from Surjani branch
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Click to locate</span>
          </button>

          {gpsError && (
            <div className="flex items-center gap-2 p-3 text-xs text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/50 rounded-lg">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{gpsError}</span>
            </div>
          )}

          {/* Manual Street / Landmark input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#522730] dark:text-stone-300">
              Exact Address or Nearest Landmark:
            </label>
            <input
              type="text"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              placeholder="e.g. Flat # 4, Block B, near 4K Chowrangi, Surjani Town"
              className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 placeholder-[#804a55] dark:placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Area Selector Dropdown / Search */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#522730] dark:text-stone-300">
              Or Choose Karachi Neighborhood:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#804a55] dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search Surjani, North Karachi, Gulshan, Johar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 placeholder-[#804a55] dark:placeholder-stone-500 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Scrollable Areas List */}
            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 border border-[#fbdad2] dark:border-[#3b171f] rounded-xl p-2 bg-white dark:bg-[#0d0608]/50">
              {filteredAreas.map((area) => {
                const isSelected = tempSelected?.id === area.id;
                return (
                  <button
                    key={area.id}
                    onClick={() => {
                      setTempSelected(area);
                      setCustomDistanceKm(null);
                      if (!manualAddress) {
                        setManualAddress(`${area.name}, Karachi`);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-rose-100 dark:bg-red-950/70 border border-red-500/80 text-[#1f0b0f] dark:text-white font-bold'
                        : 'hover:bg-[#fff0ec] dark:hover:bg-stone-800 text-[#522730] dark:text-stone-300'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{area.name}</p>
                      <p className="text-[11px] text-[#804a55] dark:text-stone-500">{area.sectorName}</p>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-[11px] text-[#804a55] dark:text-stone-400">
                        {area.distanceKm} km away
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-red-600 dark:text-amber-400 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Location Summary Info */}
          {tempSelected && (
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] text-xs space-y-1">
              <div className="flex items-center justify-between text-[#522730] dark:text-stone-300">
                <span>Selected Destination:</span>
                <span className="font-bold text-red-700 dark:text-amber-300">{tempSelected.name}</span>
              </div>
              <div className="flex items-center justify-between text-[#804a55] dark:text-stone-400">
                <span>Distance from Surjani ST 1:</span>
                <span className="font-semibold">{tempSelected.distanceKm} km</span>
              </div>
              <div className="flex items-center justify-between text-[#804a55] dark:text-stone-400">
                <span>Estimated Cooking & Delivery Time:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{tempSelected.estimatedMinutes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#fff0ec] dark:bg-[#0d0608] border-t border-[#fbdad2] dark:border-[#3b171f] flex items-center justify-end gap-3">
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-[#804a55] hover:text-[#1f0b0f] dark:text-stone-400 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLocation}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/30 transition-all hover:scale-102"
          >
            Confirm Delivery Location
          </button>
        </div>
      </div>
    </div>
  );
};
