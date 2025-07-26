import { useQueryClient } from '@tanstack/react-query';
import { DotIcon, ReplyIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { removeArticleComment } from '~/apis/client/article';
import Timestamp from '~/components/common/timestamp';
import { Button } from '~/components/ui/button';
import { UserInline, UserMention } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { useReply } from '~/hooks/use-reply';
import { handleMessageError } from '~/lib/error';
import { cn } from '~/lib/utils';

interface ArticleCommentListItemProps {
  articleId: number;
  comment: ArticleComment;
  queryKey: (string | number)[];
  parentId?: number;
  children?: React.ReactNode;
}

export default function ArticleCommentListItem({
  articleId,
  comment,
  queryKey,
  parentId,
  children,
}: Readonly<ArticleCommentListItemProps>) {
  const { writer, content, mention, deleted } = comment;
  const { session } = useAuth();
  const { replyTo, setReplyTo, setParentId, clear } = useReply();
  const isReplying = replyTo?.id === comment.id;
  const queryClient = useQueryClient();

  function onDeleteButtonClick() {
    removeArticleComment(articleId, comment.id)
      .then(({ message }) => {
        toast.success(message);

        if (parentId) {
          queryClient.invalidateQueries({ queryKey: ['getArticleCommentReplies', articleId, parentId] });
        }
        queryClient.invalidateQueries({ queryKey });
      })
      .catch(handleMessageError);
  }

  function onReplyButtonClick() {
    if (isReplying) {
      return clear();
    }

    if (parentId) {
      setParentId(parentId);
    } else {
      setParentId(comment.id);
    }
    setReplyTo(comment);
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <UserInline {...writer} />
          <DotIcon className="text-muted-foreground" />
          <Timestamp {...comment} className="text-xs" />
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
        {children}
      </div>
    </div>
  );
}
