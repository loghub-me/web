import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getArticleCommentReplies } from '~/apis/client/article';
import ArticleCommentList from '~/components/article/comment/list';
import ArticleCommentListItem from '~/components/article/comment/list-item';
import { CommentSkeleton } from '~/components/common/skeletons';
import { Button } from '~/components/ui/button';

interface ArticleCommentRepliesProps {
  articleId: number;
  commentId: number;
  replyCount: number;
  queryKey: (string | number)[];
}

export default function ArticleCommentReplies({
  articleId,
  commentId,
  replyCount,
  queryKey,
}: Readonly<ArticleCommentRepliesProps>) {
  const [loaded, setLoaded] = useState(false);
  const { data: replies, status } = useQuery({
    queryKey: ['getArticleCommentReplies', articleId, commentId],
    queryFn: () => getArticleCommentReplies(articleId, commentId),
    enabled: loaded,
  });

  if (!loaded) {
    return (
      <Button variant={'link'} className="p-0 h-7 text-xs" onClick={() => setLoaded(true)}>
        {replyCount}개의 답글
      </Button>
    );
  }

  return (
    <ArticleCommentList className="pt-4">
      {status === 'pending' && <CommentSkeleton size={2} />}
      {replies?.map((reply) => (
        <ArticleCommentListItem
          key={reply.id}
          articleId={articleId}
          parentId={commentId}
          comment={reply}
          queryKey={queryKey}
        />
      ))}
    </ArticleCommentList>
  );
}
