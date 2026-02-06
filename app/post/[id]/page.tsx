import { notFound } from 'next/navigation';
import Image from 'next/image';
import ScrollProgress from '@/components/ScrollProgress';
import postsData from '@/public/posts/posts.json';
import ReactMarkdown from 'react-markdown';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return postsData.map((post) => ({
    id: post.id,
  }));
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
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-neon-cyan text-black font-display font-bold text-sm uppercase tracking-wider border-2 border-black">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center space-x-4 text-gray-600 font-display text-sm mb-12 pb-8 border-b-2 border-black/10">
            <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{post.read_time}</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none font-body">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-3xl font-display font-bold mt-12 mb-6">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-display font-bold mt-8 mb-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-6 leading-relaxed text-gray-800">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-neon-magenta pl-6 my-8 italic text-xl font-body neon-glow-magenta bg-neon-magenta/5 py-4">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-6 space-y-2">
                    {children}
                  </ol>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono border border-gray-200">
                    {children}
                  </code>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Call to Action */}
          <div className="mt-16 mb-16 p-8 border-2 border-black bg-gradient-to-br from-neon-cyan/10 via-neon-magenta/10 to-neon-yellow/10">
            <h3 className="text-2xl font-display font-bold mb-4">
              Stay ahead of the AI curve
            </h3>
            <p className="font-body text-gray-700 mb-6">
              Get the latest AI insights delivered straight to your inbox. No spam, just intelligence.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors font-display"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white font-display font-bold rounded-lg hover:bg-neon-cyan hover:text-black transition-all border-2 border-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </article>
    </>
  );
}
