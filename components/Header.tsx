'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only for now
    alert('Email signup coming soon!');
    setEmail('');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <span className="text-3xl font-display font-bold tracking-tight">
                PULSE<span className="text-neon-cyan">.</span>AI
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-display font-medium hover:text-neon-cyan transition-colors">
              Latest
            </Link>
            <Link href="#" className="text-sm font-display font-medium hover:text-neon-magenta transition-colors">
              Research
            </Link>
            <Link href="#" className="text-sm font-display font-medium hover:text-neon-yellow transition-colors">
              Industry
            </Link>
          </nav>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="hidden lg:flex items-center">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border-2 border-black/20 rounded-l-lg focus:outline-none focus:border-neon-cyan transition-colors text-sm font-display"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-black text-white font-display font-medium rounded-r-lg hover:bg-neon-cyan hover:text-black transition-all border-2 border-black text-sm"
            >
              Subscribe
            </motion.button>
          </form>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
