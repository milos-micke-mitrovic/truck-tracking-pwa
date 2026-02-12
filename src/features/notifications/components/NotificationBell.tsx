import { useHistory } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { IconButton } from '@/shared/ui';
import { useUnreadCount } from '../hooks/use-unread-count';

export function NotificationBell() {
  const history = useHistory();
  const { unreadCount } = useUnreadCount();

  const handleClick = () => {
    history.push('/tabs/notifications');
  };

  return (
    <div className="notification-bell">
      <IconButton icon={<Bell size={22} />} aria-label="Notifications" onClick={handleClick} />
      {unreadCount > 0 && (
        <span className="notification-bell__badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
      )}
    </div>
  );
}
