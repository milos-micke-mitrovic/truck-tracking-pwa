import { Card, Text } from '@/shared/ui';
import type { RouteResponse } from '../types/route.types';

interface RouteInfoSectionProps {
  route: RouteResponse;
}

export function RouteInfoSection({ route }: RouteInfoSectionProps) {
  return (
    <div className="route-info-section">
      <Card title="Dispatch Info" className="route-info-section__card">
        <div className="route-info-section__rows">
          <InfoRow
            label="Dispatcher"
            value={`${route.dispatcher.firstName} ${route.dispatcher.lastName}`}
          />
          <InfoRow label="Broker" value={route.broker.name} />
          <InfoRow label="Broker ID" value={route.broker.identifier} />
          <InfoRow label="Vehicle" value={route.vehicle.unitNumber} />
        </div>
      </Card>

      {route.loadDetails && (
        <Card title="Load Details" className="route-info-section__card">
          <div className="route-info-section__rows">
            <InfoRow label="Commodity" value={route.loadDetails.commodity} />
            <InfoRow
              label="Weight"
              value={`${route.loadDetails.weight.toLocaleString()} ${route.loadDetails.weightUnit}`}
            />
            <InfoRow label="Pieces" value={String(route.loadDetails.pieces)} />
            {route.loadDetails.pallets > 0 && (
              <InfoRow label="Pallets" value={String(route.loadDetails.pallets)} />
            )}
            {route.loadDetails.temperature !== null && (
              <InfoRow
                label="Temperature"
                value={`${route.loadDetails.temperature}${route.loadDetails.temperatureUnit || ''}`}
              />
            )}
            {route.loadDetails.hazmat && <InfoRow label="Hazmat" value="Yes" />}
            {route.loadDetails.notes && <InfoRow label="Notes" value={route.loadDetails.notes} />}
          </div>
        </Card>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="route-info-section__row">
      <Text as="span" size="sm" color="secondary">
        {label}
      </Text>
      <Text as="span" size="sm" weight="medium">
        {value}
      </Text>
    </div>
  );
}
