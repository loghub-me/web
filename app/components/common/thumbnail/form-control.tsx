import { cva, type VariantProps } from 'class-variance-authority';
import { useRef } from 'react';
import { toast } from 'sonner';
import { defaultInputFileProps, uploadImageFile } from '~/lib/image/upload';

const formControlVariants = cva('group border rounded-lg bg-secondary overflow-hidden cursor-pointer', {
  variants: {
    type: {
      article: 'aspect-video',
      series: 'aspect-series',
    },
  },
});

interface ThumbnailFormControlProps extends VariantProps<typeof formControlVariants> {
  value: string;
  setValue: (value: string) => void;
}

function ThumbnailFormControl({ type, value, setValue }: Readonly<ThumbnailFormControlProps>) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      uploadImageFile(e)
        .then(({ path }) => setValue(path))
        .catch((err) => toast.error(err.message)),
  };

  return (
    <div className={formControlVariants({ type })} onClick={() => inputFileRef.current?.click()}>
      <input {...inputFileProps} />
      <img
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
        src={`${import.meta.env.VITE_BUCKET_HOST}/${value}`}
        alt={'thumbnail'}
      />
    </div>
  );
}

export { ThumbnailFormControl };
