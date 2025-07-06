interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 128, height = 32 }: Readonly<LogoProps>) {
  return <img src={'/logo.svg'} alt={'Logo'} className={'dark:invert'} width={width} height={height} />;
}
