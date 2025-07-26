import { cva, type VariantProps } from 'class-variance-authority';
import { useResolvedTheme } from '~/actions/theme/utils';

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
  const resolvedTheme = useResolvedTheme();
  const src = `/icons/${slug}${resolvedTheme === 'dark' ? '-dark' : ''}.svg`;

  return <img src={src} alt={name} className={imageVariants({ size, className })} />;
}
