'use client';

import { deleteArticleComment } from '@/apis/client/article';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { SimpleTooltip } from '@ui/simple-tooltip';
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
          <SimpleTooltip
            content="답글 달기"
            render={
              <Button
                type={'button'}
                variant={actionStatus === 'replying' ? 'secondary' : 'ghost'}
                size={'icon-xs'}
                onClick={onClickReplying}
              />
            }
          >
            <ReplyIcon className={cn(actionStatus === 'replying' ? 'text-foreground' : 'text-muted-foreground')} />
          </SimpleTooltip>
        )}
        {!comment.deleted && session?.id === comment.writer.id && (
          <>
            <SimpleTooltip
              content="댓글 수정"
              render={
                <Button
                  type={'button'}
                  variant={actionStatus === 'editing' ? 'secondary' : 'ghost'}
                  size={'icon-xs'}
                  onClick={onClickEditing}
                />
              }
            >
              <PencilIcon className={cn(actionStatus === 'editing' ? 'text-foreground' : 'text-muted-foreground')} />
            </SimpleTooltip>
            {actionStatus === null && (
              <SimpleTooltip
                content="댓글 삭제"
                render={<Button type={'button'} variant={'ghost'} size={'icon-xs'} onClick={onClickDelete} />}
              >
                <DeleteIcon className="text-muted-foreground" />
              </SimpleTooltip>
            )}
          </>
        )}
      </div>
    )
  );
}
