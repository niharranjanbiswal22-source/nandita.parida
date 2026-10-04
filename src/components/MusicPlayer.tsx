import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { toggleBackgroundMusic, isAudioPlaying } from '../utils/soundEffects';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const handleToggle = () => {
    const nextState = toggleBackgroundMusic();
    setIsPlaying(nextState);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="relative group"
      >
        <button
          onClick={handleToggle}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full glass-card hover:border-pink-500/50 shadow-xl shadow-black/40 text-sm text-pink-200 transition-all duration-300 cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-md">
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
            
            {/* Equalizer animation when playing */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            )}
          </div>

          <div className="flex flex-col items-start pr-1">
            <span className="text-xs font-semibold text-pink-100 flex items-center gap-1.5">
              <Music className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              {isPlaying ? "Birthday Music" : "Play Birthday Music"}
            </span>
            <span className="text-[10px] text-pink-300/70 font-light">
              {isPlaying ? "Now Playing ❤️" : "Click to Play"}
            </span>
          </div>

          <div className="text-pink-300 pl-1 border-l border-white/10">
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-400" />
            )}
          </div>
        </button>
      </motion.div>
    </div>
  );
};
