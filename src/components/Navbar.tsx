import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles, Heart, Film } from 'lucide-react';

interface NavbarProps {
  onOpenSlideshow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSlideshow }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-4 inset-x-4 sm:inset-x-8 z-40 max-w-6xl mx-auto pointer-events-none"
    >
      <div className="glass-card px-4 sm:px-6 py-3 rounded-full border border-pink-500/30 shadow-xl flex items-center justify-between pointer-events-auto">
        
        {/* Brand Title */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <span className="font-serif font-bold text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-amber-200 group-hover:text-glow-rose transition-all">
            {birthdayConfig.shortName}'s Birthday
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSlideshow}
            className="px-3.5 py-1.5 rounded-full glass-pill hover:bg-pink-500/20 text-xs text-pink-200 font-medium border border-pink-500/30 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Film className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Watch Memories 🎞️</span>
            <span className="sm:hidden">Memories</span>
          </button>

          <button
            onClick={() => scrollToSection('cake')}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold shadow-md hover:scale-105 cursor-pointer transition-transform"
          >
            Wish 🎂
          </button>
        </div>

      </div>
    </motion.header>
  );
};
