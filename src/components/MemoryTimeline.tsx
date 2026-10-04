import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { Sparkles, Calendar, Heart } from 'lucide-react';

export const MemoryTimeline: React.FC = () => {
  const timelineTitles = [
    "01 — A Beautiful Beginning",
    "02 — A Beautiful Smile",
    "03 — A Special Moment",
    "04 — A Memory Worth Keeping",
    "05 — Another Reason To Smile",
    "06 — A Moment To Remember",
    "07 — A Little Happiness",
    "08 — A Precious Memory",
    "09 — Almost At The End...",
    "10 — The Final Birthday Surprise ❤️"
  ];

  return (
    <section id="timeline" className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-500/30"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Timeline</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose"
          >
            A Little Journey Through Beautiful Moments
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-amber-400 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.6)]" />

          <div className="space-y-12 sm:space-y-16">
            {birthdayConfig.photos.map((photo, index) => {
              const isEven = index % 2 === 0;
              const title = timelineTitles[index];

              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 border-4 border-[#070913] shadow-lg shadow-pink-500/50 z-20 flex items-center justify-center text-white text-xs font-bold">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </div>

                  {/* Card Block */}
                  <div className={`w-full sm:w-[44%] ml-16 sm:ml-0 ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <div className="glass-card glass-card-hover p-5 sm:p-6 rounded-2xl border border-pink-500/25 shadow-xl group">
                      
                      {/* Photo Thumbnail */}
                      <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 relative">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[11px] text-pink-200 font-medium">
                          {photo.subtitle}
                        </span>
                      </div>

                      {/* Card Info */}
                      <h3 className="text-lg font-serif font-bold text-pink-200 mb-2 flex items-center gap-2">
                        <span>{title}</span>
                      </h3>
                      
                      <p className="text-gray-300 text-sm font-light leading-relaxed">
                        {photo.caption}
                      </p>

                      <div className="mt-3 pt-3 border-t border-pink-500/15 text-xs text-amber-300/90 italic">
                        "{photo.memoryQuote}"
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
