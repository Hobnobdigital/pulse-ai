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

interface PostCardProps {
  post: Post;
  index: number;
}

const categoryColors = {
  LLMs: {
    bg: 'bg-neon-cyan',
    glow: 'group-hover:shadow-[0_0_20px_rgba(0,255,170,0.5)]',
    border: 'border-neon-cyan',
  },
  GenAI: {
    bg: 'bg-neon-magenta',
    glow: 'group-hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]',
    border: 'border-neon-magenta',
  },
  Research: {
    bg: 'bg-neon-yellow',
    glow: 'group-hover:shadow-[0_0_20px_rgba(255,221,0,0.5)]',
    border: 'border-neon-yellow',
  },
  Industry: {
    bg: 'bg-neon-cyan',
    glow: 'group-hover:shadow-[0_0_20px_rgba(0,255,170,0.5)]',
    border: 'border-neon-cyan',
  },
};

export default function PostCard({ post, index }: PostCardProps) {
  const colors = categoryColors[post.category as keyof typeof categoryColors] || categoryColors.LLMs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/post/${post.id}`}>
        <motion.article
          whileHover={{ y: -8 }}
          className="group relative bg-white border-2 border-black/10 overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 hover:border-black hover:shadow-lg"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Neon Glow on Hover */}
            <div className={`absolute inset-0 pointer-events-none opacity-0 ${colors.glow} transition-all duration-500`} />
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Category */}
            <motion.span
              className={`inline-block self-start px-3 py-1 ${colors.bg} text-black font-display font-bold text-xs uppercase tracking-wider mb-3 border border-black`}
              whileHover={{ scale: 1.05 }}
            >
              {post.category}
            </motion.span>

            {/* Title */}
            <h3 className="text-xl font-display font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-cyan group-hover:via-neon-magenta group-hover:to-neon-yellow transition-all duration-300">
              {post.title}
            </h3>

            {/* Snippet */}
            <p className="text-gray-600 font-body text-sm mb-4 flex-1 line-clamp-3">
              {post.snippet}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs font-display text-gray-500">
              <span>{post.read_time}</span>
              <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            className={`h-1 ${colors.bg}`}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}
