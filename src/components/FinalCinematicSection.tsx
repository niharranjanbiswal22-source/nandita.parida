import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

interface FinalCinematicProps {
  onReplay: () => void;
}

export const FinalCinematicSection: React.FC<FinalCinematicProps> = ({ onReplay }) => {
  const { lines, bigHeading, subheading } = birthdayConfig.finalCinematic;

  return (
    <section className="py-28 px-4 relative z-10 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Sequential Lines Reveal */}
        <div className="space-y-6 mb-12">
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              className="text-lg sm:text-2xl font-light text-pink-200/90 tracking-wide"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Huge Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2.0 }}
          className="mb-8"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-200 text-glow-rose leading-tight">
            {bigHeading}
          </h2>
          <p className="text-base sm:text-xl text-pink-200/80 font-light mt-4 italic">
            "{subheading}"
          </p>
        </motion.div>

        {/* Final Photo Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2.4 }}
          className="relative mb-12 group"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 opacity-75 blur-md group-hover:opacity-100 transition duration-700 animate-pulse" />
          
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-pink-300/40 p-1 glass-card shadow-2xl">
            <img
              src={birthdayConfig.heroPhoto}
              alt={birthdayConfig.name}
              className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Replay Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="px-8 py-4 rounded-full glass-card hover:bg-white/15 border border-pink-400/40 text-pink-200 font-medium text-base sm:text-lg flex items-center gap-3 shadow-xl hover:shadow-pink-500/20 cursor-pointer group"
        >
          <RotateCcw className="w-5 h-5 text-pink-300 group-hover:-rotate-90 transition-transform duration-500" />
          <span>Replay The Birthday Journey 🔄</span>
        </motion.button>

      </div>
    </section>
  );
};
