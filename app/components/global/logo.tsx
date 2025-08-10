import { cn } from '~/lib/utils';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 128, height = 32, className }: Readonly<LogoProps>) {
  return <img src={'/logo.webp'} alt={'Logo'} className={cn(className)} width={width} height={height} />;
}
