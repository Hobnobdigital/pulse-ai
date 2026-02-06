'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-ink" />
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 bg-neon-cyan/15 text-neon-cyan text-xs font-[var(--font-display)] font-bold uppercase tracking-widest rounded-full mb-6 border border-neon-cyan/20">
                Free Newsletter
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-display)] font-bold text-white mb-4 leading-tight">
                Get the AI brief that
                <br />
                <span className="text-gradient-neon">10,000+ builders</span> read daily
              </h2>

              <p className="text-white/60 font-[var(--font-body)] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Five minutes. Every morning. The most important AI developments,
                distilled into plain English. No hype, no fluff.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 text-neon-cyan font-[var(--font-display)] font-semibold text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You&apos;re in! Check your inbox.
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/40 font-[var(--font-display)] text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-3.5 bg-neon-cyan text-ink font-[var(--font-display)] font-bold text-sm rounded-xl hover:shadow-neon-cyan transition-all duration-200"
                >
                  Subscribe Free
                </motion.button>
              </motion.form>
            )}

            <p className="text-white/30 text-xs font-[var(--font-display)] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
