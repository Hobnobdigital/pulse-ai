# COMPLETE REDESIGN TASK

## Current Status
- ✅ Design system updated (tailwind.config.ts, globals.css)
- ✅ 5 photorealistic images generated
- ✅ Git committed

## Remaining Tasks

### 1. Redesign ALL Components (clean, minimal, The Rundown AI style)

#### Header.tsx
- Clean, minimal navigation
- Simple logo "Pulse AI"
- No neon colors - use slate/indigo
- Email signup form
- Mobile responsive

#### Footer.tsx
- Minimal footer
- Simple links
- Copyright

#### Hero.tsx
- Large, bold headline
- Subtitle text
- Email signup CTA
- Clean, spacious layout
- White background

#### PostCard.tsx
- Card with image
- Title, excerpt, category
- Read time
- Hover effect (subtle shadow)
- Clean, minimal design

#### PostGrid.tsx
- Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Gap between cards
- Clean layout

### 2. Update Pages

#### app/page.tsx
- Hero section at top
- PostGrid below
- Clean, spacious layout

#### app/post/[id]/page.tsx
- Article layout
- Hero image at top
- Clean typography
- Article content
- Email signup at bottom

### 3. Update posts.json
- Map each article to correct image:
  * GPT-5 → 001-hyper-realistic-photo-of-a-sleek-modern-.png
  * Anthropic → 001-hyper-realistic-photo-of-anthropic-const.png
  * Stable Diffusion → 001-hyper-realistic-photo-of-stable-diffusio.png
  * Gemini → 001-hyper-realistic-photo-of-google-gemini-a.png
  * Hallucinations → 001-hyper-realistic-photo-of-a-modern-ai-res.png

### 4. Test & Deploy
- npm run build (fix any errors)
- Deploy to Vercel
- Get public URL

### 5. Git Commit
- Commit all changes
- Push to origin/master

## Design Guidelines
- White/light backgrounds
- Slate/indigo color scheme (from tailwind.config.ts)
- Space Grotesk (headings), Newsreader (body) fonts
- Generous whitespace
- Subtle shadows
- Card-based layouts
- Perfect mobile responsiveness

APPROVE ALL EDITS. WORK AUTONOMOUSLY. MAKE IT WORLD-CLASS.
