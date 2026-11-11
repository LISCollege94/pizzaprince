/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { DealsSection } from './components/DealsSection';
import { MenuSection } from './components/MenuSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { RestaurantInfoSection } from './components/RestaurantInfoSection';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { CustomerDashboardModal } from './components/CustomerDashboardModal';
import { FlyingCartItem } from './components/FlyingCartItem';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#fff7f5] dark:bg-[#0d0608] text-[#1f0b0f] dark:text-[#fff1f3] transition-colors duration-300 flex flex-col font-sans selection:bg-red-600 selection:text-white">
            {/* Top Navigation Bar */}
            <Navbar />

            {/* Main Content Areas - Offset for fixed top navbar */}
            <main className="flex-1 pt-16 sm:pt-20">
              {/* Hero Slider with 2s cycling animation & signboard banner */}
              <HeroSlider />

              {/* Exclusive Combo Deals & Feasts */}
              <DealsSection />

              {/* Royal Fast Food & Pizza Menu with upward scroll animation */}
              <MenuSection />

              {/* Neighborhood Customer Reviews & Proof */}
              <CustomerReviewsSection />

              {/* Surjani Town Restaurant Counter & Location Details */}
              <RestaurantInfoSection />
            </main>

            {/* Footer */}
            <Footer />

            {/* Flying clone animation when clicking Add to Cart */}
            <FlyingCartItem />

            {/* Floating WhatsApp Contact Button (0312-2274688) */}
            <FloatingWhatsApp />

            {/* Slide-over Cart Drawer */}
            <CartDrawer />

            {/* Location Selection & Auto-Detect GPS Modal */}
            <LocationModal />

            {/* Checkout & Cash on Delivery Modal */}
            <CheckoutModal />

            {/* Live Order Tracking Modal with Animated Scooter Route */}
            <OrderTrackingModal />

            {/* Google Authentication Dialog */}
            <GoogleAuthModal />

            {/* Customer VIP Profile & Saved Addresses Dashboard */}
            <CustomerDashboardModal />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
