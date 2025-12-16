import { handleError } from '@/lib/error';
import { contentField } from '@/schemas/fields';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { Kbd, KbdModifier } from '@ui/kbd';
import { SimpleTooltip } from '@ui/simple-tooltip';
import { SaveIcon, DeleteIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface MarkdownDraftSaveButtonProps {
  easyMDERef: React.RefObject<EasyMDE | null>;
  queryKey: readonly (string | number)[];
  exists: boolean;
  saveDraft: (draft: string) => Promise<MessageResponseBody>;
  deleteDraft: () => Promise<MessageResponseBody>;
}

export default function MarkdownDraftSaveButton({
  easyMDERef,
  queryKey,
  exists,
  saveDraft,
  deleteDraft,
}: Readonly<MarkdownDraftSaveButtonProps>) {
  const queryClient = useQueryClient();
  const [draftExists, setDraftExists] = useState(exists);

  const onSave = useCallback(() => {
    if (!easyMDERef.current) return;
    const draft = easyMDERef.current.value();

    const { success, error } = contentField.safeParse(draft);
    if (!success) {
      toast.error(error.flatten().formErrors.join(', '));
      return;
    }

    saveDraft(draft)
      .then(({ message }) => {
        toast.success(message, { icon: <SaveIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, (old) => (old ? { ...old, draft } : old));
        setDraftExists(true);
      })
      .catch(handleError);
  }, [easyMDERef, queryKey, queryClient, saveDraft]);

  const onDelete = useCallback(() => {
    if (!easyMDERef.current) return;

    deleteDraft()
      .then(({ message }) => {
        toast.success(message, { icon: <DeleteIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, (old) => (old ? { ...old, draft: undefined } : old));
        setDraftExists(false);
      })
      .catch(handleError);
  }, [easyMDERef, queryKey, queryClient, deleteDraft]);

  useEffect(() => {
    if (!easyMDERef.current) {
      return;
    }
    easyMDERef.current.codemirror.addKeyMap({
      'Ctrl-S': onSave,
      'Cmd-S': onSave,
    });
  }, [easyMDERef, onSave]);

  return (
    <SimpleTooltip
      content="임시 저장"
      render={
        <ButtonGroup>
          <Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onSave}>
            <SaveIcon />
            <Kbd>
              <KbdModifier /> S
            </Kbd>
          </Button>
          {draftExists && (
            <Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onDelete}>
              <DeleteIcon />
            </Button>
          )}
        </ButtonGroup>
      }
    />
  );
}
