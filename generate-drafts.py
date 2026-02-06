#!/usr/bin/env python3
"""
Pulse AI - Auto Article Generator
Automatically rewrites sourced articles with Claude + generates images
Presents drafts for your review
"""

import json
import os
import re
import requests
import base64
from datetime import datetime

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

def rewrite_with_claude(title, content, source, link):
    """Rewrite article with Claude - witty educational tone"""
    
    # Check if it's a serious topic
    serious_topics = ['safety', 'ethics', 'bias', 'job displacement', 'regulation', 'privacy', 'security breach']
    is_serious = any(topic in f"{title} {content}".lower() for topic in serious_topics)
    
    if is_serious:
        tone_instruction = """
Tone: Serious, thoughtful, analytical. NO humor. Treat with appropriate gravity.
Style: In-depth analysis, balanced perspective, clear implications.
"""
    else:
        tone_instruction = """
Tone: Witty, sharp, educational with dry humor. Smart and informed but accessible.
Style: Engaging, punchy writing that makes complex topics digestible. Use metaphors and analogies.
"""
    
    prompt = f"""You are a tech journalist for Pulse AI - an AI news blog for professionals and enthusiasts.

Rewrite this article based on the source material:

SOURCE TITLE: {title}
SOURCE CONTENT: {content[:5000]}
SOURCE: {source}
ORIGINAL LINK: {link}

Requirements:
1. Headline: Catchy, informative
2. {tone_instruction}
3. Length: 400-500 words
4. Structure: Engaging intro, key insights, why it matters, closing thought
5. Make it completely original - not traceable to source
6. Include reading time estimate
7. Category: Choose from [LLMs, Enterprise AI, Industry, Research, GenAI]

Return valid JSON:
{{
  "title": "headline",
  "category": "Category",
  "readTime": "X min read",
  "excerpt": "2-3 sentence summary",
  "content": "full article text with paragraphs separated by double newlines",
  "tone": "witty|serious",
  "source": "{source}",
  "originalLink": "{link}"
}}"""

    try:
        response = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01"
            },
            json={
                "model": "claude-3-haiku-20240307",
                "max_tokens": 2500,
                "messages": [{"role": "user", "content": prompt}]
            },
            timeout=120
        )
        
        if response.status_code == 200:
            data = response.json()
            content_text = data['content'][0]['text']
            
            # Extract JSON
            json_match = re.search(r'\{[\s\S]*\}', content_text)
            if json_match:
                article = json.loads(json_match.group(0))
                
                # Add metadata
                article['id'] = re.sub(r'[^a-z0-9-]+', '-', article['title'].lower())[:50].strip('-')
                article['slug'] = article['id']
                
                return article
        
        return None
    except Exception as e:
        print(f"Error with Claude: {e}")
        return None

def generate_image(title, excerpt):
    """Generate editorial image with OpenAI"""
    
    prompt = f"Photorealistic editorial illustration for AI news article. Title: {title}. Content: {excerpt}. Modern tech aesthetic with deep purple and cyan neon accents. Cinematic lighting, professional quality."
    
    try:
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-image-1.5",
                "prompt": prompt,
                "size": "1536x1024",
                "quality": "high"
            },
            timeout=180
        )
        
        if response.status_code == 200:
            data = response.json()
            return data['data'][0]['b64_json']
        
        return None
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

def process_articles():
    """Process pending articles from RSS monitor"""
    
    state_file = '/home/ec2-user/clawd/pulse-ai/.rss-monitor-state.json'
    
    if not os.path.exists(state_file):
        print("No pending articles to process")
        return
    
    with open(state_file, 'r') as f:
        state = json.load(f)
    
    articles = state.get('articles', [])
    
    if not articles:
        print("No new articles found")
        return
    
    print(f"📝 Found {len(articles)} article(s) to process (target: 6/day)\n")
    
    drafts = []
    
    for i, article in enumerate(articles, 1):
        print(f"[{i}/{len(articles)}] Processing: {article['title'][:60]}...")
        
        # Rewrite with Claude
        print("   ✍️ Rewriting with Claude...")
        draft = rewrite_with_claude(
            article['title'],
            article['description'],
            article['source'],
            article['link']
        )
        
        if draft:
            # Generate image
            print("   🎨 Generating image...")
            image_b64 = generate_image(draft['title'], draft['excerpt'])
            
            if image_b64:
                timestamp = int(datetime.now().timestamp())
                image_filename = f"{draft['id']}-{timestamp}.png"
                image_path = f"/home/ec2-user/clawd/pulse-ai/public/images/{image_filename}"
                
                with open(image_path, "wb") as f:
                    f.write(base64.b64decode(image_b64))
                
                draft['image_url'] = f"/images/{image_filename}"
                draft['image_path'] = image_path
            else:
                draft['image_url'] = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200"
            
            draft['images'] = [draft['image_url']]
            draft['source_attribution'] = f"Based on {draft['source']}"
            draft['published_at'] = datetime.now().isoformat()
            draft['snippet'] = draft['excerpt']
            
            drafts.append(draft)
            print(f"   ✅ Draft complete\n")
        else:
            print(f"   ❌ Failed to rewrite\n")
    
    # Save drafts for review
    drafts_file = '/home/ec2-user/clawd/pulse-ai/.article-drafts.json'
    with open(drafts_file, 'w') as f:
        json.dump(drafts, f, indent=2)
    
    # Generate review digest
    generate_review_digest(drafts)
    
    print(f"\n🎉 {len(drafts)} articles ready for your review!")
    print("📋 Check .article-drafts.json or .review-digest.txt")

def generate_review_digest(drafts):
    """Generate human-readable digest for review"""
    
    digest = f"""📰 PULSE AI - ARTICLES READY FOR REVIEW
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}
Total Drafts: {len(drafts)}

"""
    
    for i, draft in enumerate(drafts, 1):
        tone_emoji = "🎭" if draft.get('tone') == 'witty' else "📋"
        digest += f"""
{'='*60}
ARTICLE #{i} {tone_emoji}
{'='*60}

TITLE: {draft['title']}
CATEGORY: {draft['category']}
READ TIME: {draft['readTime']}
TONE: {draft.get('tone', 'witty')}
SOURCE: {draft['source']}
IMAGE: {draft['image_url']}

EXCERPT:
{draft['excerpt']}

CONTENT:
{draft['content'][:500]}...

---
"""
    
    digest += """
COMMANDS:
  python3 publish-draft.py 1,2,3    - Publish articles 1, 2, and 3
  python3 publish-draft.py all      - Publish all drafts
  python3 publish-draft.py skip     - Discard all drafts
"""
    
    with open('/home/ec2-user/clawd/pulse-ai/.review-digest.txt', 'w') as f:
        f.write(digest)
    
    print(digest)

def main():
    process_articles()

if __name__ == "__main__":
    main()
