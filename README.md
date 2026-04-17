# ContentForge - AI Image & Video Generation Platform

**Production-ready MVP for automated content creation + social media posting**

---

## 🚀 **WHAT IT DOES**

✅ **Image Generation** - AI creates images from text descriptions
✅ **Video Generation** - Auto-converts images to videos
✅ **Auto-Post to Social** - TikTok, Instagram, YouTube posting via Postiz
✅ **Credit System** - User credits for monetization
✅ **Multiple Formats** - TikTok (9:16), Instagram, YouTube (16:9), Square

---

## 🛠️ **SETUP**

### 1. Environment Variables

Create `.env.local`:

```
REPLICATE_API_TOKEN=r8_... (from https://replicate.com/account/api-tokens)
POSTIZ_API_KEY=... (from https://platform.postiz.com/settings)
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

---

## 📋 **API ENDPOINTS**

### 1. `/api/generate` - Image Generation

**POST** with body:
```json
{
  "caption": "Motivational quote about success",
  "format": "tiktok",
  "autoPost": false
}
```

**Returns:**
```json
{
  "imageUrl": "https://...",
  "success": true
}
```

---

### 2. `/api/generate-video` - Video Generation

**POST** with body:
```json
{
  "imageUrl": "https://...",
  "caption": "Your caption",
  "format": "tiktok"
}
```

**Returns:** Video URL

---

### 3. `/api/post-to-social` - Auto-Post

**POST** with body:
```json
{
  "imageUrl": "https://...",
  "caption": "Your caption",
  "platforms": ["tiktok", "instagram", "youtube"],
  "schedule": false
}
```

---

### 4. `/api/purchase-credits` - Credit System

**GET Credits:**
```json
{
  "action": "get",
  "userId": "user_123"
}
```

**Purchase Credits:**
```json
{
  "action": "purchase",
  "userId": "user_123",
  "package": "pro"
}
```

**Use Credits:**
```json
{
  "action": "use",
  "userId": "user_123",
  "amount": 1
}
```

---

## 💳 **CREDIT PACKAGES**

| Package | Credits | Price |
|---------|---------|-------|
| Starter | 10 | $9.99 |
| Pro | 50 | $39.99 |
| Unlimited | 999 | $99.99 |

Each image generation costs 1 credit.

---

## 🚢 **DEPLOY TO VERCEL**

### 1. Push to GitHub
```bash
git push
```

### 2. Go to Vercel
https://vercel.com/princeverve-cryptos-projects

### 3. Deploy
- Click "Add New" → "Project"
- Select `contentforge`
- Deploy (90 seconds)

### 4. Add Environment Variables
In Vercel dashboard:
- `REPLICATE_API_TOKEN` = your token
- `POSTIZ_API_KEY` = your key

### 5. Redeploy
Click "Redeploy" and it's LIVE

---

## 🎯 **REVENUE MODEL**

1. **Free Users** - 5 free credits/month
2. **Paid Tiers**
   - Creator: $29/month = 100 credits
   - Pro: $99/month = unlimited
3. **One-time Purchases** - $9.99 (10 credits), $39.99 (50 credits), $99.99 (999 credits)

---

## 📊 **TECH STACK**

- **Frontend:** Next.js 16, React 19
- **Backend:** Next.js API Routes
- **Image Gen:** Replicate (FLUX Schnell)
- **Video Gen:** FFmpeg (extensible)
- **Social Post:** Postiz API
- **Deployment:** Vercel

---

## 🔑 **API KEYS NEEDED**

1. **Replicate** (Image generation)
   - Sign up: https://replicate.com
   - Get token: https://replicate.com/account/api-tokens

2. **Postiz** (Social media automation)
   - Sign up: https://postiz.com
   - Get API key: https://platform.postiz.com/settings

---

## 📈 **SCALING**

### Current:
- Image generation: ~10-20 seconds
- Free tier: 5 images/month per user
- Monetized: $29-99/month subscriptions

### Next Phase:
- Video generation via FFmpeg
- Batch processing
- Advanced analytics
- Template library
- Team collaboration

---

## 🐛 **TROUBLESHOOTING**

**"API not configured"**
- Add REPLICATE_API_TOKEN to .env.local or Vercel

**"Failed to generate"**
- Check API token is valid
- Check internet connection
- Verify prompt isn't blocked

**"Insufficient credits"**
- User needs to purchase credits
- Each image = 1 credit

---

## 📝 **LICENSE**

Open source. Build on it.

---

## 🤝 **SUPPORT**

- Issues: GitHub
- Docs: https://docs.openclaw.ai
- Community: Discord

---

**Built with ❤️ by ContentForge team**
