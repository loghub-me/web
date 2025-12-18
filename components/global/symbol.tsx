import Image from 'next/image';

interface SymbolProps {
  size: number;
  className?: string;
}

export default function Symbol({ size, className }: Readonly<SymbolProps>) {
  return <Image src={'/symbol.svg'} alt={'Symbol'} width={size} height={size} className={className} />;
}
