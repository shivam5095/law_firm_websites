import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [{
      source: '/practice-areas/arbitration-dispute-resolution',
      destination: '/practice-areas',
      permanent: true,
    }];
  },
};

export default nextConfig;
