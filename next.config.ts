import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'contentforge.netlify.app',
      'contentforge-flax.vercel.app',
      'openrouter.ai',
      'localhost:3000'
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
