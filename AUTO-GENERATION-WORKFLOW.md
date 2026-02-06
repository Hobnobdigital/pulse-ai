# Pulse AI - Auto-Generation Workflow

## ✅ Every 2 Hours - You Decide What to Publish

### Workflow:

```
Every 2 Hours (12 times/day):
    ↓
Check 15 RSS Sources
    ↓
Find Best Articles (from last 2 hours)
    ↓
AUTO-REWRITE with Claude (witty/educational tone)
AUTO-GENERATE image with GPT-Image-1.5
    ↓
Save Drafts for Your Review
    ↓
YOU DECIDE → Publish or Skip
```

### How It Works:

1. **Every 2 hours** - Checks 15 sources for new AI articles
2. **Auto-generates** - Rewrites with Claude + generates image immediately
3. **You review** - I notify you with full drafts
4. **You decide** - Publish what you like, skip what you don't
5. **Target** - ~6 articles/day published (from ~24 options)

### Tone Detection:

**Witty Tone (default):**
- Product launches, breakthroughs, trends, fun applications

**Serious Tone (auto-detected):**
- AI safety, ethics, bias, job displacement, privacy, regulation

### Schedule (12 Checks/Day):

| Run | Time (UTC) | You Decide |
|-----|------------|------------|
| 1 | 8:30 AM | Keep or skip |
| 2 | 10:30 AM | Keep or skip |
| 3 | 12:30 PM | Keep or skip |
| 4 | 2:30 PM | Keep or skip |
| 5 | 4:30 PM | Keep or skip |
| 6 | 6:30 PM | Keep or skip |
| 7 | 8:30 PM | Keep or skip |
| 8 | 10:30 PM | Keep or skip |
| 9 | 12:30 AM | Keep or skip |
| 10 | 2:30 AM | Keep or skip |
| 11 | 4:30 AM | Keep or skip |
| 12 | 6:30 AM | Keep or skip |

**You pick ~6 per day from ~24 options!**

### Cost:

**Per draft generated:** ~$0.043 (Claude + Image)  
**~24 drafts/day × $0.043 = ~$1.03/day**  
**Monthly: ~$31/month** (if you review all)

You only publish what you approve!

### Commands:

**Review drafts:**
```bash
cat /home/ec2-user/clawd/pulse-ai/.review-digest.txt
```

**Publish selected:**
```bash
python3 publish-draft.py 1    # publish article #1
python3 publish-draft.py 1,2  # publish articles 1 and 2
```

**Publish all:**
```bash
python3 publish-draft.py all
```

**Skip/Discard:**
```bash
python3 publish-draft.py skip
```

### Files:

- `rss-monitor.py` - Checks every 2 hours
- `generate-drafts.py` - Auto-writes with Claude + images
- `publish-draft.py` - Publishes your approved articles
- `.review-digest.txt` - Drafts ready for your review

### Status:

- ✅ Daemon running (PID: 233509)
- ✅ Checks every 2 hours (12×/day)
- ✅ You decide what to publish
- ✅ Target: ~6 published/day
- ✅ Next check: ~10:30 AM UTC

---

**Ready! You'll receive draft articles every 2 hours. You pick what to publish!** 🚀
