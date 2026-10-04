import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { playSparkleSound } from '../utils/soundEffects';

export const SurpriseBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    playSparkleSound();

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#e879f9', '#f472b6', '#fbbf24', '#ffffff']
    });
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-pink-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-500/30">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>Mystery Gift</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-8">
            There Is Still One More Surprise...
          </h2>

          {/* 3D Gift Box Animation */}
          <div className="relative py-6 flex justify-center items-center">
            <motion.div
              animate={isOpen ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : { y: [0, -10, 0] }}
              transition={{ duration: isOpen ? 0.6 : 3, repeat: isOpen ? 0 : Infinity, ease: "easeInOut" }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center"
            >
              {/* Box Body */}
              <div className="w-full h-full bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-600 rounded-3xl shadow-2xl border-2 border-pink-300/40 relative flex items-center justify-center overflow-hidden">
                {/* Vertical Ribbon */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 shadow-md" />
                {/* Horizontal Ribbon */}
                <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-300 shadow-md" />

                {/* Bow Icon */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-rose-600 shadow-lg">
                  <Gift className="w-8 h-8" />
                </div>
              </div>

              {/* Glowing Aura when open */}
              {isOpen && (
                <div className="absolute inset-0 rounded-3xl bg-pink-500/40 blur-2xl animate-pulse" />
              )}
            </motion.div>
          </div>

          {/* Button or Revealed Message */}
          <div className="mt-8">
            {!isOpen ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenGift}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-medium text-lg sm:text-xl shadow-xl shadow-pink-500/30 cursor-pointer flex items-center gap-2 mx-auto"
              >
                <span>Open The Gift 🎁</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-amber-400/40 bg-gradient-to-br from-pink-500/15 to-amber-500/10 shadow-2xl"
              >
                <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-sm font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Surprise Message</span>
                </div>

                <p className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-amber-100 leading-relaxed">
                  "{birthdayConfig.surpriseBoxMessage}"
                </p>
              </motion.div>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
};
