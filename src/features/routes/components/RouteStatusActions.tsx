import { Button, ActionSheet, Toast } from '@/shared/ui';
import { useState } from 'react';
import { hapticSuccess, hapticError } from '@/shared/utils';
import { RouteStatus } from '../types/route.types';
import { useRouteActions } from '../hooks/use-route-actions';

interface RouteStatusActionsProps {
  routeId: number;
  status: RouteStatus;
}

interface StatusTransition {
  label: string;
  nextStatus: RouteStatus;
  variant: 'solid' | 'outline';
}

const statusTransitions: Partial<Record<RouteStatus, StatusTransition[]>> = {
  [RouteStatus.DISPATCHED]: [
    { label: 'Start Route', nextStatus: RouteStatus.IN_TRANSIT, variant: 'solid' },
  ],
  [RouteStatus.IN_TRANSIT]: [
    { label: 'Arrive at Pickup', nextStatus: RouteStatus.AT_PICKUP, variant: 'solid' },
    { label: 'Arrive at Delivery', nextStatus: RouteStatus.AT_DELIVERY, variant: 'solid' },
  ],
  [RouteStatus.AT_PICKUP]: [
    { label: 'Mark Loaded', nextStatus: RouteStatus.LOADED, variant: 'solid' },
  ],
  [RouteStatus.LOADED]: [{ label: 'Depart', nextStatus: RouteStatus.IN_TRANSIT, variant: 'solid' }],
  // AT_DELIVERY and DELIVERED/COMPLETED are handled automatically:
  // - Driver submits POD → Dispatcher approves → Stop auto-completes
  // - When all delivery stops complete → Route auto-transitions to DELIVERED
  // - Dispatcher manually moves DELIVERED → COMPLETED → INVOICED → PAID
};

export function RouteStatusActions({ routeId, status }: RouteStatusActionsProps) {
  const { changeRouteStatus, isLoading, error } = useRouteActions();
  const [pendingTransition, setPendingTransition] = useState<StatusTransition | null>(null);
  const [showError, setShowError] = useState(false);

  const transitions = statusTransitions[status];

  if (!transitions || transitions.length === 0) return null;

  const handleAction = (transition: StatusTransition) => {
    setPendingTransition(transition);
  };

  const handleConfirm = async () => {
    if (!pendingTransition) return;
    const transition = pendingTransition;
    setPendingTransition(null);
    try {
      await changeRouteStatus(routeId, transition.nextStatus);
      hapticSuccess();
    } catch {
      hapticError();
      setShowError(true);
    }
  };

  return (
    <div className="route-status-actions">
      {transitions.map((transition) => (
        <Button
          key={transition.nextStatus}
          variant={transition.variant}
          fullWidth
          loading={isLoading}
          onClick={() => handleAction(transition)}
        >
          {transition.label}
        </Button>
      ))}

      <ActionSheet
        isOpen={!!pendingTransition}
        onClose={() => setPendingTransition(null)}
        header={pendingTransition?.label ?? ''}
        subHeader="Are you sure you want to proceed?"
        buttons={[
          {
            text: pendingTransition?.label ?? 'Confirm',
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
