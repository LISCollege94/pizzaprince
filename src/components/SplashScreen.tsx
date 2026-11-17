import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ASSETS } from '../constants/assets';

interface SplashScreenProps {
  isVisible: boolean;
  onFinish: () => void;
}

const FLYING_FOODS = [
  { id: 'f1', emoji: '🍕', label: 'Crown Pizza', targetX: -145, targetY: -125, rotate: -22, delay: 0.15 },
  { id: 'f2', emoji: '🍔', label: 'Zinger Burger', targetX: 145, targetY: -120, rotate: 18, delay: 0.22 },
  { id: 'f3', emoji: '🍟', label: 'Loaded Fries', targetX: -175, targetY: 20, rotate: -15, delay: 0.28 },
  { id: 'f4', emoji: '🍗', label: 'Crispy Broast', targetX: 175, targetY: 25, rotate: 24, delay: 0.34 },
  { id: 'f5', emoji: '🌯', label: 'Paratha Roll', targetX: -120, targetY: 135, rotate: -20, delay: 0.4 },
  { id: 'f6', emoji: '🥤', label: 'Chilled Drinks', targetX: 125, targetY: 130, rotate: 16, delay: 0.46 },
];

const SPARKLES = [
  { id: 's1', x: -95, y: -170, delay: 0.25 },
  { id: 's2', x: 95, y: -165, delay: 0.35 },
  { id: 's3', x: -205, y: -55, delay: 0.45 },
  { id: 's4', x: 205, y: -50, delay: 0.3 },
  { id: 's5', x: -160, y: 105, delay: 0.5 },
  { id: 's6', x: 165, y: 100, delay: 0.42 },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible, onFinish }) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [isVisible, onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="pizza-prince-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1b0509] via-[#0d0305] to-[#29070f] text-white px-4 select-none"
        >
          {/* Ambient Crimson & Royal Gold Spotlight */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.75 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-red-600/35 via-amber-500/20 to-rose-600/30 blur-3xl pointer-events-none"
          />

          {/* Center Celebration Stage */}
          <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96">
            {/* Rotating Dashed Royal Halo */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotate: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{
                scale: { type: 'spring', stiffness: 180, damping: 16 },
                opacity: { duration: 0.5 },
                rotate: { repeat: Infinity, duration: 14, ease: 'linear' },
              }}
              className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-dashed border-amber-400/50 pointer-events-none"
            />

            {/* Expanding Celebration Ring */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 1.4, delay: 0.2, repeat: Infinity, repeatDelay: 0.5, ease: 'easeOut' }}
              className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-amber-400/60 pointer-events-none"
            />

            {/* Golden Sparkles Bursting Out */}
            {SPARKLES.map((sp) => (
              <motion.span
                key={sp.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: sp.x,
                  y: sp.y,
                  scale: [0, 1.3, 0.9],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1.4, delay: sp.delay, ease: 'easeOut' }}
                className="absolute text-amber-300 text-lg sm:text-xl pointer-events-none drop-shadow"
              >
                ✦
              </motion.span>
            ))}

            {/* Flying Fast Food Items Bursting Outward Around the Logo */}
            {FLYING_FOODS.map((food, idx) => (
              <motion.div
                key={food.id}
                initial={{ x: 0, y: 0, scale: 0.2, opacity: 0, rotate: 0 }}
                animate={{
                  x: food.targetX * 0.85,
                  y: food.targetY * 0.85,
                  scale: 1,
                  opacity: 1,
                  rotate: food.rotate,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 160,
                  damping: 12,
                  delay: food.delay,
                }}
                className="absolute flex flex-col items-center pointer-events-none z-10"
              >
                <motion.div
                  animate={{ y: idx % 2 === 0 ? [-4, 4, -4] : [4, -4, 4] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-[#2b0b12] to-[#140407] border border-amber-400/60 shadow-xl shadow-red-950/60 flex items-center justify-center text-2xl sm:text-3xl backdrop-blur-md"
                >
                  {food.emoji}
                </motion.div>
              </motion.div>
            ))}

            {/* Central Pizza Prince Circular Logo with Zoom-In Bouncing Celebration */}
            <motion.div
              initial={{ scale: 0.12, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 10,
                mass: 1.15,
              }}
              className="relative z-20 p-1.5 rounded-full bg-gradient-to-tr from-red-600 via-amber-400 to-rose-600 shadow-2xl shadow-red-600/50"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-[#120407] ring-4 ring-black/60">
                <img
                  src={ASSETS.logo}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/aistudio/Logo_dc615caa.jpg';
                  }}
                  alt="Pizza Prince Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.35 }}
                className="absolute -top-3 -right-1 text-2xl sm:text-3xl drop-shadow-lg"
              >
                👑
              </motion.span>
            </motion.div>
          </div>

          {/* Animated Brand Wordmark & Loading Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="text-center space-y-3 -mt-2 relative z-20"
          >
            <div className="flex items-baseline justify-center tracking-tight">
              <span className="text-3xl sm:text-5xl font-black text-amber-400 drop-shadow">Pizza</span>
              <span className="text-3xl sm:text-5xl font-black text-white ml-2 tracking-wider drop-shadow">PRINCE</span>
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-rose-200/90">
              Surjani Town&apos;s Royal Fast Food
            </p>

            {/* Stylish Progress Track */}
            <div className="w-52 sm:w-64 h-1.5 mx-auto rounded-full bg-white/10 overflow-hidden border border-white/10 mt-3">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.1, ease: 'easeInOut' }}
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-rose-500 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
              />
            </div>
          </motion.div>

          {/* Subtle Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onFinish}
            className="mt-6 text-[11px] font-semibold text-stone-300 hover:text-amber-300 tracking-wider uppercase transition-colors"
          >
            Enter Kitchen →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
