import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { Card, Heading, Text } from '@/shared/ui';
import { useAuthStore } from '@/shared/stores';
import { formatDate } from '@/shared/utils';

function getGreeting(): { text: string; icon: React.ReactNode } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { text: 'Good morning', icon: <Sunrise size={24} /> };
  } else if (hour >= 12 && hour < 17) {
    return { text: 'Good afternoon', icon: <Sun size={24} /> };
  } else if (hour >= 17 && hour < 21) {
    return { text: 'Good evening', icon: <Sunset size={24} /> };
  }
  return { text: 'Good night', icon: <Moon size={24} /> };
}

export function WelcomeCard() {
  const user = useAuthStore((state) => state.user);
  const today = formatDate(new Date(), 'EEEE, MMMM d');
  const greeting = getGreeting();

  return (
    <Card className="welcome-card">
      <div className="welcome-card__top">
        <div className="welcome-card__greeting-icon">{greeting.icon}</div>
      </div>

      <div className="welcome-card__content">
        <Text size="sm" color="secondary" className="welcome-card__date">
          {today}
        </Text>
        <Heading level={2} className="welcome-card__greeting">
          {greeting.text}, {user?.name?.split(' ')[0] || 'Driver'}
        </Heading>
        {user?.driverId && (
          <Text size="sm" color="tertiary" className="welcome-card__driver-id">
            ID: {user.driverId}
          </Text>
        )}
      </div>
    </Card>
  );
}
