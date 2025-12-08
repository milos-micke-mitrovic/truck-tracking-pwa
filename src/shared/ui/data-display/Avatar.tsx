import type { ReactNode } from 'react';
import { cn } from '@/shared/utils';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt = '', fallback, size = 'md', className }: AvatarProps) {
  const sizeClass = `avatar--${size}`;

  return (
    <div className={cn('avatar', sizeClass, className)}>
      {src ? (
        <img src={src} alt={alt} className="avatar__image" />
      ) : (
        fallback || alt.charAt(0).toUpperCase() || '?'
      )}
    </div>
  );
}
