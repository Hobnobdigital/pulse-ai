'use client';

import { useEffect } from 'react';

interface DisqusCommentsProps {
  postId: string;
  postTitle: string;
  postSlug: string;
}

export default function DisqusComments({ postId, postTitle, postSlug }: DisqusCommentsProps) {
  useEffect(() => {
    // Disqus configuration
    const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || 'pulse-ai-blog';
    
    // @ts-ignore
    const disqusConfig = window.disqus_config || function () {
      // @ts-ignore
      this.page.url = `${window.location.origin}/post/${postSlug}`;
      // @ts-ignore
      this.page.identifier = postId;
      // @ts-ignore
      this.page.title = postTitle;
    };
    
    // @ts-ignore
    window.disqus_config = disqusConfig;

    // Load Disqus script
    const script = document.createElement('script');
    script.src = `https://${disqusShortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', Date.now().toString());
    script.async = true;

    // Remove existing script if present
    const existingScript = document.querySelector(`script[src*="${disqusShortname}.disqus.com/embed.js"]`);
    if (existingScript) {
      existingScript.remove();
    }

    document.body.appendChild(script);

    return () => {
      // Cleanup
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
      <div id="disqus_thread" className="min-h-[400px]" />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}
