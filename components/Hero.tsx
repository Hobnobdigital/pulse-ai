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

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1 bg-black text-white text-xs font-display font-bold uppercase tracking-wider mb-6">
            Featured
          </span>
        </motion.div>

        <Link href={`/post/${post.id}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.01 }}
            className="group relative bg-white border-2 border-black overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Category Badge */}
              <motion.div
                className="absolute top-6 left-6 px-4 py-2 bg-neon-cyan text-black font-display font-bold text-sm border-2 border-black"
                whileHover={{ scale: 1.05 }}
              >
                {post.category}
              </motion.div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.h1
                  className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {post.title}
                </motion.h1>
                
                <motion.p
                  className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl font-body"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {post.snippet}
                </motion.p>

                <motion.div
                  className="flex items-center space-x-4 text-sm text-white/80 font-display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span>{post.read_time}</span>
                  <span>•</span>
                  <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </motion.div>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: 'inset 0 0 60px rgba(0, 255, 170, 0.3)',
              }}
            />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
