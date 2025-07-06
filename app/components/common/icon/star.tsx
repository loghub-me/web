import { LucideStar } from 'lucide-react';
import { cn } from '~/lib/utils';

interface StarIconProps {
  size?: number;
  fill?: boolean;
  className?: string;
}

export default function StarIcon({ size = 1, fill = false, className }: Readonly<StarIconProps>) {
  return Array.from({ length: size }, (_, index) => (
    <LucideStar key={index} className={cn('text-yellow-500', fill && 'fill-current', className)} />
  ));
}
