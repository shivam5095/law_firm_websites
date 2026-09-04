import { MetadataRoute } from 'next';
import { practiceAreas } from '@/data/practiceAreas';
import { lawyers } from '@/data/lawyers';
import { publications } from '@/data/publications';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  const staticPages = [
    '', '/about', '/practice-areas', '/team', '/experience',
    '/insights', '/publications', '/consultation', '/contact',
    '/careers', '/faq', '/disclaimer', '/privacy-policy', '/terms',
  ];

  const practiceAreaPages = practiceAreas.map(pa => `/practice-areas/${pa.slug}`);
  const teamPages = lawyers.map(l => `/team/${l.slug}`);
  const insightPages = publications.map(p => `/insights/${p.slug}`);

  const allPages = [...staticPages, ...practiceAreaPages, ...teamPages, ...insightPages];

  return allPages.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.includes('/') && path.split('/').length > 2 ? 0.6 : 0.8,
  }));
}
