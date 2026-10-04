import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gamepad2, Trophy, RotateCcw, Sparkles, Heart, Star, Gift, Flower2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playSparkleSound, playCelebrationSound } from '../utils/soundEffects';

interface FallingItem {
  id: number;
  x: number; // percentage 0 - 90
  y: number; // pixels
  speed: number;
  symbol: string;
  points: number;
  color: string;
}

export const BirthdayGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isFinished, setIsFinished] = useState(false);
  const [basketX, setBasketX] = useState(50); // percentage

  const [items, setItems] = useState<FallingItem[]>([]);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);

  const symbols = [
    { char: '💖', points: 10, color: '#f472b6' },
    { char: '✨', points: 15, color: '#fbbf24' },
    { char: '🎂', points: 25, color: '#e879f9' },
    { char: '🎁', points: 20, color: '#38bdf8' },
    { char: '🌸', points: 10, color: '#f43f5e' },
    { char: '⭐', points: 15, color: '#facc15' }
  ];

  // Start game loop
  const startGame = () => {
    setIsPlaying(true);
    setIsFinished(false);
    setScore(0);
    setTimeLeft(25);
    setItems([]);
    playSparkleSound();
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setIsFinished(true);
          playCelebrationSound();
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Falling Items Spawner & Physics
  useEffect(() => {
    if (!isPlaying) return;

    // Spawn items
    const spawnInterval = setInterval(() => {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const newItem: FallingItem = {
        id: Date.now() + Math.random(),
        x: Math.random() * 82 + 5, // 5% to 87%
        y: -30,
        speed: Math.random() * 3 + 2.5,
        symbol: randomSymbol.char,
        points: randomSymbol.points,
        color: randomSymbol.color
      };
      setItems((prev) => [...prev.slice(-15), newItem]);
    }, 500);

    // Physics movement loop
    const moveInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + item.speed * 4 }))
          .filter((item) => item.y < 380)
      );
    }, 30);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [isPlaying]);

  // Click/Tap item catch
  const handleItemCatch = (itemId: number, points: number) => {
    if (!isPlaying) return;
    setScore((prev) => prev + points);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    playSparkleSound();
  };

  // Handle Mouse/Touch Basket Follow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(85, relativeX)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || e.touches.length === 0) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(85, relativeX)));
  };

  return (
    <section id="game" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-500/30"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          <span>Interactive Mini Game</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-3"
        >
          Nandita's Birthday Catch Game 🌸🎮
        </motion.h2>

        <p className="text-gray-300 text-sm sm:text-base font-light max-w-lg mx-auto mb-8">
          Tap or catch as many falling hearts, stars & birthday gifts as you can before time runs out!
        </p>

        {/* Game Container */}
        <div className="glass-card rounded-3xl p-4 sm:p-8 border border-pink-500/30 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
          
          {/* Top Bar Status */}
          <div className="flex items-center justify-between px-4 py-2 rounded-2xl glass-pill mb-4 border border-white/10 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-1.5 text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Score: {score}</span>
            </div>

            <div className="flex items-center gap-1.5 text-pink-300">
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin" />
              <span>Time: {timeLeft}s</span>
            </div>
          </div>

          {/* Game Playing Canvas Area */}
          <div
            ref={gameAreaRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[380px] rounded-2xl bg-gradient-to-b from-[#0a0c1e] via-[#120e2e] to-[#1c0d2e] border border-pink-500/20 overflow-hidden cursor-crosshair touch-none select-none"
          >
            {!isPlaying && !isFinished && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white text-3xl mb-4 shadow-lg shadow-pink-500/40 animate-pulse">
                  🎮
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  Ready To Play, {birthdayConfig.shortName}?
                </h3>
                <p className="text-xs sm:text-sm text-pink-200/80 font-light mb-6 max-w-xs">
                  Catch the falling hearts, cakes & sparkles to unlock your special birthday score!
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-pink-500/40 hover:scale-105 transition-transform cursor-pointer"
                >
                  Start Game 🚀
                </button>
              </div>
            )}

            {/* Falling Items */}
            {isPlaying &&
              items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemCatch(item.id, item.points)}
                  onTouchStart={() => handleItemCatch(item.id, item.points)}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}px`
                  }}
                  className="absolute transform -translate-x-1/2 text-3xl sm:text-4xl cursor-pointer hover:scale-125 transition-transform active:scale-150 animate-bounce"
                >
                  {item.symbol}
                </div>
              ))}

            {/* Catch Basket */}
            {isPlaying && (
              <div
                style={{ left: `${basketX}%` }}
                className="absolute bottom-3 transform -translate-x-1/2 w-20 h-10 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 border-2 border-white flex items-center justify-center shadow-lg shadow-pink-500/50 transition-all duration-75"
              >
                <span className="text-xl">🧺</span>
              </div>
            )}

            {/* Game Finished / Score Screen */}
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-white text-3xl mb-3 shadow-lg animate-bounce">
                  👑
                </div>

                <span className="text-xs uppercase font-semibold text-amber-300 tracking-widest mb-1">
                  Game Completed!
                </span>

                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 mb-2">
                  Score: {score} Points 🎉
                </h3>

                <p className="text-sm text-pink-100 font-light italic mb-6 max-w-sm">
                  {score > 150
                    ? `Wow ${birthdayConfig.shortName}! You are an absolute Birthday Master Queen! 👑✨`
                    : score > 80
                    ? `Great job ${birthdayConfig.shortName}! You caught so many sweet memories & wishes! ❤️`
                    : `Super cute effort ${birthdayConfig.shortName}! You are officially crowned Birthday Princess! 🌸`}
                </p>

                <button
                  onClick={startGame}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm shadow-xl shadow-pink-500/30 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again 🔄</span>
                </button>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
