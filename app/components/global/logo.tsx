import { cn } from '~/lib/utils';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 128, height = 32, className }: Readonly<LogoProps>) {
  return <img src={'/logo.svg'} alt={'Logo'} className={cn('dark:invert', className)} width={width} height={height} />;
}
