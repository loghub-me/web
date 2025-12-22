'use client';

import { Field } from '@ui/field';
import { InputGroupAutoHeightTextarea } from '@ui/input-group';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface CommentContentFieldProps<T extends { content: string }> {
  id: string;
  control: Control<T>;
  isReply: boolean;
}

export default function CommentContentField<T extends { content: string }>({
  id,
  control,
  isReply,
}: CommentContentFieldProps<T>) {
  return (
    <Controller
      name={'content' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputGroupAutoHeightTextarea
            {...field}
            id={id}
            placeholder={`${isReply ? '답글' : '댓글'}을 작성해주세요!`}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}
