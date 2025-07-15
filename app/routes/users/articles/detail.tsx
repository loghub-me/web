import type { Route } from './+types/detail';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import { getArticleComments } from '~/apis/client/article';
import { getArticle } from '~/apis/server/article';
import {
  ArticleCommentForm,
  ArticleCommentList,
  ArticleCommentListItem,
  ArticleCommentReplies,
  ArticleDetailAside,
  ArticleDetailContent,
  ArticleDetailHeader,
  ArticleDetailHero,
  ArticleTocCard,
} from '~/components/article';
import ListEmpty from '~/components/common/list/empty';
import { CommentSkeleton } from '~/components/common/skeletons';
import PageNav from '~/components/search/page-nav';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { parseToc } from '~/lib/markdown/parse';
import { parseParams, parseSearchParams } from '~/lib/parse';
import ReplyProvider from '~/providers/reply-provider';
import { articleCommentPageSchema } from '~/schemas/article';
import { compositeKeySchema } from '~/schemas/common';

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { commentPage } = parseSearchParams(url.searchParams, articleCommentPageSchema);
  const { username, slug } = parseParams(params, compositeKeySchema);
  const article = await getArticle(username, slug);
  return { article, commentPage };
}

export default function ArticleDetailRoute({ loaderData }: Route.ComponentProps) {
  const { article, commentPage } = loaderData;
  const toc = parseToc(article.content.markdown);

  return (
    <main className="container mx-auto px-2 pt-20 pb-4 min-h-screen space-y-4">
      <ArticleDetailHero {...article} />
      <div className="flex gap-4">
        <div className="w-full space-y-4">
          <Card className="pt-0">
            <ArticleDetailHeader {...article} />
            <ArticleDetailContent {...article} />
          </Card>
          <ArticleDetailComments articleId={article.id} currentPage={commentPage} />
        </div>
        <ArticleDetailAside>
          <ArticleTocCard toc={toc} />
        </ArticleDetailAside>
      </div>
    </main>
  );
}

interface ArticleDetailCommentsProps {
  articleId: number;
  currentPage: number;
}

function ArticleDetailComments({ articleId, currentPage }: Readonly<ArticleDetailCommentsProps>) {
  const queryKey = ['getArticleComments', articleId, currentPage];
  const { data: comments, status } = useQuery({ queryKey, queryFn: () => getArticleComments(articleId, currentPage) });
  const { pathname } = useLocation();

  return (
    <ReplyProvider>
      <Card>
        <CardHeader className="pb-4 border-b">
          <ArticleCommentForm articleId={articleId} queryKey={queryKey} />
        </CardHeader>
        <CardContent className="space-y-2">
          <ArticleCommentList>
            {status === 'pending' && <CommentSkeleton size={2} />}
            {comments?.page.totalPages === 0 && (
              <ListEmpty message={'아직 작성된 댓글이 없습니다. 첫 댓글을 작성해보세요!'} />
            )}
            {comments?.content.map((comment) => (
              <ArticleCommentListItem key={comment.id} articleId={articleId} comment={comment} queryKey={queryKey}>
                {comment.replyCount > 0 && (
                  <ArticleCommentReplies
                    articleId={articleId}
                    commentId={comment.id}
                    replyCount={comment.replyCount}
                    queryKey={queryKey}
                  />
                )}
              </ArticleCommentListItem>
            ))}
          </ArticleCommentList>
          {comments && (
            <PageNav to={`${pathname}?commentPage=`} currentPage={currentPage} totalPages={comments.page.totalPages} />
          )}
        </CardContent>
      </Card>
    </ReplyProvider>
  );
}
