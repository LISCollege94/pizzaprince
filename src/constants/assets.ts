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
  menu: {
    pizzaTikka: '/images/pizza.jpg',
    pizzaFajita: '/images/menu/pizza-fajita.jpg',
    pizzaMalai: '/images/menu/pizza-malai.jpg',
    pizzaPepperoni: '/images/menu/pizza-pepperoni.jpg',
    burgerZinger: '/images/burger.jpg',
    burgerSmash: '/images/menu/burger-smash.jpg',
    burgerGrilled: '/images/menu/burger-grilled.jpg',
    broast: '/images/menu/chicken-broast.jpg',
    wings: '/images/menu/chicken-wings.jpg',
    friesLoaded: '/images/fries.jpg',
    friesCheesy: '/images/menu/fries-cheesy.jpg',
    rollZinger: '/images/menu/roll-zinger.jpg',
    rollMalai: '/images/menu/roll-malai.jpg',
    drinkLemonade: '/images/menu/drink-lemonade.jpg',
    drinkSoda: '/images/menu/drink-soda.jpg',
    drinkShake: '/images/menu/drink-shake.jpg',
  },
} as const;
