#!/usr/bin/env python3
"""
Pulse AI - Free RSS Monitor
Checks AI news sources hourly and reports new articles
"""

import feedparser
import json
import os
from datetime import datetime, timedelta
from urllib.parse import urlparse

# RSS Sources - 15 reputable AI/tech sites
RSS_SOURCES = {
    "OpenAI Blog": "https://openai.com/blog/rss.xml",
    "The Rundown AI": "https://www.therundown.ai/rss",
    "MarkTechPost": "https://www.marktechpost.com/feed/",
    "Hugging Face": "https://huggingface.co/blog/feed.xml",
    "TechCrunch AI": "https://techcrunch.com/category/artificial-intelligence/feed/",
    "VentureBeat AI": "https://venturebeat.com/category/ai/feed/",
    "Google AI": "https://blog.google/technology/ai/rss/",
    "Anthropic": "https://www.anthropic.com/news/rss.xml",
    "MIT Technology Review": "https://www.technologyreview.com/topic/artificial-intelligence/feed/",
    "Wired AI": "https://www.wired.com/tag/artificial-intelligence/feed/",
    "The Verge AI": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    "ArXiv CS.AI": "http://export.arxiv.org/rss/cs.AI",
    "AI News (UK)": "https://www.artificialintelligence-news.com/feed/",
    "Towards Data Science": "https://towardsdatascience.com/feed",
    "Microsoft AI": "https://blogs.microsoft.com/ai/feed/"
}

# Keywords for AI relevance scoring
RELEVANCE_KEYWORDS = [
    'ai', 'artificial intelligence', 'llm', 'gpt', 'claude', 'gemini', 'openai',
    'anthropic', 'model', 'neural', 'machine learning', 'deep learning',
    'training', 'inference', 'agent', 'multimodal', 'reasoning', 'chain-of-thought',
    'transformer', 'foundation model', 'generative ai', 'genai', 'large language model'
]

def calculate_relevance(title, description=""):
    """Calculate AI relevance score (0-100)"""
    text = f"{title} {description}".lower()
    score = 0
    
    for keyword in RELEVANCE_KEYWORDS:
        if keyword in text:
            if keyword in title.lower():
                score += 5  # Higher weight for title matches
            else:
                score += 2
    
    return min(score, 100)

def fetch_feed(name, url):
    """Fetch and parse RSS feed"""
    try:
        feed = feedparser.parse(url)
        return feed.entries
    except Exception as e:
        print(f"Error fetching {name}: {e}")
        return []

def check_new_articles():
    """Check all sources for new articles from last 2 hours (12 checks/day, you pick ~6)"""
    two_hours_ago = datetime.now() - timedelta(hours=2)
    all_articles = []
    
    print(f"🔍 Checking {len(RSS_SOURCES)} sources at {datetime.now().strftime('%Y-%m-%d %H:%M')}...")
    
    for source_name, url in RSS_SOURCES.items():
        entries = fetch_feed(source_name, url)
        
        for entry in entries:
            # Parse publication date
            pub_date = None
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                pub_date = datetime(*entry.published_parsed[:6])
            elif hasattr(entry, 'updated_parsed') and entry.updated_parsed:
                pub_date = datetime(*entry.updated_parsed[:6])
            
            if pub_date and pub_date >= two_hours_ago:
                title = entry.get('title', 'No title')
                link = entry.get('link', '')
                description = entry.get('summary', '')[:300] + '...' if len(entry.get('summary', '')) > 300 else entry.get('summary', '')
                
                relevance = calculate_relevance(title, description)
                
                if relevance >= 5:  # Minimum relevance threshold
                    all_articles.append({
                        'source': source_name,
                        'title': title,
                        'link': link,
                        'description': description,
                        'pub_date': pub_date.isoformat(),
                        'relevance': relevance
                    })
    
    # Sort by relevance (highest first)
    all_articles.sort(key=lambda x: x['relevance'], reverse=True)
    
    # Return top articles from 2-hour window (12 checks/day, you pick ~6 to publish)
    return all_articles[:2]

def format_digest(articles):
    """Format articles for Discord notification"""
    if not articles:
        return None
    
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M UTC')
    
    message = f"📰 **Pulse AI - 2-Hour Digest** ({timestamp})\n"
    message += f"Schedule: Every 2hrs (12 checks/day) | You pick ~6 to publish\n\n"
    
    for i, article in enumerate(articles[:2], 1):  # Top 2 per 2-hour window
        relevance_emoji = "🔥" if article['relevance'] >= 20 else "📌" if article['relevance'] >= 10 else "📄"
        message += f"{i}. {relevance_emoji} **{article['title']}**\n"
        message += f"   Source: {article['source']} | Score: {article['relevance']}/100\n"
        message += f"   Link: {article['link']}\n\n"
    
    message += "\n💡 **Reply with article numbers to publish** (e.g., \"publish 1, 3, 5\")\n"
    message += "Or reply \"skip\" to ignore this batch"
    
    return message

def save_state(articles):
    """Save articles to state file for approval processing"""
    state_file = '/home/ec2-user/clawd/pulse-ai/.rss-monitor-state.json'
    state = {
        'last_check': datetime.now().isoformat(),
        'articles': articles,
        'pending_approval': True
    }
    with open(state_file, 'w') as f:
        json.dump(state, f, indent=2)

def main():
    articles = check_new_articles()
    
    if articles:
        digest = format_digest(articles)
        print(digest)
        save_state(articles)
        
        # Also save to a file for Discord bot to read
        with open('/home/ec2-user/clawd/pulse-ai/.latest-digest.txt', 'w') as f:
            f.write(digest)
        
        return 1  # Found articles
    else:
        print("No new AI articles found in the last hour.")
        return 0

if __name__ == "__main__":
    exit(main())
