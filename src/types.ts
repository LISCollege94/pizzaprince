export type MenuCategory = 
  | 'all'
  | 'pizza'
  | 'burgers'
  | 'crispy-chicken'
  | 'loaded-fries'
  | 'rolls'
  | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // PKR
  originalPrice?: number;
  description: string;
  image: string;
  tag?: string;
  sizes?: { name: string; price: number }[];
  spiceLevels?: string[];
  addons?: { name: string; price: number }[];
  isPopular?: boolean;
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  selectedSize?: { name: string; price: number };
  selectedSpice?: string;
  selectedAddons?: { name: string; price: number }[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
}

export interface KarachiArea {
  id: string;
  name: string;
  sectorName: string;
  distanceKm: number; // Distance from ST 1, Sector 1 Surjani Town
  deliveryFee: number; // PKR (Rs. 100 base for <= 2.5km, +Rs. 20/km beyond)
  estimatedMinutes: string;
}

export interface UserAddress {
  id: string;
  label: string; // e.g. "Home", "Office"
  areaName: string;
  streetAddress: string;
  landmark?: string;
  distanceKm: number;
  deliveryFee: number;
}

export interface OrderItemSummary {
  name: string;
  size?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'preparing' | 'baking' | 'dispatched' | 'delivered';
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryArea: string;
  paymentMethod: 'Cash on Delivery (COD)' | 'Online Bank Transfer / JazzCash / EasyPaisa';
  distanceKm: number;
  estimatedDeliveryTime: string;
  createdAt: number;
  riderName?: string;
  riderPhone?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  savedAddresses: UserAddress[];
  royaltyPoints: number;
}
