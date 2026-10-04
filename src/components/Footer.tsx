import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 relative z-10 border-t border-pink-500/20 bg-[#05060e] text-center">
      <div className="max-w-3xl mx-auto space-y-4">
        
        <div className="flex items-center justify-center gap-2 text-pink-300 font-serif text-lg font-semibold">
          <span>Made with</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
          <span>specially for {birthdayConfig.name}</span>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-light">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span>{birthdayConfig.location}</span>
        </div>

        <p className="text-sm text-pink-200/80 font-serif italic pt-2">
          "Keep smiling. Keep shining. Keep being you. ✨"
        </p>

        <div className="pt-4 text-[11px] text-gray-500 font-light">
          © {new Date().getFullYear()} • Premium Birthday Surprise Experience
        </div>

      </div>
    </footer>
  );
};
