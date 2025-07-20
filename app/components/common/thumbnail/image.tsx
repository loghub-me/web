import { cva, type VariantProps } from 'class-variance-authority';

const imageVariants = cva('w-full bg-muted rounded-lg object-cover', {
  variants: {
    type: {
      article: 'aspect-video',
      series: 'aspect-series',
    },
    grouped: {
      true: 'group-hover:scale-110 transition-transform',
      false: 'border',
    },
  },
});

interface ThumbnailImageProps extends VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  className?: string;
}

export default function ThumbnailImage({ src, alt, type, grouped = false, className }: Readonly<ThumbnailImageProps>) {
  if (grouped) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BUCKET_HOST}/${src}`}
          alt={alt}
          className={imageVariants({ type, grouped, className })}
          loading={'lazy'}
        />
      </div>
    );
  }

  return (
    <img
      src={`${import.meta.env.VITE_BUCKET_HOST}/${src}`}
      alt={alt}
      className={imageVariants({ type, grouped, className })}
    />
  );
}
