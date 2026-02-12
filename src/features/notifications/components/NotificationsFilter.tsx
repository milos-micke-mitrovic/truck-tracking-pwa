import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

export type NotificationFilterTab = 'all' | 'unread';

interface NotificationsFilterProps {
  value: NotificationFilterTab;
  onChange: (tab: NotificationFilterTab) => void;
}

export function NotificationsFilter({ value, onChange }: NotificationsFilterProps) {
  return (
    <IonSegment
      value={value}
      onIonChange={(e) => onChange(e.detail.value as NotificationFilterTab)}
      className="notifications-filter"
    >
      <IonSegmentButton value="all">
        <IonLabel>All</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="unread">
        <IonLabel>Unread</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
}
