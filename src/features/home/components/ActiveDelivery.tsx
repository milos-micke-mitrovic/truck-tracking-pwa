import { useMemo } from 'react';
import { MapPin, Navigation, Truck } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Card, Text, Button, EmptyState } from '@/shared/ui';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { RouteStatusBadge } from '@/features/routes/components/RouteStatusBadge';
import { RouteStatus, StopType, StopStatus } from '@/features/routes/types/route.types';

const ACTIVE_STATUSES = new Set([
  RouteStatus.IN_TRANSIT,
  RouteStatus.AT_PICKUP,
  RouteStatus.LOADED,
  RouteStatus.AT_DELIVERY,
  RouteStatus.DISPATCHED,
]);

export function ActiveDelivery() {
  const history = useHistory();
  const routes = useRoutesStore((state) => state.routes);

  const activeRoute = useMemo(() => routes.find((r) => ACTIVE_STATUSES.has(r.status)), [routes]);

  const activeRouteDetail = useRoutesStore((state) => state.activeRoute);

  const nextStop = useMemo(() => {
    if (!activeRouteDetail) return null;
    return activeRouteDetail.stops.find(
      (s) => s.status !== StopStatus.COMPLETED && s.status !== StopStatus.SKIPPED
    );
  }, [activeRouteDetail]);

  if (!activeRoute) {
    return (
      <EmptyState
        title="No active load"
        description="You have no loads in progress. Check the Loads tab for upcoming loads."
      />
    );
  }

  const handleNavigate = () => {
    if (nextStop?.facility.latitude && nextStop?.facility.longitude) {
      history.push('/tabs/map', {
        destination: {
          lat: nextStop.facility.latitude,
          lng: nextStop.facility.longitude,
          address: `${nextStop.facility.address}, ${nextStop.facility.city}, ${nextStop.facility.state}`,
          customer: nextStop.facility.name,
        },
        navigationTimestamp: Date.now(),
      });
    }
  };

  const handleViewRoute = () => {
    history.push(`/tabs/loads/${activeRoute.id}`);
  };

  return (
    <Card accent="warning" className="active-delivery" onClick={handleViewRoute}>
      <div className="active-delivery__header">
        <div className="active-delivery__title-row">
          <Text weight="semibold">Active Load</Text>
          <RouteStatusBadge status={activeRoute.status} />
        </div>
        <Text size="xs" color="tertiary">
          {activeRoute.internalIdentifier}
        </Text>
      </div>

      <div className="active-delivery__destination">
        <div className="active-delivery__icon">
          <MapPin size={20} />
        </div>
        <div className="active-delivery__address">
          <Text size="sm" weight="medium">
            {activeRoute.originCity}, {activeRoute.originState} &rarr; {activeRoute.destinationCity}
            , {activeRoute.destinationState}
          </Text>
          {nextStop && (
            <Text size="xs" color="secondary">
              Next: {nextStop.type === StopType.PICKUP ? 'Pickup' : 'Delivery'} at{' '}
              {nextStop.facility.name}
            </Text>
          )}
        </div>
      </div>

      <div className="active-delivery__stats">
        <div className="active-delivery__stat">
          <Truck size={16} className="active-delivery__stat-icon" />
          <Text size="sm">
            <Text as="span" weight="semibold">
              {activeRoute.totalMiles}
            </Text>{' '}
            miles
          </Text>
        </div>
        <div className="active-delivery__stat">
          <Text size="sm">
            <Text as="span" weight="semibold">
              {activeRoute.totalStops}
            </Text>{' '}
            stops
          </Text>
        </div>
      </div>

      {nextStop?.facility.latitude && nextStop?.facility.longitude && (
        <Button
          variant="solid"
          fullWidth
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleNavigate();
          }}
          className="active-delivery__action"
        >
          <Navigation size={18} />
          Navigate to {nextStop.type === StopType.PICKUP ? 'Pickup' : 'Delivery'}
        </Button>
      )}
    </Card>
  );
}
