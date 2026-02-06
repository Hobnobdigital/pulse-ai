'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'LinkedIn', href: '#', icon: 'in' },
    { name: 'GitHub', href: '#', icon: 'gh' },
  ];

  return (
    <footer className="border-t border-black/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              PULSE<span className="text-neon-cyan">.</span>AI
            </h3>
            <p className="text-gray-600 text-sm">
              Your daily dose of AI intelligence. Curated with precision, delivered with clarity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-neon-cyan transition-colors">
                  Latest Posts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-neon-magenta transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-neon-yellow transition-colors">
                  Industry News
                </Link>
              </li>
              <li>
                <Link href="/rss" className="text-gray-600 hover:text-neon-cyan transition-colors">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center border-2 border-black/20 rounded-lg hover:border-neon-cyan hover:neon-glow-cyan transition-all font-display font-bold"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 font-display">
            © 2026 Pulse AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-500 hover:text-neon-cyan transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-neon-magenta transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-neon-yellow transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
