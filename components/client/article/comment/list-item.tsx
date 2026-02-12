import { ArticleCommentActionMenu, ArticleCommentEditForm } from '@/components/client/article';
import ArticleCommentForm from '@/components/client/article/comment/form';
import { UserLink, UserMention } from '@/components/client/user';
import { cn } from '@/lib/utils';
import { RelativeTimestamp } from '@ui/timestamp';
import { DotIcon } from 'lucide-react';
import { useState } from 'react';

interface ArticleCommentListItemProps {
  articleId: number;
  comment: ArticleComment;
  commentsQueryKey: (string | number)[];
  repliesQueryKey: (string | number)[];
  children?: React.ReactNode;
}

export default function ArticleCommentListItem({
  articleId,
  comment,
  commentsQueryKey,
  repliesQueryKey,
  children: repliesChildren,
}: Readonly<ArticleCommentListItemProps>) {
  const { writer, content, mention, deleted } = comment;
  const [actionStatus, setActionStatus] = useState<ArticleCommentActionStatus | null>(null);

  return (
    <div>
      <div className="flex items-center">
        <UserLink {...writer} />
        <DotIcon className="text-muted-foreground -ml-1" />
        <RelativeTimestamp {...comment} />
        <ArticleCommentActionMenu
          articleId={articleId}
          comment={comment}
          queryKeys={[commentsQueryKey, repliesQueryKey]}
          actionStatus={actionStatus}
          setActionStatus={setActionStatus}
        />
      </div>
      <div className="pl-7.5 space-y-1">
        {actionStatus === 'editing' ? (
          <ArticleCommentEditForm
            articleId={articleId}
            comment={comment}
            queryKeys={[commentsQueryKey, repliesQueryKey]}
            closeForm={() => setActionStatus(null)}
          />
        ) : (
          <p className="leading-6 text-sm whitespace-pre-wrap">
            {mention && <UserMention {...mention} />}
            <span className={cn(deleted && 'text-muted-foreground')}>{content}</span>
          </p>
        )}
        {actionStatus === 'replying' && (
          <ArticleCommentForm
            articleId={articleId}
            parent={comment}
            queryKeys={[commentsQueryKey, repliesQueryKey]}
            closeForm={() => setActionStatus(null)}
          />
        )}
        {repliesChildren}
      </div>
    </div>
  );
}
