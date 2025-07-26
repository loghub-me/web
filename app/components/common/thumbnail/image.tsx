import { cva, type VariantProps } from 'class-variance-authority';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { cn } from '~/lib/utils';

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

function ThumbnailImage({ src, alt, type, grouped = false, className }: Readonly<ThumbnailImageProps>) {
  if (grouped) {
    return (
      <div className={cn('border rounded-lg overflow-hidden', className)}>
        <img
          src={`${import.meta.env.VITE_BUCKET_HOST}/${src}`}
          alt={alt}
          className={imageVariants({ type, grouped })}
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

function ThumbnailImageDialog({ src, alt, type, grouped = false, className }: Readonly<ThumbnailImageProps>) {
  return (
    <Dialog>
      <DialogTrigger className="group cursor-pointer">
        <ThumbnailImage src={src} alt={alt} type={type} grouped={grouped} className={className} />
      </DialogTrigger>
      <DialogContent className="p-0 border-0">
        <DialogHeader className="hidden">
          <DialogTitle>썸네일</DialogTitle>
        </DialogHeader>
        <ThumbnailImage
          src={src}
          alt={alt}
          type={type}
          grouped={grouped}
          className={cn('aspect-auto border-none', className)}
        />
      </DialogContent>
    </Dialog>
  );
}
export { ThumbnailImage, ThumbnailImageDialog };
