import { useRef } from 'react';
import { toast } from 'sonner';
import { defaultInputFileProps, uploadImageFile } from '~/lib/image/upload';
import { cn } from '~/lib/utils';

interface ThumbnailFormControlProps {
  aspect?: 'video' | 'series';
  value: string;
  setValue: (value: string) => void;
}

export default function ThumbnailFormControl({
  aspect = 'video',
  value,
  setValue,
}: Readonly<ThumbnailFormControlProps>) {
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
    <div
      className={cn(
        'group border rounded-lg bg-secondary overflow-hidden cursor-pointer',
        aspect === 'video' ? 'aspect-video' : 'aspect-series'
      )}
      onClick={() => inputFileRef.current?.click()}
    >
      <input {...inputFileProps} />
      <img
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
        src={`${import.meta.env.VITE_BUCKET_HOST}/${value}`}
        alt={'thumbnail'}
      />
    </div>
  );
}
