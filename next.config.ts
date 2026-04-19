import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'contentforge.netlify.app' },
      { protocol: 'https', hostname: 'contentforge-flax.vercel.app' },
      { protocol: 'https', hostname: 'openrouter.ai' },
      { protocol: 'http', hostname: 'localhost', port: '3000' }
    ]
  },
  // Netlify serverless function configuration
  experimental: {
    serverActions: {
      allowedOrigins: ['*.netlify.app', 'localhost:3000']
    }
  }
};

export default nextConfig;
