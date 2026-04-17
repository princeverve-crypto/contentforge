# ContentForge

**Your Mindset Made Visual**

AI-powered image generation platform for creators, entrepreneurs, and brands.

## Features

- ✨ Generate beautiful AI images in seconds
- 🎨 Multiple styles (Neon, Modern, Artistic, Professional)
- 📱 Multiple formats (TikTok 9:16, Instagram, YouTube, Square)
- ⚡ Lightning-fast generation
- 💰 Affordable pricing ($29-99/month)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local`:

```env
REPLICATE_API_TOKEN=your_token_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

## Technologies

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Replicate API (FLUX image generation)

## Deployment

Deploy on Vercel:
1. Push to GitHub
2. Connect Vercel
3. Deploy

## License

MIT
