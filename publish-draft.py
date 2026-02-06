#!/usr/bin/env python3
"""
Pulse AI - Publish Draft Articles
Publishes reviewed drafts to the live site
"""

import json
import os
from datetime import datetime

def publish_draft(numbers):
    """Publish selected drafts"""
    
    drafts_file = '/home/ec2-user/clawd/pulse-ai/.article-drafts.json'
    posts_file = '/home/ec2-user/clawd/pulse-ai/public/posts/posts.json'
    
    if not os.path.exists(drafts_file):
        print("No drafts to publish")
        return
    
    with open(drafts_file, 'r') as f:
        drafts = json.load(f)
    
    if not drafts:
        print("No drafts found")
        return
    
    # Read existing posts
    with open(posts_file, 'r') as f:
        posts = json.load(f)
    
    published = []
    
    for num in numbers:
        try:
            idx = int(num) - 1
            if 0 <= idx < len(drafts):
                draft = drafts[idx]
                
                # Clean up draft for publishing
                post = {
                    "id": draft['id'],
                    "slug": draft['slug'],
                    "title": draft['title'],
                    "snippet": draft['snippet'],
                    "content": draft['content'],
                    "category": draft['category'],
                    "read_time": draft['readTime'],
                    "image_url": draft['image_url'],
                    "images": draft['images'],
                    "source": draft['source'],
                    "source_attribution": draft['source_attribution'],
                    "original_link": draft.get('originalLink', '#'),
                    "published_at": datetime.now().isoformat()
                }
                
                # Add to posts
                posts.insert(0, post)
                published.append(draft['title'])
                
                print(f"✅ Published: {draft['title']}")
            else:
                print(f"⚠️ Invalid article number: {num}")
        except ValueError:
            print(f"⚠️ Invalid input: {num}")
    
    # Keep only last 50 posts
    posts = posts[:50]
    
    # Save posts
    with open(posts_file, 'w') as f:
        json.dump(posts, f, indent=2)
    
    # Git commit and push
    if published:
        print("\n🚀 Pushing to GitHub...")
        os.system('cd /home/ec2-user/clawd/pulse-ai && git add -A && git commit -m "auto: Publish new articles" && git push')
        print("✅ Deployed to Vercel!")
        
        print(f"\n📊 Published {len(published)} articles:")
        for title in published:
            print(f"   • {title}")
        
        # Clear drafts
        os.remove(drafts_file)
        print("\n🗑️ Drafts cleared")

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python3 publish-draft.py 1,2,3")
        print("       python3 publish-draft.py all")
        print("       python3 publish-draft.py skip")
        return
    
    arg = sys.argv[1].lower()
    
    if arg == 'skip':
        drafts_file = '/home/ec2-user/clawd/pulse-ai/.article-drafts.json'
        if os.path.exists(drafts_file):
            os.remove(drafts_file)
            print("🗑️ Drafts discarded")
        return
    
    if arg == 'all':
        drafts_file = '/home/ec2-user/clawd/pulse-ai/.article-drafts.json'
        if os.path.exists(drafts_file):
            with open(drafts_file, 'r') as f:
                drafts = json.load(f)
            numbers = [str(i+1) for i in range(len(drafts))]
            publish_draft(numbers)
    else:
        numbers = [n.strip() for n in arg.split(',')]
        publish_draft(numbers)

if __name__ == "__main__":
    main()
