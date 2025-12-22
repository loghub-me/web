'use client';

import { handleError } from '@/lib/error';
import { defaultInputFileProps, uploadImageFile } from '@/lib/image/upload';
import { Button } from '@ui/button';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InteractiveThumbnail } from '@ui/thumbnail';
import { useRef } from 'react';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface ThumbnailFieldProps<T extends { thumbnail: string }> {
  id: string;
  control: Control<T>;
  aspect: ThumbnailAspectRatio;
  width: number;
  height: number;
  defaultValue: string;
}

export default function ThumbnailField<T extends { thumbnail: string }>({
  id,
  control,
  defaultValue,
  ...props
}: ThumbnailFieldProps<T>) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
  };

  return (
    <Controller
      name={'thumbnail' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-auto">
          <FieldLabel htmlFor={id}>썸네일</FieldLabel>
          <div className="cursor-pointer" onClick={() => inputFileRef.current?.click()}>
            <InteractiveThumbnail src={field.value} alt={'thumbnail'} {...props} />
          </div>
          <input
            {...inputFileProps}
            onChange={(e) =>
              uploadImageFile(e)
                .then(({ path }) => field.onChange(path))
                .catch(handleError)
            }
          />
          <Button
            type={'button'}
            variant={'link'}
            size={'sm'}
            className="mx-auto h-auto"
            onClick={() => field.onChange(defaultValue)}
          >
            썸네일 초기화
          </Button>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
