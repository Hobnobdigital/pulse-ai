# Pulse AI - Quick Reference Card

## 🎯 Essential Commands

### Test Workflow Components
```bash
cd /home/ec2-user/clawd/pulse-ai/workflows
bash test-workflow.sh
```

### Generate Sample Posts
```bash
node generate-sample-posts.js
```

### View Posts
```bash
cat /home/ec2-user/clawd/pulse-ai/public/posts/posts.json | jq '.'
```

### Check Post Count
```bash
cat /home/ec2-user/clawd/pulse-ai/public/posts/posts.json | jq 'length'
```

### View Latest Post
```bash
cat /home/ec2-user/clawd/pulse-ai/public/posts/posts.json | jq '.[0]'
```

### Git Operations
```bash
cd /home/ec2-user/clawd/pulse-ai
git status
git log --oneline -10
git push origin main
```

---

## 📂 Directory Structure

```
/home/ec2-user/clawd/pulse-ai/
├── public/
│   ├── images/              # Generated article images
│   └── posts/
│       └── posts.json       # Blog posts database
└── workflows/
    ├── pulse-ai-workflow.json          # n8n workflow
    ├── README.md                       # Full documentation
    ├── SETUP-GUIDE.md                  # Step-by-step setup
    ├── credentials-template.md         # API keys guide
    ├── generate-sample-posts.js        # Sample content generator
    └── test-workflow.sh                # Test script
```

---

## 🔑 Credentials Quick Setup

### n8n Credentials Needed

1. **OpenRouter API** (HTTP Header Auth)
   - Header: `Authorization`
   - Value: `Bearer sk-or-v1-...`
   - Used by: "Claude: Rewrite Article" node

2. **OpenAI API** (HTTP Header Auth)
   - Header: `Authorization`
   - Value: `Bearer sk-...`
   - Used by: "OpenAI: Generate Image" node

3. **Discord Webhook** (optional)
   - Webhook URL: `https://discord.com/api/webhooks/...`
   - Used by: "Discord Notification" node

---

## ⚙️ Workflow Configuration

### Change Schedule
Node: **Schedule: Every 3 Hours**
- Default: Every 3 hours
- Common alternatives:
  - Every 2 hours: `hoursInterval: 2`
  - Daily at 9am: Use cron expression `0 9 * * *`
  - Every 6 hours: `hoursInterval: 6`

### Change Article Count
Node: **Aggregate & Filter Top 5**
```javascript
const top5 = deduplicated.slice(0, 5); // Change 5 to desired number
```

### Change Time Window
Node: **Aggregate & Filter Top 5**
```javascript
const sixHoursAgo = new Date(now - 6 * 60 * 60 * 1000); // 6 hours in ms
// 12 hours: 12 * 60 * 60 * 1000
// 24 hours: 24 * 60 * 60 * 1000
```

### Adjust Relevance Keywords
Node: **Aggregate & Filter Top 5**
```javascript
const relevanceKeywords = [
  'llm', 'gpt', 'ai model', // Add/remove keywords
];
```

---

## 🐛 Common Issues & Fixes

### Issue: "No articles found"
**Fix:** Increase time window or run during peak hours

### Issue: "Unauthorized" API error
**Fix:** Check API keys in n8n credentials, verify billing enabled

### Issue: Git push fails
**Fix:**
```bash
git remote set-url origin https://TOKEN@github.com/user/repo.git
```

### Issue: Image generation fails
**Fix:** Verify model is `gpt-image-1.5`, check OpenAI quota

### Issue: Claude returns invalid JSON
**Fix:** Check node "Parse & Calculate Read Time" execution log

---

## 📊 Monitoring

### View n8n Execution History
1. Open n8n web interface
2. Go to **Executions** tab
3. Filter by workflow name

### Check API Usage

**OpenRouter:**
- Dashboard: https://openrouter.ai/activity
- Check credits and usage

**OpenAI:**
- Dashboard: https://platform.openai.com/usage
- Monitor costs and rate limits

### Verify Vercel Deployments
- Dashboard: https://vercel.com/dashboard
- Check deployment status and logs

---

## 💰 Cost Breakdown

### Per Run (5 articles)
- Claude rewrites: 5 × $0.003 = $0.015
- OpenAI images: 5 × $0.04 = $0.20
- **Total per run:** $0.215

### Daily (8 runs)
- $0.215 × 8 = $1.72/day

### Monthly
- $1.72 × 30 = $51.60/month

### Cost Reduction Tips
1. Use Claude Haiku instead of Sonnet: 10x cheaper
2. Generate fewer images (reuse or skip some)
3. Run less frequently (every 6 hours = half the cost)
4. Use smaller image size (1024x1024 = $0.02 instead of $0.04)

---

## 🔄 Maintenance Tasks

### Daily
- Check executions in n8n (should be ~8/day)
- Verify posts.json is updating

### Weekly
- Review API costs
- Check Git commit log
- Review content quality

### Monthly
- Update RSS sources (add/remove)
- Review and optimize Claude prompt
- Rotate API keys
- Clean up old images (keep last 50 posts worth)

---

## 🚨 Emergency Procedures

### Stop Workflow Immediately
1. Open n8n
2. Go to workflow
3. Toggle **Active** switch to OFF

### Clear All Posts
```bash
echo "[]" > /home/ec2-user/clawd/pulse-ai/public/posts/posts.json
git add public/posts/posts.json
git commit -m "Clear all posts"
git push
```

### Rollback to Previous Version
```bash
cd /home/ec2-user/clawd/pulse-ai
git log --oneline  # Find commit to rollback to
git revert HEAD    # Or specific commit hash
git push
```

### Check Error Logs
```bash
# n8n logs (if running as service)
journalctl -u n8n -f

# Or check ~/.n8n/logs/
tail -f ~/.n8n/logs/n8n.log
```

---

## 🎯 Performance Tuning

### Speed Up Workflow
- Run RSS fetches in parallel (already configured)
- Reduce article count (process 3 instead of 5)
- Use faster Claude model (Haiku)

### Improve Content Quality
- Adjust Claude prompt (be more specific)
- Increase relevance score threshold
- Add more sophisticated filtering

### Scale Up
- Increase article count to 10
- Add more RSS sources
- Run more frequently (every 2 hours)

---

## 📞 Quick Help

**Documentation:**
- Full docs: `workflows/README.md`
- Setup guide: `workflows/SETUP-GUIDE.md`
- Credentials: `workflows/credentials-template.md`

**API Support:**
- OpenRouter: https://openrouter.ai/docs
- OpenAI: https://platform.openai.com/docs
- n8n: https://docs.n8n.io

**Community:**
- n8n Community: https://community.n8n.io
- OpenRouter Discord: https://discord.gg/openrouter

---

## ✨ Pro Tips

1. **Test before deploying:** Always run manual execution first
2. **Monitor costs:** Set up budget alerts in API dashboards
3. **Backup posts.json:** It's in Git, but keep local backups
4. **Review content:** Check first few runs to tune prompts
5. **Start small:** Begin with every 6 hours, scale to 3 hours later
6. **Use Discord notifications:** Great for monitoring without checking n8n

---

## 🎓 Learning Resources

**Improve your Claude prompts:**
- https://docs.anthropic.com/claude/docs/prompt-engineering

**n8n workflow patterns:**
- https://n8n.io/workflows

**API best practices:**
- Rate limiting: https://platform.openai.com/docs/guides/rate-limits
- Cost optimization: https://openrouter.ai/docs/limits

---

**Keep this handy for quick reference! 📋**

*Last updated: 2025-01-15*
