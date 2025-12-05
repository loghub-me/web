'use client';

import { handleError } from '@/lib/error';
import { defaultInputFileProps, uploadImageFile } from '@/lib/image/upload';
import { Button } from '@ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { InteractiveThumbnail } from '@ui/thumbnail';
import { useRef } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

interface ThumbnailFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  setValue: (value: string) => void;
  aspect: ThumbnailAspectRatio;
  width: number;
  height: number;
  defaultValue: string;
}

export default function ThumbnailFormField<T extends FieldValues>({
  control,
  setValue,
  defaultValue,
  ...props
}: Readonly<ThumbnailFormFieldProps<T>>) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      uploadImageFile(e)
        .then(({ path }) => setValue(path))
        .catch(handleError),
  };

  return (
    <FormField
      control={control}
      name={'thumbnail' as Path<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>썸네일</FormLabel>
          <div className="cursor-pointer" onClick={() => inputFileRef.current?.click()}>
            <InteractiveThumbnail src={field.value} alt={'thumbnail'} {...props} />
          </div>
          <input {...inputFileProps} />
          <Button
            type={'button'}
            variant={'link'}
            size={'sm'}
            className="mx-auto h-auto"
            onClick={() => setValue(defaultValue)}
          >
            썸네일 초기화
          </Button>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
