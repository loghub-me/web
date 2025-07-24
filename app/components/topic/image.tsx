import { cva, type VariantProps } from 'class-variance-authority';

const imageVariants = cva('', {
  variants: {
    size: {
      default: 'size-4',
      md: 'size-6',
      lg: 'size-8',
      xl: 'size-64',
    },
  },
  defaultVariants: { size: 'default' },
});

interface TopicImageProps extends VariantProps<typeof imageVariants> {
  topic: Topic;
  className?: string;
}

export default function TopicImage({ topic, size, className }: Readonly<TopicImageProps>) {
  const { slug, name } = topic;

  return (
    <>
      <img
        src={`/icons/${slug}.svg`}
        alt={name}
        className={imageVariants({ size, className: `${className} dark:hidden` })}
      />
      {/*<img*/}
      {/*  src={`/icons/${slug}-dark.svg`}*/}
      {/*  alt={name}*/}
      {/*  className={imageVariants({ size, className: `${className} not-dark:hidden` })}*/}
      {/*/>*/}
    </>
  );
}
