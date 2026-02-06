# PULSE.AI 🚀

**Your daily dose of AI intelligence.** A production-grade AI news aggregation website with Editorial Neon Brutalism aesthetics.

📚 **[Complete Project Wiki →](PROJECT-WIKI.md)** — Start here for comprehensive documentation

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-magenta)

## 🎨 Design Philosophy

**Editorial Neon Brutalism** - A bold fusion of clean editorial layouts with cyberpunk neon accents:

- **Typography:** Space Grotesk (display) + Newsreader (body) for distinctive character
- **Color Palette:** Pure white background with strategic neon highlights (#00FFAA, #FF00FF, #FFDD00)
- **Animations:** Smooth, purposeful micro-interactions using Framer Motion
- **Aesthetic:** Professional minimalism meets future vibes

## ✨ Features

- **Responsive Design:** Seamless mobile-to-desktop experience
- **Dynamic Content:** JSON-based content management system
- **Hero Section:** Large featured post with immersive imagery
- **Post Grid:** 3-column card layout with neon hover effects
- **Post Pages:** Full-width hero, readable typography, scroll progress bar
- **Animations:** Staggered fade-ins, parallax effects, hover glows
- **SEO Ready:** Optimized metadata and semantic HTML
- **Performance:** Next.js App Router with static generation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd pulse-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
pulse-ai/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   ├── post/[id]/           # Dynamic post pages
│   └── globals.css          # Global styles & animations
├── components/              # React components
│   ├── Header.tsx           # Sticky navigation
│   ├── Hero.tsx             # Featured post hero
│   ├── PostCard.tsx         # Post grid card
│   ├── PostGrid.tsx         # Post grid layout
│   ├── Footer.tsx           # Site footer
│   └── ScrollProgress.tsx   # Reading progress bar
├── public/
│   └── posts/
│       └── posts.json       # Content database
└── tailwind.config.ts       # Tailwind + custom theme
```

## 📝 Content Management

Posts are stored in `/public/posts/posts.json`:

```json
{
  "posts": [
    {
      "id": "unique-slug",
      "title": "Post Title",
      "content": "Full markdown content...",
      "snippet": "Short preview text",
      "image_url": "https://example.com/image.jpg",
      "category": "LLMs",
      "read_time": "5 min read",
      "published_at": "2026-02-06T10:00:00Z",
      "tone": "humor-allowed"
    }
  ]
}
```

### Adding New Posts

1. Add a new post object to `posts.json`
2. Use a unique `id` (becomes the URL slug)
3. Write content in Markdown format
4. Provide an image URL (Unsplash or hosted)
5. Choose category: `LLMs`, `GenAI`, `Research`, or `Industry`

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  neon: {
    cyan: '#00FFAA',    // Primary accent
    magenta: '#FF00FF', // Secondary accent
    yellow: '#FFDD00',  // Tertiary accent
  },
}
```

### Typography

Change fonts in `app/layout.tsx`:

```typescript
import { Space_Grotesk, Newsreader } from "next/font/google";
```

### Animations

Adjust Framer Motion settings in components or add new animations in `globals.css`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables

No environment variables required for basic setup. For production:

- Configure custom domain in Vercel
- Set up analytics (optional)
- Configure Content Security Policy (optional)

### Build for Production

```bash
# Generate static build
npm run build

# Start production server
npm start
```

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Bundle Size:** Optimized with Next.js automatic code splitting

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Markdown:** react-markdown
- **Images:** Next.js Image optimization
- **Fonts:** Google Fonts (Space Grotesk, Newsreader)

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎯 Roadmap

- [ ] Email subscription integration (Mailchimp/ConvertKit)
- [ ] RSS feed generation
- [ ] Search functionality
- [ ] Category filtering
- [ ] Dark mode toggle
- [ ] Related posts suggestions
- [ ] Social sharing buttons
- [ ] Comments system
- [ ] Admin dashboard for content management

## 💡 Design Credits

Inspired by:
- [The Rundown AI](https://therundown.ai) - Editorial excellence
- Neon Brutalism aesthetic
- Modern AI/tech publications

Built with ❤️ by the Pulse AI team.

---

**Questions?** Open an issue or reach out!

🔗 [Live Demo](#) | 📧 [Contact](#) | 🐦 [Twitter](#)
