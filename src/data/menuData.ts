import { MenuItem } from '../types';
import { ASSETS } from '../constants/assets';

export const MENU_ITEMS: MenuItem[] = [
  // Pizzas
  {
    id: 'pizza-crown-tikka',
    name: 'Prince Crown Crust Tikka',
    category: 'pizza',
    price: 1350,
    originalPrice: 1550,
    description: 'Our signature royal pizza with cheese-stuffed golden crown crust pockets, smoked chicken tikka chunks, onions, and melted mozzarella.',
    image: ASSETS.pizza,
    tag: "Chef's Special",
    isPopular: true,
    sizes: [
      { name: 'Regular 7"', price: 850 },
      { name: 'Medium 10"', price: 1350 },
      { name: 'Large 13"', price: 1950 },
      { name: 'Royal Crown 16"', price: 2550 },
    ],
    spiceLevels: ['Mild', 'Spicy', 'Fire Hot'],
    addons: [
      { name: 'Extra Mozzarella Cheese', price: 200 },
      { name: 'Garlic Mayo Dip', price: 80 },
      { name: 'Spicy Ranch Dip', price: 90 },
      { name: 'Crown Crust Stuffed Edges', price: 250 },
    ],
  },
  {
    id: 'pizza-fajita-sensation',
    name: 'Fajita Sensation Pizza',
    category: 'pizza',
    price: 1290,
    originalPrice: 1450,
    description: 'Tender fajita marinated chicken breast strips, crisp green bell peppers, sweet caramelized onions, and seasoned tomato glaze.',
    image: ASSETS.pizza,
    tag: 'Popular',
    isPopular: true,
    sizes: [
      { name: 'Regular 7"', price: 790 },
      { name: 'Medium 10"', price: 1290 },
      { name: 'Large 13"', price: 1890 },
      { name: 'Royal Crown 16"', price: 2450 },
    ],
    spiceLevels: ['Mild', 'Medium', 'Spicy'],
    addons: [
      { name: 'Extra Mozzarella Cheese', price: 200 },
      { name: 'Sliced Black Olives & Jalapeños', price: 120 },
      { name: 'Garlic Butter Crust Drizzle', price: 100 },
    ],
  },
  {
    id: 'pizza-malai-boti',
    name: 'Creamy Malai Boti Pizza',
    category: 'pizza',
    price: 1390,
    description: 'Melt-in-mouth chicken malai boti infused with rich cream sauce, white cheese blend, capsicum, and aromatic herbs.',
    image: ASSETS.pizza,
    tag: 'Rich & Creamy',
    isPopular: true,
    sizes: [
      { name: 'Regular 7"', price: 890 },
      { name: 'Medium 10"', price: 1390 },
      { name: 'Large 13"', price: 1990 },
      { name: 'Royal Crown 16"', price: 2590 },
    ],
    spiceLevels: ['Mild Creamy', 'Medium Spiced'],
    addons: [
      { name: 'Extra Mozzarella Cheese', price: 200 },
      { name: 'Garlic Mayo Dip', price: 80 },
      { name: 'Mushroom & Sweet Corn', price: 150 },
    ],
  },
  {
    id: 'pizza-royal-pepperoni',
    name: 'Royal Pepperoni Feast',
    category: 'pizza',
    price: 1450,
    originalPrice: 1650,
    description: 'Generously layered with crisp seasoned beef pepperoni slices, rich marinara sauce, dried oregano, and triple stretchy mozzarella.',
    image: ASSETS.pizza,
    tag: 'Classic',
    sizes: [
      { name: 'Regular 7"', price: 920 },
      { name: 'Medium 10"', price: 1450 },
      { name: 'Large 13"', price: 2050 },
      { name: 'Royal Crown 16"', price: 2650 },
    ],
    spiceLevels: ['Mild', 'Zesty Pepper'],
    addons: [
      { name: 'Extra Mozzarella Cheese', price: 200 },
      { name: 'Double Pepperoni', price: 250 },
      { name: 'Chipotle Dip Sauce', price: 90 },
    ],
  },

  // Burgers
  {
    id: 'burger-prince-zinger',
    name: 'Prince Zinger Supreme Burger',
    category: 'burgers',
    price: 520,
    originalPrice: 590,
    description: 'Extra-crispy battered golden chicken thigh fillet, melted cheddar cheese slice, fresh lettuce, and our secret recipe spicy sauce on a toasted brioche bun.',
    image: ASSETS.burger,
    tag: 'Bestseller',
    isPopular: true,
    sizes: [
      { name: 'Single Fillet', price: 520 },
      { name: 'Double Fillet Deluxe', price: 790 },
    ],
    spiceLevels: ['Original Crisp', 'Spicy Zinger', 'Fire Hot'],
    addons: [
      { name: 'Extra Melted Cheddar Slice', price: 70 },
      { name: 'Add Seasoned Regular Fries', price: 150 },
      { name: 'Honey Mustard Dip', price: 70 },
    ],
  },
  {
    id: 'burger-double-beef-smash',
    name: 'Royal Smash Beef Burger',
    category: 'burgers',
    price: 680,
    originalPrice: 750,
    description: 'Two smashed prime beef patties seared with caramelized sweet onions, American cheese, gherkins, and house smokey BBQ glaze.',
    image: ASSETS.burger,
    tag: 'Juicy Beef',
    isPopular: true,
    sizes: [
      { name: 'Double Patty', price: 680 },
      { name: 'Triple King Patty', price: 920 },
    ],
    spiceLevels: ['Classic Smokey', 'Spicy Black Pepper'],
    addons: [
      { name: 'Extra American Cheese', price: 70 },
      { name: 'Crispy Beef Bacon Strip', price: 120 },
      { name: 'Smokey BBQ Dip', price: 70 },
    ],
  },
  {
    id: 'burger-grilled-fillet',
    name: 'Grilled Flame Chicken Burger',
    category: 'burgers',
    price: 490,
    description: 'Char-grilled herb-marinated chicken breast, crisp iceberg lettuce, sliced tomatoes, and garlic herb aioli sauce.',
    image: ASSETS.burger,
    sizes: [
      { name: 'Single Grilled Breast', price: 490 },
      { name: 'Double Grilled Delight', price: 720 },
    ],
    spiceLevels: ['Mild Lemon Herb', 'Peri-Peri Spicy'],
    addons: [
      { name: 'Cheddar Cheese Slice', price: 70 },
      { name: 'Garlic Aioli Dip', price: 70 },
    ],
  },

  // Crispy Chicken & Wings
  {
    id: 'chicken-crispy-broast',
    name: 'Golden Crispy Broast Quarter',
    category: 'crispy-chicken',
    price: 480,
    description: 'Golden, crispy, and juicy fried chicken pieces pressure-cooked to perfection, served with French fries, toasted bun, and spicy garlic sauce.',
    image: ASSETS.burger,
    tag: 'Crispy & Juicy',
    isPopular: true,
    sizes: [
      { name: 'Quarter Broast (2 Pcs)', price: 480 },
      { name: 'Half Broast (4 Pcs)', price: 920 },
      { name: 'Full Family Broast (8 Pcs)', price: 1790 },
    ],
    spiceLevels: ['Mild Salty', 'Spicy Karahi Rub'],
    addons: [
      { name: 'Extra Dinner Bun', price: 40 },
      { name: 'Extra Garlic Sauce Tub', price: 60 },
      { name: 'Crispy Fries Upgrade', price: 120 },
    ],
  },
  {
    id: 'chicken-hot-wings',
    name: 'Spicy Buffalo Crispy Wings',
    category: 'crispy-chicken',
    price: 440,
    description: 'Crunchy battered chicken wings tossed in tangy cayenne pepper glaze and garnished with toasted sesame seeds.',
    image: ASSETS.fries,
    sizes: [
      { name: '6 Pieces', price: 440 },
      { name: '10 Pieces', price: 690 },
    ],
    spiceLevels: ['Tangy Mild', 'Spicy Buffalo', 'Ghost Fire'],
    addons: [
      { name: 'Cool Blue Cheese Ranch Dip', price: 80 },
    ],
  },

  // Loaded Fries & Sides
  {
    id: 'fries-prince-loaded',
    name: 'Prince Special Loaded Tikka Fries',
    category: 'loaded-fries',
    price: 550,
    originalPrice: 620,
    description: 'Jumbo platter of seasoned crinkle-cut fries topped with juicy chicken tikka chunks, melted cheddar cheese sauce, jalapeños, and garlic herb drizzle.',
    image: ASSETS.fries,
    tag: 'Crowd Favorite',
    isPopular: true,
    sizes: [
      { name: 'Regular Platter', price: 550 },
      { name: 'Mega King Platter', price: 850 },
    ],
    spiceLevels: ['Mild Cheesy', 'Spicy Tikka Kick'],
    addons: [
      { name: 'Double Cheese Drizzle', price: 120 },
      { name: 'Extra Tikka Chunks', price: 150 },
      { name: 'Sliced Jalapeños & Olives', price: 80 },
    ],
  },
  {
    id: 'fries-cheesy-jalapeno',
    name: 'Cheesy Jalapeño Crinkle Fries',
    category: 'loaded-fries',
    price: 390,
    description: 'Golden crinkle fries smothered in warm velvety cheese sauce and spicy diced jalapeño peppers with smoked paprika.',
    image: ASSETS.fries,
    sizes: [
      { name: 'Standard Box', price: 390 },
      { name: 'Large Box', price: 590 },
    ],
    addons: [
      { name: 'Chipotle Sauce Splash', price: 60 },
    ],
  },

  // Rolls & Wraps
  {
    id: 'roll-zinger-paratha',
    name: 'Crispy Zinger Mayo Roll',
    category: 'rolls',
    price: 320,
    description: 'Crispy fried chicken zinger strip wrapped in a flaky golden fried paratha with shredded lettuce, diced onions, and garlic mayo dressing.',
    image: ASSETS.burger,
    isPopular: true,
    sizes: [
      { name: 'Single Paratha Roll', price: 320 },
      { name: 'Double Chicken Meat', price: 440 },
    ],
    spiceLevels: ['Mild Creamy Mayo', 'Spicy Chatpata'],
    addons: [
      { name: 'Add Melted Cheese Slice', price: 60 },
      { name: 'Extra Mint Chutney & Mayo', price: 40 },
    ],
  },
  {
    id: 'roll-chicken-malai-boti',
    name: 'Chicken Malai Boti Roll',
    category: 'rolls',
    price: 340,
    description: 'Charcoal-grilled tender boneless chicken malai boti rolled in a hot crisp paratha with onion rings and smooth mint raita.',
    image: ASSETS.pizza,
    sizes: [
      { name: 'Single Paratha Roll', price: 340 },
      { name: 'Double Meat Roll', price: 470 },
    ],
    addons: [
      { name: 'Add Melted Cheese Slice', price: 60 },
    ],
  },

  // Drinks & Desserts
  {
    id: 'drink-fresh-lemon-mint',
    name: 'Chilled Fresh Mint Lemonade',
    category: 'drinks',
    price: 220,
    description: 'Refreshing blended fresh mint leaves, squeezed lemon juice, black salt, and sparkling ice soda.',
    image: ASSETS.fries,
    tag: 'Refreshing',
    sizes: [
      { name: 'Regular Glass 350ml', price: 220 },
      { name: 'Large Pitcher Glass 500ml', price: 320 },
    ],
  },
  {
    id: 'drink-soft-drink',
    name: 'Chilled Soft Drink (Coke / Sprite / Fanta)',
    category: 'drinks',
    price: 130,
    description: 'Ice-cold carbonated beverage of your choice served with fresh ice.',
    image: ASSETS.pizza,
    sizes: [
      { name: 'Regular 345ml Can / Bottle', price: 130 },
      { name: '1.5 Litre Family Bottle', price: 260 },
    ],
  },
  {
    id: 'drink-chocolate-shake',
    name: 'Royal Belgian Chocolate Shake',
    category: 'drinks',
    price: 390,
    description: 'Thick creamy milkshake whipped with Belgian chocolate ice cream, chocolate syrup drizzle, and chocolate shavings.',
    image: ASSETS.restaurant,
    sizes: [
      { name: 'Regular 400ml', price: 390 },
    ],
  },
];
