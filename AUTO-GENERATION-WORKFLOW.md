# Pulse AI - Auto-Generation Workflow

## ✅ UPDATED: Articles Auto-Generated for Review

### New Workflow:

```
Every Hour:
    ↓
Check 15 RSS Sources
    ↓
Find New AI Articles
    ↓
AUTO-REWRITE with Claude (witty/educational tone)
AUTO-GENERATE image with GPT-Image-1.5
    ↓
Save Drafts for Your Review
    ↓
You Review → Approve/Publish
```

### What Happens Now:

1. **Monitoring** (FREE) - Checks 15 sources every hour
2. **Auto-Generation** - When articles found:
   - ✅ Claude rewrites immediately (witty tone for fun topics, serious for sensitive)
   - ✅ OpenAI generates photorealistic image
   - ✅ Saves as draft
3. **Your Review** - I notify you with full drafts
4. **You Publish** - Review and approve what you like

### Tone Detection:

**Witty Tone (default):**
- Product launches
- Technical breakthroughs  
- Industry trends
- Fun AI applications

**Serious Tone (auto-detected):**
- AI safety concerns
- Ethics & bias
- Job displacement
- Privacy/security breaches
- Regulation/policy

### Cost:

**Per Article Generated:**
- Claude Haiku: $0.003
- GPT-Image-1.5: $0.04
- **Total: ~$0.043 per draft**

**You only pay for drafts generated** (not for monitoring)

**Example:**
- 3 articles found/day × $0.043 = $0.13/day = **$3.90/month**
- You review and publish only the best

### Commands:

**Review drafts:**
```bash
cat /home/ec2-user/clawd/pulse-ai/.review-digest.txt
```

**Publish selected:**
```bash
python3 publish-draft.py 1,2,5
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

- `rss-monitor.py` - Finds new articles
- `generate-drafts.py` - Auto-writes with Claude + images
- `publish-draft.py` - Publishes approved articles
- `.article-drafts.json` - Drafts waiting for review
- `.review-digest.txt` - Human-readable draft summary

### Status:

- ✅ Daemon running (PID: 232758)
- ✅ Auto-generation enabled
- ✅ Next check: ~1 hour
- ✅ Will notify when drafts ready

---

**Ready! I'll message you when first drafts are generated.** 🚀
