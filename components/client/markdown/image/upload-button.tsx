import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { defaultInputFileProps, uploadImageFile } from '@/lib/image/upload';
import { buildAssetsUrl } from '@/lib/utils';
import { Button } from '@ui/button';
import { Kbd, KbdModifier } from '@ui/kbd';
import { SimpleTooltip } from '@ui/simple-tooltip';
import type EasyMDE from 'easymde';
import { ImageUpIcon } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface MarkdownImageUploadButtonProps {
  easyMDERef: React.RefObject<EasyMDE | null>;
}

export default function MarkdownImageUploadButton({ easyMDERef }: Readonly<MarkdownImageUploadButtonProps>) {
  const { status: authStatus } = useAuth();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onClickImageUpload = useCallback(() => {
    if (authStatus !== 'authenticated') {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }
    if (!inputFileRef.current) {
      toast.error(ErrorMessage.UNKNOWN);
      return;
    }
    inputFileRef.current.click();
  }, [authStatus]);

  const uploadImageFileAndUpdateDocument = useCallback(
    (codemirror: CodeMirror.Editor, e: React.ChangeEvent<HTMLInputElement>) => {
      const [doc, cursor] = [codemirror.getDoc(), codemirror.getCursor()];

      uploadImageFile(e)
        .then(({ filename, path }) => {
          const newLine = `![${filename}](${buildAssetsUrl(path)})`;
          doc.replaceRange(newLine, cursor);
        })
        .catch(handleError);
    },
    []
  );

  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (authStatus !== 'authenticated') {
        toast.error(ErrorMessage.LOGIN_REQUIRED);
        return;
      }
      if (!easyMDERef.current) {
        toast.error(ErrorMessage.UNKNOWN);
        return;
      }
      const { codemirror } = easyMDERef.current;
      uploadImageFileAndUpdateDocument(codemirror, e);
    },
  };

  useEffect(() => {
    if (!easyMDERef.current) {
      return;
    }
    easyMDERef.current.codemirror.addKeyMap({
      'Ctrl-I': onClickImageUpload,
      'Cmd-I': onClickImageUpload,
    });
  }, [easyMDERef, onClickImageUpload]);

  return (
    <>
      <input {...inputFileProps} />
      <SimpleTooltip
        content="이미지 업로드"
        render={<Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onClickImageUpload} />}
      >
        <ImageUpIcon />
        <Kbd>
          <KbdModifier /> I
        </Kbd>
      </SimpleTooltip>
    </>
  );
}
