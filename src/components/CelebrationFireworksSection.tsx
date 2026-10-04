import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playCelebrationSound } from '../utils/soundEffects';
import { FireworksCanvas } from './FireworksCanvas';
import { Sparkles, Heart } from 'lucide-react';

export const CelebrationFireworksSection: React.FC = () => {
  const [isCelebrating, setIsCelebrating] = useState(false);

  const handleCelebrate = () => {
    setIsCelebrating(true);
    playCelebrationSound();

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fbbf24', '#e879f9', '#ffffff', '#38bdf8', '#4ade80']
    });
  };

  return (
    <section className="py-20 px-4 relative z-10 text-center">
      <FireworksCanvas active={isCelebrating} onComplete={() => setIsCelebrating(false)} />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-pink-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Grand Celebration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-6">
            Light Up The Sky ✨
          </h2>

          <p className="text-gray-300 text-base sm:text-lg font-light mb-8 max-w-xl mx-auto">
            Click below to launch a spectacular fireworks celebration in honor of Nandita!
          </p>

          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(236, 72, 153, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCelebrate}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-bold text-xl sm:text-2xl shadow-2xl shadow-pink-500/40 cursor-pointer flex items-center gap-3 mx-auto"
          >
            <span>Celebrate! 🎆</span>
          </motion.button>

          <AnimatePresence>
            {isCelebrating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="mt-10 p-6 rounded-2xl glass-card border border-amber-400/50 shadow-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20"
              >
                <h3 className="text-3xl sm:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-rose-300 text-glow-gold animate-bounce">
                  LET'S CELEBRATE NANDITA! 🎉
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
