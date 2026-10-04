import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import type { BirthdayPhoto } from '../config/birthdayConfig';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! === 0 ? birthdayConfig.photos.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! === birthdayConfig.photos.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-500/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Memory Album</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose max-w-3xl mx-auto leading-tight"
          >
            10 Moments, 10 Memories, One Beautiful Person ❤️
          </motion.h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {birthdayConfig.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="relative group rounded-2xl overflow-hidden glass-card glass-card-hover cursor-pointer border border-pink-500/20 shadow-xl"
            >
              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Subtitle Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-pill text-[11px] text-pink-200 font-medium border border-white/20">
                  {photo.subtitle}
                </div>

                {/* Expand Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-pink-300" />
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <span className="text-[10px] text-amber-300 uppercase font-semibold tracking-wider block mb-1">
                    Photo {index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-white group-hover:text-pink-200 transition-colors line-clamp-1">
                    {photo.caption}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center glass-card rounded-3xl p-4 sm:p-6 border border-pink-500/30 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full glass-pill text-xs text-pink-200 border border-pink-500/30 font-medium">
                {selectedPhotoIndex + 1} of {birthdayConfig.photos.length}
              </div>

              {/* Image View */}
              <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden my-6 bg-black/40">
                <img
                  src={birthdayConfig.photos[selectedPhotoIndex].url}
                  alt={birthdayConfig.photos[selectedPhotoIndex].caption}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />

                {/* Prev & Next Buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-pink-600/80 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-pink-600/80 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Caption */}
              <div className="text-center px-4">
                <span className="text-xs text-pink-300 font-semibold uppercase tracking-wider">
                  {birthdayConfig.photos[selectedPhotoIndex].subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {birthdayConfig.photos[selectedPhotoIndex].caption}
                </h3>
                <p className="text-sm text-pink-200/80 font-light italic mt-2">
                  "{birthdayConfig.photos[selectedPhotoIndex].memoryQuote}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
