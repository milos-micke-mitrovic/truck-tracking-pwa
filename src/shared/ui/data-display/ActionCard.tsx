import type { KeyboardEvent, ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn, hapticLight } from '@/shared/utils';

export type ActionCardColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface ActionCardProps {
  children: ReactNode;
  onClick: () => void;
  color?: ActionCardColor;
  className?: string;
  'aria-label'?: string;
}

export function ActionCard({
  children,
  onClick,
  color = 'primary',
  className,
  'aria-label': ariaLabel,
}: ActionCardProps) {
  const handleClick = () => {
    hapticLight();
    onClick();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={cn('action-card', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <div className="action-card__body">{children}</div>
      <div className={cn('action-card__indicator', `action-card__indicator--${color}`)}>
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
