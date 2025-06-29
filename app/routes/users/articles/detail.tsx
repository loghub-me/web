import type { Route } from './+types/detail';
import { getArticle } from '~/apis/server/articles';
import {
  ArticleDetailAside,
  ArticleDetailContent,
  ArticleDetailFooter,
  ArticleDetailHeader,
  ArticleDetailHero,
} from '~/components/article';
import ArticleComments from '~/components/article/comment';
import { Card } from '~/components/ui/card';
import { parseToc } from '~/lib/markdown/parse';
import { parseParams } from '~/lib/parse';
import ReplyProvider from '~/providers/reply-provider';
import { compositeKeySchema } from '~/schemas/zod';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, compositeKeySchema);
  const article = await getArticle(username, slug);
  return { article };
}

export default function ArticleDetailRoute({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  const toc = parseToc(article.content.markdown);

  return (
    <main className="container mx-auto px-2 pt-20 pb-4 min-h-screen space-y-4">
      <ArticleDetailHero {...article} />
      <div className="flex gap-4">
        <Card className="w-full pt-0">
          <ArticleDetailHeader {...article} />
          <ArticleDetailContent {...article} />
          <ArticleDetailFooter {...article} />
        </Card>
        <ArticleDetailAside toc={toc} {...article} />
      </div>
      <ReplyProvider>
        <ArticleComments articleId={article.id} />
      </ReplyProvider>
    </main>
  );
}
