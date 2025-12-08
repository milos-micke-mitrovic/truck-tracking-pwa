import { cn } from '@/shared/utils';

export type StatusType = 'online' | 'offline' | 'away' | 'busy';

export interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

const statusLabels: Record<StatusType, string> = {
  online: 'Online',
  offline: 'Offline',
  away: 'Away',
  busy: 'Busy',
};

export function StatusIndicator({
  status,
  label,
  showLabel = true,
  className,
}: StatusIndicatorProps) {
  const displayLabel = label || statusLabels[status];

  return (
    <div className={cn('status-indicator', className)}>
      <span className={cn('status-indicator__dot', `status-indicator__dot--${status}`)} />
      {showLabel && <span className="status-indicator__label">{displayLabel}</span>}
    </div>
  );
}
