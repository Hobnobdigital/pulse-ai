'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterCTA() {
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-16 p-8 md:p-10 rounded-2xl bg-ink text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/8 via-transparent to-neon-magenta/8" />
      <div className="relative">
        <h3 className="text-2xl font-[var(--font-display)] font-bold mb-3">
          Stay ahead of the AI curve
        </h3>
        <p className="font-[var(--font-body)] text-white/60 mb-6 leading-relaxed">
          Get the latest AI insights delivered straight to your inbox.
          No spam, just intelligence.
        </p>
        {submitted ? (
          <p className="text-neon-cyan font-[var(--font-display)] font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re subscribed!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/40 font-[var(--font-display)] text-sm focus:outline-none focus:border-neon-cyan/50 transition-all"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-neon-cyan text-ink font-[var(--font-display)] font-bold text-sm rounded-xl hover:shadow-neon-cyan transition-all"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
