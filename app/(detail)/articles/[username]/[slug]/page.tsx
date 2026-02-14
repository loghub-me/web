import { getArticleDetail } from '@/apis/server/article';
import { ArticleTOCCard } from '@/components/client/article';
import ArticleComments from '@/components/client/article/comment';
import ArticleDetailWrapper from '@/components/client/article/detail/wrapper';
import {
  ArticleAsideRight,
  ArticleDetailContent,
  ArticleDetailHeader,
  ArticleDetailHero,
} from '@/components/server/article';
import { parseObject } from '@/lib/parse';
import { buildAssetsUrl } from '@/lib/utils';
import { compositeKeySchema } from '@/schemas/common';
import { Card } from '@ui/card';
import { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/articles/[username]/[slug]'>): Promise<Metadata> {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const article = await getArticleDetail(username, slug);
  const [title, description] = [article.title, article.content.normalized.slice(0, 200)];
  const url = `${process.env.WEB_HOST}/articles/${username}/${slug}`;
  const images = [buildAssetsUrl(article.thumbnail)];

  return {
    title,
    description,
    openGraph: { title, description, url, images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}

export default async function ArticleDetailPage({ params }: PageProps<'/articles/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const article = await getArticleDetail(username, slug);

  return (
    <main className="container mx-auto py-20 min-h-screen space-y-4">
      <ArticleDetailHero article={article} />
      <ArticleDetailWrapper>
        <div className="w-full min-w-0 space-y-4">
          <Card className="pt-0">
            <ArticleDetailHeader article={article} />
            <ArticleDetailContent article={article} />
          </Card>
          <ArticleComments articleId={article.id} />
        </div>
        <ArticleAsideRight>
          <ArticleTOCCard article={article} />
        </ArticleAsideRight>
      </ArticleDetailWrapper>
    </main>
  );
}
