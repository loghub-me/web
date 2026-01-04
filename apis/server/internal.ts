import { serverAPI } from '@/apis/server/instance';
import 'server-only';

const getDynamicSitemap = async () =>
  serverAPI
    .get('internal/sitemap', {
      headers: {
        Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
      },
    })
    .json<SitemapItem[]>();

export { getDynamicSitemap };
