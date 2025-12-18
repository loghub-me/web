'use client';

import { deleteArticleComment } from '@/apis/client/article';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { DeleteIcon, PencilIcon, ReplyIcon } from 'lucide-react';
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

  async function onClickDelete() {
    setActionStatus(null);
    try {
      const { message } = await deleteArticleComment(articleId, comment.id);
      toast.success(message);

      await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
    } catch (err) {
      handleError(err);
    }
  }

  return (
    status === 'authenticated' && (
      <div className="ml-2 flex gap-1">
        {!comment.deleted && (
          <Button
            type={'button'}
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
              type={'button'}
              variant={actionStatus === 'editing' ? 'secondary' : 'ghost'}
              size={'icon'}
              className="size-6 rounded-full"
              onClick={onClickEditing}
            >
              <PencilIcon className="size-3 text-muted-foreground" />
            </Button>
            {actionStatus === null && (
              <Button
                type={'button'}
                className="size-6 rounded-full"
                variant={'ghost'}
                size={'icon'}
                onClick={onClickDelete}
              >
                <DeleteIcon className="size-3 text-muted-foreground" />
              </Button>
            )}
          </>
        )}
      </div>
    )
  );
}
