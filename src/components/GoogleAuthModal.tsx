import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Check, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../constants/assets';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, signInWithGoogle } = useAuth();
  const [customEmail, setCustomEmail] = useState('liscollege94@gmail.com');
  const [customName, setCustomName] = useState('Prince VIP Customer');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSignIn = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    await signInWithGoogle(customEmail, customName);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#fff7f5] dark:bg-[#12070a] border border-[#fbdad2] dark:border-[#3b171f] text-[#1f0b0f] dark:text-stone-100 shadow-2xl overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="p-6 bg-[#fff0ec] dark:bg-[#0d0608] border-b border-[#fbdad2] dark:border-[#3b171f] text-center relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg text-[#804a55] hover:text-black dark:text-stone-400 dark:hover:text-white hover:bg-[#ffe6e0] dark:hover:bg-stone-800 transition-colors"
            aria-label="Close auth dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={ASSETS.logo}
            onError={(e) => {
              e.currentTarget.src = '/assets/aistudio/Logo_dc615caa.jpg';
            }}
            alt="Pizza Prince Logo"
            className="w-16 h-16 mx-auto rounded-full object-cover ring-4 ring-amber-400 shadow-xl mb-3"
          />
          <h3 className="text-xl font-black text-[#1f0b0f] dark:text-white tracking-tight">
            Pizza Prince Customer Access
          </h3>
          <p className="text-xs text-[#804a55] dark:text-stone-400 mt-1">
            Sign in with Google to unlock fast 1-click checkout & Prince Royalty rewards
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Official Google Button Style */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white hover:bg-[#fff0ec] dark:bg-white dark:hover:bg-stone-100 text-stone-900 font-bold text-sm shadow-md border border-[#fbdad2] dark:border-transparent transition-all hover:scale-102 active:scale-98"
          >
            {/* Multi-color Google G SVG */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Connecting with Google...' : 'Continue with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#fbdad2] dark:border-[#3b171f] w-full" />
            <span className="bg-[#fff7f5] dark:bg-[#12070a] px-3 text-[11px] text-[#804a55] dark:text-stone-500 uppercase font-bold">
              Or Customize Account
            </span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#522730] dark:text-stone-300">Name:</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#522730] dark:text-stone-300">Google Email:</label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] rounded-xl text-[#1f0b0f] dark:text-stone-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Perks list */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0d0608] border border-[#fbdad2] dark:border-[#3b171f] space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#522730] dark:text-stone-300">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Earn 50 welcome loyalty points instantly</span>
            </div>
            <div className="flex items-center gap-2 text-[#522730] dark:text-stone-300">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Save Surjani / Karachi delivery addresses</span>
            </div>
            <div className="flex items-center gap-2 text-[#522730] dark:text-stone-300">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>1-click reorder from your past feasts</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#fff0ec] dark:bg-[#0d0608] border-t border-[#fbdad2] dark:border-[#3b171f] text-center">
          <p className="text-[11px] text-[#804a55] dark:text-stone-500 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-stone-400" />
            <span>Encrypted customer authentication for Pizza Prince</span>
          </p>
        </div>
      </div>
    </div>
  );
};
