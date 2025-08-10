import { cn } from '~/lib/utils';

interface SymbolProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Symbol({ width = 42, height = 42, className }: Readonly<SymbolProps>) {
  return <img src={'/symbol.webp'} alt={'Symbol'} className={cn(className)} width={width} height={height} />;
}
