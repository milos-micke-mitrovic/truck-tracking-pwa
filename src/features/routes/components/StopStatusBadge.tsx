import { Badge, type BadgeProps } from '@/shared/ui';
import { StopStatus } from '../types/route.types';

const statusConfig: Record<StopStatus, { label: string; variant: BadgeProps['variant'] }> = {
  [StopStatus.PENDING]: { label: 'Pending', variant: 'default' },
  [StopStatus.EN_ROUTE]: { label: 'En Route', variant: 'info' },
  [StopStatus.ARRIVED]: { label: 'Arrived', variant: 'warning' },
  [StopStatus.LOADING]: { label: 'Loading', variant: 'warning' },
  [StopStatus.LOADED]: { label: 'Loaded', variant: 'info' },
  [StopStatus.UNLOADING]: { label: 'Unloading', variant: 'warning' },
  [StopStatus.UNLOADED]: { label: 'Unloaded', variant: 'info' },
  [StopStatus.COMPLETED]: { label: 'Completed', variant: 'success' },
  [StopStatus.SKIPPED]: { label: 'Skipped', variant: 'danger' },
};

interface StopStatusBadgeProps {
  status: StopStatus;
  className?: string;
}

export function StopStatusBadge({ status, className }: StopStatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'default' as const };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
