import { Truck, MapPin, DollarSign, Clock } from 'lucide-react';
import { Badge, Card, Text } from '@/shared/ui';
import { RouteStatusBadge } from './RouteStatusBadge';
import type { RouteResponse } from '../types/route.types';

const formatRouteType = (type: string): string =>
  type
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');

interface RouteDetailHeaderProps {
  route: RouteResponse;
}

export function RouteDetailHeader({ route }: RouteDetailHeaderProps) {
  const firstStop = route.stops[0];
  const lastStop = route.stops[route.stops.length - 1];

  const formatLocation = (facility: typeof firstStop.facility) => {
    const parts = [facility?.city, facility?.state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : null;
  };

  const originLabel = firstStop ? formatLocation(firstStop.facility) : null;
  const destLabel = lastStop ? formatLocation(lastStop.facility) : null;

  return (
    <Card className="route-detail-header">
      <div className="route-detail-header__top">
        <RouteStatusBadge status={route.status} />
        {route.autoDispatched && <Badge variant="info">Auto</Badge>}
        <Text size="xs" color="tertiary">
          {route.internalIdentifier}
          {route.routeType && ` · ${formatRouteType(route.routeType)}`}
        </Text>
      </div>

      {originLabel && (
        <div className="route-detail-header__route">
          <Text size="sm" weight="medium">
            {originLabel}
          </Text>
          {destLabel && (
            <>
              <Text size="sm" color="secondary">
                &rarr;
              </Text>
              <Text size="sm" weight="medium">
                {destLabel}
              </Text>
            </>
          )}
        </div>
      )}

      <div className="route-detail-header__stats">
        <div className="route-detail-header__stat">
          <div className="route-detail-header__stat-icon">
            <Truck size={20} />
          </div>
          <Text size="lg" weight="semibold">
            {route.totalMiles ?? '—'}
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
            {route.driverRate != null ? `$${route.driverRate.toLocaleString()}` : 'N/A'}
          </Text>
          <Text size="xs" color="tertiary">
            rate
          </Text>
        </div>
        {route.estimatedDuration && (
          <div className="route-detail-header__stat">
            <div className="route-detail-header__stat-icon">
              <Clock size={20} />
            </div>
            <Text size="lg" weight="semibold">
              {route.estimatedDuration}
            </Text>
            <Text size="xs" color="tertiary">
              duration
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
}
