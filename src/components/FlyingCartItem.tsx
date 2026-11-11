import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const FlyingCartItem: React.FC = () => {
  const { flyingItem } = useCart();

  if (!flyingItem) return null;

  // Calculate an arc midpoint high in the viewport so it clearly flies upward and then across
  const midX = (flyingItem.startX + flyingItem.endX) / 2;
  const midY = Math.max(40, Math.min(flyingItem.startY, flyingItem.endY) - 160);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
        {/* Glow Trail Effect */}
        <motion.div
          key={`glow-${flyingItem.id}`}
          initial={{
            x: flyingItem.startX,
            y: flyingItem.startY,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            x: [flyingItem.startX, midX, flyingItem.endX],
            y: [flyingItem.startY, midY, flyingItem.endY],
            opacity: [0.8, 0.4, 0],
            scale: [1, 1.4, 0.2],
          }}
          transition={{
            duration: 1.55,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.5, 1],
          }}
          className="absolute w-24 h-24 -ml-12 -mt-12 rounded-full bg-amber-400/30 blur-xl"
        />

        {/* Flying Item Coin Card with Image & Live Badge */}
        <motion.div
          key={flyingItem.id}
          initial={{
            x: flyingItem.startX,
            y: flyingItem.startY,
            scale: 1.15,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: [flyingItem.startX, midX, flyingItem.endX],
            y: [flyingItem.startY, midY, flyingItem.endY],
            scale: [1.15, 1.05, 0.22],
            opacity: [1, 1, 0.1],
            rotate: [0, 15, 360],
          }}
          transition={{
            duration: 1.55, // Slow, clearly observable and felt by user
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.55, 1],
          }}
          className="absolute -ml-11 -mt-11 flex flex-col items-center"
        >
          {/* Circular Food Image with Thick Royal Gold Rim & Glow */}
          <div className="w-22 h-22 rounded-full overflow-hidden shadow-2xl border-4 border-amber-400 bg-red-950 ring-4 ring-red-600/60 shadow-amber-500/50">
            <img
              src={flyingItem.image}
              onError={(e) => {
                e.currentTarget.src = '/images/pizza.jpg';
              }}
              alt={flyingItem.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floating Action Badge Tag */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, 4, 4, -10] }}
            transition={{ duration: 1.55, times: [0, 0.2, 0.8, 1] }}
            className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 text-[10px] font-black text-amber-300 border border-amber-400/80 shadow-lg whitespace-nowrap"
          >
            +1 Added to Cart! 🍕
          </motion.span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
