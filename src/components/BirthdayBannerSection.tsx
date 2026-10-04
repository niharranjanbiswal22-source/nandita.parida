import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, Heart, Award } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const BirthdayBannerSection: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <section className="py-16 px-4 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/30 shadow-lg shadow-amber-500/10"
        >
          <Award className="w-4 h-4" />
          <span>Official Birthday Poster</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-10"
        >
          Special Birthday Banner For {birthdayConfig.shortName} ❤️
        </motion.h2>

        {/* Banner Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto rounded-3xl p-3 sm:p-4 glass-card border border-pink-500/40 shadow-2xl group cursor-pointer overflow-hidden"
          onClick={() => setIsFullscreen(true)}
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-amber-400 opacity-30 group-hover:opacity-75 blur-xl transition-opacity duration-700 pointer-events-none" />

          {/* Banner Image Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-pink-400/30">
            <img
              src="/images/birthday-banner.jpg"
              alt={`Happy Birthday ${birthdayConfig.name} Banner`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Top Right Expand Badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-pink-600 transition-all shadow-lg">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen View 🔍</span>
            </div>

            {/* Bottom Gradient Bar */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="font-serif italic text-pink-200">"A beautiful soul deserves a beautiful day"</span>
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Tap to Expand
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center glass-card rounded-3xl p-3 sm:p-6 border border-pink-500/40 shadow-2xl overflow-hidden"
            >
              <div className="relative w-full h-[75vh] sm:h-[80vh] flex items-center justify-center">
                <img
                  src="/images/birthday-banner.jpg"
                  alt={`Happy Birthday ${birthdayConfig.name} Banner Fullscreen`}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200">
                  Happy Birthday Nandita Parida ❤️
                </h3>
                <p className="text-xs sm:text-sm text-pink-300/80 font-light mt-1">
                  Wishing You A Very Happy Birthday To The Amazing Nandita Parida
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
