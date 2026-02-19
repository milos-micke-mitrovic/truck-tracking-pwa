import { useMemo } from 'react';
import { MapPin, Truck } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Card, Text, EmptyState } from '@/shared/ui';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { RouteStatusBadge } from '@/features/routes/components/RouteStatusBadge';
import { RouteStatus } from '@/features/routes/types/route.types';
import type { RouteShortResponse } from '@/features/routes/types/route.types';

const ACTIVE_STATUSES = new Set([
  RouteStatus.BOOKED,
  RouteStatus.IN_TRANSIT,
  RouteStatus.AT_PICKUP,
  RouteStatus.LOADED,
  RouteStatus.AT_DELIVERY,
  RouteStatus.DISPATCHED,
]);

function ActiveDeliveryCard({ route }: { route: RouteShortResponse }) {
  const history = useHistory();

  const handleViewRoute = () => {
    history.push(`/tabs/loads/${route.id}`);
  };

  return (
    <Card accent="warning" className="active-delivery" onClick={handleViewRoute}>
      <div className="active-delivery__header">
        <div className="active-delivery__title-row">
          <Text weight="semibold">
            {route.brokerIdentifier ?? route.internalIdentifier ?? 'Load'}
          </Text>
          <RouteStatusBadge status={route.status} />
        </div>
      </div>

      <div className="active-delivery__destination">
        <div className="active-delivery__icon">
          <MapPin size={20} />
        </div>
        <div className="active-delivery__address">
          <Text size="sm" weight="medium">
            {route.originCity ?? '—'} &rarr; {route.destinationCity ?? '—'}
          </Text>
        </div>
      </div>

      <div className="active-delivery__stats">
        <div className="active-delivery__stat">
          <Truck size={16} className="active-delivery__stat-icon" />
          <Text size="sm">
            <Text as="span" weight="semibold">
              {route.totalMiles ?? '—'}
            </Text>{' '}
            miles
          </Text>
        </div>
        <div className="active-delivery__stat">
          <Text size="sm">
            <Text as="span" weight="semibold">
              {route.totalStops}
            </Text>{' '}
            stops
          </Text>
        </div>
      </div>
    </Card>
  );
}

export function ActiveDelivery() {
  const routes = useRoutesStore((state) => state.routes);

  const activeRoutes = useMemo(() => routes.filter((r) => ACTIVE_STATUSES.has(r.status)), [routes]);

  if (activeRoutes.length === 0) {
    return (
      <EmptyState
        title="No active loads"
        description="You have no loads in progress. Check the Loads tab for upcoming loads."
      />
    );
  }

  return (
    <div className="active-delivery-list">
      {activeRoutes.map((route) => (
        <ActiveDeliveryCard key={route.id} route={route} />
      ))}
    </div>
  );
}
