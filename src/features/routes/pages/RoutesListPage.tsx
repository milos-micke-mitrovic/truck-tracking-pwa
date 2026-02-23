import { useState, useMemo } from 'react';
import { PageLayout } from '@/shared/components';
import { SkeletonGroup, EmptyState } from '@/shared/ui';
import { RouteCard } from '../components/RouteCard';
import { RoutesFilter, type RouteFilterTab } from '../components/RoutesFilter';
import { useRoutes } from '../hooks/use-routes';
import { RouteStatus } from '../types/route.types';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';

const ACTIVE_STATUSES = new Set([
  RouteStatus.BOOKED,
  RouteStatus.DISPATCHED,
  RouteStatus.IN_TRANSIT,
  RouteStatus.AT_PICKUP,
  RouteStatus.LOADED,
  RouteStatus.AT_DELIVERY,
]);

export function RoutesListPage() {
  const [filter, setFilter] = useState<RouteFilterTab>('active');
  const { routes, isLoading, refresh } = useRoutes();

  const filteredRoutes = useMemo(() => {
    if (filter === 'active') {
      return routes.filter((r) => ACTIVE_STATUSES.has(r.status));
    }
    return routes.filter(
      (r) =>
        r.status === RouteStatus.DELIVERED ||
        r.status === RouteStatus.COMPLETED ||
        r.status === RouteStatus.INVOICED ||
        r.status === RouteStatus.PAID ||
        r.status === RouteStatus.CANCELLED
    );
  }, [routes, filter]);

  return (
    <PageLayout title="My Loads" headerRightContent={<NotificationBell />} onRefresh={refresh}>
      <div className="routes-list-page">
        <RoutesFilter value={filter} onChange={setFilter} />

        {isLoading && !routes.length ? (
          <SkeletonGroup count={3} />
        ) : filteredRoutes.length === 0 ? (
          <EmptyState
            title={filter === 'active' ? 'No active loads' : 'No completed loads'}
            description={
              filter === 'active'
                ? 'You have no active loads right now. New loads will appear here when dispatched.'
                : 'Your completed loads will appear here.'
            }
          />
        ) : (
          <div className="routes-list-page__list">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
