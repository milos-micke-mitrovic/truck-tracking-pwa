import { Badge, type BadgeProps } from '@/shared/ui';
import { RouteStatus } from '../types/route.types';

const statusConfig: Record<RouteStatus, { label: string; variant: BadgeProps['variant'] }> = {
  [RouteStatus.CREATED]: { label: 'Created', variant: 'default' },
  [RouteStatus.DISPATCHED]: { label: 'Dispatched', variant: 'info' },
  [RouteStatus.IN_TRANSIT]: { label: 'In Transit', variant: 'warning' },
  [RouteStatus.AT_PICKUP]: { label: 'At Pickup', variant: 'warning' },
  [RouteStatus.LOADED]: { label: 'Loaded', variant: 'info' },
  [RouteStatus.AT_DELIVERY]: { label: 'At Delivery', variant: 'warning' },
  [RouteStatus.DELIVERED]: { label: 'Delivered', variant: 'success' },
  [RouteStatus.COMPLETED]: { label: 'Completed', variant: 'success' },
  [RouteStatus.CANCELLED]: { label: 'Cancelled', variant: 'danger' },
};

interface RouteStatusBadgeProps {
  status: RouteStatus;
  className?: string;
}

export function RouteStatusBadge({ status, className }: RouteStatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'default' as const };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
