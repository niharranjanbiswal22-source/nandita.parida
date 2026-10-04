import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles, Heart } from 'lucide-react';

export const TenWishes: React.FC = () => {
  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-500/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Blessings & Wishes</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose"
          >
            10 Birthday Wishes For Nandita
          </motion.h2>
        </div>

        {/* Wishes List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {birthdayConfig.tenWishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="glass-card p-6 rounded-2xl border border-pink-500/20 shadow-lg flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500/30 to-amber-400/20 border border-pink-500/40 flex items-center justify-center text-pink-200 font-serif font-bold text-lg shrink-0 group-hover:scale-110 transition-transform">
                {index + 1}
              </div>

              <div className="flex-1">
                <p className="text-gray-200 font-light text-base leading-relaxed group-hover:text-white transition-colors">
                  {wish}
                </p>
              </div>

              <Heart className="w-4 h-4 text-pink-400/40 group-hover:text-pink-400 transition-colors shrink-0 mt-1" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
