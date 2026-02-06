#!/usr/bin/env python3
"""Generate 3 articles for today with GPT-1.5 images"""

import json
import os
import re
import requests
import base64
from datetime import datetime

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

articles_to_write = [
    {
        "source": "TechCrunch AI",
        "title": "The backlash over OpenAI's decision to retire GPT-4o shows how dangerous AI companionship can be",
        "content": "When OpenAI announced it was retiring GPT-4o, users reacted with grief and anger. Many had formed deep emotional bonds with the AI, treating it as a friend or companion. This highlights the risks of anthropomorphizing AI systems and the psychological impact when they change or disappear.",
        "link": "https://techcrunch.com/2026/02/06/openai-gpt-4o-retirement-backlash/"
    },
    {
        "source": "TechCrunch AI", 
        "title": "Sapiom raises $15M to help AI agents buy their own tech tools",
        "content": "Sapiom, a startup building infrastructure for autonomous AI agents, has raised $15 million in Series A funding. The company enables AI agents to independently purchase software, APIs, and computing resources they need to complete tasks, representing a significant step toward truly autonomous digital workers.",
        "link": "https://techcrunch.com/2026/02/06/sapiom-raises-15m-ai-agents/"
    },
    {
        "source": "TechCrunch AI",
        "title": "Reddit looks to AI search as its next big opportunity",
        "content": "Reddit is betting big on AI-powered search to unlock the treasure trove of information buried in its forums. The company is developing new search tools that use large language models to help users find relevant discussions and answers from Reddit's vast archive of community conversations.",
        "link": "https://techcrunch.com/2026/02/06/reddit-ai-search-opportunity/"
    }
]

def rewrite_with_claude(title, content, source, link):
    """Rewrite article with Claude - witty educational tone, NO em dashes"""
    
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
SOURCE CONTENT: {content}
SOURCE: {source}
ORIGINAL LINK: {link}

Requirements:
1. Headline: Catchy, informative
2. {tone_instruction}
3. Length: 400-500 words
4. Structure: Engaging intro, key insights, why it matters, closing thought
5. Make it completely original - not traceable to source
6. CRITICAL: Do NOT use em dashes (—). Use commas, periods, or hyphens instead.
7. Include reading time estimate
8. Category: Choose from [LLMs, Enterprise AI, Industry, Research, GenAI]

Return valid JSON:
{{
  "title": "headline",
  "category": "Category",
  "readTime": "X min read",
  "excerpt": "2-3 sentence summary",
  "content": "full article text with paragraphs separated by double newlines",
  "tone": "witty|serious"
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
            
            json_match = re.search(r'\{[\s\S]*\}', content_text)
            if json_match:
                article = json.loads(json_match.group(0))
                article['id'] = re.sub(r'[^a-z0-9-]+', '-', article['title'].lower())[:50].strip('-')
                article['slug'] = article['id']
                return article
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def generate_image(title, excerpt):
    """Generate image with GPT-1.5"""
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
            return response.json()['data'][0]['b64_json']
        return None
    except Exception as e:
        print(f"Image error: {e}")
        return None

def main():
    posts = []
    timestamp = int(datetime.now().timestamp())
    
    for i, src in enumerate(articles_to_write, 1):
        print(f"\n[{i}/3] Processing: {src['title'][:50]}...")
        
        # Rewrite
        print("  Rewriting with Claude...")
        draft = rewrite_with_claude(src['title'], src['content'], src['source'], src['link'])
        
        if draft:
            # Generate image
            print("  Generating GPT-1.5 image...")
            image_b64 = generate_image(draft['title'], draft['excerpt'])
            
            if image_b64:
                image_filename = f"{draft['id']}-{timestamp}.png"
                image_path = f"/home/ec2-user/clawd/pulse-ai/public/images/{image_filename}"
                with open(image_path, "wb") as f:
                    f.write(base64.b64decode(image_b64))
                image_url = f"/images/{image_filename}"
            else:
                image_url = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200"
            
            post = {
                "id": draft['id'],
                "slug": draft['slug'],
                "title": draft['title'],
                "snippet": draft['excerpt'],
                "content": draft['content'],
                "category": draft['category'],
                "read_time": draft['readTime'],
                "image_url": image_url,
                "images": [image_url],
                "source": src['source'],
                "source_attribution": f"Based on {src['source']}",
                "original_link": src['link'],
                "published_at": datetime.now().isoformat()
            }
            posts.append(post)
            print(f"  ✅ Done: {draft['title'][:60]}...")
        else:
            print("  ❌ Failed to rewrite")
    
    # Add to existing posts
    if posts:
        with open('/home/ec2-user/clawd/pulse-ai/public/posts/posts.json', 'r') as f:
            existing = json.load(f)
        
        for post in posts:
            existing.insert(0, post)
        
        existing = existing[:50]  # Keep last 50
        
        with open('/home/ec2-user/clawd/pulse-ai/public/posts/posts.json', 'w') as f:
            json.dump(existing, f, indent=2)
        
        print(f"\n🎉 Published {len(posts)} articles!")
        
        # Git push
        print("🚀 Pushing to GitHub...")
        os.system('cd /home/ec2-user/clawd/pulse-ai && git add -A && git commit -m "auto: 3 new articles for Feb 6" && git push')
        print("✅ Deployed to Vercel!")
        
        return posts
    return []

if __name__ == "__main__":
    main()
