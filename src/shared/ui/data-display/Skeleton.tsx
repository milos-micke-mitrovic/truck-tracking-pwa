import { cn } from '@/shared/utils';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ variant = 'text', width, height, className }: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height: height ?? (variant === 'text' ? '1em' : undefined),
  };

  return (
    <div
      className={cn(
        'skeleton',
        variant === 'text' && 'skeleton--text',
        variant === 'circular' && 'skeleton--circle',
        className
      )}
      style={style}
    />
  );
}

export interface SkeletonGroupProps {
  count?: number;
  gap?: number;
  className?: string;
}

export function SkeletonGroup({ count = 3, gap = 8, className }: SkeletonGroupProps) {
  return (
    <div className={cn('d-flex flex-column', className)} style={{ gap }}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}
