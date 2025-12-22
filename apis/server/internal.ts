import { serverAPI } from '@/apis/server/instance';
import 'server-only';

const getDynamicSitemap = async () => serverAPI.get('internal/sitemap').json<SitemapItem[]>();

export { getDynamicSitemap };
