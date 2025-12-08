import type { ReactNode } from 'react';
import { cn } from '@/shared/utils';
import { Heading, Text } from '../typography';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('empty-state', className)}>
      {icon && <div className="empty-state__icon">{icon}</div>}
      <Heading level={3} className="empty-state__title">
        {title}
      </Heading>
      {description && (
        <Text color="secondary" className="empty-state__description">
          {description}
        </Text>
      )}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
