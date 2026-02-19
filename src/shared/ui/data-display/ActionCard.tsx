import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils';

export type ActionCardColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface ActionCardProps {
  children: ReactNode;
  onClick: () => void;
  color?: ActionCardColor;
  className?: string;
}

export function ActionCard({ children, onClick, color = 'primary', className }: ActionCardProps) {
  return (
    <div className={cn('action-card', className)} onClick={onClick}>
      <div className="action-card__body">{children}</div>
      <div className={cn('action-card__indicator', `action-card__indicator--${color}`)}>
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
