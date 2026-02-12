import { Truck, MapPin, DollarSign } from 'lucide-react';
import { Card, Text } from '@/shared/ui';
import { RouteStatusBadge } from './RouteStatusBadge';
import type { RouteResponse } from '../types/route.types';

interface RouteDetailHeaderProps {
  route: RouteResponse;
}

export function RouteDetailHeader({ route }: RouteDetailHeaderProps) {
  const firstStop = route.stops[0];
  const lastStop = route.stops[route.stops.length - 1];

  return (
    <Card className="route-detail-header">
      <div className="route-detail-header__top">
        <RouteStatusBadge status={route.status} />
        <Text size="xs" color="tertiary">
          {route.internalIdentifier}
        </Text>
      </div>

      {firstStop && lastStop && (
        <div className="route-detail-header__route">
          <Text size="sm" weight="medium">
            {firstStop.facility.city}, {firstStop.facility.state}
          </Text>
          <Text size="sm" color="secondary">
            &rarr;
          </Text>
          <Text size="sm" weight="medium">
            {lastStop.facility.city}, {lastStop.facility.state}
          </Text>
        </div>
      )}

      <div className="route-detail-header__stats">
        <div className="route-detail-header__stat">
          <div className="route-detail-header__stat-icon">
            <Truck size={20} />
          </div>
          <Text size="lg" weight="semibold">
            {route.totalMiles}
          </Text>
          <Text size="xs" color="tertiary">
            miles
          </Text>
        </div>
        <div className="route-detail-header__stat">
          <div className="route-detail-header__stat-icon">
            <MapPin size={20} />
          </div>
          <Text size="lg" weight="semibold">
            {route.stops.length}
          </Text>
          <Text size="xs" color="tertiary">
            stops
          </Text>
        </div>
        <div className="route-detail-header__stat">
          <div className="route-detail-header__stat-icon">
            <DollarSign size={20} />
          </div>
          <Text size="lg" weight="semibold">
            ${route.driverRate.toLocaleString()}
          </Text>
          <Text size="xs" color="tertiary">
            rate
          </Text>
        </div>
      </div>
    </Card>
  );
}
