import { useHistory } from 'react-router-dom';
import { MapPin, Clock, Navigation, Package, Truck } from 'lucide-react';
import { Text, Button, ActionCard } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { StopStatusBadge } from './StopStatusBadge';
import { StopType, StopStatus } from '../types/route.types';
import type { RouteStopResponse } from '../types/route.types';

interface StopTimelineItemProps {
  stop: RouteStopResponse;
  routeId: number;
}

export function StopTimelineItem({ stop, routeId }: StopTimelineItemProps) {
  const history = useHistory();
  const isPickup = stop.type === StopType.PICKUP;
  const isCompleted = stop.status === StopStatus.COMPLETED;

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stop.facility?.latitude && stop.facility?.longitude) {
      history.push('/tabs/map', {
        destination: {
          lat: stop.facility.latitude,
          lng: stop.facility.longitude,
          address: [stop.facility.address, stop.facility.city, stop.facility.state]
            .filter(Boolean)
            .join(', '),
          customer: stop.facility.name,
        },
        navigationTimestamp: Date.now(),
      });
    }
  };

  const handleTap = () => {
    history.push(`/tabs/loads/${routeId}/stops/${stop.id}`);
  };

  return (
    <div className={`stop-timeline-item ${isCompleted ? 'stop-timeline-item--completed' : ''}`}>
      <div className="stop-timeline-item__indicator">
        <div
          className={`stop-timeline-item__dot stop-timeline-item__dot--${isPickup ? 'pickup' : 'delivery'}`}
        >
          {isPickup ? <Package size={12} /> : <Truck size={12} />}
        </div>
      </div>

      <ActionCard
        color={isPickup ? 'warning' : 'primary'}
        className="stop-timeline-item__content"
        onClick={handleTap}
      >
        <div className="stop-timeline-item__header">
          <div>
            <Text size="xs" color="tertiary" weight="medium">
              {isPickup ? 'PICKUP' : 'DELIVERY'} #{stop.stopOrder + 1}
            </Text>
            <Text size="sm" weight="semibold">
              {stop.facility?.name ?? 'Unknown Facility'}
            </Text>
          </div>
          <StopStatusBadge status={stop.status} />
        </div>

        {(stop.facility?.city || stop.facility?.state) && (
          <div className="stop-timeline-item__location">
            <MapPin size={14} />
            <Text size="xs" color="secondary">
              {[stop.facility.city, stop.facility.state].filter(Boolean).join(', ')}
            </Text>
          </div>
        )}

        {(stop.arrivalStartDate || stop.arrivalEndDate) && (
          <div className="stop-timeline-item__appointment">
            <Clock size={14} />
            <Text size="xs" color="secondary">
              {stop.arrivalStartDate && formatDate(stop.arrivalStartDate, 'MMM d, h:mm a')}
              {stop.arrivalEndDate && ` - ${formatDate(stop.arrivalEndDate, 'h:mm a')}`}
            </Text>
          </div>
        )}

        {!isCompleted && stop.facility?.latitude && stop.facility?.longitude && (
          <Button
            variant="outline"
            size="small"
            onClick={handleNavigate}
            className="stop-timeline-item__nav-btn"
          >
            <Navigation size={14} />
            Navigate
          </Button>
        )}
      </ActionCard>
    </div>
  );
}
