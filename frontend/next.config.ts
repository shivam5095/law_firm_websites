import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 90, 95, 100],
  },
  async redirects() {
    return [{
      source: '/experience',
      destination: '/',
      permanent: true,
    }, {
      source: '/practice-areas/arbitration-dispute-resolution',
      destination: '/practice-areas',
      permanent: true,
    }];
  },
};

export default nextConfig;
