import { NextResponse } from 'next/server';
import postsData from '@/public/posts/posts.json';

export async function GET() {
  const posts = postsData.posts.slice(0, 20);
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pulse AI — Your Daily AI Intelligence Brief</title>
    <link>https://pulse-ai.vercel.app</link>
    <description>Stay ahead with curated AI news, research breakthroughs, and industry insights.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://pulse-ai.vercel.app/rss" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://pulse-ai.vercel.app/post/${post.id}</link>
      <guid>https://pulse-ai.vercel.app/post/${post.id}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(post.snippet)}</description>
      <category>${post.category}</category>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
