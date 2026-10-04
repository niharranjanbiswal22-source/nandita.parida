import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Sparkles, ExternalLink } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const Footer: React.FC = () => {
  const { socialLinks, developer } = birthdayConfig;

  return (
    <footer className="py-16 px-4 relative z-10 border-t border-pink-500/20 bg-[#05060e] text-center">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Social Media Connect Section */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/25 shadow-xl max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With {birthdayConfig.shortName}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 mb-6">
            Official Social Accounts ✨
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Instagram Button */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-medium text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-pink-500/30 hover:scale-105 transition-all duration-300"
            >
              {/* Instagram SVG */}
              <svg className="w-5 h-5 fill-current text-amber-200 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>

            {/* Facebook Button */}
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300"
            >
              {/* Facebook SVG */}
              <svg className="w-5 h-5 fill-current text-blue-200 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
              <span>Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>
          </div>
        </div>

        {/* Developer Credit Section (NRB 04) */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-center justify-center space-y-4">
          
          <div className="flex items-center gap-3">
            {/* Developer Circular Portrait */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 opacity-75 blur-xs group-hover:opacity-100 transition duration-500" />
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-pink-300/50 p-0.5 glass-card shadow-lg">
                <img
                  src={developer.photo}
                  alt={developer.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="text-left">
              <span className="text-[11px] text-pink-300 uppercase tracking-widest font-semibold block">
                Developed By
              </span>
              <h4 className="text-lg font-serif font-bold text-white flex items-center gap-1.5">
                <span>{developer.code}</span>
                <span className="text-xs text-gray-400 font-light">({developer.name})</span>
              </h4>
            </div>
          </div>

          {/* Developer Portfolio Link */}
          <a
            href={developer.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-pill hover:bg-white/15 text-xs sm:text-sm text-pink-200 border border-pink-500/30 shadow-md hover:border-pink-400/60 transition-all cursor-pointer group"
          >
            <Globe className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Visit Developer Portfolio ({developer.portfolio.replace('https://', '')})</span>
            <ExternalLink className="w-3.5 h-3.5 text-pink-300" />
          </a>

        </div>

        {/* Closing Signature */}
        <div className="space-y-2 pt-4">
          <p className="text-xs sm:text-sm text-pink-200/80 font-serif italic">
            "Keep smiling. Keep shining. Keep being you. ✨"
          </p>

          <div className="text-[11px] text-gray-500 font-light">
            © {new Date().getFullYear()} • Premium Birthday Surprise Experience for {birthdayConfig.name}
          </div>
        </div>

      </div>
    </footer>
  );
};
