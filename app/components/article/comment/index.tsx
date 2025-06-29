import { useQuery } from '@tanstack/react-query';
import { getArticleComments } from '~/apis/client/articles';
import ArticleCommentForm from '~/components/article/comment/form';
import ArticleCommentList from '~/components/article/comment/list';
import ArticleCommentListItem from '~/components/article/comment/list-item';
import { CommentSkeleton } from '~/components/common/skeletons';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

interface ArticleCommentsProps {
  articleId: number;
}

export default function ArticleComments({ articleId }: Readonly<ArticleCommentsProps>) {
  const { data: comments, status } = useQuery({
    queryKey: ['articles-comment', articleId],
    queryFn: () => getArticleComments(articleId),
  });

  return (
    <Card>
      <CardHeader className="border-b">
        <ArticleCommentForm articleId={articleId} />
      </CardHeader>
      <CardContent>
        <ArticleCommentList>
          {status === 'pending' && <CommentSkeleton size={2} />}
          {comments?.page.totalPages === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              아직 작성된 댓글이 없습니다. 첫 댓글을 작성해보세요!
            </p>
          )}
          {comments?.content.map((comment) => (
            <ArticleCommentListItem key={comment.id} articleId={articleId} comment={comment} />
          ))}
        </ArticleCommentList>
      </CardContent>
    </Card>
  );
}
