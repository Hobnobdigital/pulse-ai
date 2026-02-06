'use client';

import { motion } from 'framer-motion';
import PostCard from './PostCard';

interface Post {
  id: string;
  title: string;
  snippet: string;
  image_url: string;
  category: string;
  read_time: string;
  published_at: string;
}

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-[var(--font-display)] font-bold mb-3">
          Latest <span className="text-gradient-neon">Intelligence</span>
        </h2>
        <p className="text-ink-muted font-[var(--font-body)] text-lg max-w-xl">
          Curated insights from the frontier of artificial intelligence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}
