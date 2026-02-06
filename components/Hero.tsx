'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  snippet: string;
  image_url: string;
  category: string;
  read_time: string;
  published_at: string;
}

export default function Hero({ post }: { post: Post }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 bg-neon-cyan text-ink text-xs font-[var(--font-display)] font-bold uppercase tracking-widest border border-ink/10 rounded-full">
            Featured
          </span>
        </motion.div>

        <Link href={`/post/${post.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-[350px] sm:h-[420px] md:h-[520px] lg:h-[560px] overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-60" />

              {/* Category */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-neon-cyan/90 backdrop-blur-sm text-ink text-xs font-[var(--font-display)] font-bold uppercase tracking-wider rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-[var(--font-display)] font-bold text-white mb-3 md:mb-4 leading-[1.1] max-w-4xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {post.title}
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-white/85 mb-4 md:mb-6 max-w-3xl font-[var(--font-body)] leading-relaxed line-clamp-2 md:line-clamp-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {post.snippet}
                </motion.p>

                <motion.div
                  className="flex items-center gap-3 text-sm text-white/70 font-[var(--font-display)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="px-2.5 py-0.5 bg-white/15 backdrop-blur-sm rounded-full text-xs">
                    {post.read_time}
                  </span>
                  <span className="text-white/40">|</span>
                  <span>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Hover neon border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-neon-cyan/40 transition-all duration-500 pointer-events-none" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
