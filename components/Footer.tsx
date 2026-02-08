'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-[var(--font-display)] font-bold mb-3">
              PULSE<span className="text-neon-cyan">.</span>AI
            </h3>
            <p className="text-ink-muted text-sm font-[var(--font-body)] leading-relaxed max-w-xs">
              Your daily dose of AI intelligence. Curated with precision,
              delivered with clarity.
            </p>
            <p className="text-xs text-ink-faint mt-3 font-[var(--font-body)]">
              Editorial Oversight: <span className="text-ink-muted">Kwame Sarkodee-Adoo</span>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[var(--font-display)] font-semibold mb-4 text-sm uppercase tracking-wider text-ink-faint">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Latest Posts', href: '/', color: 'hover:text-neon-cyan' },
                { label: 'Research', href: '#', color: 'hover:text-neon-magenta' },
                { label: 'Industry News', href: '#', color: 'hover:text-neon-yellow' },
                { label: 'AI Transparency', href: '/ai-transparency', color: 'hover:text-neon-cyan' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-ink-muted ${link.color} transition-colors duration-200`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-[var(--font-display)] font-semibold mb-4 text-sm uppercase tracking-wider text-ink-faint">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { name: 'Twitter', icon: '𝕏' },
                { name: 'LinkedIn', icon: 'in' },
                { name: 'GitHub', icon: 'gh' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-ink-muted hover:border-neon-cyan hover:text-neon-cyan hover:neon-glow-cyan transition-all duration-200 font-[var(--font-display)] font-bold text-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-ink-faint font-[var(--font-display)]">
              &copy; 2026 Pulse AI. All rights reserved.
            </p>
            <p className="text-[10px] text-ink-faint mt-1 max-w-md">
              🤖 We believe in transparency. Every article discloses its AI usage. 
              <Link href="/ai-transparency" className="underline hover:text-neon-cyan ml-1">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-xs text-ink-faint hover:text-ink-muted transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
