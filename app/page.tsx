import Hero from '@/components/Hero';
import PostGrid from '@/components/PostGrid';
import postsData from '@/public/posts/posts.json';

export default function Home() {
  const posts = postsData.posts;
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      <Hero post={featuredPost} />
      <PostGrid posts={otherPosts} />
    </>
  );
}
