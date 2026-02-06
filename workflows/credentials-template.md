# Credentials Setup Guide

This guide will help you configure all required API credentials for the Pulse AI workflow.

---

## 🔑 Required Credentials

### 1. OpenRouter API (Claude Sonnet)

**Purpose:** Rewriting articles with Claude Sonnet 4.5

**How to get:**
1. Visit https://openrouter.ai
2. Sign up / Log in
3. Go to **Keys** section
4. Create new API key
5. Copy the key (starts with `sk-or-v1-...`)

**Cost:** ~$0.003 per article rewrite (very affordable)

**n8n Setup:**
- Type: **HTTP Header Auth**
- Name: `OpenRouter API`
- Header Name: `Authorization`
- Header Value: `Bearer YOUR_API_KEY_HERE`

**Assign to node:** `Claude: Rewrite Article`

---

### 2. OpenAI API (Image Generation)

**Purpose:** Generating editorial images with GPT-Image-1.5

**How to get:**
1. Visit https://platform.openai.com
2. Sign up / Log in
3. Go to **API Keys** → Create new secret key
4. Copy the key (starts with `sk-...`)
5. Add credits to your account (at least $5)

**Cost:** ~$0.04 per image (high quality, 1536x1024)

**n8n Setup:**
- Type: **HTTP Header Auth**
- Name: `OpenAI API`
- Header Name: `Authorization`
- Header Value: `Bearer YOUR_API_KEY_HERE`

**Assign to node:** `OpenAI: Generate Image`

---

### 3. Discord Webhook (Optional)

**Purpose:** Notifications when new posts are published

**How to get:**
1. Open Discord server (create one if needed)
2. Go to **Server Settings** → **Integrations** → **Webhooks**
3. Click **New Webhook**
4. Name it "Pulse AI"
5. Select channel for notifications
6. Click **Copy Webhook URL**

**Cost:** Free

**n8n Setup:**
- Type: **Discord Webhook API**
- Name: `Pulse AI Discord Webhook`
- Webhook URL: `YOUR_WEBHOOK_URL_HERE`

**Assign to node:** `Discord Notification`

**If you don't want Discord notifications:**
- Simply disable the "Discord Notification" node
- Or delete it entirely

---

## 🔐 Security Best Practices

### Protect Your API Keys

✅ **DO:**
- Store keys in n8n's credential system (encrypted)
- Use environment variables for sensitive data
- Rotate keys periodically
- Monitor API usage

❌ **DON'T:**
- Hardcode keys in workflow JSON
- Commit keys to Git
- Share keys publicly
- Use the same key across multiple projects

### API Rate Limits

**OpenRouter:**
- Default: 200 requests/minute
- Per-model limits vary

**OpenAI:**
- Tier 1: 500 requests/minute, 200,000 tokens/minute
- Images: 50 requests/minute

**Workflow usage:**
- Runs every 3 hours → 8 times/day
- Processes 5 articles per run
- Total: 40 API calls/day (well within limits)

---

## 💰 Cost Estimation

### Per Run (5 articles)

| Service | Cost per Item | Quantity | Total |
|---------|---------------|----------|-------|
| Claude Sonnet (rewrite) | $0.003 | 5 | $0.015 |
| OpenAI Images | $0.04 | 5 | $0.20 |
| **Total per run** | | | **$0.215** |

### Monthly Cost

- Runs: 8/day × 30 days = 240 runs/month
- **Total: ~$51.60/month**

**Ways to reduce cost:**
1. Use cheaper Claude model (Claude 3 Haiku: $0.00025/request)
2. Generate fewer images (cache/reuse)
3. Run less frequently (every 6 hours instead of 3)
4. Use smaller image size (1024x1024: $0.02)

---

## 🧪 Testing Your Credentials

### Test OpenRouter

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OPENROUTER_KEY" \
  -d '{
    "model": "anthropic/claude-sonnet-4-5",
    "messages": [{"role": "user", "content": "Say hello"}]
  }'
```

**Expected:** JSON response with Claude's message

### Test OpenAI

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_OPENAI_KEY"
```

**Expected:** JSON list of available models

### Test Discord Webhook

```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"content": "Test message from Pulse AI"}'
```

**Expected:** Message appears in Discord channel

---

## 🔄 Credential Rotation

### When to Rotate

- Every 90 days (security best practice)
- If key is accidentally exposed
- When team member leaves
- After security incident

### How to Rotate

1. **Generate new key** in respective platform
2. **Update n8n credential** with new key
3. **Test workflow** to ensure it works
4. **Revoke old key** in platform
5. **Document change** (optional)

---

## 📋 Checklist

Before running the workflow, ensure:

- [ ] OpenRouter API key added to n8n
- [ ] OpenRouter credential assigned to "Claude: Rewrite Article" node
- [ ] OpenAI API key added to n8n
- [ ] OpenAI credential assigned to "OpenAI: Generate Image" node
- [ ] (Optional) Discord webhook configured
- [ ] All credentials tested with curl commands
- [ ] API usage limits understood
- [ ] Budget alerts set up in OpenRouter/OpenAI dashboards

---

## 🆘 Troubleshooting

### "Unauthorized" or "Invalid API key"

**Check:**
- Key is correct (no extra spaces)
- Key is active (not revoked)
- Billing is enabled (OpenAI requires payment method)
- Header format is correct: `Bearer sk-...`

### "Rate limit exceeded"

**Solution:**
- Wait a few minutes
- Reduce workflow frequency
- Upgrade API tier

### "Insufficient quota"

**For OpenAI:**
- Add credits: https://platform.openai.com/account/billing

**For OpenRouter:**
- Add credits: https://openrouter.ai/credits

---

## 📞 API Support

**OpenRouter:**
- Docs: https://openrouter.ai/docs
- Discord: https://discord.gg/openrouter
- Email: support@openrouter.ai

**OpenAI:**
- Docs: https://platform.openai.com/docs
- Help: https://help.openai.com
- Community: https://community.openai.com

**Discord:**
- Help: https://support.discord.com

---

**Happy automating! 🚀**
