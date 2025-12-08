import { Package, Route, Clock, TrendingUp } from 'lucide-react';
import { Text } from '@/shared/ui';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
}

const stats: StatItem[] = [
  {
    icon: <Package size={20} />,
    label: 'Deliveries',
    value: '3',
    trend: 'Today',
  },
  {
    icon: <Route size={20} />,
    label: 'Distance',
    value: '127 mi',
    trend: 'Today',
  },
  {
    icon: <Clock size={20} />,
    label: 'Hours',
    value: '6.5h',
    trend: 'Today',
  },
  {
    icon: <TrendingUp size={20} />,
    label: 'Rating',
    value: '4.9',
    trend: 'Avg',
  },
];

export function QuickStats() {
  return (
    <div className="quick-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="quick-stats__item">
          <div className="quick-stats__icon">{stat.icon}</div>
          <div className="quick-stats__info">
            <Text size="lg" weight="semibold" className="quick-stats__value">
              {stat.value}
            </Text>
            <Text size="xs" color="tertiary" className="quick-stats__label">
              {stat.label}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
