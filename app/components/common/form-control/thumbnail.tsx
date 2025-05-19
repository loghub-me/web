interface ThumbnailFormControlProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
}

export default function ThumbnailFormControl({ inputRef, value }: Readonly<ThumbnailFormControlProps>) {
  return (
    <div
      className="group aspect-video border rounded-lg bg-secondary overflow-hidden cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <img
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
        src={`${import.meta.env.VITE_BUCKET_HOST}/${value}`}
        alt={'thumbnail'}
      />
    </div>
  );
}
