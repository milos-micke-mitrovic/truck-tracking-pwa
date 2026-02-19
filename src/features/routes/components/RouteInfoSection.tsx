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
          {route.dispatcher && <InfoRow label="Dispatcher" value={route.dispatcher.name} />}
          {route.broker && (
            <InfoRow label="Broker" value={route.broker.legalName || route.broker.dbaName || '—'} />
          )}
          {route.brokerIdentifier && <InfoRow label="Broker ID" value={route.brokerIdentifier} />}
          {route.vehicle && <InfoRow label="Vehicle" value={route.vehicle.unitId} />}
        </div>
      </Card>

      {route.loadDetails && (
        <Card title="Load Details" className="route-info-section__card">
          <div className="route-info-section__rows">
            {route.loadDetails.commodity && (
              <InfoRow label="Commodity" value={route.loadDetails.commodity} />
            )}
            {route.loadDetails.weight && (
              <InfoRow
                label="Weight"
                value={`${route.loadDetails.weight} ${route.loadDetails.weightUnit ?? ''}`}
              />
            )}
            {route.loadDetails.unitCount != null && (
              <InfoRow
                label="Units"
                value={`${route.loadDetails.unitCount} ${route.loadDetails.unitType ?? ''}`}
              />
            )}
            {route.loadDetails.capacity && (
              <InfoRow label="Capacity" value={route.loadDetails.capacity} />
            )}
            {route.loadDetails.lengthFeet && (
              <InfoRow label="Length" value={route.loadDetails.lengthFeet} />
            )}
            {route.loadDetails.temperature && (
              <InfoRow label="Temperature" value={route.loadDetails.temperature} />
            )}
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
