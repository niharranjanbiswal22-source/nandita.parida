import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles, Heart } from 'lucide-react';

interface OpeningScreenProps {
  onOpen: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen }) => {
  const handleOpenSurprise = () => {
    // Fire confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#e879f9', '#ffffff', '#f43f5e']
    });

    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070913] px-6 text-center overflow-hidden"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-pink-300 text-sm mb-6 border border-pink-500/30 shadow-lg shadow-pink-500/10"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{birthdayConfig.openingText.line1}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 text-glow-rose mb-6 leading-tight"
        >
          {birthdayConfig.openingText.line2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-base sm:text-xl text-gray-300 font-light max-w-xl leading-relaxed mb-10"
        >
          {birthdayConfig.openingText.line3}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(244, 114, 182, 0.6)" }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          onClick={handleOpenSurprise}
          className="relative group px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-medium text-lg sm:text-xl shadow-xl shadow-pink-500/30 flex items-center gap-3 cursor-pointer overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            {birthdayConfig.openingText.buttonText}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 text-xs sm:text-sm text-pink-300/80 flex items-center gap-1.5 font-light"
      >
        <span>{birthdayConfig.openingText.subText}</span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-bounce" />
      </motion.div>
    </motion.div>
  );
};
