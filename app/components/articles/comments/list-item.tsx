import { useQueryClient } from '@tanstack/react-query';
import { DotIcon, ReplyIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { removeArticleComment } from '~/apis/client/articles';
import ArticleCommentReplies from '~/components/articles/comments/replies';
import { Button } from '~/components/ui/button';
import { UserInline, UserMention } from '~/components/users';
import { useAuth } from '~/hooks/use-auth';
import { useReply } from '~/hooks/use-reply';
import { handleMessageError } from '~/lib/error';
import { parseRelativeTime } from '~/lib/parse';
import { cn } from '~/lib/utils';

interface ArticleCommentListItemProps {
  parentId?: number;
  articleId: number;
  comment: ArticleComment;
}

export default function ArticleCommentListItem({
  parentId,
  articleId,
  comment,
}: Readonly<ArticleCommentListItemProps>) {
  const { id, writer, createdAt, content, replyCount, mention, deleted } = comment;
  const { session } = useAuth();
  const { replyTo, setReplyTo, setParentId, clear } = useReply();
  const isReplying = replyTo?.id === id;
  const queryClient = useQueryClient();

  function onDeleteButtonClick() {
    removeArticleComment(articleId, comment.id)
      .then(({ message }) => {
        toast.success(message);
        return queryClient.invalidateQueries({ queryKey: ['article-comments', articleId] });
      })
      .catch(handleMessageError);
  }

  function onReplyButtonClick() {
    if (isReplying) {
      return clear();
    }
    setParentId(parentId);
    setReplyTo(comment);
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <UserInline username={writer.username} />
          <DotIcon className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">{parseRelativeTime(createdAt)}</span>
        </div>
        {session && (
          <div className="flex gap-1">
            {session.username === writer.username && !deleted && (
              <Button variant={'ghost'} size={'icon'} className="size-6 rounded-full" onClick={onDeleteButtonClick}>
                <XIcon className="size-3" />
              </Button>
            )}
            {!deleted && (
              <Button
                variant={isReplying ? 'secondary' : 'ghost'}
                size={'icon'}
                className="size-6 rounded-full"
                onClick={onReplyButtonClick}
              >
                <ReplyIcon className="size-3" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="pl-7.5">
        <p className="leading-6 text-sm">
          {mention && <UserMention {...mention} />}
          <span className={cn(deleted && 'text-muted-foreground')}>{content}</span>
        </p>
        {replyCount > 0 && (
          <ArticleCommentReplies articleId={articleId} commentId={comment.id} replyCount={replyCount} />
        )}
      </div>
    </div>
  );
}
