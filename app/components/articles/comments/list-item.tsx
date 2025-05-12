import { useQueryClient } from '@tanstack/react-query';
import { DotIcon, ReplyIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { deleteComment } from '~/apis/client/articles';
import ArticleCommentReplies from '~/components/articles/comments/replies';
import { Button } from '~/components/ui/button';
import { UserInline, UserMention } from '~/components/users';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { parseRelativeTime } from '~/lib/parse';
import { cn } from '~/lib/utils';

interface ArticleCommentListItemProps {
  articleId: number;
  comment: ArticleComment;
}

export default function ArticleCommentListItem({ articleId, comment }: Readonly<ArticleCommentListItemProps>) {
  const { writer, createdAt, content, replyCount, mention, deleted } = comment;
  const { session } = useAuth();
  const queryClient = useQueryClient();

  function onDeleteComment() {
    deleteComment(articleId, comment.id)
      .then(({ message }) => {
        toast.success(message);
        return queryClient.invalidateQueries({ queryKey: ['article-comments', articleId] });
      })
      .catch(handleMessageError);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <UserInline {...writer} />
          <DotIcon className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">{parseRelativeTime(createdAt)}</span>
        </div>
        {session && (
          <div>
            {session.username === writer.username && !deleted && (
              <Button variant={'ghost'} size={'icon'} className="size-6 rounded-full" onClick={onDeleteComment}>
                <XIcon className="size-3" />
              </Button>
            )}
            {!deleted && (
              <Button variant={'ghost'} size={'icon'} className="size-6 rounded-full">
                <ReplyIcon className="size-3" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="pl-7">
        <p className="leading-6">
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
