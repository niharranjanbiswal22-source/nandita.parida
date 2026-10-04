import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles, Heart } from 'lucide-react';

export const WhySpecial: React.FC = () => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-500/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Pure Appreciation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose"
          >
            Why You're Special ✨
          </motion.h2>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {birthdayConfig.whySpecialCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`glass-card p-8 rounded-3xl border border-pink-500/20 shadow-xl relative overflow-hidden group bg-gradient-to-br ${card.gradient}`}
            >
              {/* Top Accent Icon */}
              <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform">
                {card.icon}
              </div>

              <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-amber-100 mb-3">
                {card.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed font-light">
                "{card.description}"
              </p>

              <div className="absolute top-4 right-4 text-pink-400/30 group-hover:text-pink-400/70 transition-colors">
                <Heart className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
