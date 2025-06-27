import { useRef } from 'react';
import { toast } from 'sonner';
import { defaultInputFileProps, uploadImageFile } from '~/lib/image/upload';

interface ThumbnailFormControlProps {
  value: string;
  setValue: (value: string) => void;
}

export default function ThumbnailFormControl({ value, setValue }: Readonly<ThumbnailFormControlProps>) {
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
      className="group aspect-video border rounded-lg bg-secondary overflow-hidden cursor-pointer"
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
