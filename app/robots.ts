import type { MetadataRoute } from 'next';

const host = process.env.SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/edit/', '/settings/', '/notifications/', '/safe-link/'],
    },
    host,
    sitemap: `${host}/sitemap.xml`,
  };
}
