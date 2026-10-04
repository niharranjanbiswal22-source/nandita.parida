import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthdayConfig';
import { X, Play, Pause, ChevronLeft, ChevronRight, Film } from 'lucide-react';

interface SlideshowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoSlideshowModal: React.FC<SlideshowProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % birthdayConfig.photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentPhoto = birthdayConfig.photos[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full max-w-5xl h-[85vh] flex flex-col items-center justify-between py-6">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-pink-500/30 text-pink-200 text-xs sm:text-sm font-medium">
            <Film className="w-4 h-4 text-amber-300" />
            <span>Nandita's Memory Film • {currentIndex + 1} / {birthdayConfig.photos.length}</span>
          </div>

          {/* Photo Showcase with Framer Motion AnimatePresence */}
          <div className="relative w-full h-[65vh] flex items-center justify-center my-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-pink-500/20"
                />

                {/* Subtitle & Caption overlay */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-amber-300 uppercase font-semibold tracking-wider">
                    {currentPhoto.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-amber-200">
                    {currentPhoto.caption}
                  </h3>
                  <p className="text-sm text-pink-200/80 italic font-light mt-1">
                    "{currentPhoto.memoryQuote}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-6 px-6 py-3 rounded-full glass-card border border-pink-500/30">
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? birthdayConfig.photos.length - 1 : prev - 1))}
              className="p-2 text-pink-200 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-105 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % birthdayConfig.photos.length)}
              className="p-2 text-pink-200 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
