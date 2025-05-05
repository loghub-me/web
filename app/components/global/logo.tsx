import { Link } from 'react-router';

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 128, height = 32 }: Readonly<LogoProps>) {
  return (
    <Link to={'/'}>
      <img src="/logo.svg" className="dark:invert" alt={'logo'} width={width} height={height} />
    </Link>
  );
}
