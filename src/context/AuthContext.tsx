import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserAddress } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  signInWithGoogle: (customEmail?: string, customName?: string) => Promise<void>;
  signOut: () => void;
  updateUserPhone: (phone: string) => void;
  addSavedAddress: (address: Omit<UserAddress, 'id'>) => void;
  removeSavedAddress: (id: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  addLoyaltyPoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'pizza_prince_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved user', e);
        }
      }
    }
    // Default guest or pre-set initial state for seamless demo experience
    return {
      id: 'usr-google-94',
      name: 'Prince VIP Member',
      email: 'liscollege94@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      phone: '0312-2274688',
      royaltyPoints: 340,
      savedAddresses: [
        {
          id: 'addr-1',
          label: 'Home',
          areaName: '4K Chowrangi, Surjani',
          streetAddress: 'House 42, Sector 1-A, near 4K Roundabout',
          landmark: 'Opposite Royal Bakers',
          distanceKm: 2.0,
          deliveryFee: 100,
        },
        {
          id: 'addr-2',
          label: 'Office / Shop',
          areaName: 'Powerhouse Chowrangi, North Karachi',
          streetAddress: 'Shop # 12, Main Commercial Avenue',
          landmark: 'Near Powerhouse Flyover',
          distanceKm: 4.6,
          deliveryFee: 150,
        },
      ],
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const signInWithGoogle = async (customEmail?: string, customName?: string) => {
    const email = customEmail || 'liscollege94@gmail.com';
    const name = customName || (email.split('@')[0].replace('.', ' ').toUpperCase() || 'Prince Customer');
    
    // Simulate slight authentic Google sign-in handshake
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=b91c1c&textColor=ffffff`,
      phone: user?.phone || '0312-2274688',
      royaltyPoints: (user?.royaltyPoints || 100) + 50, // Welcome bonus
      savedAddresses: user?.savedAddresses || [
        {
          id: 'addr-default',
          label: 'Home',
          areaName: '4K Chowrangi, Surjani',
          streetAddress: 'Surjani Town Sector 1',
          distanceKm: 2.0,
          deliveryFee: 100,
        },
      ],
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const signOut = () => {
    setUser(null);
    setIsDashboardOpen(false);
  };

  const updateUserPhone = (phone: string) => {
    if (!user) return;
    setUser({ ...user, phone });
  };

  const addSavedAddress = (address: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    const newAddress: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    setUser({
      ...user,
      savedAddresses: [newAddress, ...user.savedAddresses],
    });
  };

  const removeSavedAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.filter((a) => a.id !== id),
    });
  };

  const addLoyaltyPoints = (points: number) => {
    if (!user) return;
    setUser({
      ...user,
      royaltyPoints: user.royaltyPoints + points,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
        updateUserPhone,
        addSavedAddress,
        removeSavedAddress,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isDashboardOpen,
        setIsDashboardOpen,
        addLoyaltyPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
