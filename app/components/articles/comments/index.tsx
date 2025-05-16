import { useQuery } from '@tanstack/react-query';
import { getArticleComments } from '~/apis/client/articles';
import ArticleCommentForm from '~/components/articles/comments/form';
import ArticleCommentList from '~/components/articles/comments/list';
import ArticleCommentListItem from '~/components/articles/comments/list-item';
import CommentSkeleton from '~/components/common/comments/skeleton';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

interface ArticleCommentsProps {
  articleId: number;
}

export default function ArticleComments({ articleId }: Readonly<ArticleCommentsProps>) {
  const { data: comments, status } = useQuery({
    queryKey: ['article-comments', articleId],
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
          {comments?.content.map((comment) => (
            <ArticleCommentListItem key={comment.id} articleId={articleId} comment={comment} />
          ))}
        </ArticleCommentList>
      </CardContent>
    </Card>
  );
}
