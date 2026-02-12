import { useHistory } from 'react-router-dom';
import { MapPin, ArrowRight, Truck } from 'lucide-react';
import { Card, Text } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { RouteStatusBadge } from './RouteStatusBadge';
import type { RouteShortResponse } from '../types/route.types';

interface RouteCardProps {
  route: RouteShortResponse;
}

export function RouteCard({ route }: RouteCardProps) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tabs/loads/${route.id}`);
  };

  return (
    <Card className="route-card" onClick={handleClick}>
      <div className="route-card__header">
        <RouteStatusBadge status={route.status} />
        <Text size="xs" color="tertiary">
          {route.internalIdentifier}
        </Text>
      </div>

      <div className="route-card__route">
        <div className="route-card__city">
          <MapPin size={14} />
          <Text size="sm" weight="medium">
            {route.originCity}, {route.originState}
          </Text>
        </div>
        <ArrowRight size={16} className="route-card__arrow" />
        <div className="route-card__city">
          <MapPin size={14} />
          <Text size="sm" weight="medium">
            {route.destinationCity}, {route.destinationState}
          </Text>
        </div>
      </div>

      <div className="route-card__details">
        <div className="route-card__detail">
          <Truck size={14} />
          <Text size="xs" color="secondary">
            {route.totalMiles} mi
          </Text>
        </div>
        <Text size="xs" color="secondary">
          {route.totalStops} stops
        </Text>
        <Text size="xs" color="secondary">
          ${route.ratePerMile.toFixed(2)}/mi
        </Text>
        <Text size="xs" color="tertiary">
          {formatDate(route.originDate, 'MMM d')}
        </Text>
      </div>
    </Card>
  );
}
