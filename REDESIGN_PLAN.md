# Pulse AI - Complete Redesign Game Plan

## Design Brief
**Inspiration:** The Rundown AI - clean, simple, modern, newsletter-style aesthetic  
**Goal:** World-class design that rivals top-tier AI news sites  
**Target:** Simple, intuitive, modern - top in its class  

## Design Principles

### 1. **Ultra-Clean, Newsletter-Style Layout**
- Spacious white backgrounds
- Generous padding and margins
- Content-first approach
- Minimal distractions

### 2. **Modern Typography**
- Clean, readable sans-serif fonts
- Clear hierarchy (headlines → subheads → body)
- Excellent line spacing and readability
- Professional but approachable

### 3. **Sophisticated Color Palette**
- Primary: Deep navy or charcoal for text
- Accent: One sophisticated accent color (e.g., electric blue, vibrant purple)
- Backgrounds: Clean whites and subtle grays
- Minimal color usage - strategic highlights only

### 4. **Simple, Elegant Components**
- Card-based post layout
- Subtle shadows and borders
- Clean hover states (no aggressive effects)
- Smooth, understated animations
- Clear CTAs

### 5. **Responsive Excellence**
- Mobile-first approach
- Perfect on all screen sizes
- Touch-friendly on mobile
- Fast loading

## Site Structure

### Homepage
```
┌─────────────────────────────────────┐
│         Header / Navigation         │
├─────────────────────────────────────┤
│                                     │
│     Hero Section                    │
│     - Large headline                │
│     - Tagline                       │
│     - Email signup CTA              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     Featured Posts Grid             │
│     - Clean cards                   │
│     - Category tags                 │
│     - Read time                     │
│     - Excerpt                       │
│                                     │
├─────────────────────────────────────┤
│            Footer                   │
└─────────────────────────────────────┘
```

### Post Page
```
┌─────────────────────────────────────┐
│         Header / Navigation         │
├─────────────────────────────────────┤
│                                     │
│     Article Header                  │
│     - Title                         │
│     - Meta (date, read time, cat)   │
│     - Hero image                    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     Article Content                 │
│     - Clean typography              │
│     - Excellent readability         │
│     - Embedded images               │
│     - Pull quotes                   │
│                                     │
├─────────────────────────────────────┤
│     Email Signup CTA                │
├─────────────────────────────────────┤
│            Footer                   │
└─────────────────────────────────────┘
```

## Technical Requirements

1. **Framework:** Next.js 14+ (App Router)
2. **Styling:** Tailwind CSS with custom config
3. **Fonts:** Modern, professional Google Fonts
4. **Images:** All 4 generated images must be integrated
5. **Animations:** Framer Motion for subtle, professional transitions
6. **Performance:** 90+ Lighthouse scores

## Content

Keep existing posts but update presentation:
- GPT-5 Rumors
- Anthropic's Constitutional AI
- Stable Diffusion 3
- Google's Gemini Enterprise

Each post gets one of the generated images.

## Deployment

- Deploy to Vercel
- Public URL (no auth required)
- Custom domain ready (if provided)
- Optimized for production

## Timeline

**Target: 1 hour complete redesign**

1. ✅ Kill old work
2. ✅ Research & plan
3. 🔄 Design system setup (colors, fonts, spacing)
4. 🔄 Component redesign (Header, Footer, PostCard, etc.)
5. 🔄 Homepage redesign
6. 🔄 Post page redesign
7. 🔄 Integrate all 4 generated images
8. 🔄 Responsive testing & polish
9. 🔄 Production build test
10. 🔄 Deploy to Vercel
11. 🔄 Commit to GitHub

## Success Criteria

- [ ] Looks world-class - comparable to The Rundown AI
- [ ] Simple, clean, intuitive navigation
- [ ] Perfect responsiveness
- [ ] All 4 images integrated beautifully
- [ ] Fast page loads
- [ ] Public Vercel URL works
- [ ] GitHub repo updated
- [ ] Production-ready

---

**Designer/Developer:** Claude Code CLI  
**Started:** 2026-02-06 01:46 UTC  
**Deadline:** 2026-02-06 02:46 UTC
