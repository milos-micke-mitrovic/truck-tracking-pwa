import { Calendar, FileText, Fuel, AlertCircle } from 'lucide-react';
import { Text } from '@/shared/ui';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number;
}

const actions: QuickAction[] = [
  {
    icon: <Calendar size={24} />,
    label: 'Schedule',
    badge: 2,
  },
  {
    icon: <FileText size={24} />,
    label: 'Documents',
  },
  {
    icon: <Fuel size={24} />,
    label: 'Fuel Log',
  },
  {
    icon: <AlertCircle size={24} />,
    label: 'Report Issue',
  },
];

export function QuickActions() {
  return (
    <div className="quick-actions">
      <Text size="sm" weight="medium" color="secondary" className="quick-actions__title">
        Quick Actions
      </Text>
      <div className="quick-actions__grid">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="quick-actions__item"
            onClick={action.onClick}
          >
            <div className="quick-actions__icon-wrapper">
              {action.icon}
              {action.badge && <span className="quick-actions__badge">{action.badge}</span>}
            </div>
            <Text size="xs" className="quick-actions__label">
              {action.label}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
}
