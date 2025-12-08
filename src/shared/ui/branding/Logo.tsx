import { cn } from '@/shared/utils';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LogoProps {
  size?: LogoSize;
  className?: string;
  src?: string;
  alt?: string;
}

const sizeMap: Record<LogoSize, number> = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export function Logo({
  size = 'md',
  className,
  src = '/pwa-192x192.png',
  alt = 'Truck Drive',
}: LogoProps) {
  const dimension = sizeMap[size];

  return (
    <img
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      className={cn('logo', className)}
    />
  );
}
