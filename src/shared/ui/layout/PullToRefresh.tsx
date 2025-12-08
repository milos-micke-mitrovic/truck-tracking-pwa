import { IonRefresher, IonRefresherContent } from '@ionic/react';
import type { RefresherEventDetail } from '@ionic/react';

export interface PullToRefreshProps {
  onRefresh: (event: CustomEvent<RefresherEventDetail>) => void | Promise<void>;
  pullingText?: string;
  refreshingText?: string;
  disabled?: boolean;
}

export function PullToRefresh({
  onRefresh,
  pullingText = 'Pull to refresh',
  refreshingText = 'Refreshing...',
  disabled = false,
}: PullToRefreshProps) {
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await onRefresh(event);
    event.detail.complete();
  };

  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={handleRefresh}
      disabled={disabled}
      className="pull-to-refresh"
    >
      <IonRefresherContent
        pullingText={pullingText}
        refreshingSpinner="circles"
        refreshingText={refreshingText}
      />
    </IonRefresher>
  );
}
