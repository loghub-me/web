import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCommentReplies } from '~/apis/client/articles';
import ArticleCommentList from '~/components/articles/comments/list';
import ArticleCommentListItem from '~/components/articles/comments/list-item';
import { Button } from '~/components/ui/button';

interface ArticleCommentRepliesProps {
  articleId: number;
  commentId: number;
  replyCount: number;
}

export default function ArticleCommentReplies({
  articleId,
  commentId,
  replyCount,
}: Readonly<ArticleCommentRepliesProps>) {
  const [loaded, setLoaded] = useState(false);
  const { data: replies, status } = useQuery({
    queryKey: ['article-comment-replies', articleId, commentId],
    queryFn: () => getCommentReplies(articleId, commentId),
    enabled: loaded,
  });

  if (!loaded) {
    return (
      <Button variant={'link'} className="px-0" onClick={() => setLoaded(true)}>
        {replyCount}개의 답글
      </Button>
    );
  }

  if (status === 'pending') {
    return <span>TODO</span>;
  }

  return (
    <ArticleCommentList className="pt-4">
      {replies?.map((reply) => <ArticleCommentListItem key={reply.id} articleId={articleId} comment={reply} />)}
    </ArticleCommentList>
  );
}
