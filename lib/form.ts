import { ErrorMessage } from '@/constants/messages';
import { FieldPath, FieldPathValue, FieldValues, UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';

export function syncEditorWithForm<
  TFieldValues extends FieldValues,
  TTitleField extends FieldPath<TFieldValues>,
  TContentField extends FieldPath<TFieldValues>,
>(
  easyMDERef: React.RefObject<{ value: () => string } | null>,
  title: string,
  setValue: UseFormSetValue<TFieldValues>,
  opts: {
    titleField: TTitleField;
    contentField: TContentField;
  }
) {
  if (!easyMDERef.current) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  const content = easyMDERef.current.value();

  if (!title) {
    const firstLine = content.split('\n')[0] || '';
    setValue(opts.titleField, firstLine.replace(/^#+\s*/, '').trim() as FieldPathValue<TFieldValues, TTitleField>);
  }

  setValue(opts.contentField, content as FieldPathValue<TFieldValues, TContentField>);
}
