import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ScrollProgress from '@/components/ScrollProgress';
import NewsletterCTA from './NewsletterCTA';
import postsData from '@/public/posts/posts.json';
import ReactMarkdown from 'react-markdown';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return postsData.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  const post = postsData.find((p) => p.id === id);
  if (!post) return {};
  return {
    title: `${post.title} — Pulse AI`,
    description: post.snippet,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = postsData.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ScrollProgress />

      <article className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-surface-dim">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
          {/* Category */}
          <div className="mb-5">
            <span className="inline-block px-4 py-1.5 bg-neon-cyan/90 text-ink text-xs font-[var(--font-display)] font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[var(--font-display)] font-bold mb-6 leading-[1.1] text-ink">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-ink-muted font-[var(--font-display)] text-sm mb-10 pb-8 border-b border-border">
            <span>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-border">|</span>
            <span>{post.read_time}</span>
          </div>

          {/* Markdown Content */}
          <div className="content-prose font-[var(--font-body)]">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-[var(--font-display)] font-bold mt-12 mb-5 text-ink">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-[var(--font-display)] font-semibold mt-8 mb-4 text-ink">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-6 leading-[1.8] text-[#374151] text-[1.125rem]">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-neon-magenta pl-6 my-8 italic text-xl font-[var(--font-body)] text-ink-muted bg-neon-magenta-dim py-4 pr-4 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-[#374151]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#374151]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-[1.7] text-[1.05rem]">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-ink">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="bg-surface-dim px-1.5 py-0.5 rounded text-sm font-mono border border-border">
                    {children}
                  </code>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <NewsletterCTA />

          {/* Back link */}
          <div className="mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-ink-muted hover:text-neon-cyan font-[var(--font-display)] text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
