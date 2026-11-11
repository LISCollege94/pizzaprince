/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Centralized asset paths that work 100% reliably in Vite dev and production builds on Netlify
export const ASSETS = {
  logo: '/images/logo.jpg',
  banner: '/images/banner.jpg',
  pizza: '/images/pizza.jpg',
  burger: '/images/burger.jpg',
  fries: '/images/fries.jpg',
  restaurant: '/images/restaurant.jpg',
} as const;
