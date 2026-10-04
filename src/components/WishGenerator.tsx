import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import type { BirthdayWishOption } from '../config/birthdayConfig';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { playSparkleSound } from '../utils/soundEffects';

export const WishGenerator: React.FC = () => {
  const [selectedWish, setSelectedWish] = useState<BirthdayWishOption | null>(
    birthdayConfig.wishGenerator[0]
  );

  const handleSelectWish = (wish: BirthdayWishOption) => {
    setSelectedWish(wish);
    playSparkleSound();
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-500/30"
        >
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Wish Box</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-10"
        >
          Pick A Birthday Wish 🎁
        </motion.h2>

        {/* 6 Glowing Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {birthdayConfig.wishGenerator.map((option) => {
            const isSelected = selectedWish?.id === option.id;
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectWish(option)}
                className={`px-5 py-3 rounded-2xl font-medium text-sm sm:text-base flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${option.bgGradient} text-white shadow-lg shadow-pink-500/30 border border-white/30 scale-105`
                    : 'glass-card text-pink-200 hover:bg-white/10 border border-pink-500/20'
                }`}
              >
                <span>{option.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Display Card for Selected Wish */}
        <div className="min-h-[180px] max-w-2xl mx-auto flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedWish && (
              <motion.div
                key={selectedWish.id}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="w-full glass-card p-8 rounded-3xl border border-pink-500/30 shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-sm font-semibold uppercase tracking-wider mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>A Special Wish For Nandita</span>
                </div>

                <blockquote className="text-xl sm:text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-amber-100 leading-relaxed font-semibold">
                  "{selectedWish.wish}"
                </blockquote>

                <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-pink-300/80 font-light">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Sent with warmth & best wishes</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
