# Pulse AI - Complete Project Wiki

**Last Updated:** 2026-02-06
**Live Site:** https://pulse-ai-pearl.vercel.app
**Repository:** https://github.com/Hobnobdigital/pulse-ai

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Content Guidelines](#content-guidelines)
4. [Image Generation](#image-generation)
5. [Current Articles](#current-articles)
6. [Workflow & Automation](#workflow--automation)
7. [Deployment](#deployment)
8. [File Structure](#file-structure)
9. [Environment Variables](#environment-variables)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

Pulse AI is a production-grade AI news aggregation blog featuring original articles about AI/ML developments. The site uses an **Editorial Neon Brutalism** design aesthetic with a distinctive visual identity.

### Key Characteristics
- **Design:** Editorial Neon Brutalism (white background + neon accents)
- **Content:** Original rewritten articles, not syndicated news
- **Tone:** Witty, educational, with dry humor (avoid em dashes)
- **Images:** GPT-1.5 generated, photorealistic, article-specific
- **Frequency:** Daily or near-daily updates

---

## Architecture & Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Fonts | Space Grotesk (display), Newsreader (body) |
| Hosting | Vercel |
| Content | JSON-based (`/public/posts/posts.json`) |
| Images | Next.js Image + GPT-1.5 generation |

### Design System

**Colors:**
- Background: Pure white (`#FFFFFF`)
- Text: Black (`#000000`)
- Neon Cyan: `#00FFAA` (LLMs category)
- Neon Magenta: `#FF00FF` (GenAI category)
- Neon Yellow: `#FFDD00` (Research category)

**Typography:**
- Display: Space Grotesk (headlines, UI)
- Body: Newsreader (article content)

---

## Content Guidelines

### Writing Style
- **Tone:** Witty, sharp, educational with dry humor
- **Voice:** Professional but accessible, not corporate
- **Length:** 400-600 words per article
- **Structure:** 3-4 sections with custom H2 headers

### Header Guidelines (CRITICAL)
**Headers must be UNIQUE to each article. Never use formulaic templates.**

❌ **DON'T USE:** "The Setup", "The Story", "Why This Matters", "The Takeaway"

✅ **DO USE:** Article-specific headers that reflect actual content

**Examples of good headers:**
- Reddit article: "Reddit's Discovery Problem", "How AI Changes the Search Game"
- AI Agents: "Thinking Bigger Than Chatbots", "The Self-Sufficient Agent Vision"
- Chatbots: "The GPT-4o Goodbye", "Why We Befriend Algorithms"

### Em Dash Rule (CRITICAL)
**AVOID EM DASHES (—).** Use periods, commas, or restructure sentences instead.

❌ Don't: "That's not a 10% productivity bump—that's people suddenly operating outside their skill envelopes"

✅ Do: "That's not a 10% productivity bump. That's people suddenly operating outside their skill envelopes"

### Content Categories
- **LLMs** - Large language models, GPT, Claude
- **GenAI** - Image/video generation, creative AI
- **Enterprise AI** - Business applications, deployment
- **Industry** - Company news, market moves
- **Research** - Academic papers, breakthroughs

### Article Schema
```json
{
  "id": "unique-slug",
  "slug": "unique-slug",
  "title": "Article Title",
  "snippet": "2-3 sentence summary",
  "content": "Full article with ## H2 headers",
  "category": "LLMs|GenAI|Enterprise AI|Industry|Research",
  "read_time": "5 min read",
  "image_url": "/images/filename.png",
  "images": ["/images/filename.png"],
  "source": "TechCrunch AI|Original",
  "source_attribution": "Based on TechCrunch AI",
  "original_link": "https://techcrunch.com/...",
  "published_at": "2026-02-06T16:00:00.000Z",
  "featured": false
}
```

---

## Image Generation

### Required Settings
- **Model:** `gpt-image-1.5` ONLY (never DALL-E)
- **Quality:** `high`
- **Size:** `1536x1024` (landscape, highest quality)
- **Style:** Photorealistic, hyper-realistic, cinematic

### Image Guidelines
1. Images must be relevant to article content
2. Use photorealistic style (not illustrations)
3. Include neon accent colors (cyan/magenta/yellow) subtly
4. Avoid text in images
5. Ensure faces look realistic (fix if distorted)

### Image Display
- PostCard: `object-contain` (no cropping)
- Hero: `object-contain` (no cropping)
- Article page: `object-contain` (no cropping)

### Filename Convention
```
{descriptive-name}-{timestamp}.png
```
Example: `video-generation-ai-cinematic-1770390100.png`

---

## Current Articles

### 1. Reddit Bets Big on AI Search
**ID:** `reddit-bets-big-on-ai-search`
**Category:** Industry
**Published:** 2026-02-06

**Headers:**
- Reddit's Discovery Problem
- How AI Changes the Search Game
- The Business Opportunity
- A New Paradigm for Knowledge

**Image:** `/images/uncertainty-aware-llms-agents-navigating-the-fog-o-1770367627.png`

---

### 2. AI Agents Get Their Own Expense Accounts
**ID:** `ai-agents-get-their-own-expense-accounts`
**Category:** Enterprise AI
**Published:** 2026-02-06

**Headers:**
- Thinking Bigger Than Chatbots
- The Self-Sufficient Agent Vision
- Why Investors Are Paying Attention
- Your Future AI Coworker

**Image:** `/images/ai-agents-are-they-executing-your-wishes-or-playin-1770382510.png`

---

### 3. When Chatbots Become Chums
**ID:** `when-chatbots-become-chums`
**Category:** GenAI
**Published:** 2026-02-06

**Headers:**
- The GPT-4o Goodbye
- Why We Befriend Algorithms
- The Mirror, Not the Friend
- Drawing the Line

**Image:** `/images/when-bots-become-besties-the-risky-rise-of-ai-comp-1770389792.png`

---

### 4. Video Generation Gets Real
**ID:** `video-generation-reality-check`
**Category:** GenAI
**Published:** 2026-02-06

**Image:** `/images/video-generation-ai-cinematic-1770390100.png`

---

### 5. OpenAI Frontier Platform
**ID:** `openai-frontier-platform`
**Category:** Enterprise AI
**Published:** 2026-02-06
**Featured:** true

**Image:** `/images/frontier/frontier-image-1.png`

---

## Workflow & Automation

### Content Generation Workflow

1. **Source Monitoring** (Optional)
   - RSS feeds monitored for AI news
   - Scripts in `/workflows/`

2. **Article Creation**
   - Source: TechCrunch AI, research papers, company announcements
   - Rewrite with original voice and structure
   - Generate custom H2 headers specific to content
   - Create GPT-1.5 image

3. **Content Review**
   - Check for em dashes (remove them)
   - Verify H2 headers are unique
   - Confirm image quality
   - Test locally

4. **Publication**
   - Add to `/public/posts/posts.json`
   - Commit and push
   - Vercel auto-deploys

### Scripts

**Generate Image:**
```bash
python3 generate-image.py "Your detailed image prompt"
```

**Validate Content:**
```bash
# Check for em dashes
grep -r "—" public/posts/

# Check JSON validity
python3 -m json.tool public/posts/posts.json > /dev/null && echo "Valid JSON"
```

---

## Deployment

### Automatic Deployment
Vercel auto-deploys on every push to `master` branch.

### Manual Deployment
```bash
git add -A
git commit -m "feat: Description of changes"
git push origin master
```

### Build Check
```bash
npm run build
```

Must complete without errors before pushing.

---

## File Structure

```
pulse-ai/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + fonts
│   ├── page.tsx                 # Homepage
│   ├── post/[id]/page.tsx       # Article pages
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── Header.tsx               # Navigation
│   ├── Hero.tsx                 # Featured article
│   ├── PostCard.tsx             # Article card
│   ├── PostGrid.tsx             # Article grid
│   ├── Footer.tsx               # Site footer
│   └── ScrollProgress.tsx       # Reading progress
│
├── public/                       # Static assets
│   ├── images/                  # GPT-1.5 generated images
│   └── posts/
│       └── posts.json           # Article database
│
├── workflows/                    # Automation docs
│   ├── README.md
│   ├── SETUP-GUIDE.md
│   └── QUICK-REFERENCE.md
│
├── generate-drafts.py           # Article generation
├── generate-image.py            # Image generation
├── rss-monitor.py               # RSS monitoring
├── tailwind.config.ts           # Theme config
├── next.config.ts               # Next.js config
└── vercel.json                  # Deployment config
```

---

## Environment Variables

Create `.env.local` file:

```
# OpenAI - Image Generation
OPENAI_API_KEY=sk-...

# Anthropic - Article Generation
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-...
```

**Required for image generation:** OPENAI_API_KEY

---

## Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Image Not Loading
- Check filename matches `posts.json`
- Verify image is in `/public/images/`
- Ensure file extension is correct (.png)

### JSON Errors
```bash
# Validate JSON
python3 -m json.tool public/posts/posts.json
```

### Deployment Fails
1. Check build passes locally: `npm run build`
2. Verify no TypeScript errors
3. Check Vercel dashboard logs

### Em Dash Detection
```bash
# Find all em dashes
grep -rn "—" public/posts/
grep -rn "—" components/
grep -rn "—" app/
```

---

## Quick Reference

### Add New Article
1. Generate image: `python3 generate-image.py "prompt"`
2. Write article with custom H2 headers
3. Add to `public/posts/posts.json`
4. Check: No em dashes, unique headers
5. Commit and push

### Update Article
1. Edit `public/posts/posts.json`
2. Update `published_at` if needed
3. Commit and push

### Generate Image Only
```bash
python3 << 'EOF'
import os, base64, requests
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
prompt = "Your prompt here"
response = requests.post(
    "https://api.openai.com/v1/images/generations",
    headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
    json={"model": "gpt-image-1.5", "prompt": prompt, "size": "1536x1024", "quality": "high"}
)
# Save image...
EOF
```

---

## Team Notes

- **Always use custom H2 headers** - never formulaic templates
- **Avoid em dashes** - use periods or commas instead
- **GPT-1.5 only** for images - no other models
- **Object-contain** for images - prevents cropping
- **Test locally** before pushing to production
- **Keep this wiki updated** when processes change

---

## Contact & Resources

- **Live Site:** https://pulse-ai-pearl.vercel.app
- **Repository:** https://github.com/Hobnobdigital/pulse-ai
- **Vercel Dashboard:** https://vercel.com/dashboard

**For questions or issues, reference this wiki first.**
