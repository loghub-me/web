import { useQuery } from '@tanstack/react-query';
import { getComments } from '~/apis/client/articles';
import ArticleCommentForm from '~/components/articles/comments/form';
import ArticleCommentList from '~/components/articles/comments/list';
import ArticleCommentListItem from '~/components/articles/comments/list-item';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

interface ArticleCommentsProps {
  articleId: number;
}

export default function ArticleComments({ articleId }: Readonly<ArticleCommentsProps>) {
  const { data: comments, status } = useQuery({
    queryKey: ['article-comments', articleId],
    queryFn: () => getComments(articleId),
  });

  return (
    <Card>
      <CardHeader className="border-b">
        <ArticleCommentForm articleId={articleId} />
      </CardHeader>
      {status === 'pending' && <span>TODO</span>}
      <CardContent>
        <ArticleCommentList>
          {comments?.content.map((comment) => (
            <ArticleCommentListItem key={comment.id} articleId={articleId} comment={comment} />
          ))}
        </ArticleCommentList>
      </CardContent>
    </Card>
  );
}
