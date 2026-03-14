import { useMemo } from 'react';
import { MapPin, Truck } from 'lucide-react';
import { useIonRouter } from '@ionic/react';
import { ActionCard, Text, EmptyState } from '@/shared/ui';
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
  const router = useIonRouter();

  const handleViewRoute = () => {
    router.push(`/tabs/loads/${route.id}`, 'forward', 'push');
  };

  return (
    <ActionCard color="primary" className="active-delivery" onClick={handleViewRoute}>
      <div className="active-delivery__header">
        <div className="active-delivery__title-row">
          <Text weight="semibold">
            {route.brokerIdentifier || route.internalIdentifier || 'Load'}
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
            {route.originCity || 'Origin pending'}
            {route.destinationCity ? ` → ${route.destinationCity}` : ''}
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
    </ActionCard>
  );
}

export function ActiveDelivery() {
  const routes = useRoutesStore((state) => state.routes);

  const activeRoutes = useMemo(() => routes.filter((r) => ACTIVE_STATUSES.has(r.status)), [routes]);

  if (activeRoutes.length === 0) {
    return (
      <EmptyState
        icon={<Truck size={48} />}
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
