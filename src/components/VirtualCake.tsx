import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playBlowSound } from '../utils/soundEffects';
import { Sparkles, Heart } from 'lucide-react';

export const VirtualCake: React.FC = () => {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlowCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    playBlowSound();

    // Trigger golden and pink confetti burst
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f472b6', '#e879f9', '#ffffff', '#f43f5e']
    });
  };

  return (
    <section id="cake" className="py-24 px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-pink-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Birthday Cake</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-8">
            Make A Wish, Nandita...
          </h2>

          {/* Virtual Cake Visual */}
          <div className="relative py-8 flex flex-col items-center justify-center">
            
            {/* Candle Flame Container */}
            <div className="flex items-center justify-center gap-6 mb-2">
              {[1, 2, 3].map((candleIndex) => (
                <div key={candleIndex} className="relative flex flex-col items-center">
                  
                  {/* Flame or Smoke */}
                  <AnimatePresence>
                    {!isBlown ? (
                      <motion.div
                        key="flame"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0 }}
                        className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 animate-flicker shadow-[0_0_15px_#f59e0b]"
                      />
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: [0.8, 0], y: -30, scale: 2 }}
                        transition={{ duration: 1.5 }}
                        className="w-3 h-3 rounded-full bg-gray-400/60 blur-xs"
                      />
                    )}
                  </AnimatePresence>

                  {/* Candle Stick */}
                  <div className="w-2.5 h-12 bg-gradient-to-b from-pink-300 via-rose-400 to-pink-500 rounded-t-sm shadow-md border-t border-white/40" />
                </div>
              ))}
            </div>

            {/* Cake Base */}
            <div className="w-48 sm:w-64 h-28 sm:h-36 rounded-t-3xl bg-gradient-to-b from-pink-500 via-rose-600 to-purple-900 border-2 border-pink-300/40 relative shadow-2xl flex flex-col items-center justify-between p-4 overflow-hidden">
              {/* Frosting drips */}
              <div className="w-full flex justify-around opacity-80">
                <span className="w-6 h-6 bg-pink-200 rounded-b-full shadow-inner" />
                <span className="w-8 h-8 bg-pink-200 rounded-b-full shadow-inner" />
                <span className="w-6 h-6 bg-pink-200 rounded-b-full shadow-inner" />
                <span className="w-8 h-8 bg-pink-200 rounded-b-full shadow-inner" />
              </div>

              {/* Text on Cake */}
              <div className="text-center z-10">
                <span className="font-serif text-lg font-bold text-white text-glow-rose">
                  Happy Birthday Nandita
                </span>
              </div>

              <div className="w-full h-3 bg-amber-400/30 rounded-full" />
            </div>

            {/* Cake Plate */}
            <div className="w-60 sm:w-80 h-4 bg-gradient-to-r from-gray-300 via-white to-gray-300 rounded-full shadow-xl -mt-1 border border-white/50" />
          </div>

          {/* Blow Candle Action Button */}
          <div className="mt-6">
            {!isBlown ? (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 191, 36, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlowCandles}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-medium text-lg sm:text-xl shadow-xl shadow-amber-500/20 cursor-pointer flex items-center gap-2 mx-auto"
              >
                <span>Blow The Candles 🕯️</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <div className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-200 to-amber-200 text-glow-gold">
                  May your wish come true. ✨
                </div>
                <p className="text-sm sm:text-base text-gray-300 font-light italic">
                  "One wish made. A thousand beautiful moments waiting ahead."
                </p>
              </motion.div>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
};
