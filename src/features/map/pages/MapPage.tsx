import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { PageLayout } from '@/shared/components';
import { MapContainer } from '../components';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';
import type { Destination } from '../types';

interface LocationState {
  destination?: Destination;
  navigationTimestamp?: number;
}

export function MapPage() {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const [destination, setDestination] = useState<Destination | undefined>();

  useEffect(() => {
    const state = location.state;

    // Only accept destination if it was set recently (within 5 seconds)
    // This prevents stale destinations from persisting after refresh
    if (state?.destination && state?.navigationTimestamp) {
      const age = Date.now() - state.navigationTimestamp;
      if (age < 5000) {
        setDestination(state.destination);
        // Clear the state to prevent it from persisting on refresh
        history.replace('/tabs/map', {});
      }
    }
  }, [location.state, history]);

  const handleClearDestination = () => {
    setDestination(undefined);
  };

  return (
    <PageLayout
      title="Map"
      headerRightContent={<NotificationBell />}
      fullscreen
      contentClassName="map-page__content"
    >
      <MapContainer
        className="map-page__map"
        destination={destination}
        onClearDestination={handleClearDestination}
      />
    </PageLayout>
  );
}
