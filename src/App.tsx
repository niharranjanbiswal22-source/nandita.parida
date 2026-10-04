import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { birthdayConfig } from './config/birthdayConfig';
import { startBackgroundMusic } from './utils/soundEffects';

import { BackgroundParticles } from './components/BackgroundParticles';
import { OpeningScreen } from './components/OpeningScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BirthdayBannerSection } from './components/BirthdayBannerSection';
import { PersonalMessage } from './components/PersonalMessage';
import { PhotoGallery } from './components/PhotoGallery';
import { PhotoSlideshowModal } from './components/PhotoSlideshowModal';
import { CinematicReveal } from './components/CinematicReveal';
import { MemoryTimeline } from './components/MemoryTimeline';
import { WhySpecial } from './components/WhySpecial';
import { WishGenerator } from './components/WishGenerator';
import { VirtualCake } from './components/VirtualCake';
import { SurpriseBox } from './components/SurpriseBox';
import { SecretMessage } from './components/SecretMessage';
import { SendMessageForm } from './components/SendMessageForm';
import { TenWishes } from './components/TenWishes';
import { DateBadge } from './components/DateBadge';
import { CelebrationFireworksSection } from './components/CelebrationFireworksSection';
import { FinalCinematicSection } from './components/FinalCinematicSection';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';

export function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);

  const handleOpenSurprise = () => {
    setIsOpened(true);
    // Start ambient audio synth or mp3
    const playing = startBackgroundMusic(birthdayConfig.musicPath);
    setIsPlaying(playing);
  };

  const handleStartJourney = () => {
    const el = document.getElementById('banner-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const msgEl = document.getElementById('message');
      if (msgEl) msgEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#070913] text-gray-100 font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden">
      
      {/* Interactive Canvas Particle Layer */}
      <BackgroundParticles />

      {/* Opening Screen Gate */}
      <AnimatePresence>
        {!isOpened && (
          <OpeningScreen onOpen={handleOpenSurprise} />
        )}
      </AnimatePresence>

      {/* Main Experience when Opened */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Header Navigation */}
          <Navbar onOpenSlideshow={() => setIsSlideshowOpen(true)} />

          {/* 1. Hero Section */}
          <HeroSection onStartJourney={handleStartJourney} />

          {/* 2. Official Birthday Banner Section */}
          <div id="banner-section">
            <BirthdayBannerSection />
          </div>

          {/* 3. Personal Birthday Message */}
          <PersonalMessage />

          {/* 4. Photo Gallery (10 Personal Photos + Lightbox) */}
          <PhotoGallery />

          {/* 5. Cinematic Photo Reveal */}
          <CinematicReveal />

          {/* 6. Memory Timeline */}
          <MemoryTimeline />

          {/* 7. Why You're Special */}
          <WhySpecial />

          {/* 8. Birthday Wish Generator */}
          <WishGenerator />

          {/* 9. Virtual Birthday Cake Interaction */}
          <VirtualCake />

          {/* 10. Surprise Box */}
          <SurpriseBox />

          {/* 11. Secret Message */}
          <SecretMessage />

          {/* 12. Send Message / Wish Form (Formspree Integrated) */}
          <SendMessageForm />

          {/* 13. 10 Birthday Wishes */}
          <TenWishes />

          {/* 14. Birthday Countdown / Special Date */}
          <DateBadge />

          {/* 15. Interactive Fireworks Celebration */}
          <CelebrationFireworksSection />

          {/* 16. Final Cinematic Section */}
          <FinalCinematicSection onReplay={handleReplay} />

          {/* Footer */}
          <Footer />

          {/* Floating Music Player */}
          <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

          {/* Photo Slideshow Modal */}
          <PhotoSlideshowModal
            isOpen={isSlideshowOpen}
            onClose={() => setIsSlideshowOpen(false)}
          />
        </motion.div>
      )}

    </div>
  );
}

export default App;
