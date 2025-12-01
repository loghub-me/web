'use client';

import { getArticleComments } from '@/apis/client/article';
import {
  ArticleCommentForm,
  ArticleCommentList,
  ArticleCommentListItem,
  ArticleCommentListSkeleton,
  ArticleCommentReplies,
} from '@/components/client/article';
import { PageSkeleton, PageStateNav } from '@/components/client/page';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@ui/card';
import ListEmpty from '@ui/list-empty';
import { useState } from 'react';

interface ArticleCommentsProps {
  articleId: number;
}

export default function ArticleComments({ articleId }: Readonly<ArticleCommentsProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsQueryKey = ['getArticleComments', articleId, currentPage];
  const { data: comments, status } = useQuery({
    queryKey: commentsQueryKey,
    queryFn: () => getArticleComments(articleId, currentPage),
  });

  return (
    <Card>
      <CardHeader className="pb-4 border-b">
        <ArticleCommentForm articleId={articleId} queryKeys={[commentsQueryKey]} />
      </CardHeader>
      <CardContent>
        <ArticleCommentList>
          {status === 'pending' && <ArticleCommentListSkeleton />}
          {comments?.page.totalPages === 0 && (
            <ListEmpty message={'아직 작성된 댓글이 없습니다. 첫 댓글을 작성해보세요!'} />
          )}
          {comments?.content.map((comment) => (
            <ArticleCommentListItem
              key={comment.id}
              articleId={articleId}
              comment={comment}
              commentsQueryKey={commentsQueryKey}
              repliesQueryKey={['getArticleCommentReplies', articleId, comment.id]}
            >
              {comment.replyCount > 0 && (
                <ArticleCommentReplies
                  articleId={articleId}
                  parentId={comment.id}
                  replyCount={comment.replyCount}
                  commentsQueryKey={commentsQueryKey}
                />
              )}
            </ArticleCommentListItem>
          ))}

          {status === 'pending' && <PageSkeleton />}
          {comments && (
            <PageStateNav
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={comments.page.totalPages}
            />
          )}
        </ArticleCommentList>
      </CardContent>
    </Card>
  );
}
