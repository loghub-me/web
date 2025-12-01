'use client';

import { deleteArticleComment } from '@/apis/client/article';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { PencilIcon, ReplyIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ArticleCommentActionMenuProps {
  articleId: number;
  comment: Pick<ArticleComment, 'id' | 'writer' | 'deleted'>;
  queryKeys: (string | number)[][];
  actionStatus: ArticleCommentActionStatus | null;
  setActionStatus: React.Dispatch<React.SetStateAction<ArticleCommentActionStatus | null>>;
}

export default function ArticleCommentActionMenu({
  articleId,
  comment,
  queryKeys,
  actionStatus,
  setActionStatus,
}: Readonly<ArticleCommentActionMenuProps>) {
  const { status, session } = useAuth();
  const queryClient = useQueryClient();

  function onClickReplying() {
    setActionStatus(actionStatus === 'replying' ? null : 'replying');
  }

  function onClickEditing() {
    setActionStatus(actionStatus === 'editing' ? null : 'editing');
  }

  function onClickDelete() {
    setActionStatus(null);
    deleteArticleComment(articleId, comment.id)
      .then(async ({ message }) => {
        toast.success(message);
        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
      })
      .catch(handleError);
  }

  return (
    status === 'authenticated' && (
      <div className="ml-2 flex gap-1">
        {!comment.deleted && (
          <Button
            variant={actionStatus === 'replying' ? 'secondary' : 'ghost'}
            size={'icon'}
            className="size-6 rounded-full"
            onClick={onClickReplying}
          >
            <ReplyIcon className="size-3 text-muted-foreground" />
          </Button>
        )}
        {!comment.deleted && session?.id === comment.writer.id && (
          <>
            <Button
              variant={actionStatus === 'editing' ? 'secondary' : 'ghost'}
              size={'icon'}
              className="size-6 rounded-full"
              onClick={onClickEditing}
            >
              <PencilIcon className="size-3 text-muted-foreground" />
            </Button>
            <Button variant={'ghost'} size={'icon'} className="size-6 rounded-full" onClick={onClickDelete}>
              <XIcon className="size-3 text-muted-foreground" />
            </Button>
          </>
        )}
      </div>
    )
  );
}
