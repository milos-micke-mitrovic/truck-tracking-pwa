import { useMemo } from 'react';
import { Calendar, FileText, Fuel, AlertCircle } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Text } from '@/shared/ui';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { RouteStatus } from '@/features/routes/types/route.types';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number;
}

const ACTIVE_STATUSES = new Set([
  RouteStatus.BOOKED,
  RouteStatus.DISPATCHED,
  RouteStatus.IN_TRANSIT,
  RouteStatus.AT_PICKUP,
  RouteStatus.LOADED,
  RouteStatus.AT_DELIVERY,
]);

export function QuickActions() {
  const history = useHistory();
  const routes = useRoutesStore((state) => state.routes);

  const activeCount = useMemo(
    () => routes.filter((r) => ACTIVE_STATUSES.has(r.status)).length,
    [routes]
  );

  const actions: QuickAction[] = [
    {
      icon: <Calendar size={24} />,
      label: 'Schedule',
      badge: activeCount || undefined,
      onClick: () => history.push('/tabs/loads'),
    },
    {
      icon: <FileText size={24} />,
      label: 'Documents',
    },
    {
      icon: <Fuel size={24} />,
      label: 'Fuel Log',
    },
    {
      icon: <AlertCircle size={24} />,
      label: 'Report Issue',
    },
  ];

  return (
    <div className="quick-actions">
      <Text size="sm" weight="medium" color="secondary" className="quick-actions__title">
        Quick Actions
      </Text>
      <div className="quick-actions__grid">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="quick-actions__item"
            onClick={action.onClick}
          >
            <div className="quick-actions__icon-wrapper">
              {action.icon}
              {action.badge && <span className="quick-actions__badge">{action.badge}</span>}
            </div>
            <Text size="xs" className="quick-actions__label">
              {action.label}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
}
