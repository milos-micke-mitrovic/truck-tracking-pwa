import { useIonRouter } from '@ionic/react';
import { MapPin, ArrowRight, Truck } from 'lucide-react';
import { ActionCard, Text } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { RouteStatusBadge } from './RouteStatusBadge';
import type { RouteShortResponse } from '../types/route.types';

interface RouteCardProps {
  route: RouteShortResponse;
}

export function RouteCard({ route }: RouteCardProps) {
  const router = useIonRouter();

  const handleClick = () => {
    router.push(`/tabs/loads/${route.id}`, 'forward', 'push');
  };

  return (
    <ActionCard className="route-card" color="primary" onClick={handleClick}>
      <div className="route-card__header">
        <RouteStatusBadge status={route.status} />
        <Text size="xs" color="tertiary">
          {route.brokerIdentifier || route.internalIdentifier}
        </Text>
      </div>

      <div className="route-card__route">
        <div className="route-card__city">
          <MapPin size={14} />
          <Text size="sm" weight="medium">
            {route.originCity || 'Origin pending'}
          </Text>
        </div>
        {route.destinationCity && (
          <>
            <ArrowRight size={16} className="route-card__arrow" />
            <div className="route-card__city">
              <MapPin size={14} />
              <Text size="sm" weight="medium">
                {route.destinationCity}
              </Text>
            </div>
          </>
        )}
      </div>

      <div className="route-card__details">
        <div className="route-card__detail">
          <Truck size={14} />
          <Text size="xs" color="secondary">
            {route.totalMiles ?? '—'} mi
          </Text>
        </div>
        <Text size="xs" color="secondary">
          {route.totalStops} stops
        </Text>
        {route.ratePerMile != null && (
          <Text size="xs" color="secondary">
            ${route.ratePerMile.toFixed(2)}/mi
          </Text>
        )}
        <Text size="xs" color="tertiary">
          {route.originDate
            ? formatDate(route.originDate, 'MMM d')
            : route.bookedAt
              ? formatDate(route.bookedAt, 'MMM d')
              : null}
        </Text>
      </div>
    </ActionCard>
  );
}
