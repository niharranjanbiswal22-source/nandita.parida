import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Mail, Sparkles, Heart } from 'lucide-react';

export const PersonalMessage: React.FC = () => {
  return (
    <section id="message" className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-card rounded-3xl p-8 sm:p-12 border border-pink-500/25 shadow-2xl overflow-hidden"
        >
          {/* Subtle Decorative Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-pink-500/20 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 flex items-center justify-center border border-pink-500/30 text-pink-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200">
                  {birthdayConfig.personalMessage.title}
                </h2>
                <p className="text-xs text-pink-300/70 font-light">
                  A heartfelt note written just for you
                </p>
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-amber-300/80 animate-pulse" />
          </div>

          {/* Body Paragraphs with Handwritten Style Accent */}
          <div className="space-y-5 text-gray-200 leading-relaxed font-light text-base sm:text-lg">
            {birthdayConfig.personalMessage.paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={idx === 0 ? "font-serif text-xl sm:text-2xl text-pink-300 font-semibold mb-4" : ""}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 pt-6 border-t border-pink-500/20 flex items-center justify-between"
          >
            <span className="font-handwriting text-3xl sm:text-4xl text-rose-300 text-glow-rose">
              {birthdayConfig.personalMessage.closing}
            </span>
            <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Heart className="w-5 h-5 fill-pink-400" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
