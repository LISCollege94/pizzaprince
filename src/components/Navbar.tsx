import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingBag, Moon, Sun, MapPin, Phone, Menu as MenuIcon, X, Compass } from 'lucide-react';
import { RESTAURANT_LOCATION } from '../data/karachiAreas';

export const Navbar: React.FC = () => {
  const { totalItemsCount, setIsCartOpen, selectedArea, setIsLocationModalOpen, setIsTrackingModalOpen, cartBump } = useCart();
  const { user, setIsAuthModalOpen, setIsDashboardOpen } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#fff7f5]/95 dark:bg-[#0d0608]/95 border-b border-[#fbdad2] dark:border-[#3b171f] shadow-sm dark:shadow-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Official Uploaded Circular Logo & Brand Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group whitespace-nowrap"
          >
            {/* User-uploaded official circular Pizza Prince Logo */}
            <img
              src="/public/assets/aistudio/Logo_dc615caa.jpg"
              alt="Pizza Prince Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-amber-400 shadow-md group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex items-baseline leading-none">
              <span className="font-extrabold text-amber-500 dark:text-amber-400 text-lg sm:text-2xl tracking-tight drop-shadow-sm">Pizza</span>
              <span className="font-black text-[#1f0b0f] dark:text-white text-lg sm:text-2xl ml-1 tracking-wide drop-shadow-sm">PRINCE</span>
            </div>
          </a>

          {/* Quick Location Trigger Button */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#522730] dark:text-[#f4cdd4] hover:text-[#c8102e] dark:hover:text-amber-300 bg-[#fff0ec] dark:bg-[#1a0b0e] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] border border-[#fbdad2] dark:border-[#3b171f] rounded-lg transition-colors whitespace-nowrap"
            title="Change Delivery Location"
          >
            <MapPin className="w-3.5 h-3.5 text-red-600 animate-bounce" />
            <span className="truncate max-w-[130px]">
              {selectedArea ? selectedArea.name : 'Surjani Town'}
            </span>
          </button>
        </div>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-semibold text-[#522730] dark:text-[#f4cdd4]">
          <a
            href="#menu-section"
            className="hover:text-[#c8102e] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Royal Menu
          </a>
          <a
            href="#menu-section"
            className="hover:text-[#c8102e] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Crown Pizzas
          </a>
          <a
            href="#menu-section"
            className="hover:text-[#c8102e] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Zinger & Burgers
          </a>
          <button
            onClick={() => setIsTrackingModalOpen(true)}
            className="hover:text-[#c8102e] dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 font-bold"
          >
            <Compass className="w-4 h-4 text-red-600 dark:text-amber-400" />
            <span>Track Order</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Theme Toggle, Google Auth Profile with Google Logo, Cart CTA) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Theme Toggle (Changes entire website between 10% creamy red and 60% black/red obsidian) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-[#522730] dark:text-amber-300 hover:text-[#c8102e] bg-[#fff0ec] dark:bg-[#1a0b0e] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] border border-[#fbdad2] dark:border-[#3b171f] transition-all hover:scale-105 shrink-0"
            title={theme === 'dark' ? 'Switch to Creamy Red Light Mode' : 'Switch to Red-Black Obsidian Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#804a55]" />
            )}
          </button>

          {/* Customer Google Login with official Google G Logo */}
          {user ? (
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 sm:pr-3 rounded-lg sm:rounded-xl bg-[#fff0ec] dark:bg-[#1a0b0e] hover:bg-[#ffe6e0] dark:hover:bg-[#281116] border border-[#fbdad2] dark:border-[#3b171f] text-xs font-semibold text-[#1f0b0f] dark:text-[#f4cdd4] transition-all shrink-0"
              title="Open Customer Dashboard"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg object-cover ring-1 ring-red-600"
              />
              <span className="hidden sm:inline font-bold text-red-700 dark:text-amber-400">
                {user.royaltyPoints} pts
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#1f0b0f] dark:text-[#f4cdd4] bg-white dark:bg-[#1a0b0e] hover:bg-[#fff0ec] dark:hover:bg-[#281116] border border-[#fbdad2] dark:border-[#3b171f] rounded-lg sm:rounded-xl shadow-xs transition-all shrink-0"
              title="Sign in with Google"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="hidden sm:inline">Google Login</span>
            </button>
          )}

          {/* Cart CTA Button */}
          <button
            id="header-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className={`relative flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red-600 via-red-700 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-md shadow-red-900/30 transition-all hover:scale-102 active:scale-98 shrink-0 ${
              cartBump ? 'scale-110 ring-4 ring-amber-400/60' : ''
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
            <span className="hidden xs:inline sm:inline">Cart</span>
            {totalItemsCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-extrabold bg-amber-400 text-red-950 rounded-full shadow">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-[#522730] dark:text-[#f4cdd4] hover:text-[#c8102e] rounded-lg bg-[#fff0ec] dark:bg-[#1a0b0e] border border-[#fbdad2] dark:border-[#3b171f] shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#fbdad2] dark:border-[#3b171f] bg-[#fff7f5] dark:bg-[#0d0608] px-4 py-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#fbdad2] dark:border-[#3b171f]/80">
            <button
              onClick={() => {
                setIsLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-amber-300"
            >
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span className="truncate max-w-[180px]">
                {selectedArea ? selectedArea.name : 'Surjani Town'}
              </span>
            </button>
            <a
              href={`tel:${RESTAURANT_LOCATION.phone}`}
              className="flex items-center gap-1.5 text-xs text-[#522730] dark:text-[#f4cdd4] font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-green-600" />
              <span>{RESTAURANT_LOCATION.phone}</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 pt-1 text-[#1f0b0f] dark:text-[#fff1f3]">
            <a
              href="#menu-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-semibold hover:text-[#c8102e] dark:hover:text-amber-400"
            >
              Royal Menu
            </a>
            <a
              href="#menu-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-semibold hover:text-[#c8102e] dark:hover:text-amber-400"
            >
              Crown Crust Pizzas
            </a>
            <a
              href="#menu-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-semibold hover:text-[#c8102e] dark:hover:text-amber-400"
            >
              Zinger & Fast Food
            </a>
            <button
              onClick={() => {
                setIsTrackingModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-sm font-bold text-red-700 dark:text-amber-400 text-left"
            >
              <Compass className="w-4 h-4" />
              <span>Track Live Delivery</span>
            </button>

            {!user ? (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 py-2.5 text-center text-xs font-bold rounded-lg bg-white dark:bg-[#1a0b0e] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-white flex items-center justify-center gap-2 shadow-xs"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign In with Google</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsDashboardOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 py-2.5 text-center text-xs font-bold rounded-lg bg-white dark:bg-[#1a0b0e] border border-[#fbdad2] dark:border-[#3b171f] text-red-700 dark:text-amber-400 flex items-center justify-center gap-2"
              >
                <span>Customer Dashboard ({user.royaltyPoints} pts)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
