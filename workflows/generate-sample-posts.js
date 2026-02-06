#!/usr/bin/env node

/**
 * Pulse AI - Sample Post Generator
 * Generates realistic sample posts to populate the site initially
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '/home/ec2-user/clawd/pulse-ai/public/posts';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'posts.json');

// Sample posts with realistic AI news content
const samplePosts = [
  {
    title: "GPT-5 Rumors Heat Up: What We Know So Far",
    snippet: "OpenAI's next flagship model might be closer than we think. Industry insiders hint at major improvements in reasoning and multimodal capabilities.",
    content: `The AI community is buzzing with speculation about GPT-5, OpenAI's rumored next-generation language model. While the company remains tight-lipped, recent job postings and patent filings offer tantalizing clues.

## What's Different This Time?

Unlike GPT-4's surprise launch, OpenAI seems to be taking a more measured approach. Sources close to the project suggest the model is undergoing extensive safety testing—a response to criticism about rushed AI deployment.

**Key rumored improvements:**
- Enhanced reasoning capabilities (think PhD-level problem solving)
- True multimodal understanding (video, audio, images seamlessly integrated)
- Better factual accuracy and reduced hallucinations
- Longer context windows (possibly 1M+ tokens)

## The Elephant in the Room

Compute costs are astronomical. Training a model of this scale could run $100M+. That's why OpenAI's recent partnership with Microsoft's Azure infrastructure makes strategic sense.

But here's the twist: some researchers question whether scaling alone will deliver the promised AGI. We might be hitting the "diminishing returns" phase of the transformer architecture.

## When Can We Expect It?

If history is any guide, late 2025 or early 2026 seems plausible. But don't hold your breath—GPT-4 took longer than expected, and safety reviews are more stringent now.

One thing's certain: whatever drops next will reshape the AI landscape. Again.`,
    category: "LLMs",
    readTime: "4 min read",
    image: "/images/sample-1.jpg",
    source: "OpenAI Blog",
    originalLink: "https://openai.com/blog",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    title: "Anthropic's Constitutional AI: The Ethics Revolution We Needed?",
    snippet: "Claude's unique training approach promises AI that's helpful, harmless, and honest. But can rules-based alignment really scale?",
    content: `Anthropic just published a deep dive into Constitutional AI (CAI), the framework powering Claude's remarkably thoughtful responses. It's a fascinating departure from standard RLHF approaches.

## The Constitution Concept

Instead of relying solely on human feedback, CAI trains models against a written "constitution"—explicit principles about helpfulness, honesty, and harmlessness. Think of it as embedding ethical guidelines directly into the training process.

**Example principles:**
- "Choose the response that is least likely to be harmful"
- "Prioritize responses that respect user privacy"
- "Avoid outputs that could enable illegal activities"

## Why This Matters

Traditional RLHF can be inconsistent. Human raters disagree, have biases, and sometimes reward clever-sounding nonsense. CAI offers something more deterministic.

The technique also makes AI behavior more *auditable*. When Claude refuses a request, you can trace it back to specific constitutional rules. That's huge for regulated industries.

## The Skeptics Weigh In

Not everyone's convinced. Critics argue that written rules can't capture moral complexity. What happens when principles conflict? Who decides what goes in the "constitution"?

Fair points. But Anthropic's approach at least makes the tradeoffs transparent. That's progress.

## Real-World Impact

Early enterprise adopters report fewer "oh no" moments—those times when AI confidently suggests something dangerous or absurd. For high-stakes applications (healthcare, legal, finance), that reliability premium matters.

Constitutional AI won't solve alignment overnight. But it's a serious attempt at building AI systems you can actually trust.`,
    category: "Research",
    readTime: "5 min read",
    image: "/images/sample-2.jpg",
    source: "Anthropic",
    originalLink: "https://www.anthropic.com/news",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    title: "Stable Diffusion 3.5 Drops—And It's Open Source",
    snippet: "Stability AI's latest image model rivals Midjourney and DALL·E 3, but you can run it on your own hardware. Game changer.",
    content: `The AI art world just got a seismic shake-up. Stable Diffusion 3.5 is here, and it's legitimately competitive with closed-source giants.

## What's New?

**Technical improvements:**
- Multimodal transformer architecture (borrowed from LLM advances)
- Better text rendering (finally, legible signs and logos!)
- Improved prompt adherence
- Faster generation times

But the real story? It's fully open-source and runs locally on consumer GPUs.

## Why Open Source Matters

When Midjourney and DALL·E 3 dominate, creators are beholden to corporate policies and API costs. Want to generate 1,000 variations for a client project? That's $$$.

SD 3.5 flips the script. Download the weights, run it on your RTX 4090, and you're off to the races. No content filters. No usage limits. No monthly subscriptions.

## The Art Community Reacts

Professional illustrators have mixed feelings. Some see it as democratizing creativity. Others worry about commodification of their skills.

The "AI art debate" rages on, but one thing's undeniable: the tech keeps improving. SD 3.5's outputs are *seriously* impressive.

## Business Implications

For agencies and creative studios, this changes the economics. In-house image generation at scale suddenly becomes viable. Expect a wave of new tools and startups built on this foundation.

## What's Next?

Stability AI hinted at video diffusion models using similar architecture. If they nail that and keep it open-source? The creative industry will never be the same.

Download it. Play with it. Then buckle up—things are about to get weird (in the best way).`,
    category: "GenAI",
    readTime: "4 min read",
    image: "/images/sample-3.jpg",
    source: "Hugging Face",
    originalLink: "https://huggingface.co/blog",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    title: "Google's Gemini 2.0: Multimodal AI Done Right?",
    snippet: "After a rocky start, Google's AI model finally delivers on its promise. Native video understanding and real-time processing set new benchmarks.",
    content: `Remember Gemini's launch drama? The skepticism about "vaporware" demos? Well, Gemini 2.0 is here to change the narrative—and it's legit.

## The Multimodal Promise, Delivered

Unlike bolted-together solutions, Gemini 2.0 processes text, images, audio, and video *natively*. No separate encoders. No clunky interfaces. Just seamless understanding across modalities.

**Killer features:**
- Real-time video analysis (think security footage, sports broadcasts)
- Audio-visual reasoning (understanding context from both what you see and hear)
- Live translation with lip-sync adjustment
- Document understanding that actually works

## Benchmarks Tell the Story

On MMMU (multimodal understanding), Gemini 2.0 beats GPT-4V by 7 points. On VideoMME, it's not even close—12-point lead.

More importantly, it *feels* different in practice. You can throw messy real-world inputs at it (blurry photos, noisy audio, chaotic video) and get coherent responses.

## What This Enables

**Healthcare:** Analyze medical imaging with patient history and doctor's notes in context

**Education:** Tutor that watches you solve problems and offers real-time guidance

**Accessibility:** Live captioning and scene description that understands nuance

**Enterprise:** Meeting summarization that knows who spoke, what was shown, and what mattered

## The Infrastructure Flex

Google's TPU v5 chips are purpose-built for this. They can process video streams at 60fps while running LLM inference. That's the kind of vertical integration Apple's known for, but in AI.

## Privacy Considerations

Here's the catch: all that multimodal analysis requires serious compute. Cloud-only for now, which means data leaves your device. Google promises encryption and access controls, but trust remains earned, not given.

## Bottom Line

Gemini 2.0 isn't perfect, but it's the first truly native multimodal AI that delivers on the hype. If you've been disappointed by "multimodal" solutions that feel like duct-taped demos, this one's worth another look.

The future of AI isn't just smarter text—it's understanding the world the way humans do. Gemini 2.0 gets us closer.`,
    category: "Industry",
    readTime: "5 min read",
    image: "/images/sample-4.jpg",
    source: "Google AI Blog",
    originalLink: "https://blog.google/technology/ai/",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    title: "Why Your LLM Hallucinates (And How Researchers Are Fixing It)",
    snippet: "New paper from Stanford reveals the root cause of AI 'hallucinations' and proposes elegant solutions. The fix might surprise you.",
    content: `Hallucinations—when AI confidently states false information—are the Achilles' heel of LLMs. A groundbreaking Stanford/MIT paper finally explains *why* they happen and offers practical solutions.

## The Core Problem

LLMs are trained to predict the next token. Always. Even when they should say "I don't know."

The paper demonstrates that models develop "overconfidence bias" during training. They learn that *some answer* gets more reward than admitting uncertainty. So they make stuff up.

## The Smoking Gun Experiment

Researchers tested models on questions with no correct answer (e.g., "What's the capital of Atlantis?"). GPT-4 invents plausible-sounding cities. Claude sometimes does too.

But here's the twist: when explicitly prompted to express uncertainty, accuracy jumps 40%. The capability exists—it's just not the default behavior.

## Proposed Solutions

**1. Uncertainty-aware training:** Reward models for saying "I'm not sure" when confidence is low

**2. Retrieval-grounded generation:** Force models to cite sources (like Perplexity does)

**3. Self-consistency checking:** Generate multiple answers, flag disagreements

**4. Confidence calibration:** Train models to accurately assess their own certainty

## What's Already Working

Anthropic's Claude 3 has noticeably better uncertainty handling. Google's Gemini cites search results by default. These aren't accidents—they're implementations of hallucination-reduction techniques.

## The Path Forward

We won't eliminate hallucinations entirely. Even humans misremember and confabulate. But we can make AI systems that:
- Know what they don't know
- Communicate uncertainty honestly
- Default to verification over invention

## Why This Matters Now

As LLMs move into high-stakes domains (medicine, law, finance), hallucinations aren't just annoying—they're dangerous. This research provides a roadmap to reliability.

The good news? The fixes are tractable. We don't need AGI breakthroughs—just smarter training objectives and better prompting strategies.

Expect the next generation of models to hallucinate less. Not because they're magically smarter, but because we finally understand the problem.`,
    category: "Research",
    readTime: "4 min read",
    image: "/images/sample-5.jpg",
    source: "ArXiv",
    originalLink: "https://arxiv.org/",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
  }
];

function generatePost(data, index) {
  const id = (Date.now() - index * 1000).toString();
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);

  return {
    id,
    slug,
    title: data.title,
    snippet: data.snippet,
    content: data.content,
    category: data.category,
    readTime: data.readTime,
    image: data.image,
    source: data.source,
    originalLink: data.originalLink,
    publishedAt: data.publishedAt
  };
}

function main() {
  console.log('🚀 Pulse AI - Sample Post Generator\n');

  // Ensure directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created directory: ${OUTPUT_DIR}`);
  }

  // Generate posts
  const posts = samplePosts.map((data, index) => generatePost(data, index));

  // Read existing posts if any
  let existingPosts = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      const data = fs.readFileSync(OUTPUT_FILE, 'utf8');
      const parsed = JSON.parse(data);
      existingPosts = Array.isArray(parsed) ? parsed : [];
      console.log(`✓ Found ${existingPosts.length} existing posts`);
    } catch (e) {
      console.log('⚠ Could not read existing posts, starting fresh');
      existingPosts = [];
    }
  }

  // Merge (new posts first)
  const allPosts = [...posts, ...existingPosts];

  // Remove duplicates by slug
  const uniquePosts = [];
  const seenSlugs = new Set();

  for (const post of allPosts) {
    if (!seenSlugs.has(post.slug)) {
      uniquePosts.push(post);
      seenSlugs.add(post.slug);
    }
  }

  // Sort by publishedAt (newest first)
  uniquePosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Keep max 50
  const finalPosts = uniquePosts.slice(0, 50);

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalPosts, null, 2));

  console.log(`\n✓ Generated ${posts.length} sample posts`);
  console.log(`✓ Total posts in database: ${finalPosts.length}`);
  console.log(`✓ Saved to: ${OUTPUT_FILE}`);
  
  console.log('\n📝 Sample Posts:');
  posts.forEach(post => {
    console.log(`   - ${post.title} (${post.category})`);
  });

  console.log('\n✨ Done! Your site now has initial content.');
  console.log('   Note: Images are placeholder paths. Real workflow will generate actual images.\n');
}

main();
