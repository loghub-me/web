import type { MetadataRoute } from 'next';

const webURL = new URL(process.env.WEB_HOST!);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/legal', '/support'];
  const searchPaths = ['/search/articles', '/search/series', '/search/questions'];
  const postPaths = ['/post', '/post/articles', '/post/series', '/post/questions', '/post/manual'];
  const authPaths = ['/join', '/login'];
  const settingsPaths = ['/settings'];

  function buildPaths(paths: string[], priority: number): MetadataRoute.Sitemap {
    return paths.map((path) => ({
      url: `${webURL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority,
    }));
  }

  return [
    ...buildPaths(staticPaths, 1),
    ...buildPaths(searchPaths, 1),
    ...buildPaths(postPaths, 0.7),
    ...buildPaths(authPaths, 0.7),
    ...buildPaths(settingsPaths, 0.5),
  ];
}
