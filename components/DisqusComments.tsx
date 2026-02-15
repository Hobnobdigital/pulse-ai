'use client';

import { useEffect, useRef } from 'react';

interface DisqusCommentsProps {
  postId: string;
  postTitle: string;
  postSlug: string;
}

export default function DisqusComments({ postId, postTitle, postSlug }: DisqusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || 'pulse-ai-blog';
    
    // Reset Disqus thread container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Remove any existing Disqus global objects to force reinit
    // @ts-ignore
    if (window.DISQUS) {
      // @ts-ignore
      window.DISQUS.reset({ reload: true });
    }

    // Configure Disqus
    // @ts-ignore
    window.disqus_config = function () {
      // @ts-ignore
      this.page.url = `${window.location.origin}/post/${postSlug}`;
      // @ts-ignore
      this.page.identifier = postId;
      // @ts-ignore
      this.page.title = postTitle;
      // @ts-ignore
      this.callbacks.onReady = [function() {
        console.log('Disqus loaded for:', postId);
      }];
    };

    // Remove existing embed script
    const existingEmbed = document.querySelector(`script[src*="${disqusShortname}.disqus.com/embed.js"]`);
    if (existingEmbed) {
      existingEmbed.remove();
    }

    // Create and append new script
    const script = document.createElement('script');
    script.src = `https://${disqusShortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', Date.now().toString());
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup - remove script
      const scriptToRemove = document.querySelector(`script[src*="${disqusShortname}.disqus.com/embed.js"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [postId, postTitle, postSlug]);

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-xl font-[var(--font-display)] font-bold mb-6 text-ink">
        Join the Conversation
      </h3>
      <div ref={containerRef} id="disqus_thread" className="min-h-[400px]" />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}
