import { cn } from '~/lib/utils';

interface OrbitingIconProps {
  radius: number; // 원궤도 반지름(px)
  angle?: number; // 시작 각도(도)
  duration?: number; // 한 바퀴 시간(초)
  reverse?: boolean; // true → 반시계 방향
  children: React.ReactNode; // SVG 아이콘(필수)
}

export function OrbitingIcon({
  radius,
  angle = 0,
  duration = 10,
  reverse = false,
  children,
}: Readonly<OrbitingIconProps>) {
  return (
    <div
      style={
        {
          '--radius': `${radius}px`,
          '--angle': angle,
          '--duration': duration,
        } as React.CSSProperties
      }
      className={cn(
        'absolute flex items-center justify-center rounded-full',
        'size-[40px] transform-gpu',
        reverse ? 'animate-orbit-reverse' : 'animate-orbit'
      )}
    >
      <div className="size-12 group-hover:animate-swing group-hover:repeat-infinite">{children}</div>
    </div>
  );
}

interface OrbitCanvasProps {
  radius: number[];
  children: React.ReactNode; // 필요시 추가
}

export function OrbitCanvas({ radius, children }: Readonly<OrbitCanvasProps>) {
  return (
    <div className="group relative h-[28rem] overflow-hidden">
      <div className="relative flex h-[1200px] w-full flex-col items-center justify-center overflow-hidden">
        {radius.map((r) => (
          <svg key={r} xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute inset-0 size-full">
            <circle cx="50%" cy="50%" r={r} fill="none" className="stroke-black/10 stroke-[1px] dark:stroke-white/10" />
          </svg>
        ))}
        {children}
      </div>
      <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
