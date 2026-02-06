#!/usr/bin/env python3
"""Write article with Anthropic Sonnet"""

import requests
import json
import os

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')

headers = {
    "x-api-key": ANTHROPIC_API_KEY,
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01"
}

# Source content about OpenAI Frontier
source_content = """
OpenAI has introduced Frontier, a new platform that helps enterprises build, deploy, and manage AI agents that can do real work.

Key points:
- 75% of enterprise workers say AI helped them do tasks they couldn't do before
- Over 1 million businesses using AI agents
- Examples: Manufacturer reduced production optimization from 6 weeks to 1 day
- Global investment company opened up 90% more time for salespeople
- Energy producer increased output by 5% = over $1 billion in revenue

The problem: Companies are overwhelmed with disconnected systems. AI agents are deployed everywhere but isolated - adding complexity instead of helping.

The gap: Between what models can do and what teams can actually deploy. OpenAI ships something new every 3 days. Teams struggle to keep up.

Frontier solution:
- Build, deploy, and manage AI agents
- Gives agents skills people need: shared context, onboarding, hands-on learning with feedback, clear permissions and boundaries
- Move beyond isolated use cases to AI coworkers
- End-to-end approach vs. disconnected tools

The AI opportunity gap is growing between early leaders and everyone else.
"""

prompt = f"""You are a witty, sharp tech journalist writing for Pulse AI - an AI news blog for tech professionals and AI enthusiasts.

Write a compelling article about OpenAI's new Frontier platform based on this source material:

{source_content}

Requirements:
1. Headline: Catchy, informative, slightly witty
2. Tone: Smart, informed, with dry humor - but stay serious about business impact
3. Length: 400-500 words
4. Structure: Engaging intro, key insights, why it matters, closing thought
5. Include reading time estimate at the top (e.g., "4 min read")
6. Make it feel like original editorial, not a rewrite
7. Category: Enterprise AI

Output as JSON:
{{
  "title": "headline here",
  "category": "Enterprise AI",
  "readTime": "X min read",
  "excerpt": "2-3 sentence summary",
  "content": "full article content with HTML paragraphs <p>...</p>"
}}"""

response = requests.post(
    "https://api.anthropic.com/v1/messages",
    headers=headers,
    json={
        "model": "claude-3-haiku-20240307",
        "max_tokens": 2000,
        "messages": [{"role": "user", "content": prompt}]
    },
    timeout=120
)

if response.status_code == 200:
    data = response.json()
    article_json = data['content'][0]['text']
    
    # Clean up the response - extract JSON if wrapped in markdown
    import re
    json_match = re.search(r'\{.*\}', article_json, re.DOTALL)
    if json_match:
        article_json = json_match.group(0)
    
    # Parse the JSON response
    article = json.loads(article_json)
    
    # Add image paths and ID
    article['id'] = 'openai-frontier-platform'
    article['date'] = '2026-02-06'
    article['image'] = '/images/frontier/frontier-image-1.png'
    article['images'] = [
        '/images/frontier/frontier-image-1.png',
        '/images/frontier/frontier-image-2.png'
    ]
    article['featured'] = True
    
    # Save to file
    output_path = '/home/ec2-user/clawd/pulse-ai/public/posts/frontier-article.json'
    with open(output_path, 'w') as f:
        json.dump(article, f, indent=2)
    
    print(f"✓ Article saved to: {output_path}")
    print(f"\nTitle: {article['title']}")
    print(f"Category: {article['category']}")
    print(f"Read Time: {article['readTime']}")
else:
    print(f"✗ Error: {response.status_code} - {response.text}")
