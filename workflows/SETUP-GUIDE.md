# Pulse AI - Complete Setup Guide

This guide will walk you through setting up the entire Pulse AI automation system from scratch.

---

## 📦 What You're Building

**Pulse AI** is a fully automated AI news site that:
- Fetches articles from 8+ premium sources every 3 hours
- Uses Claude to rewrite them with editorial flair
- Generates custom images with OpenAI
- Publishes to a static JSON-based blog
- Auto-deploys via GitHub + Vercel

**Total setup time:** 30-45 minutes

---

## ✅ Prerequisites

### Required Software

- [ ] **n8n** (v1.0+) - Workflow automation platform
- [ ] **Node.js** (v16+) - For running scripts
- [ ] **Git** - Version control
- [ ] **GitHub account** - For hosting code
- [ ] **Vercel account** - For hosting site (free tier works)

### Required API Keys

- [ ] **OpenRouter API key** - For Claude Sonnet ($0.003/article)
- [ ] **OpenAI API key** - For image generation ($0.04/image)
- [ ] **Discord webhook** (optional) - For notifications

### Estimated Monthly Cost

- **API costs:** ~$50/month (running every 3 hours, 5 articles per run)
- **Hosting:** Free (Vercel + GitHub)

---

## 🚀 Part 1: Project Setup

### Step 1: Create Project Directory

```bash
cd /home/ec2-user/clawd
mkdir -p pulse-ai/public/images pulse-ai/public/posts pulse-ai/workflows
```

### Step 2: Initialize Git Repository

```bash
cd pulse-ai
git init
git config user.email "bot@pulse-ai.com"
git config user.name "Pulse AI Bot"
```

### Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Name: `pulse-ai`
3. Visibility: Public (or Private)
4. **Do NOT** initialize with README
5. Copy the repository URL

```bash
git remote add origin https://github.com/YOUR_USERNAME/pulse-ai.git
```

### Step 4: Initial Commit

```bash
# Create a .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
.DS_Store
*.log
.n8n/
EOF

git add .
git commit -m "Initial commit: Pulse AI project structure"
git push -u origin main
```

---

## 🔑 Part 2: API Keys Setup

### OpenRouter (Claude Sonnet)

1. Visit https://openrouter.ai
2. Sign up / Log in
3. Go to **Keys** section
4. Click **Create Key**
5. Copy the key (starts with `sk-or-v1-...`)
6. **Save it securely** - you'll need it for n8n

**Add credits:**
- Go to **Credits** section
- Add at least $10 to start
- Auto-recharge recommended

### OpenAI (Image Generation)

1. Visit https://platform.openai.com
2. Sign up / Log in
3. Go to **API Keys**
4. Click **Create new secret key**
5. Name it "Pulse AI"
6. Copy the key (starts with `sk-...`)
7. **Save it securely**

**Add credits:**
- Go to **Billing** → **Add payment method**
- Add at least $10
- Set usage limits (recommended: $50/month)

### Discord Webhook (Optional)

1. Open your Discord server
2. Server Settings → Integrations → Webhooks
3. Click **New Webhook**
4. Name: "Pulse AI"
5. Choose notification channel
6. **Copy Webhook URL**
7. Save it

---

## 🛠️ Part 3: n8n Installation & Setup

### Option A: Self-Hosted (Recommended for this workflow)

```bash
npm install -g n8n
```

Start n8n:
```bash
n8n start
```

Access at: http://localhost:5678

### Option B: n8n Cloud

1. Sign up at https://n8n.io
2. Create new workspace
3. Note: Cloud version has some limitations with file system access

### Install Required Dependencies

For ArXiv XML parsing:

```bash
cd ~/.n8n
npm install xml2js
```

---

## 📥 Part 4: Import Workflow

### Step 1: Import Workflow File

1. Open n8n web interface (http://localhost:5678)
2. Go to **Workflows** tab
3. Click **Import from File**
4. Select: `/home/ec2-user/clawd/pulse-ai/workflows/pulse-ai-workflow.json`
5. Workflow will appear in your workflows list

### Step 2: Configure Credentials

#### OpenRouter Credential

1. Go to **Credentials** (left sidebar)
2. Click **Add Credential**
3. Search for: **HTTP Header Auth**
4. Fill in:
   - **Name:** `OpenRouter API`
   - **Header Name:** `Authorization`
   - **Header Value:** `Bearer YOUR_OPENROUTER_KEY`
5. Click **Save**

#### OpenAI Credential

1. Add another **HTTP Header Auth** credential
2. Fill in:
   - **Name:** `OpenAI API`
   - **Header Name:** `Authorization`
   - **Header Value:** `Bearer YOUR_OPENAI_KEY`
3. Click **Save**

#### Discord Webhook Credential (Optional)

1. Add **Discord Webhook** credential
2. Fill in:
   - **Webhook URL:** Your Discord webhook URL
3. Click **Save**

### Step 3: Assign Credentials to Nodes

1. Open the imported workflow
2. Click on node: **Claude: Rewrite Article**
   - Click on the credential dropdown
   - Select: `OpenRouter API`
3. Click on node: **OpenAI: Generate Image**
   - Select: `OpenAI API`
4. If using Discord, click: **Discord Notification**
   - Select your Discord webhook credential

---

## 🧪 Part 5: Test the Workflow

### Step 1: Populate Initial Content

Generate sample posts for testing:

```bash
cd /home/ec2-user/clawd/pulse-ai/workflows
node generate-sample-posts.js
```

This creates 5 realistic sample posts in `public/posts/posts.json`.

### Step 2: Manual Test Run

1. Open the workflow in n8n
2. Click **Execute Workflow** button (top right)
3. Watch the nodes execute in sequence
4. Should take 2-3 minutes for 5 articles

**What to expect:**
- All RSS nodes should turn green ✓
- "Aggregate & Filter Top 5" selects recent articles
- Each article gets rewritten by Claude
- Images generated by OpenAI
- Posts saved to JSON file
- Git commit attempted

### Step 3: Verify Output

```bash
# Check posts
cat /home/ec2-user/clawd/pulse-ai/public/posts/posts.json | jq '.[0] | {title, category}'

# Check images (note: sample posts have placeholder images)
ls -lh /home/ec2-user/clawd/pulse-ai/public/images/

# Count posts
cat /home/ec2-user/clawd/pulse-ai/public/posts/posts.json | jq 'length'
```

---

## 🌐 Part 6: Deploy to Vercel

### Step 1: Push to GitHub

```bash
cd /home/ec2-user/clawd/pulse-ai
git add .
git commit -m "Add initial posts and workflow"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click **Add New Project**
3. Import your `pulse-ai` GitHub repository
4. Framework Preset: **Next.js** (auto-detected if you have Next.js set up)
5. Root Directory: `./` (root)
6. Click **Deploy**

### Step 3: Set Up Auto-Deploy

Vercel automatically deploys on every `git push` to `main` branch.

When n8n runs and commits new posts, Vercel will rebuild and deploy automatically.

---

## ⚙️ Part 7: Configure Automation

### Enable Schedule Trigger

1. In n8n workflow, locate: **Schedule: Every 3 Hours**
2. Verify settings:
   - Interval: 3 hours
   - Or customize (e.g., every 2 hours, daily at 9am)
3. Click **Activate** toggle (top right of workflow)

Workflow is now live and will run automatically!

### Monitor Executions

1. Go to **Executions** tab in n8n
2. View all workflow runs
3. Click on any execution to see detailed logs
4. Green = Success, Red = Error

---

## 🔧 Part 8: Customization

### Change Article Count

Edit node: **Aggregate & Filter Top 5**

```javascript
// Line 64
const top5 = deduplicated.slice(0, 5); // Change 5 to 10, etc.
```

### Change Time Window

Edit node: **Aggregate & Filter Top 5**

```javascript
// Line 18
const sixHoursAgo = new Date(now - 6 * 60 * 60 * 1000); 
// Change 6 to 12 for 12 hours, 24 for 24 hours, etc.
```

### Add New RSS Sources

1. Add new **RSS Feed Read** node
2. Enter feed URL
3. Connect to **Merge All Sources** node

### Modify Claude Prompt

Edit node: **Claude: Rewrite Article**

Change the prompt template to adjust:
- Tone (more serious, more casual)
- Length (shorter, longer)
- Style (technical, accessible, etc.)

---

## 🐛 Troubleshooting

### "No articles found in last 6 hours"

**Solution:** Increase time window to 12-24 hours, or run during peak publishing hours (9am-5pm US/Europe).

### "Unauthorized" API errors

**Solution:**
- Check API keys are correct
- Ensure billing is set up (OpenAI requires payment method)
- Verify credentials are assigned to correct nodes

### Git push fails

**Solution:**

```bash
cd /home/ec2-user/clawd/pulse-ai

# Set up authentication (choose one):

# Option 1: HTTPS with token
git remote set-url origin https://YOUR_GITHUB_TOKEN@github.com/username/pulse-ai.git

# Option 2: SSH (recommended)
ssh-keygen -t ed25519 -C "your-email@example.com"
cat ~/.ssh/id_ed25519.pub  # Add this to GitHub SSH keys
git remote set-url origin git@github.com:username/pulse-ai.git
```

### Images not generating

**Solution:**
- Check OpenAI API quota
- Verify model name is exactly `gpt-image-1.5`
- Check node logs for specific error

### n8n workflow won't activate

**Solution:**
- Ensure all credentials are set
- Check for red error indicators on nodes
- Run manual test first to identify issues

---

## 📊 Monitoring & Maintenance

### Daily Checks

- [ ] Check n8n execution history (should be 8 runs/day)
- [ ] Verify new posts in posts.json
- [ ] Check Vercel deployment status

### Weekly Checks

- [ ] Review API usage/costs in OpenRouter & OpenAI dashboards
- [ ] Check Git commit history
- [ ] Review Discord notifications (if enabled)

### Monthly Maintenance

- [ ] Update RSS sources (remove dead ones, add new ones)
- [ ] Review and curate old posts (keep best 50)
- [ ] Update Claude prompt based on content quality
- [ ] Rotate API keys (security best practice)

---

## 🎯 Production Checklist

Before going fully live:

- [ ] Test workflow runs successfully 3+ times
- [ ] All API keys configured and tested
- [ ] Git commits and pushes working
- [ ] Vercel auto-deploy functioning
- [ ] Discord notifications working (if enabled)
- [ ] Schedule trigger activated
- [ ] Monitoring set up (execution alerts)
- [ ] Budget alerts set up (API usage)
- [ ] Documentation reviewed
- [ ] Backup strategy in place (Git = backup)

---

## 🚀 Next Steps

1. **Monitor first 24 hours** - Watch for errors
2. **Adjust schedule** - Maybe run every 2 hours or 6 hours based on content freshness
3. **Customize design** - Build a front-end to display posts (Next.js, React, etc.)
4. **Add more sources** - Research Papers, Reddit, Hacker News, etc.
5. **Improve filtering** - Add more sophisticated relevance scoring
6. **A/B test prompts** - Try different Claude prompts to see what works best

---

## 📞 Support Resources

**n8n:**
- Docs: https://docs.n8n.io
- Community: https://community.n8n.io
- GitHub: https://github.com/n8n-io/n8n

**APIs:**
- OpenRouter: https://openrouter.ai/docs
- OpenAI: https://platform.openai.com/docs

**This Project:**
- Workflow file: `/home/ec2-user/clawd/pulse-ai/workflows/pulse-ai-workflow.json`
- Documentation: `/home/ec2-user/clawd/pulse-ai/workflows/README.md`
- Credentials guide: `/home/ec2-user/clawd/pulse-ai/workflows/credentials-template.md`

---

## ✨ Congratulations!

You now have a fully automated AI news aggregation and editorial system running 24/7.

Sit back and watch as Pulse AI:
- Discovers breaking AI news
- Rewrites it with personality
- Generates custom visuals
- Publishes to your site
- All without any manual work

**Happy automating! 🤖📰**

---

**Last updated:** 2025-01-15  
**Version:** 1.0  
**Author:** Pulse AI Team
