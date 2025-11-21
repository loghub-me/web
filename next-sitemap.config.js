/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  priority: 0.7,
  changefreq: 'daily',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/edit/', '/settings/', '/notifications/', '/safe-link/'] }],
  },
  transform: async (config, url) => {
    const highPriorityUrls = ['/'];
    const highPriorityPatterns = [/^\/search(\/.*)?$/, /^\/post(\/.*)?$/];
    const isHighPriority = highPriorityUrls.includes(url) || highPriorityPatterns.some((pattern) => pattern.test(url));

    return {
      loc: url,
      changefreq: 'daily',
      priority: isHighPriority ? 1 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => {
    return [
      { loc: '/search/articles', changefreq: 'daily', priority: 1, lastmod: new Date().toISOString() },
      { loc: '/search/series', changefreq: 'daily', priority: 1, lastmod: new Date().toISOString() },
      { loc: '/search/questions', changefreq: 'daily', priority: 1, lastmod: new Date().toISOString() },
    ];
  },
};
