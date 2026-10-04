import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Lock, Unlock, Sparkles, Heart } from 'lucide-react';
import { playSparkleSound } from '../utils/soundEffects';

export const SecretMessage: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    playSparkleSound();
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-pink-500/30 shadow-2xl relative overflow-hidden text-center"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-500/30">
            {isUnlocked ? <Unlock className="w-3.5 h-3.5 text-amber-300" /> : <Lock className="w-3.5 h-3.5 text-pink-300" />}
            <span>Secret Message</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-8">
            A Secret Message 🔐
          </h2>

          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center py-6"
              >
                <div className="w-20 h-20 rounded-full bg-pink-500/10 border-2 border-pink-500/30 flex items-center justify-center text-pink-300 mb-8 animate-pulse shadow-lg shadow-pink-500/20">
                  <Lock className="w-10 h-10" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(244, 114, 182, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUnlock}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-medium text-lg sm:text-xl shadow-xl shadow-pink-500/30 cursor-pointer flex items-center gap-2"
                >
                  <Unlock className="w-5 h-5" />
                  <span>Unlock Message</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-left space-y-6 pt-4 border-t border-pink-500/20"
              >
                <div className="flex items-center gap-2 text-amber-300 font-serif text-sm font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>For Nandita's Eyes Only</span>
                </div>

                <div className="whitespace-pre-line text-gray-200 text-base sm:text-lg font-light leading-relaxed font-serif">
                  {birthdayConfig.secretMessage}
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 text-pink-300 font-handwriting text-3xl text-glow-rose">
                  <span>Forever & Always</span>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
