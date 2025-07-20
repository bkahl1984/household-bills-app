import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/household-bills-app', // 👈 matches your GitHub repo name
  images: {
    unoptimized: true, // disables Next.js image optimization for static export
  },
};

export default nextConfig;
