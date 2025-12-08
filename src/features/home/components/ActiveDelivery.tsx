import { MapPin, Navigation, Clock } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Card, Text, Badge, Button } from '@/shared/ui';

export function ActiveDelivery() {
  const history = useHistory();

  // Mock data - would come from a store/API in real app
  const delivery = {
    id: 'DEL-2024-1234',
    status: 'In Transit',
    destination: {
      address: 'Bulevar Oslobođenja 78, 21000 Novi Sad, Serbia',
      lat: 45.2517,
      lng: 19.8369,
    },
    eta: '2:30 PM',
    distance: '12.4 km',
    customer: 'TechStart DOO',
  };

  const handleNavigate = () => {
    history.push('/tabs/map', {
      destination: {
        lat: delivery.destination.lat,
        lng: delivery.destination.lng,
        address: delivery.destination.address,
        customer: delivery.customer,
      },
      navigationTimestamp: Date.now(),
    });
  };

  return (
    <Card accent="warning" className="active-delivery">
      <div className="active-delivery__header">
        <div className="active-delivery__title-row">
          <Text weight="semibold">Current Delivery</Text>
          <Badge variant="warning">{delivery.status}</Badge>
        </div>
        <Text size="xs" color="tertiary">
          {delivery.id}
        </Text>
      </div>

      <div className="active-delivery__destination">
        <div className="active-delivery__icon">
          <MapPin size={20} />
        </div>
        <div className="active-delivery__address">
          <Text size="sm" weight="medium">
            {delivery.customer}
          </Text>
          <Text size="xs" color="secondary">
            {delivery.destination.address}
          </Text>
        </div>
      </div>

      <div className="active-delivery__stats">
        <div className="active-delivery__stat">
          <Clock size={16} className="active-delivery__stat-icon" />
          <Text size="sm">
            ETA{' '}
            <Text as="span" weight="semibold">
              {delivery.eta}
            </Text>
          </Text>
        </div>
        <div className="active-delivery__stat">
          <Navigation size={16} className="active-delivery__stat-icon" />
          <Text size="sm">
            <Text as="span" weight="semibold">
              {delivery.distance}
            </Text>{' '}
            away
          </Text>
        </div>
      </div>

      <Button
        variant="solid"
        fullWidth
        onClick={handleNavigate}
        className="active-delivery__action"
      >
        <Navigation size={18} />
        Navigate
      </Button>
    </Card>
  );
}
