import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

export type RouteFilterTab = 'active' | 'history';

interface RoutesFilterProps {
  value: RouteFilterTab;
  onChange: (tab: RouteFilterTab) => void;
}

export function RoutesFilter({ value, onChange }: RoutesFilterProps) {
  return (
    <IonSegment
      value={value}
      onIonChange={(e) => onChange(e.detail.value as RouteFilterTab)}
      className="routes-filter"
    >
      <IonSegmentButton value="active">
        <IonLabel>Active</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="history">
        <IonLabel>History</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
}
