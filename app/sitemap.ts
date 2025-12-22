import { getDynamicSitemap } from '@/apis/server/internal';
import type { MetadataRoute } from 'next';
import { unstable_cache as cache } from 'next/cache';

const webURL = new URL(process.env.WEB_HOST!);

const getDynamicSitemapCache = cache(getDynamicSitemap, ['post-sitemap'], {
  revalidate: 3600,
  tags: ['sitemap'],
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', 'legal', 'manual', 'support'];
  const searchPaths = ['search/articles', 'search/series', 'search/questions'];
  const postPaths = ['post', 'post/articles', 'post/series', 'post/questions'];
  const authPaths = ['join', 'login'];

  function buildPaths(paths: string[], priority: number): MetadataRoute.Sitemap {
    return paths.map((path) => ({
      url: `${webURL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority,
    }));
  }

  const postSitemap = await getDynamicSitemapCache().catch(() => []);

  return [
    ...buildPaths(staticPaths, 1),
    ...buildPaths(searchPaths, 1),
    ...buildPaths(postPaths, 0.7),
    ...buildPaths(authPaths, 0.7),
    ...postSitemap,
  ];
}
