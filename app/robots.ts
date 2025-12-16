import type { MetadataRoute } from 'next';

const webURL = new URL(process.env.WEB_HOST!);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/edit/', '/settings/', '/notifications/', '/safe-link/'],
    },
    host: webURL.host,
    sitemap: `${webURL}sitemap.xml`,
  };
}
