import type { Route } from './+types/detail';
import {
  ArticleDetailAside,
  ArticleDetailContent,
  ArticleDetailHeader,
  ArticleDetailHero,
} from 'app/components/articles';
import { getArticle } from '~/apis/server/articles';
import ArticleComments from '~/components/articles/comments';
import ScrollProgressBar from '~/components/ui/scroll-progress-bar';
import { parseMarkdown, parseToc } from '~/lib/markdown/parse';
import { parseParams } from '~/lib/parse';
import ReplyProvider from '~/providers/reply-provider';
import { articleDetailSchema } from '~/schemas/articles';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, articleDetailSchema);
  const article = await getArticle(username, slug);
  return { article };
}

export default function ArticleDetailRoute({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  const [html, toc] = [parseMarkdown(article.content), parseToc(article.content)];

  return (
    <>
      <ArticleDetailHeader {...article} />
      <ScrollProgressBar />
      <main className="container mx-auto px-2 py-4 min-h-screen space-y-4">
        <ArticleDetailHero {...article} />
        <div className="flex gap-4">
          <ArticleDetailContent html={html} {...article} />
          <ArticleDetailAside toc={toc} {...article} />
        </div>
        <ReplyProvider>
          <ArticleComments articleId={article.id} />
        </ReplyProvider>
      </main>
    </>
  );
}
