import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { MapPin, Sparkles, Heart, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onStartJourney: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartJourney }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/20 via-purple-600/15 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Birthday Girl Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-pill border border-pink-500/30 text-pink-200 text-sm font-medium mb-8 shadow-lg shadow-pink-500/10"
        >
          <span className="text-lg">🎂</span>
          <span className="tracking-wide uppercase text-xs font-semibold text-pink-300">
            {birthdayConfig.heroText.badge}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>

        {/* Hero Photo Frame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-10 group"
        >
          {/* Animated Glow Ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-pink-300/40 p-1.5 glass-card shadow-2xl">
            <img
              src={birthdayConfig.heroPhoto}
              alt={birthdayConfig.name}
              className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Hearts and Sparkles around Frame */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 bg-gradient-to-tr from-pink-500 to-rose-500 p-2.5 rounded-full text-white shadow-lg shadow-pink-500/50"
          >
            <Heart className="w-5 h-5 fill-white" />
          </motion.div>

          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-2 -left-2 bg-gradient-to-tr from-amber-400 to-yellow-500 p-2.5 rounded-full text-white shadow-lg shadow-amber-500/50"
          >
            <Sparkles className="w-5 h-5 fill-white" />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-200 text-glow-rose mb-5 leading-tight"
        >
          {birthdayConfig.heroText.title}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-lg sm:text-2xl text-pink-100/90 font-light max-w-2xl mb-6 leading-relaxed"
        >
          {birthdayConfig.heroText.subtitle}
        </motion.p>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-gray-300 text-sm mb-10"
        >
          <MapPin className="w-4 h-4 text-rose-400" />
          <span>{birthdayConfig.fullLocation}</span>
        </motion.div>

        {/* Start Journey Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartJourney}
          className="px-8 py-3.5 rounded-full glass-card hover:bg-white/15 border border-pink-400/40 text-pink-200 font-medium text-base sm:text-lg flex items-center gap-2 shadow-xl hover:shadow-pink-500/20 cursor-pointer group"
        >
          <span>{birthdayConfig.heroText.buttonText}</span>
          <ChevronDown className="w-5 h-5 text-pink-300 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};
