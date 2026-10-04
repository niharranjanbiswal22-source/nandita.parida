import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles, Heart } from 'lucide-react';

export const CinematicReveal: React.FC = () => {
  // Use first 4 photos for the 4 cinematic quotes
  const revealItems = birthdayConfig.photos.slice(0, 4).map((photo, i) => ({
    photo,
    quote: birthdayConfig.cinematicQuotes[i] || photo.memoryQuote
  }));

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-24">
        
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-500/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Cinematic Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose"
          >
            Moments Written In Time
          </motion.h2>
        </div>

        {revealItems.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.photo.id}
              className={`flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-10 lg:gap-16`}
            >
              {/* Photo Block */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-pink-500/30 shadow-2xl group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                    <img
                      src={item.photo.url}
                      alt={item.photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-pink-200 font-medium">
                      <span>{item.photo.subtitle}</span>
                      <span className="px-2.5 py-1 rounded-full glass-pill border border-white/20">
                        {item.photo.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text Block */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-1/2 text-center lg:text-left space-y-4"
              >
                <div className="inline-flex items-center gap-2 text-amber-300 font-serif text-sm tracking-widest uppercase">
                  <span>0{index + 1}</span>
                  <span className="w-8 h-px bg-amber-300/40" />
                  <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                </div>

                <blockquote className="text-2xl sm:text-4xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-amber-100 leading-snug">
                  "{item.quote}"
                </blockquote>

                <p className="text-gray-300 text-base font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                  {item.photo.caption}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
