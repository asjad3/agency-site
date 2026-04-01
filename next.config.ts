import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Cloudflare Images for optimization
    unoptimized: true,
  },
  // Required for Cloudflare Pages/Workers deployment
  output: "standalone",
};

export default nextConfig;
