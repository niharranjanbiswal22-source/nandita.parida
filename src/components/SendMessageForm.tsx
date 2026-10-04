import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Heart, Sparkles, CheckCircle2, Mail, User, MessageSquare } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playSparkleSound } from '../utils/soundEffects';

export const SendMessageForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mjyknqlw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name || 'Anonymous Well-Wisher',
          email: formData.email || 'not-provided@birthday.com',
          message: formData.message,
          recipient: birthdayConfig.name,
          date: new Date().toLocaleString()
        })
      });

      if (response.ok) {
        setStatus('success');
        playSparkleSound();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f472b6', '#fbbf24', '#e879f9', '#ffffff']
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message.');
      }
    } catch (err: any) {
      console.error('Formspree submit error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="send-message" className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-pink-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-500/30">
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct Inbox</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow-rose mb-3">
              Leave A Birthday Message 💌
            </h2>

            <p className="text-gray-300 text-sm sm:text-base font-light max-w-md mx-auto">
              Send a direct birthday note or wish. Your message will be delivered instantly to the inbox!
            </p>
          </div>

          {/* Form / Success State */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-pink-200 to-amber-200">
                  Message Sent With Love! ❤️
                </h3>
                
                <p className="text-gray-300 text-sm font-light max-w-md mx-auto">
                  Thank you! Your birthday note has been delivered successfully.
                </p>

                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2.5 rounded-full glass-pill text-xs text-pink-200 border border-pink-500/30 hover:bg-pink-500/20 transition-colors cursor-pointer"
                >
                  Send Another Message ✍️
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-pink-300 flex items-center gap-1.5 uppercase tracking-wider">
                      <User className="w-3.5 h-3.5 text-amber-300" />
                      <span>Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-pill border border-pink-500/30 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-pink-300 flex items-center gap-1.5 uppercase tracking-wider">
                      <Mail className="w-3.5 h-3.5 text-amber-300" />
                      <span>Your Email (Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-pill border border-pink-500/30 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-pink-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                    <span>Birthday Wish / Special Message *</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write a sweet birthday wish for Nandita..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-pill border border-pink-500/30 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-rose-400 text-center font-medium">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-semibold text-base sm:text-lg shadow-xl shadow-pink-500/30 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Birthday Wish ❤️</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
};
