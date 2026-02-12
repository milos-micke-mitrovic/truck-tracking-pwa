import { useMemo } from 'react';
import { Package, Route, CheckCircle, Truck } from 'lucide-react';
import { Text } from '@/shared/ui';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { RouteStatus } from '@/features/routes/types/route.types';

const ACTIVE_STATUSES = new Set([
  RouteStatus.DISPATCHED,
  RouteStatus.IN_TRANSIT,
  RouteStatus.AT_PICKUP,
  RouteStatus.LOADED,
  RouteStatus.AT_DELIVERY,
  RouteStatus.DELIVERED,
]);

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function QuickStats() {
  const routes = useRoutesStore((state) => state.routes);

  const stats = useMemo<StatItem[]>(() => {
    const activeCount = routes.filter((r) => ACTIVE_STATUSES.has(r.status)).length;
    const completedCount = routes.filter((r) => r.status === RouteStatus.COMPLETED).length;
    const totalMiles = routes.reduce((sum, r) => sum + r.totalMiles, 0);
    const totalLoads = routes.length;

    return [
      { icon: <Package size={20} />, label: 'Active', value: String(activeCount) },
      { icon: <Truck size={20} />, label: 'Miles', value: totalMiles.toLocaleString() },
      { icon: <CheckCircle size={20} />, label: 'Completed', value: String(completedCount) },
      { icon: <Route size={20} />, label: 'Total', value: String(totalLoads) },
    ];
  }, [routes]);

  return (
    <div className="quick-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="quick-stats__item">
          <div className="quick-stats__icon">{stat.icon}</div>
          <div className="quick-stats__info">
            <Text size="lg" weight="semibold" className="quick-stats__value">
              {stat.value}
            </Text>
            <Text size="xs" color="tertiary" className="quick-stats__label">
              {stat.label}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
