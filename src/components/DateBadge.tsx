import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Calendar, Sparkles } from 'lucide-react';

export const DateBadge: React.FC = () => {
  return (
    <section className="py-16 px-4 relative z-10">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-8 border border-pink-500/30 shadow-2xl relative overflow-hidden text-center bg-gradient-to-tr from-pink-500/10 via-purple-600/10 to-amber-500/10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Indicator</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 mb-2">
            Today Is Your Day 🎂
          </h2>

          <p className="text-xs sm:text-sm text-pink-300/80 font-light mb-6">
            A date stamped with joy, celebration & sweet memories
          </p>

          <div className="inline-flex flex-col items-center justify-center px-8 py-4 rounded-2xl glass-card border border-pink-400/40 shadow-inner">
            <span className="text-xs uppercase font-semibold tracking-widest text-pink-300 mb-1">
              Nandita's Birthday
            </span>
            <span className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200 text-glow-gold">
              {birthdayConfig.birthdayFormattedDate}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
