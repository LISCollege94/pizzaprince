import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, MenuItem, KarachiArea, Order } from '../types';
import { KARACHI_AREAS, calculateDeliveryFee, calculateEstimatedMinutes, RESTAURANT_LOCATION } from '../data/karachiAreas';
import { ASSETS } from '../constants/assets';

interface FlyingAnimationState {
  id: string;
  image: string;
  name: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    options?: {
      size?: { name: string; price: number };
      spice?: string;
      addons?: { name: string; price: number }[];
      quantity?: number;
      instructions?: string;
      sourceElement?: HTMLElement | null;
    }
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  selectedArea: KarachiArea | null;
  setSelectedArea: (area: KarachiArea | null) => void;
  customAddress: string;
  setCustomAddress: (address: string) => void;
  customDistanceKm: number | null;
  setCustomDistanceKm: (distance: number | null) => void;
  deliveryFee: number;
  subtotal: number;
  discount: number;
  total: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (details: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'Cash on Delivery (COD)' | 'Online Bank Transfer / JazzCash / EasyPaisa';
    notes?: string;
  }) => Order;
  flyingItem: FlyingAnimationState | null;
  cartBump: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_ORDERS_KEY = 'pizza_prince_orders_history';
const STORAGE_LOCATION_KEY = 'pizza_prince_selected_location';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [flyingItem, setFlyingItem] = useState<FlyingAnimationState | null>(null);
  const [cartBump, setCartBump] = useState(false);

  // Selected delivery location
  const [selectedArea, setSelectedAreaState] = useState<KarachiArea | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_LOCATION_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    // Default to 4K Chowrangi, Surjani Town (Rs. 100 benchmark)
    return KARACHI_AREAS[1];
  });

  const [customAddress, setCustomAddress] = useState<string>('Near 4K Chowrangi, Surjani Town, Karachi');
  const [customDistanceKm, setCustomDistanceKm] = useState<number | null>(null);

  // Check if first visit to prompt location popup
  useEffect(() => {
    const hasVisited = localStorage.getItem('pizza_prince_location_prompted');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsLocationModalOpen(true);
        localStorage.setItem('pizza_prince_location_prompted', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const setSelectedArea = (area: KarachiArea | null) => {
    setSelectedAreaState(area);
    if (area) {
      localStorage.setItem(STORAGE_LOCATION_KEY, JSON.stringify(area));
    }
  };

  // Orders history
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    // Seed initial mock sample order for immediate tracking showcase
    return [
      {
        id: 'PRINCE-1089',
        date: 'Today, 25 mins ago',
        items: [
          {
            cartId: 'item-demo-1',
            menuItem: {
              id: 'pizza-crown-tikka',
              name: 'Prince Crown Crust Tikka',
              category: 'pizza',
              price: 1350,
              description: 'Crown crust stuffed pockets with chicken tikka',
              image: ASSETS.pizza,
            },
            selectedSize: { name: 'Medium 10"', price: 1350 },
            selectedSpice: 'Spicy',
            quantity: 1,
            unitPrice: 1350,
            totalPrice: 1350,
          },
          {
            cartId: 'item-demo-2',
            menuItem: {
              id: 'fries-prince-loaded',
              name: 'Prince Special Loaded Tikka Fries',
              category: 'loaded-fries',
              price: 550,
              description: 'Crinkle fries loaded with cheddar and tikka',
              image: ASSETS.fries,
            },
            quantity: 1,
            unitPrice: 550,
            totalPrice: 550,
          },
        ],
        subtotal: 1900,
        deliveryFee: 100,
        discount: 0,
        total: 2000,
        status: 'dispatched',
        customerName: 'Prince VIP Member',
        customerPhone: '0312-2274688',
        deliveryAddress: 'House 42, Sector 1-A, near 4K Chowrangi, Surjani Town, Karachi',
        deliveryArea: '4K Chowrangi, Surjani',
        paymentMethod: 'Cash on Delivery (COD)',
        distanceKm: 2.0,
        estimatedDeliveryTime: 'Arriving in ~12 mins',
        createdAt: Date.now() - 1000 * 60 * 18,
        riderName: 'Tariq Hussain (Scooter # KCH-4892)',
        riderPhone: '0312-2274688',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  
  // Effective distance and fee
  const effectiveDistance = customDistanceKm !== null 
    ? customDistanceKm 
    : (selectedArea ? selectedArea.distanceKm : 2.0);

  const deliveryFee = subtotal > 0 ? calculateDeliveryFee(effectiveDistance) : 0;
  const discount = subtotal >= 3000 ? 200 : 0; // Special Prince Family Discount
  const total = Math.max(0, subtotal + deliveryFee - discount);
  const totalItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Add to cart with Flying clone animation
  const addToCart = (
    item: MenuItem,
    options?: {
      size?: { name: string; price: number };
      spice?: string;
      addons?: { name: string; price: number }[];
      quantity?: number;
      instructions?: string;
      sourceElement?: HTMLElement | null;
    }
  ) => {
    const qty = options?.quantity || 1;
    const basePrice = options?.size ? options.size.price : item.price;
    const addonsTotal = (options?.addons || []).reduce((acc, a) => acc + a.price, 0);
    const unitPrice = basePrice + addonsTotal;
    const totalPrice = unitPrice * qty;

    const cartId = `${item.id}-${options?.size?.name || 'default'}-${options?.spice || 'default'}-${(options?.addons || []).map(a => a.name).sort().join(',')}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + qty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: updated[existingIndex].unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartId,
          menuItem: item,
          selectedSize: options?.size,
          selectedSpice: options?.spice,
          selectedAddons: options?.addons,
          quantity: qty,
          unitPrice,
          totalPrice,
          specialInstructions: options?.instructions,
        };
        return [...prevCart, newItem];
      }
    });

    // Flying animation logic
    if (options?.sourceElement) {
      const startRect = options.sourceElement.getBoundingClientRect();
      const cartBtn = document.getElementById('header-cart-btn') || document.getElementById('mobile-cart-btn');
      const targetRect = cartBtn
        ? cartBtn.getBoundingClientRect()
        : { left: window.innerWidth - 60, top: 30, width: 40, height: 40 };

      setFlyingItem({
        id: `${Date.now()}`,
        image: item.image,
        name: item.name,
        startX: startRect.left + startRect.width / 2,
        startY: startRect.top + startRect.height / 2,
        endX: targetRect.left + targetRect.width / 2,
        endY: targetRect.top + targetRect.height / 2,
      });

      setTimeout(() => {
        setFlyingItem(null);
        setCartBump(true);
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
          }
        } catch (e) {
          // Graceful fallback
        }
        setTimeout(() => setCartBump(false), 500);
      }, 1600);
    } else {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 500);
    }
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (details: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'Cash on Delivery (COD)' | 'Online Bank Transfer / JazzCash / EasyPaisa';
    notes?: string;
  }): Order => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `PRINCE-${orderNum}`,
      date: 'Just now',
      items: [...cart],
      subtotal,
      deliveryFee,
      discount,
      total,
      status: 'confirmed',
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      deliveryAddress: details.deliveryAddress,
      deliveryArea: selectedArea ? selectedArea.name : 'Surjani Town / Karachi',
      paymentMethod: details.paymentMethod,
      distanceKm: effectiveDistance,
      estimatedDeliveryTime: calculateEstimatedMinutes(effectiveDistance),
      createdAt: Date.now(),
      riderName: 'Assigned upon oven bake (Rider Contact: 0312-2274688)',
      riderPhone: RESTAURANT_LOCATION.phone,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();
    setIsCheckoutModalOpen(false);
    setIsCartOpen(false);
    setIsTrackingModalOpen(true);

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedArea,
        setSelectedArea,
        customAddress,
        setCustomAddress,
        customDistanceKm,
        setCustomDistanceKm,
        deliveryFee,
        subtotal,
        discount,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        activeTrackingOrder,
        setActiveTrackingOrder,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        orders,
        placeOrder,
        flyingItem,
        cartBump,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
