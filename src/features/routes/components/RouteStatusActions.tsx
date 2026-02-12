import { Button, ActionSheet, Toast } from '@/shared/ui';
import { useState } from 'react';
import { RouteStatus } from '../types/route.types';
import { useRouteActions } from '../hooks/use-route-actions';

interface RouteStatusActionsProps {
  routeId: string;
  status: RouteStatus;
}

interface StatusTransition {
  label: string;
  nextStatus: RouteStatus;
  variant: 'solid' | 'outline';
}

const statusTransitions: Partial<Record<RouteStatus, StatusTransition>> = {
  [RouteStatus.DISPATCHED]: {
    label: 'Start Route',
    nextStatus: RouteStatus.IN_TRANSIT,
    variant: 'solid',
  },
  [RouteStatus.IN_TRANSIT]: {
    label: 'Arrive at Stop',
    nextStatus: RouteStatus.AT_PICKUP,
    variant: 'solid',
  },
  [RouteStatus.AT_PICKUP]: {
    label: 'Mark Loaded',
    nextStatus: RouteStatus.LOADED,
    variant: 'solid',
  },
  [RouteStatus.LOADED]: {
    label: 'Depart',
    nextStatus: RouteStatus.IN_TRANSIT,
    variant: 'solid',
  },
  [RouteStatus.AT_DELIVERY]: {
    label: 'Mark Delivered',
    nextStatus: RouteStatus.DELIVERED,
    variant: 'solid',
  },
  [RouteStatus.DELIVERED]: {
    label: 'Complete Route',
    nextStatus: RouteStatus.COMPLETED,
    variant: 'solid',
  },
};

export function RouteStatusActions({ routeId, status }: RouteStatusActionsProps) {
  const { changeRouteStatus, isLoading, error } = useRouteActions();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  const transition = statusTransitions[status];

  if (!transition) return null;

  const handleAction = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    try {
      await changeRouteStatus(routeId, transition.nextStatus);
    } catch {
      setShowError(true);
    }
  };

  return (
    <div className="route-status-actions">
      <Button variant={transition.variant} fullWidth loading={isLoading} onClick={handleAction}>
        {transition.label}
      </Button>

      <ActionSheet
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        header={transition.label}
        subHeader="Are you sure you want to proceed?"
        buttons={[
          {
            text: transition.label,
            handler: () => {
              void handleConfirm();
            },
          },
          { text: 'Cancel', role: 'cancel' },
        ]}
      />

      <Toast
        isOpen={showError || !!error}
        message={error || 'Failed to update status'}
        variant="error"
        duration={3000}
        onDidDismiss={() => setShowError(false)}
      />
    </div>
  );
}
